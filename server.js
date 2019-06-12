//npm install express --save-dev  下载express包
//npm install http-proxy-middleware --save-dev  下载代理中间件
//const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
let proxy = require('http-proxy-middleware');


// 加载静态文件 打包好的静态文件放在dist下
app.use(express.static('./dist'));

// 设置服务器代理，解决跨域问题
// target：目标地址
app.use('/api', proxy({target: 'http://v.juhe.cn', changeOrigin: true}));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//监听端口
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return null;
    }

    return console.log('3000 port starting');
});