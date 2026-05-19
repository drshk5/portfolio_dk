import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);
    const links = Array.from(
      document.querySelectorAll(".header ul a")
    ) as HTMLAnchorElement[];
    const handlers: ((e: Event) => void)[] = [];
    links.forEach((elem) => {
      const handler = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      };
      handlers.push(handler);
      elem.addEventListener("click", handler);
    });

    const resizeHandler = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      links.forEach((elem, i) => elem.removeEventListener("click", handlers[i]));
      window.removeEventListener("resize", resizeHandler);
      try {
        if (smoother) smoother.kill();
      } catch (e) {
        /* ignore */
      }
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SN
        </a>
        <a
          href="https://www.linkedin.com/in/supratim-nath10"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/supratim-nath10
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
