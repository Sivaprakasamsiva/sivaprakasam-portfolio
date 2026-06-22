import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="glass-panel p-6 rounded-2xl h-full flex flex-col relative overflow-hidden group"
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
      }}
    >
      {/* Background Video - Better visibility */}
      {project.backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ 
            opacity: isHovered ? 0.35 : 0.2,
            transform: 'translateZ(-1px)'
          }}
        >
          <source src={project.backgroundVideo} type="video/mp4" />
        </video>
      )}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0B0F19]/70 group-hover:bg-[#0B0F19]/50 transition-all duration-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30">
              {tech}
            </span>
          ))}
        </div>
        <ul className="flex-1 space-y-2 text-sm text-gray-300 mb-4">
          {project.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent mt-1">▹</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors cursor-hover"
          >
            <i className="fab fa-github mr-1"></i> Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors cursor-hover"
            >
              <i className="fas fa-external-link-alt mr-1"></i> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;