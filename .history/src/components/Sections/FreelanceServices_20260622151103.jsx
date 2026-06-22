import React from 'react';
import { motion } from 'framer-motion';

const FreelanceServices = ({ profile }) => {
  if (!profile) return null;

  const services = profile.freelanceServices;

  return (
    <section id="services" className="py-20 bg-[#111827]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Freelance</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Premium Services</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
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
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel p-8 rounded-2xl text-center border border-white/5 hover:border-accent/30 transition-all cursor-hover relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <i className={`fas ${service.icon || 'fa-code'} text-accent text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{service.title}</h3>
              <p className="text-gray-400 text-sm relative z-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelanceServices;