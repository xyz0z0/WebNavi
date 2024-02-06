import Koa, { DefaultContext } from 'koa';
import fs from 'fs/promises';
import path from 'path';
import bodyParse from 'koa-bodyparser';
import render from 'koa-ejs';
import bodyParser from 'koa-bodyparser';
const Router = require('koa-router')
import { renderClickableLinks } from './utils'; // 导入辅助函数

const app = new Koa()

const router = new Router()
const dataPath = path.join(__dirname, "../static/data.json")
render(app, {
    root: path.join(__dirname, "../static"),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
});

// 中间件用于读取 JSON 文件
app.use(async (ctx, next) => {
    try {
        // 读取 JSON 文件内容
        const jsonData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(jsonData);
        ctx.state.data = data; // 将数据存储在 Koa 上下文中，以便后续中间件可以访问
    } catch (error) {
        console.error('Error reading JSON file:', error);
        ctx.state.data = []; // 如果文件不存在或读取失败，将数据设置为空数组
    }
    await next();
});

router.get('/', async (ctx: DefaultContext) => {
    console.log(">>>> index ");

    let title = 'koa'
    let data = ctx.state.data
    await ctx.render('test', {
        data,
        title,
        renderClickableLinks
    }, { escape: false })
})



router.get('/info', async (ctx: DefaultContext) => {
    ctx.body = '200: this is updateUserInfo request'
})

router.post('/submit', async (ctx: DefaultContext) => {
    console.log("-->" + ctx.request.body);

    const content = ctx.request.body.content;
    try {
        // 读取原始的 JSON 文件内容
        const jsonData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(jsonData);

        // 合并新数据
        const updatedData = [...data, { url: content }];

        // 将更新后的数据写入 JSON 文件
        await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));

        ctx.body = { "redirectTo": "/" };

    } catch (error) {
        console.error('Error writing JSON file:', error);
        ctx.status = 500; // 写入失败时返回 500 状态码
        ctx.body = { error: 'Error writing JSON file' };
    }
})


app.use(bodyParser());
// 加载路由中间件
app.use(router.routes()).use(async (ctx) => {
    ctx.body = '404: no router match'
})

app.listen(1234, () => {
    console.log('server is running, port is 1234')
})