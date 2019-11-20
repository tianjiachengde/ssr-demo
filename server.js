const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('./index.template.html', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const app = express();

// 引入静态资源
app.use(express.static('./dist'))

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
});

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      // console.error(`error during render : ${req.url}`)
      // console.error(err.stack)
      console.error(err)
    }
  }

  const context = {
    title: 'Vue SSR demo', // default title
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    console.log('render')
    if (err) {
      return handleError(err)
    }
    res.send(html)
  })
})

app.on('error', err => console.log(err))


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


