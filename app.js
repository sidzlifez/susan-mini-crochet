let storeData = null;
let cart = JSON.parse(localStorage.getItem('susanCrochetCart')) || [];
let activeCategory = 'All';
let appliedPromo = JSON.parse(localStorage.getItem('susanCrochetPromo')) || null;
let productActiveImageIndex = {};

// Customer Login, Local Order History & Product Ratings State
let loggedInCustomer = JSON.parse(localStorage.getItem('susanCrochetCustomer')) || null;
let localCustomerOrders = JSON.parse(localStorage.getItem('susanCrochetLocalOrders')) || [];
let localProductRatings = JSON.parse(localStorage.getItem('susanCrochetRatings')) || {};
let currentRatingProductId = null;
let selectedStarValue = 5;

async function initStore() {
  try {
    const response = await fetch('data/store.json');
    if (!response.ok) throw new Error('HTTP error ' + response.status);
    storeData = await response.json();
  } catch (err) {
    console.error('Error loading store.json data:', err);
    return;
  }

  injectNavbarAccountButton();
  applyStoreSettings();
  renderCatalogAndFilters();
  renderTestimonials();
  renderAboutPage();
  renderContactAndFaqPage();
  updateCartUI();
  prefillCheckoutFromCustomer();
}

function normalizePhone(phoneStr) {
  if (!phoneStr) return '';
  const digits = String(phoneStr).replace(/\D/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

/* 1. Customer Login & Order Tracking Portal */
function injectNavbarAccountButton() {
  const navbar = document.querySelector('.navbar');
  const cartBtn = document.querySelector('.cart-btn');
  if (!navbar || !cartBtn || document.getElementById('nav-account-btn')) return;

  let actionsWrap = document.querySelector('.nav-actions-wrap');
  if (!actionsWrap) {
    actionsWrap = document.createElement('div');
    actionsWrap.className = 'nav-actions-wrap';
    cartBtn.parentNode.insertBefore(actionsWrap, cartBtn);
    actionsWrap.appendChild(cartBtn);
  }

  const accountBtn = document.createElement('button');
  accountBtn.id = 'nav-account-btn';
  accountBtn.className = 'account-btn';
  accountBtn.type = 'button';
  accountBtn.onclick = () => openAccountModal();
  actionsWrap.insertBefore(accountBtn, cartBtn);

  updateAccountButtonText();
}

function updateAccountButtonText() {
  const accountBtn = document.getElementById('nav-account-btn');
  if (!accountBtn) return;
  if (loggedInCustomer && loggedInCustomer.name) {
    const firstName = loggedInCustomer.name.split(' ')[0];
    accountBtn.innerHTML = `👤 <span>${firstName}</span>`;
  } else {
    accountBtn.innerHTML = `👤 <span>My Orders</span>`;
  }
}

function prefillCheckoutFromCustomer() {
  if (!loggedInCustomer) return;
  const nameEl = document.getElementById('cust-name');
  const phoneEl = document.getElementById('cust-phone');
  const addrEl = document.getElementById('cust-address');

  if (nameEl && !nameEl.value && loggedInCustomer.name) nameEl.value = loggedInCustomer.name;
  if (phoneEl && !phoneEl.value && loggedInCustomer.phone) phoneEl.value = loggedInCustomer.phone;
  if (addrEl && !addrEl.value && loggedInCustomer.address) addrEl.value = loggedInCustomer.address;
}

function ensureAccountModal() {
  let modal = document.getElementById('account-modal-overlay');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'account-modal-overlay';
  modal.className = 'custom-modal-overlay';
  modal.innerHTML = `
    <div class="custom-modal-card">
      <div class="custom-modal-header">
        <h3 id="account-modal-title">👤 Customer Login & Order Tracker</h3>
        <button type="button" class="close-cart" onclick="closeAccountModal()">×</button>
      </div>
      <div class="custom-modal-body" id="account-modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function openAccountModal() {
  const modal = ensureAccountModal();
  renderAccountModalContent();
  modal.classList.add('open');
}

function closeAccountModal() {
  const modal = document.getElementById('account-modal-overlay');
  if (modal) modal.classList.remove('open');
}

function handleCustomerLogin(event) {
  event.preventDefault();
  const nameInput = document.getElementById('login-cust-name');
  const phoneInput = document.getElementById('login-cust-phone');

  const name = nameInput ? nameInput.value.trim() : '';
  const cleanPhone = normalizePhone(phoneInput ? phoneInput.value : '');

  if (!name || cleanPhone.length < 10) {
    alert('Please enter your Name and a valid 10-digit Mobile Number.');
    return;
  }

  loggedInCustomer = {
    name,
    phone: cleanPhone,
    address: loggedInCustomer?.address || ''
  };
  localStorage.setItem('susanCrochetCustomer', JSON.stringify(loggedInCustomer));
  updateAccountButtonText();
  prefillCheckoutFromCustomer();
  renderAccountModalContent();
}

function handleCustomerLogout() {
  loggedInCustomer = null;
  localStorage.removeItem('susanCrochetCustomer');
  updateAccountButtonText();
  renderAccountModalContent();
}

function getOrderStepIndex(statusText) {
  const s = (statusText || '').toLowerCase();
  if (s.includes('delivered')) return 4;
  if (s.includes('shipped')) return 3;
  if (s.includes('packed') || s.includes('ready')) return 2;
  if (s.includes('crochet') || s.includes('progress')) return 1;
  return 0;
}

function renderOrderCardHTML(order, currency) {
  const stepIdx = getOrderStepIndex(order.status);
  const steps = ['Confirmed', 'Crocheting', 'Packed', 'Shipped', 'Delivered'];
  const progressHTML = steps
    .map((label, idx) => `<span class="order-step-pill ${idx <= stepIdx ? 'done' : ''}">${label}</span>`)
    .join('');

  return `
    <div class="customer-order-card">
      <div class="customer-order-top">
        <div>
          <strong>Order #${order.orderId}</strong>
          <span class="order-date-text">${order.orderDate || ''}</span>
        </div>
        <span class="order-status-badge">${order.status || 'Order Sent on WhatsApp'}</span>
      </div>
      <p class="order-items-text">${order.itemsSummary || ''}</p>
      <div class="order-steps-row">${progressHTML}</div>
      ${
        order.trackingNote
          ? `<p class="order-tracking-note">🚚 <strong>Tracking:</strong> ${order.trackingNote}</p>`
          : ''
      }
      <div class="customer-order-bottom">
        <span>Total: <strong>${currency}${order.totalAmount || 0}</strong> (${order.paymentStatus || 'WhatsApp Checkout'})</span>
        ${
          order.trackingUrl
            ? `<a href="${order.trackingUrl}" target="_blank" rel="noopener" class="social-pill">Track Parcel ↗</a>`
            : ''
        }
      </div>
    </div>
  `;
}

function renderAccountModalContent(searchOrderIdQuery = '') {
  const bodyEl = document.getElementById('account-modal-body');
  if (!bodyEl) return;
  const currency = storeData?.settings?.currency || '₹';

  if (!loggedInCustomer) {
    bodyEl.innerHTML = `
      <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 14px;">
        Log in with your mobile number used during checkout to track your live crochet order status and view past orders.
      </p>
      <form onsubmit="handleCustomerLogin(event)" class="checkout-form" style="margin-top:0;">
        <div class="form-group">
          <label>Your Name *</label>
          <input type="text" id="login-cust-name" required placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label>10-Digit Mobile / WhatsApp Number *</label>
          <input type="tel" id="login-cust-phone" required placeholder="e.g. 9876543210" />
        </div>
        <button type="submit" class="btn-primary" style="width:100%;">Login & View My Orders</button>
      </form>
    `;
    return;
  }

  const customerPhone = normalizePhone(loggedInCustomer.phone);
  const adminOrders = Array.isArray(storeData?.orders) ? storeData.orders : [];

  // Combine admin orders for this customer + local device orders (avoiding duplicate orderIds)
  const matchedAdminOrders = adminOrders.filter(
    o =>
      normalizePhone(o.phone) === customerPhone ||
      (searchOrderIdQuery &&
        o.orderId &&
        o.orderId.toLowerCase() === searchOrderIdQuery.toLowerCase())
  );

  const adminOrderIds = new Set(matchedAdminOrders.map(o => String(o.orderId).toUpperCase()));
  const matchedLocalOrders = localCustomerOrders.filter(
    o =>
      normalizePhone(o.phone) === customerPhone &&
      !adminOrderIds.has(String(o.orderId).toUpperCase())
  );

  const allCustomerOrders = [...matchedAdminOrders, ...matchedLocalOrders];

  const ordersHTML =
    allCustomerOrders.length > 0
      ? allCustomerOrders.map(o => renderOrderCardHTML(o, currency)).join('')
      : `<div class="empty-orders-box">
          <p>No orders found for <strong>${loggedInCustomer.phone}</strong> yet 🧶</p>
          <p style="font-size:0.82rem; margin-top:4px;">When you place an order on WhatsApp or look up an Order ID below, it will appear right here!</p>
        </div>`;

  bodyEl.innerHTML = `
    <div class="customer-profile-bar">
      <div>
        <strong>Hi, ${loggedInCustomer.name}! 💖</strong>
        <span style="display:block; font-size:0.82rem; color:var(--text-muted);">Logged in: +91 ${loggedInCustomer.phone}</span>
      </div>
      <button type="button" class="remove-promo" onclick="handleCustomerLogout()">Logout</button>
    </div>

    <div class="order-lookup-bar">
      <input type="text" id="order-id-lookup-input" placeholder="Have an Order ID? (e.g. SMC-4821)" value="${searchOrderIdQuery}" />
      <button type="button" class="promo-btn" onclick="lookupOrderById()">Find Order</button>
    </div>

    <h4 style="margin: 14px 0 10px; font-size: 0.98rem;">📦 Your Crochet Orders (${allCustomerOrders.length})</h4>
    <div class="customer-orders-list">
      ${ordersHTML}
    </div>
  `;
}

function lookupOrderById() {
  const input = document.getElementById('order-id-lookup-input');
  const query = input ? input.value.trim().replace(/^#/, '') : '';
  renderAccountModalContent(query);
}

/* 2. Product Star Rating & Review System */
function getProductRatingStats(product) {
  const baseRating = Number(product.rating) > 0 ? Number(product.rating) : 5.0;
  const baseCount =
    typeof product.reviewCount === 'number' && product.reviewCount >= 0 ? product.reviewCount : 1;

  const userReviews = Array.isArray(localProductRatings[product.id])
    ? localProductRatings[product.id]
    : [];

  const totalCount = baseCount + userReviews.length;
  if (totalCount === 0) {
    return { avg: '5.0', count: 0, stars: '★★★★★' };
  }

  const userSum = userReviews.reduce((sum, r) => sum + Number(r.stars || 5), 0);
  const combinedAvg = (baseRating * baseCount + userSum) / totalCount;
  const roundedAvg = Math.min(5, Math.max(1, combinedAvg)).toFixed(1);
  const fullStars = Math.round(Number(roundedAvg));
  const starsVisual = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

  return { avg: roundedAvg, count: totalCount, stars: starsVisual, userReviews };
}

function ensureRatingModal() {
  let modal = document.getElementById('rating-modal-overlay');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'rating-modal-overlay';
  modal.className = 'custom-modal-overlay';
  modal.innerHTML = `
    <div class="custom-modal-card" style="max-width: 420px;">
      <div class="custom-modal-header">
        <h3 id="rating-modal-title">⭐ Rate This Crochet Item</h3>
        <button type="button" class="close-cart" onclick="closeRatingModal()">×</button>
      </div>
      <div class="custom-modal-body" id="rating-modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function openRatingModal(productId) {
  const product = storeData?.products?.find(p => p.id === productId);
  if (!product) return;

  currentRatingProductId = productId;
  selectedStarValue = 5;

  const modal = ensureRatingModal();
  renderRatingModalBody(product);
  modal.classList.add('open');
}

function closeRatingModal() {
  const modal = document.getElementById('rating-modal-overlay');
  if (modal) modal.classList.remove('open');
}

function selectStarRating(stars) {
  selectedStarValue = stars;
  const starBtns = document.querySelectorAll('.interactive-star-btn');
  starBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx < stars);
  });
}

