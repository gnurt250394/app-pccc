

import { actionTypes } from  '../actions'

const initialState ={
    count:0,
    changeBidding:0,
    changeProject:0,
    changeProduct:0,
    changeContractor:0
}
export default function countReducer(state = initialState, action) {
    switch(action.type){
        
            
        case actionTypes.COUNT_NOTIFICATION:
           return state = {
                ...state,
                count: action.count
            }
        case actionTypes.COUNT_BIDDING:
        return state ={
            ...state,
            changeBidding: action.changeBidding
        }
        case actionTypes.COUNT_CONTRACTOR:
        return state ={
            ...state,
            changeContractor: action.changeContractor
        }
        case actionTypes.COUNT_PRODUCT:
        return state ={
            ...state,
            changeProduct: action.changeProduct
        }
        case actionTypes.COUNT_PROJECT:
        return state ={
            ...state,
            changeProject: action.changeProject
        }
        default :
            // something here
          return  state 
            
    }
}