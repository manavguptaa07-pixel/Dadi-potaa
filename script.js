/* ================= SETTINGS ================= */
const CFG = {
  wa: "919729908016",
  phone: "+91 97299 08016",
  ig: "https://www.instagram.com/dadi_pota_ladoos/",
  igName: "@dadi_pota_ladoos",
  brand: "Dadi Pota Ladoo",
  // UPI payment settings: apna asli UPI ID yahan daalein (PhonePe/GPay/Paytm app mein "UPI ID" dekh kar)
  upi: "9729908016@ybl",
  upiName: "Dadi Pota Ladoo"
};
const PRICES = {
  premium: { "250g": 349, "500g": 679, "1kg": 1299 },
  classic: { "250g": 279, "500g": 549, "1kg": 1049 }
};
const PRODUCTS = [
  { id: "goond",  name: "Goond ke Ladoo",  cat: "premium", desc: "Goond, mewa aur shuddh desi ghee se bhare — taakat aur swad dono.", l1: "#e8b45a", l2: "#a8661a", tag: "Bestseller" },
  { id: "dry",    name: "Dry Fruit Ladoo", cat: "premium", desc: "Kaju, badam, pista aur kishmish ka shahi mel, desi ghee mein.",       l1: "#dca36a", l2: "#8a4f1c" },
  { id: "khajur", name: "Khajur Ladoo",    cat: "premium", desc: "Khajur ki natural meethas aur dher saare dry fruits ke saath.",      l1: "#a8683a", l2: "#4e2a10" },
  { id: "besan",  name: "Besan ke Ladoo",  cat: "classic", desc: "Dheemi aanch par bhune besan aur ghee ki khushboo — asli dadi wala.", l1: "#f4c04a", l2: "#c48a14", tag: "Favourite" },
  { id: "kangni", name: "Kangni ke Ladoo", cat: "classic", desc: "Purane zamane ka poshtik anaaj, naye zamane ka swad.",                l1: "#e6b86a", l2: "#a97520" },
  { id: "til",    name: "Til ke Ladoo",    cat: "classic", desc: "Kuchkuche til aur desi ghee — har mausam ka apna meetha.",            l1: "#c99a5e", l2: "#7a5420" }
];

/* ================= HELPERS ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rupee = n => "₹" + n.toLocaleString("en-IN");
const prod = id => PRODUCTS.find(p => p.id === id);

const ICONS = {
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.500-4.800 10-10 10z"/><path d="M2 21c0-3 1.900-5.500 5.500-7"/>',
  gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.500a2.500 2.500 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.500a2.500 2.500 0 0 0 0-5C13 2 12 7 12 7z"/>',
  phone: '<path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.5c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2z"/>',
  insta: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.400A4 4 0 1 1 12.600 8 4 4 0 0 1 16 11.400z"/><line x1="17.500" y1="6.500" x2="17.510" y2="6.500"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.900"/><path d="M16 3.100a4 4 0 0 1 0 7.800"/>',
  star: '<polygon points="12 2 15.100 8.300 22 9.300 17 14.100 18.200 21 12 17.800 5.800 21 7 14.100 2 9.300 8.900 8.300 12 2"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  cake: '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.500 2 4 2 2.500-2 4-2 2.500 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3M12 8v3M17 8v3"/>',
  ring: '<circle cx="12" cy="14" r="7"/><path d="M9 3l3 4 3-4"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
const WA_SVG = '<svg class="ic" viewBox="0 0 32 32" style="fill:currentColor;stroke:none"><path d="M16 3C9 3 3.300 8.600 3.300 15.500c0 2.400.7 4.700 1.900 6.600L3 29l7.100-2.100c1.800 1 3.800 1.500 5.900 1.500 7 0 12.700-5.600 12.700-12.500S23 3 16 3zm0 22.800c-1.900 0-3.700-.5-5.300-1.500l-.4-.2-4.200 1.200 1.300-4-.3-.4c-1.100-1.700-1.700-3.600-1.700-5.600C5.400 9.800 10.100 5.200 16 5.200s10.600 4.600 10.600 10.300S21.800 25.800 16 25.800zm5.800-7.600c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.6c.1-.2.200-.3.300-.5.100-.2.100-.4 0-.6-.1-.2-.7-1.700-1-2.300-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400-.3.300-1.200 1.100-1.200 2.700s1.200 3.100 1.400 3.400c.2.200 2.300 3.500 5.600 4.900.8.300 1.400.5 1.900.7.8.200 1.500.2 2.100.1.600-.1 1.900-.8 2.200-1.500.3-.8.300-1.400.2-1.500-.1-.2-.3-.3-.6-.4z"/></svg>';
const waLink = msg => `https://wa.me/${CFG.wa}?text=${encodeURIComponent(msg)}`;

/* ================= LAYOUT (header / footer / drawer) ================= */
const PAGES = [["index.html", "Home"], ["Menu.html", "Our Ladoos"], ["About.html", "Our Story"], ["Bulk.html", "Gifting & Bulk"], ["Contact.html", "Contact"]];
const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

