import users from './reducers/users'
import { logger } from './middleware'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reactotron from 'config/debug';
import countNotifi from './reducers/countNotification';
const rootReducer = combineReducers({users: users,countNotifi:countNotifi})
const middleware = [ thunk, logger ]
let store = createStore(rootReducer, applyMiddleware(...middleware))

if(__DEV__) {
    store = createStore(rootReducer, compose(applyMiddleware(...middleware), reactotron.createEnhancer()))
   
}

export default store;

