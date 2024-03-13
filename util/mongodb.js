import {MongoClient} from "mongodb";
import config from "config"
class MongoUtil{
    static instance = null;
    URL
    client
    test_db
    constructor(config) {
        if(!MongoUtil.instance){
            console.log('初始化 MongoDB!!!');
            this.URL = config.url
            this.client = new MongoClient(this.URL);
            MongoUtil.instance = this;
        }
        return MongoUtil.instance;
    }
    async connect(){
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
        }catch (err){
            console.error('Error connecting to MongoDB:', error);
        }
    }
    test_db_connect(){
        try {
            this.test_db =  this.client.db('xww_test_mongdb')
            console.log("初始化test_db成功")
        }catch (err){
            console.log('获取xww_test_mongdb失败!!!',err);
        }
    }
    db(dbName){
        try {
            return this.client.db(dbName)
        }catch (err){
            console.log('获取DB失败!!!',dbName,err);
        }
    }
}
const db_config = {
    // url:'mongodb://192.168.150.236:27017'
    url:config.get("mongo_test.url")
}
export class db{
    static mongo = new MongoUtil(db_config)
}

