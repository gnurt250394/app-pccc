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
        return instance.get(constant.PROJECT_DETAIL+`${body}`)
}
export const getNewProject = async(page)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.NEW_PROJECT,{params:page})
}
export const FolowProject = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.FOLOW,body)
}
export const unFolowProject = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.UNFOLOW,body)
}
export const addFolow = async body => {
    // table: UserBidding, UserDocument, UserInverstor, UserProject
    // param: bidding_id, document_id, inverstor_id, project_id
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.FOLOW, body)
}
export const FolowUser = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.FOLOW,body)
}
export const UnFolowUser = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.UNFOLOW,body)
}


export const listFollows = async body => {
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIST_FOLLOW, body)
}
export const listUserFollows = async () => {
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.List_Investor )
}
export const DetailUserFollows = async investor_id  => {
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.Investor_Detail + investor_id )
}

export const listDocuments = async (type, page = 1) => {
    // type | nếu lấy video truyền type=video ; catalog , type=catalog; document, type=document
    return instance.get(constant.Document + `?type=${type}&page=${page}`)
}