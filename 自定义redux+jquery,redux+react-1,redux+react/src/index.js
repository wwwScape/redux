import {createStore} from './redux'
import React from 'react'
import ReactDOM from 'react-dom'
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

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

class Counter extends React.Component{
    render(){
        return(
            <div>
                <p>{store.getState().number}</p>
                <button onClick={()=>store.dispatch({type:INCREASE,amount:3})}>+</button>
                <button onClick={()=>store.dispatch({type:DECREASE,amount:2})}>-</button>
            </div>
        )
    }
}
let render = ()=>{
    ReactDOM.render(<Counter/>,document.getElementById("root"))
}
render();
store.subscribe(render);



