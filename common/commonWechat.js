const request=require('request');
 let user = (params) =>{
    return new Promise((relove,reject)=>{
        request(params,(err,res,req)=>{
            if (!err&&res.statusCode==200) {
                relove(req)
            }else{
                reject(err)
            }
        })
    })
}
let access_token=''
module.exports={
    access_token,
    user
}