export default function users(state = {}, action) {
    console.log('action user: ', action);
    switch(action.type){
        case 'LOGIN':
            state = {
                ...state,
                data: action.data,
                token: action.token
            }
            break
        case 'LOGOUT':
            state = {
                ...state,
                data: null,
                token: null
            }
            break
        case 'UPDATE_USER':
            state = {
                ...state,
                data: action.data
            }
            break
        default :
            // something here
            state = { ...state }
            break
    }
    return state
}