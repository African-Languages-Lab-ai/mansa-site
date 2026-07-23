(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var productBtn = document.querySelector(".nav-product");
  var megaItem = document.querySelector(".has-mega");

  var mqMobile = window.matchMedia("(max-width: 900px)");

  /* --- Hamburger (mobile) --- */
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (!open) closeMega();
    });
  }

  /* --- Product mega dropdown --- */
  function openMega() {
    megaItem.classList.add("open");
    productBtn.setAttribute("aria-expanded", "true");
  }
  function closeMega() {
    if (!megaItem) return;
    megaItem.classList.remove("open");
    productBtn.setAttribute("aria-expanded", "false");
  }

  if (productBtn) {
    productBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (megaItem.classList.contains("open")) closeMega();
      else openMega();
    });
  }

  /* --- Close the mega on any outside click --- */
  document.addEventListener("click", function (e) {
    if (megaItem && !megaItem.contains(e.target)) closeMega();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMega();
      if (header.classList.contains("menu-open") && toggle) toggle.click();
    }
  });

  /* --- Reset state when crossing the breakpoint --- */
  var lastMobile = mqMobile.matches;
  window.addEventListener("resize", function () {
    if (mqMobile.matches !== lastMobile) {
      lastMobile = mqMobile.matches;
      header.classList.remove("menu-open");
      closeMega();
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    }
  });

  /* --- Products accordion --- */
  var accHeaders = document.querySelectorAll(".acc-header");
  accHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      var item = header.closest(".acc-item");
      var isOpen = item.classList.toggle("is-open");
      header.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  /* --- Supported Languages: interactive globe --- */
  var globeStage = document.getElementById("globe-stage");
  if (globeStage) {
    var setActive = function (lang) {
      globeStage.classList.toggle("has-active", !!lang);
      globeStage.querySelectorAll("[data-lang]").forEach(function (el) {
        el.classList.toggle("is-active", lang && el.getAttribute("data-lang") === lang);
      });
    };
    globeStage.querySelectorAll(".lang-item, .lang-line, .lang-dot-svg").forEach(function (el) {
      var lang = el.getAttribute("data-lang");
      el.addEventListener("mouseenter", function () { setActive(lang); });
      el.addEventListener("focus", function () { setActive(lang); });
    });
    globeStage.addEventListener("mouseleave", function () { setActive(null); });
    globeStage.querySelectorAll(".lang-item").forEach(function (btn) {
      btn.addEventListener("blur", function () { setActive(null); });
      btn.addEventListener("click", function () { setActive(btn.getAttribute("data-lang")); });
    });
  }

  /* --- How Teams Use Mansa: tabs --- */
  var ucTabs = document.getElementById("usecases-tabs");
  var ucTitle = document.getElementById("uc-title");
  var ucDesc = document.getElementById("uc-desc");
  var ucContent = {
    support: {
      title: "Deliver multilingual support that feels local.",
      desc: "Resolve customer queries, power AI chatbots, and provide real-time assistance across African languages."
    },
    localization: {
      title: "Localize products without losing meaning.",
      desc: "Adapt apps, websites, and content into African languages while preserving tone, nuance, and cultural context."
    },
    research: {
      title: "Accelerate research across African languages.",
      desc: "Analyze, transcribe, and translate interviews, field notes, and papers at scale."
    },
    development: {
      title: "Build multilingual features faster.",
      desc: "Drop Mansa's API into your product to add African-language chat, translation, and transcription in minutes."
    },
    education: {
      title: "Teach and learn in the languages that matter.",
      desc: "Create lesson content, tutoring assistants, and study tools that speak your students' languages."
    },
    operations: {
      title: "Run day-to-day operations across languages.",
      desc: "Draft communications, summarize reports, and coordinate teams across African languages from one assistant."
    }
  };
  if (ucTabs) {
    ucTabs.querySelectorAll(".uc-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        ucTabs.querySelectorAll(".uc-tab").forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        var data = ucContent[tab.getAttribute("data-tab")];
        if (data) {
          ucTitle.textContent = data.title;
          ucDesc.textContent = data.desc;
        }
      });
    });
  }

  /* --- FAQs accordion --- */
  var faqQuestions = document.querySelectorAll(".faq-q");
  faqQuestions.forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var isOpen = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  /* --- Impact video: muted background autoplay + play/pause toggle --- */
  var impactVideo = document.getElementById("impact-video");
  var impactToggle = document.getElementById("impact-video-toggle");
  if (impactVideo && impactToggle) {
    var syncToggle = function () {
      impactToggle.classList.toggle("is-playing", !impactVideo.paused);
      impactToggle.setAttribute("aria-label", impactVideo.paused ? "Play video" : "Pause video");
    };
    impactToggle.addEventListener("click", function () {
      if (impactVideo.paused) impactVideo.play();
      else impactVideo.pause();
    });
    impactVideo.addEventListener("play", syncToggle);
    impactVideo.addEventListener("pause", syncToggle);
    syncToggle();
  }

  /* --- Parallax: background/visual layers drift slower than scroll --- */
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MAX_PARALLAX_OFFSET = 60; // px - keeps the shift subtle and always inside the scaled-up bleed

  if (!reduceMotion && parallaxEls.length) {
    var ticking = false;

    var updateParallax = function () {
      var vh = window.innerHeight;

      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax"));
        if (isNaN(speed)) speed = 0.15;
        var scale = parseFloat(el.getAttribute("data-parallax-scale"));
        if (isNaN(scale)) scale = 1.12;
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var offset = (center - vh / 2) * speed;
        if (offset > MAX_PARALLAX_OFFSET) offset = MAX_PARALLAX_OFFSET;
        if (offset < -MAX_PARALLAX_OFFSET) offset = -MAX_PARALLAX_OFFSET;
        el.style.transform = "scale(" + scale + ") translateY(" + offset.toFixed(1) + "px)";
      });

      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }

  /* --- Mansa Agent page: FAQ accordion --- */
  var afQuestions = document.querySelectorAll(".af-q");
  afQuestions.forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".af-item");
      var isOpen = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  /* --- Nav: frosted-translucent background once scrolled --- */
  if (header) {
    var headerScrollTick = false;
    var syncHeader = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
      headerScrollTick = false;
    };
    window.addEventListener("scroll", function () {
      if (!headerScrollTick) {
        window.requestAnimationFrame(syncHeader);
        headerScrollTick = true;
      }
    }, { passive: true });
    syncHeader();
  }

  /* --- Scroll reveal: sections & footer rise + fade in on entering view --- */
  var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("main > section, .site-footer");
  if (revealEls.length && !prefersReduce) {
    revealEls.forEach(function (el) { el.classList.add("reveal"); });

    var revealInView = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revealEls.forEach(function (el) {
        if (!el.classList.contains("is-visible") &&
            el.getBoundingClientRect().top < vh * 0.92) {
          el.classList.add("is-visible");
        }
      });
    };

    if ("IntersectionObserver" in window) {
      var revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { revealIO.observe(el); });
    } else {
      window.addEventListener("scroll", revealInView, { passive: true });
    }

    // Reveal whatever is already on screen now (runs pre-paint in a real browser,
    // so above-the-fold never flashes) and re-check once layout has fully settled.
    revealInView();
    window.addEventListener("load", revealInView);
  }

  /* --- Generic DOM-driven tab groups (works across any page/section) ---
     Markup contract:
       <div class="au-tabs" data-tabs="GROUP">
         <button class="au-tab is-active" data-tab="key">Label</button>
         ...
       </div>
       <div data-tab-panel="GROUP" data-tab-value="key">...content...</div>
       <div data-tab-panel="GROUP" data-tab-value="other" hidden>...content...</div>
  --- */
  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    var group = tabs.getAttribute("data-tabs");
    var panels = document.querySelectorAll('[data-tab-panel="' + group + '"]');
    tabs.querySelectorAll(".au-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var value = tab.getAttribute("data-tab");
        tabs.querySelectorAll(".au-tab").forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        panels.forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-tab-value") !== value;
        });
      });
    });
  });
})();
