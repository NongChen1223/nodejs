import Fastify from 'fastify';
import { api_router } from './router/index.js'
const fastify = Fastify({
    bodyLimit: 512 * 1024 * 1024
});
/* 
  run server!
*/
fastify.register(api_router,{prefix: "/a/"})
const startServer = async ()=>{
    console.log('start !!!!')
    try{
      await fastify.listen({ port:3000 })
    }catch(err){
        fastify.log.error(err)
        console.log('app.js error!!!',err)
    }
}
startServer()