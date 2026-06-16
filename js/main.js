// Main JavaScript file for Personal Portfolio
// 个人作品集主要JavaScript文件

class PortfolioApp {
  constructor() {
    this.currentLanguage = 'zh';
    this.currentTheme = 'light';
    this.currentSection = 'projects';
    this.starredProjects = new Set();
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

    // Apply theme immediately
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
    document.body.className = `theme-${this.currentTheme}`;
    this.saveUserPreferences();
    this.updateThemeIcon();
  }

  // Update theme toggle icon
  updateThemeIcon() {
    const icon = document.querySelector('#theme-toggle img');
    if (icon) {
      icon.src = this.currentTheme === 'light'
        ? 'https://cdn.jsdelivr.net/npm/iconoir@latest/icons/sun-light.svg'
        : 'https://cdn.jsdelivr.net/npm/iconoir@latest/icons/half-moon.svg';
      // Clear inline filter styling so it inherits from the CSS class filter
      icon.style.filter = '';
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

    // Update page title
    document.title = this.currentLanguage === 'zh' ? '李炳儒' : 'Bingru Li';

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

  // Load contact from data.js
  loadContact() {
    const container = document.getElementById('contact-info-list');
    if (!container || typeof portfolioData === 'undefined' || !portfolioData.contact) return;

    // Save download button element
    const downloadBtn = document.getElementById('contact-download-profile');
    container.innerHTML = '';

    portfolioData.contact.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'contact-item';

      if (item.copy) {
        itemEl.setAttribute('data-copy', item.copy);
      }

      // Add icon
      const img = document.createElement('img');
      img.src = `https://cdn.jsdelivr.net/npm/iconoir@latest/icons/${item.icon}.svg`;
      img.alt = item.text;
      img.className = 'contact-icon icon';
      img.width = 18;
      img.height = 18;
      itemEl.appendChild(img);

      // Add text or link
      if (item.link) {
        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = item.text;
        link.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        itemEl.appendChild(link);
      } else {
        const span = document.createElement('span');
        span.textContent = item.text;
        itemEl.appendChild(span);
      }

      // Copy listener
      if (item.copy) {
        itemEl.addEventListener('click', () => {
          this.copyContactInfo(itemEl);
        });
      }

      container.appendChild(itemEl);
    });

    if (downloadBtn) {
      container.appendChild(downloadBtn);
    }
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

  // Load projects content with category filtering
  loadProjects(filterCategory = 'all') {
    console.log('[PortfolioApp] loadProjects called, category:', filterCategory, 'language:', this.currentLanguage);
    const container = document.getElementById('projects-content');
    if (!container) return;

    const projects = portfolioData.projects;
    if (!projects || projects.length === 0) return;

    container.innerHTML = '';

    if (typeof ProjectCard === 'undefined') {
      console.error('ProjectCard class not available');
      return;
    }

    const filteredProjects = filterCategory === 'all'
      ? projects
      : projects.filter(proj => {
        if (Array.isArray(proj.category)) {
          return proj.category.includes(filterCategory);
        }
        return proj.category === filterCategory;
      });

    const sortedProjects = filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedProjects.forEach((project, index) => {
      try {
        new ProjectCard(project, container);
      } catch (error) {
        console.error('Error creating project card:', error);
      }
    });
  }

  // Load blogs content dynamically
  loadBlogs() {
    const container = document.getElementById('blogs-content');
    if (!container) return;

    const blogs = portfolioData.blogs;
    if (!blogs || blogs.length === 0) {
      container.innerHTML = '<p>No blogs found.</p>';
      return;
    }

    container.innerHTML = '';

    // Sort blogs by date (newest first)
    const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedBlogs.forEach((blog, index) => {
      const blogEl = document.createElement('div');
      blogEl.className = 'blog-item animate-slide-up';
      blogEl.style.animationDelay = `${index * 0.1}s`;

      const title = blog.title[this.currentLanguage];
      const description = blog.description[this.currentLanguage];
      const date = this.formatDate(blog.date);

      let linkUrl = '';
      if (blog.link) {
        if (typeof blog.link === 'object') {
          linkUrl = blog.link[this.currentLanguage] || blog.link.en || blog.link.zh;
        } else {
          linkUrl = blog.link;
        }
      }

      blogEl.innerHTML = `
        <a href="${linkUrl}" target="_blank" rel="noopener" class="blog-card-link">
          <div class="blog-card">
            <div class="blog-image-col">
              <img src="${blog.image}" alt="${title}" loading="lazy">
            </div>
            <div class="blog-content-col">
              <span class="blog-date">${date}</span>
              <h3 class="blog-title">${title}</h3>
              <p class="blog-desc">${description}</p>
            </div>
          </div>
        </a>
      `;

      container.appendChild(blogEl);
    });
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
      item.style.background = 'var(--accent-blue-light)';

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
