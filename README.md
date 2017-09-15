# deployment-automation

[![Build Status](https://travis-ci.org/MagicCube/deployment-automation.svg?branch=master)](https://travis-ci.org/MagicCube/deployment-automation)

前端工程云端自动化部署示例，一套采用 Github + Travis CI + 七牛 CDN 搭建的免费解决方案。

详见我在知乎上发表的文章[《利用 Git 和 CDN 在云端自动化部署前端工程》](https://zhuanlan.zhihu.com/p/29231319)。

欢迎在知乎上关注[我](https://www.zhihu.com/people/henry-li-03/activities)和我的知乎专栏[《前端零栈》](https://zhuanlan.zhihu.com/fr0nt-end/)。


## 主分支与开发分支

* [主分支 master](https://github.com/MagicCube/deployment-automation)
* [开发分支 devleopment](https://github.com/MagicCube/deployment-automation/tree/development)
* [Github Pages 分支 gh-pages](https://github.com/MagicCube/deployment-automation/tree/gh-pages)

## 自动化

```sh
git checkout development
./publish.sh
```

通过上面的简单命令，你将自动化完成：

* 将本地更新提交到远程 development 分支
* 切换到本地 master 分支，
* 在本地将 development 与 master 分支合并
* 将合并结果提交至远程 master 分支
* 切换回本地 development 分支
* 同时触发 Travis 在云端执行
    * 自动下载最新 master 分支的代码，并执行 npm install
    * 自动执行测试脚本
    * 自动执行云端打包
    * 自动将打包结果上传至七牛 CDN
    * 自动更新 Github Page：[https://magiccube.github.io/deployment-automation/](https://magiccube.github.io/deployment-automation/)
