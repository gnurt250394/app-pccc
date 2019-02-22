import axios from 'axios'
import { UrlName } from '.'
import constant from './constant';
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT
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

export const getWithToken= async (url)=>{
    let instance = axios.create({
        baseURL: constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers:{
            'Authorization':'',
            'Content-Type':''
        }
    });
    return instance.get(url).then(response=>{
        if(response.data.code===200){
            return response.data
        }
    }).catch((error)=>{
        console.log(error),
        console.log(url)
    })
}

export const putWithToken = async (url,params)=>{
    let instance = axios.create({
        baseURL: constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers:{
            'Authorization':'',
            'Content-Type':''
        }
    });
    return instance.put(url,params).then(res=>{
        if(res.data.code === 200){
            return res.data
        }
    }).catch((err)=>{
        console.log(err)
        console.log(url)
    })
}
export const postWithToken= async (url,params)=>{
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers:{
        'Authorization':'',
        'Content-Type' :''
    }
});
instance.post(url,params).then(res=>{
    if(res.data.code===200){
        return res.data
    }
}).catch(err=>{
    console.log(err)
    console.log(url)
})
}

export const deleteWithToken = async (url,params)=>{
    let instance = axios.create({
        baseURL:constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers:{
            'Authorization':'',
            'Content-Type' :''
        }
    });
    instance.delete(url,params).then((res)=>{
        if(res.data.code ===200){
            return res.data
        }
    }).catch((err)=>{
        console.log(err)
        console.log(url)
    })
}

export const uploadImage=async(url,Uri)=>{
    let data = new FormData()
    let name = `IMG_${new Date().getFullYear()}.jpeg`
    data.append('image',{uri:Uri,type:'image/jpeg',name:name},name)

    let instance = axios.create({
        baseURL:constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers:{
            'Authorization':'',
            'Content-Type': 'multipart/form-data'
        }
    });
    instance.post(url,data).then(res=>{
        if(res.data.code ===200){
            return res.data
        }
    }).catch(err=>{
        console.log(err)
        console.log(url)
    })
}