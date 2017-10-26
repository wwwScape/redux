// 模拟redux

/**
 * 创建仓库
 * @param reducer
 * @returns {{getState: (function(): *), subscribe: (function(*=)), dispatch: (function(*=))}}
 */
let createStore = (reducer)=>{
    // 状态
    let state;
    // 监听函数数组
    let listeners = [];
    // 用来获取最新的状态
    let getState = ()=>state;
    // 向仓库发送action
    let dispatch = (action )=>{
        // 传入老的state个action，返回新的state,仓库的状态发生更新
        state = reducer(state,action);
        // 通知所有的监听者，执行所有的监听函数,依次调用所有的订阅函数
        listeners.forEach(listener=>listener())
    }
    // 订阅store中的state的变化，当状态发生变化之后会调用对应的监听函数
    // 订阅方法执行后会返回一个取消订阅的函数，调用它可以取消订阅
    let subscribe = (listener)=>{
        listeners.push(listener);
        return ()=>{
            // 取消订阅，保留listeners中不等于listener的状体
            listeners = listeners.filter(l=>listener!=l)
        }
    }
    dispatch();
    return {
        getState, // 获取最新的状态对象
        subscribe, // 原来订阅状态变化事件
        dispatch   // 发送action
    }
}

export {createStore}

/**
 * filter
 *
 * 语法：array.filter(function(currentValue,index,arr), thisValue)
 *
 * 数组中的每个元素都会执行这个函数
 *
 * 1.不改变原数组内容，返回一个新数组
 * 2. 不对空数组进行检测
 * 3.返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。
 *
 * */