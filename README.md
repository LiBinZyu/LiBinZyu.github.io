# 李炳儒 · 工程作品集

中英文页面分别位于 `/` 和 `/en/`。页面在构建时生成，浏览器直接加载 HTML、CSS 和一份交互脚本。项目和文章内容放在 `data/data.js`，站点地址和分享元数据放在 `config.json`。

## 本地开发

```sh
npm run build
npm run check
python -m http.server 8080 --bind 127.0.0.1
```

构建使用 Node.js，无需安装 npm 依赖。打开 `http://127.0.0.1:8080/` 查看页面。修改数据、配置或模板后，重新生成并提交两份 HTML、`sitemap.xml` 和 `robots.txt`。GitHub Pages 直接发布生成文件。详见 [部署说明](DEPLOYMENT.md)。

## 项目媒体

卡片先显示封面。进入视口后，图片每 4.5 秒切换，视频静音内联播放，播完再切到下一项。移出视口或切到后台时暂停。系统开启「减少动态效果」时，默认关闭自动轮播，仍可手动切换和播放。

`assets/previews/` 存放 WebP 封面和缩图，以项目或文章 ID 命名。同一项目的后续图片使用 `proj-1-2.webp` 这样的序号。原图和 MP4 的路径记录在数据文件。

原有飞鸟背景在首屏加载后初始化。Three.js r134 和 Vanta Birds 0.5.24 由本站提供。Vanta 的本地版本绑定了两个窗口事件方法，以兼容 Safari。开启减少动态效果、强制颜色或浏览器节流模式时使用原有日夜底色。
