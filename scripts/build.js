const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { dirname, join } = require('node:path');
const { portfolioData: data } = require('../data/data.js');
const { site, theme, seo } = require('../config.json');

const root = join(__dirname, '..');
const languages = Object.entries(site.languages);
const byDate = (a, b) => b.date.localeCompare(a.date);
const projects = [...data.projects].sort(byDate);
const articles = [...data.blogs].sort(byDate);
const experienceGroups = new Map();
for (const entry of data.experiences) {
  const key = entry.category.en;
  if (!experienceGroups.has(key)) experienceGroups.set(key, []);
  experienceGroups.get(key).push(entry);
}

const ui = {
  zh: {
    nav: '站点导航', projects: '项目', experiences: '经历', blog: '技术文章', contact: '联系',
    skip: '跳到主要内容', filters: '项目分类', layout: '项目视图', list: '列表视图', grid: '卡片视图',
    media: '项目媒体', slide: '媒体', video: '视频',
    autoplay: '自动轮播', paper: '论文', openVideo: '打开视频',
    resume: '下载双语简历', appearance: '外观', system: '跟随系统', light: '浅色', dark: '深色',
    copied: '已复制', copyError: '自动复制失败，请手动选择并复制该文本。'
  },
  en: {
    nav: 'Site navigation', projects: 'Projects', experiences: 'Experience', blog: 'Technical Articles', contact: 'Contact',
    skip: 'Skip to main content', filters: 'Project categories', layout: 'Project view', list: 'List view', grid: 'Grid view',
    media: 'Project media', slide: 'Media', video: 'Video',
    autoplay: 'Autoplay', paper: 'Paper', openVideo: 'Open video',
    resume: 'Download bilingual résumé', appearance: 'Appearance', system: 'System', light: 'Light', dark: 'Dark',
    copied: 'Copied', copyError: 'Automatic copy failed. Select and copy the text manually.'
  }
};

const shapes = {
  projects: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 7h10M7 12h10M7 17h6"/>',
  experiences: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a20 20 0 0 0 18 0"/>',
  blog: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1v15"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  appearance: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
  arrow: '<path d="m9 6 6 6-6 6"/>',
  video: '<path d="M8 5v14l12-7Z" fill="currentColor" stroke="none"/>',
  language: '<path d="M2 5h13M8.5 3v2m4 0c0 5-5 9-9 11m2-7c1.6 2.8 4 5 6.5 6M12 21l4.5-10L21 21m-7.5-3h6"/>',
  github: '<path d="M9 19c-4.3 1.2-4.3-2-6-2.5m12 4.5v-3c0-.9-.3-1.5-.7-1.9 2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.5 7a4.4 4.4 0 0 0-.1-3s-1-.3-3.4 1.3a11.3 11.3 0 0 0-6 0C6.6 3.7 5.6 4 5.6 4a4.4 4.4 0 0 0-.1 3 4.7 4.7 0 0 0-1.3 3.1c0 4.7 2.8 5.7 5.5 6-.4.4-.7 1-.7 1.9v3"/>',
  paper: '<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/>'
};

const icon = name => `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${shapes[name]}</svg>`;
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const absolute = path => new URL(path, site.url).href;

