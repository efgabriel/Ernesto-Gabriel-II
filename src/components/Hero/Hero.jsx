import React, { useState, useEffect } from 'react';
import './Hero.css';

const words = ["Software Engineer", "Web Developer"];

const Hero = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 70 : 100;
    const word = words[wordIndex];

    const type = () => {
      if (!isDeleting && currentWord === word) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        const nextWord = isDeleting
          ? word.substring(0, currentWord.length - 1)
          : word.substring(0, currentWord.length + 1);
        setCurrentWord(nextWord);
      }
    };

    const timer = setTimeout(type, isDeleting && currentWord === '' ? 500 : typeSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex]);

  return (
    <div className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Hi! I'm Ernesto Gabriel II</h1>
        <p className="hero-subtitle">
          {currentWord}<span className="cursor">|</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
