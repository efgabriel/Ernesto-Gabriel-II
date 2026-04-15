import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const [result, setResult] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [refreshKey]);

  useEffect(() => {
    const handleNavigation = () => {
      if (window.location.hash === '#contact') {
        setIsVisible(false);
        setRefreshKey(prev => prev + 1);
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult("Message Sent Successfully!");
        event.target.reset();
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("An error occurred while sending. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className={`contact-section ${isVisible ? 'fade-in-visible' : 'fade-in-hidden'}`}
      ref={sectionRef}
      key={refreshKey}
    >
      <div className="container">

        <div className="contact-title-container">
          <h2 className="section-title">Contact</h2>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            Looking for a developer, have a freelance project, or just want to connect? Feel free to drop me a message!
          </p>
        </div>

        {/* Top Info Cards */}
        <div className="contact-info-cards">
          <div className="info-card glass-info-card">
            <div className="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div className="info-content">
              <h4>Address</h4>
              <p>Zambales, Philippines</p>
            </div>
          </div>

          <div className="info-card glass-info-card">
            <div className="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div className="info-content">
              <h4>Mobile Number</h4>
              <p>0995 905 0331</p>
            </div>
          </div>

          <div className="info-card glass-info-card">
            <div className="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="info-content">
              <h4>Email</h4>
              <p>gabrielernesto99.pro@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-box glass-form-box">
          <form onSubmit={onSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group col-name">
                <input type="text" name="name" className="form-control" placeholder="Your Name" required />
              </div>
              <div className="form-group col-email">
                <input type="email" name="email" className="form-control" placeholder="Your Email" required />
              </div>
            </div>
            <div className="form-group">
              <input type="text" name="subject" className="form-control" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea name="message" className="form-control" rows="6" placeholder="Message" required></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-send-message">Send Message</button>
            </div>
            {result && <div className="form-result">{result}</div>}
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
