import React, { useEffect, useRef, useState } from 'react';
import './About.css';

// Import Tech Stack Logos
import htmlLogo from '../../assets/Tech-stack-logos/html.png';
import cssLogo from '../../assets/Tech-stack-logos/CSS-2.png';
import jsLogo from '../../assets/Tech-stack-logos/JavaScript.png';
import reactLogo from '../../assets/Tech-stack-logos/React.png';
import dotnetLogo from '../../assets/Tech-stack-logos/.Net.png';
import aspnetLogo from '../../assets/Tech-stack-logos/ASP.Net Core.png';
import sqlLogo from '../../assets/Tech-stack-logos/SQL-Server.png';
import antigravityLogo from '../../assets/Tech-stack-logos/Google-Antigravity-Icon.png';
import claudeLogo from '../../assets/Tech-stack-logos/Claude.png';
import vscodeLogo from '../../assets/Tech-stack-logos/VS-Code.png';

// Ensure this path matches your public or assets folder
import profileImg from '../../assets/EGabriel.jpg'; 

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const techStacks = [
    { name: 'HTML', icon: htmlLogo },
    { name: 'CSS', icon: cssLogo },
    { name: 'JavaScript', icon: jsLogo },
    { name: 'React', icon: reactLogo },
    { name: '.Net', icon: dotnetLogo },
    { name: 'ASP.Net Core', icon: aspnetLogo },
    { name: 'SQL Server', icon: sqlLogo },
    { name: 'Antigravity', icon: antigravityLogo },
    { name: 'Claude', icon: claudeLogo },
    { name: 'VS Code', icon: vscodeLogo },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        {/* Added 'glass-effect' for the CSS styling */}
        <div className={`about-box glass-effect ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="about-content">

            {/* Left Column: Profile & Tech Stack */}
            <div className="about-left">
              <div className="profile-details-wrapper">
                <div className="profile-img-container">
                  <img src={profileImg} alt="Ernesto Gabriel" className="profile-img" />
                </div>
                <div className="profile-info">
                  <p><span className="info-title">Name: </span> <span>Ernesto Gabriel</span></p>
                  <p><span className="info-title">Profile: </span> <span>Software Engineer</span></p>
                  <p><span className="info-title">Email: </span> <span>gabrielernesto99.pro@gmail.com</span></p>
                  <p><span className="info-title">Phone: </span> <span>0995 905 0331</span></p>
                </div>
              </div>

              <div className="skills-section">
                <h3 className="skills-title">Tech Stacks</h3>
                <div className="tech-stack-grid">
                  {techStacks.map((stack, index) => (
                    <div 
                      key={index} 
                      className={`tech-stack-item ${isVisible ? 'shake-on-load' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="tech-stack-icon-wrapper">
                        <img src={stack.icon} alt={stack.name} className="tech-stack-icon" />
                      </div>
                      <span className="tech-stack-name">{stack.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="about-right">
              <div className="about-me-title-wrapper">
                <h5 className="about-me-title">About me</h5>
              </div>
              
              <p className={`about-me-desc ${isVisible ? 'animate-in' : ''}`}>
                Detail-oriented Software Engineer with 3+ years of experience in full-stack development, 
                specializing in C# and ASP.NET Core alongside a strong focus on modern web development.
                <br /><br />
                Highly proficient in building responsive, high-performance user interfaces using 
                React, JavaScript, HTML, and CSS.
                <br /><br />
                Dedicated to writing clean, maintainable code and building seamless, end-to-end 
                applications that prioritize both technical performance and user experience.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
