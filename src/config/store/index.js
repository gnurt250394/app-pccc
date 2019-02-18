const { createStore, combineReducers } = require('redux')
import users from './reducer/users'

const rootReducer = combineReducers({users: users})

const store = createStore(rootReducer)

export default store;

