import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">

        <div className="footer-brand">
          <h3>Ernesto Gabriel</h3>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="footer-nav">
          <ul className="footer-nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>

        <div className="footer-socials">
          {/*           <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a> */}
          <a href="www.linkedin.com/in/ernesto-gabriel-ii" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:gabrielernesto99.pro@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
