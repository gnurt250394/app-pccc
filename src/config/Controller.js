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
    PASS_FAIL:448,
    PROJECT_ID_NOT_FOUND:406,
    DELETE_ID_NOT_FOUND:404
}
export const formatNumber =(num)=> {
    return num? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."): 0;
  }
  export const fontStyle = {
    SemiBoldItalic:'Montserrat-SemiBoldItalic',
    bold:'Montserrat-ExtraBold',
    Montserrat_SemiBold:'Montserrat-SemiBold',
    Montserrat_Regular:'Montserrat-Regular',
    Acumin_bold:'Acumin-BdPro_0',
    Acumin_thin:'Acumin-BdItPro_0',
    Acumin_ItPro_0:'Acumin-ItPro_0',
    Acumin_RPro_0:'Acumin-RPro_0'
}