import axios from 'axios'
import constant from './constant';
import { getItem } from 'config/Controller';
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers: {'content-type': "application/json"}
});


export const signup = (body, token) => {
    return instance.post(constant.NEW_BIDDING, body)
}

export const login = body => {
    return instance.post(constant.LOGIN, body)
}

