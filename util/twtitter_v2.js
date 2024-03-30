import axios from "axios";
/*
* https://rapidapi.com/omarmhaimdat/api/twitter154
* https://rapidapi.com/alexanderxbx/api/twitter-api45
* 第三方来源
* */
const ChainingViewID = '1724003143040790528'
async function getChainingViewFollowers(){
    try {
        const apiClient = axios.create({
            baseURL:`https://twitter-api45.p.rapidapi.com/`,
            timeout:10000,
            params:{
                rest_id:ChainingViewID,
                screenname:'ChainingView'
            },
            headers:{
                // 'X-RapidAPI-Key': '1cc50c91famsh21a6c5eef582075p1ef43cjsn4ef43ced59b1',
                // 'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
                'X-RapidAPI-Key': "1cc50c91famsh21a6c5eef582075p1ef43cjsn4ef43ced59b1",
                'X-RapidAPI-Host': "twitter-api45.p.rapidapi.com"
            },
        })
        const res = await apiClient.get(`usermedia.php`)
        // const { follower_count, following_count } = res.data
        console.log('获取结果！！',res.data)
        console.log('获取推特粉丝人数',res.data?.user?.sub_count)
        return res.data?.user?.sub_count;
    }catch (err){
        console.log(`GET getChainingViewFollowers request  error${err}`)
    }
}
getChainingViewFollowers()
