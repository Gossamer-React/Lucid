console.log('hook file was injected')

// const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// reactGlobalHook.onCommitFiberRoot = (function (onCommitFiberRoot) {
//           return function (...args) {
//           console.log(args[1])
//           return onCommitFiberRoot(...args);
//           };
//         })(reactGlobalHook.onCommitFiberRoot)()

// let x = function (z) {
// 	return function (...args) {
// 	  console.log(args[1]); 
// 	  return z(...args);
// 	};
//     }
