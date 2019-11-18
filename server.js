const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

const meta = {
  title: 'VUE-SSR-DEMO'
};

server.get('*', (req, res) => {
  const context = { url : req.url };

  // const app = new Vue({
  //   context
  // });

  renderer.renderToString(context, meta,(err, html) => {
    if(err){
      res.status(500).end('渲染失败');
      return
    }
    console.log('HTML内容：',html);
    res.end(html)
  })
});

server.listen(8080,()=>{
  console.log('启动成功')
});