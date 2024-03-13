import mongodb from 'mongodb'

const {MongoClient} = mongodb


const client = new MongoClient(URL)

async function initDataBase() {
    try {
        await client.connect()
        const db = client.db(DB_NAME)
        const collection = db.collection(TABLE_NAME);
        console.log('connect success', collection)
        collection.insertOne({
            title: "发布第一条公告啊啊啊啊啊啊！！",
            name: '我是发布人',
            type: "update",
            content: ` 高性能
            MongoDB提供高性能的数据持久性。特别是，
            对嵌入式数据模型的支持减少了数据库系统上I/O活动。
            索引支持更快的查询，并且可以包含来自嵌入式文档和数组的键。（文本索引解决搜索的需求、TTL索引解决历史数据自动过期的需求、地理位置索引可用于构建各种O2O应用）
            mmapv1、 wiredtiger、 mongorocks（ rocks）、 In-memory等多引擎支持满足各种场景需求
            Gridfs解决文件存储的需求
            高可用性
            MongoDB的复制工具称为副本集（ replica set），它可提供自动故障转移和数据冗余
            高扩展性
            MongoDB提供了水平可扩展性作为其核心功能的一部分。
            分片将数据分布在一组集群的机器上。（海量数据存储，服务能力水平扩展）
            从3.4开始，MoηgoDB支持基于片键创建数据区域。在一个平衡的集群中， MongoDB将一个区域所覆盖的读写只定向到该区域内的那些片
            `
        })

    } catch (err) {
        console.log('connect db error!!!!!!', err)
    }
}

// initDataBase()
// export  {
//     initDataBase
// }