function buildLayout() {
  const links = PAGES.map(([h, t]) => `<a href="${h}" class="${(current === h.toLowerCase() || (current === "" && h === "index.html")) ? "on" : ""}">${t}</a>`).join("");
  $("#app-header").outerHTML = `
  <header class="hdr" id="hdr"><div class="wrap">
    <a href="index.html" class="logo"><b>Dadi Pota Ladoo</b><small>Pure Desi Ghee</small></a>
    <nav class="menu" id="menu">${links}</nav>
    <div class="hdr-r">
      <button class="cart-btn" id="cartBtn" aria-label="Cart">${ic("cart")}<span id="cartCount">0</span></button>
      <a href="Menu.html" class="btn primary sm">Order Now</a>
      <button class="burger" id="burger" aria-label="Menu"><i></i><i></i><i></i></button>
    </div>
  </div></header>`;

  $("#app-footer").outerHTML = `
  <footer class="ftr"><div class="wrap">
    <div class="fgrid">
      <div>
        <a href="index.html" class="logo"><b>Dadi Pota Ladoo</b><small>Tradition ka Swad</small></a>
        <p>100% pure desi ghee ke ladoo, haath se bane, bina kisi preservative ke. Dadi ki recipe, pote ki mehnat.</p>
        <div class="social">
          <a href="${CFG.ig}" target="_blank" rel="noopener" aria-label="Instagram">${ic("insta")}</a>
          <a href="${waLink("Namaste! Mujhe ladoo ke baare mein jaankari chahiye.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_SVG}</a>
          <a href="tel:+919729908016" aria-label="Call">${ic("phone")}</a>
        </div>
      </div>
      <div><h5>Pages</h5><ul>${PAGES.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h5>Order & Contact</h5><ul>
        <li>WhatsApp / Call: <a href="tel:+919729908016">${CFG.phone}</a></li>
        <li>Instagram: <a href="${CFG.ig}" target="_blank" rel="noopener">${CFG.igName}</a></li>
        <li>Owners: Abhishek Siwach &amp; Laxmi Devi</li>
      </ul></div>
    </div>
    <div class="fbot">© ${new Date().getFullYear()} ${CFG.brand}. Healthy Bhi, Tasty Bhi.</div>
  </div></footer>
  <a class="float-wa" href="${waLink("Namaste! Mujhe ladoo order karne hain.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_SVG}</a>
  <div class="overlay" id="overlay"></div>
  <aside class="drawer" id="drawer" aria-label="Cart">
    <div class="dh"><h3>Aapka Cart</h3><button id="closeCart" aria-label="Close">✕</button></div>
    <div class="db" id="cartItems"></div>
    <div class="df" id="cartFoot">
      <div class="tot"><span>Total</span><b id="cartTotal">₹0</b></div>
      <form id="orderForm" novalidate>
        <input type="text" id="cName" placeholder="Poora Naam *" autocomplete="name">
        <input type="tel" id="cPhone" class="digits" placeholder="Mobile Number (10 digit) *" maxlength="10" inputmode="numeric" autocomplete="tel-national">
        <div class="r2">
          <input type="text" id="cCity" placeholder="Shehar *" autocomplete="address-level2">
          <input type="text" id="cPin" class="digits" placeholder="Pincode (6 digit) *" maxlength="6" inputmode="numeric" autocomplete="postal-code">
        </div>
        <textarea id="cAddr" rows="2" placeholder="Ghar / Gali / Area ka poora address *" autocomplete="street-address"></textarea>
        <input type="text" id="cNote" placeholder="Koi khaas baat? (optional)">
        <p class="err" id="formErr"></p>
        <button type="submit" class="btn primary block">Place Order · Payment Karein</button>
        <small>Next step mein UPI QR aayega. Payment ke baad order WhatsApp par confirm hoga.</small>
      </form>
    </div>
  </aside>
  <div class="pay-ov" id="payOv">
    <div class="pay" role="dialog" aria-modal="true" aria-label="Payment">
      <button class="pay-x" id="payClose" aria-label="Close">✕</button>
      <h3>Payment Karein</h3>
      <p class="pay-sub">Neeche QR ko kisi bhi UPI app (GPay, PhonePe, Paytm) se scan karein.</p>
      <div class="pay-amt">Payable: <b id="payAmt">₹0</b></div>
      <div class="qr" id="qrBox"></div>
      <div class="upi-row"><span id="upiId"></span><button type="button" id="copyUpi">Copy UPI ID</button></div>
      <a class="btn gold block pay-app" id="payApp" href="#">UPI App se Pay Karein</a>
      <label class="utr"><span>UPI Transaction ID / UTR (optional)</span>
        <input type="text" id="utr" class="digits" maxlength="12" inputmode="numeric" placeholder="12 digit UTR number"></label>
      <p class="err" id="payErr"></p>
      <button type="button" class="btn wa block" id="payDone">${WA_SVG} Payment Ho Gaya · Order Confirm Karein</button>
      <small>Payment karne ke baad ye button dabayein. Order details WhatsApp par khul jayengi.</small>
    </div>
  </div>
  <div class="toast" id="toast"></div>`;

  // icons placeholders
  $$("[data-ic]").forEach(el => el.innerHTML = ic(el.dataset.ic));
}

