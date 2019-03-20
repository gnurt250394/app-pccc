import {AsyncStorage} from 'react-native'

export const getItem= async(token)=>{
    let e = await AsyncStorage.getItem(token)
    return e
}
export const saveItem= (token)=>{
     AsyncStorage.setItem(token)
}
export const removeItem= async(token)=>{
    let e = await AsyncStorage.removeItem(token)
    return e
}
export const Status = {
    SUCCESS: 200,
    TOKEN_VALID:445,
    TOKEN_EXPIRED:440,
    NO_CONTENT:204,
    PASS_FAIL:448
}
export const _formatNumber =(num)=> {
    return num? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."): 0;
  }