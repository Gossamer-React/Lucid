const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log('this is the reactglobalhook', reactGlobalHook);
const getVirtualDom = reactGlobalHook.onCommitFiberRoot;

let virtualdom
reactGlobalHook.onCommitFiberRoot = (function (z) {
	return function (...args) {
    console.log('this is args1', args[1]); 
    virtualdom = args[1];
	  return z(...args);
	};
})(reactGlobalHook.onCommitFiberRoot);

let nodesToTraverse = virtualdom.current.stateNode.current


//invoke the following code: rec16(nodesToTraverse)
const rec16 = (node, arr) => {
  const newObj = {
    name: '',
    children: [],
    state: null,
    props: null,
    id: null,
    isDOM: null,
  };

  if (node.memoizedState) newObj.state = node.memoizedState;
  if (node.memoizedProps) newObj.props = props16(node);
  if (node._debugID) newObj.id = node._debugID;
  if (node.type) {
    if (node.type.name) {
      newObj.name = node.type.name;
      newObj.isDOM = false;
    }
    else {
      newObj.name = node.type;
      newObj.isDOM = true;
    }
  }
  if (node.type && node.type.propTypes && node.type.propTypes.store) reduxStore = node.stateNode.store.getState();

  arr.push(newObj);

  if (node.child != null) rec16(node.child, newObj.children);
  if (node.sibling != null) rec16(node.sibling, arr);
};
