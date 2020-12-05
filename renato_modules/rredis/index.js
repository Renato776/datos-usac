const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

client.on("error",function(error){
  console.log(error);
});

const redis_client = {
  hmkeys : async function(regex){
    const k = await redis_client.query('keys',regex);
    const hmaps = [];
    for (key of k){
      hmaps.push(await redis_client.query('hgetall',key));
    }
    return hmaps;
  },
  query : function (type, ...rest) {
    return new Promise( (resolve,reject) =>  {
      switch (type){
        case 'set': 
          client.set(rest[0],rest[1],(err,res)=>{
            if(err) reject(err);
            resolve(res);
          }); break;
        case 'get':
          client.get(rest[0],(err,res)=>{
            if(err) reject(err);
            resolve(res);
          });
        case 'hgetall': 
          client.hgetall(rest[0],(err,res)=>{
            if(err) reject(err);
            resolve(res);
          }); break;
        case 'hmset':
          const hm = rest[1]; //An object
          const redisHM = [];
          for(key in hm){
            redisHM.push(key);
            redisHM.push(hm[key]);
          }
          client.hmset(rest[0],redisHM,(err,res) => {
            if(err) reject(err);
            resolve(res);
          }); break;
        case 'incr':
          client.incr(rest[0],(err,res)=>{
            if(err)reject(err);
            resolve(res);
          }); break;
        case 'hget':
          client.hget(rest[0],rest[1],(err,res)=>{
            if(err)reject(err);
            resolve(res);
          }); break;
        case 'hset':
          client.hset(rest[0],rest[1],rest[2],(err,res)=>{
            if(err)reject(err);
            resolve(res);
          }); break;
        case 'keys':
          client.keys(rest[0],(err,res)=>{
            if(err)reject(err);
            resolve(res);
          });break;
        case 'del':
          client.del(rest[0],(err,res)=>{
            if(err)reject(err);
            resolve(res);
          });break;
        case 'eval':
          client.eval(rest[0],rest[1],(err,res)=>{
            if(err)reject(err);
            resolve(res);
          });break;
        case 'hmkeys':
          redis_client.hmkeys(rest[0]).then(v=>{
            resolve(v);
          }).catch((err)=>{reject(err)});
          break;
        //default: reject('Invalid or unimplemented Redis command: '+type);
        default: 
          client[type](...rest,(err,res)=>{
            if(err) reject (err);
            resolve(res);
          });
      }
    }
    );
  }
};

exports.query = redis_client.query;
