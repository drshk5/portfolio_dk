import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Moneycure Securities & Financial Services Ltd.</h5>
                <div className="career-skills-tags">
                  <span>ASP.NET Core</span>
                  <span>SQL Server</span>
                  <span>REST APIs</span>
                  <span>Backend Architecture</span>
                </div>
              </div>
              <div className="career-meta">
                <span className="career-pill">8 Months</span>
                <span className="career-location">Gujarat, India</span>
              </div>
            </div>
            <p>
              Contributed to business web application development in an ASP.NET-based environment with a focus on reliable backend functionality. Worked on API integration, SQL Server data handling, debugging, and internal feature improvements for daily operational workflows. Supported testing, issue resolution, and collaborative development tasks.
            </p>
          </div>
        </div>

        <div className="career-info" style={{ marginTop: "30px" }}>
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Parul University</h5>
                <div className="career-skills-tags">
                  <span>Data Structures</span>
                  <span>System Design</span>
                  <span>DBMS</span>
                  <span>Web Systems</span>
                </div>
              </div>
              <div className="career-meta">
                <span className="career-pill">2021 – 2025</span>
                <span className="career-location">Vadodara, India</span>
              </div>
            </div>
            <p>
              Graduated with a strong foundation in computer engineering, object-oriented software patterns, database modeling, and scalable modern web architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