function renderRatingModalBody(product) {
  const bodyEl = document.getElementById('rating-modal-body');
  if (!bodyEl) return;

  const defaultName = loggedInCustomer?.name || '';
  const stats = getProductRatingStats(product);
  const recentLocalReviews = (stats.userReviews || []).slice(-3).reverse();

  const reviewsListHTML =
    recentLocalReviews.length > 0
      ? `<div style="margin-top: 14px; border-top: 1px dashed var(--border-soft); padding-top: 10px;">
          <strong style="font-size: 0.85rem;">Recent Customer Ratings:</strong>
          ${recentLocalReviews
            .map(
              r => `
              <div class="mini-review-item">
                <span><strong>${r.name}</strong> <span style="color:#F59E0B;">${'★'.repeat(r.stars)}</span></span>
                ${r.comment ? `<p>${r.comment}</p>` : ''}
              </div>
            `
            )
            .join('')}
        </div>`
      : '';

  bodyEl.innerHTML = `
    <p style="font-weight:700; margin-bottom: 8px;">${product.name}</p>
    <form onsubmit="submitProductRating(event)">
      <div class="star-picker-row">
        ${[1, 2, 3, 4, 5]
          .map(
            num => `
          <button type="button" class="interactive-star-btn active" onclick="selectStarRating(${num})">★</button>
        `
          )
          .join('')}
      </div>
      <div class="form-group">
        <label>Your Name *</label>
        <input type="text" id="rating-cust-name" required value="${defaultName}" placeholder="Enter your name" />
      </div>
      <div class="form-group">
        <label>Short Review (Optional)</label>
        <textarea id="rating-cust-comment" rows="2" placeholder="Loved the pastel yarn and neat stitching!"></textarea>
      </div>
      <button type="submit" class="btn-primary" style="width:100%;">Submit Rating ⭐</button>
    </form>
    ${reviewsListHTML}
  `;
}

