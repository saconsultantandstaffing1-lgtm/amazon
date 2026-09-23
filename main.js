/**
 * ====================================================================
 * BLOCKBUSTER DEALS - MAIN JAVASCRIPT ENGINE
 * ====================================================================
 * Handles dynamic deal rendering, hero carousel, top picks scroll,
 * category filtering, instant live search, and pagination.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Load Base Configuration & Admin LocalStorage Overrides
  let baseConfig = window.AFFILIATE_CONFIG || {
    amazonTag: 'smartnest-20',
    heroBanners: [],
    products: []
  };

  function getMergedConfig() {
    try {
      const saved = localStorage.getItem('blockbuster_admin_data') || localStorage.getItem('smartnest_admin_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...baseConfig,
          amazonTag: parsed.amazonTag || baseConfig.amazonTag,
          siteName: parsed.siteName || baseConfig.siteName,
          tagline: parsed.tagline || baseConfig.tagline,
          products: (parsed.products && parsed.products.length) ? parsed.products : baseConfig.products
        };
      }
    } catch (e) {
      console.warn('Error reading admin storage data', e);
    }
    return baseConfig;
  }

  const config = getMergedConfig();

  // Async Cloud Sync with Supabase (Live updates for all website visitors)
  async function loadCloudData() {
    if (window.DealNestDB && window.DealNestDB.isConfigured()) {
      try {
        const [cloudDeals, cloudSettings] = await Promise.all([
          window.DealNestDB.fetchDeals(),
          window.DealNestDB.fetchSettings()
        ]);

        let hasUpdates = false;
        if (cloudSettings && cloudSettings.amazon_tag) {
          config.amazonTag = cloudSettings.amazon_tag;
          hasUpdates = true;
        }

        if (cloudDeals && cloudDeals.length > 0) {
          config.products = cloudDeals;
          hasUpdates = true;
        }

        if (hasUpdates) {
          if (typeof initTopPicksSlider === 'function') initTopPicksSlider();
          if (typeof renderDealsGrid === 'function') renderDealsGrid();
        }
      } catch (err) {
        console.warn('Supabase cloud fetch fallback to local config:', err);
      }
    }
  }
  // Trigger cloud sync
  loadCloudData();

  // State Management
  let currentCategory = 'all';
  let searchQuery = '';
  const DEALS_PER_PAGE = 9;
  let visibleCount = DEALS_PER_PAGE;

  // 2. Affiliate URL Generator
  function buildAffiliateUrl(rawUrl, searchKeyword = '') {
    const tag = config.amazonTag || 'smartnest-20';
    if (!rawUrl || rawUrl.startsWith('#')) {
      if (searchKeyword) {
        return `https://www.amazon.com/s?k=${encodeURIComponent(searchKeyword)}&tag=${encodeURIComponent(tag)}`;
      }
      return `https://www.amazon.com/?tag=${encodeURIComponent(tag)}`;
    }

    try {
      const urlObj = new URL(rawUrl);
      if (urlObj.hostname.includes('amazon.')) {
        urlObj.searchParams.set('tag', tag);
        return urlObj.toString();
      }
    } catch (e) {
      return rawUrl;
    }
    return rawUrl;
  }

  // 3. Card Badge Styling Helper (Mild Colors)
  function getBadgeClass(type) {
    if (!type) return 'badge-new';
    const lower = type.toLowerCase();
    if (lower.includes('hot') || lower.includes('%') || lower.includes('sale')) return 'badge-hot';
    if (lower.includes('pick') || lower.includes('choice') || lower.includes('deal')) return 'badge-deal';
    return 'badge-new';
  }

  // 4. Create Blockbuster Deal Card HTML
  function createDealCardHtml(item) {
    const affiliateUrl = buildAffiliateUrl(item.affiliateUrl, item.title);
    const badgeTypeClass = getBadgeClass(item.badgeType || item.badge);
    const badgeHtml = item.badge 
      ? `<span class="deal-card-badge ${badgeTypeClass}">${item.badge}</span>` 
      : '';
    
    const discountHtml = item.discount 
      ? `<span class="deal-discount-pill">${item.discount}</span>` 
      : '';

    const origPriceHtml = item.originalPrice 
      ? `<span class="deal-original-price">${item.originalPrice}</span>` 
      : '';

    const dealPrice = item.dealPrice || item.priceEst || '$19.99';
    const storeName = item.store || 'Amazon';

    return `
      <a href="${affiliateUrl}" target="_blank" rel="sponsored noopener nofollow" class="deal-card" data-id="${item.id}" data-category="${item.category}" aria-label="View deal for ${item.title}">
        <div class="deal-image-box">
          ${badgeHtml}
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="deal-details-box">
          <h3 class="deal-title" title="${item.title}">${item.title}</h3>
          <div class="deal-price-row">
            ${origPriceHtml}
            <span class="deal-active-price">${dealPrice}</span>
            ${discountHtml}
          </div>
          <div class="deal-meta-row">
            <span class="deal-store-name">${storeName}</span>
            <span class="deal-link-hint">Get Deal &rarr;</span>
          </div>
        </div>
      </a>
    `;
  }

  // 5. Render Hero Banners Carousel
  function initHeroCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    if (!track || !config.heroBanners || !config.heroBanners.length) return;

    track.innerHTML = config.heroBanners.map(b => {
      const perksHtml = (b.perks && b.perks.length)
        ? `<div class="slide-perks-row">${b.perks.map(p => `<span class="slide-perk-item">✓ ${p}</span>`).join('')}</div>`
        : '';
      const couponHtml = b.coupon
        ? `<span class="slide-coupon-pill" data-code="${b.coupon}" title="Click to copy coupon code">🎟️ Code: <strong>${b.coupon}</strong></span>`
        : '';
      const floatingTagHtml = b.floatingTag
        ? `<div class="slide-floating-tag">${b.floatingTag}</div>`
        : '';
      const showcaseHtml = (b.image && b.image2)
        ? `
          <div class="slide-visual-showcase" aria-hidden="true">
            ${floatingTagHtml}
            <div class="showcase-card primary">
              <img src="${b.image}" alt="Featured Item" loading="lazy">
            </div>
            <div class="showcase-card secondary">
              <img src="${b.image2}" alt="Deal Item" loading="lazy">
            </div>
          </div>
        `
        : '';

      return `
        <div class="carousel-slide" style="background: ${b.bgGradient || 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)'};">
          <div class="slide-content">
            <div class="slide-badge-row">
              <span class="slide-badge" style="color: ${b.accentColor || '#D97706'}">${b.badge || 'DEAL'}</span>
              ${couponHtml}
            </div>
            <h2 class="slide-title">${b.title}</h2>
            <p class="slide-subtitle">${b.subtitle}</p>
            ${perksHtml}
            <div class="slide-action-row">
              <a href="${buildAffiliateUrl(b.url, b.title)}" target="_blank" rel="sponsored noopener nofollow" class="slide-btn">
                ${b.ctaText || 'Shop Deal'} &rarr;
              </a>
            </div>
          </div>
          ${showcaseHtml}
        </div>
      `;
    }).join('');

    // Wire coupon copy clicks
    track.querySelectorAll('.slide-coupon-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const code = pill.dataset.code;
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            const originalText = pill.innerHTML;
            pill.innerHTML = `✅ Copied <strong>${code}</strong>!`;
            setTimeout(() => { pill.innerHTML = originalText; }, 2000);
          }).catch(() => {});
        }
      });
    });

    if (dotsWrap) {
      dotsWrap.innerHTML = config.heroBanners.map((_, i) => `
        <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
      `).join('');
    }

    let currentSlide = 0;
    const totalSlides = config.heroBanners.length;

    function goToSlide(idx) {
      currentSlide = (idx + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('active', i === currentSlide);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    if (dotsWrap) {
      dotsWrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
          goToSlide(parseInt(e.target.dataset.index, 10));
        }
      });
    }

    // Auto-advance carousel every 6 seconds
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  // 6. Render Top Picks Carousel
  function initTopPicks() {
    const track = document.getElementById('topPicksTrack');
    const scrollLeftBtn = document.getElementById('topPicksScrollLeft');
    const scrollRightBtn = document.getElementById('topPicksScrollRight');
    const slider = document.getElementById('topPicksSlider');
    if (!track) return;

    const topPickItems = config.products.filter(p => p.isTopPick);
    const itemsToRender = topPickItems.length ? topPickItems : config.products.slice(0, 6);

    track.innerHTML = itemsToRender.map(createDealCardHtml).join('');

    if (scrollLeftBtn && slider) {
      scrollLeftBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }
    if (scrollRightBtn && slider) {
      scrollRightBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
  }

  // 7. Get Filtered Deals List
  function getFilteredProducts() {
    return config.products.filter(p => {
      const matchCat = (currentCategory === 'all') || (p.category === currentCategory);
      if (!matchCat) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = (p.title || '').toLowerCase().includes(q);
      const storeMatch = (p.store || '').toLowerCase().includes(q);
      const catMatch = (p.category || '').toLowerCase().includes(q);
      return titleMatch || storeMatch || catMatch;
    });
  }

  // 8. Render Main Deals Grid
  function renderDealsGrid() {
    const grid = document.getElementById('dealsGrid');
    const noDeals = document.getElementById('noDealsState');
    const loadMoreWrap = document.getElementById('loadMoreWrap');
    const countInfo = document.getElementById('dealsCountInfo');
    const searchStatus = document.getElementById('searchStatusBar');
    const searchResultText = document.getElementById('searchResultText');
    if (!grid) return;

    // Search status alert
    if (searchStatus && searchResultText) {
      if (searchQuery.trim().length > 0) {
        searchStatus.style.display = 'flex';
        searchResultText.innerHTML = `Showing results for "<strong>${escapeHtml(searchQuery)}</strong>"`;
      } else {
        searchStatus.style.display = 'none';
      }
    }

    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noDeals) noDeals.style.display = 'block';
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      return;
    }

    if (noDeals) noDeals.style.display = 'none';

    const visibleItems = filtered.slice(0, visibleCount);
    grid.innerHTML = visibleItems.map(createDealCardHtml).join('');

    // Pagination status
    if (loadMoreWrap && countInfo) {
      countInfo.textContent = `Showing ${visibleItems.length} of ${filtered.length} deals`;
      if (visibleItems.length >= filtered.length) {
        loadMoreWrap.querySelector('.btn-load-more').style.display = 'none';
      } else {
        loadMoreWrap.querySelector('.btn-load-more').style.display = 'inline-flex';
        loadMoreWrap.style.display = 'flex';
      }
    }
  }

  // Helper escape
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // 9. Category Selection Sync (Nav menu + Filter pills)
  function setCategory(catId) {
    currentCategory = catId;
    visibleCount = DEALS_PER_PAGE;

    // Update filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      const isMatch = pill.dataset.filter === catId;
      pill.classList.toggle('active', isMatch);
      pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Update desktop nav
    document.querySelectorAll('.nav-menu-list .nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
      const isMatch = link && link.dataset.cat === catId;
      item.classList.toggle('active', isMatch);
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.cat === catId);
    });

    renderDealsGrid();

    // Scroll smoothly to filter section
    const filterSection = document.getElementById('filterSection');
    if (filterSection && window.scrollY > 400) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Filter Pill Click Handlers
  const filterPillsContainer = document.getElementById('categoryFilterPills');
  if (filterPillsContainer) {
    filterPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (pill && pill.dataset.filter) {
        setCategory(pill.dataset.filter);
      }
    });
  }

  // Desktop Nav Links
  document.querySelectorAll('.nav-menu-list .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      if (cat) setCategory(cat);
    });
  });

  // Mobile Nav Links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      if (cat) setCategory(cat);
      closeMobileDrawer();
    });
  });

  // 10. Search Logic
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const resetSearchBtn = document.getElementById('resetSearchBtn');
  const clearFilterBtn = document.getElementById('clearFilterBtn');

  function handleSearch(val) {
    searchQuery = val.trim();
    visibleCount = DEALS_PER_PAGE;
    if (searchClearBtn) {
      searchClearBtn.style.display = searchQuery ? 'block' : 'none';
    }
    renderDealsGrid();
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (mobileSearchInput) mobileSearchInput.value = e.target.value;
      handleSearch(e.target.value);
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      if (searchInput) searchInput.value = e.target.value;
      handleSearch(e.target.value);
    });
  }

  function clearSearch() {
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
    handleSearch('');
  }

  if (searchClearBtn) searchClearBtn.addEventListener('click', clearSearch);
  if (resetSearchBtn) resetSearchBtn.addEventListener('click', clearSearch);
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', () => {
      clearSearch();
      setCategory('all');
    });
  }

  // 11. Load More Deals Button Handler
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreSpinner = document.getElementById('loadMoreSpinner');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      if (loadMoreSpinner) loadMoreSpinner.style.display = 'inline-block';
      loadMoreBtn.disabled = true;

      setTimeout(() => {
        visibleCount += 6;
        renderDealsGrid();
        if (loadMoreSpinner) loadMoreSpinner.style.display = 'none';
        loadMoreBtn.disabled = false;
      }, 250);
    });
  }

  // 12. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function toggleMobileDrawer() {
    if (!mobileDrawer) return;
    const isOpen = mobileDrawer.classList.toggle('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const openIcon = mobileMenuBtn.querySelector('.menu-open-icon');
      const closeIcon = mobileMenuBtn.querySelector('.menu-close-icon');
      if (openIcon) openIcon.style.display = isOpen ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const openIcon = mobileMenuBtn.querySelector('.menu-open-icon');
      const closeIcon = mobileMenuBtn.querySelector('.menu-close-icon');
      if (openIcon) openIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileDrawer);
  }

  // 13. Initialize All Sections
  initHeroCarousel();
  initTopPicks();
  renderDealsGrid();
});
