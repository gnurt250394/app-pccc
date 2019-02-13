import axios from 'axios'
import { UrlName } from '.'
import constant from './constant';

export const signup = async (token, body) => {
    console.log('body: ', body);
    return axios({
        method: 'post',
        url: `${UrlName.base}${UrlName.signup}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: body
    }).then(res => {
        return res.data
    }).catch(err => {
        return false
    })
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