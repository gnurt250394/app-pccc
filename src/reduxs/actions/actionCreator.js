import { actionTypes } from "../actions";

/*
 * action creators
 */

export const loginAction = (data,token)=>{
    return{
        type:actionTypes.USER_LOGIN,
        data,
        token
    }
}
export const logoutAction = ()=>{
   return{
       type:actionTypes.USER_LOGOUT,
       data:{},
       token:''
   }
}
export const updateUserAction =(data)=>{
   return{
       type:actionTypes.USER_UPDATE,
       data
   }
}
export const countNotificationAction = (count) =>{
   return{
       type:actionTypes.COUNT_NOTIFICATION,
       count
   }
}

export const countProject = (changeProject) =>{
    return{
        type:actionTypes.COUNT_PROJECT,
        changeProject
    }
 }
 export const countProduct = (changeProduct) =>{
    return{
        type:actionTypes.COUNT_PRODUCT,
        changeProduct
    }
 }
 export const countBidding = (changeBidding) =>{
    return{
        type:actionTypes.COUNT_BIDDING,
        changeBidding
    }
 }
 export const countContractor = (changeContractor) =>{
    return{
        type:actionTypes.COUNT_CONTRACTOR,
        changeContractor
    }
 }

 export const ChangeImage=(image)=>{
     return{
         type:actionTypes.CHANGE_IMAGE,
         image
     }
 }