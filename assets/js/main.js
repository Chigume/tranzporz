(function ($) {
  "use strict";


  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. Preloader
    02. Mobile Menu Active
    03. Sticky fix
    04. Scroll To Top
    05. Set Background Image
    06. Global Slider
    07. Ajax Contact Form
    08. Magnific Popup
    09. Filter
    10. Popup Sidemenu   
    11. Counter section
    12. side cart toggle
    13. Search Box Popup
    14. Lenis Library Support
    15. Split Text Animation With GSAP Plugins
    16. Active Menu Item Based On URL
    17. Back to Top
    18. Nice Select
    19. package tab
    20. FIle Upload
    21. countdown timer
    22. Renge
    23. hero animate
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

 /* -----------------------
     Helper utilities
  ----------------------- */
  const safeQuery = (selector, context = document) =>
    context ? context.querySelector(selector) : null;

  const safeQueryAll = (selector, context = document) =>
    context ? Array.from(context.querySelectorAll(selector)) : [];

  const isFunction = (v) => typeof v === "function";

  const noop = () => {};

  const safeInit = (fn) => {
    try {
      if (isFunction(fn)) fn();
    } catch (err) {
      
    }
  };
 /* ===========================
      01. Preloader
  =========================== */
  $(window).on("load", function () {
    try {
      const $preloader = $(".preloader");
      const $preloaderClose = $(".preloaderCls");

      // Preloader exists?
      if ($preloader.length) {
        // GSAP safe check
        if (typeof gsap !== "undefined" && typeof gsap.to === "function") {
          gsap.to(".preloader", {
            y: "-100%",
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: function () {
              $preloader.hide();
            },
          });
        } else {
          $preloader.fadeOut(500);
        }
        if ($preloaderClose.length) {
          $preloaderClose.on("click", function (e) {
            e.preventDefault();

            if (typeof gsap !== "undefined") {
              gsap.to(".preloader", {
                y: "-100%",
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: function () {
                  $preloader.hide();
                },
              });
            } else {
              $preloader.fadeOut(500);
            }
          });
        }
      }

      /* AOS Safe Init */
      if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
        AOS.init({
          once: true,
        });
      }
    } catch (err) {
      console.warn("Preloader init failed:", err);
    }
  });

  /*---------- 02. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 03. Header  Start ----------*/
  $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
  // drop down menu width overflow problem fix
  $('ul').parent('li').on('hover', function () {
      var menu = $(this).find("ul");
      var menupos = $(menu).offset();
      if (menupos.left + menu.width() > $(window).width()) {
          var newpos = -$(menu).width();
          menu.css({
              left: newpos
          });
      }
  });

  $('.menu li a').on('click', function (e) {
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
          element.removeClass('open');
          element.find('li').removeClass('open');
          element.find('ul').slideUp(300, "swing");
      } else {
          element.addClass('open');
          element.children('ul').slideDown(300, "swing");
          element.siblings('li').children('ul').slideUp(300, "swing");
          element.siblings('li').removeClass('open');
          element.siblings('li').find('li').removeClass('open');
          element.siblings('li').find('ul').slideUp(300, "swing");
      }
  })
  $('.ellepsis-bar').on('click', function (e) {
      var element = $('.header-top');
      if (element.hasClass('open')) {
          element.removeClass('open');
          element.slideUp(300, "swing");
          $('.overlayTwo').removeClass('active');
      } else {
          element.addClass('open');
          element.slideDown(300, "swing");
          $('.overlayTwo').addClass('active');
      }
  });
  $('.header-bar').on('click', function () {
      $(this).toggleClass('active');
      $('.menu').toggleClass('active');
  })


  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({
          scrollTop: 0,
        },
        lastScrollTop / 3
      );
      return false;
    });
  });

  /*---------- 06. Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

 /*---------- 07. hero slider ----------*/

  document.addEventListener("DOMContentLoaded", function () {

    function applyAnimationDelays() {

      const activeSlide = document.querySelector(
        ".vs-hero__active--zoom .swiper-slide-active:not(.swiper-slide-duplicate)"
      );

      if (!activeSlide) return;

      const animElements = activeSlide.querySelectorAll(".vs-hero__anim");

      animElements.forEach((el, index) => {

        el.classList.remove("manimated");
        el.style.animationDelay = "";

        
        const delay = 1.3 + index * 0.2;
        el.style.animationDelay = `${delay}s`;

        void el.offsetWidth;
        el.classList.add("manimated");

      });
    }

    const hero_slider = new Swiper(".vs-hero__active--zoom", {
      slidesPerView: 1,
      speed: 1500,
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: false,

      navigation: {
        nextEl: ".vs-swiper-button-next",
        prevEl: ".vs-swiper-button-prev",
      },

      pagination: {
        el: ".vs-hero-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"><i class="fas fa-star"></i></span>';
        },
      },

      // 🔥 FIX HERE (NO .on outside)
      on: {
        init: function () {
          applyAnimationDelays();
        },
        slideChangeTransitionStart: function () {
          applyAnimationDelays();
        }
      }

    });

  });

