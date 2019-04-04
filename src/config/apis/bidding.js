import axios from 'axios'
import constant from './constant';
import { getItem } from 'config/Controller';
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers: {'content-type': "application/json"}
});


export const listBiddings = async page => {
    let token = await getItem('token')
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.get(constant.NEW_BIDDING ,{params:{page:page}})
}

export const detailBidding = async id => {
    return instance.get(constant.NEW_BIDDING + '/' + id)
}

export const search = async params => {
    let token = await getItem('token')
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return instance.get(constant.SEARCH + params)
}