function submitProductRating(event) {
  event.preventDefault();
  if (!currentRatingProductId) return;

  const product = storeData?.products?.find(p => p.id === currentRatingProductId);
  const name = document.getElementById('rating-cust-name')?.value.trim() || 'Customer';
  const comment = document.getElementById('rating-cust-comment')?.value.trim() || '';

  if (!Array.isArray(localProductRatings[currentRatingProductId])) {
    localProductRatings[currentRatingProductId] = [];
  }

  localProductRatings[currentRatingProductId].push({
    name,
    stars: selectedStarValue,
    comment,
    date: new Date().toLocaleDateString('en-IN')
  });

  localStorage.setItem('susanCrochetRatings', JSON.stringify(localProductRatings));
  filterProducts();

  const bodyEl = document.getElementById('rating-modal-body');
  const whatsappNumber = storeData?.settings?.whatsappNumber || '919876543210';
  const shareText = encodeURIComponent(
    `⭐ *New Product Rating - ${storeData?.settings?.storeName || 'Susan-mini-crochet'}*\n\n*Product:* ${
      product ? product.name : currentRatingProductId
    }\n*Rating:* ${'⭐'.repeat(selectedStarValue)} (${selectedStarValue}/5)\n*Customer:* ${name}${
      comment ? `\n*Review:* ${comment}` : ''
    }`
  );

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="text-align:center; padding: 12px 0;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">💖</div>
        <h4>Thank you for your ${selectedStarValue}-star rating, ${name}!</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin: 8px 0 16px;">
          Your rating has been added to <strong>${product ? product.name : 'this item'}</strong>.
        </p>
        <a href="https://wa.me/${whatsappNumber}?text=${shareText}" target="_blank" rel="noopener" class="btn-primary" style="display:inline-block; width:100%; margin-bottom: 8px;">
          💬 Send Review to Susan on WhatsApp
        </a>
        <button type="button" class="social-pill" onclick="closeRatingModal()" style="width:100%; justify-content:center;">
          Continue Shopping
        </button>
      </div>
    `;
  }
}

/* 3. Store Settings, Catalog & Checkout Functions */
function applyStoreSettings() {
  if (!storeData || !storeData.settings) return;
  const { announcement, storeName, logo, enableCOD, socialLinks, whatsappNumber } = storeData.settings;

  const announcementEl = document.getElementById('announcement-bar');
  if (announcementEl && announcement) {
    announcementEl.textContent = announcement;
  }

  const brandLogoLinks = document.querySelectorAll('.brand-logo');
  brandLogoLinks.forEach(link => {
    if (logo && logo.trim() !== '') {
      link.innerHTML = `<img src="${logo}" alt="${storeName || 'Susan-mini-crochet'} Logo" class="brand-logo-img" /> <span class="store-name-text">${storeName || 'Susan-mini-crochet'}</span>`;
    } else {
      const nameSpan = link.querySelector('.store-name-text');
      if (nameSpan && storeName) {
        nameSpan.textContent = storeName;
      }
    }
  });

  if (logo && logo.trim() !== '') {
    let favicon = document.querySelector("link[rel~='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = logo;
  }

  const codOption = document.getElementById('cod-option-wrap');
  if (codOption && enableCOD === false) {
    codOption.style.display = 'none';
  }

  const socialContainers = document.querySelectorAll('.social-links-container');
  if (socialLinks && socialContainers.length > 0) {
    let socialHTML = '';
    if (socialLinks.instagram) {
      socialHTML += `<a href="${socialLinks.instagram}" target="_blank" rel="noopener" class="social-pill">📸 Instagram</a>`;
    }
    if (socialLinks.facebook) {
      socialHTML += `<a href="${socialLinks.facebook}" target="_blank" rel="noopener" class="social-pill">📘 Facebook</a>`;
    }
    if (socialLinks.youtube) {
      socialHTML += `<a href="${socialLinks.youtube}" target="_blank" rel="noopener" class="social-pill">▶️ YouTube</a>`;
    }
    socialContainers.forEach(container => {
      container.innerHTML = socialHTML;
    });
  }

  renderFloatingWhatsApp(whatsappNumber, storeName);
  injectUpiQrContainer();
}

function injectUpiQrContainer() {
  const paymentOptionsEl = document.querySelector('.payment-options');
  if (!paymentOptionsEl) return;

  const customQr = storeData?.settings?.upiQrImage;
  const qrImageSrc =
    customQr && customQr.trim() !== ''
      ? customQr
      : 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=susanminicrochet@upi';

  let qrBox = document.getElementById('upi-qr-box');
  if (!qrBox) {
    qrBox = document.createElement('div');
    qrBox.id = 'upi-qr-box';
    qrBox.className = 'upi-qr-container';
    paymentOptionsEl.parentNode.insertBefore(qrBox, paymentOptionsEl.nextSibling);

    const radios = document.querySelectorAll('input[name="payment-method"]');
    radios.forEach(radio => {
      radio.addEventListener('change', handlePaymentMethodChange);
    });
  }

  qrBox.innerHTML = `
    <p><strong>Scan & Pay via GPay / PhonePe / Paytm</strong></p>
    <img src="${qrImageSrc}" alt="UPI QR Code" id="dynamic-upi-qr" />
    <p>Scan with any UPI app and share screenshot on WhatsApp after placing order.</p>
  `;

  handlePaymentMethodChange();
}

function handlePaymentMethodChange() {
  const selected = document.querySelector('input[name="payment-method"]:checked');
  const qrBox = document.getElementById('upi-qr-box');
  if (!qrBox) return;

  if (selected && selected.value.includes('UPI')) {
    qrBox.classList.add('visible');
  } else {
    qrBox.classList.remove('visible');
  }
}

function renderFloatingWhatsApp(whatsappNumber, storeName) {
  const number = whatsappNumber || '919876543210';
  const name = storeName || 'Susan-mini-crochet';
  const greetText = encodeURIComponent(`Hi ${name}! 🧶 I have a question about your crochet items.`);

  let floatBtn = document.getElementById('floating-whatsapp-btn');
  if (!floatBtn) {
    floatBtn = document.createElement('a');
    floatBtn.id = 'floating-whatsapp-btn';
    floatBtn.className = 'floating-whatsapp';
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener';
    floatBtn.innerHTML = `<span class="floating-whatsapp-icon">💬</span> <span>Chat with Us</span>`;
    document.body.appendChild(floatBtn);
  }
  floatBtn.href = `https://wa.me/${number}?text=${greetText}`;
}

