// 自定义redux
let createStore = (reducer)=>{

    // 定义一个老的状态
    let state;

    // 获取最新的状态，返回最新的state
    let getState=()=>state;

    // 存储订阅的监听器
    let listeners = [];

    // 订阅状态和发布状态
    let subscribe = (listener)=>{
        listeners.push(listener);
        return ()=>{
            listeners = listeners.filter(l=>l!==listener)
        }
    };

    // 发射,高阶函数
    let dispatch = action=>{
        // 传入老的state和action返回新的state
        state = reducer(state,action);
        listeners.forEach(l=>l())
    }
    dispatch();

    return{
        getState,
        subscribe,
        dispatch
    }

}
// 应用中间件
let applyMiddleware = (...middlewares)=>createStore=>reducer=>{
        let store = createStore(reducer);
        middlewares = middlewares.map(middleware=>middleware(store));
        let dispatch = compose(...middlewares)(store.dispatch);
        return{
            ...store,dispatch
        }
}

// 组合函数
function compose (...fns){
    return function (...args) {
        let last = fns.pop();
        return fns.reduceRight((composed,fn)=>{
            return fn(composed);
        },last(...args))
    }
}

export {createStore,applyMiddleware}