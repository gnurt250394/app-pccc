import axios from 'axios'
import constant from './constant';
import { getItem } from 'config/Controller';
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers: {'content-type': "application/json"}
});


export const listBiddings = async () => {
    let token = await getItem('token')
    
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.get(constant.NEW_BIDDING)
}

export const search = async params => {
    return instance.get(constant.SEARCH + params)
}

