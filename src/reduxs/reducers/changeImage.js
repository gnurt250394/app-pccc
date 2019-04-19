

import { actionTypes } from  '../actions'

const initialState ={
   image:null
}
export default function changeImage(state = initialState, action) {
    switch(action.type){
        
            
        case actionTypes.CHANGE_IMAGE:
           return state = {
                ...state,
                image: action.image
            }
        
        default :
            // something here
          return  state 
            
    }
}