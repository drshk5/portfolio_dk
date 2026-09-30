import "./styles/TechStackMobile.css";

const categories = [
  {
    category: "Backend & Systems",
    skills: ["C# (.NET 8)", "ASP.NET Core", "Web API", "EF Core 8", "Clean Architecture", "JWT Auth", "Docker"],
  },
  {
    category: "Databases & Storage",
    skills: ["SQL Server (SSMS)", "Relational Schema Design", "Stored Procedures", "Migrations", "LINQ", "Redis"],
  },
  {
    category: "Frontend & Interactive",
    skills: ["React 19", "Next.js 15", "TypeScript", "Three.js", "GSAP", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Git & GitHub", "Visual Studio 2022", "Postman API", "Docker", "SSMS", "Vercel"],
  },
];

const TechStackMobile = () => {
  return (
    <div className="mobile-techstack-section">
      <div className="mobile-techstack-header">
        <h2>
          Tech <span>Stack</span>
        </h2>
        <p>Core engineering tools, frameworks, and database architectures</p>
      </div>

      <div className="mobile-techstack-grid">
        {categories.map((cat) => (
          <div key={cat.category} className="mobile-techstack-card">
            <h3>{cat.category}</h3>
            <div className="mobile-techstack-chips">
              {cat.skills.map((skill) => (
                <span key={skill} className="mobile-techstack-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackMobile;
