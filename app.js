const FALLBACK_STORE_DATA = {
  settings: {
    storeName: "Susan-mini-crochet",
    tagline: "Handmade with love, one stitch at a time",
    whatsappNumber: "919876543210",
    email: "hello@susanminicrochet.com",
    location: "Handmade in India | Pan-India Delivery",
    currency: "₹",
    announcement: "✨ Free shipping on orders above ₹999 | COD & UPI Available!",
    shippingFee: 60,
    freeShippingAbove: 999,
    enableCOD: true,
    socialLinks: {
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
      youtube: "https://youtube.com/"
    }
  },
  promoCodes: [
    {
      code: "SUSAN10",
      discountType: "percentage",
      discountValue: 10,
      minOrderValue: 300
    },
    {
      code: "FLAT50",
      discountType: "flat",
      discountValue: 50,
      minOrderValue: 500
    }
  ],
  categories: [
    "Keychains",
    "Crochet Flowers",
    "Amigurumi Plushies",
    "Bags & Pouches",
    "Coasters & Decor"
  ],
  products: [
    {
      id: "prod-1",
      name: "Mini Strawberry Keychain",
      category: "Keychains",
      price: 149,
      badge: "Ready to Ship",
      featured: true,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
      ],
      description: "Soft 100% milk cotton yarn strawberry charm with a rust-free gold lobster clasp. Size: 6 cm."
    },
    {
      id: "prod-2",
      name: "Pastel Tulip Bouquet (3 Stems)",
      category: "Crochet Flowers",
      price: 499,
      badge: "Bestseller",
      featured: true,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
      ],
      description: "Everlasting handmade crochet tulips wrapped in pastel kraft paper with bendable wire stems. Height: 28 cm."
    },
    {
      id: "prod-3",
      name: "Chubby Bee Amigurumi Plushie",
      category: "Amigurumi Plushies",
      price: 349,
      badge: "Ready to Ship",
      featured: true,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80"
      ],
      description: "Cuddly pocket-sized bee stuffed with hypoallergenic polyfill and safety eyes. Size: 10 cm."
    },
    {
      id: "prod-4",
      name: "Daisy Granny Square Tote Bag",
      category: "Bags & Pouches",
      price: 899,
      badge: "Made to Order",
      featured: true,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80"
      ],
      description: "Sturdy pastel pink & cream daisy squares with inner cotton lining and magnetic snap button. Fits notebooks & essentials."
    },
    {
      id: "prod-5",
      name: "Sunflower Bag Charm Keychain",
      category: "Keychains",
      price: 179,
      badge: "Ready to Ship",
      featured: false,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
      ],
      description: "Bright double-layered crochet sunflower keychain that clips easily onto backpacks, purses, or house keys. Diameter: 7 cm."
    },
    {
      id: "prod-6",
      name: "Floral Mug Coaster Set (Set of 2)",
      category: "Coasters & Decor",
      price: 249,
      badge: "Ready to Ship",
      featured: false,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
      ],
      description: "Heat-absorbent cotton yarn coasters in blush pink and cream with scalloped petal edges. Washable & reusable."
    }
  ],
  testimonials: [
    {
      name: "Priya S.",
      text: "Ordered the strawberry keychain and tulip bouquet—the stitching is so neat and packaging was adorable!"
    },
    {
      name: "Ananya M.",
      text: "Loved how easy it was to order on WhatsApp with UPI. The Daisy Tote bag is my new daily favorite."
    },
    {
      name: "Roshni K.",
      text: "Super soft yarn and exact pastel shades shown in the photos. Will definitely order more gifts from Susan-mini-crochet!"
    }
  ],
  about: {
    title: "The Story Behind Susan-mini-crochet",
    subtitle: "Slow-crafted keepsakes stitched with patience, warmth, and premium soft yarns.",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
    storyParagraph1: "Welcome to Susan-mini-crochet! What started as a cozy passion for turning soft pastel yarn into tiny charms for friends and family has blossomed into a dedicated handmade crochet studio.",
    storyParagraph2: "Every single keychain, everlasting flower bouquet, plushie, and bag in our catalog is 100% hand-crocheted stitch by stitch. Unlike mass-produced items, each piece carries the warmth and durability of careful handcraftsmanship.",
    highlightQuote: "We use skin-friendly milk cotton and premium acrylic yarns so your crochet treasures stay soft, vibrant, and huggable for years.",
    careTips: [
      {
        icon: "🫧",
        title: "Gentle Hand Wash Only",
        text: "Soak gently in cool or lukewarm water with a mild liquid detergent or baby shampoo. Avoid harsh wringing or scrubbing."
      },
      {
        icon: "🌬️",
        title: "Air Dry Flat in Shade",
        text: "Press out excess water gently with a clean towel and lay flat on a dry surface away from direct harsh sunlight."
      },
      {
        icon: "🚫",
        title: "No Machine Wash or Bleach",
        text: "Never use a washing machine, tumble dryer, bleach, or hot iron, as heat and friction can stretch or fuzz the yarn fibers."
      },
      {
        icon: "💐",
        title: "Dusting Crochet Flowers",
        text: "For crochet flower bouquets, use a soft makeup brush or cool hairdryer setting from a distance to keep petals dust-free."
      }
    ]
  },
  faqs: [
    {
      question: "How do I place an order on Susan-mini-crochet?",
      answer: "Simply browse our Shop Catalog, click 'Add to Cart' on the items you love, open your Cart Drawer, enter your delivery address, choose UPI, Bank Transfer, or Cash on Delivery (COD), and click 'Send Order on WhatsApp'."
    },
    {
      question: "What is the difference between 'Ready to Ship' and 'Made to Order'?",
      answer: "'Ready to Ship' items are dispatched within 1–2 business days. 'Made to Order' pieces are freshly crocheted for you and take 3–5 business days before dispatch."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes! You can select UPI (GPay, PhonePe, Paytm), Bank Transfer, or Cash on Delivery (COD) right inside the checkout cart."
    },
    {
      question: "How much is shipping and how long does delivery take?",
      answer: "Standard shipping is ₹60 across India, and FREE on orders above ₹999. Delivery usually takes 4–7 business days depending on your PIN code."
    }
  ]
};

