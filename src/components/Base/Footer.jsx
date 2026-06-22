import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111827] py-6 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} SIVAPRAKASAM K. All rights reserved.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-2">
          Built with <span className="text-red-400">❤</span> &amp; React
        </p>
      </div>
    </footer>
  );
};

export default Footer;