/**
 * combineReducers 合并state
 * @param reducers 对象
 */

/**
 * 旧状态{number:0} {list:[]}
 * 新状态{counter:{number:0},todo:{list:[]}}
 */
let combineReducers = (reducers)=>
    (state={counter:{number:0},todo:{list:[]}},action)=>{// 返回一个reducer
        let newState = {};
        if (action === undefined) return state;
        for (var key in reducers){//reducers中有两个key： counter,todo
            newState[key] = reducers[key](state[key],action);
        }
        return newState;
    }

    export default combineReducers;