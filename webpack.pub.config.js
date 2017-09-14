// 正式线上发布时的 Webpack 配置
// 关于更多 Webpack 配置方法，请参考我另一篇文章[《为什么我们要做三份 Webpack 配置文件》](https://zhuanlan.zhihu.com/p/29161762)
// 此为神秘的第四份 :)

// 请参考 https://github.com/longtian/qiniu-webpack-plugin
const QiniuPlugin = require('qiniu-webpack-plugin');
// 请参考我开发的 [webpack-plugin-hash](https://github.com/MagicCube/webpack-plugin-hash)
const HashPlugin = require('webpack-plugin-hash');

// 请登录并访问 https://portal.qiniu.com/user/key 获得参数的值
const qiniuAK = 'i2MWHt0sGlWTk5xapixEaXAn3XzfsCkoOJrAJ7Kr';
// 通过下面的链接创建新的
// https://portal.qiniu.com/bucket/create
const qiniuBucket = 'test';
const qiniuCdnDomain = '7xozrb.com1.z0.glb.clouddn.com';

// 我们不希望将秘钥（即 SK）写死在 config 里上传至 Github。
// 因此我们选择通过环境变量的形式传递 SK，并由 Travis 提供的工具进
// 行加密。
const qiniuSK = process.env.QINIU_SK; // 此处拿到的已经是 Travis 解密后的明文
if (!qiniuSK) {
  throw new Error('QINIU_SK must be provided in the envrironment variables.');
}

// 继承自生产环境的配置
const config = require('./webpack.config');

// 用 URL 替换原先的绝对路径
// 如果你的网站采用了 HTTPS，则请替换为 //${qiniuCdnDomain}/[hash]/
config.output.publicPath = `http://${qiniuCdnDomain}/[hash]/`;

config.plugins.push(
  new QiniuPlugin({
    // 即 AK
    ACCESS_KEY: qiniuAK,
    // 即 SK
    SECRET_KEY: qiniuSK,
    bucket: qiniuBucket,
    path: '[hash]'
  }),
  new HashPlugin({
    callback: (error, hash) => {
      console.info('\n');
      console.info('*'.repeat(80));
      console.info(`Root URL of assets: http://${qiniuCdnDomain}/${hash}/`);
      console.info('*'.repeat(80));
      console.info('\n');
    }
  })
);

module.exports = config;
