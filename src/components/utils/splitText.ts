import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const isMobile = window.innerWidth <= 1024;
  const TriggerStart = isMobile ? "top 85%" : "top 75%";
  const ToggleAction = "play none none reverse";

  // ── 1. Paragraphs Scroll Reveal ──
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    try {
      para.split = new SplitText(para, {
        type: "lines,words",
        linesClass: "split-line",
      });

      para.anim = gsap.fromTo(
        para.split.words,
        { autoAlpha: 0, y: isMobile ? 30 : 60 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: para,
            toggleActions: ToggleAction,
            start: TriggerStart,
            invalidateOnRefresh: true,
          },
          duration: isMobile ? 0.7 : 1,
          ease: "power3.out",
          y: 0,
          stagger: isMobile ? 0.015 : 0.02,
        }
      );
    } catch {
      // Fallback simple fade if SplitText encounters unusual DOM
      para.anim = gsap.fromTo(
        para,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: para,
            start: TriggerStart,
            toggleActions: ToggleAction,
          },
        }
      );
    }
  });

  // ── 2. Headings Scroll Reveal ──
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }

    try {
      title.split = new SplitText(title, {
        type: "chars,lines",
        linesClass: "split-line",
      });
      title.anim = gsap.fromTo(
        title.split.chars,
        { autoAlpha: 0, y: isMobile ? 40 : 70, rotate: isMobile ? 4 : 8 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: title,
            toggleActions: ToggleAction,
            start: TriggerStart,
            invalidateOnRefresh: true,
          },
          duration: isMobile ? 0.6 : 0.8,
          ease: "power2.out",
          y: 0,
          rotate: 0,
          stagger: isMobile ? 0.02 : 0.03,
        }
      );
    } catch {
      title.anim = gsap.fromTo(
        title,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: title,
            start: TriggerStart,
            toggleActions: ToggleAction,
          },
        }
      );
    }
  });

  // ── 3. About Stats Cards Scroll Animation ──
  const statCards = document.querySelectorAll(".about-stat-card");
  if (statCards.length > 0) {
    gsap.fromTo(
      statCards,
      { autoAlpha: 0, y: 25, scale: 0.96 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-stats-grid",
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: ToggleAction,
        },
      }
    );
  }

  // ── 4. What I Do Content Cards Scroll Animation ──
  const whatCards = document.querySelectorAll(".what-content");
  if (whatCards.length > 0) {
    gsap.fromTo(
      whatCards,
      { autoAlpha: 0, y: 35 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".what-box-in",
          start: isMobile ? "top 88%" : "top 75%",
          toggleActions: ToggleAction,
        },
      }
    );
  }

  // ── 5. Mobile Tech Stack Cards Scroll Animation ──
  const techCards = document.querySelectorAll(".mobile-techstack-card");
  if (techCards.length > 0) {
    gsap.fromTo(
      techCards,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mobile-techstack-grid",
          start: "top 88%",
          toggleActions: ToggleAction,
        },
      }
    );
  }

  // ── 6. Contact Cards Scroll Animation ──
  const contactCards = document.querySelectorAll(".contact-card");
  if (contactCards.length > 0) {
    gsap.fromTo(
      contactCards,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-flex",
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: ToggleAction,
        },
      }
    );
  }

  // ── 7. Work Section Header Scroll Reveal ──
  const workHeader = document.querySelector(".work-header");
  if (workHeader) {
    gsap.fromTo(
      workHeader,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".work-section",
          start: isMobile ? "top 88%" : "top 75%",
          toggleActions: ToggleAction,
        },
      }
    );
  }
}
