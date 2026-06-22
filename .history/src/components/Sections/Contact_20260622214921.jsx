import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Contact = ({ profile }) => {
  if (!profile) return null;

  // ============================================================
  // 1. FORM STATE (Controlled Inputs)
  // ============================================================
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const formRef = useRef(null);

  // ============================================================
  // 2. HANDLERS
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ============================================================
  // 3. FORM SUBMISSION (Secure Backend Call)
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus({ type: '', message: '' });

    try {
      // API endpoint - adjust to your server URL
      // In Contact.jsx - inside handleSubmit function
    // Inside the handleSubmit function, replace the API_URL:
    const API_URL = import.meta.env.PROD 
      ? '/api/send-email'  // Production: uses Vercel serverless function
      : 'http://localhost:5000/api/send-email';  // Development: local server

    // Or use environment variable:
    const API_URL = import.meta.env.VITE_API_URL || '/api/send-email';  

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          type: 'success',
          message: '✅ Message sent successfully! I\'ll get back to you soon.',
        });
        // Clear form
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: '',
        });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setFormStatus({
          type: 'error',
          message: data.error || '❌ Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Send error:', error);
      setFormStatus({
        type: 'error',
        message: '❌ Connection error. Please check your internet and try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Video */}
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
          {/* Contact Info - Left Column */}
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

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="glass-panel p-8 rounded-2xl backdrop-blur-md"
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Form Status Message */}
                {formStatus.message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      formStatus.type === 'success'
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                        : 'bg-red-400/10 text-red-400 border border-red-400/20'
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Project inquiry"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-gray-300 text-sm block mb-1">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    minLength="10"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-hover ${
                    isSending ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSending ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Message
                    </>
                  )}
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