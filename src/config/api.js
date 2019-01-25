import axios from 'axios'
import { UrlName } from '.'

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