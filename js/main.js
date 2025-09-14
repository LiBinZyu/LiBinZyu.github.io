// Main JavaScript file for Personal Portfolio
// 个人作品集主要JavaScript文件

// Import ProjectCard class (will be available after components.js loads)
// 导入ProjectCard类（在components.js加载后可用）

class PortfolioApp {
  constructor() {
    this.currentLanguage = 'zh';
    this.currentTheme = 'light';
    this.currentSection = 'experiences';
    this.starredProjects = new Set();
    
    this.init();
  }

  init() {
    this.loadUserPreferences();
    this.setupEventListeners();
    this.loadContent();
    this.updateUI();
  }

  // Load user preferences from localStorage
  loadUserPreferences() {
    const savedLanguage = localStorage.getItem('portfolio-language');
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedStars = localStorage.getItem('portfolio-stars');
    
    if (savedLanguage) this.currentLanguage = savedLanguage;
    if (savedTheme) this.currentTheme = savedTheme;
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

    // Contact form
    // 由 js/components.js 负责表单提交逻辑，这里不再监听

    // Contact items copy functionality
    document.querySelectorAll('.contact-item').forEach(item => {
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
    const icon = document.querySelector('#theme-toggle .theme-icon');
    icon.src = this.currentTheme === 'light'
      ? 'https://cdn.jsdelivr.net/npm/iconoir@latest/icons/sun-light.svg'
      : 'https://cdn.jsdelivr.net/npm/iconoir@latest/icons/half-moon.svg';
    icon.style.filter = 'invert(var(--icon-invert, 0))';
  }

  // Toggle between Chinese and English
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
    this.updateLanguage();
    this.saveUserPreferences();
  }

  // Update all text content based on current language
  updateLanguage() {
    // 更新HTML的lang属性
    document.documentElement.lang = this.currentLanguage === 'zh' ? 'zh-CN' : 'en-US';
    document.documentElement.setAttribute('data-lang', this.currentLanguage);
    
    // 更新所有有data属性的元素
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
      const text = element.dataset[this.currentLanguage];
      if (text) {
        element.textContent = text;
      }
    });

    // Update page title
    document.title = this.currentLanguage === 'zh' ? '李炳儒 - 个人作品集' : 'Bingru Li - Personal Portfolio';
    
