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
    constructor(){
        super();
        this.state = {number:store.getState().number}
    }

    // 组件加载的时候订阅监听
    componentWillMount(){
       this.unsubscribe = store.subscribe(()=>{
            this.setState({
                number:store.getState().number
            })
        })
    }

    // 组件卸载的时候取消订阅
    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        return(
            <div>
                <p>{this.state.number}</p>
                <button onClick={()=>store.dispatch({type:INCREASE,amount:3})}>+</button>
                <button onClick={()=>store.dispatch({type:DECREASE,amount:2})}>-</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter/>,document.getElementById("root"))




