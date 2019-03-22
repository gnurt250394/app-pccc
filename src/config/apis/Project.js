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


export const getListProject = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.PROJECT_DETAIL,{params:body})
}
export const getNewProject = async(page)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.NEW_PROJECT,{params:page})
}
export const FolowProject = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.FOLOW,{body,table:'UserProject'})
}
export const FolowUser = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.FOLOW,{body,table:'UserInvestor'})
}

export const listFollows = async body => {
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIST_FOLLOW, body)
}

export const listDocuments = async type => {
    // type | nếu lấy video truyền type=video ; catalog , type=catalog; document, type=document
    return instance.get(constant.Document + "?type=" + type)
}