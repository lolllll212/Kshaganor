(function () {
  "use strict";

  const body = document.body;
  const header = document.getElementById("header");
  const preloader = document.getElementById("preloader");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const year = document.getElementById("year");
  const progress = document.getElementById("progress");
  const curtain = document.getElementById("curtain");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = String(new Date().getFullYear());

  const minLoader = 900;
  const start = performance.now();
  let loaderHidden = false;

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    const wait = Math.max(0, minLoader - (performance.now() - start));
    setTimeout(function () {
      body.classList.add("is-ready");
      if (preloader) {
        preloader.classList.add("is-done");
        setTimeout(function () {
          preloader.setAttribute("hidden", "");
        }, 800);
      }
    }, wait);
  }

  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 2800);

  function setProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.transform = "scaleX(" + p + ")";
  }

  let lastY = 0;
  function onScroll() {
    const y = window.scrollY || 0;
    if (header) {
      header.classList.toggle("is-scrolled", y > 18);
    }
    lastY = y;
    setProgress();

    if (!reduced) {
      const heroBg = document.querySelector(".hero-bg, .page-hero img");
      if (heroBg) {
        heroBg.style.transform = "translate3d(0," + y * 0.22 + "px,0) scale(1.08)";
      }
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeNav() {
    body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (mobileNav) mobileNav.setAttribute("hidden", "");
  }

  function openNav() {
    body.classList.add("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (mobileNav) mobileNav.removeAttribute("hidden");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (body.classList.contains("nav-open")) closeNav();
      else openNav();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          cio.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count") || "0");
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const decimals = (String(target).split(".")[1] || "").length;
    const duration = 1500;
    const t0 = performance.now();

    function frame(now) {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent =
        prefix +
        (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN")) +
        suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const required = form.querySelectorAll("[required]");
      let ok = true;
      required.forEach(function (field) {
        const empty = !String(field.value || "").trim();
        field.classList.toggle("is-invalid", empty);
        if (empty) ok = false;
      });
      const email = form.querySelector('input[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add("is-invalid");
        ok = false;
      }
      if (!ok) return;

      form.classList.add("is-sent");
      const note = document.getElementById("form-success");
      if (note) {
        note.hidden = false;
        note.focus();
      }
      form.reset();
    });

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("is-invalid");
      });
    });
  }

  if (!reduced) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (link.target === "_blank") return;
      const isInternal = href.endsWith(".html") || href.indexOf(".html#") !== -1;
      if (!isInternal) return;
      link.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        body.classList.add("is-leaving");
        if (curtain) curtain.classList.add("is-on");
        setTimeout(function () {
          window.location.href = link.href;
        }, 480);
      });
    });
  }
})();
