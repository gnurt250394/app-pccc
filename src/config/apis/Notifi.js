import axios from 'axios'
import constant from './constant';
import { getItem } from 'config/Controller';
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers: {
        'content-type': "application/json",
    }
});


export const getListNotifi  = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.Notification,{params:body})
}
export const postNotifi = async(page)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.Notification,{params:{page:page}})
}
export const ReviewNotifi = async(notification_id)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.Notification +`/${notification_id}`)
}
export const Count_Notification = async()=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.COUNT_NOTIFICATION)
}
export const getStatusFollow = async()=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.STATUS_FOLLOW)
}