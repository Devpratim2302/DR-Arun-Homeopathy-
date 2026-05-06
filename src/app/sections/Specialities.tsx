import { motion } from 'motion/react';
import treeSrc from '@/assets/homeo/homeo_treatment_tree.png';

export default function Specialities() {
  return (
    <section id="specialities" className="pt-24 pb-4 bg-white relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1B3A6B]/20 to-transparent" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#1B3A6B]/4 rounded-full blur-[100px] -ml-40 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#C62828]/4 rounded-full blur-[100px] -mr-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2"
        >
          <div className="inline-flex items-center bg-[#1B3A6B]/5 rounded-full px-4 py-1.5 mb-4 border border-[#1B3A6B]/10">
            <span className="text-[#1B3A6B] text-[10px] font-black tracking-[0.2em] uppercase">What We Treat</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Lora' }}>
            Our <span className="text-[#C62828]">Specialities</span>
          </h2>
          <p className="text-[#5A6077] text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            World's best and effective homeopathy treatment for a wide range of conditions — each uniquely addressed with personalised, root-cause care.
          </p>
          <div className="w-24 h-1.5 bg-[#1B3A6B]/10 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Tree Image — floats freely, no box visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <img
            src={treeSrc}
            alt="Dr. Arun Homeopathy Specialities Tree"
            className="w-full max-w-3xl h-auto object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
