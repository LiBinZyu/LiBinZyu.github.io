const root = document.documentElement;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const viewButtons = [...document.querySelectorAll('[data-view]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const themeSelect = document.querySelector('#theme-select');

function savePreference(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Embedded and private browsers may block storage.
  }
}

themeSelect.value = root.dataset.theme ?? 'system';
themeSelect.addEventListener('change', () => {
  applyPortfolioTheme(themeSelect.value);
  savePreference('portfolio-theme', themeSelect.value === 'system' ? null : themeSelect.value);
});
window.addEventListener('storage', event => {
  if (event.key !== 'portfolio-theme' && event.key !== null) return;
  applyPortfolioTheme(event.newValue);
  themeSelect.value = root.dataset.theme ?? 'system';
});

function setView(view) {
  root.dataset.projectView = view;
  for (const button of viewButtons) button.setAttribute('aria-pressed', button.dataset.view === view);
}

setView(root.dataset.projectView ?? 'grid');
for (const button of viewButtons) {
  button.addEventListener('click', () => {
    setView(button.dataset.view);
    savePreference('portfolio-view-mode', button.dataset.view);
  });
}

function setFilter(category) {
  for (const button of filterButtons) {
    button.setAttribute('aria-pressed', button.dataset.filter === category);
  }
  for (const card of cards) {
    card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
  }
}

for (const button of filterButtons) {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
}

const galleryStates = new Map();
for (const gallery of document.querySelectorAll('[data-gallery]')) {
  const viewport = gallery.querySelector('.project-cover');
  const frame = gallery.querySelector('.media-frame');
  const startsWithImage = frame.hasAttribute('data-slide');
  const slides = [...gallery.querySelectorAll('template[data-slide]')];
  if (startsWithImage) slides.unshift(frame.firstElementChild);

  const autoplayButton = gallery.querySelector('[data-autoplay]');
  const indicators = [...gallery.querySelectorAll('[data-slide-index]')];
  let index = startsWithImage ? 0 : -1;
  let visible = false;
  let playOverride;
  let timer;
  let video;
  const shouldPlay = () => playOverride ?? !motion.matches;
  const card = gallery.closest('.project-card');
  const isInView = () => visible && !document.hidden && !card.hidden;

  function selectSlide(next) {
    video?.pause();
    index = (next + slides.length) % slides.length;
    const slide = slides[index];
    frame.replaceChildren(slide instanceof HTMLTemplateElement ? slide.content.cloneNode(true) : slide);
    video = frame.querySelector('video');
    indicators.forEach((button, i) => button.setAttribute('aria-pressed', i === index));
    if (video) {
      const clip = video;
      const fallback = frame.querySelector('.video-fallback');
      video.muted = true;
      clip.addEventListener('ended', () => {
        if (clip === video && slides.length > 1 && shouldPlay() && isInView()) {
          selectSlide(index + 1);
          sync();
        }
      });
      clip.addEventListener('error', () => { fallback.hidden = false; });
    }
  }

  function sync() {
    clearTimeout(timer);
    if (!isInView()) {
      video?.pause();
      return;
    }

    if (index < 0) selectSlide(0);
    if (!shouldPlay()) {
      if (video) video.controls = true;
      return;
    }
    if (video?.ended && slides.length > 1) selectSlide(index + 1);

    if (video) {
      const clip = video;
      clip.controls = false;
      if (clip.paused) {
        clip.play().catch(error => {
          if (clip === video && isInView() && error.name === 'NotAllowedError') clip.controls = true;
        });
      }
    } else if (slides.length > 1) {
      timer = setTimeout(() => {
        if (!isInView()) return;
        selectSlide(index + 1);
        sync();
      }, 4500);
    }
  }

  function updateAutoplay() {
    autoplayButton?.setAttribute('aria-pressed', shouldPlay());
    if (!shouldPlay()) video?.pause();
    sync();
  }

  for (const button of indicators) {
    button.addEventListener('click', () => {
      selectSlide(Number(button.dataset.slideIndex));
      sync();
    });
  }
  autoplayButton?.addEventListener('click', () => {
    playOverride = !shouldPlay();
    updateAutoplay();
  });
  updateAutoplay();

  galleryStates.set(viewport, {
    sync,
    updateAutoplay,
    onVisibility(nextVisible) {
      if (nextVisible === visible) return;
      visible = nextVisible;
      sync();
    }
  });
}

function trackMediaQuery(query, callback) {
  if (query.addEventListener) query.addEventListener('change', callback);
  else query.addListener(callback);
}

const hasIntersectionObserver = 'IntersectionObserver' in window;
if (hasIntersectionObserver) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      galleryStates.get(entry.target).onVisibility(entry.isIntersecting && entry.intersectionRatio >= 0.5);
    }
  }, { threshold: 0.5 });
  for (const viewport of galleryStates.keys()) observer.observe(viewport);
}