/*---------- 08. Global Swiper Initialization ----------*/
  document.querySelectorAll('.vs-carousel').forEach((carousel) => {

  if (!carousel.querySelector('.swiper-wrapper')) return;

  const d = (name, fallback) => {
    const val = carousel.dataset[name];
    const num = parseInt(val, 10);
    return Number.isNaN(num) ? fallback : num;
  };

  const slidesXs = d('xs', 1);
  const slidesSm = d('sm', 1);
  const slidesMd = d('md', 2);
  const slidesLg = d('lg', 3);
  const slidesXl = d('xl', 4);
  const slidesXXl = d('xxl', 4);
  const slidesEXl = d('exl', 4);

  const spaceXs = d('spaceXs', 10);
  const spaceSm = d('spaceSm', 15);
  const spaceMd = d('spaceMd', 20);
  const spaceLg = d('spaceLg', 24);
  const spaceXl = d('spaceXl', 30);
  const spaceXXl = d('spaceXXl', 30);
  const spaceEXl = d('spaceEXl', 30);

  const slides = carousel.querySelectorAll('.swiper-slide');
  const totalSlides = slides.length;
  const loopEnabled = totalSlides > slidesLg;

  /* ---------- SAFE NAVIGATION ---------- */
  const nextBtn = carousel.dataset.navNext
    ? document.querySelector(carousel.dataset.navNext)
    : null;

  const prevBtn = carousel.dataset.navPrev
    ? document.querySelector(carousel.dataset.navPrev)
    : null;

  const navigation =
    nextBtn && prevBtn
      ? { nextEl: nextBtn, prevEl: prevBtn }
      : false;

  /* ---------- SAFE PAGINATION ---------- */
  const paginationEl = carousel.dataset.pagination
    ? document.querySelector(carousel.dataset.pagination)
    : null;

  const pagination = paginationEl
    ? { el: paginationEl, clickable: true }
    : false;

  /* ---------- AUTOPLAY (single source) ---------- */
  const autoplay =
    carousel.dataset.autoplay === "true"
      ? {
          delay: d("autoplayDelay", 4000),
          disableOnInteraction: false,
        }
      : false;

  /* ---------- INIT SWIPER ---------- */
  const swiper = new Swiper(carousel, {
    slidesPerView: slidesLg,
    spaceBetween: spaceLg,
    loop: loopEnabled,
    centeredSlides: carousel.dataset.centered === "true",

    autoplay, // ✅ only one autoplay used

    navigation,
    pagination,

    breakpoints: {
      320:  { slidesPerView: slidesXs, spaceBetween: spaceXs },
      576:  { slidesPerView: slidesSm, spaceBetween: spaceSm },
      768:  { slidesPerView: slidesMd, spaceBetween: spaceMd },
      992:  { slidesPerView: slidesLg, spaceBetween: spaceLg },
      1200: { slidesPerView: slidesXl, spaceBetween: spaceXl },
      1300: { slidesPerView: slidesXXl, spaceBetween: spaceXXl },
      1700: { slidesPerView: slidesEXl, spaceBetween: spaceEXl },
    },
  });

  /* *************************************
  ***** Service Slider UI (01–04 + Progress)
  ************************************* */
  if (carousel.dataset.service === "true") {

    const currentEl = carousel.dataset.current
      ? document.querySelector(carousel.dataset.current)
      : null;

    const totalEl = carousel.dataset.total
      ? document.querySelector(carousel.dataset.total)
      : null;

    const lineEl = carousel.dataset.line
      ? document.querySelector(carousel.dataset.line)
      : null;

    if (!currentEl || !totalEl || !lineEl) return;

    const realTotal = loopEnabled ? totalSlides : swiper.slides.length;
    totalEl.textContent = String(realTotal).padStart(2, "0");

    const updateUI = () => {
      const index = swiper.realIndex + 1;
      currentEl.textContent = String(index).padStart(2, "0");

      const progress = (index / realTotal) * 100;
      lineEl.style.background =
        `linear-gradient(to right, #e22222 ${progress}%, #ddd 0)`;
    };

    updateUI();
    swiper.on("slideChange", updateUI);
  }

});


