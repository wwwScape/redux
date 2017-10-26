/**
 * 计数器
 * 功能：按钮加减1
 */
import React from 'react'
import {createStore} from '../redux'
import counter from '../reducers/counter'
import {INCREASE,DECREASE} from '../actions'
import connect from '../connect'

let store = createStore(counter);

// UI组件
class Counter2 extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.value}</p>
                <button onClick={this.props.onIncrease}>+</button>
                <button onClick={this.props.onDecrease}>-</button>
            </div>
        )
    }
}

/**
 * mapStateToProps把store里的状态对象映射成组件的一个属性
 * @param state
 */
let mapStateToProps = (state)=>(
    {
       value:state.number
    }
)

/**
 * 把dispatch方法映射成UI组件的属性
 * @param dispatch
 */
let mapDispatchToProps=(dispatch)=>(
    {
        onIncrease:()=>dispatch({type:INCREASE}),
        onDecrease:()=>dispatch({type:DECREASE})
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Counter2);