function getProductImages(product) {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images;
  }
  return product.image ? [product.image] : ['https://via.placeholder.com/600'];
}

function createProductCardHTML(product) {
  const currency = storeData?.settings?.currency || '₹';
  const badgeHTML = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : '';
  const btnText = product.inStock ? 'Add to Cart' : 'Out of Stock';
  const disabledAttr = product.inStock ? '' : 'disabled';

  const images = getProductImages(product);
  const currentImgIdx = productActiveImageIndex[product.id] || 0;
  const activeImage = images[currentImgIdx] || images[0];

  let sliderControls = '';
  if (images.length > 1) {
    sliderControls = `
      <button class="slider-btn prev" onclick="changeProductImage('${product.id}', -1, ${images.length})">‹</button>
      <button class="slider-btn next" onclick="changeProductImage('${product.id}', 1, ${images.length})">›</button>
    `;
  }

  const ratingStats = getProductRatingStats(product);

  return `
    <div class="product-card">
      <div class="product-img-wrap">
        <img id="card-img-${product.id}" src="${activeImage}" alt="${product.name}" loading="lazy" />
        ${badgeHTML}
        ${sliderControls}
        <button class="zoom-btn" onclick="openProductZoom('${product.id}')">🔍 Zoom</button>
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating-row">
          <span class="stars-gold" title="Rated ${ratingStats.avg} out of 5">${ratingStats.stars}</span>
          <span class="rating-number">${ratingStats.avg} (${ratingStats.count})</span>
          <button type="button" class="rate-product-btn" onclick="openRatingModal('${product.id}')">⭐ Rate</button>
        </div>
        <p class="product-desc">${product.description || ''}</p>
        <div class="product-footer">
          <span class="product-price">${currency}${product.price}</span>
          <button class="add-to-cart-btn" ${disabledAttr} onclick="addToCart('${product.id}')">
            ${btnText}
          </button>
        </div>
      </div>
    </div>
  `;
}

