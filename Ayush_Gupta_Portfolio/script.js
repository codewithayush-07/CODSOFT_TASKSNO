/* Portfolio script: theme toggle, mobile menu, scroll stuff, skills filter, contact form checks. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* theme toggle */
  var themeBtn = document.getElementById("theme-toggle");
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function currentTheme() {
    var set = doc.getAttribute("data-theme");
    if (set === "dark" || set === "light") return set;
    return darkQuery && darkQuery.matches ? "dark" : "light";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("ag-theme", next); } catch (e) {}
    });
  }

  /* mobile navigation */
  var nav = document.getElementById("site-nav");
  var navBtn = document.getElementById("nav-toggle");
  var header = document.querySelector(".site-header");

  function setNav(open) {
    if (!nav || !navBtn) return;
    nav.classList.toggle("is-open", open);
    navBtn.setAttribute("aria-expanded", String(open));
    navBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navBtn) {
    navBtn.addEventListener("click", function () {
      setNav(navBtn.getAttribute("aria-expanded") !== "true");
    });
  }
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navBtn && navBtn.getAttribute("aria-expanded") === "true") {
      setNav(false);
      navBtn.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (header && navBtn && navBtn.getAttribute("aria-expanded") === "true" && !header.contains(e.target)) setNav(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 832) setNav(false);
  });

  /* header shadow on scroll */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* active nav link + scroll reveal */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { sectionObserver.observe(s); });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min((i % 4) * 70, 210) + "ms";
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
    setActive("home");
  }

  /* skills filter */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var skillCards = Array.prototype.slice.call(document.querySelectorAll(".skill-card"));

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-filter");
      filterButtons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      skillCards.forEach(function (card) {
        var show = key === "all" || card.getAttribute("data-cat") === key;
        card.hidden = !show;
        if (show) card.classList.add("in");
      });
    });
  });

  /* hero role rotator */
  var rotator = document.getElementById("rotator");
  var roles = ["Full Stack Web Developer", "B.Tech CSE Student", "AI Enthusiast"];
  if (rotator && !reduceMotion) {
    var idx = 0;
    setInterval(function () {
      rotator.classList.add("is-out");
      setTimeout(function () {
        idx = (idx + 1) % roles.length;
        rotator.textContent = roles[idx];
        rotator.classList.remove("is-out");
      }, 350);
    }, 2800);
  }

  /* copy email */
  var copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy");
      function done(ok) {
        copyBtn.textContent = ok ? "Copied" : "Press Ctrl+C";
        setTimeout(function () { copyBtn.textContent = "Copy"; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  }
  function fallbackCopy(text, cb) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    cb(ok);
  }

  /* contact form validation */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var counter = document.getElementById("message-count");
  var TO_EMAIL = "ayushgupta7306@gmail.com";

  var rules = {
    name: function (v) {
      v = v.trim();
      if (v.length < 2) return "Enter your name (at least 2 characters).";
      if (!/^[A-Za-zÀ-ɏऀ-ॿ][A-Za-zÀ-ɏऀ-ॿ\s.'-]*$/.test(v)) return "Use letters only in your name.";
      return "";
    },
    email: function (v) {
      v = v.trim();
      if (!v) return "Enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, like name@example.com.";
      return "";
    },
    subject: function (v) {
      v = v.trim();
      if (v.length < 3) return "Enter a subject (at least 3 characters).";
      if (v.length > 100) return "Keep the subject under 100 characters.";
      return "";
    },
    message: function (v) {
      v = v.trim();
      if (v.length < 10) return "Write a message of at least 10 characters.";
      if (v.length > 1000) return "Keep the message under 1000 characters.";
      return "";
    }
  };

  function check(field) {
    var input = form.elements[field];
    var errEl = document.getElementById(field + "-error");
    var msg = rules[field](input.value);
    errEl.textContent = msg;
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      input.classList.remove("is-valid");
    } else {
      input.removeAttribute("aria-invalid");
      input.classList.add("is-valid");
    }
    return !msg;
  }

  Object.keys(rules).forEach(function (field) {
    var input = form.elements[field];
    input.addEventListener("blur", function () { if (input.value !== "") check(field); });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") check(field);
      if (field === "message" && counter) counter.textContent = input.value.length + " / 1000";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.classList.remove("is-error");

    var firstBad = null;
    Object.keys(rules).forEach(function (field) {
      if (!check(field) && !firstBad) firstBad = form.elements[field];
    });

    if (firstBad) {
      firstBad.focus();
      statusEl.textContent = "Please fix the highlighted fields and try again.";
      statusEl.classList.add("is-error");
      return;
    }

    // there's no backend, so this just opens the visitor's mail app with everything filled in
    var body = form.elements.message.value.trim() +
      "\n\n— " + form.elements.name.value.trim() +
      " (" + form.elements.email.value.trim() + ")";
    var href = "mailto:" + TO_EMAIL +
      "?subject=" + encodeURIComponent(form.elements.subject.value.trim()) +
      "&body=" + encodeURIComponent(body);

    statusEl.textContent = "Thanks! Your email app should open with the message ready to send. If it does not, copy my email address above.";
    window.location.href = href;

    setTimeout(function () {
      form.reset();
      Array.prototype.forEach.call(form.elements, function (el) { el.classList && el.classList.remove("is-valid"); });
      if (counter) counter.textContent = "0 / 1000";
    }, 600);
  });
})();
