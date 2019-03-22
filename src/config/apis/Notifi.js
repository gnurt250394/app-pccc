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
// export const FolowProject = async(body)=>{
//     let token = await getItem('token')
//         instance.defaults.headers.common['Authorization'] = "Bearer " + token;
//         return instance.post(constant.NEW_PROJECT,{body,table:'UserProject'})
// }
// export const FolowUser = async(body)=>{
//     let token = await getItem('token')
//         instance.defaults.headers.common['Authorization'] = "Bearer " + token;
//         return instance.post(constant.NEW_PROJECT,{body,table:'UserInvestor'})
// }