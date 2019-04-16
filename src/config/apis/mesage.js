
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

export const getMessage=async(page= '1')=>{
 
//     let token = await getItem('token')
      //   instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.MESSAGE,{params:{page:page}})
}
export const postMessage=async(body)=>{
 
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.MESSAGE,body)
}
