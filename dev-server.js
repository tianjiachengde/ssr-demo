// const serverConf = require("./config/webpack.server.config");
// const webpack = require("webpack");
// const fs = require("fs");
// const path = require("path");
// const projectRoot = path.resolve(__dirname, '.');
// //  读取内存中的.json文件
// //  这个模块需要手动安装
// const Mfs = require("memory-fs");
// const axios = require("axios");
//
// module.exports = (cb) => {
//   const webpackComplier = webpack(serverConf);
//   var mfs = new Mfs();
//
//   webpackComplier.outputFileSystem = mfs;
//
//   webpackComplier.watch({},async (error,stats) => {
//     if(error) return console.log(error);
//     stats = stats.toJson();
//     stats.errors.forEach(error => console.log(error));
//     stats.warnings.forEach(warning => console.log(warning));
//     //  获取server bundle的json文件
//     let serverBundlePath = path.join(projectRoot,'dist/vue-ssr-server-bundle.json');
//     let serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath,"utf-8"));
//     //  获取client bundle的json文件
//     let clientBundlePath = path.join(projectRoot,'dist/vue-ssr-client-manifest.json');
//     let clientBundle = JSON.parse(mfs.readFileSync(serverBundlePath,"utf-8"));
//     // let clientBundle = await axios.get("http://localhost:8080/vue-ssr-client-manifest.json");
//     //  获取模板
//     let template = fs.readFileSync(path.join(__dirname,".","index.template.html"),"utf-8");
//     cb && cb(serverBundle,clientBundle,template);
//   })
// };