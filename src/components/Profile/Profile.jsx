import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import myResume from '../../assets/Resume/CV_Ernesto_Gabriel_II.pdf';

const TimelineItem = ({ title, subtitle, date, desc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`timeline-item ${isVisible ? 'animate' : ''}`}
    >
      <div className="timeline-dot"></div>
      <div className="typewriter-container">
        <h4 className="timeline-title">{title}</h4>
      </div>
      <h5 className="timeline-subtitle">{subtitle}</h5>
      <span className="timeline-date">{date}</span>
      <p className="timeline-desc">{desc}</p>
    </div>
  );
};

const Profile = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDownload = (e) => {
    if (!window.confirm('Do you want to download the resume?')) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#profile') {
        setRefreshKey(prev => prev + 1);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="profile" className="profile-section" key={refreshKey}>
      <div className="container">
        <div className="profile-title-container">
          <h2 className="section-title">Profile</h2>
          <div className="title-underline"></div>
        </div>

        <div className="resume-download-container">
          <a
            href={myResume}
            download="Ernesto_Gabriel_II_Resume.pdf"
            className="btn-download-resume"
            onClick={handleDownload}
          >
            Download Resume
          </a>

        </div>

        <div className="profile-content">
          {/* Left Side: Educational Background */}
          <div className="profile-col">
            <h3 className="col-title">Educational Background</h3>
            <div className="timeline">
              <TimelineItem
                title="Bachelor of Science in Computer Science"
                subtitle="President Ramon Magsaysay State University"
                date="2015 - 2019"
                desc="Graduated with Best in Software Application Development award."
              />
              <TimelineItem
                title="High School Diploma"
                subtitle="Zambales National High School"
                date="2011 - 2015"
                desc=""
              />
            </div>
          </div>

          {/* Right Side: Professional Experience */}
          <div className="profile-col">
            <h3 className="col-title">Professional Experience</h3>
            <div className="timeline">
              <TimelineItem
                title="School Admin Support Staff"
                subtitle="Department of Education"
                date="2025"
                desc="Coordinating daily operations for the Principal’s office and school-wide activities."
              />
              <TimelineItem
                title="Software Engineer"
                subtitle="PJ Lhuillier Group Companies"
                date="2022"
                desc="Optimizing secure .NET web applications and developing C# automation tools to to automate and simplify complex reporting."
              />
              <TimelineItem
                title="Software Engineer"
                subtitle="Caspo Inc."
                date="2022"
                desc="60 Minutes → 4 Minutes. Developed a high-integrity scraping solution that reclaimed 93% of processing time without losing a single data point."
              />
              <TimelineItem
                title="Web Administrator / Developer"
                subtitle="President Ramon Magsaysay State University"
                date="2021"
                desc="Developed and maintained the university website."
              />
              <TimelineItem
                title="Full Stack Web Developer"
                subtitle="iFormat Logic"
                date="2019"
                desc="Designed and implemented full-stack solutions for various client projects."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
