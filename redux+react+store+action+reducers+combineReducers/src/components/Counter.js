import React from 'react'
import {store} from '../store'
import {INCREASE,DECREASE} from '../actions'

export default  class Counter extends React.Component{
    constructor(){
        super();
        this.state = {
            number:store.getState().counter.number
        }
    }

    // 组件加载的时候订阅监听
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                number:store.getState().counter.number
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
