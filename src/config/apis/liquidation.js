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


export const getListLiquidation  = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.LIST_LIQUIDATION,{params:body})
}
export const postLiquidation = async(body)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.LIST_LIQUIDATION,{params:body})
}
export const getDetailLiquidation = async(Liquidation_id)=>{
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.DETAIL_LIQUIDATION +`/${Liquidation_id}`)
}
// export const Count_Notification = async()=>{
//     let token = await getItem('token')
//         instance.defaults.headers.common['Authorization'] = "Bearer " + token;
//         return instance.get(constant.COUNT_NOTIFICATION)
// }