/* ================= CART ================= */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("dpl_cart")) || []; } catch (e) { cart = []; }
const saveCart = () => { try { localStorage.setItem("dpl_cart", JSON.stringify(cart)); } catch (e) {} };
const linePrice = i => PRICES[prod(i.id).cat][i.w] * i.q;
const total = () => cart.reduce((s, i) => s + linePrice(i), 0);

function renderCart() {
  saveCart();
  $("#cartCount").textContent = cart.reduce((s, i) => s + i.q, 0);
  const box = $("#cartItems");
  if (!cart.length) {
    box.innerHTML = `<div class="empty"><div class="ball"></div><p>Cart abhi khaali hai.<br>Apne pasand ke ladoo chuniye!</p><br><a href="Menu.html" class="btn primary sm">Ladoo Dekhein</a></div>`;
    $("#cartFoot").style.display = "none";
    return;
  }
  $("#cartFoot").style.display = "block";
  box.innerHTML = cart.map((i, k) => {
    const p = prod(i.id);
    return `<div class="ci"><div class="ball" style="--l1:${p.l1};--l2:${p.l2}"></div>
      <div class="inf"><b>${p.name}</b><small>${i.w} · ${rupee(PRICES[p.cat][i.w])}</small>
      <button class="rm" data-k="${k}" data-a="x">Hatayein</button></div>
      <div class="qty"><button data-k="${k}" data-a="-">−</button><span>${i.q}</span><button data-k="${k}" data-a="+">+</button></div></div>`;
  }).join("");
  $("#cartTotal").textContent = rupee(total());
}
const openCart = () => { $("#drawer").classList.add("open"); $("#overlay").classList.add("open"); };
const closeCart = () => { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open"); };

let tt;
function toast(t) {
  const el = $("#toast"); el.textContent = t; el.classList.add("show");
  clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 2400);
}

