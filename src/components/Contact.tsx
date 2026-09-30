import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdContentCopy, MdCheck, MdMailOutline, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("darshak007chavda@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h3>
            Let's <span>Connect</span>
          </h3>
          <p className="contact-subhead">
            Open for software developer roles, freelance .NET web systems, and innovative engineering collaborations.
          </p>
        </div>

        <div className="contact-flex">
          {/* Card 1: Direct Inquiries */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-badge">Direct Line</span>
              <h4>Get in Touch</h4>
            </div>
            
            <div className="contact-item">
              <span className="contact-item-label">
                <MdMailOutline /> Primary Email
              </span>
              <div className="contact-copy-row">
                <a
                  href="mailto:darshak007chavda@gmail.com"
                  className="contact-value"
                  data-cursor="disable"
                >
                  darshak007chavda@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  aria-label="Copy email address"
                  data-cursor="disable"
                >
                  {copied ? <MdCheck /> : <MdContentCopy />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-item-label">
                <MdPhone /> Direct Phone
              </span>
              <a
                href="tel:+917203075804"
                className="contact-value phone-val"
                data-cursor="disable"
              >
                +91 7203075804 <MdArrowOutward />
              </a>
            </div>

            <div className="contact-status-box">
              <span className="contact-status-dot"></span>
              <span>Available for immediate joining & freelance</span>
            </div>
          </div>

          {/* Card 2: Professional Profiles */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-badge">Online Presence</span>
              <h4>Profiles & Code</h4>
            </div>

            <div className="contact-social-links">
              <a
                href="https://github.com/drshk5"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-tile"
              >
                <div className="tile-icon"><FaGithub /></div>
                <div className="tile-text">
                  <span className="tile-title">GitHub</span>
                  <span className="tile-desc">@drshk5 • Repositories & code</span>
                </div>
                <MdArrowOutward className="tile-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/darshak-chavda-439940239/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-tile"
              >
                <div className="tile-icon"><FaLinkedinIn /></div>
                <div className="tile-text">
                  <span className="tile-title">LinkedIn</span>
                  <span className="tile-desc">Professional network & resume</span>
                </div>
                <MdArrowOutward className="tile-arrow" />
              </a>
            </div>

            <div className="contact-location-info">
              <span>Location:</span> Gandhinagar, Gujarat, India
            </div>
          </div>

          {/* Card 3: Colophon & Closing */}
          <div className="contact-card credit-card">
            <div className="credit-content">
              <h2>
                Crafted with care <br /> by <span>Darshak Chavda</span>
              </h2>
              <p className="credit-desc">
                Built with React 19, TypeScript, Three.js, and GSAP. Designed for enterprise precision and cinematic motion.
              </p>
              <a
                href="mailto:darshak007chavda@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                className="contact-cta-btn"
                data-cursor="disable"
              >
                Send Quick Message <MdArrowOutward />
              </a>
            </div>
            <div className="credit-footer">
              <h5>
                <MdCopyright /> {new Date().getFullYear()} Darshak Chavda. All rights reserved.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
