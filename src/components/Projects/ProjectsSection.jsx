import React, { useState, useEffect, useRef } from 'react';
import { projectsData } from '../../data/projectsData';
import './ProjectsSection.css';

const ProjectCard = ({ project, index, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const slideClass = index % 2 === 0 ? 'slide-left' : 'slide-right';

  return (
    <div
      ref={cardRef}
      className={`project-card glass-card ${isVisible ? 'animate-in' : ''} ${slideClass}`}
      onClick={() => onClick(project)}
    >
      <div className="project-image-container">
        <div className="project-image-wrapper">
          {project.image ? (
            <img src={project.image} alt={project.name} className="project-image" />
          ) : (
            <div className="project-placeholder"><span>{project.name}</span></div>
          )}
        </div>
        {project.category && <div className="project-category-tag">{project.category}</div>}
      </div>

      <div className="project-info">
        <div className="project-meta-top">
          <h3 className="project-name">{project.name}</h3>
          {project.rating && (
            <div className="project-rating-mini">
              <span>{project.rating}</span>
            </div>
          )}
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-stack">
          {project.stack.slice(0, 3).map((tech, i) => (
            <span key={i} className="stack-tag">{tech}</span>
          ))}
          {project.stack.length > 3 && (
            <span className="stack-tag-more">+{project.stack.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setAnimateModal(true), 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
      setAnimateModal(false);
    }
  }, [selectedProject]);

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 400);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <header className="projects-header">
          <h2 className="section-title">My Projects</h2>
          <div className="title-underline"></div>
          <p className="projects-subtitle">A collection of my recent work and technical experiments.</p>
        </header>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-container glass-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>

            <div className={`modal-content ${animateModal ? 'animate-slide-vertical' : ''}`}>
              {/* Left Column: Media */}
              <div className="modal-left">
                <div className="modal-image-container">
                  {selectedProject.image ? (
                    <img src={selectedProject.image} alt={selectedProject.name} className="modal-image" />
                  ) : (
                    <div className="modal-placeholder"><span>{selectedProject.name}</span></div>
                  )}
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="modal-right">
                <h2 className="modal-title">{selectedProject.name}</h2>
                <div className="modal-tech-stack">
                  {selectedProject.stack.map((tech, i) => (
                    <span key={i} className="stack-tag">{tech}</span>
                  ))}
                </div>
                <p className="modal-description">
                  {selectedProject.detailedDescription || selectedProject.description}
                </p>
                <div className="modal-actions">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-view-site"
                  >
                    View Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
