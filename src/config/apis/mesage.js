
import axios from 'axios'
import constant from './constant';
import { getItem } from 'config/Controller';
import Echo from 'laravel-echo/dist/echo';
import SocketIOClient from 'socket.io-client';
let instance = axios.create({
    baseURL:constant.BASEURL,
    timeout: constant.SERVER_TIMEOUT,
    headers: {
        'content-type': "application/json",
    }
});

export const getMessage=async(page)=>{
 
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.get(constant.MESSAGE,{params:{page:page}})
}
export const postMessage=async(body)=>{
 
    let token = await getItem('token')
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
        return instance.post(constant.MESSAGE,body)
}
export const listMessage=async()=>{
 
  let token = await getItem('token')
      instance.defaults.headers.common['Authorization'] = "Bearer " + token;
      return instance.get(constant.LIST_MESSAGE)
}

export const LaravelEchoConfig = async () => {
    let token =await getItem('token')
    let echo = new Echo({
      broadcaster: 'socket.io',
      host: constant.BASE_SOCKET,
      client: SocketIOClient,
      auth: {
        headers: {
          'Authorization': 'Bearer '  + token
        },
      },
    });

      
      echo.channel('chatroom')
      .listen('MessagePosted', data => {
          return data
      })
  }