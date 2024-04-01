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
            timeout:5000,
            params:{
                rest_id:''
            },
            headers:{
                // 'X-RapidAPI-Key': config.get("twtter.RapidAPI_key"),
                // 'X-RapidAPI-Host': config.get("twtter.RapidAPI_host")
                'X-RapidAPI-Key': "1cc50c91famsh21a6c5eef582075p1ef43cjsn4ef43ced59b1",
                'X-RapidAPI-Host': "twitter-api45.p.rapidapi.com"
            },
        })
        const res = await apiClient.get(`timeline.php`)
        // const { follower_count, following_count } = res.data
        console.log('get success',res.data?.user?.sub_count)
        // return  follower_count;
    }catch (err){
        console.log(`GET request getChainingViewFollowers error${err}`)
    }
}
getChainingViewFollowers()
// export {
//     getChainingViewFollowers
// }