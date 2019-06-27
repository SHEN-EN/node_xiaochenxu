const mysql=require('mysql')
let db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:"xiaochenxu"
})
let  control = (sql,value) =>{
    return new Promise((resolve,reject)=>{
        db.getConnection((err,connection)=>{//连接数据库
            if(err)reject('数据库连接错误'+err)
            else{
                connection.query(sql,value, async (err,data)=>{//sql语句
                    if(err)reject(err)
                    else {
                        resolve(data)
                    }
                    connection.release()  
                })
            }
        })
})
}
let INSERTUSERINFO= params =>{
    let sql='INSERT INTO tb_user(openid,nickname,city,provice,county,headerImg,sex) VALUES(?,?,?,?,?,?,?)'
    return control(sql,params)
}
let SELECTUSERINFO= params =>{
    let sql=`SELECT * FROM tb_user WHERE openid='${params}'`
   return control(sql)
}
module.exports={
    control,
    INSERTUSERINFO,
    SELECTUSERINFO
}