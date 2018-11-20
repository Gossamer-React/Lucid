const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (reactGlobalHook) {
  let virtualdom;
  var reactDOMArr = [];

  reactGlobalHook.onCommitFiberRoot = (function (oCFR) {
    return function (...args) {
      virtualdom = args[1];
      let nodeToTraverse = virtualdom.current.stateNode.current;
      traverse(nodeToTraverse);
      console.log('traverse complete: ', reactDOMArr);

      //send DOM's react component tree to contentScriptJS
      window.postMessage(JSON.parse(JSON.stringify(
        { type: 'reactTraverser', data: reactDOMArr}
      )), '*')

      reactDOMArr = [];

      // //get signal from contentScriptto traverse
      // window.addEventListener('traverse', () => {
      //   traverse(nodeToTraverse);
      // });

      return oCFR(...args);
    };
  })(reactGlobalHook.onCommitFiberRoot);

  const traverse = (node, childrenarr = reactDOMArr, sib = false) => {
    console.log(node.memoizedProps, 'this is props memoized-------')

    if (node.type) {
      if (node.type.name) {
        //if desired node, create obj and push into reactDOMArr
        obj = {
          name: node.type.name,
          attributes: {
            Id: node._debugID
          },
          State: node.memoizedState,
          children: [],
        }
        //Create parent node in reactDOMArr
        if (reactDOMArr.length === 0) {
          reactDOMArr.push(obj);
          childrenarr = reactDOMArr[reactDOMArr.length-1]['children']
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
}
/*
State: node.memoizedState,
Id: node._debugID,
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
*/

