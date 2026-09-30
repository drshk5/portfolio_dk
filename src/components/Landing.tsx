import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        {/* Ambient Architectural Background Typography Watermark */}
        <div className="landing-bg-text" aria-hidden="true">
          <div className="bg-text-line bg-text-top">DARSHAK</div>
          <div className="bg-text-line bg-text-bottom">CHAVDA</div>
        </div>

        <div className="landing-container">
          <div className="landing-intro">
            <div className="landing-status-badge">
              <span className="pulse-dot"></span>
              <span>Available for Hire & Freelance</span>
            </div>
            <h2>Hello! I'm</h2>
            <h1>
              DARSHAK
              <br />
              <span>CHAVDA</span>
            </h1>
          </div>

          <div className="landing-info">
            <div className="landing-info-pill">
              <span>Enterprise Systems</span>
            </div>
            <h3>Full-Stack</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">.NET Developer</div>
              <div className="landing-h2-2">Software Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
