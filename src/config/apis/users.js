import axios from 'axios'
import constant from './constant';
import {AsyncStorage} from 'react-native'
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers: {'content-type': "application/json"}
});

export const signup = body => {
    return instance.post(constant.USER, body)
}

export const login = body => {
    return instance.post(constant.LOGIN, body)
}

export const loginSocial = body => {
    return instance.post(constant.LOGIN_SOCIAL, body)
}

export const updateUser = (token, body) => {
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.put(constant.USER, body)
}

export const checkPhoneOrEmail = body => {
    return instance.post(constant.CHECK_PHONE_EMAIL, body)
}
export const getInfoAcount = async () => {
    let token = await AsyncStorage.getItem('token')
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.get(constant.USER)
}
export const updateAvatar =  (token, data) => {
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    instance.defaults.headers.common['Content-Type'] = "multipart/form-data";
    
    return instance.post(constant.UPDATE_AVATAR)
}
