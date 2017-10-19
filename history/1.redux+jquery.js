import {createStore} from './redux'
import $ from 'jquery';
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
$(document.body).append(`
    <p id="counter"></p>
    <button id="increaseBtn">+</button>
    <button id="decreaseBtn">-</button>
`);
// state 是状态数，可以是任意结构（对象，数组。。。）
// action 是一个纯对象{type:'INCREASE',amount:2} {type:'DECREASE',amount:1}
let reducer = (state={number:0},action)=>{

    if (action === undefined) return state;

    switch (action.type){
        case INCREASE:
            return {number:state.number+action.amount};
        case DECREASE:
            return {number:state.number-action.amount};
        default:
            return state;
    }

};

// {getState(),subscribe,dispath}
let  store = createStore(reducer);

let render = ()=>{
    $('#counter').html(store.getState().number);
}
// 5s之后取消订阅
setTimeout(function () {
    unsubscribe();
},5000)


// 当仓库里的state发生变化的时候，会重新执行render方法，读取最新的状态数据，并更新视图
let unsubscribe = store.subscribe(render);

$('#increaseBtn').click(()=>store.dispatch({type:INCREASE,amount:3}))
$('#decreaseBtn').click(()=>store.dispatch({type:DECREASE,amount:2}))

render();


