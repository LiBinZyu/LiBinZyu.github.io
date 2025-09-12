// Component-specific JavaScript functionality
// 组件特定的JavaScript功能

class ComponentManager {
  constructor() {
    this.initializeComponents();
  }

  initializeComponents() {
    this.setupImageLazyLoading();
    this.setupSmoothAnimations();
    this.setupTooltips();
    this.setupKeyboardNavigation();
  }

  // Lazy loading for images
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

  // Smooth animations on scroll
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

  // Setup tooltips
  setupTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      element.addEventListener('mouseenter', this.showTooltip);
      element.addEventListener('mouseleave', this.hideTooltip);
    });
  }

  showTooltip(event) {
    const element = event.target;
    const tooltipText = element.dataset.tooltip;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    Object.assign(tooltip.style, {
      position: 'absolute',
      background: 'var(--text-primary)',
      color: 'var(--bg-primary)',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '1000',
      pointerEvents: 'none',
      opacity: '0',
      transform: 'translateY(10px)',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-lg)'
    });

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
    tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;

    // Animate in
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });

    element._tooltip = tooltip;
  }

  hideTooltip(event) {
    const element = event.target;
    const tooltip = element._tooltip;
    
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 200);
      
      delete element._tooltip;
    }
  }

  // Keyboard navigation
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // Escape key to close modals or clear focus
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }

      // Tab navigation for custom elements
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      }

      // Arrow keys for navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.handleArrowNavigation(event);
      }
    });
  }

  handleEscapeKey() {
    // Close any open modals or dropdowns
    const openModals = document.querySelectorAll('.modal.active');
    openModals.forEach(modal => {
      modal.classList.remove('active');
    });

    // Clear focus from custom elements
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.classList.contains('custom-focusable')) {
      focusedElement.blur();
    }
  }

  handleTabNavigation(event) {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  handleArrowNavigation(event) {
    const currentElement = document.activeElement;
    const parent = currentElement.closest('.nav-items, .projects-grid, .experience-item');
    
    if (!parent) return;

    const focusableElements = Array.from(parent.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));

    const currentIndex = focusableElements.indexOf(currentElement);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % focusableElements.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
        break;
    }

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      focusableElements[nextIndex].focus();
    }
  }
}

