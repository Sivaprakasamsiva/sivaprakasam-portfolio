import React from 'react';
import usePortfolioData from './hooks/usePortfolioData';
import Navbar from './components/Base/Navbar';
import Footer from './components/Base/Footer';
import CustomCursor from './components/Base/CustomCursor';
import Hero from './components/Sections/Hero';
import AboutSkills from './components/Sections/AboutSkills';
import Experience from './components/Sections/Experience';
import Projects from './components/Sections/Projects';
import FreelanceServices from './components/Sections/FreelanceServices';
import Contact from './components/Sections/Contact';

function App() {
  const { profile, experience, projects, education, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center text-red-400">
          <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
          <p>Failed to load data. Please check your network or data files.</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-[#0B0F19] text-white">
        <Hero profile={profile} />
        <AboutSkills profile={profile} education={education} />
        <Experience experience={experience} education={education} />
        <Projects projects={projects} />
        <FreelanceServices profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  );
}

export default App;