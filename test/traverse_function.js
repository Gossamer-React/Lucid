export const traverse = (node, childrenarr = reactDOMArr, sib = false) => {
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
