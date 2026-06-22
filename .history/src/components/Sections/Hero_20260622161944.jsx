import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../UI/GlassButton';

const Hero = ({ profile }) => {
  if (!profile) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Video with Mask */}
      {profile.heroVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.6,
              maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 70%)',
            }}
          >
            <source src={profile.heroVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Gradient Overlay - Weaker on edges, stronger on text */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/70 via-[#0B0F19]/50 to-[#0B0F19]/70"></div>
      
      {/* Additional radial mask for text area */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 40% 50%, rgba(11, 15, 25, 0.6) 0%, rgba(11, 15, 25, 0) 70%)'
      }}></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
                <i className="fas fa-code mr-2"></i> {profile.title}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
              {profile.name}
            </motion.h1>
            <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 mt-3 font-light drop-shadow-lg">
              {profile.dualIdentity}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-200 text-base mt-4 max-w-lg drop-shadow-lg">
              {profile.summary}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-8">
              <GlassButton href="#projects" primary>
                <i className="fas fa-rocket"></i> Explore Portfolio
              </GlassButton>
              <GlassButton href="#contact">
                <i className="fas fa-handshake"></i> Get In Touch
              </GlassButton>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex gap-6 mt-8 text-sm text-gray-300 drop-shadow-lg">
              <span><i className="fas fa-map-pin text-accent mr-2"></i>{profile.location}</span>
              <span><i className="fas fa-envelope text-accent mr-2"></i>{profile.email}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-emerald-400/30 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 border-2 border-accent/20 rounded-full"></div>
              <div className="absolute inset-4 border border-white/10 rounded-full"></div>
              <div className="absolute inset-8 rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-emerald-400/20 backdrop-blur-sm border-2 border-accent/30 shadow-2xl shadow-accent/20">
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/60">SK</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;