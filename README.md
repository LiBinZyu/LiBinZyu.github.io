# 李彬宇个人作品集 / Li Bin Yu Personal Portfolio

一个现代化的个人作品集网站，采用简约透明感设计，支持深色/浅色模式和中英双语切换。

A modern personal portfolio website with minimalist transparent design, supporting dark/light mode and Chinese/English language switching.

## 功能特性 / Features

### 🎨 设计特色 / Design Features
- **简约透明感设计** - 采用毛玻璃效果和渐变背景
- **响应式布局** - 完美适配桌面端和移动端
- **深色/浅色模式** - 支持主题切换，保护用户眼睛
- **中英双语** - 一键切换语言，国际化支持

### 📱 页面结构 / Page Structure
- **个人简介** - 头像、姓名、职位、位置信息和下载简历按钮
- **工作经历** - 时间线展示教育和工作经验
- **项目展示** - 卡片式布局，支持点赞和统计
- **联系方式** - 联系信息和留言表单

### 🛠 技术栈 / Tech Stack
- **HTML5** - 语义化标签，SEO友好
- **CSS3** - 现代CSS特性，CSS变量，Flexbox/Grid布局
- **JavaScript ES6+** - 模块化设计，面向对象编程
- **Google Fonts** - Bitter英文字体 + Noto Sans SC中文字体
- **Material Design Icons** - Google Material Design图标

### 🚀 性能优化 / Performance
- **图片懒加载** - 提升页面加载速度
- **CSS/JS压缩** - 减少文件大小
- **本地存储** - 用户偏好设置持久化
- **平滑动画** - 60fps流畅动画效果

## 文件结构 / File Structure

```
LiBinZyu.github.io/
├── index.html              # 主页面
├── styles/
│   ├── main.css           # 主要样式文件
│   └── components.css     # 组件样式文件
├── js/
│   ├── main.js           # 主要JavaScript逻辑
│   └── components.js     # 组件功能
├── data/
│   └── data.js           # 数据配置文件
├── assets/               # 静态资源目录
│   ├── images/          # 图片文件
│   ├── videos/          # 视频文件
│   └── documents/       # 文档文件（如CV）
└── README.md            # 项目说明文档
```

## 快速开始 / Quick Start

### 1. 克隆仓库 / Clone Repository
```bash
git clone https://github.com/LiBinZyu/LiBinZyu.github.io.git
cd LiBinZyu.github.io
```

### 2. 编辑个人信息 / Edit Personal Information
编辑 `data/data.js` 文件，更新你的个人信息：

```javascript
const portfolioData = {
  profile: {
    name: {
      zh: "你的中文名",
      en: "Your English Name"
    },
    title: {
      zh: "你的职位",
      en: "Your Title"
    },
    // ... 其他信息
  }
  // ... 其他数据
};
```

### 3. 添加图片和视频 / Add Images and Videos
将你的图片和视频文件放入 `assets/` 目录，然后在 `data.js` 中更新路径：

```javascript
// 图片示例
image: "assets/images/your-image.jpg"

// 视频示例（使用YouTube或Vimeo）
video: "https://www.youtube.com/watch?v=your-video-id"
```

### 4. 部署到GitHub Pages / Deploy to GitHub Pages
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 访问 `https://yourusername.github.io` 查看网站

## 自定义配置 / Customization

### 主题颜色 / Theme Colors
在 `styles/main.css` 中修改CSS变量：

```css
:root {
  --accent-blue: #193FB9;        /* 主色调 */
  --bg-primary: #F7FAFC;         /* 背景色 */
  --text-primary: #11142D;       /* 主文字色 */
  /* ... 其他颜色变量 */
}
```

### 字体设置 / Font Settings
在 `index.html` 中修改字体链接：

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@100..900&display=swap" rel="stylesheet">
```

### 图片托管服务 / Image Hosting
支持多种免费图片托管服务：

- **Unsplash** - 高质量免费图片
- **Cloudinary** - 免费额度，支持图片处理
- **Imgur** - 简单易用的图片托管
- **GitHub** - 直接托管在仓库中

## 浏览器支持 / Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 11 (部分功能不支持)

## 贡献指南 / Contributing

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 许可证 / License

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式 / Contact

- **邮箱 / Email**: libinzyu@example.com
- **GitHub**: [@LiBinZyu](https://github.com/LiBinZyu)
- **LinkedIn**: [Li Bin Yu](https://linkedin.com/in/libinzyu)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！ / If this project helped you, please give it a star!
