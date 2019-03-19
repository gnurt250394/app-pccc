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

export const updateUser = async ( body, t) => {
    let token = t ? t : await getItem('token')
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.put(constant.USER, body)
}

export const forgotPassword = async ( body, token) => {
    console.log('token: ', token);
    console.log('body: ', body);
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.post(constant.FORGOT_PASS, body)
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


export const accountkitInfo = token => {
    
    return fetch(`https://graph.accountkit.com/v1.3/me/?access_token=${token}`).then(res => res.json()).then(res => {
        console.log('accountkit Info: ', res);
        return "0"+res.phone.national_number
    }).catch(err => {
        console.log('err: ', err);
        return false
    })
}