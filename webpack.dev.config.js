// 请参考我另一篇文章[《为什么我们要做三份 Webpack 配置文件》](https://zhuanlan.zhihu.com/p/29161762)

const webpack = require('webpack');

const config = require('./webpack.base.config');

module.exports = config;

config.devServer = {
  contentBase: './public',
  hot: true,
  publicPath: '/assets/'
};

config.module.rules.push(
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    use: ['eslint-loader'],
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: /node_modules/
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
    include: /node_modules/
  },
  {
    test: /\.less$/,
    use:
    [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[path]-[local]'
        }
      },
      'less-loader'
    ],
    exclude: /node_modules/
  }
);

config.plugins.push(
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js']
  })
);

Object.keys(config.entry).forEach((key) => {
  if (!Array.isArray(config.entry[key])) {
    const entry = config.entry[key];
    config.entry[key] = [
      entry
    ];
  }
  if (key !== 'vendor') {
    config.entry[key].unshift(
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server'
    );
  }
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);
