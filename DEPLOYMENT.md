# 部署指南 / Deployment Guide

## GitHub Pages 部署 / GitHub Pages Deployment

### 方法一：直接推送到主分支 / Method 1: Push to Main Branch

1. **克隆仓库** / Clone Repository
   ```bash
   git clone https://github.com/LiBinZyu/LiBinZyu.github.io.git
   cd LiBinZyu.github.io
   ```

2. **编辑内容** / Edit Content
   - 修改 `data/data.js` 中的个人信息
   - 添加图片到 `assets/images/` 目录
   - 更新简历文件到 `assets/documents/` 目录

3. **提交并推送** / Commit and Push
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```

4. **启用 GitHub Pages** / Enable GitHub Pages
   - 进入仓库设置 (Settings)
   - 滚动到 "Pages" 部分
   - 选择 "Deploy from a branch"
   - 选择 "main" 分支
   - 点击 "Save"

5. **访问网站** / Access Website
   - 网站将在 `https://libinzyu.github.io` 可用
   - 可能需要几分钟才能生效

### 方法二：使用 GitHub Actions / Method 2: Using GitHub Actions

1. **创建 GitHub Actions 工作流** / Create GitHub Actions Workflow
   在 `.github/workflows/deploy.yml` 创建文件：

   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           if: github.ref == 'refs/heads/main'
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./
   ```

2. **推送代码** / Push Code
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

## 其他部署选项 / Other Deployment Options

### Netlify 部署 / Netlify Deployment

1. **连接 GitHub 仓库** / Connect GitHub Repository
   - 登录 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择你的 GitHub 仓库

2. **配置构建设置** / Configure Build Settings
   - Build command: `npm run build` (可选)
   - Publish directory: `.` (根目录)

3. **部署** / Deploy
   - 点击 "Deploy site"
   - 网站将在几分钟内可用

### Vercel 部署 / Vercel Deployment

1. **安装 Vercel CLI** / Install Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. **部署** / Deploy
   ```bash
   vercel
   ```

3. **配置** / Configure
   - 按照提示完成配置
   - 网站将获得一个 `.vercel.app` 域名

### 自定义域名 / Custom Domain

1. **购买域名** / Purchase Domain
   - 在域名注册商购买域名
   - 推荐：Namecheap, GoDaddy, Cloudflare

2. **配置 DNS** / Configure DNS
   - 添加 CNAME 记录指向 GitHub Pages
   - 或添加 A 记录指向服务器 IP

3. **在 GitHub Pages 中设置** / Set in GitHub Pages
   - 进入仓库设置
   - 在 Pages 部分添加自定义域名
   - 启用 HTTPS

## 性能优化 / Performance Optimization

### 图片优化 / Image Optimization

1. **压缩图片** / Compress Images
   ```bash
   # 使用 ImageOptim (Mac)
   # 或 TinyPNG 在线工具
   ```

2. **使用 WebP 格式** / Use WebP Format
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Description">
   </picture>
   ```

### 代码优化 / Code Optimization

1. **压缩 CSS/JS** / Minify CSS/JS
   ```bash
   npm run build
   ```

2. **启用 Gzip 压缩** / Enable Gzip Compression
   - 大多数托管服务自动启用
   - 或配置服务器启用

### CDN 配置 / CDN Configuration

1. **使用 Cloudflare** / Use Cloudflare
   - 免费 CDN 服务
   - 自动优化和缓存

2. **配置缓存策略** / Configure Caching
   - 静态资源长期缓存
   - HTML 文件短期缓存

## 监控和分析 / Monitoring and Analytics

### Google Analytics

1. **创建 GA4 属性** / Create GA4 Property
   - 访问 [Google Analytics](https://analytics.google.com)
   - 创建新属性

2. **添加跟踪代码** / Add Tracking Code
   在 `index.html` 的 `<head>` 中添加：
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### 性能监控 / Performance Monitoring

1. **Google PageSpeed Insights**
   - 测试网站性能
   - 获取优化建议

2. **Lighthouse CI**
   - 自动化性能测试
   - 集成到 CI/CD 流程

## 故障排除 / Troubleshooting

### 常见问题 / Common Issues

1. **网站无法访问** / Website Not Accessible
   - 检查 GitHub Pages 设置
   - 确认仓库是公开的
   - 等待 DNS 传播

2. **样式不生效** / Styles Not Working
   - 检查文件路径
   - 清除浏览器缓存
   - 检查控制台错误

3. **图片不显示** / Images Not Displaying
   - 检查图片路径
   - 确认图片文件存在
   - 检查文件权限

### 调试工具 / Debugging Tools

1. **浏览器开发者工具** / Browser DevTools
   - F12 打开开发者工具
   - 检查 Console 和 Network 标签

2. **在线工具** / Online Tools
   - [W3C Markup Validator](https://validator.w3.org/)
   - [CSS Validator](https://jigsaw.w3.org/css-validator/)
   - [GTmetrix](https://gtmetrix.com/)

## 维护和更新 / Maintenance and Updates

### 定期更新 / Regular Updates

1. **更新依赖** / Update Dependencies
   ```bash
   npm update
   ```

2. **更新内容** / Update Content
   - 定期更新项目信息
   - 添加新的工作经验
   - 更新联系方式

3. **备份数据** / Backup Data
   - 定期备份仓库
   - 保存重要文件副本

### 安全考虑 / Security Considerations

1. **敏感信息** / Sensitive Information
   - 不要在代码中硬编码敏感信息
   - 使用环境变量存储配置

2. **依赖安全** / Dependency Security
   ```bash
   npm audit
   npm audit fix
   ```

3. **HTTPS** / HTTPS
   - 确保网站使用 HTTPS
   - 配置安全头
