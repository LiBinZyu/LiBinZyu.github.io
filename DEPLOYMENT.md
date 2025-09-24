# 性能与体验问题分析与优化建议

## 现象
- 视频加载卡顿，需多次刷新才能加载，切换语言会重新加载视频。
- 视频文件本身很小（1-3MB），但体验很差。
- 网络断联时体验极差。

## 问题分析
1. **前端每次切换语言、切换 section、页面可见性变化时，都会重新渲染项目卡片，所有 `<video>` 标签重新生成，浏览器重新请求视频资源。**
2. **视频直接 `<video src="...">`，没有懒加载、缓存、断点续传、断网兜底等机制。**
3. **所有视频 preload="auto"、autoplay，页面一渲染就全量加载所有视频，极易卡顿。**
4. **加载失败仅 alert，没有自动重试、静态占位、降级方案。**
5. **图片有懒加载，视频没有。**
6. **没有 Service Worker、Cache API、localStorage 缓存视频，也没有分片加载。**

## 优化建议
### 1. 视频懒加载
- 只渲染首屏/当前可见的视频，其他视频用占位图，滚动到可见时再加载。
- 可用 IntersectionObserver 监听 `<video>` 元素或其父容器。

### 2. 视频缓存与断点续传
- 利用 Service Worker 拦截视频请求，做缓存（Cache API）。
- 或用 `<video>` 的 `preload="metadata"`，只加载元数据，用户点击播放时再加载内容。

### 3. 避免无谓的重新渲染
- 切换语言时，仅更新文本内容，不要销毁重建整个项目卡片和 `<video>` 元素。
- 可为 ProjectCard 增加 updateLanguage 方法，仅更新标题/描述等文本。

### 4. 网络断联兜底
- 视频加载失败时，显示静态占位图或提示，支持点击重试。
- 可实现自动重试机制。

### 5. 降低首屏压力
- 首屏只加载第一个可见视频，其他延迟加载。
- 或首屏只显示封面，用户点击后再加载视频。

### 6. 其他建议
- 视频文件建议放 CDN，提升加载速度。
- 视频文件名避免中文，防止部分浏览器兼容性问题。

## 推荐改动
- ProjectCard 组件增加视频懒加载逻辑。
- 切换语言时仅更新文本，不销毁重建 DOM。
- 可选：引入 Service Worker 做视频缓存。
- 视频加载失败时支持点击重试。

## 参考代码片段

### 视频懒加载（IntersectionObserver）
```js
// 在 ProjectCard.setupMediaLazyLoading 里处理 <video> 懒加载
setupVideoLazyLoading() {
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          if (!video.src) {
            video.src = video.dataset.src;
          }
          observer.unobserve(video);
        }
      });
    }, { rootMargin: '200px' });

    this.cardElement.querySelectorAll('video[data-src]').forEach(video => {
      videoObserver.observe(video);
    });
  }
}
```
- HTML 里 `<video data-src="xxx.mp4" ...>`，初始不写 src。

### 切换语言仅更新文本
```js
// ProjectCard 增加 updateLanguage 方法，只更新文本内容
updateLanguage() {
  const currentLang = window.portfolioApp?.currentLanguage || 'zh';
  this.cardElement.querySelector('.project-title').textContent = this.projectData.title[currentLang];
  this.cardElement.querySelector('.project-description').textContent = this.projectData.description[currentLang];
  // 其他文本同理
}
```
- main.js 里切换语言时，遍历所有 ProjectCard 实例，调用 updateLanguage。

### 视频加载失败兜底
```js
video.addEventListener('error', () => {
  // 显示占位图或重试按钮
  video.style.display = 'none';
  placeholder.style.display = 'block';
});
```

## 总结
- 当前实现导致视频频繁重新加载，且无懒加载、缓存、兜底，体验差。
- 推荐按上述建议优化，能极大提升加载速度和用户体验。
