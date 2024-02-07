import Router from 'koa-router';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import ejs from 'ejs';
import { DefaultContext, Next } from 'koa';

const router = new Router();

// 模拟数据库
const users: { username: string, password: string }[] = [{ username: "123", password: "123" }];

// JWT 验证中间件
const authenticate = async (ctx: DefaultContext, next: Next) => {
    const cookie = ctx.cookies.get('token')
    console.log(cookie);
    const token = cookie;
    // const token = ctx.header.authorization?.split(' ')[1];
    // if (!token) {
    //     ctx.status = 401;
    //     ctx.body = 'Authentication failed: Missing token';
    //     return;
    // }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        console.log("decoded:" + decoded);
        console.log("decoded:" + JSON.stringify(decoded));

        ctx.state.user = decoded;
        await next();
    } catch (err) {
        ctx.status = 401;
        ctx.body = 'Authentication failed: Invalid token';
    }
};

// 受保护的路由
router.get('/protected', authenticate, async (ctx) => {
    ctx.body = `Welcome ${ctx.state.user.username}! This is a protected route.`;
});

router.get('/', async (ctx) => {
    ctx.body = "Hello";
})

// 注册页面
router.get('/register', async (ctx) => {
    const template = await fs.readFile('./views/register.ejs', 'utf-8');
    ctx.body = ejs.render(template);
});

// 用户注册
router.post('/register', async (ctx) => {
    const { username, password } = ctx.request.body as any;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    ctx.redirect('/login');
});

// 登录页面
router.get('/login', async (ctx) => {
    const template = await fs.readFile('./views/login.ejs', 'utf-8');
    ctx.body = ejs.render(template);
});

// 用户登录
router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body as any;
    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        ctx.status = 401;
        ctx.body = 'Invalid credentials';
        return;
    }
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    ctx.cookies.set('token', token, { httpOnly: true, maxAge: 3600000 }); // 设置名为 token 的 httpOnly cookie，有效期为 1 小时
    ctx.redirect('/protected'); // 登录成功后重定向到受保护的路由
});

export default router;
