(function () {
  "use strict";

  /* =========================
     GSAP SAFE INIT
  ========================= */
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* =========================
     MARQUEE FUNCTION
  ========================= */
  function horizontalInfiniteMarquee(options = {}) {
    const config = {
      marqueeSelector: ".marqueeOne",
      spinningStarSelector: ".spinningStar",
      marqueeDuration: 30,
      spinningRotation: 1440,
      spinningDuration: 40,
      hoverPause: true,
      speedMultiplier: 10,
      ...options,
    };

    let direction = 1;
    let tween = null; // ✅ FIXED (no undefined error)

    const marquee = document.querySelector(config.marqueeSelector);
    const spinningStar = document.querySelector(config.spinningStarSelector);

    if (!marquee) return;

    /* =========================
       ROLL FUNCTION (OPTIMIZED)
    ========================= */
    function roll(target, vars = {}, reverse = false) {
      vars.ease = vars.ease || "none";

      const tl = gsap.timeline({
        repeat: -1,
        paused: false,
        defaults: { ease: "none" },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 100);
        },
      });

      const elements = gsap.utils.toArray(target);

      if (!elements.length) return null;

      const clones = elements.map((el) => {
        const clone = el.cloneNode(true);
        clone.setAttribute("aria-hidden", "true"); // accessibility
        el.parentNode.appendChild(clone);
        return clone;
      });

      const positionClones = () => {
        elements.forEach((el, i) => {
          const width = el.offsetWidth;

          gsap.set(clones[i], {
            position: "absolute",
            top: el.offsetTop,
            left: el.offsetLeft + (reverse ? -width : width),
          });
        });
      };

      positionClones();

      elements.forEach((el, i) => {
        tl.to(
          [el, clones[i]],
          {
            xPercent: reverse ? 100 : -100,
            duration: vars.duration,
          },
          0
        );
      });

      // ✅ Resize fix (debounced)
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const time = tl.totalTime();
          tl.totalTime(0);
          positionClones();
          tl.totalTime(time);
        }, 200);
      });

      return tl;
    }

    /* =========================
       MARQUEE INIT
    ========================= */
    const rollAnim = roll(config.marqueeSelector, {
      duration: config.marqueeDuration,
    });

    if (!rollAnim) return;

    /* =========================
       SCROLL DIRECTION CONTROL
    ========================= */
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({
        onUpdate(self) {
          if (self.direction !== direction) {
            direction *= -1;

            rollAnim.timeScale(direction * config.speedMultiplier);

            gsap.to(rollAnim, {
              timeScale: direction,
              duration: 0.6,
              overwrite: true,
            });
          }
        },
      });
    }

    /* =========================
       SPINNING STAR
    ========================= */
    if (spinningStar) {
      tween = gsap.to(spinningStar, {
        rotation: config.spinningRotation,
        duration: config.spinningDuration,
        ease: "none",
        repeat: -1,
      });

      tween.progress(0.5);
    }

    /* =========================
       HOVER PAUSE (SAFE)
    ========================= */
    if (config.hoverPause) {
      marquee.addEventListener("mouseenter", () => {
        rollAnim.pause();
        if (tween) tween.pause();
      });

      marquee.addEventListener("mouseleave", () => {
        rollAnim.resume();
        if (tween) tween.resume();
      });
    }
  }

  /* =========================
     INIT
  ========================= */
  document.addEventListener("DOMContentLoaded", () => {
    horizontalInfiniteMarquee({
      marqueeSelector: ".marqueeOne",
      spinningStarSelector: ".spinningStar",
      marqueeDuration: 40,
      spinningRotation: 720,
      spinningDuration: 20,
      hoverPause: true,
    });
  });

})();