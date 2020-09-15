const path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: 'plug-table-list.min.js',
    library: 'PlugTableList',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};