let storeData = null;
let cart = JSON.parse(localStorage.getItem('susanCrochetCart')) || [];
let activeCategory = 'All';
let appliedPromo = JSON.parse(localStorage.getItem('susanCrochetPromo')) || null;
let productActiveImageIndex = {};

async function initStore() {
  try {
    const response = await fetch('data/store.json');
    if (!response.ok) throw new Error('HTTP error ' + response.status);
    storeData = await response.json();
  } catch (err) {
    console.warn('Using built-in fallback store data (local file mode):', err.message);
    storeData = FALLBACK_STORE_DATA;
  }

  applyStoreSettings();
  renderCatalogAndFilters();
  renderTestimonials();
  renderAboutPage();
  renderContactAndFaqPage();
  updateCartUI();
}

function applyStoreSettings() {
  if (!storeData || !storeData.settings) return;
  const { announcement, storeName, enableCOD, socialLinks, whatsappNumber } = storeData.settings;

  const announcementEl = document.getElementById('announcement-bar');
  if (announcementEl && announcement) {
    announcementEl.textContent = announcement;
  }

  const brandEls = document.querySelectorAll('.store-name-text');
  brandEls.forEach(el => (el.textContent = storeName));

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

/* Cart & Promo Functions */
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

  let orderLines = `*🧶 New Order - ${storeData?.settings?.storeName || 'Susan-mini-crochet'}*\n\n`;
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
  orderLines += `\n📞 Phone: ${phone}`;
  orderLines += `\n📍 Address: ${address}`;

  const encodedText = encodeURIComponent(orderLines);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
}

document.addEventListener('DOMContentLoaded', initStore);