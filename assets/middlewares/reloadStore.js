/**
 * @description: redux中间件测试文件
 * @author: xzqiang
 * @create: 2017/5/26
 */

let reloadStore = void 0;

export  function callTraceMiddleware ({dispatch,getState}){
  return next=> action => {
    const returnValue = next(action);
    sessionStorage.setItem('reloadStore',JSON.stringify(getState()));
    return returnValue;
  }
}

export function getReloadStore(preloadedState={}) {
  const sReloadStore = sessionStorage.getItem("reloadStore")||JSON.stringify({});
  const reloadStore = JSON.parse(sReloadStore);
  return Object.assign(reloadStore,preloadedState)
}

