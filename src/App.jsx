import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Profile from './components/Profile/Profile'
import ProjectsSection from './components/Projects/ProjectsSection'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
  const MainView = (
    <>
      <Hero />
      <About />
      <Profile />
      <ProjectsSection />
      <Contact />
      <Footer />
    </>
  );

  return (
    <>
      <div className="bg-rgb-container">
        <div className="bg-blob blue"></div>
        <div className="bg-blob purple"></div>
        <div className="bg-blob cyan"></div>
      </div>

      <Navbar />

      <Routes>
        <Route path="/" element={MainView} />
        <Route path="/home" element={MainView} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