function changeProductImage(productId, direction, totalImages) {
  if (typeof productActiveImageIndex[productId] !== 'number') {
    productActiveImageIndex[productId] = 0;
  }
  productActiveImageIndex[productId] += direction;
  if (productActiveImageIndex[productId] < 0) {
    productActiveImageIndex[productId] = totalImages - 1;
  } else if (productActiveImageIndex[productId] >= totalImages) {
    productActiveImageIndex[productId] = 0;
  }

  const product = storeData.products.find(p => p.id === productId);
  if (!product) return;
  const images = getProductImages(product);
  const imgEl = document.getElementById(`card-img-${productId}`);
  if (imgEl) {
    imgEl.src = images[productActiveImageIndex[productId]];
  }
}

function openProductZoom(productId) {
  const product = storeData.products.find(p => p.id === productId);
  if (!product) return;
  const images = getProductImages(product);
  const idx = productActiveImageIndex[productId] || 0;
  openZoomModal(images[idx] || images[0]);
}

function openZoomModal(imgUrl) {
  let modal = document.getElementById('zoom-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'zoom-modal-overlay';
    modal.className = 'zoom-modal';
    modal.innerHTML = `
      <button class="zoom-close" onclick="closeZoomModal()">×</button>
      <img id="zoom-modal-img" src="" alt="Zoomed view" />
    `;
    document.body.appendChild(modal);
  }
  document.getElementById('zoom-modal-img').src = imgUrl;
  modal.classList.add('open');
}

