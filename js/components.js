// Component-specific JavaScript functionality (Simplified & Cleaned)

class ComponentManager {
  constructor() {
    this.initializeComponents();
  }

  initializeComponents() {
    this.setupImageLazyLoading();
    this.setupSmoothAnimations();
  }

  setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupSmoothAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
      });
    }
  }
}

// Project Card Component
class ProjectCard {
  constructor(projectData, container) {
    this.projectData = projectData;
    this.container = container;
    this.render();
    this.setupEventListeners();
  }

  render() {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = this.getCardHTML();
    this.container.appendChild(card);
    this.cardElement = card;
  }

  getCardHTML() {
    const { title, description, images, videos, tech, links, date } = this.projectData;
    const currentLang = window.portfolioApp?.currentLanguage || 'zh';

    const allMedia = [...(images || []), ...(videos || [])];
    if (allMedia.length === 0) {
      allMedia.push('https://via.placeholder.com/400x200?text=No+Image');
    }

    const mediaItems = allMedia.map((media, index) => {
      const isVideo = media.match(/\.(mp4|webm|mov)(\?.*)?$/i) ||
        media.includes('youtube.com') || media.includes('youtu.be') ||
        media.includes('vimeo.com');

      if (isVideo) {
        return `
          <div class="project-image-item ${index === 0 ? 'active' : ''}" data-type="video" style="position:relative;">
            <video src="${media}" muted playsinline loop preload="auto" autoplay style="background:#222;">
              <p>Your browser does not support video playback</p>
            </video>
            <div class="video-corner-tag">
              <img src="https://cdn.jsdelivr.net/npm/iconoir@7.11.0/icons/solid/youtube.svg" alt="Video" style="width:24px;height:24px;display:block; filter: invert(1);">
            </div>
          </div>
        `;
      } else {
        return `
          <div class="project-image-item ${index === 0 ? 'active' : ''}" data-type="image">
            <img data-src="${media}" src="https://via.placeholder.com/10x10?text=..." alt="${title[currentLang]}" class="lazy" loading="lazy">
          </div>
        `;
      }
    }).join('');

    const indicators = allMedia.map((_, index) =>
      `<div class="project-image-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
    ).join('');

    return `
      <div class="project-image-container">
        <div class="project-image-carousel">
          ${mediaItems}
        </div>
        ${allMedia.length > 1 ? `<div class="project-image-indicators">${indicators}</div>` : ''}
      </div>
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">${title[currentLang]}</h3>
        </div>
        <p class="project-description">${description[currentLang]}</p>
        <div class="project-tech">
          ${tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${links.github ? `<a href="${links.github}" target="_blank" rel="noopener" class="project-link">
            <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/github.svg" alt="GitHub" class="project-link-icon icon">
            <span data-en="GitHub" data-zh="GitHub">GitHub</span>
          </a>` : ''}
          ${links.paper ? `<a href="${links.paper}" target="_blank" rel="noopener" class="project-link">
            <img src="https://cdn.jsdelivr.net/npm/iconoir@latest/icons/page.svg" alt="Paper" class="project-link-icon icon">
            <span data-en="Paper" data-zh="Paper">Paper</span>
          </a>` : ''}
          ${links.demo ? `<a href="${links.demo}" target="_blank" rel="noopener" class="project-link">
            <span class="material-icons">open_in_new</span>
            <span data-en="Demo" data-zh="演示">演示</span>
          </a>` : ''}
        </div>
        <div class="project-meta">
          <span class="project-period">${this.formatDate(date)}</span>
        </div>
      </div>
    `;
  }

  setupMediaLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      }, { rootMargin: '100px' });

      this.cardElement.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupEventListeners() {
    this.setupImageCarousel();
    this.setupMediaLazyLoading();

    // Autoplay first video if active
    const firstVideo = this.cardElement.querySelector('.project-image-item.active[data-type="video"] video');
    if (firstVideo) {
      firstVideo.play().catch((err) => {
        console.warn('[ProjectCard] Video autoplay warning:', err);
      });
    }
  }

  setupImageCarousel() {
    const indicators = this.cardElement.querySelectorAll('.project-image-indicator');
    const items = this.cardElement.querySelectorAll('.project-image-item');

    if (items.length <= 1) return;

    let currentIndex = 0;
    let carouselInterval;

    const showItem = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    };

    const nextItem = () => {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    };

    const startCarousel = () => {
      carouselInterval = setInterval(nextItem, 3000);
    };

    const stopCarousel = () => {
      clearInterval(carouselInterval);
    };

    startCarousel();

    this.cardElement.addEventListener('mouseenter', stopCarousel);
    this.cardElement.addEventListener('mouseleave', startCarousel);

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        showItem(currentIndex);
        stopCarousel();
        startCarousel();
      });
    });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const currentLang = window.portfolioApp?.currentLanguage || 'zh';

    if (currentLang === 'zh') {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  updateLanguage() {
    const currentLang = window.portfolioApp?.currentLanguage || 'zh';
    const title = this.cardElement.querySelector('.project-title');
    const description = this.cardElement.querySelector('.project-description');

    if (title) title.textContent = this.projectData.title[currentLang];
    if (description) description.textContent = this.projectData.description[currentLang];
  }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.componentManager = new ComponentManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ComponentManager,
    ProjectCard
  };
}
