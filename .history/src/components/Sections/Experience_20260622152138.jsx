import React from 'react';
import { motion } from 'framer-motion';
import TimelineItem from '../UI/TimelineItem';

const Experience = ({ experience, education }) => {
  if (!experience || !education) return null;

  return (
    <section id="experience" className="py-20 bg-[#111827] relative overflow-hidden">
      {/* Background Video */}
      {experience.experienceVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-5"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <source src={experience.experienceVideo} type="video/mp4" />
        </video>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Timeline</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Experience & Education</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto mt-12">
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
            <TimelineItem
              title={experience.role}
              subtitle={experience.company}
              date={experience.timeline}
              items={experience.accomplishments}
              isLast={false}
            />
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
            <TimelineItem
              title={education.degree}
              subtitle={education.institution}
              date={education.metric}
              items={null}
              isLast={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;