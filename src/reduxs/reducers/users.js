import { actionTypes } from  '../actions'
import {AsyncStorage} from 'react-native'

const initialState ={
    data:{},
    token:''
}
export default function users(state = initialState, action) {
    switch(action.type){
        case actionTypes.USER_LOGIN:
           return state = {
                ...state,
                data: action.data,
                token: action.token,
            }
            
        case actionTypes.USER_LOGOUT:
          return  state = {
                ...state,
                data: null,
                token: null,
            }
            
        case actionTypes.USER_UPDATE:
           return state = {
                ...state,
                data: action.data
            }
            
        default :
            // something here
          return  state 
            
    }
}