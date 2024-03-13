import axios from "axios";
import config from "config"
/*
* https://rapidapi.com/omarmhaimdat/api/twitter154
*
* */
async function getChainingViewFollowers(){
    try {
        const apiClient = axios.create({
            baseURL:`https://twitter154.p.rapidapi.com/`,
            timeout:5000,
            params:{
                user_id:'1724003143040790528'
            },
            headers:{
                'X-RapidAPI-Key': config.get("twtter.RapidAPI_key"),
                'X-RapidAPI-Host': config.get("twtter.RapidAPI_host")
            },
        })
        const res = await apiClient.get(`user/details`)
        const { follower_count, following_count } = res.data
        console.log('get success',follower_count)
        return  follower_count;
    }catch (err){
        console.log(`GET request getChainingViewFollowers error${err}`)
    }
}

export {
    getChainingViewFollowers
}