document.addEventListener('visibilitychange', () => {
  for (const gallery of galleryStates.values()) gallery.sync();
});
trackMediaQuery(motion, () => {
  for (const gallery of galleryStates.values()) gallery.updateAutoplay();
});

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map(link => document.getElementById(link.hash.slice(1)));
const siteNav = document.querySelector('.site-nav');
let activeSection;
let scrollFrame;

function updateNavigation() {
  scrollFrame = null;
  const navBottom = siteNav.getBoundingClientRect().bottom + 36;
  const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
  const firstBelowNav = sections.findIndex(section => section.getBoundingClientRect().top > navBottom);
  const active = atBottom || firstBelowNav < 0 ? sections.length - 1 : Math.max(0, firstBelowNav - 1);
  if (active === activeSection) return;
  navLinks[activeSection]?.removeAttribute('aria-current');
  navLinks[active].setAttribute('aria-current', 'location');
  activeSection = active;
}

function updateViewport() {
  if (!hasIntersectionObserver) {
    for (const [target, gallery] of galleryStates) {
      const { top, bottom, height } = target.getBoundingClientRect();
      const overlap = Math.min(window.innerHeight, bottom) - Math.max(0, top);
      gallery.onVisibility(height > 0 && overlap >= height / 2);
    }
  }
  updateNavigation();
}

function scheduleNavigation() {
  scrollFrame ??= requestAnimationFrame(updateViewport);
}

window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
scheduleNavigation();

const languageLink = document.querySelector('#language-link');
const languageHref = languageLink.getAttribute('href');
function setLanguageLink() {
  languageLink.href = languageHref + location.hash;
}
window.addEventListener('hashchange', setLanguageLink);
languageLink.addEventListener('click', setLanguageLink);
setLanguageLink();

if (navigator.clipboard?.writeText) {
  const status = document.querySelector('#copy-status');
  for (const row of document.querySelectorAll('[data-copy]')) {
    async function copy() {
      try {
        await navigator.clipboard.writeText(row.dataset.copy);
        status.textContent = `${status.dataset.success} · ${row.dataset.copy}`;
      } catch {
        status.textContent = status.dataset.error;
      }
    }

    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    row.addEventListener('click', copy);
    row.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      copy();
    });
  }
}

root.classList.add('enhanced');

const backdrop = document.querySelector('#vanta-birds');
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const forcedColors = matchMedia('(forced-colors: active)');
const birdPalettes = {
  light: { color1: 0x3d52d5, color2: 0x6b28c8, speedLimit: 5 },
  dark: { color1: 0x372b6e, color2: 0x142455, speedLimit: 4 }
};
let birdAssets;
let birds;
let birdTheme;

function loadBackdropScript(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = backdrop.dataset.assetRoot + file;
    script.fetchPriority = 'low';
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

function clearBirds() {
  if (!birds) return;
  const renderer = birds.renderer;
  birds.destroy();
  renderer?.dispose();
  birds = null;
}

const skipBirds = () => motion.matches || forcedColors.matches || navigator.connection?.saveData;
async function updateBirds() {
  if (skipBirds()) {
    clearBirds();
    return;
  }
  if (document.hidden) return;

  try {
    birdAssets ??= loadBackdropScript('three-r134.min.js')
      .then(() => loadBackdropScript('vanta-birds-0.5.24.min.js'));
    await birdAssets;
    if (skipBirds() || document.hidden) return;
    const theme = root.dataset.theme ?? (systemDark.matches ? 'dark' : 'light');
    if (birds && birdTheme === theme) return;

    clearBirds();
    // Keep the background compositing cost bounded on high-density displays.
    const backdropScale = Math.max(1, window.devicePixelRatio / 1.5);
    birds = window.VANTA.BIRDS({
      el: backdrop,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: backdropScale,
      scaleMobile: backdropScale,
      backgroundAlpha: 0,
      ...birdPalettes[theme]
    });
    birdTheme = theme;
  } catch {
    backdrop.style.background = 'transparent';
  }
}

function startBirds() {
  if ('requestIdleCallback' in window) requestIdleCallback(updateBirds, { timeout: 1500 });
  else setTimeout(updateBirds, 0);
  new MutationObserver(updateBirds).observe(root, { attributeFilter: ['data-theme'] });
  trackMediaQuery(systemDark, updateBirds);
  trackMediaQuery(forcedColors, updateBirds);
  trackMediaQuery(motion, updateBirds);
  document.addEventListener('visibilitychange', updateBirds);
}

if (document.readyState === 'complete') startBirds();
else window.addEventListener('load', startBirds, { once: true });
