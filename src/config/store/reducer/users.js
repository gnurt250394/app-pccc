export default function users(state = {}, action) {
    console.log('action: ', action);
    switch(action.type){
        case 'LOGIN':
            state = {
                ...state,
                data: action.data,
                token: action.token
            }
            break
        default :
            // something here
            state = { ...state }
            break
    }
    return state
}