    // 重新加载动态内容
    this.loadExperiences();
    this.loadProjects();
  }

  // Load all content
  loadContent() {
    this.loadExperiences();
    this.loadProjects();
    this.updateLanguage();
    this.updateThemeIcon();
  }

  // Load experiences content
  loadExperiences() {
    const container = document.getElementById('experiences-content');
    if (!container) return;

    const experiences = portfolioData.experiences;
    container.innerHTML = '';

    experiences.forEach((exp, index) => {
      const experienceElement = this.createExperienceElement(exp, index);
      container.appendChild(experienceElement);
    });
  }

  // Create experience element
  createExperienceElement(experience, index) {
    const div = document.createElement('div');
    div.className = 'experience-item animate-slide-up';
    div.style.animationDelay = `${index * 0.1}s`;

    const title = experience.title[this.currentLanguage];
    const company = experience.company[this.currentLanguage];
    const period = experience.period[this.currentLanguage];
    const description = experience.description[this.currentLanguage];

    div.innerHTML = `
      <div class="experience-card">
        <div class="experience-header">
          <div>
            <h3 class="experience-title">${title}</h3>
            <p class="experience-company">${company}</p>
          </div>
          <span class="experience-period">${period}</span>
        </div>
        <p class="experience-description">${description}</p>
        <div class="tech-tags">
          ${experience.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;

    return div;
  }

  // Load projects content
  loadProjects() {
    const container = document.getElementById('projects-content');
    if (!container) {
      console.error('Projects container not found');
      return;
    }

    const projects = portfolioData.projects;
    if (!projects || projects.length === 0) {
      console.error('No projects data found');
      return;
    }

    container.innerHTML = '';

    // Check if ProjectCard class is available
    if (typeof ProjectCard === 'undefined') {
      console.error('ProjectCard class not available');
      return;
    }

    // Sort projects by date (newest first)
    const sortedProjects = projects.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedProjects.forEach((project, index) => {
      try {
        // Use the new ProjectCard class
        new ProjectCard(project, container);
      } catch (error) {
        console.error('Error creating project card:', error);
        console.error('Project data:', project);
      }
    });
  }

  // Create project element
  createProjectElement(project, index) {
    const div = document.createElement('div');
    div.className = 'project-card animate-slide-up';
    div.style.animationDelay = `${index * 0.1}s`;

    const title = project.title[this.currentLanguage];
    const description = project.description[this.currentLanguage];
    const isStarred = this.starredProjects.has(project.id);

    div.innerHTML = `
      <img src="${project.image}" alt="${title}" class="project-image" loading="lazy">
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">${title}</h3>
          <div class="project-stats">
            <div class="project-stars ${isStarred ? 'starred' : ''}" data-project-id="${project.id}">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/star.svg" alt="star" class="star-icon icon" style="vertical-align: middle;">
              <span class="star-count">${project.stars}</span>
            </div>
          </div>
        </div>
        <p class="project-description">${description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener" class="project-link">
            <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/code.svg" alt="Code" class="btn-icon icon" style="vertical-align: middle;">
            <span data-en="Code" data-zh="代码">代码</span>
          </a>` : ''}
          ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener" class="project-link">
            <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/open-new-window.svg" alt="Demo" class="btn-icon icon" style="vertical-align: middle;">
            <span data-en="Demo" data-zh="演示">演示</span>
          </a>` : ''}
        </div>
      </div>
    `;

    // Add star click handler
    const starElement = div.querySelector('.project-stars');
    starElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleProjectStar(project.id, starElement);
    });

    return div;
  }

  // Toggle project star
  toggleProjectStar(projectId, starElement) {
    const isStarred = this.starredProjects.has(projectId);
    const starCount = starElement.querySelector('.star-count');
    let currentCount = parseInt(starCount.textContent);

    if (isStarred) {
      this.starredProjects.delete(projectId);
      starElement.classList.remove('starred');
      currentCount--;
    } else {
      this.starredProjects.add(projectId);
      starElement.classList.add('starred');
      currentCount++;
    }

    starCount.textContent = currentCount;
    this.saveUserPreferences();
    this.trackStarAction(projectId, !isStarred);
  }

  // Track star actions for analytics
  trackStarAction(projectId, isStarred) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'project_star', {
        'project_id': projectId,
        'action': isStarred ? 'star' : 'unstar',
        'timestamp': new Date().toISOString()
      });
    }

    // Send to backend if available
    this.sendStarData(projectId, isStarred);
  }

  // Send star data to backend
  async sendStarData(projectId, isStarred) {
    try {
      const response = await fetch('/api/stars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          action: isStarred ? 'star' : 'unstar',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      });

      if (!response.ok) {
        console.warn('Failed to track star action');
      }
    } catch (error) {
      console.warn('Error tracking star action:', error);
    }
  }

  // Load section-specific content
  loadSectionContent(sectionName) {
    switch (sectionName) {
      case 'experiences':
        this.loadExperiences();
        break;
      case 'projects':
        this.loadProjects();
        break;
      case 'contact':
        // Contact form is already loaded
        break;
    }
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Download CV
  downloadCV() {
    const cvUrl = portfolioData.profile.cvUrl;
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    } else {
      this.showNotification(
        this.currentLanguage === 'zh' ? '简历链接暂不可用' : 'CV link not available',
        'error'
      );
    }
  }

  // Copy contact info to clipboard
  async copyContactInfo(item) {
    const textToCopy = item.dataset.copy;
    const type = item.dataset.type;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      
      // Show success notification
      const message = this.currentLanguage === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard';
      this.showNotification(message, 'success');
      
      // Add visual feedback
      item.style.transform = 'scale(0.95)';
      item.style.background = 'var(--accent-blue)';
      item.style.color = 'white';
      
      setTimeout(() => {
        item.style.transform = '';
        item.style.background = '';
        item.style.color = '';
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
    this.loadContent();
  }

  // Handle window resize
  handleResize() {
    // Update any responsive elements if needed
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile', isMobile);
  }

  // Utility: Debounce function
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

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && window.portfolioApp) {
    // Refresh data when page becomes visible
    window.portfolioApp.loadContent();
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
