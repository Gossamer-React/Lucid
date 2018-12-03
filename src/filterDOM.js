const filter = (node, componentsArr, childrenArr) => {
  if (node.name === undefined) {
    filter(node[0], componentsArr, childrenArr)
  } else {
    if (componentsArr.includes(node.name)) {
      if (node.children && node.children.length) {
        node.children.forEach(node => {
          filter(node, componentsArr, childrenArr)
        });
      }
    } else {
      let copy = JSON.parse(JSON.stringify(node));
      delete copy['children'];
      copy['children'] = [];
      childrenArr.push(copy);

      if (node.children && node.children.length) {
        node.children.forEach(node => {
          filter(node, componentsArr, copy.children);
        })
      }
    }
  }
  return;
}
export default filter;