function fly(from) {
  const to = $("#cartBtn").getBoundingClientRect(), f = from.getBoundingClientRect();
  const d = from.cloneNode(true);
  Object.assign(d.style, { position: "fixed", left: f.left + "px", top: f.top + "px", width: f.width + "px", height: f.height + "px", margin: 0, zIndex: 500, pointerEvents: "none" });
  document.body.appendChild(d);
  d.animate([
    { transform: "translate(0,0) scale(1)", opacity: 1 },
    { transform: `translate(${to.left - f.left}px,${to.top - f.top}px) scale(.18)`, opacity: .5 }
  ], { duration: 800, easing: "cubic-bezier(.55,-.15,.7,1)" }).onfinish = () => d.remove();
}

/* ================= PRODUCT CARDS ================= */
function cardHTML(p) {
  return `<article class="card rv" data-id="${p.id}" data-w="500g" data-q="1">
    <div class="stage">${p.tag ? `<span class="tagp">${p.tag}</span>` : ""}<div class="ball" style="--l1:${p.l1};--l2:${p.l2}"></div></div>
    <span class="catp">${p.cat === "premium" ? "Premium" : "Classic"}</span>
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <div class="seg">${Object.keys(PRICES[p.cat]).map(w => `<button type="button" data-w="${w}" class="${w === "500g" ? "on" : ""}">${w}</button>`).join("")}</div>
    <div class="buy"><div class="price">${rupee(PRICES[p.cat]["500g"])}</div>
      <div class="qty"><button type="button" data-q="-">−</button><span>1</span><button type="button" data-q="+">+</button></div></div>
    <button type="button" class="btn primary block add">${ic("cart")} Cart mein Daalein</button>
  </article>`;
}
function updateCardPrice(card) {
  const p = prod(card.dataset.id);
  const el = $(".price", card);
  el.textContent = rupee(PRICES[p.cat][card.dataset.w] * +card.dataset.q);
  el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
}
function renderProducts() {
  const g = $("#productGrid");
  if (g) {
    const draw = f => { g.innerHTML = PRODUCTS.filter(p => f === "all" || p.cat === f).map(cardHTML).join(""); initReveal(); };
    draw("all");
    $$(".tabs button").forEach(b => b.onclick = () => { $$(".tabs button").forEach(x => x.classList.remove("on")); b.classList.add("on"); draw(b.dataset.f); });
  }
  const f = $("#featuredGrid");
  if (f) f.innerHTML = ["goond", "dry", "besan", "til"].map(id => cardHTML(prod(id))).join("");
}

/* ================= GLOBAL CLICK HANDLING (delegated — always works) ================= */
document.addEventListener("click", e => {
  const t = e.target;

  // weight select
  const wb = t.closest(".seg button");
  if (wb) {
    const card = wb.closest(".card");
    $$(".seg button", card).forEach(b => b.classList.remove("on"));
    wb.classList.add("on");
    card.dataset.w = wb.dataset.w;
    updateCardPrice(card);
    return;
  }
  // qty on card
  const qb = t.closest(".card .qty button");
  if (qb) {
    const card = qb.closest(".card");
    let q = +card.dataset.q + (qb.dataset.q === "+" ? 1 : -1);
    q = Math.max(1, Math.min(20, q));
    card.dataset.q = q;
    $(".qty span", card).textContent = q;
    updateCardPrice(card);
    return;
  }
  // add to cart
  const add = t.closest(".add");
  if (add) {
    const card = add.closest(".card"), p = prod(card.dataset.id), w = card.dataset.w, q = +card.dataset.q;
    const ex = cart.find(i => i.id === p.id && i.w === w);
    if (ex) ex.q = Math.min(50, ex.q + q); else cart.push({ id: p.id, w, q });
    renderCart();
    fly($(".stage .ball", card));
    toast(`${p.name} (${w}) cart mein add hua`);
    const cb = $("#cartBtn"); cb.classList.remove("bump"); void cb.offsetWidth; setTimeout(() => cb.classList.add("bump"), 700);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  // cart item controls
  const cb = t.closest("#cartItems button[data-k]");
  if (cb) {
    const k = +cb.dataset.k, a = cb.dataset.a;
    if (a === "+") cart[k].q = Math.min(50, cart[k].q + 1);
    else if (a === "-") cart[k].q--;
    else cart.splice(k, 1);
    cart = cart.filter(x => x.q > 0);
    renderCart();
    return;
  }
  if (t.closest("#cartBtn")) return openCart();
  if (t.closest("#closeCart") || t.id === "overlay") return closeCart();
  if (t.closest("#burger")) { $("#burger").classList.toggle("open"); $("#menu").classList.toggle("open"); return; }
  if (t.closest("#menu a")) { $("#menu").classList.remove("open"); $("#burger").classList.remove("open"); }

  // ripple on buttons
  const btn = t.closest(".btn");
  if (btn) {
    const r = btn.getBoundingClientRect(), s = document.createElement("span");
    const size = Math.max(r.width, r.height);
    s.className = "ripple";
    s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(s); setTimeout(() => s.remove(), 600);
  }
});

/* ================= WHATSAPP: CART ORDER ================= */
let pending = null;

function makeQR(el, text) {
  el.innerHTML = "";
  const draw = () => new QRCode(el, { text, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
  if (window.QRCode) return draw();
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  s.onload = draw;
  s.onerror = () => { el.innerHTML = `<img alt="UPI QR" width="220" height="220" src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(text)}">`; };
  document.head.appendChild(s);
}
function openPay() {
  const amt = pending.amount;
  const upiUrl = `upi://pay?pa=${CFG.upi}&pn=${encodeURIComponent(CFG.upiName)}&am=${amt.toFixed(2)}&cu=INR&tn=${encodeURIComponent(CFG.brand + " Order")}`;
  $("#payAmt").textContent = rupee(amt);
  $("#upiId").textContent = CFG.upi;
  $("#payApp").href = upiUrl;
  $("#utr").value = ""; $("#payErr").textContent = "";
  makeQR($("#qrBox"), upiUrl);
  $("#payOv").classList.add("open");
}
const closePay = () => $("#payOv").classList.remove("open");

// Place Order -> validate -> UPI QR
document.addEventListener("submit", e => {
  if (e.target.id !== "orderForm") return;
  e.preventDefault();
  const v = id => $("#" + id).value.trim(), err = $("#formErr");
  const name = v("cName"), phone = v("cPhone"), city = v("cCity"), pin = v("cPin"), addr = v("cAddr"), note = v("cNote");
  if (!cart.length) return (err.textContent = "Cart khaali hai.");
  if (name.length < 2) return (err.textContent = "Kripya apna poora naam likhein.");
  if (!/^[6-9]\d{9}$/.test(phone)) return (err.textContent = "Mobile number sirf 10 digit ka hona chahiye.");
  if (city.length < 2) return (err.textContent = "Kripya shehar ka naam likhein.");
  if (!/^\d{6}$/.test(pin)) return (err.textContent = "Pincode 6 digit ka hona chahiye.");
  if (addr.length < 8) return (err.textContent = "Kripya poora address likhein.");
  err.textContent = "";
  pending = { name, phone, city, pin, addr, note, amount: total(), items: cart.map(i => ({ ...i })) };
  openPay();
});

// Payment done -> WhatsApp
document.addEventListener("click", e => {
  if (e.target.closest("#payClose") || e.target.id === "payOv") return closePay();
  if (e.target.closest("#copyUpi")) {
    (navigator.clipboard ? navigator.clipboard.writeText(CFG.upi) : Promise.reject()).then(() => toast("UPI ID copy ho gayi")).catch(() => toast(CFG.upi));
    return;
  }
  if (!e.target.closest("#payDone") || !pending) return;
  const utr = $("#utr").value.trim();
  if (utr && !/^\d{12}$/.test(utr)) return ($("#payErr").textContent = "UTR 12 digit ka hota hai. Khaali chhod sakte hain.");
  let msg = `*Naya Order - ${CFG.brand}*\n\n`;
  pending.items.forEach((i, n) => { msg += `${n + 1}. ${prod(i.id).name} (${i.w}) x ${i.q} = ${rupee(linePrice(i))}\n`; });
  msg += `\n*Total: ${rupee(pending.amount)}*\n*Payment: UPI se ${rupee(pending.amount)} kiya gaya*`;
  if (utr) msg += ` (UTR: ${utr})`;
  msg += `\n(Delivery charges alag se confirm honge)\n\n*Delivery Details*\nNaam: ${pending.name}\nMobile: ${pending.phone}\nAddress: ${pending.addr}, ${pending.city} - ${pending.pin}\n`;
  if (pending.note) msg += `Note: ${pending.note}\n`;
  msg += `\nKripya payment verify karke order confirm karein. Dhanyavaad!`;
  window.open(waLink(msg), "_blank");
  cart = []; pending = null; renderCart(); closePay(); closeCart();
  toast("Order WhatsApp par bheja ja raha hai");
});
addEventListener("keydown", e => { if (e.key === "Escape") { closePay(); closeCart(); } });

// sirf digits wale fields (mobile, pincode, UTR)
document.addEventListener("input", e => {
  if (e.target.classList && e.target.classList.contains("digits")) e.target.value = e.target.value.replace(/\D/g, "");
});

/* ================= WHATSAPP: GENERIC FORMS (bulk / contact) ================= */
function wireWaForm(formId, title) {
  const form = $("#" + formId); if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = $(".err", form); err.textContent = "";
    const d = {};
    $$("[name]", form).forEach(el => d[el.name] = el.value.trim());
    if (!d.name || d.name.length < 2) return (err.textContent = "Kripya apna naam likhein.");
    if (!/^[6-9]\d{9}$/.test(d.phone || "")) return (err.textContent = "Sahi 10 digit mobile number daalein.");
    let msg = `*${title} - ${CFG.brand}*\n\n`;
    $$("[name]", form).forEach(el => {
      if (el.value.trim()) msg += `${el.dataset.label || el.name}: ${el.value.trim()}\n`;
    });
    window.open(waLink(msg), "_blank");
    toast("WhatsApp khul raha hai, message bhej dein");
  });
}

/* ================= EFFECTS ================= */
let io;
function initReveal() {
  if (!io) io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    $$("[data-count]", en.target).forEach(countUp);
    if (en.target.dataset.count) countUp(en.target);
    io.unobserve(en.target);
  }), { threshold: .12 });
  $$(".rv:not(.in)").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + "ms"; io.observe(el); });
}
function countUp(el) {
  if (el.dataset.done) return; el.dataset.done = 1;
  const end = +el.dataset.count, suf = el.dataset.suf || "";
  if (!end) { el.textContent = "0" + suf; return; }
  let n = 0; const step = Math.max(1, Math.ceil(end / 50));
  const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = n + suf; if (n >= end) clearInterval(t); }, 28);
}
function initFx() {
  const hdr = $("#hdr");
  const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // photo tilt + parallax floaters
  $$(".arch").forEach(a => {
    if (!matchMedia("(hover:hover)").matches) return;
    a.addEventListener("mousemove", e => {
      const r = a.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      a.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    a.addEventListener("mouseleave", () => a.style.transform = "");
  });

  // smooth page-leave fade
  $$("a[href]").forEach(a => {
    const h = a.getAttribute("href");
    if (!h || h.startsWith("#") || h.startsWith("http") || h.startsWith("tel:") || a.target === "_blank") return;
    a.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault(); document.body.classList.add("leaving");
      setTimeout(() => location.href = h, 220);
    });
  });
}

/* ================= INIT ================= */
buildLayout();
renderProducts();
renderCart();
initReveal();
initFx();
wireWaForm("bulkForm", "Bulk / Gifting Enquiry");
wireWaForm("contactForm", "Naya Message");
addEventListener("pageshow", () => document.body.classList.remove("leaving"));
