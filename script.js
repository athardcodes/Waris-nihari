const page = document.body.dataset.page || 'home';
const navItems = [
  ['home', 'Home', 'index.html'],
  ['story', 'Our Story', 'story.html'],
  ['menu', 'Menu', 'menu.html'],
  ['locations', 'Locations', 'locations.html'],
  ['gallery', 'Gallery', 'gallery.html'],
  ['reviews', 'Reviews', 'reviews.html'],
  ['contact', 'Contact', 'contact.html'],
];

const header = document.getElementById('site-header');
if (header) {
  header.innerHTML = `<header class="site-header"><div class="container nav"><a href="index.html" class="brand" aria-label="Waris Nihari home">Waris Nihari</a><nav class="nav-links" aria-label="Main navigation">${navItems.map(([key, label, href]) => `<a class="${page === key ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</nav><div class="nav-actions"><a class="btn btn-secondary nav-menu-link" href="menu.html">Explore menu</a><a class="btn btn-primary nav-order-link" href="order.html">Order now <span data-cart-count>0</span></a><button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation" aria-expanded="false">Menu</button></div></div><div class="container mobile-nav" id="mobileNav">${navItems.map(([, label, href]) => `<a href="${href}">${label}</a>`).join('')}</div></header>`;
}

const footer = document.getElementById('site-footer');
if (footer) {
  footer.innerHTML = `<footer class="site-footer"><div class="container footer-inner"><div><div class="brand">Waris Nihari</div><p class="muted">Traditional Pakistani nihari in Lahore.</p><p class="muted">© ${new Date().getFullYear()} Waris Nihari. Concept site.</p></div><div class="footer-links"><a href="story.html">Our Story</a><a href="menu.html">Menu</a><a href="locations.html">Locations</a><a href="gallery.html">Gallery</a><a href="reviews.html">Reviews</a><a href="contact.html">Contact</a></div></div></footer>`;
}

const toggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
if (toggle && mobileNav) toggle.addEventListener('click', () => { const open = mobileNav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });

const tabs = document.querySelectorAll('[data-filter]');
const menuItems = document.querySelectorAll('[data-category]');
tabs.forEach((tab) => tab.addEventListener('click', () => { tabs.forEach((item) => item.classList.remove('active')); tab.classList.add('active'); const filter = tab.dataset.filter; menuItems.forEach((item) => { item.hidden = filter !== 'all' && item.dataset.category !== filter; }); }));

const getCart = () => JSON.parse(localStorage.getItem('waris-cart') || '[]');
const saveCart = (cart) => { localStorage.setItem('waris-cart', JSON.stringify(cart)); updateCartCount(cart); renderCart(cart); };
const updateCartCount = (cart = getCart()) => document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); });

document.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => { const cart = getCart(); const existing = cart.find((item) => item.name === button.dataset.name); if (existing) existing.quantity += 1; else cart.push({ name: button.dataset.name, quantity: 1 }); saveCart(cart); button.textContent = 'Added'; setTimeout(() => { button.textContent = 'Add'; }, 1000); }));

function renderCart(cart = getCart()) { const target = document.getElementById('cart-items'); if (!target) return; if (!cart.length) { target.innerHTML = '<p class="muted">Your order is empty — browse the menu.</p><a class="btn btn-secondary" href="menu.html">Browse menu</a>'; return; } target.innerHTML = `${cart.map((item, index) => `<div class="cart-row"><strong>${item.name}</strong><span>× ${item.quantity}</span><button class="text-button" data-remove="${index}" aria-label="Remove ${item.name}">Remove</button></div>`).join('')}<button class="btn btn-secondary" id="clear-cart">Clear cart</button>`; target.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => { const next = getCart(); next.splice(Number(button.dataset.remove), 1); saveCart(next); })); target.querySelector('#clear-cart')?.addEventListener('click', () => saveCart([])); }

updateCartCount();
renderCart();

const form = document.querySelector('.contact-form');
if (form) form.addEventListener('submit', (event) => { event.preventDefault(); const button = form.querySelector('button[type="submit"]'); button.textContent = 'Inquiry saved'; button.disabled = true; setTimeout(() => { button.textContent = 'Send inquiry'; button.disabled = false; form.reset(); }, 1800); });
