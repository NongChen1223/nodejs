import { FastifyInstance, HTTPMethods } from "fastify";
export async function api_router() {
    // console.log('开始路由', fastify)
    function routerAdd(method = 'POST', path = '', handler) {
        FastifyInstance.router({
            method,
            path,
            schema: {
                200: {
                    type: 'object',
                    properties: {
                        code: { type: 'number' },
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            additionalProperties: true
                        },
                        time: { type: 'number' },
                    }
                }
            },
            handler
        })
    }
    routerAdd('GET', '/a1', () => {
        return {
            code: 200,
            data: {
                msg: '嘿嘿嘿 老子来了嗷'
            },
            message: 'cnm'
        }
    })
}