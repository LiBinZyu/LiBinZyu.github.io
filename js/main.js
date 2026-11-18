// Main JavaScript file for Personal Portfolio
// 个人作品集主要JavaScript文件

class PortfolioApp {
  constructor() {
    this.currentLanguage = 'zh';
    this.currentTheme = 'light';
    this.currentSection = 'projects';
    this.starredProjects = new Set();
    this.projectViewMode = 'grid';
  }

  init() {
    this.loadUserPreferences();
    this.setupEventListeners();
    this.loadContent();
    this.updateUI();
  }

  // Load user preferences from localStorage or browser settings
  loadUserPreferences() {
    const savedLanguage = localStorage.getItem('portfolio-language');
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedStars = localStorage.getItem('portfolio-stars');
    const savedView = localStorage.getItem('portfolio-view-mode');

    // Default to card grid view
    this.projectViewMode = savedView || 'grid';

    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    } else {
      // Detect browser language for new users
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('zh')) {
        this.currentLanguage = 'zh';
      } else {
        // Fallback to site default from data.js
        this.currentLanguage = typeof portfolioData !== 'undefined' ? portfolioData.config.defaultLanguage : 'en';
      }
    }

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Detect system theme preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }

    if (savedStars) this.starredProjects = new Set(JSON.parse(savedStars));

    // Apply theme immediately to both root and body
    document.documentElement.className = `theme-${this.currentTheme}`;
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    document.body.className = `theme-${this.currentTheme}`;
  }

  // Save user preferences to localStorage
  saveUserPreferences() {
    localStorage.setItem('portfolio-language', this.currentLanguage);
    localStorage.setItem('portfolio-theme', this.currentTheme);
    localStorage.setItem('portfolio-stars', JSON.stringify([...this.starredProjects]));
  }

  // Setup event listeners
  setupEventListeners() {
    // Scroll event for sticky navbar background styling
    const handleScroll = () => {
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) {
        if (window.scrollY > 10) {
          navMenu.classList.add('scrolled');
        } else {
          navMenu.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Navigation menu
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        this.switchSection(section);
      });
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      this.toggleTheme();
    });

    // Language toggle
    document.getElementById('language-toggle').addEventListener('click', () => {
      this.toggleLanguage();
    });

    // Download CV button
    document.getElementById('download-cv').addEventListener('click', () => {
      this.downloadCV();
    });

    // Download profile button in contact section
    const contactDownloadBtn = document.getElementById('contact-download-profile');
    if (contactDownloadBtn) {
      contactDownloadBtn.addEventListener('click', () => {
        this.downloadCV();
      });
    }

    // Projects category filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const category = e.currentTarget.dataset.category;
        this.loadProjects(category);
      });
    });

    // View mode switch (Table vs Grid)
    document.querySelectorAll('.view-switch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        if (view && view !== this.projectViewMode) {
          this.projectViewMode = view;
          localStorage.setItem('portfolio-view-mode', view);
          this.updateViewSwitchButtons();
          const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
          this.loadProjects(activeCategory);
        }
      });
    });

    // Modal close listeners
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalClose) {
      modalClose.addEventListener('click', () => this.closeProjectModal());
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', () => this.closeProjectModal());
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeProjectModal();
    });

    // Contact items copy functionality
    document.querySelectorAll('.contact-item[data-copy]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.copyContactInfo(item);
      });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Window resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  // Switch between sections
  switchSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    this.currentSection = sectionName;

    // Load section-specific content
    this.loadSectionContent(sectionName);
  }

  // Toggle between light and dark theme
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.className = `theme-${this.currentTheme}`;
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    document.body.className = `theme-${this.currentTheme}`;
    this.saveUserPreferences();
    this.updateThemeIcon();
    if (typeof initVantaEffect === 'function') {
      setTimeout(() => initVantaEffect(), 50);
    }
  }

  // Update theme toggle icon
  updateThemeIcon() {
    const icon = document.querySelector('#theme-toggle img');
    if (icon) {
      icon.src = this.currentTheme === 'light'
        ? 'https://cdn.jsdelivr.net/npm/iconoir@latest/icons/half-moon.svg'
        : 'https://cdn.jsdelivr.net/npm/iconoir@latest/icons/sun-light.svg';
      icon.style.filter = '';
    }
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const tip = this.currentTheme === 'light'
        ? (this.currentLanguage === 'zh' ? '深色模式' : 'Dark Mode')
        : (this.currentLanguage === 'zh' ? '浅色模式' : 'Light Mode');
      btn.setAttribute('data-tooltip', tip);
      btn.setAttribute('title', tip);
    }
  }

  // Toggle between Chinese and English
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
    this.updateLanguage();
    this.saveUserPreferences();
  }

  // Update all text content based on current language
  updateLanguage() {
    console.log('[PortfolioApp] updateLanguage called, currentLanguage:', this.currentLanguage);
    document.documentElement.lang = this.currentLanguage === 'zh' ? 'zh-CN' : 'en-US';
    document.documentElement.setAttribute('data-lang', this.currentLanguage);

    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
      const text = element.dataset[this.currentLanguage];
      if (text) {
        element.textContent = text;
      }
    });

    // Update bilingual tooltips
    document.querySelectorAll('[data-tooltip-zh][data-tooltip-en]').forEach(element => {
      const tip = element.getAttribute(`data-tooltip-${this.currentLanguage}`);
      if (tip) {
        element.setAttribute('data-tooltip', tip);
        element.setAttribute('title', tip);
      }
    });

    const langBtn = document.getElementById('language-toggle');
    if (langBtn) {
      const tip = this.currentLanguage === 'zh' ? 'Switch to English' : '切换至中文';
      langBtn.setAttribute('data-tooltip', tip);
      langBtn.setAttribute('title', tip);
    }

    // Update page title
    document.title = this.currentLanguage === 'zh' ? '李炳儒 · 作品集' : 'Bingru Li · Portfolio';

    // Reload dynamic content
    this.loadProfile();
    this.loadContact();
    this.loadExperiences();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    this.loadProjects(activeCategory);
    this.loadBlogs();
  }

  // Load all content
  loadContent() {
    this.loadProfile();
    this.loadContact();
    this.loadExperiences();
    this.loadProjects();
    this.loadBlogs();
    this.updateThemeIcon();
  }

  // Load profile from data.js
  loadProfile() {
    if (typeof portfolioData === 'undefined' || !portfolioData.profile) return;
    const profile = portfolioData.profile;

    const imgElement = document.getElementById('profile-img');
    if (imgElement && profile.image) {
      imgElement.src = profile.image;
    }

    const nameElement = document.querySelector('.profile-name');
    if (nameElement && profile.name) {
      nameElement.setAttribute('data-zh', profile.name.zh);
      nameElement.setAttribute('data-en', profile.name.en);
      nameElement.textContent = profile.name[this.currentLanguage];
    }

    const bioContainer = document.querySelector('.profile-bio');
    if (bioContainer && profile.bio) {
      bioContainer.innerHTML = '';
      const bioText = profile.bio[this.currentLanguage] || '';
      bioText.split('\n').forEach(paragraph => {
        if (paragraph.trim()) {
          const p = document.createElement('p');
          p.className = 'bio-paragraph';
          p.textContent = paragraph.trim();
          bioContainer.appendChild(p);
        }
      });
    }
  }

  // Load contact as visionOS Inset Grouped Table (Title + Text, Zero Icons)
  loadContact() {
    const container = document.getElementById('contact-info-list');
    if (!container || typeof portfolioData === 'undefined' || !portfolioData.contact) return;

    container.innerHTML = '';
    const tableGroup = document.createElement('div');
    tableGroup.className = 'contact-table-group animate-slide-up';

    const getTitleAndText = (item) => {
      const isZh = this.currentLanguage === 'zh';
      if (item.text.includes('@')) {
        return {
          title: isZh ? '电子邮箱' : 'Email',
          text: item.text
        };
      }
      if (item.text.includes('+86') || item.icon.includes('phone')) {
        return {
          title: isZh ? '联系电话' : 'Phone',
          text: item.text
        };
      }
      if (item.text.includes('WeChat') || item.icon.includes('chat')) {
        return {
          title: isZh ? '微信' : 'WeChat',
          text: item.copy || 'LiBinZyu'
        };
      }
      if (item.link && item.link.includes('github')) {
        return {
          title: 'GitHub',
          text: 'github.com/LiBinZyu'
        };
      }
      if (item.link && item.link.includes('linkedin')) {
        return {
          title: 'LinkedIn',
          text: 'linkedin.com/in/robbingruli'
        };
      }
      return {
        title: isZh ? '联系方式' : 'Contact',
        text: item.text
      };
    };

    portfolioData.contact.forEach(item => {
      const row = document.createElement(item.link ? 'a' : 'div');
      row.className = 'contact-table-row';

      if (item.link) {
        row.href = item.link;
        row.target = '_blank';
        row.rel = 'noopener noreferrer';
      }

      if (item.copy) {
        row.setAttribute('data-copy', item.copy);
        row.style.cursor = 'pointer';
        row.addEventListener('click', (e) => {
          if (!item.link) {
            e.preventDefault();
            this.copyContactInfo(row);
          }
        });
      }

      const { title, text } = getTitleAndText(item);

      row.innerHTML = `
        <span class="contact-row-title">${title}</span>
        <span class="contact-row-text">${text}</span>
      `;

      tableGroup.appendChild(row);
    });

    // Add Resume download as final row in the grouped table (Zero Icons)
    const isZh = this.currentLanguage === 'zh';
    const cvRow = document.createElement('div');
    cvRow.className = 'contact-table-row';
    cvRow.style.cursor = 'pointer';
    cvRow.innerHTML = `
      <span class="contact-row-title">${isZh ? '个人简历' : 'Resume / CV'}</span>
      <span class="contact-row-text">${isZh ? '下载个人简历 (Bilingual PDF)' : 'Download Resume (Bilingual PDF)'}</span>
    `;
    cvRow.addEventListener('click', () => {
      this.downloadCV();
    });
    tableGroup.appendChild(cvRow);

    container.appendChild(tableGroup);
  }

  // Load experiences content with category grouping and link support
  loadExperiences() {
    const container = document.getElementById('experiences-content');
    if (!container) return;

    const experiences = portfolioData.experiences;
    container.innerHTML = '';

    const grouped = {};
    const categoriesOrder = [];

    experiences.forEach(exp => {
      const catKey = exp.category ? exp.category.en : 'EXPERIENCE';
      const catName = exp.category ? exp.category[this.currentLanguage] : (this.currentLanguage === 'zh' ? '经历' : 'EXPERIENCE');

      if (!grouped[catKey]) {
        grouped[catKey] = {
          name: catName,
          items: []
        };
        categoriesOrder.push(catKey);
      }
      grouped[catKey].items.push(exp);
    });

    categoriesOrder.forEach((catKey, catIdx) => {
      const group = grouped[catKey];
      const blockEl = document.createElement('div');
      blockEl.className = 'experience-block animate-slide-up';
      blockEl.style.animationDelay = `${catIdx * 0.1}s`;

      const itemsHtml = group.items.map(item => {
        const title = (item.title && item.title[this.currentLanguage]) || '';
        const company = (item.company && item.company[this.currentLanguage]) || '';
        const period = (item.period && item.period[this.currentLanguage]) || '';

        let descriptionHtml = '';
        if (catKey !== 'EDUCATION' && catKey !== 'EXPERIENCE' && item.description) {
          const descVal = item.description[this.currentLanguage];
          if (descVal) {
            const formattedDesc = descVal.split('\n').map(line => line.trim()).join('<br>');
            descriptionHtml = `<p class="exp-desc-text">${formattedDesc}</p>`;
          }
        }

        const tagsHtml = item.tags && Array.isArray(item.tags) && item.tags.length > 0
          ? `<div class="exp-tags">${item.tags.filter(t => t).map(t => `<span class="exp-tag">${t}</span>`).join('')}</div>`
          : '';

        let linkUrl = '';
        if (item.link) {
          if (typeof item.link === 'object') {
            linkUrl = item.link[this.currentLanguage] || item.link.en || item.link.zh;
          } else {
            linkUrl = item.link;
          }
        }

        const companyHtml = linkUrl && company
          ? `<a href="${linkUrl}" target="_blank" rel="noopener" class="exp-link">${company}</a>`
          : company;

        let titleCompanyHtml = '';
        if (title && companyHtml) {
          titleCompanyHtml = `
            <div class="exp-title-company">
              <span class="exp-title">${title}</span>
              <span class="exp-sep">—</span>
              <span class="exp-company">${companyHtml}</span>
            </div>
          `;
        } else if (title) {
          titleCompanyHtml = `
            <div class="exp-title-company">
              <span class="exp-title">${title}</span>
            </div>
          `;
        } else if (companyHtml) {
          titleCompanyHtml = `
            <div class="exp-title-company">
              <span class="exp-company">${companyHtml}</span>
            </div>
          `;
        }

        const periodHtml = period
          ? `
            <div class="exp-meta-right">
              <span>${period}</span>
            </div>
          `
          : '';

        return `
          <div class="exp-row">
            <div class="exp-main">
              ${titleCompanyHtml}
              ${descriptionHtml}
              ${tagsHtml}
            </div>
            ${periodHtml}
          </div>
        `;
      }).join('');

      blockEl.innerHTML = `
        <div class="experience-category-col">${group.name.toUpperCase()}</div>
        <div class="experience-rows-col">
          ${itemsHtml}
        </div>
      `;

      container.appendChild(blockEl);
    });
  }

  // Update view switch button active states
  updateViewSwitchButtons() {
    document.querySelectorAll('.view-switch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === this.projectViewMode);
    });
  }

  // Open visionOS Project Modal with full details and media
  openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-description');
    const techEl = document.getElementById('modal-tech');
    const linksEl = document.getElementById('modal-links');
    const mediaEl = document.getElementById('modal-media');

    if (titleEl) titleEl.textContent = project.title[this.currentLanguage] || '';
    if (descEl) descEl.textContent = project.description[this.currentLanguage] || '';

    if (techEl) {
      techEl.innerHTML = (project.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    if (linksEl) {
      linksEl.innerHTML = '';
      if (project.links) {
        if (project.links.github) {
          linksEl.innerHTML += `
            <a href="${project.links.github}" target="_blank" rel="noopener" class="project-link">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/github.svg" class="project-link-icon icon" width="16" height="16">
              <span>GitHub</span>
            </a>
          `;
        }
        if (project.links.paper) {
          linksEl.innerHTML += `
            <a href="${project.links.paper}" target="_blank" rel="noopener" class="project-link">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/page.svg" class="project-link-icon icon" width="16" height="16">
              <span>Paper</span>
            </a>
          `;
        }
        if (project.links.demo) {
          linksEl.innerHTML += `
            <a href="${project.links.demo}" target="_blank" rel="noopener" class="project-link">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/open-in-browser.svg" class="project-link-icon icon" width="16" height="16">
              <span>Demo</span>
            </a>
          `;
        }
      }
    }

    if (mediaEl) {
      const allMedia = [...(project.videos || []), ...(project.images || [])];
      if (allMedia.length > 0) {
        const firstMedia = allMedia[0];
        const isVideo = firstMedia.match(/\.(mp4|webm|mov)(\?.*)?$/i);
        if (isVideo) {
          mediaEl.innerHTML = `<video src="${firstMedia}" controls autoplay muted playsinline loop style="width:100%;max-height:420px;border-radius:var(--radius-tile);object-fit:cover;"></video>`;
        } else {
          mediaEl.innerHTML = `<img src="${firstMedia}" alt="${project.title[this.currentLanguage]}" style="width:100%;max-height:420px;object-fit:cover;border-radius:var(--radius-tile);">`;
        }
        mediaEl.classList.add('has-media');
      } else {
        mediaEl.innerHTML = '';
        mediaEl.classList.remove('has-media');
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close visionOS Project Modal
  closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const mediaEl = document.getElementById('modal-media');
    if (mediaEl) {
      const video = mediaEl.querySelector('video');
      if (video) video.pause();
    }
  }

  // Load projects content with category filtering and visionOS view mode (table vs grid)
  loadProjects(filterCategory = 'all') {
    const container = document.getElementById('projects-content');
    if (!container) return;

    const projects = portfolioData.projects;
    if (!projects || projects.length === 0) return;

    container.innerHTML = '';
    this.updateViewSwitchButtons();

    const filteredProjects = filterCategory === 'all'
      ? projects
      : projects.filter(proj => {
        if (Array.isArray(proj.category)) {
          return proj.category.includes(filterCategory);
        }
        return proj.category === filterCategory;
      });

    const sortedProjects = filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (this.projectViewMode === 'table') {
      // visionOS Inset Grouped Table (Directly matching Figma Image 1)
      const tableGroup = document.createElement('div');
      tableGroup.className = 'project-table-group animate-slide-up';

      sortedProjects.forEach(project => {
        const row = document.createElement('div');
        row.className = 'project-table-row';

        const allMedia = [...(project.videos || []), ...(project.images || [])];
        const firstMedia = allMedia[0];
        const isVideo = firstMedia && Boolean(firstMedia.match(/\.(mp4|webm|mov)(\?.*)?$/i));

        let thumbHtml = '';
        if (isVideo) {
          thumbHtml = `
            <div class="project-table-thumb">
              <video src="${firstMedia}" muted playsinline loop preload="metadata" onmouseover="this.play().catch(()=>{})" onmouseout="this.pause()"></video>
            </div>
          `;
        } else if (firstMedia) {
          thumbHtml = `
            <div class="project-table-thumb">
              <img src="${firstMedia}" alt="${project.title[this.currentLanguage]}" loading="lazy">
            </div>
          `;
        } else {
          thumbHtml = `
            <div class="project-table-thumb" style="display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/view-grid.svg" class="icon" width="20" height="20" style="opacity:0.4;">
            </div>
          `;
        }

        const tagsHtml = (project.tech || []).slice(0, 3)
          .map(t => `<span class="tech-tag">${t}</span>`).join('');

        let actionsHtml = '';
        if (project.links) {
          if (project.links.github) {
            actionsHtml += `<a href="${project.links.github}" target="_blank" rel="noopener" class="project-link" title="GitHub" onclick="event.stopPropagation()">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/github.svg" class="icon" width="14" height="14">
              <span>GitHub</span>
            </a>`;
          }
          if (project.links.paper) {
            actionsHtml += `<a href="${project.links.paper}" target="_blank" rel="noopener" class="project-link" title="Paper" onclick="event.stopPropagation()">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/page.svg" class="icon" width="14" height="14">
              <span>Paper</span>
            </a>`;
          }
          if (project.links.demo) {
            actionsHtml += `<a href="${project.links.demo}" target="_blank" rel="noopener" class="project-link" title="Demo" onclick="event.stopPropagation()">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/open-in-browser.svg" class="icon" width="14" height="14">
              <span>Demo</span>
            </a>`;
          }
        }

        row.innerHTML = `
          ${thumbHtml}
          <div class="project-table-main">
            <div class="project-table-header">
              <h3 class="project-table-title">${project.title[this.currentLanguage]}</h3>
              <span class="project-table-date">${this.formatDate(project.date)}</span>
            </div>
            <p class="project-table-desc">${project.description[this.currentLanguage]}</p>
            <div class="project-table-tags">${tagsHtml}</div>
          </div>
          <div class="project-table-actions">
            ${actionsHtml}
            <div class="project-table-chevron">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/nav-arrow-right.svg" class="icon" width="16" height="16">
            </div>
          </div>
        `;

        row.addEventListener('click', () => {
          this.openProjectModal(project);
        });

        tableGroup.appendChild(row);
      });

      container.appendChild(tableGroup);
    } else {
      // 3-Column visionOS Squircle Cards Grid (Strictly 3 columns on desktop)
      const grid = document.createElement('div');
      grid.className = 'projects-grid animate-slide-up';

      sortedProjects.forEach(project => {
        try {
          const cardInstance = new ProjectCard(project, grid);
          if (cardInstance && cardInstance.cardElement) {
            cardInstance.cardElement.addEventListener('click', (e) => {
              if (e.target.closest('.project-link') || e.target.closest('.project-image-indicator')) {
                return;
              }
              this.openProjectModal(project);
            });
          }
        } catch (error) {
          console.error('Error creating project card:', error);
        }
      });

      container.appendChild(grid);
    }
  }

  // Load blogs content as visionOS Inset Grouped Table (matching Image 1)
  loadBlogs() {
    const container = document.getElementById('blogs-content');
    if (!container) return;

    const blogs = portfolioData.blogs;
    if (!blogs || blogs.length === 0) {
      container.innerHTML = '<p>No blogs found.</p>';
      return;
    }

    container.innerHTML = '';

    const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    const tableGroup = document.createElement('div');
    tableGroup.className = 'blog-table-group animate-slide-up';

    sortedBlogs.forEach(blog => {
      const row = document.createElement('a');
      row.className = 'blog-table-row';

      let linkUrl = '';
      if (blog.link) {
        if (typeof blog.link === 'object') {
          linkUrl = blog.link[this.currentLanguage] || blog.link.en || blog.link.zh;
        } else {
          linkUrl = blog.link;
        }
      }
      row.href = linkUrl || '#';
      if (linkUrl) {
        row.target = '_blank';
        row.rel = 'noopener noreferrer';
      }

      const title = blog.title[this.currentLanguage] || '';
      const description = blog.description[this.currentLanguage] || '';
      const date = this.formatDate(blog.date);

      row.innerHTML = `
        <div class="blog-table-thumb">
          <img src="${blog.image}" alt="${title}" loading="lazy">
        </div>
        <div class="blog-table-main">
          <div class="blog-table-header">
            <h3 class="blog-table-title">${title}</h3>
            <span class="blog-table-date">${date}</span>
          </div>
          <p class="blog-table-desc">${description}</p>
        </div>
        <div class="blog-table-chevron">
          <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/nav-arrow-right.svg" class="icon" width="16" height="16">
        </div>
      `;

      tableGroup.appendChild(row);
    });

    container.appendChild(tableGroup);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    if (this.currentLanguage === 'zh') {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    }
  }

  // Load section-specific content
  loadSectionContent(sectionName) {
    switch (sectionName) {
      case 'experiences':
        this.loadExperiences();
        break;
      case 'projects':
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
        this.loadProjects(activeCategory);
        break;
      case 'blog':
        this.loadBlogs();
        break;
      case 'contact':
        break;
    }
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger reflow to enable transition
    notification.offsetHeight;
    notification.classList.add('active');

    setTimeout(() => {
      notification.classList.remove('active');
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Download CV
  downloadCV() {
    const cvUrl = portfolioData.profile.cvUrl;
    if (cvUrl) {
      const link = document.createElement('a');
      link.href = encodeURI(cvUrl);
      link.download = cvUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.showNotification(
        this.currentLanguage === 'zh' ? '简历链接暂不可用' : 'CV link not available',
        'error'
      );
    }
  }

  // Copy contact info to clipboard with subtle feedback
  async copyContactInfo(item) {
    const textToCopy = item.dataset.copy;

    try {
      await navigator.clipboard.writeText(textToCopy);

      const message = this.currentLanguage === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard';
      this.showNotification(message, 'success');

      item.style.transform = 'scale(0.98)';
      item.style.background = 'var(--bg-active)';

      setTimeout(() => {
        item.style.transform = '';
        item.style.background = '';
      }, 200);

    } catch (err) {
      console.error('Failed to copy: ', err);
      this.showNotification(
        this.currentLanguage === 'zh' ? '复制失败' : 'Copy failed',
        'error'
      );
    }
  }

  // Update UI based on current state
  updateUI() {
    this.updateLanguage();
    this.updateThemeIcon();
    this.updateViewSwitchButtons();
  }

  // Handle window resize
  handleResize() {
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile', isMobile);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
  window.portfolioApp.init();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && window.portfolioApp) {
    window.portfolioApp.loadContent();
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
