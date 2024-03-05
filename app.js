import Fastify from 'fastify';
import { api_router } from './router/index.js'
import { db } from  './util/mongodb.js'
const fastify = Fastify({
    bodyLimit: 512 * 1024 * 1024
});
/* 
  run server!
*/
fastify.register(api_router,{prefix: "/dev/"})
const startServer = async ()=>{
    console.log('start !!!!')
    try{
      let res= await fastify.listen({ port:3000, host: '0.0.0.0' })
        // console.log('start !!!!',res)
        await db.mongo.connect() //创建连接池
        await db.mongo.test_db_connect()//连接指定数据库
    }catch(err){
        console.log('app.js error!!!',err)
        fastify.log.error(err)
    }
}
startServer()