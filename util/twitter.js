import axios from "axios";
// import config from "config"
/*
* https://rapidapi.com/omarmhaimdat/api/twitter154
*
* */
async function getChainingViewFollowers(){
    try {
        const apiClient = axios.create({
            baseURL:`https://twitter-api45.p.rapidapi.com/`,
            timeout:20000,
            params:{
                rest_id:"",
                screenname:''
            },
            headers:{
                // 'X-RapidAPI-Key': config.get("twtter.RapidAPI_key"),
                // 'X-RapidAPI-Host': config.get("twtter.RapidAPI_host")
                'X-RapidAPI-Key': "",
                'X-RapidAPI-Host': "twitter-api45.p.rapidapi.com"
            },
        })
        const res = await apiClient.get(`followers.php`)
        // const { follower_count, following_count } = res.data
        console.log('get success',res.data.followers_count)
        // return  follower_count;
    }catch (err){
        console.log(`GET request getChainingViewFollowers error${err}`)
    }
}
getChainingViewFollowers()
// export {
//     getChainingViewFollowers
// }