// Project Card Component
class ProjectCard {
  constructor(projectData, container) {
    this.projectData = projectData;
    this.container = container;
    this.isStarred = false;
    this.starCount = projectData.stars || 0;
    
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
    
    // Create media carousel
    const allMedia = [...(images || []), ...(videos || [])];
    
    // If no media, show a placeholder
    if (allMedia.length === 0) {
      allMedia.push('https://via.placeholder.com/400x200?text=No+Image');
    }
    
    const mediaItems = allMedia.map((media, index) => {
      // Check if it's a video by looking for video extensions or video-specific URLs
      const isVideo = media.includes('.mp4') || media.includes('.webm') || media.includes('.mov') || 
                     media.includes('youtube.com') || media.includes('youtu.be') || 
                     media.includes('vimeo.com') || media.includes('aliyuncs.com');
      
      if (isVideo) {
        return `
          <div class="project-image-item ${index === 0 ? 'active' : ''}" data-type="video">
            <video preload="metadata" muted playsinline>
              <source src="${media}" type="video/mp4">
              <p>您的浏览器不支持视频播放</p>
            </video>
            <div class="project-video-overlay">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="video-loading" style="display: none;">
              <div class="loading-spinner">
                <div class="spinner"></div>
              </div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="project-image-item ${index === 0 ? 'active' : ''}" data-type="image">
            <img src="${media}" alt="${title[currentLang]}" loading="lazy">
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
          <div class="project-stats">
            <div class="project-stars ${this.isStarred ? 'starred' : ''}" data-project-id="${this.projectData.id}">
              <span class="material-icons star-icon">star</span>
              <span class="star-count">${this.starCount}</span>
            </div>
          </div>
        </div>
        <p class="project-description">${description[currentLang]}</p>
        <div class="project-tech">
          ${tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${links.github ? `<a href="${links.github}" target="_blank" rel="noopener" class="project-link">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" class="project-link-icon">
            <span data-en="GitHub" data-zh="GitHub">GitHub</span>
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

  setupEventListeners() {
    const starButton = this.cardElement.querySelector('.project-stars');
    if (starButton) {
      starButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleStar();
      });
    }

    // Add hover effects
    this.cardElement.addEventListener('mouseenter', () => {
      this.cardElement.style.transform = 'translateY(-8px)';
    });

    this.cardElement.addEventListener('mouseleave', () => {
      this.cardElement.style.transform = 'translateY(0)';
    });

    // Setup image carousel
    this.setupImageCarousel();
    
    // Setup modal functionality
    this.setupModal();
  }

  setupImageCarousel() {
    const carousel = this.cardElement.querySelector('.project-image-carousel');
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
      carouselInterval = setInterval(nextItem, 3000); // 3 seconds
    };

    const stopCarousel = () => {
      clearInterval(carouselInterval);
    };

    // Start carousel
    startCarousel();

    // Pause on hover
    this.cardElement.addEventListener('mouseenter', stopCarousel);
    this.cardElement.addEventListener('mouseleave', startCarousel);

    // Click indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        showItem(currentIndex);
        stopCarousel();
        startCarousel();
      });
    });

    // Setup video play functionality
    const videoOverlays = this.cardElement.querySelectorAll('.project-video-overlay');
    videoOverlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
        const video = overlay.parentElement.querySelector('video');
        const loading = overlay.parentElement.querySelector('.video-loading');
        
        if (video) {
          // Show loading
          if (loading) loading.style.display = 'flex';
          
          // Add error handling
          video.addEventListener('error', (e) => {
            console.error('Video load error:', e);
            console.error('Video src:', video.src);
            if (loading) loading.style.display = 'none';
            alert('视频加载失败，请检查网络连接或视频链接');
          });
          
          video.addEventListener('canplay', () => {
            if (loading) loading.style.display = 'none';
          });
          
          video.addEventListener('loadstart', () => {
            console.log('Video loading started:', video.src);
          });
          
          video.play().catch(err => {
            console.error('Video play error:', err);
            if (loading) loading.style.display = 'none';
          });
          
          overlay.style.display = 'none';
        }
      });
    });
  }

  setupModal() {
    this.cardElement.addEventListener('click', (e) => {
      // Don't open modal if clicking on links or stars
      if (e.target.closest('.project-links') || e.target.closest('.project-stars')) {
        return;
      }
      
      this.openModal();
    });
  }

  openModal() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLinks = document.getElementById('modal-links');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const mediaIndicators = document.getElementById('media-indicators');
    
    const currentLang = window.portfolioApp?.currentLanguage || 'zh';
    const { title, description, images, videos, tech, links } = this.projectData;
    
    // Set modal content
    modalTitle.textContent = title[currentLang];
    modalDescription.textContent = description[currentLang];
    
    // Set tech tags
    modalTech.innerHTML = tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    
    // Set links
    modalLinks.innerHTML = '';
    if (links.github) {
      const githubLink = document.createElement('a');
      githubLink.href = links.github;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener';
      githubLink.className = 'modal-link';
      githubLink.innerHTML = `
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" class="modal-link-icon">
        <span data-en="GitHub" data-zh="GitHub">GitHub</span>
      `;
      modalLinks.appendChild(githubLink);
    }
    if (links.demo) {
      const demoLink = document.createElement('a');
      demoLink.href = links.demo;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener';
      demoLink.className = 'modal-link';
      demoLink.innerHTML = `
        <span class="material-icons">open_in_new</span>
        <span data-en="Demo" data-zh="演示">演示</span>
      `;
      modalLinks.appendChild(demoLink);
    }
    
    // Set media
    const allMedia = [...(images || []), ...(videos || [])];
    modalMediaContainer.innerHTML = '';
    mediaIndicators.innerHTML = '';
    
    allMedia.forEach((media, index) => {
      // Check if it's a video by looking for video extensions or video-specific URLs
      const isVideo = media.includes('.mp4') || media.includes('.webm') || media.includes('.mov') || 
                     media.includes('youtube.com') || media.includes('youtu.be') || 
                     media.includes('vimeo.com') || media.includes('aliyuncs.com');
      
      const mediaItem = document.createElement('div');
      mediaItem.className = `media-item ${index === 0 ? 'active' : ''}`;
      
      if (isVideo) {
        mediaItem.innerHTML = `
          <video controls>
            <source src="${media}" type="video/mp4">
          </video>
        `;
      } else {
        mediaItem.innerHTML = `<img src="${media}" alt="${title[currentLang]}">`;
      }
      
      modalMediaContainer.appendChild(mediaItem);
      
      // Create indicator
      const indicator = document.createElement('div');
      indicator.className = `media-indicator ${index === 0 ? 'active' : ''}`;
      indicator.dataset.index = index;
      mediaIndicators.appendChild(indicator);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Setup modal carousel
    this.setupModalCarousel();
  }

  setupModalCarousel() {
    const modal = document.getElementById('project-modal');
    const mediaItems = modal.querySelectorAll('.media-item');
    const indicators = modal.querySelectorAll('.media-indicator');
    const prevBtn = document.getElementById('media-prev');
    const nextBtn = document.getElementById('media-next');
    
    if (mediaItems.length <= 1) return;
    
    let currentIndex = 0;
    
    const showItem = (index) => {
      mediaItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    };
    
    const nextItem = () => {
      currentIndex = (currentIndex + 1) % mediaItems.length;
      showItem(currentIndex);
    };
    
    const prevItem = () => {
      currentIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
      showItem(currentIndex);
    };
    
    // Event listeners
    nextBtn.addEventListener('click', nextItem);
    prevBtn.addEventListener('click', prevItem);
    
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        showItem(currentIndex);
      });
    });
  }

  toggleStar() {
    this.isStarred = !this.isStarred;
    this.starCount += this.isStarred ? 1 : -1;
    
    const starButton = this.cardElement.querySelector('.project-stars');
    const starCount = this.cardElement.querySelector('.star-count');
    
    starButton.classList.toggle('starred', this.isStarred);
    starCount.textContent = this.starCount;

    // Track the action
    this.trackStarAction();
  }

  trackStarAction() {
    // Send analytics data
    if (typeof gtag !== 'undefined') {
      gtag('event', 'project_star', {
        'project_id': this.projectData.id,
        'action': this.isStarred ? 'star' : 'unstar',
        'timestamp': new Date().toISOString()
      });
    }

    // Send to backend
    fetch('/api/stars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: this.projectData.id,
        action: this.isStarred ? 'star' : 'unstar',
        timestamp: new Date().toISOString()
      })
    }).catch(error => {
      console.warn('Failed to track star action:', error);
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

// Experience Timeline Component
class ExperienceTimeline {
  constructor(experiences, container) {
    this.experiences = experiences;
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    
    this.experiences.forEach((exp, index) => {
      const experienceElement = this.createExperienceElement(exp, index);
      this.container.appendChild(experienceElement);
    });
  }

  createExperienceElement(experience, index) {
    const div = document.createElement('div');
    div.className = 'experience-item animate-slide-up';
    div.style.animationDelay = `${index * 0.1}s`;

    const currentLang = window.portfolioApp?.currentLanguage || 'zh';
    const title = experience.title[currentLang];
    const company = experience.company[currentLang];
    const period = experience.period[currentLang];
    const description = experience.description[currentLang];

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

  updateLanguage() {
    this.render();
  }
}

// Contact Form Component
class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.setupValidation();
    this.setupEventListeners();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(e);
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'message':
        if (!value) {
          isValid = false;
          errorMessage = window.portfolioApp?.currentLanguage === 'zh' 
            ? '请输入留言内容' 
            : 'Please enter your message';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = window.portfolioApp?.currentLanguage === 'zh' 
            ? '留言内容至少需要10个字符' 
            : 'Message must be at least 10 characters';
        }
        break;
      case 'name':
        if (value && value.length < 2) {
          isValid = false;
          errorMessage = window.portfolioApp?.currentLanguage === 'zh' 
            ? '姓名至少需要2个字符' 
            : 'Name must be at least 2 characters';
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    Object.assign(errorDiv.style, {
      color: '#EF4444',
      fontSize: '14px',
      marginTop: '4px',
      display: 'block'
    });
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
  }

  clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    field.classList.remove('error');
  }

  async handleSubmit(event) {
    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name') || 'Anonymous',
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      return;
    }

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.showSuccessMessage();
        this.form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.showErrorMessage();
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    const message = window.portfolioApp?.currentLanguage === 'zh' 
      ? '消息发送成功！' 
      : 'Message sent successfully!';
    
    if (window.portfolioApp) {
      window.portfolioApp.showNotification(message, 'success');
    }
  }

  showErrorMessage() {
    const message = window.portfolioApp?.currentLanguage === 'zh' 
      ? '发送失败，请稍后重试。' 
      : 'Failed to send message. Please try again later.';
    
    if (window.portfolioApp) {
      window.portfolioApp.showNotification(message, 'error');
    }
  }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.componentManager = new ComponentManager();
  
  // Initialize contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    window.contactForm = new ContactForm(contactForm);
  }
  
  // Setup modal close handlers
  setupModalCloseHandlers();
});

// Setup modal close handlers
function setupModalCloseHandlers() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  
  if (!modal || !closeBtn || !backdrop) return;
  
  // Close modal when clicking close button
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking backdrop
  backdrop.addEventListener('click', closeModal);
  
  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause all videos in modal
    const videos = modal.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ComponentManager,
    ProjectCard,
    ExperienceTimeline,
    ContactForm
  };
}
