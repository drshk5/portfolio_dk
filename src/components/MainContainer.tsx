import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { setAllTimeline } from "./utils/GsapScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TechStackMobile from "./TechStackMobile";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const initScrollFX = () => {
      setSplitText();
      setAllTimeline();
      ScrollTrigger.refresh();
      setIsDesktopView(window.innerWidth > 1024);
    };

    // Initialize with slight delay for DOM rendering
    const timer = setTimeout(initScrollFX, 150);

    const resizeHandler = () => {
      initScrollFX();
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeHandler);
    };
    // run only once on mount
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView ? (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            ) : (
              <TechStackMobile />
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
