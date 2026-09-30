import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const currentContainers = containerRef.current;
    if (ScrollTrigger.isTouch) {
      const handlers: Array<() => void> = [];
      currentContainers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          handlers.push(handler);
          container.addEventListener("click", handler);
        }
      });
      return () => {
        currentContainers.forEach((container, i) => {
          if (container) {
            container.removeEventListener("click", handlers[i]);
          }
        });
      };
    }
    return;
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>FRONTEND & 3D</h3>
              <h4>Interactive Digital Experiences</h4>
              <p>
                Specialized in building modern, high-performance web applications using React 19, Next.js 15, and interactive 3D web scenes using Three.js and GSAP.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React 19</div>
                <div className="what-tags">Next.js 15</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">React Three Fiber</div>
                <div className="what-tags">GSAP & Lenis</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">Figma UI/UX</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>BACKEND & APIS</h3>
              <h4>Enterprise .NET Solutions</h4>
              <p>
                Architect of resilient ASP.NET Core Web APIs, SQL Server database schemas, JWT authentication pipelines, and containerized Docker services.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">C# (.NET 8)</div>
                <div className="what-tags">ASP.NET Core</div>
                <div className="what-tags">Web API</div>
                <div className="what-tags">EF Core 8</div>
                <div className="what-tags">SQL Server (SSMS)</div>
                <div className="what-tags">JWT Auth</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Clean Architecture</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
