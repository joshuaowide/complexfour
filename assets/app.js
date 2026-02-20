<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Buy The Device — complexfour</title>
  <meta name="description" content="complexfour hydrogen inhalation device for general wellness use. Secure Stripe checkout. No medical claims." />
  <link rel="stylesheet" href="/assets/style.css" />

  <!-- PDP-only additions (optional: move into style.css later) -->
  <style>
    .pdp { padding-top: 12px; padding-bottom: 60px; }
    .breadcrumbs { font-size: 12px; color: var(--muted); margin: 6px 0 14px; }
    .breadcrumbs a { text-decoration: underline; text-decoration-color: rgba(20,23,26,.25); }

    .pdp-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 18px; align-items: start; }
    @media (max-width: 920px){ .pdp-grid { grid-template-columns: 1fr; } }

    .gallery { border: 1px solid var(--border); border-radius: var(--radius); background: rgba(255,255,255,.92); box-shadow: var(--shadow-sm); overflow: hidden; }
    .gallery-main { aspect-ratio: 4 / 3; display: grid; place-items: center; background: linear-gradient(180deg, rgba(255,243,214,.55), rgba(255,255,255,.90)); }
    .gallery-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .gallery-main .placeholder { padding: 34px 18px; text-align: center; color: var(--muted); }

    .thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 12px; border-top: 1px solid var(--border); background: rgba(255,255,255,.88); }
    .thumb { border: 1px solid var(--border); border-radius: 12px; background: rgba(255,255,255,.85); aspect-ratio: 1 / 1; display: grid; place-items: center; overflow: hidden; cursor: pointer; }
    .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .thumb.active { outline: 2px solid rgba(37,99,235,.35); border-color: rgba(37,99,235,.25); }

    .buybox { border: 1px solid var(--border); border-radius: var(--radius); background: rgba(255,255,255,.92); box-shadow: var(--shadow-md); padding: 16px; }
    .sticky-buy { position: sticky; top: 92px; }
    @media (max-width: 920px){ .sticky-buy { position: static; } }

    .kicker { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: rgba(20,23,26,.60); margin: 0 0 10px; }
    .pdp-title { margin: 0 0 8px; letter-spacing: -.02em; }
    .pdp-sub { margin: 0 0 12px; color: var(--muted); line-height: 1.55; }

    .price-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin: 12px 0 10px; padding: 12px; border: 1px solid var(--border); border-radius: 14px; background: rgba(255,255,255,.85); }
    .price-big { font-size: 22px; font-weight: 850; letter-spacing: .2px; }
    .stock { font-size: 12px; color: rgba(7, 88, 87, .95); background: var(--accent-soft); border: 1px solid rgba(14,165,164,.22); padding: 6px 10px; border-radius: 999px; }

    .buy-actions { display: grid; gap: 10px; margin-top: 10px; }
    .trust { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
    @media (max-width: 520px){ .trust { grid-template-columns: 1fr; } }

    .trust-item { border: 1px solid var(--border); border-radius: 14px; padding: 10px 12px; background: rgba(255,255,255,.86); }
    .trust-item strong { display: block; font-size: 13px; }
    .trust-item span { display: block; font-size: 12px; color: var(--muted); margin-top: 2px; line-height: 1.35; }

    .bullets { margin: 10px 0 0; padding-left: 18px; color: var(--text); }
    .bullets li { margin: 6px 0; }

    .pdp-sections { margin-top: 18px; display: grid; gap: 14px; }
    details.accordion { border: 1px solid var(--border); border-radius: var(--radius); background: rgba(255,255,255,.90); box-shadow: var(--shadow-sm); overflow: hidden; }
    details.accordion summary { list-style: none; cursor: pointer; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-weight: 750; }
    details.accordion summary::-webkit-details-marker { display: none; }
    details.accordion .content { padding: 0 16px 16px; color: var(--muted); line-height: 1.6; }
    .divider { height: 1px; background: var(--border); margin: 0 16px 14px; }

    .compare { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    @media (max-width: 920px){ .compare { grid-template-columns: 1fr; } }
    .pill { display: inline-block; font-size: 12px; padding: 5px 10px; border-radius: 999px; border: 1px solid var(--border); background: rgba(255,255,255,.85); color: var(--muted); }

    .specs-inline { margin: 10px 0 0; padding-left: 18px; color: var(--text); }
    .specs-inline li { margin: 6px 0; }
  </style>
</head>

<body>
  <header class="header">
    <div class="container header-inner">
      <a class="brandwrap" href="/">
        <img class="logo" src="/assets/logo.svg" alt="complexfour logo" />
        <div class="brandtext">
          <div class="brandname">complexfour</div>
          <div class="brandsub">Buy The Device</div>
        </div>
      </a>

      <nav class="nav">
        <a class="navlink active" href="/products.html">Buy The Device</a>
        <a class="navlink" href="/about-hydrogen.html">About Hydrogen Inhalation</a>
        <a class="navlink" href="/about-complex-four.html">About Complex Four</a>
        <a class="navlink" href="/support.html">Support</a>
      </nav>

      <div class="actions">
        <select id="currencySelect" class="select" aria-label="Currency">
          <option value="GBP">GBP (£)</option>
          <option value="EUR">EUR (€)</option>
          <option value="USD">USD ($)</option>
        </select>
        <button id="cartBtn" class="button secondary">
          Cart (<span id="cartCount">0</span>)
        </button>
      </div>
    </div>
  </header>

  <main class="container pdp">
    <div class="breadcrumbs">
      <a href="/">Home</a> <span aria-hidden="true">›</span> <span>Buy The Device</span>
    </div>

    <!-- PDP host: populated by JS using your products.json -->
    <div id="pdpHost"></div>

    <section class="section notice">
      <h3>Medical disclaimer</h3>
      <p class="muted">
        Information on this site is for general educational purposes only and is not medical advice.
        Products are not intended to diagnose, treat, cure, or prevent any disease.
        If you have a medical condition, consult a qualified clinician before use.
      </p>
    </section>
  </main>

  <!-- Cart dialog (unchanged) -->
  <dialog id="cartDialog" class="dialog">
    <div class="dialog-header">
      <h3>Your cart</h3>
      <button id="closeCart" class="button secondary">Close</button>
    </div>
    <div id="cartItems" class="cart-items"></div>
    <div class="cart-footer">
      <div class="row">
        <strong>Total</strong>
        <strong id="cartTotal">Calculated at checkout</strong>
      </div>
      <button id="checkoutBtn" class="button">Secure checkout</button>
      <p class="fineprint">Checkout is handled securely by Stripe.</p>
    </div>
  </dialog>

  <script src="/assets/app.js"></script>

  <!-- PDP renderer that plugs into your existing app.js functions/vars -->
  <script>
    (function(){
      const $ = (s) => document.querySelector(s);

      function esc(s){
        return String(s ?? "").replace(/[&<>"']/g, (m) => ({
          "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
        }[m]));
      }

      function moneyDisplay(p){
        // uses the same currency var from app.js (global)
        return p?.price_display?.[window.currency || "GBP"] || "";
      }

      function getPrimaryProduct(){
        // Products are loaded by app.js init() into global `products` (declared with let at top-level).
        // We access it via window.products if it is attached, otherwise fall back to querying through
        // a DOM signal: renderProductDetail() only runs on product.html, so here we render ourselves.
        const ps = window.products;
        if (Array.isArray(ps) && ps.length) return ps[0];
        return null;
      }

      function renderPDP(p){
        const host = $("#pdpHost");
        if (!host || !p) return;

        const thumbs = [
          p.image_url || "/assets/device.jpg",
          "/assets/device-2.jpg",
          "/assets/device-3.jpg",
          "/assets/device-4.jpg"
        ];

        const badge = p.badge ? `<div class="badge">${esc(p.badge)}</div>` : "";

        const specs = Array.isArray(p.specs) && p.specs.length
          ? `<ul class="specs-inline">${p.specs.map(s => `<li>${esc(s)}</li>`).join("")}</ul>`
          : "";

        host.innerHTML = `
          <div class="pdp-grid">
            <section class="gallery" aria-label="Product images">
              <div class="gallery-main" id="galleryMain">
                ${
                  p.image_url
                    ? `<img src="${esc(p.image_url)}" alt="${esc(p.name)}" />`
                    : `<div class="placeholder">
                        <strong>Product image coming soon</strong><br/>
                        Add <code>image_url</code> in <code>/data/products.json</code>
                      </div>`
                }
              </div>

              <div class="thumbs" id="thumbs">
                ${thumbs.map((src, idx) => `
                  <button class="thumb ${idx === 0 ? "active" : ""}" type="button" data-src="${esc(src)}" aria-label="Image ${idx+1}">
                    <div class="placeholder" style="font-size:12px;padding:10px;">${esc(src.split("/").pop())}</div>
                  </button>
                `).join("")}
              </div>
            </section>

            <aside class="buybox sticky-buy" aria-label="Purchase options">
              <p class="kicker">Single flagship product</p>
              ${badge}
              <h1 class="pdp-title">${esc(p.name)}</h1>
              <p class="pdp-sub">
                ${esc(p.description || p.short_description || "A simple, education-first hydrogen wellness device — designed for daily routines.")}
              </p>

              <div class="price-row">
                <div>
                  <div class="muted" style="font-size:12px;margin-bottom:4px;">Price shown in selected currency</div>
                  <div class="price-big" id="pdpPrice">${moneyDisplay(p) || "Shown at checkout"}</div>
                </div>
                <div class="stock" aria-label="Availability">In stock</div>
              </div>

              <div class="buy-actions">
                <button id="pdpAddToCart" class="button">Add to cart</button>
                <button id="pdpBuyNow" class="button secondary">Buy now</button>
                <p class="fineprint">
                  Checkout is handled securely by Stripe. Shipping address and contact details are collected during checkout.
                </p>
              </div>

              <div class="trust" aria-label="Trust and logistics">
                <div class="trust-item">
                  <strong>Secure checkout</strong>
                  <span>Stripe-hosted payment flow.</span>
                </div>
                <div class="trust-item">
                  <strong>Fast setup</strong>
                  <span>Designed for a simple daily routine.</span>
                </div>
                <div class="trust-item">
                  <strong>Clear positioning</strong>
                  <span>General wellness / education only.</span>
                </div>
              </div>

              <ul class="bullets" aria-label="Key highlights">
                <li>Use with a nasal cannula (as specified)</li>
                <li>Built-in safety features (as per product spec)</li>
                <li>Guidance for starting a routine (non-medical)</li>
              </ul>

              ${specs ? `<div style="margin-top:12px;">${specs}</div>` : ""}
            </aside>
          </div>

          <section class="pdp-sections" aria-label="Product information">
            <details class="accordion" open>
              <summary>What’s included <span class="pill">In the box</span></summary>
              <div class="divider"></div>
              <div class="content">
                <ul class="bullets">
                  <li>${esc(p.name)}</li>
                  <li>Power supply</li>
                  <li>Quick-start guide</li>
                  <li>Consumables/accessories (as specified)</li>
                </ul>
                <p class="fineprint">Update this list once your final “in the box” contents are confirmed.</p>
              </div>
            </details>

            <details class="accordion">
              <summary>How to use (wellness routine) <span class="pill">Simple routine</span></summary>
              <div class="divider"></div>
              <div class="content">
                <p>
                  Many users start with short, consistent sessions and adjust over time based on comfort and goals.
                  A common consumer wellness starting point is <strong>20–30 minutes</strong> once daily, then reassess.
                </p>
                <ul class="bullets">
                  <li>Use in a well-ventilated space.</li>
                  <li>Follow device instructions and safety guidance.</li>
                  <li>If you have a medical condition or use oxygen therapy, consult a clinician before use.</li>
                </ul>
                <p class="fineprint">Educational content only — not medical advice. Individual experiences vary.</p>
              </div>
            </details>

            <details class="accordion">
              <summary>Shipping & returns <span class="pill">UK / EU / US</span></summary>
              <div class="divider"></div>
              <div class="content">
                <p>
                  Shipping costs and delivery estimates are calculated at checkout based on your address.
                  Returns are accepted in line with our policy (see Terms/Returns).
                </p>
                <ul class="bullets">
                  <li>Tracking provided where available.</li>
                  <li>If an item arrives damaged, contact support promptly.</li>
                </ul>
                <p class="fineprint">Update once your shipping partners and returns window are final.</p>
              </div>
            </details>

            <details class="accordion">
              <summary>FAQ <span class="pill">Answers</span></summary>
              <div class="divider"></div>
              <div class="content">
                <p><strong>Is hydrogen inhalation safe?</strong><br/>
                  Safety depends on concentration, device design, ventilation, and correct use.
                  Always follow device instructions and use in a well-ventilated environment.
                </p>
                <p><strong>Do you make health claims?</strong><br/>
                  No. We position this for general wellness use and education. We do not claim to diagnose, treat, cure, or prevent disease.
                </p>
                <p><strong>Do I need to speak to my GP?</strong><br/>
                  If you have a medical condition or are unsure, consult a qualified clinician before using any inhalation-based wellness device.
                </p>
              </div>
            </details>
          </section>

          <section class="section" aria-label="Why complexfour">
            <div class="section-head">
              <h2>Why complexfour</h2>
              <p class="muted">A calmer, more credible approach to hydrogen wellness.</p>
            </div>

            <div class="compare">
              <div class="card">
                <div class="badge">Education-first</div>
                <h4>Clear, careful language</h4>
                <p>We avoid hype. You’ll find practical guidance and responsible disclaimers.</p>
              </div>
              <div class="card">
                <div class="badge">Simple checkout</div>
                <h4>Stripe-secure payments</h4>
                <p>Fast purchase flow with shipping/contact collected safely during checkout.</p>
              </div>
              <div class="card">
                <div class="badge">Single product focus</div>
                <h4>One device, done well</h4>
                <p>Instead of dozens of SKUs, we optimize one flagship for a smooth start.</p>
              </div>
            </div>
          </section>
        `;

        // Gallery swapping (works once images exist)
        const main = $("#galleryMain");
        const thumbsHost = $("#thumbs");
        function setMain(src){
          if (!main) return;
          const img = new Image();
          img.onload = () => { main.innerHTML = ""; img.alt = p.name; main.appendChild(img); };
          img.onerror = () => {};
          img.src = src;
        }

        thumbsHost?.addEventListener("click", (e) => {
          const btn = e.target.closest(".thumb");
          if (!btn) return;
          thumbsHost.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
          btn.classList.add("active");
          const src = btn.getAttribute("data-src");
          if (src) setMain(src);
        });

        // Hook into your existing cart + checkout (from app.js)
        $("#pdpAddToCart")?.addEventListener("click", () => {
          window.addToCart?.(p.id);
          // open cart dialog
          const dlg = $("#cartDialog");
          dlg?.showModal?.();
          window.renderCart?.();
        });

        $("#pdpBuyNow")?.addEventListener("click", async () => {
          try{
            window.addToCart?.(p.id);
            await window.checkout?.();
          }catch(err){
            alert(err?.message || "Checkout failed");
          }
        });

        // Keep price updated when currency changes (app.js already re-renders product detail,
        // but this page is custom, so we listen for currency select change)
        $("#currencySelect")?.addEventListener("change", () => {
          const priceEl = $("#pdpPrice");
          if (priceEl) priceEl.textContent = moneyDisplay(p) || "Shown at checkout";
        });
      }

      // Wait for app.js init() to load products.json
      // app.js runs immediately; we poll briefly until window.products is ready.
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        const p = getPrimaryProduct();
        if (p){
          clearInterval(timer);
          // Make sure global title reflects product
          document.title = `Buy The Device — complexfour`;
          renderPDP(p);
        } else if (tries > 60){
          clearInterval(timer);
          const host = $("#pdpHost");
          if (host) host.innerHTML = `<p class="muted">Loading product…</p>`;
        }
      }, 50);
    })();
  </script>

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <strong>complexfour</strong><br/>
        <span class="muted">Wellness equipment & education.</span>
      </div>
      <div class="footer-links">
        <a href="/products.html">Buy The Device</a>
        <a href="/about-hydrogen.html">About Hydrogen Inhalation</a>
        <a href="/about-complex-four.html">About Complex Four</a>
        <a href="/support.html">Support</a>
        <a href="/terms.html">Terms</a>
        <a href="/privacy.html">Privacy</a>
      </div>
    </div>
  </footer>
</body>
</html>
