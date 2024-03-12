// const schedule  = require('node-schedule')
import schedule from 'node-schedule'
import {db} from "../util/mongodb.js";
import {TelegramGetMember} from '../util/telegram.js'
const db_telegram = db.mongo.test_db.collection('telegram_number')


// 创建一个定时任务，每分钟执行一次
const job = schedule.scheduleJob('*/10 * * * * *', function () {
    console.log('定时任务启动');
    try {
        getTelegramNumber(1)
    } catch (err1) {
        try {
            getTelegramNumber(2)
        } catch (err2) {
            try {
                getTelegramNumber(3)
            } catch (err3) {

            }
        }
    }
    // 在这里执行任务的逻辑
});
//type 1 第一次就成功 2第二次请求才成功 3只能获取上一次数据
async function getTelegramNumber(type = 1) {
    if (type === 1 || type === 2) {
        const res = await TelegramGetMember()
        let creat_time = new Date().getTime()
        db_telegram.insertOne({
            creat_time,
            count: res.result,
        })
    } else if (type === 3) {
        //查找最后一条数据插入
        let last = db_telegram.findOne({}, {sort: {_id: -1}})
        let creat_time = new Date().getTime()
        db_telegram.insertOne({
            creat_time,
            count: last.count,
        })
    }

}