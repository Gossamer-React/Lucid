console.log('ran reacttraverser.js')
const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (reactGlobalHook) {

  const reactInstance = reactGlobalHook._renderers[Object.keys(reactGlobalHook._renderers)[0]];
  let virtualdom;
  var reactDOMArr = [];

  window.addEventListener('run-traverser', () => {
    console.log('run the traverser!')
    setHook();
    reactGlobalHook.onCommitFiberRoot();
  })

  function setHook() {
    //React 16+
    if (reactInstance && reactInstance.version) {
      console.log('Invoked setHook')

      reactGlobalHook.onCommitFiberRoot = (function (oCFR) {
        return function (...args) {
          virtualdom = args[1];
          if (virtualdom !== undefined) {
            let nodeToTraverse = virtualdom.current.stateNode.current;
            traverse(nodeToTraverse);
            console.log('traverse complete: ', reactDOMArr);

            //send DOM's react component tree to contentScriptJS
            window.postMessage(JSON.parse(JSON.stringify(
              { type: 'reactTraverser', data: reactDOMArr }
            )), '*')

            reactDOMArr = [];
          }

          return oCFR(...args);
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
          State: node.memoizedState,
          Props: function () {
            try {
              let result = {};
              const props = node.memoizedProps;
              if (typeof props === 'object') {
                for (let prop in props) {
                  const val = props[prop];
                  if (typeof val === 'function') {
                    //result[prop] = parseFuncName(val);
                    result[prop] = JSON.stringify(val);
                    //grabbing functions on top and then styles on bottom in props
                  } else if (typeof val === 'object') {
                    result[prop] = JSON.stringify(val);
                  } else {
                    result[prop] = val;
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
} else {
  console.log('React devtool is required to use React-Lucid')
}


