// const HappyPack = require('happypack')
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
  outputDir: 'dist',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    https: false,
    hotOnly: false,
    proxy: 'http://localhost:9093/api/',
  },
  //   chainWebpack: config => {
  // const jsRule = config.module.rule('js');
  // jsRule.uses.clear();
  // jsRule.use('happypack/loader?id=babel')
  //     .loader('happypack/loader?id=babel')
  //     .end();
  // },
  configureWebpack: {
    resolve: {
      mainFields: ['main'], // 只采用main字段作为入口文件描述字段，减少搜索步骤
    },
    plugins: [
      //   new HappyPack({
      //         id:'babel',
      //         loaders:['babel-loader?cacheDirectory=true'],
      //         threadPool:happyThreadPool
      //   })
    ],
  },
}
