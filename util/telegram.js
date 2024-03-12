import axios from "axios";
import HttpsProxyAgent from 'https-proxy-agent';
/*
*   https://api.telegram.org/bot<token>/METHOD_NAME
*   例子 https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe
*
*  */


async function TelegramGetMember(){
    // console.log('执行查询群聊人数')
    try {
        const apiClient = axios.create({
            baseURL:TelegarmURL,
            timeout:5,
            headers:{
                'Content-Type': 'application/json',
            },
            httpsAgent: new HttpsProxyAgent.HttpsProxyAgent({
                host: '127.0.0.1',
                port: 1080
            })
        })
        const res = await  apiClient.post(`bot${TelegarmToken}/getChatMemberCount`,{ chat_id:TelegarmChat })
        console.log('查询群聊人数',res.data)
        return  Promise.resolve(res.data.result)
    }catch (err){
        console.log(`post request error${err}`)
        Promise.reject()
    }
}
// TelegramGetMember()
export {
    TelegramGetMember
}