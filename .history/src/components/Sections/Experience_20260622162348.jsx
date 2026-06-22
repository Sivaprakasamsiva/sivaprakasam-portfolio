import React from 'react';
import { motion } from 'framer-motion';
import TimelineItem from '../UI/TimelineItem';

const Experience = ({ experience, education }) => {
  if (!experience || !education) return null;

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Video - More visible */}
      {experience.experienceVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.5,
              maskImage: 'radial-gradient(ellipse at center, transparent 25%, black 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 25%, black 65%)',
            }}
          >
            <source src={experience.experienceVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Lighter overlay for better video visibility */}
      <div className="absolute inset-0 bg-[#0B0F19]/60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Timeline</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Experience & Education</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="mb-10"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-briefcase text-accent"></i> Professional
            </h3>
            <div className="glass-panel-light p-6 rounded-2xl backdrop-blur-sm">
              <TimelineItem
                title={experience.role}
                subtitle={experience.company}
                date={experience.timeline}
                items={experience.accomplishments}
                isLast={false}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-accent"></i> Education
            </h3>
            <div className="glass-panel-light p-6 rounded-2xl backdrop-blur-sm">
              <TimelineItem
                title={education.degree}
                subtitle={education.institution}
                date={education.metric}
                items={null}
                isLast={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;