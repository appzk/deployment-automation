// 生产环境的 Webpack 配置
// 关于更多 Webpack 配置方法，请参考我另一篇文章[《为什么我们要做三份 Webpack 配置文件》](https://zhuanlan.zhihu.com/p/29161762)

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 继承自 base config
const config = require('./webpack.base.config');

// 所有的样式将被独立抽取为 CSS 文件
config.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader'],
      fallback: 'style-loader'
    }),
    include: /node_modules/
  },
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
              // 启用 CSS 模块化
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
  // DefinePlugin 插件可以确保当前为 production 环境
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  })
);

// 将 React 等设置为 externals，即这些模块不会被打包在 vendor.js
// 中，react、react-dom 等在生产环境下我们将直接使用 CDN 上的文件。
// 请注意 react、react-dom 一定要选择同为生产环境的 *.min.js，
// React 在生产环境下会减少一些不必要的检查并进行性能优化。
// 详见 public/index.html
config.externals = {
  react: 'React',
  'react-dom': 'ReactDOM'
};

module.exports = config;
