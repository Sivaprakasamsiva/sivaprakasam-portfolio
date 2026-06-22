import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = ({ profile }) => {
  if (!profile) return null;

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Video with Mask */}
      {profile.contactVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.3,
              maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 60%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 60%)',
            }}
          >
            <source src={profile.contactVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      <div className="absolute inset-0 bg-[#0B0F19]/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Connect</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Let's Work Together</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            Have a project in mind? Reach out and let's build something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="glass-panel p-8 rounded-2xl backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white mb-6">Direct Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white flex items-center gap-2">
                    {profile.email}
                    <button 
                      onClick={copyEmail} 
                      className="text-accent hover:text-accent/80 transition-colors cursor-hover"
                      aria-label="Copy email to clipboard"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    {copied && <span className="text-emerald-400 text-xs animate-pulse">Copied!</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <i className="fas fa-map-pin"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">{profile.location}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent/20 transition-all cursor-hover"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent/20 transition-all cursor-hover"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="glass-panel p-8 rounded-2xl backdrop-blur-md"
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Message</label>
                  <textarea
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-hover"
                >
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;