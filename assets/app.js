const $ = (s) => document.querySelector(s);

let products = [];
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartBadge();
}

function renderCartBadge() {
  const count = cart.reduce((n, i) => n + i.qty, 0);
  $("#cartCount").textContent = String(count);
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

function formatGBP(pence) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
}

// For display only: we’re not storing numeric prices in this simple demo.
// Total will be computed server-side by Stripe based on price IDs.
function renderProducts() {
  const wrap = $("#products");
  wrap.innerHTML = "";
  for (const p of products) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <h4>${p.name}</h4>
      <p>${p.description}</p>
      <div class="price">${p.price_gbp_display}</div>
      <button class="button" data-add="${p.id}">Add to cart</button>
    `;
    wrap.appendChild(el);
  }
  wrap.addEventListener("click", (e) => {
    const id = e.target?.getAttribute?.("data-add");
    if (id) addToCart(id);
  });
}

function renderCart() {
  const cartItems = $("#cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
    $("#cartTotal").textContent = "—";
    $("#checkoutBtn").disabled = true;
    return;
  }

  $("#checkoutBtn").disabled = false;

  for (const item of cart) {
    const p = products.find(x => x.id === item.productId);
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div>
        <strong>${p?.name ?? item.productId}</strong><br/>
        <span class="fineprint">${p?.price_gbp_display ?? ""}</span>
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

  $("#cartTotal").textContent = "Calculated at checkout";
}

async function checkout() {
  // Build line items based on Stripe price IDs
  const lineItems = cart.map(item => {
    const p = products.find(x => x.id === item.productId);
    if (!p?.stripe_price_id) throw new Error(`Missing stripe_price_id for ${item.productId}`);
    return { price: p.stripe_price_id, quantity: item.qty };
  });

  const res = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lineItems })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Checkout failed");

  window.location.href = data.url;
}

async function init() {
  const res = await fetch("/data/products.json");
  products = await res.json();
  renderProducts();
  renderCartBadge();

  const dialog = $("#cartDialog");
  $("#cartBtn").addEventListener("click", () => { dialog.showModal(); renderCart(); });
  $("#closeCart").addEventListener("click", () => dialog.close());

  $("#cartItems").addEventListener("click", (e) => {
    const inc = e.target?.getAttribute?.("data-inc");
    const dec = e.target?.getAttribute?.("data-dec");
    const rm  = e.target?.getAttribute?.("data-rm");
    if (inc) changeQty(inc, +1);
    if (dec) changeQty(dec, -1);
    if (rm) removeFromCart(rm);
  });

  $("#checkoutBtn").addEventListener("click", async () => {
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
