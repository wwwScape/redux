# redux中间件的原理和实现

1. 复习redux

src/redux.js

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
    
    export {createStore}
    
src/index.js

    import {createStore} from './redux';
    // reducer
    let counter = (state=0,action)=>{
        if (action){
            switch (action.type){
                case "ADD":
                    return state+1;
                case "SUB":
                    return state-1;
                default :
                    return state;
    
            }
        }else {
            return state;
        }
    }
    
    // 创建store
    let store = createStore(counter);
    console.log(store.getState());
    store.dispatch({type:'ADD'})
    console.log(store.getState());
    
2. 实现日志中间件

src/redux.js

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
    let applyMiddleware = middleware=>createStore=>reducer=>{
            let store = createStore(reducer);
            middleware = middleware(store);
            let dispatch = middleware(store.dispatch);
            return{
                ...store,dispatch
            }
    }
    
    
    export {createStore,applyMiddleware}
    
    
src/index.js

    import {createStore,applyMiddleware} from './redux';
    // reducer
    let counter = (state=0,action)=>{
        if (action){
            switch (action.type){
                case "ADD":
                    return state+1;
                case "SUB":
                    return state-1;
                default :
                    return state;
    
            }
        }else {
            return state;
        }
    }
    // 
    let logger = store=>next=>action=>{
        console.log("dispatch之前："+store.getState());
        console.log(action);
        next(action);
        console.log("dispatch之后："+store.getState());
    }
    /*
     let logger = store=>next=>action=>{
    
     }
    
    let logger = function (store) {
        return function (next) {
            return function (action) {
                
            }
        }
    }
    */
    let store = applyMiddleware(logger)(createStore)(counter);
    store.dispatch({type:'ADD'});
    store.dispatch({type:'SUB'});
    
    
3. 实现redux-thunk,异步，隔3之后再+1

src/redux.js同2

src/index.js

    import {createStore,applyMiddleware} from './redux';
    // reducer
    let counter = (state=0,action)=>{
        if (action){
            switch (action.type){
                case "ADD":
                    return state+1;
                case "SUB":
                    return state-1;
                default :
                    return state;
    
            }
        }else {
            return state;
        }
    }
    let thunk = store => next => action =>{
        if (typeof action === 'function')
            return action(next);
        return action(next)
    }
    let store = applyMiddleware(thunk)(createStore)(counter);
    
    store.subscribe(function () {
        console.log(store.getState())
    })
    
    store.dispatch(function (dispatch) {
        setTimeout(function () {
            dispatch({type:'ADD'});
        },3000)
    });
    
    
4. 实现redux-promise,异步，隔3之后再+1

src/redux.js同2

src/index.js

    import {createStore,applyMiddleware} from './redux';
    // reducer
    let counter = (state=0,action)=>{
        if (action){
            switch (action.type){
                case "ADD":
                    return state+1;
                case "SUB":
                    return state-1;
                default :
                    return state;
    
            }
        }else {
            return state;
        }
    }
    
    let isPromise = obj => obj.then;
    let promise = store => next => action =>{
        if (isPromise(action)){
            action.then((data)=>next(data));
        }
    }
    let store = applyMiddleware(promise)(createStore)(counter);
    
    store.subscribe(function () {
        console.log(store.getState())
    })
    
    store.dispatch(new Promise(function (resolve,reject) {
        setTimeout(function () {
            resolve({type:'ADD'})
        },3000)
    }));

    



5. 中间件的链式调用

src/redux.js

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
    
src/index.js

    import {createStore,applyMiddleware} from './redux';
    // reducer
    let counter = (state=0,action)=>{
        if (action){
            switch (action.type){
                case "ADD":
                    return state+1;
                case "SUB":
                    return state-1;
                default :
                    return state;
    
            }
        }else {
            return state;
        }
    };
    
    let logger1 = store=>next=>action=>{
        console.log("logger1,dispatch之前："+store.getState());
        console.log(action);
        next(action);
        console.log("logger1,dispatch之后："+store.getState());
    };
    let logger2 = store=>next=>action=>{
        console.log("logger2,dispatch之前："+store.getState());
        console.log(action);
        next(action);
        console.log("logger2,dispatch之后："+store.getState());
    };
    
    
    // 如果放入多个中间件的话，需要从左向右依次执行
    let store = applyMiddleware(logger1,logger2)(createStore)(counter);
    
    store.subscribe(function () {
        console.log(store.getState())
    });
    
    store.dispatch({type:'ADD'});


