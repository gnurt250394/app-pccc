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


export const getListLiquidation  = async(body,token)=>{
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIST_LIQUIDATION,{params:body})
}
export const postLiquidation = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.LIST_LIQUIDATION,body)
}
export const getDetailLiquidation = async(Liquidation_id)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIST_LIQUIDATION +`/${Liquidation_id}`)
}
export const deleteLiquidation = async(params)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.delete(constant.LIST_LIQUIDATION + `/${params}`)
}
export const updateLiquidation = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.UPDATE_LIQUIDATION,body )
}