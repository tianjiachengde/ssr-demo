const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('./index.template.html', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const app = express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest:clientManifest
})

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}
app.use(express.static('./dist'))

app.use(async(req, res, next) => {
  try {
    const context = {
      title: '服务端渲染测试', // {{title}}
      url: req.url
    }
    // 设置请求头
    res.set('Content-Type', 'text/html')
    const render = await renderToString(context)
    // 将服务器端渲染好的html返回给客户端
    res.end(render)
  } catch (e) {
    console.log(e)
    // 如果没找到，放过请求，继续运行后面的中间件
    next()
  }
})

app.listen(3000,()=>{
  console.log('启动成功','localhost:3000')
})
// server.get('*', (req, res) => {
//   // console.log(req)
//   //   // if (!req.type) return;
//   const context = { url : req.url };
//
//   console.log('context:',context);
//   renderer.renderToString(app,(err, html) => {
//     console.log('err',err,'html',html)
//     if(err){
//       res.status(500).end('渲染失败');
//       return
//     }
//     console.log('HTML内容：',html);
//     res.end(html)
//   })
// });
//
// server.listen(8080,()=>{
//   console.log('启动成功')
// });


