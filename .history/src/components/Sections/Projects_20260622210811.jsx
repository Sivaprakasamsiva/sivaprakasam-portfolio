import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../UI/ProjectCard';

const Projects = ({ projects, sectionBgVideo }) => {
  if (!projects) return null;

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* ============================================================
          SECTION BACKGROUND VIDEO - Plays behind all cards
          ============================================================ */}
      {sectionBgVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.15,
              maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 70%)',
            }}
          >
            <source src={sectionBgVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0B0F19]/85"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured Projects</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Full-stack applications built with modern architectures and real-world impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: false }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;