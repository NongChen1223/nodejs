import { DEFAULT_MIN_PAGESIZE,DEFAULT_PAGECURRENT,CustomError } from "../common/constant.js";
import  { STATE_CODE } from  "../common/status.js";
import { db } from  '../util/mongodb.js'
import { ObjectId  } from "mongodb";
import  { vaerifyTimestamp } from  '../util/verify.js'
console.log('路由文件被执行')
const db_notice =  db.mongo.test_db.collection('bulletin');

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
            let res = await db_notice.insertOne({
                date,
                title:body.title,
                content:body.content,
                name:body?.name || 'admin',
                isDelete:false,//删除
                status:true,//上下架状态
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

            const res = db_notice.updateMany(
                { _id:{ $in:body.ids.map(id=> new ObjectId(id)) } },
                { $set: { "isDelete": true }}
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
            const res = db_notice.updateMany(
                { _id:{ $in:body.ids.map(id=> new ObjectId(id)) } },
                { $set: { "status": body?.status }}
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
        console.log('公告详情参数',body)
        if(!body?.id){
            throw new CustomError("请传入公告ID", STATE_CODE.SUCCESS);
        }
        try {
            const res = await db_notice.findOne({
                _id:new ObjectId(body.id),
                isDelete:false
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
            isDelete:false
        }
        if(body?.id){
            query._id = new ObjectId(body.id)
        }
        if(body?.title){
            query.title = {  $regex: body?.title, $options: 'i' }
        }
        if(body?.name){
            query.name = {  $regex: body?.name }
        }
        if(body?.start_time && body?.end_time){
            query.date = {
                $gte: body.start_time,
                $lte: body.end_time
            }
        }
        try {
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
    static async updateNoticeDetail(req,reply){
        const { body } = req
        let { id,...params } = body
        if(!body.id){
            throw new CustomError("公告ID不可为空");
        }
        let updateObj = {}
        let noticeInfo = await db_notice.findOne({
            _id:new ObjectId(body.id),
        })
        console.log('查询出对应公告信息',noticeInfo)
        if(!noticeInfo){
            throw new CustomError("该公告不存在");
        }
        for(let i in noticeInfo){
            updateObj[i] = params[i] ? params[i] : noticeInfo[i]
        }
        if(!updateObj.title){
            throw new CustomError("标题不能为空");
        }
        if(!updateObj.date){
            throw new CustomError("发布时间不能为空");
        }
        if(!updateObj.vaerifyTimestamp(date)){
            throw new CustomError("时间戳不正确");
        }
        if(!updateObj.content){
            throw new CustomError("公告内容不能为空");
        }
        try {
            console.log('需要修改的对象',updateObj)
            await  db_notice.updateOne(
                {_id:new ObjectId(id)},
                { $set:updateObj }
            )
            return {
                code: STATE_CODE.SUCCESS,
                data: {},
                message: "编辑公告成功"
            }
        }catch (err){
            throw new CustomError("编辑公告失败");
        }
    }
}