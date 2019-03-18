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
    Success: 200,
    Tokenvalid:445,
    TokenExpire:440
}