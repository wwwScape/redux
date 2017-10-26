/**
 * 用Provider在index中包裹Counter2组件，传递store给connect组件使用context
 */
import React from 'react'
import PropTypes from 'prop-types'

class Provider extends React.Component{
    getChildContext(){
        return {store:this.props.store}
    }
    render(){
        return this.props.children;

    }
}

Provider.childContextTypes = {
    store:PropTypes.object
}

export default Provider