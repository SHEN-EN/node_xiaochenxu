const router=require('koa-router')();
const userInfApi=require('../common/commonWechat')
const mysql=require('../mysql/mysql');
router.post('/getCode', async (cxt,req)=>{
    if(cxt.request.body.code){//拿到前台code请求微信接口
        try {
            let url=`https://api.weixin.qq.com/sns/jscode2session?appid=wx853a3f1b760d7bfb&secret=6d79c209efe4a1ff98c31381871f1d9d&js_code=${cxt.request.body.code}&grant_type=authorization_code`
           let query= await userInfApi.user(url)
            let value=JSON.parse(query);
              cxt.body={
                value
             }
        } catch (error) {
            console.log(error)
        }
    }
}).post('/userInfo', async (cxt,req)=>{
    let requestJson=cxt.request.body
    let query=await mysql.SELECTUSERINFO((requestJson.openid));
    if (query.length==0) {
        console.log(requestJson)
        let params=[requestJson.openid,requestJson.userInfo.nickName,requestJson.userInfo.city,requestJson.userInfo.province,requestJson.userInfo.country,requestJson.userInfo.avatarUrl,requestJson.userInfo.gender]
        let InsertQuery=await mysql.INSERTUSERINFO(params);
        cxt.body={
            msg:'成功插入信息'
        }
    }else{
        cxt.body={
            msg:'已有此用户信息'
        }
    }
})
module.exports=router


