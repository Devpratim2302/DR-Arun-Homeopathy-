import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Images, ChevronLeft, ChevronRight, FolderOpen, ArrowLeft } from 'lucide-react';
import bannerImg from '../../assets/testimonials_banner.png';

// Dynamically import all gallery images and videos from subfolders
const mediaModules = import.meta.glob('../../assets/gallery/**/*.{jpeg,jpg,png,webp,mp4,mov,m4v,MOV}', { eager: true }) as Record<string, { default: string }>;

const ALBUMS_CONFIG = [
  { id: 'hair', folder: 'hair', title: 'Hair Care', description: 'Specialized treatments for hair loss, dandruff, and scalp health.' },
  { id: 'peds', folder: 'pediatric', title: 'Pediatric Care', description: 'Gentle and effective homeopathic healing for children.' },
  { id: 'skin', folder: 'skin', title: 'Skin Care', description: 'Treating acne, eczema, and various skin conditions.' },
  { id: 'joints', folder: 'joints', title: 'Joint & Muscle', description: 'Relief from arthritis, spondylitis, and chronic body pains.' },
  { id: 'weightloss', folder: 'weightloss', title: 'Weight Management', description: 'Natural weight management and metabolic health solutions.' },
  { id: 'autism', folder: 'autism', title: 'Autism Support', description: 'Specialized pediatric support and developmental care.' },
  { id: 'cancer', folder: 'cancer', title: 'Chronic & Cancer Support', description: 'Supportive care and holistic management for chronic conditions.' },
  { id: 'infertility', folder: ' infertility', title: 'Infertility', description: 'Effective homeopathic solutions for fertility and reproductive health.' },
  { id: 'infections', folder: 'infections', title: 'Infections', description: 'Managing acute and chronic infections naturally.' },
  { id: 'liver-kidney', folder: 'liver and kidney', title: 'Liver & Kidney', description: 'Holistic support for organ health and chronic conditions.' },
  { id: 'piles', folder: 'piles', title: 'Piles & Fissures', description: 'Natural and effective relief for anorectal conditions.' },
  { id: 'videos', folder: 'videos', title: 'Patient Testimonials', description: 'Educational insights and patient success stories.' },
];

const ALBUMS = ALBUMS_CONFIG.map(album => {
  const items = Object.entries(mediaModules)
    .filter(([path]) => {
      const parts = path.split('/');
      // The folder name is the second to last part (e.g., ../../assets/gallery/hair/img.jpg)
      return parts[parts.length - 2] === album.folder;
    })
    .map(([path, module]) => {
      const lowerPath = path.toLowerCase();
      const isVideo = lowerPath.endsWith('.mp4') || lowerPath.endsWith('.mov') || lowerPath.endsWith('.m4v');
      return {
        type: isVideo ? 'video' as const : 'image' as const,
        src: module.default,
        id: path
      };
    });

  return {
    ...album,
    media: items,
    cover: album.id === 'videos' ? bannerImg : (items.find(i => i.type === 'image')?.src || items[0]?.src || '')
  };
}).filter(album => album.media.length > 0);

export default function Gallery() {
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

  const activeAlbum = useMemo(() => ALBUMS.find(a => a.id === activeAlbumId), [activeAlbumId]);

  const albumMedia = useMemo(() => {
    return activeAlbum?.media || [];
  }, [activeAlbum]);

  const prev = () => setSelectedMediaIndex(s => s !== null ? (s - 1 + albumMedia.length) % albumMedia.length : null);
  const next = () => setSelectedMediaIndex(s => s !== null ? (s + 1) % albumMedia.length : null);

  return (
    <section id="gallery" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-[#1B3A6B]/5 rounded-full px-4 py-1.5 mb-4 border border-[#1B3A6B]/10">
              <Images className="w-4 h-4 text-[#1B3A6B]" />
              <span className="text-[#1B3A6B] text-[10px] font-black tracking-[0.2em] uppercase">Visual Journey</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Lora' }}>
              Our <span className="text-[#C62828]">Gallery</span>
            </h2>
            <p className="text-[#5A6077] mt-4 max-w-xl text-sm lg:text-base leading-relaxed">
              Explore our specialized departments and witness the healing environment at Dr. Arun Homeopathy.
            </p>
          </motion.div>

          {activeAlbumId && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setActiveAlbumId(null)}
              className="flex items-center gap-2 px-6 py-3 bg-white shadow-lg rounded-full text-[#1B3A6B] font-bold text-sm hover:bg-[#1B3A6B] hover:text-white transition-all border border-[#1B3A6B]/10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Albums
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!activeAlbumId ? (
            /* Albums Grid */
            <motion.div
              key="albums"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ALBUMS.map((album, idx) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveAlbumId(album.id)}
                  className="group cursor-pointer relative bg-[#1B3A6B] rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-white/10"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <FolderOpen className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">
                        {album.media.length} Items
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Lora' }}>{album.title}</h3>
                    <p className="text-white/60 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {album.description}
                    </p>
                  </div>

                  {/* Hover Accent */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Media Grid for Selected Album */
            <motion.div
              key="media"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1B3A6B]/20 to-transparent" />
                <span className="text-[#1B3A6B] font-bold text-xs uppercase tracking-widest whitespace-nowrap px-4">
                  Viewing: {activeAlbum.title}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1B3A6B]/20 to-transparent" />
              </div>

              <div
                style={{ columnCount: 3, columnGap: '16px' }}
                className="sm:[column-count:2] lg:[column-count:3] [column-count:1]"
              >
                {albumMedia.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedMediaIndex(i)}
                    className="relative mb-4 cursor-pointer overflow-hidden rounded-2xl shadow-md group break-inside-avoid border border-[#1B3A6B]/5"
                  >
                    {item.type === 'video' ? (
                      <div className="relative">
                        <video src={item.src} className="w-full block" muted playsInline />
                        <div className="absolute inset-0 bg-[#1B3A6B]/30 flex items-center justify-center group-hover:bg-[#1B3A6B]/10 transition-all">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-[#1B3A6B] ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <img src={item.src} alt="" className="w-full block object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMediaIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A]/98 z-[200] flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedMediaIndex(null)}
          >
            <button
              onClick={() => setSelectedMediaIndex(null)}
              className="absolute top-6 right-6 text-white/50 bg-white/5 rounded-full p-3 hover:bg-white/10 hover:text-white transition z-10 border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-6 text-white/50 bg-white/5 rounded-full p-4 hover:bg-white/10 hover:text-white transition z-10 border border-white/10 hidden md:flex"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={selectedMediaIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[85vh] flex items-center justify-center relative"
            >
              {albumMedia[selectedMediaIndex].type === 'video' ? (
                <video
                  src={albumMedia[selectedMediaIndex].src}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-full rounded-2xl shadow-2xl border border-white/10"
                />
              ) : (
                <img
                  src={albumMedia[selectedMediaIndex].src}
                  alt=""
                  className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              )}
              
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
                  {selectedMediaIndex + 1} / {albumMedia.length}
                </span>
              </div>
            </motion.div>

            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-6 text-white/50 bg-white/5 rounded-full p-4 hover:bg-white/10 hover:text-white transition z-10 border border-white/10 hidden md:flex"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1B3A6B]/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C62828]/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
    </section>
  );
}
