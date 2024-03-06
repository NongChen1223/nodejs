import { Notice_Router } from  '../views/notice.js'
import { API_JSON_SCHEMA} from "../common/constant.js";
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
    RouteAdd('POST','/notice/add',Notice_Router.addNotice)
    RouteAdd('POST','/notice/update',Notice_Router.updateNotice)
    RouteAdd('POST','/notice/delete',Notice_Router.deletNotice)
    RouteAdd('POST','/notice/getList',Notice_Router.getNoticeList)
    RouteAdd('POST','/notice/detail',Notice_Router.getNoticeDetail)
}