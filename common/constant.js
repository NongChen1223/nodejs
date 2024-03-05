//API的JSON数据格式校验模板
// import {STATE_CODE} from "./status";

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