/*---------- 09. Project Swiper ----------*/

const projectSwiper = new Swiper(".projectSwiper", {
  slidesPerView: "auto",
  spaceBetween: 40,
  centeredSlides: true,
  loop: true,
  speed: 600,

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  on: {
    autoplayTimeLeft(s, time, progress) {
      document.querySelector(".progress-fill").style.width =
        `${(1 - progress) * 100}%`;
    }
  }
});

/*---------- 10. Testimonial SWIPER ----------*/
document.addEventListener("DOMContentLoaded", function () {
  if (typeof Swiper === "undefined") return;

  // Left thumbs
  const leftThumbs = new Swiper(".leftThumbs", {
    slidesPerView: 1,
    allowTouchMove: false, 
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 800,
  });

  // Right thumbs
  const rightThumbs = new Swiper(".rightThumbs", {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 800,
  });

  // Main slider
  const testiSwiper = new Swiper(".testi-slider", {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".testi-button-next",
      prevEl: ".testi-button-prev",
    },
    pagination: {
      el: ".testi-pagination",
      type: "progressbar",
    },
    on: {
      slideChange: function () {
        const total = this.slides.length;
        const activeIndex = this.realIndex;

       
        const prevIndex = (activeIndex - 1 + total) % total;
        leftThumbs.slideTo(prevIndex);

     
        const nextIndex = (activeIndex + 1) % total;
        rightThumbs.slideTo(nextIndex);
      }
    }
  });

  // Thumbnail click → main slider control
  document.querySelectorAll(".leftThumbs .swiper-slide, .rightThumbs .swiper-slide")
    .forEach((slide, index) => {
      slide.addEventListener("click", () => {
        testiSwiper.slideToLoop(index);
      });
    });
});

