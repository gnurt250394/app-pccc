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

export const getProduct=async(page)=>{
 
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.SELL_PRODUCT,{params:{page:page}})
}
export const postProduct=async(body)=>{
 
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.SELL_PRODUCT,body)
}
export const getLiquidation=async(page)=>{
    
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIQUIDATION,{params:{page:page}})
}
export const getOtherData=(body)=>{
    
        // instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.Data_other,{params:body})
}