const SHOP_URL = 'https://www.zenmo.shop';
const API_URL  = `${SHOP_URL}/products.json?limit=250`;

const searchEl    = document.getElementById('search');
const typeFilter  = document.getElementById('type-filter');
const statusEl    = document.getElementById('status');
const gridEl      = document.getElementById('product-grid');

let allProducts = [];

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    throw new Error('Could not load products from zenmo.shop. ' + err.message);
  }
}

function formatPrice(variant) {
  if (!variant) return '';
  const price = parseFloat(variant.price);
  const currency = variant.currency || 'USD';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
}

function buildCard(product) {
  const url      = `${SHOP_URL}/products/${product.handle}`;
  const image    = product.images?.[0]?.src ?? '';
  const variant  = product.variants?.[0];
  const price    = formatPrice(variant);
  const type     = product.product_type || '';

  const card = document.createElement('a');
  card.className   = 'product-card';
  card.href        = url;
  card.target      = '_blank';
  card.rel         = 'noopener';

  card.innerHTML = `
    ${image ? `<img src="${image}" alt="${escapeHtml(product.title)}" loading="lazy" />` : ''}
    <div class="card-body">
      ${type ? `<span class="card-type">${escapeHtml(type)}</span>` : ''}
      <span class="card-title">${escapeHtml(product.title)}</span>
      ${price ? `<span class="card-price">${price}</span>` : ''}
    </div>
  `;
  return card;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function populateTypeFilter(products) {
  const types = [...new Set(products.map(p => p.product_type).filter(Boolean))].sort();
  types.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    typeFilter.appendChild(opt);
  });
}

function render() {
  const query    = searchEl.value.trim().toLowerCase();
  const typeVal  = typeFilter.value;

  const filtered = allProducts.filter(p => {
    const matchesSearch = !query || p.title.toLowerCase().includes(query);
    const matchesType   = !typeVal || p.product_type === typeVal;
    return matchesSearch && matchesType;
  });

  gridEl.innerHTML = '';

  if (filtered.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'no-results';
    msg.textContent = 'No products match your search.';
    gridEl.appendChild(msg);
    return;
  }

  filtered.forEach(p => gridEl.appendChild(buildCard(p)));
}

async function init() {
  try {
    allProducts = await fetchProducts();
    statusEl.style.display = 'none';
    populateTypeFilter(allProducts);
    render();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.classList.add('error');
  }
}

searchEl.addEventListener('input', render);
typeFilter.addEventListener('change', render);

init();