/*----------- 11. Ajax Contact Form ----------*/
  var form = ".ajax-contact";
  var invalidCls = "is-invalid";
  var $email = '[name="email"]';
  var $validation =
    '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
  var formMessages = $(".form-messages");

  function sendContact() {
    var formData = $(form).serialize();
    var valid;
    valid = validateContact();
    if (valid) {
      jQuery
        .ajax({
          url: $(form).attr("action"),
          data: formData,
          type: "POST",
        })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          formMessages.removeClass("error");
          formMessages.addClass("success");
          // Set the message text.
          formMessages.text(response);
          // Clear the form.
          $(form + ' input:not([type="submit"]),' + form + " textarea").val("");
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass("success");
          formMessages.addClass("error");
          // Set the message text.
          if (data.responseText !== "") {
            formMessages.html(data.responseText);
          } else {
            formMessages.html(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    }
  }

  function validateContact() {
    var valid = true;
    var formInput;

    function unvalid($validation) {
      $validation = $validation.split(",");
      for (var i = 0; i < $validation.length; i++) {
        formInput = form + " " + $validation[i];
        if (!$(formInput).val()) {
          $(formInput).addClass(invalidCls);
          valid = false;
        } else {
          $(formInput).removeClass(invalidCls);
          valid = true;
        }
      }
    }
    unvalid($validation);

    if (
      !$($email).val() ||
      !$($email)
      .val()
      .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
    ) {
      $($email).addClass(invalidCls);
      valid = false;
    } else {
      $($email).removeClass(invalidCls);
      valid = true;
    }
    return valid;
  }

  $(form).on("submit", function (element) {
    element.preventDefault();
    sendContact();
  });

  /*----------- 12. Magnific Popup ----------*/
    $(".popup-image").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
    $(".popup-video").magnificPopup({
      type: "iframe",
    });

  /*---------- 13. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
      // Sidebar Popup
      $($sideMunuOpen).on("click", function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on("click", function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
      var sideMenuChild = $sideMenu + " > div";
      $(sideMenuChild).on("click", function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenuCls).on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    }
    popupSideMenu(
      ".sidemenu-wrapper",
      ".sideMenuToggler",
      ".sideMenuCls",
      "show"
    );

 /*----------- 14. Counter section ----------*/
  var a = 0;

  $(window).scroll(function () {
    var mediaCounter = $(".media-counter");

    if (mediaCounter.length > 0) {
      var oTop = mediaCounter.offset().top - window.innerHeight;

      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter-number").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");
          $({ countNum: $this.text() }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 4000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              },
            }
          );
        });
        a = 1;
      }
    }
  });

  /*----------- 15. side cart toggle----------*/
    // Event handler for the close button
    $(".sideMenuCls2").on("click", function() {
      $(".sideCart-wrapper").removeClass("show");
    });

    // Event handler for toggling the side cart when clicking outside the side cart wrapper
    $(".sideCart-wrapper").on("click", function(event) {
      if (!$(event.target).closest(".sidemenu-content").length) {
          toggleSideCart();
      }
    });

    // Event handler for the toggler button
    $(".sideCartToggler").on("click", function() {
      toggleSideCart();
    });

    // Function to toggle the side cart
    function toggleSideCart() {
      $(".sideCart-wrapper").toggleClass("show");
    }

  /*---------- 16. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
      $($searchOpen).on("click", function (e) {
        e.preventDefault();
        $($searchBox).addClass($toggleCls);
      });
      $($searchBox).on("click", function (e) {
        e.stopPropagation();
        $($searchBox).removeClass($toggleCls);
      });
      $($searchBox)
        .find("form")
        .on("click", function (e) {
          e.stopPropagation();
          $($searchBox).addClass($toggleCls);
        });
      $($searchCls).on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($searchBox).removeClass($toggleCls);
      });
    }
    popupSarchBox(
      ".popup-search-box",
      ".searchBoxTggler",
      ".searchClose",
      "show"
    );

  /*---------- 17. Lenis Library Support ----------*/
if (typeof gsap !== "undefined" && typeof Lenis !== "undefined") {

  // Register plugins safely
  if (typeof ScrollTrigger !== "undefined" && typeof ScrollToPlugin !== "undefined" && typeof SplitText !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
  }

  const lenis = new Lenis({
    lerp: 0.1,
    touchMultiplier: 0,
    smoothWheel: true,
    smoothTouch: false,
    mouseWheel: false,
    autoResize: true,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    syncTouch: true,
  });

  // ScrollTrigger safe use
  if (typeof ScrollTrigger !== "undefined") {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // GSAP ticker safe
  if (gsap.ticker) {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1200);
    });
  }
}

