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
              traverse(nodeToTraverse);
              window.postMessage(JSON.parse(JSON.stringify({
                type: 'reactTraverser',
                data: reactDOMArr
              })), '*')

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
          State: (function () {
            try {
              let result = {};
              const state = node.memoizedState;
              if (typeof state === 'object') {
                for (let key in state) {
                  const val = state[key];
                  if (typeof val === 'function' || typeof val === 'object') {
                    result[key] = JSON.stringify(val, (key, value) => {
                      try {
                        return JSON.parse(JSON.stringify(value));
                      } catch (error) {
                        return error;
                      }
                    });
                  } else {
                    result[key] = val;
                  }
                }
              } else {
                result = state;
              }
              return result;
            } catch (e) {
              return {};
            }
          })(),
          Props: (function () {
            try {
              let result = {};
              const props = node.memoizedProps;
              if (typeof props === 'object') {
                for (let key in props) {
                  const val = props[key];
                  if (typeof val === 'function' || typeof val === 'object') {
                    result[key] = JSON.stringify(val, (key, value) => {
                      try {
                        return JSON.parse(JSON.stringify(value));
                      } catch (error) {
                        return error;
                      }
                    });
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
          })()
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


// * Parsing Functions

const stringifyReactDOM = (key, val) => {
  // console.log('VAL: ', val);
  if (val instanceof Object) {
    for (let prop in val) {
      if (prop === 'data') {
        try {
          console.log(val[prop][0]);
          JSON.stringify(stringifyReactObject(val[prop][0]));
        } catch (err) {
          // * catches error but something is still causing circular reference
          console.log('ERROR', err);
          return err;
        }
      }
    }
    return val;
  }

  return val;
}


const stringifyReactObject = (object) => {
  console.log('OBJECT: ', object)
  for (let key in object) {
    console.log('OBJ: ', object[key], key);
    if (object[key] === null) return;
    if(object[key] === 'Portal'){
      console.log(object[key].children);
      object.children = [];
      return object;
    }
    if (object[key].hasOwnProperty('children') || key === 'children') {
      if (object[key].children instanceof Object && object[key].children.hasOwnProperty('_owner')) {
        console.log('CHILDREN!!!');
        try {
          object[key].children._owner = JSON.stringify(object[key].children._owner);
        } catch (err) {
          object[key].children._owner = 'circular ref';
        }
      } else if (Array.isArray(object[key])) {
        stringifyReactArr(object[key]);
      }
    }

    if (object[key].hasOwnProperty('context')) {
      console.log('CONTEXT: ', object[key], key);
      if (object[key].context.hasOwnProperty('referenceNode')) {
        try {
          object[key].context.referenceNode = JSON.stringify(object[key].context.referenceNode);
        } catch (err) {
          object[key].context.referenceNode = 'circular ref';
        }
      }
    }
  }

  console.log('returnOBJ: ', object);
  return object;
}

const stringifyReactArr = (array) => {
  if (array.length === 0) return;
  console.log('children: ', array);
  let newArray = array.map(child => {
    console.log('child:', child);
    return stringifyReactObject(child);
  });

  return newArray;
}