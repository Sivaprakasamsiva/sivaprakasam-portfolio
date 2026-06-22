import React from 'react';
import { motion } from 'framer-motion';
import BentoCard from '../UI/BentoCard';

const AboutSkills = ({ profile, education }) => {
  if (!profile || !education) return null;

  const skillsMatrix = profile.skillsMatrix;
  const categoryEntries = Object.entries(skillsMatrix);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Video */}
      {profile.skillsVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.45,
              maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 60%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 60%)',
            }}
          >
            <source src={profile.skillsVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      <div className="absolute inset-0 bg-[#0B0F19]/65"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">About & Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Technical Arsenal</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryEntries.map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: false }}
            >
              <BentoCard title={category} items={items} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="glass-panel-light p-6 rounded-2xl backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-3 drop-shadow-md">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-200 border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-panel-light p-6 rounded-2xl backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-3 drop-shadow-md">Education</h4>
            <p className="text-gray-200 drop-shadow-sm">{education.degree}</p>
            <p className="text-gray-300 text-sm drop-shadow-sm">{education.institution}</p>
            <p className="text-accent text-sm mt-1 font-medium drop-shadow-sm">{education.metric}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {education.certifications.map((cert) => (
                <span key={cert} className="px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded-full border border-emerald-400/30">
                  {cert}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-300">
              Languages: {education.languages.join(', ')}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSkills;