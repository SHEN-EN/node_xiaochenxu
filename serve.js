const koa=require('koa');
const serve= new koa();
const koaBodyparser=require('koa-bodyparser');
const koaCookie=require('koa-cookie');
const cors=require('koa-cors');
serve.use(cors());
serve.use(koaBodyparser());
serve.use(require('./router/userInfo').routes());
serve.listen(5555)

