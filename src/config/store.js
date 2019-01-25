const { createStore } = require('redux')
const reducer = (state = {}, action) => {
    switch(action.type){
        case 'LOGIN':
            state = {
                ...state,
                user: action.user
            }
            break
        default :
            // something here
            state = { ...state }
            break
    }
    state
}
const store = createStore(reducer)

export default store;