function renderPage(lang, { locale, path, ogLocale }) {
  const t = ui[lang];
  const local = value => typeof value === 'string' ? value : value?.[lang] ?? '';
  const tr = value => escape(local(value));
  const asset = path === '/' ? '' : '../';
  const other = lang === 'zh' ? 'en' : 'zh';
  const otherPath = site.languages[other].path;
  const languageLink = path === '/' ? otherPath.slice(1) : '../';
  const dateFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', timeZone: 'UTC' });
  const projectDateFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const title = `${local(data.profile.name)} | ${local(data.profile.role)}`;
  const description = local(site.description);
  const canonical = absolute(path);
  const socialImage = absolute(seo.image);
  const tags = (items, experience = false) => items.length
    ? `<ul class="${experience ? 'exp-tags' : 'project-tech'}">${items.map(item => `<li class="${experience ? 'exp-tag' : 'tech-tag'}">${tr(item)}</li>`).join('')}</ul>`
    : '';
  const link = (url, label, cssClass) => `<a${cssClass ? ` class="${cssClass}"` : ''} href="${escape(url)}" target="_blank" rel="noopener">${label}</a>`;
  const time = (date, cssClass) => `<time class="${cssClass}" datetime="${date}">${(cssClass === 'project-period' ? projectDateFormat : dateFormat).format(new Date(date))}</time>`;

  function picture(id, original, { eager = false, avatar = false } = {}) {
    const preview = `assets/previews/${id}.webp`;
    const hasPreview = original !== preview && existsSync(join(root, preview));
    const attrs = eager ? 'fetchpriority="high"' : avatar ? 'width="52" height="52"' : 'loading="lazy"';
    const img = `<img src="${asset}${escape(original)}" alt="" ${attrs} decoding="async">`;
    return hasPreview
      ? `<picture><source srcset="${asset}${preview}" type="image/webp">${img}</picture>`
      : img;
  }

  function projectCard(project, index) {
    const { id, category, images = [], videos = [], poster, tech, links = {}, date } = project;
    const count = images.length + videos.length;
    const preview = `assets/previews/${id}.webp`;
    const cover = images[0] ?? poster;
    const coverMarkup = picture(id, cover, { eager: index === 0 });
    const alternateImages = images.slice(1).map((src, i) => `<template data-slide>${picture(`${id}-${i + 2}`, src)}</template>`);
    const clips = videos.map(src => `<template data-slide><video muted playsinline preload="none"${count === 1 ? ' loop' : ''} poster="${asset}${existsSync(join(root, preview)) ? preview : escape(poster ?? cover)}" src="${asset}${escape(src)}" aria-label="${tr(project.title)}"></video><a class="video-fallback" hidden href="${asset}${escape(src)}">${t.openVideo}</a></template>`);
    const gallery = count > 1 || videos.length;
    const resources = Object.entries(links).map(([kind, url]) => link(url, `${icon(kind)}<span>${kind === 'paper' ? t.paper : 'GitHub'}</span>`, 'project-link')).join('');
    return `<article class="project-card" id="${id}" data-category="${[category].flat().join(' ')}">
          <div class="project-media"${gallery ? ' data-gallery' : ''}>
            <div class="project-cover project-image-container">
              <div class="media-frame"${images.length ? ' data-slide' : ''}>${coverMarkup}</div>
              ${videos.length ? `<span class="video-corner-tag" aria-label="${t.video}">${icon('video')}</span>` : ''}
              ${count > 1 ? `<div class="project-image-indicators" role="group" aria-label="${t.media}" data-enhanced>
                ${Array.from({ length: count }, (_, i) => `<button class="project-image-indicator" type="button" data-slide-index="${i}" aria-label="${t.slide} ${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}
                <button class="gallery-autoplay sr-only" type="button" data-autoplay aria-pressed="false">${t.autoplay}</button>
              </div>` : ''}
            </div>
            ${[...alternateImages, ...clips].join('')}
          </div>
          <div class="project-content">
            <div class="project-header"><h3 class="project-title">${tr(project.title)}</h3>${time(date, 'project-table-date')}</div>
            <p class="project-description" title="${tr(project.description)}" tabindex="0">${tr(project.description)}</p>
            ${tags(tech)}
            ${videos.length ? `<noscript>${videos.map(src => `<a href="${asset}${escape(src)}">${t.openVideo}</a>`).join(' ')}</noscript>` : ''}
          </div>
          ${resources ? `<div class="project-links">${resources}</div>` : ''}
          <div class="project-meta">${time(date, 'project-period')}</div>
        </article>`;
  }

  function experienceGroup(entries) {
    const heading = entries[0].category;
    return `<section class="experience-block">
          <h3 class="experience-category-col">${tr(heading)}</h3>
          <div class="experience-rows-col">
            ${entries.map(entry => {
              const company = entry.link ? link(local(entry.link), tr(entry.company), 'exp-link') : tr(entry.company);
              const showDescription = heading.en !== 'EDUCATION' && heading.en !== 'EXPERIENCE';
              return `<article class="exp-row" id="${entry.id}">
              <div class="exp-main">
                ${entry.title ? `<h4 class="exp-title-company">${tr(entry.title)}${company ? ` <span class="exp-sep">—</span><span class="exp-company">${company}</span>` : ''}</h4>` : ''}
                ${showDescription ? `<p class="exp-desc-text">${local(entry.description)}</p>` : ''}
                ${tags(entry.tags, true)}
              </div>
              ${entry.period ? `<span class="exp-meta-right">${tr(entry.period)}</span>` : ''}
            </article>`;
            }).join('\n            ')}
          </div>
        </section>`;
  }

  function articleRow(article) {
    return `<a class="blog-table-row" id="${article.id}" href="${tr(article.link)}" target="_blank" rel="noopener">
          <div class="blog-table-thumb">${picture(article.id, article.image)}</div>
          <div class="blog-table-main">
            <div class="blog-table-header"><h3 class="blog-table-title">${tr(article.title)}</h3>${time(article.date, 'blog-table-date')}</div>
            <p class="blog-table-desc">${tr(article.description)}</p>
          </div>
          <span class="blog-table-chevron">${icon('arrow')}</span>
        </a>`;
  }

  const contactContent = data.contact.map(item => {
    const content = `<span class="contact-row-title">${tr(item.title)}</span><span class="contact-row-text">${escape(item.text)}</span>`;
    return item.link
      ? `<a class="contact-table-row" href="${escape(item.link)}" target="_blank" rel="noopener">${content}</a>`
      : `<div class="contact-table-row" data-copy="${escape(item.text)}">${content}</div>`;
  }).join('\n        ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: title,
    url: canonical,
    inLanguage: locale,
    mainEntity: {
      '@type': 'Person',
      '@id': absolute('/#person'),
      name: local(data.profile.name),
      alternateName: data.profile.name[other],
      jobTitle: local(data.profile.role),
      description: local(data.profile.bio),
      image: absolute(data.profile.image),
      url: absolute('/'),
      sameAs: data.contact.flatMap(item => item.link ? [item.link] : [])
    }
  };

  return `<!doctype html>
<!-- Generated by npm run build. Edit data/data.js, config.json or scripts/build.js. -->
<html lang="${locale}">
<head>
  <meta charset="${site.charset}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta id="theme-color" name="theme-color" media="not all" content="${theme.light}" data-light="${theme.light}" data-dark="${theme.dark}">
  <meta name="theme-color" media="(prefers-color-scheme: light)" content="${theme.light}">
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="${theme.dark}">
  <script>
    function applyPortfolioTheme(mode) {
      const explicit = mode === 'light' || mode === 'dark';
      const page = document.documentElement;
      const color = document.getElementById('theme-color');
      if (explicit) {
        page.dataset.theme = mode;
        color.content = color.dataset[mode];
      } else {
        delete page.dataset.theme;
      }
      color.media = explicit ? 'all' : 'not all';
    }
    try {
      applyPortfolioTheme(localStorage.getItem('portfolio-theme'));
      if (localStorage.getItem('portfolio-view-mode') === 'table') {
        document.documentElement.dataset.projectView = 'table';
      }
    } catch {}
  </script>
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <meta name="author" content="${escape(site.author)}">
  <meta name="robots" content="${seo.robots}">
  <link rel="canonical" href="${canonical}">
  ${languages.map(([, variant]) => `<link rel="alternate" hreflang="${variant.locale}" href="${absolute(variant.path)}">`).join('\n  ')}
  <link rel="alternate" hreflang="x-default" href="${absolute(site.languages[site.defaultLanguage].path)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${ogLocale}">
  <meta property="og:locale:alternate" content="${site.languages[other].ogLocale}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:alt" content="${tr(data.projects[0].title)}">
  <meta name="twitter:card" content="${seo.twitterCard}">
  <meta name="twitter:site" content="${seo.twitterSite}">
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
  <link rel="icon" href="${asset}assets/previews/profile.webp" type="image/webp">
  <link rel="stylesheet" href="${asset}styles/main.css">
  <script defer src="${asset}js/main.js"></script>
</head>
<body>
  <div id="vanta-birds" class="vanta-container" aria-hidden="true" data-asset-root="${asset}assets/vendor/"></div>
  <a class="skip-link" href="#main">${t.skip}</a>
  <header class="header">
    <div class="container">
      <div class="profile-section">
        <div class="profile-bio"><p class="bio-paragraph">${tr(data.profile.bio)}</p></div>
        <div class="profile-meta">
          <div class="profile-image">${picture('profile', data.profile.image, { avatar: true })}</div>
          <h1 class="profile-name">${tr(data.profile.name)}</h1>
          <span class="sr-only">${tr(data.profile.role)}</span>
        </div>
      </div>
    </div>
  </header>

  <nav class="site-nav nav-menu" aria-label="${t.nav}">
    <div class="nav-capsule">
      <div class="nav-items">
        ${['projects', 'experiences', 'blog', 'contact'].map(id => `<a class="nav-item" href="#${id}" aria-label="${t[id]}" data-tooltip="${t[id]}">${icon(id)}</a>`).join('\n        ')}
      </div>
      <span class="nav-divider" aria-hidden="true"></span>
      <div class="nav-controls">
        <a class="nav-btn" href="${asset}${data.profile.cvUrl}" download data-tooltip="${t.resume}" aria-label="${t.resume}">${icon('download')}</a>
        <div class="theme-control nav-btn" data-tooltip="${t.appearance}" data-enhanced>
          ${icon('appearance')}
          <select id="theme-select" aria-label="${t.appearance}">
            ${['system', 'light', 'dark'].map(mode => `<option value="${mode}">${t[mode]}</option>`).join('')}
          </select>
        </div>
        <a class="nav-btn" id="language-link" href="${languageLink}" hreflang="${site.languages[other].locale}" lang="${site.languages[other].locale}" aria-label="${other === 'en' ? 'English' : '中文'}" data-tooltip="${other === 'en' ? '中 / EN' : 'EN / 中'}">${icon('language')}</a>
      </div>
    </div>
  </nav>

  <main class="main-content" id="main">
    <section class="full-width-section" id="projects" aria-labelledby="projects-title">
      <h2 class="sr-only" id="projects-title">${t.projects}</h2>
      <div class="projects-toolbar" data-enhanced>
        <div class="category-filter-container" role="group" aria-label="${t.filters}">
          ${Object.entries(data.categories).map(([id, label]) => `<button class="filter-btn" type="button" data-filter="${id}" aria-pressed="${id === 'all'}">${tr(label)}</button>`).join('\n          ')}
        </div>
        <div class="view-switch-capsule" role="group" aria-label="${t.layout}">
          ${['table', 'grid'].map(view => `<button class="view-switch-btn" type="button" data-view="${view}" aria-label="${t[view === 'table' ? 'list' : 'grid']}" data-tooltip="${t[view === 'table' ? 'list' : 'grid']}" aria-pressed="${view === 'grid'}">${icon(view === 'table' ? 'list' : 'grid')}</button>`).join('')}
        </div>
      </div>
      <div class="projects-container" id="projects-content">
        <div class="projects-grid">
          ${projects.map(projectCard).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="full-width-section" id="experiences" aria-labelledby="experiences-title">
      <h2 class="sr-only" id="experiences-title">${t.experiences}</h2>
      <div class="experiences-timeline">
        ${Array.from(experienceGroups.values(), experienceGroup).join('\n        ')}
      </div>
    </section>

    <section class="full-width-section" id="blog" aria-labelledby="blog-title">
      <h2 class="sr-only" id="blog-title">${t.blog}</h2>
      <div class="blog-list">
        <div class="blog-table-group">
          ${articles.map(articleRow).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="full-width-section" id="contact" aria-labelledby="contact-title">
      <h2 class="sr-only" id="contact-title">${t.contact}</h2>
      <div class="contact-content">
        <div class="contact-table-group">
          ${contactContent}
          <a class="contact-table-row" href="${asset}${data.profile.cvUrl}" download><span class="contact-row-title">${lang === 'zh' ? '个人简历' : 'Resume / CV'}</span><span class="contact-row-text">${t.resume}</span></a>
        </div>
        <p class="copy-status" id="copy-status" role="status" data-success="${t.copied}" data-error="${t.copyError}"></p>
      </div>
    </section>
  </main>
  <footer class="footer"></footer>
</body>
</html>
`.replace(/[ \t]+$/gm, '');
}

const files = new Map(languages.map(([lang, variant]) => [
  join(root, variant.path, 'index.html'),
  renderPage(lang, variant)
]));
files.set(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`);
files.set(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${languages.map(([, { path }]) => `  <url><loc>${absolute(path)}</loc></url>`).join('\n')}
</urlset>
`);

const check = process.argv.includes('--check');
for (const [file, contents] of files) {
  if (check) {
    if (!existsSync(file) || readFileSync(file, 'utf8').replace(/\r\n/g, '\n') !== contents) {
      console.error(`Outdated: ${file}`);
      process.exitCode = 1;
    }
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, contents);
  }
}
