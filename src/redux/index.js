import users from './reducers/users'
import { logger } from './middleware'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({users: users})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store;

