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
    let instance = axios.create({
        baseURL:constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers: {
            'content-type': "application/json",
            "page":page
        }
    });
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.SELL_PRODUCT)
}
export const getLiquidation=async(page)=>{
    let instance = axios.create({
        baseURL:constant.BASEURL,
        timeout: constant.SERVER_TIMEOUT,
        headers: {
            'content-type': "application/json",
            "page":page
        }
    });
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIQUIDATION)
}