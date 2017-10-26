import {INCREASE,DECREASE} from '../actions'
// state 是状态数，可以是任意结构（对象，数组。。。）
// action 是一个纯对象{type:'INCREASE',amount:2} {type:'DECREASE',amount:1}
let reducer = (state={number:0},action)=>{

    if (action === undefined) return state;

    switch (action.type){
        case INCREASE:
            return {number:state.number+(action.amount||1)};
        case DECREASE:
            return {number:state.number-(action.amount||1)};
        default:
            return state;
    }
}

export default reducer;