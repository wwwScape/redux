/**
 * 使用this.context来传递store
 */
import React from 'react'
import PropTypes from 'prop-types'

/**
 * connect函数
 * @param mapStateToProps,mapDispatchToProps
 * mapStateToProps:把store里的状态对象映射成组件的一个属性
 * mapDispatchToProps:把dispatch方法映射成UI组件的属性
 *
 *
 */


let connect = (mapStateToProps,mapDispatchToProps)=>(_component)=>{

    // 容器组件
    class Proxy extends React.Component{
        constructor(){
            super();
            this.state= {}
        }
        componentWillMount(){
            this.context.store.subscribe(()=>{
                this.unsubscribe = this.setState(mapStateToProps(this.context.store.getState()))
            })
        }
        componentWillUnmount(){
            this.unsubscribe();
        }
        render(){
            return <_component {...this.state} {...mapDispatchToProps(this.context.store.dispatch)}/>
        }
    }

    Proxy.contextTypes = {
        store:PropTypes.object
    }
    return Proxy;

}

export default connect;


