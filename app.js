import Fastify from 'fastify';
import { api_router } from './router/index.js'
import { db } from  './util/mongodb.js'
import { initI18n,chageLang } from './language/index.js'
const fastify = Fastify({
    bodyLimit: 512 * 1024 * 1024
});
/* 
  run server!
*/
fastify.register(api_router,{prefix: "/dev/"})

/*
* 请求钩子 通过header获取语言切换
* */
fastify.addHook('onRequest', (request, reply,done) => {
    chageLang(request.headers.lang)
    done()
})
const startServer = async ()=>{
    console.log('start !!!!')
    try{
        await db.mongo.connect() //创建连接池
        await db.mongo.test_db_connect()//连接指定数据库
        await fastify.listen({ port:3000, host: '0.0.0.0' })
        // import ("./schedulers/index.js")
        initI18n()
    }catch(err){
        console.log('app.js error!!!',err)
        fastify.log.error(err)
    }
}
startServer()