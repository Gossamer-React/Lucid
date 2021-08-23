let timeout;
let reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (reactGlobalHook) {
  const reactInstance = reactGlobalHook.renderers.get(1);
  let virtualdom;
  var reactDOMArr = [];

  // window.addEventListener('run-traverser', () => {
  // console.log('run the traverser!')
  // setHook();
  // reactGlobalHook.onCommitFiberRoot();
  // })
  function setHook() {
    //React 16+
    if (reactInstance && reactInstance.version) {
      reactGlobalHook.onCommitFiberRoot = (function(oCFR) {
        return function(...args) {
          if (args[1] !== undefined) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              virtualdom = args[1];
              let nodeToTraverse = virtualdom.current.stateNode.current;
              traverse(nodeToTraverse);
              window.postMessage(
                JSON.parse(
                  JSON.stringify({
                    type: 'reactTraverser',
                    data: reactDOMArr
                  })
                ),
                '*'
              );

              reactDOMArr = [];
            }, 750);

            return oCFR(...args);
          }
        };
      })(reactGlobalHook.onCommitFiberRoot);
    } else if (reactInstance && reactInstance.Reconciler) {
      console.log('React version 16+ (Fiber) is required to use React-Lucid');
    } else {
      console.log('React not found- React is required to use React-Lucid');
    }
  }
  setHook();
  const traverse = (node, childrenarr = reactDOMArr, sib = false) => {
    if (node.type) {
      if (node.type.name) {
        //if desired node, create obj and push into reactDOMArr
        obj = {
          name: node.type.name,
          attributes: {
            Id: node._debugID
          },
          children: [],
          State: stateAndPropParser(node.memoizedState),
          Props: stateAndPropParser(node.memoizedProps)
        };

        //Create parent node in reactDOMArr
        if (reactDOMArr.length === 0) {
          reactDOMArr.push(obj);
          childrenarr = reactDOMArr[reactDOMArr.length - 1]['children'];
        } else {
          childrenarr.push(obj);
          if (!sib) {
            childrenarr = obj['children'];
          }
        }
      }
    }

    if (node.child !== null) {
      traverse(node.child, childrenarr, false);
    }
    if (node.sibling) {
      traverse(node.sibling, childrenarr, true);
    }
    return;
  };
} else {
  console.log('React devtool is required to use React-Lucid');
}

// * Parsing Functions

//* This function will try to parser the state and props objects and catch any circular json errors.
/**  @param reactObj - this will be the components state or prop object
 *   @return object/error - this will return a parsered object or a catched error.
 */
const stateAndPropParser = reactObj => {
  try {
    let result = {};
    if (typeof reactObj === 'object') {
      for (let key in reactObj) {
        const val = reactObj[key];
        if (typeof val === 'function' || typeof val === 'object') {
          result[key] = JSON.parse(
            JSON.stringify(val, (key, value) => {
              try {
                return JSON.parse(JSON.stringify(parserObject(value)));
              } catch (error) {
                return error;
              }
            })
          );
        } else {
          result[key] = val;
        }
      }
    } else {
      result = reactObj;
    }
    return result;
  } catch (e) {
    return {};
  }
};

// * This function will try to parser an object inside a component state or props objecct and catch any circular json errors.
/**  @param propObj - this will be an obj within a component state or prop object
 *   @return object/error - this will return a parsered object or a catched error.
 */
const parserObject = propObj => {
  try {
    let result = {};
    if (typeof propObj === 'object') {
      for (let key in propObj) {
        const val = propObj[key];
        if (typeof val === 'function' || typeof val === 'object') {
          result[key] = JSON.parse(
            JSON.stringify(val, (key, value) => {
              try {
                return JSON.parse(JSON.stringify(value));
              } catch (err) {
                return 'unable to parser circular reference';
              }
            })
          );
        } else {
          result[key] = val;
        }
      }
    } else {
      result = propObj;
    }
    return result;
  } catch (err) {
    return 'unable to parser circular reference';
  }
};
