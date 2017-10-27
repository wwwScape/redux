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

