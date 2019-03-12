import { actionTypes } from  '../actions'
import {AsyncStorage} from 'react-native'
export default function users(state = {}, action) {
    switch(action.type){
        case actionTypes.USER_LOGIN:
            state = {
                ...state,
                data: action.data,
                token: action.token
            }
            break
        case actionTypes.USER_LOGOUT:
            state = {
                ...state,
                data: null,
                token: null
            }
            break
        case actionTypes.USER_UPDATE:
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