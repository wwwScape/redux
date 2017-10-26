/**
 * 合并多个store为一个store，因为只能整个app只能有一个store
 */
import {createStore} from './redux'
import combineReducers from './combineReducers'

import counter from './reducers/counter'
import todo from './reducers/todo'

let reducer = combineReducers({
    counter,
    todo
});

let  store = createStore(reducer);
console.log(store.getState())

export {store}