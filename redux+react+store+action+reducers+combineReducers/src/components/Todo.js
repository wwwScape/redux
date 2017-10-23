/**
 * input框输入内容，显示在列表中，每一个li都可以删除
 */
import React from 'react'
import {store} from '../store'
import {ADD_TODO,DELETE_TODO} from '../actions'

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:store.getState().todo.list
        };
    }

    // 回车键按下
    handleKeyDown=(event)=>{
        if (event.keyCode == 13 && event.target.value.length>0){
            // let list = this.state.list;
            // list.push(event.target.value);
            // this.setState({list});
            // event.target.value="";
            store.dispatch({
                type:ADD_TODO,
                text:event.target.value
            })
            event.target.value="";
        }
    }

    // 删除todo
    deleteTodo=(index)=>{
        store.dispatch({
            type:DELETE_TODO,
            index
        })
    }

    componentWillMount(){
        this.unSubscribe =  store.subscribe(()=>{
            this.setState({
                list:store.getState().todo.list
            })
        })
    }

    componentWillUnmount(){
        this.unSubscribe();
    }

    render(){
        return(
            <div>
                <input type="text" onKeyDown={this.handleKeyDown}/>
                <ul>
                    {
                        this.state.list.map((todo,index)=>(
                            <li key={index}>
                                {todo}
                                <button onClick={()=>this.deleteTodo(index)}>-</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}