function closeZoomModal() {
  const modal = document.getElementById('zoom-modal-overlay');
  if (modal) modal.classList.remove('open');
}

function renderCatalogAndFilters() {
  const targetGrid = document.getElementById('shop-grid') || document.getElementById('featured-grid');
  const filterBar = document.getElementById('category-filter-bar');
  if (!targetGrid || !storeData) return;

  const configuredCategories = storeData.categories || [];
  const productCategories = storeData.products.map(p => p.category).filter(Boolean);
  const allCategories = ['All', ...new Set([...configuredCategories, ...productCategories])];

  if (filterBar) {
    filterBar.innerHTML = allCategories
      .map(
        cat => `
        <button class="filter-btn ${cat === activeCategory ? 'active' : ''}" onclick="setCategory('${cat.replace(/'/g, "\\'")}')">
          ${cat}
        </button>
      `
      )
      .join('');
  }

  filterProducts();
}

function setCategory(category) {
  activeCategory = category;
  renderCatalogAndFilters();
}

function filterProducts() {
  const targetGrid = document.getElementById('shop-grid') || document.getElementById('featured-grid');
  if (!targetGrid || !storeData) return;

  const searchInput = document.getElementById('shop-search');
  const sortSelect = document.getElementById('shop-sort');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const sortBy = sortSelect ? sortSelect.value : 'default';

  let filtered = storeData.products.filter(product => {
    const matchesCat = activeCategory === 'All' || product.category === activeCategory;
    const matchesQuery =
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (product.category && product.category.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  if (filtered.length === 0) {
    targetGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted);">No crochet items found matching your filter.</p>`;
  } else {
    targetGrid.innerHTML = filtered.map(createProductCardHTML).join('');
  }
}

function renderTestimonials() {
  const testGrid = document.getElementById('testimonials-grid');
  if (!testGrid || !storeData || !storeData.testimonials) return;

  testGrid.innerHTML = storeData.testimonials
    .map(
      t => `
      <div class="testimonial-card">
        <p>"${t.text}"</p>
        <strong>— ${t.name}</strong>
      </div>
    `
    )
    .join('');
}

function renderAboutPage() {
  if (!storeData || !storeData.about) return;
  const about = storeData.about;

  const storyContainer = document.getElementById('about-story-container');
  if (storyContainer) {
    storyContainer.innerHTML = `
      <div class="about-img-wrap">
        <img src="${about.image}" alt="${about.title}" />
      </div>
      <div class="about-text">
        <h2 style="margin-bottom: 12px;">${about.title}</h2>
        <p>${about.storyParagraph1 || ''}</p>
        <p>${about.storyParagraph2 || ''}</p>
        ${about.highlightQuote ? `<div class="about-quote">${about.highlightQuote}</div>` : ''}
      </div>
    `;
  }

  const careGrid = document.getElementById('care-guide-grid');
  if (careGrid && about.careTips) {
    careGrid.innerHTML = about.careTips
      .map(
        tip => `
        <div class="care-card">
          <span class="care-icon">${tip.icon || '🧶'}</span>
          <h3>${tip.title}</h3>
          <p>${tip.text}</p>
        </div>
      `
      )
      .join('');
  }
}

function renderContactAndFaqPage() {
  if (!storeData) return;
  const { settings, faqs } = storeData;

  const contactGrid = document.getElementById('contact-cards-grid');
  if (contactGrid && settings) {
    contactGrid.innerHTML = `
      <div class="contact-card">
        <span class="care-icon">💬</span>
        <h3>WhatsApp Orders & Support</h3>
        <p>Quickest way to reach us for order updates or queries.</p>
        <a href="https://wa.me/${settings.whatsappNumber}" target="_blank" rel="noopener" class="btn-primary">Chat on WhatsApp</a>
      </div>
      <div class="contact-card">
        <span class="care-icon">✉️</span>
        <h3>Email Us</h3>
        <p>${settings.email || 'hello@susanminicrochet.com'}</p>
        <a href="mailto:${settings.email || ''}" class="social-pill">Send Email</a>
      </div>
      <div class="contact-card">
        <span class="care-icon">📦</span>
        <h3>Shipping & Location</h3>
        <p>${settings.location || 'Pan-India Shipping'}</p>
        <span class="social-pill">UPI • Bank Transfer • COD</span>
      </div>
    `;
  }

  const faqList = document.getElementById('faq-accordion');
  if (faqList && faqs) {
    faqList.innerHTML = faqs
      .map(
        (f, idx) => `
        <details class="faq-item" ${idx === 0 ? 'open' : ''}>
          <summary>${f.question}</summary>
          <p>${f.answer}</p>
        </details>
      `
      )
      .join('');
  }
}

function saveCart() {
  localStorage.setItem('susanCrochetCart', JSON.stringify(cart));
  localStorage.setItem('susanCrochetPromo', JSON.stringify(appliedPromo));
  updateCartUI();
}

function addToCart(productId) {
  const product = storeData.products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      qty: 1
    });
  }
  saveCart();
  toggleCart(true);
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart();
}

