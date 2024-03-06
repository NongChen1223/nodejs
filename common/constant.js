//API的JSON数据格式校验模板
import { STATE_CODE } from "./status.js";
//最小页大小
export const DEFAULT_MIN_PAGESIZE = 5;//默认最小页数
export const DEFAULT_PAGECURRENT = 1; //默认当前页面
//最大页大小
export const DEFAULT_MAX_PAGESIZE = 100;
export class CustomError extends Error {
    constructor(message = '',code = STATE_CODE.FAIL, extra_args = null) {
        super();
        this.args = undefined;
        this.code = code;
        if(message){
            this.message  = message
        }
        // if(error)
        //     this.error  = error
        if (extra_args)
            this.args = extra_args;
    }
}
export const API_JSON_SCHEMA = {
    response: {
        200: {
            type: 'object',
            properties: {
                code: {type: 'number'},
                message: {type: 'string'},
                data: {
                    type: 'object',
                    additionalProperties: true
                },
                time: {type: 'number'},
            }
        }
    }
};
