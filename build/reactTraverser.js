console.log('traverser activated')
const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (reactGlobalHook) {
  const reactInstance = reactGlobalHook._renderers[Object.keys(reactGlobalHook._renderers)[0]]; console.log('react instance:', reactInstance)
  let virtualdom;
  var reactDOMArr = [];
  
  function setHook() {
    //React 16+
    if(reactInstance && reactInstance.version) {
      reactGlobalHook.onCommitFiberRoot = (function (oCFR) {
        return function (...args) {
          virtualdom = args[1];
          let nodeToTraverse = virtualdom.current.stateNode.current;
          traverse(nodeToTraverse);
          console.log('traverse complete: ', reactDOMArr);
          
          //send DOM's react component tree to contentScriptJS
          window.postMessage(JSON.parse(JSON.stringify(
            { type: 'reactTraverser', data: reactDOMArr }
          )), '*')
            
          reactDOMArr = [];
          
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
      
  window.addEventListener('run-traverser', () => {
    console.log('run-traverser activated')
    setHook();
  })

  //traverse through node.memoizeProps and store in result obj
  // const getProps = (node) => {
  //   try {
  //     let result = {}; 
  //     const props = node.memoizedProps; 
  //     if(typeof props === 'object') {
  //       for(let p in props) {
  //         const val = props[p];
  //         //store func in result obj
  //         if(typeof val === 'function') {
  //           result[p] = JSON.stringify(val); 
  //           // store style objects in result obj
  //         } else if (typeof val === 'object') {
  //           result[p] = JSON.stringify(val); 
  //         } else {
  //           //else store vals that are not objs or funcs in result obj
  //           result[p] = val; 
  //         }
  //       }
  //       //else set props obj to result obj
  //     } else {
  //       result = props; 
  //     }
  //     //return 
  //     return result; 
  //     //catch error 
  //   } catch(e) {
  //     return {};
  //   }
  // };
    
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
          state: node.memoizeState,
        }

        // if(node.memoizedProps) obj.props = getProps(node);      

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
} else {
  console.log('React devtool is required to use React-Lucid')
}


// State: node.memoizedState,
          // Props: () => {
          //     try {
          //       let result = {};
          //       const props = node.memoizedProps;
          //       if (typeof props === 'object') {
          //         for (let prop in props) {
          //           const val = props[prop];
          //           if (typeof val === 'function') {
          //             //result[prop] = parseFuncName(val);
          //             result[prop] = JSON.stringify(val);
          //             //grabbing functions on top and then styles on bottom in props
          //           } else if (typeof val === 'object') {
          //             result[prop] = JSON.stringify(val);
          //           } else {
          //             result[prop] = val;
          //           }
          //         }
          //       } else {
          //         result = props;
          //       }
          //       return result;
          //     } catch (e) {
          //       return {};
          //     }
          //   }()