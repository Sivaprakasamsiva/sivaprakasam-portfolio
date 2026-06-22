import React from 'react';
import { motion } from 'framer-motion';

const FreelanceServices = ({ profile }) => {
  if (!profile) return null;

  const services = profile.freelanceServices;

  return (
    <section id="services" className="py-20 bg-[#111827] relative overflow-hidden">
      {/* Background Video with Mask */}
      {profile.freelanceVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.35,
              maskImage: 'radial-gradient(ellipse at center, transparent 25%, black 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 25%, black 65%)',
            }}
          >
            <source src={profile.freelanceVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      <div className="absolute inset-0 bg-[#111827]/75"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Freelance</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Premium Services</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            High-value engineering solutions for clients who demand excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: false }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel p-8 rounded-2xl text-center border border-white/10 hover:border-accent/40 transition-all cursor-hover relative overflow-hidden group backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <i className={`fas ${service.icon || 'fa-code'} text-accent text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{service.title}</h3>
              <p className="text-gray-300 text-sm relative z-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelanceServices;