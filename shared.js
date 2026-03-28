// shared.js — inject nav, footer, sticky bar, mobile menu, scroll animations
// Include this on every page: <script src="shared.js"></script>

function injectNav(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'services.html', label: 'Services' },
    { href: 'areas.html', label: 'Areas We Serve' },
    { href: 'junk-car.html', label: 'Junk Cars' },
    { href: 'blog.html', label: 'Blog' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="${p.label === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="navbar">
      <div class="container">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo">FLASH<span>TOWING</span>PDX</a>
          <div class="nav-links">${links}</div>
          <div class="nav-cta">
            <a href="tel:9713268952" class="nav-phone">📞 (971) 326-8952</a>
            <a href="index.html#book" class="btn btn-gold" style="padding:10px 20px;font-size:15px">Book a Tow</a>
          </div>
          <button id="menu-btn" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div id="mobile-menu">
      ${pages.map(p => `<a href="${p.href}" onclick="closeMobile()">${p.label}</a>`).join('')}
      <div class="mob-cta">
        <a href="tel:9713268952" class="btn btn-red" style="justify-content:center">📞 (971) 326-8952</a>
        <a href="index.html#book" class="btn btn-gold" style="justify-content:center" onclick="closeMobile()">Book Online</a>
      </div>
    </div>
  `);
}

function injectFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer id="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">FLASH<span>TOWING</span>PDX</a>
            <p>Portland's most trusted towing company. Licensed, insured, and available 24/7/365.</p>
            <div style="margin-top:20px"><a href="tel:9713268952" class="btn btn-gold" style="font-size:15px;padding:10px 20px">📞 Call Now</a></div>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="index.html#services">Local Towing</a></li>
              <li><a href="index.html#services">Long-Distance</a></li>
              <li><a href="index.html#services">Heavy-Duty</a></li>
              <li><a href="index.html#services">Emergency Towing</a></li>
              <li><a href="index.html#services">Roadside Assistance</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Pages</h4>
            <ul>
              <li><a href="areas.html">Areas We Serve</a></li>
              <li><a href="junk-car.html">Cash for Junk Cars</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="index.html#book">Book a Tow</a></li>
              <li><a href="index.html#faq">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <div class="footer-contact">
              <a href="tel:9713268952">📞 (971) 326-8952</a>
              <a href="#">📍 16531 NE Sandy Blvd Suite E<br>Portland, OR 97230</a>
              <a href="#">🕐 Open 24/7 — 365 Days</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 Flash Towing PDX. All Rights Reserved. Licensed & Insured.</p>
          <p>Serving Portland, OR since 2018 · <a href="tel:9713268952">(971) 326-8952</a></p>
        </div>
      </div>
    </footer>
    <div id="sticky-bar">
      <a href="tel:9713268952" class="s-call">📞 Call Now</a>
      <a href="index.html#book" class="s-book">📋 Book Online</a>
    </div>
  `);
}

function initShared(activePage) {
  injectNav(activePage);
  injectFooter();

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu toggle
  document.getElementById('menu-btn').onclick = function() {
    const m = document.getElementById('mobile-menu');
    m.classList.toggle('open');
    const s = this.querySelectorAll('span');
    if (m.classList.contains('open')) {
      s[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      s[1].style.cssText = 'opacity:0';
      s[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else { s.forEach(x => x.style.cssText = ''); }
  };

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.querySelectorAll('#menu-btn span').forEach(x => x.style.cssText = '');
}
