// import { Context, DefaultContext } from "koa";


// // app.js
// const Koa = require('koa')
// const path = require('path')
// const fs = require('fs')
// const koaStatic = require('koa-static')
// const Router = require('koa-router')
// // const koaBody = require('koa-body');
// import koaBody from "koa-body";
// import views from "koa-views";
// const app = new Koa()
// const router = new Router()

// const staticPath = '../static'

// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 200 * 1024 * 1024 // 设置上传文件的限制, 默认2MB
//     }
// }));

// app.use(koaStatic(
//     path.join(__dirname, staticPath)
// ))


// const viewPath: string = path.join(__dirname, '../static')
// console.log('-->' + viewPath)
// app.use(views(viewPath, {
//     extension: 'html'
// }))


// // app.use('/', async (ctx: Context) => {
// //     let title = 'koa'
// //     await ctx.render('upload', {
// //         title
// //     })
// // })

// app.use(router.routes())

// router.post('/upload', async (ctx: DefaultContext) => {
//     // 获取文件对象
//     const file = ctx.request.files.file
//     // 读取文件内容
//     const data = fs.readFileSync(file.path);
//     // 保存到服务端
//     fs.writeFileSync(path.join(__dirname, file.name), data);
//     ctx.body = { message: '上传成功！' };
// })

// app.listen(4000, () => {
//     console.log('server is running, port is 4000')
// })

// const Koa = require('koa');
// const views = require('koa-views')
// const path = require('path')
// const app = new Koa();

// const viewPath: string = path.join(__dirname, '../static')
// console.log('-->' + viewPath)
// app.use(views(viewPath, {
//     extension: 'ejs'
// }))

// app.use(async (ctx: Context) => {
//     let title = 'koa'
//     let data = ["test","test2"]
//     await ctx.render('test', {
// data,
//         title
//     })
// })

// app.listen(2000);
// console.log('server is running, port is 1000');


