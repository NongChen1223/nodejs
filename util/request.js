import axios from "axios";
import { CustomError } from "../common/constant.js";
async function get(url,params,baseURL){
    try {
        const apiClient = axios.create({
            baseURL,
            timeout:20000,
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const res = await  apiClient.get(url,{params})
        console.log('get success',res)
        return  res;
    }catch (err){
        console.log(`GET request error${err}`)
        // throw new CustomError(`GET request error${err}`)
    }
}

async function post(url,params,baseURL){
    try {
        const apiClient = axios.create({
            baseURL,
            timeout:20000,
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const res = await  apiClient.post(url,{params})
        console.log('post success',res)
        return  res;
    }catch (err){
        console.log(`POST request error${err}`)
        // throw new CustomError(`POST request error${err}`)
    }
}
export {
    get,
    post
}