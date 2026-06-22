import React from 'react';
import { motion } from 'framer-motion';
import BentoCard from '../UI/BentoCard';

const AboutSkills = ({ profile, education }) => {
  if (!profile || !education) return null;

  const skillsMatrix = profile.skillsMatrix;
  const categoryEntries = Object.entries(skillsMatrix);

  return (
    <section id="about" className="py-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Video */}
      {profile.skillsVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-5"
        >
          <source src={profile.skillsVideo} type="video/mp4" />
        </video>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
            >
              <BentoCard title={category} items={items} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="text-white font-semibold mb-3">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="text-white font-semibold mb-3">Education</h4>
            <p className="text-gray-300">{education.degree}</p>
            <p className="text-gray-400 text-sm">{education.institution}</p>
            <p className="text-accent text-sm mt-1">{education.metric}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {education.certifications.map((cert) => (
                <span key={cert} className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full border border-emerald-400/20">
                  {cert}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-400">
              Languages: {education.languages.join(', ')}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSkills;