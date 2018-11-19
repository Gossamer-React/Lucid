const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (reactGlobalHook) {
  let virtualdom;

  reactGlobalHook.onCommitFiberRoot = (function (oCFR) {
    return function (...args) {
      virtualdom = args[1];
      let nodeToTraverse = virtualdom.current.stateNode.current;
      traverse(nodeToTraverse);
      console.log('traverse complete: ', documentObj);

      //send traverse docObj data to contentScriptJS
      window.postMessage(JSON.parse(JSON.stringify(
        { data: documentObj, type: 'reactTraverser'}
      )), '*')

      // //get signal from contentScriptto traverse
      // window.addEventListener('traverse', () => {
      //   traverse(nodeToTraverse);
      // });
  
      return oCFR(...args);
    };
  })(reactGlobalHook.onCommitFiberRoot);

  var documentObj = {};
  const traverse = (node, childrenarr = documentObj, sib = false) => {

    if (node.type) {
      if (node.type.name) {
        //console.log('********',node.type.name)
        //if desired node, create obj and push into documentObj
        obj = {
          Component: node.type.name,
          State: node.memoizedState,
          Children: [],
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
        }
        //Create parent node in documentObj
        if (Object.keys(documentObj).length === 0) {
          documentObj[node.type.name] = obj;
          childrenarr = documentObj[node.type.name]['Children'];
        } else {
          //For all other nodes, push obj into children array
          let childObj = {};
          childObj[node.type.name] = obj;
          if (Array.isArray(childrenarr)) {
            childrenarr.push(childObj);
          }
          if (!sib) {
            childrenarr = obj['Children'];
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


