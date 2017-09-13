// 请参考我另一篇文章[《为什么我们要做三份 Webpack 配置文件》](https://zhuanlan.zhihu.com/p/29161762)

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.config.base');

config.module.rules.push(
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract(
      {
        use:
        [
          {
            loader: 'css-loader',
            options:
            {
              modules: true,
              localIdentName: 'cpa-[path]-[local]'
            }
          },
          'less-loader'
        ],
        fallback: 'style-loader'
      }
    ),
    exclude: /node_modules/
  }
);

config.plugins.push(
  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true,
    ignoreOrder: true
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  })
);

module.exports = config;
