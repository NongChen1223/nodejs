// const schedule  = require('node-schedule')
import schedule from 'node-schedule'
import {db} from "../util/mongodb.js";
import {getChainingViewFollowers} from '../util/twitter.js'

const db_telegram = db.mongo.test_db.collection('twitter_number')

// 创建一个定时任务，每分钟执行一次
const job = schedule.scheduleJob('* * * * *', function () {
    // console.log('定时任务启动');
    try {
        getTwitterNumber(1)
    } catch (err1) {
        console.log('err1 Twitter 定时任务！！', err1)
        try {
            getTwitterNumber(2)
        } catch (err2) {
            console.log('err2 Twitter 定时任务！！', err2)
            try {
                getTwitterNumber(3)
            } catch (err3) {
                console.log('err3 Twitter 定时任务！！', err3)
            }
        }
    }
    // 在这里执行任务的逻辑
});

//type 1 第一次就成功 2第二次请求才成功 3只能获取上一次数据
async function getTwitterNumber(type = 1) {
    // console.log('getTelegramNumber！！！！', type)
    if (type === 1 || type === 2) {
        const res = await getChainingViewFollowers()
        let creat_time = new Date().getTime()
        db_telegram.insertOne({
            creat_time,
            count: res,
            type
        })
    } else if (type === 3) {
        //查找最后一条数据插入
        let last = await db_telegram.findOne({}, {sort: {_id: -1}})
        let creat_time = new Date().getTime()
        db_telegram.insertOne({
            creat_time,
            count: last.count,
            type
        })
    }
}