import { DefaultContext } from "koa";

// app.js
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new koa();
const Router = require('koa-router');
const router = new Router();
const koaStatic = require('koa-static');
const path = require('path');

const { sign } = require('jsonwebtoken');
const secret = 'my_secret';
const jwt = require('koa-jwt')({ secret });

app.use(bodyParser())
app.use(koaStatic(path.join(__dirname, '../static')))

router.post('/login', async (ctx: DefaultContext, next: any) => {
    const { userName } = ctx.request.body;
    if (userName) {
        const token = sign({ userName }, secret, {
            expiresIn:
                '1h'
        });
        ctx.body = {
            mssage: 'get token success!',
            code: 1,
            token
        }
    } else {
        ctx.body = {
            message: 'param error',
            code: -1
        }
    }
})


router.get('/welcome', jwt, async (ctx: DefaultContext, next: any) => {
    ctx.body = { message: 'welcome!!!' }
})

app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(1234, () => {
    console.log('server is running, port is 1234')
})