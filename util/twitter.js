import axios from "axios";
/*
* https://rapidapi.com/omarmhaimdat/api/twitter154
*
* */
async function getChainingViewFollowers(){
    try {
        const apiClient = axios.create({
            baseURL:`https://twitter154.p.rapidapi.com/`,
            timeout:20000,
            params:{
                user_id:''
            },
            headers:{
                'X-RapidAPI-Key': '1cc50c91famsh21a6c5eef582075p1ef43cjsn4ef43ced59b1',
                'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
            },
        })
        const res = await apiClient.get(`user/details`)
        const { follower_count, following_count } = res.data
        console.log('get success',follower_count)
        return  res;
    }catch (err){
        console.log(`GET request error${err}`)
        // throw new CustomError(`GET request error${err}`)
    }
}
getChainingViewFollowers()