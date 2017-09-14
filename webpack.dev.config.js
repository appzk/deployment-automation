// 开发时的 Webpack 配置
// 关于更多 Webpack 配置方法，请参考我另一篇文章[《为什么我们要做三份 Webpack 配置文件》](https://zhuanlan.zhihu.com/p/29161762)

const webpack = require('webpack');

// 继承自 base config
const config = require('./webpack.base.config');

module.exports = config;

// 有关 webpack-dev-server 的配置
config.devServer = {
  // public 目录中有用来做本地测试的 HTML 文件
  contentBase: './public',
  // 启用热替换
  hot: true,
  // 与 base config 保持一致
  publicPath: config.output.publicPath
};

// 在开发模式下，
config.module.rules.push(
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: /node_modules/
  },
  {
    test: /\.less$/,
    use:
    [
      'style-loader',
      {
        // 启用 CSS 模块化
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: 'cpa-[path]-[local]'
        }
      },
      'less-loader'
    ],
    exclude: /node_modules/
  }
);

// 为 js 和 less 启用 Sourcemap
config.plugins.push(
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js'] // vendor 一般不启用
  })
);

// Hot module replacement
Object.keys(config.entry).forEach((key) => {
  if (!Array.isArray(config.entry[key])) {
    // 这里有一个我个人的私有约定，如果 entry 是一个数组，则证明它需要被 hot module replaced
    if (Array.isArray(config.entry[key])) {
      const entry = config.entry[key];
      config.entry[key] = [
        entry
      ];
    }
    // vendor 不需要 hot module replacement
    if (key !== 'vendor') {
      config.entry[key].unshift(
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server'
      );
    }
  }
});
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);