function toggleCart(forceOpen) {
  const overlay = document.getElementById('cart-overlay');
  if (!overlay) return;
  if (forceOpen === true) {
    overlay.classList.add('open');
  } else if (forceOpen === false) {
    overlay.classList.remove('open');
  } else {
    overlay.classList.toggle('open');
  }
  prefillCheckoutFromCustomer();
}

function applyPromoCode() {
  const inputEl = document.getElementById('promo-input');
  if (!inputEl || !storeData) return;
  const codeTyped = inputEl.value.trim().toUpperCase();

  const foundPromo = (storeData.promoCodes || []).find(p => p.code.toUpperCase() === codeTyped);
  if (!foundPromo) {
    alert('Invalid promo code. Please check and try again.');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (foundPromo.minOrderValue && subtotal < foundPromo.minOrderValue) {
    alert(`This promo code requires a minimum order value of ₹${foundPromo.minOrderValue}`);
    return;
  }

  appliedPromo = foundPromo;
  inputEl.value = '';
  saveCart();
}

function removePromoCode() {
  appliedPromo = null;
  saveCart();
}

function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    const minRequired = Number(appliedPromo.minOrderValue || 0);
    if (subtotal >= minRequired) {
      if (appliedPromo.discountType === 'percentage') {
        discountAmount = Math.round((subtotal * appliedPromo.discountValue) / 100);
      } else if (appliedPromo.discountType === 'flat') {
        discountAmount = Number(appliedPromo.discountValue);
      }
    }
  }
  if (discountAmount > subtotal) discountAmount = subtotal;

  const discountedSubtotal = subtotal - discountAmount;

  const baseShipping = Number(storeData?.settings?.shippingFee || 0);
  const freeThreshold = Number(storeData?.settings?.freeShippingAbove || 0);
  const shipping =
    discountedSubtotal === 0 || (freeThreshold > 0 && discountedSubtotal >= freeThreshold) ? 0 : baseShipping;

  return { subtotal, discountAmount, discountedSubtotal, shipping, total: discountedSubtotal + shipping };
}

