import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const projects = [
  {
    title: "CRM-ERP Platform",
    category: "Full-Stack Monolith & Enterprise System",
    description: "Multi-tenant CRM and ERP enterprise platform featuring role-based access control, sales pipeline tracking, inventory workflows, and Docker deployment.",
    tools: [".NET 8", "ASP.NET Core", "EF Core 8", "Next.js 15", "React 19", "TypeScript", "Docker"],
    image: "/images/callhq.png",
    link: "https://github.com/drshk5",
  },
  {
    title: "Car Rental ERP",
    category: "Backend Architecture & Booking Workflows",
    description: "Robust booking engine and fleet management backend built with ASP.NET Core Web API, SQL Server schemas, and secure JWT authentication pipelines.",
    tools: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "JWT Auth", "Clean Architecture"],
    image: "/images/broki.png",
    link: "https://github.com/drshk5",
  },
  {
    title: "Scroll Animation Lab",
    category: "3D Motion Lab & Performance Shaders",
    description: "Interactive 3D web experience with realistic character shaders, camera choreographies, and smooth inertial scroll transitions.",
    tools: ["Next.js", "React Three Fiber", "Three.js", "GSAP", "Lenis", "Tailwind CSS"],
    image: "/images/orrdr.png",
    link: "https://github.com/drshk5",
  },
  {
    title: "CryptoHub",
    category: "Real-time Crypto Market Analytics",
    description: "High-frequency cryptocurrency market tracker displaying live candlestick data, market cap rankings, and automated alerts via public REST APIs.",
    tools: ["React", "JavaScript", "CoinGecko API", "REST API", "Chart.js", "Tailwind CSS"],
    image: "/images/callhq.png",
    link: "https://github.com/drshk5",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <div className="work-header-text">
            <h2>
              Featured <span>Work</span>
            </h2>
            <p className="work-subtitle">Selected enterprise architectures, APIs, and interactive systems</p>
          </div>

          <div className="work-nav-controls">
            <div className="work-counter">
              <span className="current-count">0{currentIndex + 1}</span>
              <span className="count-divider">/</span>
              <span className="total-count">0{projects.length}</span>
            </div>
            <div className="work-nav-arrows">
              <button
                className="carousel-arrow"
                onClick={goToPrev}
                aria-label="Previous project"
                data-cursor="disable"
              >
                <MdArrowBack />
              </button>
              <button
                className="carousel-arrow"
                onClick={goToNext}
                aria-label="Next project"
                data-cursor="disable"
              >
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>

        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={project.title}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-details">
                        <div className="project-meta-row">
                          <span className="project-index-pill">0{index + 1}</span>
                          <span className="project-category-badge">{project.category}</span>
                        </div>
                        <h4>{project.title}</h4>
                        <p className="carousel-desc">{project.description}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tech Stack</span>
                          <div className="project-tags-flex">
                            {project.tools.map((tool) => (
                              <span key={tool} className="project-tool-tag">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="project-actions">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="project-action-btn primary"
                            data-cursor="disable"
                          >
                            <FaGithub /> GitHub Repo
                          </a>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="project-action-btn secondary"
                            data-cursor="disable"
                          >
                            <span>Architecture</span>
                            <MdArrowOutward />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <div className="project-mockup-frame">
                        <div className="mockup-browser-bar">
                          <div className="mockup-dots">
                            <span className="mockup-dot red"></span>
                            <span className="mockup-dot yellow"></span>
                            <span className="mockup-dot green"></span>
                          </div>
                          <div className="mockup-address">
                            https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.internal.app
                          </div>
                        </div>
                        <div className="project-img-container">
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="project-screenshot"
                            loading="lazy"
                          />
                          <div className="project-img-overlay"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