/*---------- 18. Split Text Animation With GSAP Plugins ----------*/
  if (typeof gsap !== "undefined") {

  gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
  });

  function vsTitleAnimation() {

    const vsElements = document.querySelectorAll('.title-anime');
    if (!vsElements.length) return;

    vsElements.forEach((container) => {

      const quotes = container.querySelectorAll('.title-anime__title');

      quotes.forEach((quote) => {

        // Reset previous animation
        if (quote.animation) {
          quote.animation.kill();
          if (quote.split) quote.split.revert();
        }

        quote.style.textTransform = 'initial';

        const animationClass = container.className.match(/animation-(style\d+)/);
        if (!animationClass || animationClass[1] === 'style4') return;

        // SplitText safety check
        if (typeof SplitText === "undefined") return;

        quote.split = new SplitText(quote, {
          type: 'lines,words,chars',
          linesClass: 'split-line',
        });

        if (typeof gsap !== "undefined") {
          gsap.set(quote, { perspective: 1000 });
        }

        const chars = quote.split.chars;
        const style = animationClass[1];

        const initialStates = {
          style1: { opacity: 0, y: '90%', rotateX: '-40deg' },
          style2: { opacity: 0, x: '50' },
          style3: { opacity: 0 },
          style4: { opacity: 0, skewX: '-30deg', scale: 0.8 },
          style5: { opacity: 0, scale: 0.5 },
          style6: { opacity: 0, y: '-100%', rotate: '45deg' },
        };

        if (typeof gsap !== "undefined") {
          gsap.set(chars, initialStates[style]);

          quote.animation = gsap.to(chars, {
            x: '0',
            y: '0',
            rotateX: '0',
            rotate: '0',
            opacity: 1,
            skewX: '0',
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            stagger: 0.02,
            scrollTrigger: (typeof ScrollTrigger !== "undefined")
              ? {
                  trigger: quote,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                }
              : undefined,
          });
        }

      });
    });
  }

  if (typeof ScrollTrigger !== "undefined") {

    ScrollTrigger.addEventListener('refreshInit', () => {
      document.querySelectorAll('.title-anime__title').forEach((quote) => {
        if (quote.split) quote.split.revert();
      });
    });

    ScrollTrigger.addEventListener('refresh', vsTitleAnimation);
  }

  document.addEventListener('DOMContentLoaded', vsTitleAnimation);
}
  

  /*---------- 19. Active Menu Item Based On URL ----------*/
    document.addEventListener('DOMContentLoaded', () => {
      const navMenu = document.querySelector('.main-menu'); // Select the main menu container once
      const windowPathname = window.location.pathname;

      if (navMenu) {
        const navLinkEls = navMenu.querySelectorAll('a'); // Only get <a> tags inside the main menu

        navLinkEls.forEach((navLinkEl) => {
          const navLinkPathname = new URL(navLinkEl.href, window.location.origin)
            .pathname;

          // Match current URL with link's href
          if (
            windowPathname === navLinkPathname ||
            (windowPathname === '/index.html' && navLinkPathname === '/')
          ) {
            navLinkEl.classList.add('active');

            // Add 'active' class to all parent <li> elements
            let parentLi = navLinkEl.closest('li');
            while (parentLi && parentLi !== navMenu) {
              parentLi.classList.add('active');
              parentLi = parentLi.parentElement.closest('li'); // Traverse up safely
            }
          }
        });
      }
    });

  /*----------- 20. Back to Top ----------*/
  const backToTopBtn = document.getElementById('backToTop');
  const progressCircle = document.querySelector('.progress');
  const progressPercentage = document.getElementById('progressPercentage');

  // Circle properties
  const CIRCLE_RADIUS = 40;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

  // Ensure elements exist before using them
  if (progressCircle) {
    progressCircle.style.strokeDasharray = CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = CIRCUMFERENCE;
  }

  // Update progress based on scroll position
  const updateProgress = () => {
    if (!progressCircle || !progressPercentage) return;

    const scrollPosition = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (totalHeight > 0) {
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      const offset = CIRCUMFERENCE * (1 - scrollPercentage / 100);

      progressCircle.style.strokeDashoffset = offset.toFixed(2);
      progressPercentage.textContent = `${Math.round(scrollPercentage)}%`;
    }
  };

  // Scroll to top using smooth animation
  const scrollToTop = () => {
    if (typeof gsap !== "undefined" && typeof ScrollToPlugin !== "undefined") {
      gsap.to(window, { duration: 1, scrollTo: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Throttle function
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function (...args) {
      const context = this;

      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // Attach event listeners
  window.addEventListener('scroll', throttle(updateProgress, 50));

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }

  // Initial update
  updateProgress();



 /*----------- 21. Nice Select ----------*/
  if ($("select").length > 0) {
    $("select").niceSelect();
  }

  gsap.to(".bg-paralax", {
    backgroundPosition: "50% 100%", // Moves background slower for parallax effect
    ease: "none",
    scrollTrigger: {
      trigger: ".bg-paralax",
      start: "top bottom",
      end: "bottom top",
      scrub: 5.5, // Higher value slows down the effect
    }
  });

 /*----------- 22. sidebar-services hover active ----------*/

    safeInit(() => {
      const items = safeQueryAll(".sidebar-services li");
      if (items.length) {
        items[0].classList.add("active");
        items.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            items.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
          });
          item.addEventListener("mouseleave", () => {
            items.forEach((i) => i.classList.remove("active"));
            items[0].classList.add("active");
          });
        });
      }
    });

 /*----------- 23. Project Gallery ----------*/

    safeInit(() => {
      const items = safeQueryAll(".project_style1 .project_inner");
      if (!items.length) return;
      let defaultActive =
        document.querySelector(".project_style1 .project_inner.active") ||
        items[0];

      defaultActive.classList.add("active");

      items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          items.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
          items.forEach((i) => i.classList.remove("active"));
          defaultActive.classList.add("active");
        });
      });
    });

 /*----------- 24. Branches Gallery ----------*/
    safeInit(() => {
      const items = safeQueryAll(".branches_style1 .branches_inner");

      if (!items.length) return;
      let defaultActive =
        document.querySelector(".branches_style1 .branches_inner.active") ||
        items[0];

      defaultActive.classList.add("active");

      items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          items.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
          items.forEach((i) => i.classList.remove("active"));
          defaultActive.classList.add("active");
        });
      });
    });


 /*----------- 25. Progress Bar ----------*/
    safeInit(() => {
      try {
        const progressBoxes = document.querySelectorAll(".progress-box");
        if (!progressBoxes || !progressBoxes.length) return;
        const options = { root: null, rootMargin: "0px", threshold: 0.5 };
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const progressBox = entry.target;
              const progressBar = progressBox.querySelector(".progress-box__bar");
              const progressNumber = progressBox.querySelector(".progress-box__number");
              let targetWidth = 0;
              if (progressBar) {
                targetWidth = parseInt(progressBar.getAttribute("data-width") || progressBar.style.width || "0", 10);
                if (isNaN(targetWidth)) targetWidth = 0;
              }
              let width = 0;
              const countInterval = setInterval(() => {
                width++;
                if (progressBar) progressBar.style.width = width + "%";
                if (progressNumber) progressNumber.textContent = width + "%";
                if (width >= targetWidth) clearInterval(countInterval);
              }, 20);
              obs.unobserve(progressBox);
            }
          });
        }, options);

        progressBoxes.forEach((box) => observer.observe(box));
      } 
      catch (err) {
        console.warn(err);
      }
    });



/* ===========================
  26. Project Details Gallery
=========================== */

const thumbs = document.querySelectorAll(".thumb-img");
const previews = document.querySelectorAll(".previ-img");

// Set default active
if (thumbs.length > 0 && previews.length > 0) {
  thumbs[0].classList.add("active");
  previews[0].classList.add("active");
}

// Click events
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    
    // Remove active from all
    thumbs.forEach(t => t.classList.remove("active"));
    previews.forEach(p => p.classList.remove("active"));

    // Add active to clicked
    thumb.classList.add("active");

    // Safe check before accessing preview
    if (previews[index]) {
      previews[index].classList.add("active");
    }

  });
});



})(jQuery);