function updateCartUI() {
  const currency = storeData?.settings?.currency || '₹';
  const countEls = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countEls.forEach(el => (el.textContent = totalItems));

  const cartItemsContainer = document.getElementById('cart-items-list');
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding: 20px 0;">Your crochet basket is empty 🧶</p>`;
  } else {
    let html = cart
      .map(
        item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span>${currency}${item.price} × ${item.qty} = <strong>${currency}${item.price * item.qty}</strong></span>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `
      )
      .join('');

    if (appliedPromo) {
      html += `
        <div class="promo-applied-badge">
          <span>🏷️ Promo "${appliedPromo.code}" applied!</span>
          <button class="remove-promo" onclick="removePromoCode()">Remove</button>
        </div>
      `;
    } else {
      html += `
        <div class="promo-box">
          <input type="text" id="promo-input" placeholder="Enter promo code" />
          <button class="promo-btn" onclick="applyPromoCode()">Apply</button>
        </div>
      `;
    }

    cartItemsContainer.innerHTML = html;
  }

  const { subtotal, discountAmount, shipping, total } = getCartTotals();
  const subEl = document.getElementById('cart-subtotal');
  const shipEl = document.getElementById('cart-shipping');
  const totEl = document.getElementById('cart-total');

  let subtotalDisplay = `${currency}${subtotal}`;
  if (discountAmount > 0) {
    subtotalDisplay = `<span style="text-decoration: line-through; color: var(--text-muted);">${currency}${subtotal}</span> <span style="color:var(--deep-pink); font-weight:700;">-${currency}${discountAmount}</span>`;
  }

  if (subEl) subEl.innerHTML = subtotalDisplay;
  if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : `${currency}${shipping}`;
  if (totEl) totEl.textContent = `${currency}${total}`;
}

function checkoutWhatsApp(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert('Please add at least one crochet item to your cart first!');
    return;
  }

  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const paymentEl = document.querySelector('input[name="payment-method"]:checked');
  const paymentMethod = paymentEl ? paymentEl.value : 'UPI';

  if (!name || !phone || !address) {
    alert('Please fill in your Name, Phone Number, and Full Delivery Address.');
    return;
  }

  const currency = storeData?.settings?.currency || '₹';
  const whatsappNumber = storeData?.settings?.whatsappNumber || '919876543210';
  const { subtotal, discountAmount, shipping, total } = getCartTotals();

  // Generate unique Order ID & save to customer login profile automatically
  const orderId = 'SMC-' + Math.floor(1000 + Math.random() * 9000);
  const cleanPhone = normalizePhone(phone);
  const itemsSummaryText = cart.map(i => `${i.name} (x${i.qty})`).join(', ');

  loggedInCustomer = { name, phone: cleanPhone, address };
  localStorage.setItem('susanCrochetCustomer', JSON.stringify(loggedInCustomer));
  updateAccountButtonText();

  localCustomerOrders.unshift({
    orderId,
    customerName: name,
    phone: cleanPhone,
    orderDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    itemsSummary: itemsSummaryText,
    totalAmount: total,
    paymentStatus: paymentMethod,
    status: 'Order Confirmed'
  });
  localStorage.setItem('susanCrochetLocalOrders', JSON.stringify(localCustomerOrders));

  let orderLines = `*🧶 New Order #${orderId} - ${storeData?.settings?.storeName || 'Susan-mini-crochet'}*\n\n`;
  orderLines += `*Order ID:* #${orderId}\n`;
  orderLines += `*Items Ordered:*\n`;
  cart.forEach((item, index) => {
    orderLines += `${index + 1}. ${item.name} (x${item.qty}) - ${currency}${item.price * item.qty}\n`;
  });

  orderLines += `\n*Subtotal:* ${currency}${subtotal}`;
  if (discountAmount > 0 && appliedPromo) {
    orderLines += `\n*Discount (${appliedPromo.code}):* -${currency}${discountAmount}`;
  }
  orderLines += `\n*Shipping:* ${shipping === 0 ? 'FREE' : currency + shipping}`;
  orderLines += `\n*Total Payable:* *${currency}${total}*\n`;
  orderLines += `\n*Payment Mode:* ${paymentMethod}\n`;
  orderLines += `\n*Customer Details:*`;
  orderLines += `\n👤 Name: ${name}`;
  orderLines += `\n📞 Phone: ${cleanPhone}`;
  orderLines += `\n📍 Address: ${address}`;

  const encodedText = encodeURIComponent(orderLines);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
}

document.addEventListener('DOMContentLoaded', initStore);
