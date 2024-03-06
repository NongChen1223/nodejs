import { DEFAULT_MIN_PAGESIZE,DEFAULT_PAGECURRENT,CustomError } from "../common/constant.js";
import  { STATE_CODE } from  "../common/status.js";
import { db } from  '../util/mongodb.js'
import { ObjectId  } from "mongodb";
import  { vaerifyTimestamp } from  '../util/verify.js'

export class Notice_Router{
    static async addNotice(req,reply){
        const { body } = req
        if(!body.title){
            throw new CustomError("请输入公告标题")
        }
        if(!body.content){
            throw new CustomError("请输入公告内容")
        }
        let t_date = new Date().getTime()
        if(body?.date){
            const res = vaerifyTimestamp(body.date)
            if(!res){
                throw new CustomError("请传入正确的发布时间")
            }
            t_date = body?.date
        }
        try {
            const db_notice =  db.mongo.test_db.collection('notice')
            let res = await db_notice.insertOne({
                t_date,
                t_title:body.title,
                t_content:body.content,
                t_name:body?.name || 'admin',
                t_isDelete:false,//删除
                t_status:true,//上下架状态
            })
            return {
                code: STATE_CODE.SUCCESS,
                data: res,
                message: "创建公告成功"
            }
        }catch (err){
            throw new CustomError("创建公告失败", STATE_CODE.SUCCESS)
        }
    }
    static  async deletNotice(req,reply){
        const { body } = req
        if(!body.ids || body.ids.length == 0){
            throw new CustomError("请传入公告ID", STATE_CODE.SUCCESS);
        }
        try {
            const db_notice =  db.mongo.test_db.collection('notice')
            const res = db_notice.updateMany(
                { _id:{ $in:body.ids.map(id=> new ObjectId(id)) } },
                { $set: { "t_isDelete": true }}
            )
            return {
                code: STATE_CODE.SUCCESS,
                data: res,
                message: "删除公告成功"
            }
        }catch (err){
            console.log('删除公告失败',err)
            throw new CustomError("删除公告失败");
        }
    }
    static async updateNotice(req,reply){
        const { body } = req
        // console.log('更改公告状态',body.ids,body.ids.length)
        if(!body.ids || body.ids.length == 0){
            throw new CustomError("请传入公告ID", STATE_CODE.SUCCESS);
        }
        if(!typeof body?.status === 'boolean'){
            throw new CustomError("请传入正确的公告状态", STATE_CODE.SUCCESS);
        }
        try {
            const db_notice =  db.mongo.test_db.collection('notice')
            const res = db_notice.updateMany(
                { _id:{ $in:body.ids.map(id=> new ObjectId(id)) } },
                { $set: { "t_status": body?.status }}
            )
            return {
                code: STATE_CODE.SUCCESS,
                data: res,
                message: "更新公告状态成功"
            }
        }catch (err){
            console.log('更新公告状态失败',err)
            throw new CustomError("更新公告状态失败");
        }
    }
    static async getNoticeDetail(req,reply){
        const { body } = req
        const db_notice =  db.mongo.test_db.collection('notice')
        console.log('公告详情参数',body)
        if(!body?.id){
            throw new CustomError("请传入公告ID", STATE_CODE.SUCCESS);
        }
        try {
            const res = await db_notice.findOne({
                _id:new ObjectId(body.id),
                t_isDelete:false
            })
            console.log('查询公告详情',res)
            return {
                code: STATE_CODE.SUCCESS,
                data: res || {},
                message: "获取公告详情成功"
            }
        }catch (err){
            console.log('查询失败',err)
            throw new CustomError("查询失败", STATE_CODE.SUCCESS);
        }
    }
    static async getNoticeList(req,reply){
        const { body } = req
        const { pageSize = DEFAULT_MIN_PAGESIZE,pageCurrent = DEFAULT_PAGECURRENT } = body
        const query = {
            t_isDelete:false
        }
        if(body?.id){
            query._id = new ObjectId(body.id)
        }
        if(body?.title){
            query.t_title = {  $regex: body?.title, $options: 'i' }
        }
        if(body?.name){
            query.t_name = {  $regex: body?.name }
        }
        if(body?.start_time && body?.end_time){
            query.t_date = {
                $gte: body.start_time,
                $lte: body.end_time
            }
        }
        try {
            const db_notice =  db.mongo.test_db.collection('notice')
            const total = await db_notice.countDocuments(query)
            console.log('查询总页数',total)
            const list = await db_notice
                .find(query)
                .skip((pageCurrent - 1) * pageSize)
                .limit(pageSize)
                .toArray()
            console.log('返回结果',list)
            return {
                code: STATE_CODE.SUCCESS,
                data: {
                    total:total,
                    data:list
                },
                message: "获取公告列表成功"
            }
        }catch (err){
            throw new CustomError("获取公告列表失败", STATE_CODE.SUCCESS);
        }
    }
}