import { API_JSON_SCHEMA } from "../common/constant.js";
import  { STATE_CODE } from  "../common/status.js";
import { db } from  '../util/mongodb.js'
import { ObjectId  } from "mongodb";
export async function api_router(fastify) {
    // console.log('开始路由', fastify)
    function RouteAdd(method = 'POST', path = '', handler) {
        fastify.route({
            method:method,
            path,
            schema: API_JSON_SCHEMA,
            handler
        })
    }
    RouteAdd('POST', '/test',  async (req,reply) => {
        const { body } = req
        console.log('获取请求体',body);
        return {
            code: 200,
            data: {
                msg: '嘿嘿嘿 老子来了嗷'
            },
            message: 'cnm'
        }
    });
    RouteAdd('POST','/notice/add',async(req,reply)=>{
        const { body } = req
        try {
            if(!body.title){
                throw new Error('请输入公告标题')
            }
            if(!body.content){
                throw new Error('请输入公告内容')
            }
            const db_notice =  db.mongo.test_db.collection('notice')
            let t_date = new Date().getTime()
            let res = await db_notice.insertOne({
                t_date,
                t_title:body.title,
                t_content:body.content,
                t_name:body?.name || 'admin'
            })
            return {
                code: STATE_CODE.SUCCESS,
                data: res,
                message: "创建公告成功"
            }
        }catch (err){
            throw new Error('创建公告失败',err)
        }

    })
    RouteAdd('POST','/notice/delet',async (req,reply)=>{
        const { body } = req
        try {
            if(!body.ids || body.ids.length == 0){
                throw new Error('请传入公告ID')
            }
            const db_notice =  db.mongo.test_db.collection('notice')
            const res = db_notice.deleteMany({
                _id:{ $in:ids.map(id=>ObjectId(id)) }
            })
            return {
                code: STATE_CODE.SUCCESS,
                data: res,
                message: "删除公告成功"
            }
        }catch (err){
            throw new Error('删除公告失败',err)
        }
    })
    RouteAdd('POST','/notice/getList',async (req,reply)=>{

    })
}