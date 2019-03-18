import axios from 'axios'
import constant from './constant';
import { getItem } from 'config/Controller';
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

export const updateUser =async ( body) => {
    let token =await getItem('token')
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.put(constant.USER, body)
}

export const checkPhoneOrEmail = body => {
    return instance.post(constant.CHECK_PHONE_EMAIL, body)
}
export const getInfoAcount = async () => {
    let token =await getItem('token')
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.get(constant.USER)
}
export const updateAvatar = async (image) => {
    let data = new FormData()
    let date = new Date()
    let name = `IMG_${date.getTime()+ date.getDate()+ date.getMonth()+ date.getFullYear()}.png`
    data.append('image',{uri: image, type:'image/jpeg', name }, name)
    let token = await getItem('token')
    let instance= axios.create({
        baseURL: constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers:{
            'Content-Type': 'multipart/form-data',
        },
        
    })
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.post(constant.UPDATE_AVATAR,data)
}
