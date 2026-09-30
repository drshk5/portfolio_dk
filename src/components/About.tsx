import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Full-Stack & .NET Software Developer based in Anand, Gujarat. Computer Science graduate from Parul University (2021 – 2025) with professional experience engineering high-performance ASP.NET Core Web APIs, SQL Server architectures, and interactive digital interfaces. Recently completed an 8-month tenure at Moneycure Securities & Financial Services Ltd., delivering reliable backend systems and operational solutions.
        </p>

        <div className="about-stats-grid">
          <div className="about-stat-card">
            <span className="about-stat-num">8+ Mos</span>
            <span className="about-stat-label">Enterprise .NET Dev</span>
          </div>
          <div className="about-stat-card">
            <span className="about-stat-num">B.Tech</span>
            <span className="about-stat-label">Computer Science '25</span>
          </div>
          <div className="about-stat-card">
            <span className="about-stat-num">Full-Stack</span>
            <span className="about-stat-label">ASP.NET + React / Next</span>
          </div>
          <div className="about-stat-card">
            <span className="about-stat-num">SSMS / SQL</span>
            <span className="about-stat-label">Data Modeling & APIs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
