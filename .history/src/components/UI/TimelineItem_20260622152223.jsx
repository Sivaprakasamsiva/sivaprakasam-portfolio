import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ title, subtitle, date, items, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
      className="relative pl-8 pb-8 border-l-2 border-accent/40 last:border-l-0 last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent border-2 border-[#0B0F19] shadow-lg shadow-accent/20"></div>
      <div className="mb-1">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-accent text-sm">{subtitle}</p>
        <p className="text-gray-400 text-xs">{date}</p>
      </div>
      {items && (
        <ul className="mt-2 space-y-1 text-sm text-gray-300">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default TimelineItem;