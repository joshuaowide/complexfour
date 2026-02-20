const $ = (s) => document.querySelector(s);

let products = [];
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let currency = localStorage.getItem("currency") || "GBP";

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartBadge();
}

function setCurrency(next) {
  currency = next;
  localStorage.setItem("currency", currency);
  const sel = $("#currencySelect");
  if (sel) sel.value = currency;
  renderProducts();
  renderFeatured();
  renderProductDetail();
}

function renderCartBadge() {
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const el = $("#cartCount");
  if (el) el.textContent = String(count);
}

function addToCart(productId) {
  const existing = cart.find(i => i.productId === productId);
  if (existing) existing.qty += 1;
  else cart.push({ productId, qty: 1 });
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.productId !== productId);
  saveCart();
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function moneyDisplay(p) {
  return p?.price_display?.[currency] || "";
}

function productLink(p) {
  return `/product.html?id=${encodeURIComponent(p.id)}`;
}

function renderProducts() {
  const wrap = $("#products");
  if (!wrap) return;

  wrap.innerHTML = "";
  for (const p of products) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
      <h4>${p.name}</h4>
      <p>${p.short_description || ""}</p>
      <div class="price">${moneyDisplay(p)}</div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a class="button secondary" href="${productLink(p)}">View details</a>
        <button class="button" data-add="${p.id}">Add to cart</button>
      </div>
    `;
    wrap.appendChild(el);
  }

  wrap.addEventListener("click", (e) => {
    const id = e.target?.getAttribute?.("data-add");
    if (id) addToCart(id);
  });
}

function renderFeatured() {
  const wrap = $("#featured");
  if (!wrap) return;

  const p = products[0];
  if (!p) return;

  wrap.innerHTML = `
    <div class="card">
      ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
      <h4>${p.name}</h4>
      <p>${p.description || ""}</p>
      <div class="price">${moneyDisplay(p)}</div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a class="button secondary" href="${productLink(p)}">View details</a>
        <button class="button" id="featuredAdd">Add to cart</button>
      </div>
    </div>
  `;

  $("#featuredAdd")?.addEventListener("click", () => addToCart(p.id));
}

function renderCart() {
  const cartItems = $("#cartItems");
  const totalEl = $("#cartTotal");
  const checkoutBtn = $("#checkoutBtn");
  if (!cartItems || !checkoutBtn || !totalEl) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="muted">Your cart is empty.</p>`;
    totalEl.textContent = "—";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  totalEl.textContent = "Calculated at checkout";

  for (const item of cart) {
    const p = products.find(x => x.id === item.productId);
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div>
        <strong>${p?.name ?? item.productId}</strong><br/>
        <span class="fineprint">${moneyDisplay(p)}</span>
      </div>
      <div class="qty">
        <button class="button secondary" data-dec="${item.productId}">−</button>
        <strong>${item.qty}</strong>
        <button class="button secondary" data-inc="${item.productId}">+</button>
      </div>
      <button class="button secondary" data-rm="${item.productId}">Remove</button>
    `;
    cartItems.appendChild(row);
  }
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function renderProductDetail() {
  const host = $("#productDetail");
  if (!host) return;

  const id = getQueryParam("id");
  const p = products.find(x => x.id === id) || products[0];
  if (!p) return;

  document.title = `${p.name} — complexfour`;

  const specs = (p.specs || []).map(s => `<li>${s}</li>`).join("");

  host.innerHTML = `
    <div class="product-media">
      ${p.image_url
        ? `<img src="${p.image_url}" alt="${p.name}" style="max-width:100%; border-radius:12px;" />`
        : `<div class="placeholder">
             <strong>Product image</strong><br/>
             <span class="fineprint">Add image_url in products.json when ready.</span>
           </div>`
      }
    </div>

    <div class="product-info">
      ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
      <h1 style="margin-top:0;">${p.name}</h1>
      <p class="muted">${p.description || ""}</p>
      <div class="price" style="font-size:20px;">${moneyDisplay(p)}</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
        <button class="button" id="detailAdd">Add to cart</button>
        <button class="button secondary" id="detailBuy">Buy now</button>
      </div>

      ${specs ? `<h3 style="margin-top:18px;">Key notes</h3><ul class="specs">${specs}</ul>` : ""}

      <div class="notice" style="margin-top:18px;">
        <strong>Compliance note</strong>
        <p class="muted" style="margin-bottom:0;">
          This product is sold for general wellness use. No medical claims are made.
        </p>
      </div>
    </div>
  `;

  $("#detailAdd")?.addEventListener("click", () => addToCart(p.id));
  $("#detailBuy")?.addEventListener("click", async () => {
    addToCart(p.id);
    await checkout();
  });
}

async function checkout() {
  const lineItems = cart.map(item => {
    const p = products.find(x => x.id === item.productId);
    const priceId = p?.stripe_price_id?.[currency];
    if (!priceId) throw new Error(`Missing Stripe price ID for ${p?.id} in ${currency}`);
    return { price: priceId, quantity: item.qty };
  });

  const res = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lineItems, currency })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Checkout failed");

  window.location.href = data.url;
}

async function init() {
  const res = await fetch("/data/products.json");
  products = await res.json();

  // Set currency select
  const currencySelect = $("#currencySelect");
  if (currencySelect) {
    currencySelect.value = currency;
    currencySelect.addEventListener("change", (e) => setCurrency(e.target.value));
  }

  renderProducts();
  renderFeatured();
  renderProductDetail();
  renderCartBadge();

  const dialog = $("#cartDialog");
  $("#cartBtn")?.addEventListener("click", () => { dialog.showModal(); renderCart(); });
  $("#closeCart")?.addEventListener("click", () => dialog.close());

  $("#cartItems")?.addEventListener("click", (e) => {
    const inc = e.target?.getAttribute?.("data-inc");
    const dec = e.target?.getAttribute?.("data-dec");
    const rm  = e.target?.getAttribute?.("data-rm");
    if (inc) changeQty(inc, +1);
    if (dec) changeQty(dec, -1);
    if (rm) removeFromCart(rm);
  });

  $("#checkoutBtn")?.addEventListener("click", async () => {
    try {
      $("#checkoutBtn").disabled = true;
      await checkout();
    } catch (err) {
      alert(err.message);
      $("#checkoutBtn").disabled = false;
    }
  });
}

init();
