import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router';

const app = new Koa();

// 使用 bodyparser 中间件解析请求体
app.use(bodyParser());

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
const port = 5678;
const HOST = '0.0.0.0'; // 绑定到所有地址

app.listen(port, HOST, () => {
    console.log(`Server running on port ${port}`);
});
