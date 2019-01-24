let timeout;
let reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (reactGlobalHook) {
  const reactInstance = reactGlobalHook._renderers[Object.keys(reactGlobalHook._renderers)[0]];
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
      reactGlobalHook.onCommitFiberRoot = (function (oCFR) {
        return function (...args) {

          if (args[1] !== undefined) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              virtualdom = args[1];
              let nodeToTraverse = virtualdom.current.stateNode.current;
              console.log(nodeToTraverse, reactDOMArr);
              traverse(nodeToTraverse);

              console.log(nodeToTraverse, 'ReactDOMArr:', reactDOMArr);
              //send DOM's react component tree to contentScriptJS
              window.postMessage(JSON.parse(JSON.stringify({
                type: 'reactTraverser',
                data: reactDOMArr
              })), '*');

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

} else {
  console.log('React devtool is required to use React-Lucid');
}

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
        State: node.memoizedState,
        Props: function () {
          try {
            let result = {};
            const props = node.memoizedProps;
            if (typeof props === 'object') {
              for (let key in props) {
                const val = props[key];
                if (typeof val === 'function' || typeof val === 'object') {
                  result[key] = JSON.stringify(val);
                } else {
                  result[key] = val;
                }
              }
            } else {
              result = props;
            }
            return result;
          } catch (e) {
            return {};
          }
        }()
      }

      //Create parent node in reactDOMArr
      if (reactDOMArr.length === 0) {
        reactDOMArr.push(obj);
        childrenarr = reactDOMArr[reactDOMArr.length - 1]['children']
      } else {
        childrenarr.push(obj)
        if (!sib) {
          childrenarr = obj['children']
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
