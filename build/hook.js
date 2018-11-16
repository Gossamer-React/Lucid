const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log('this is the reactglobalhook', reactGlobalHook);
const getVirtualDom = reactGlobalHook.onCommitFiberRoot;
console.log('this is the virtualdom', getVirtualDom);

let x = function (z) {
	return function (...args) {
	  console.log(args[1]); 
	  return z(...args);
	};
}

x(reactGlobalHook.onCommitFiberRoot);