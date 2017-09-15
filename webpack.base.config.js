// 基础 Webpack 配置
// 关于更多 Webpack 配置方法，请参考我另一篇文章[《为什么我们要做三份 Webpack 配置文件》](https://zhuanlan.zhihu.com/p/29161762)

const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// 本例中采用的是业界通用的目录命名规范
// 你也可以根据实际情况修改下面的变量
const SRC_PATH = path.resolve('./src');
const ASSETS_BUILD_PATH = path.resolve('./build');
const ASSETS_PUBLIC_PATH = '/assets/';

module.exports = {
  context: SRC_PATH,
  entry: {
    da: ['./da'], // da 是 deployment-automation 的缩写
    vendor: './vendor',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: ASSETS_BUILD_PATH,
    publicPath: ASSETS_PUBLIC_PATH,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      // 任何情况下都保持 ESLint 先行
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use:
        [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 每次打包前，先清除 build 目录
    new CleanWebpackPlugin(
      ['build', 'gh-pages'],
      { root: path.resolve('./'), verbose: true }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    })
  ]
};
