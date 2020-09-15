const path = require('path');

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  chainWebpack: config => {},
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
};
