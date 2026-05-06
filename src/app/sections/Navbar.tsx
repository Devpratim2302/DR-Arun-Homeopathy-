import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import logoImg from '../../assets/logo-transparent.png';
import arhLogo from '../../assets/arh-logo-transparent.png';

const serviceCategories = [
  { heading: 'Orthopedics', items: ['Joint Pains', 'Osteo Arthritis', 'Rheumatoid Arthritis', 'Gouty Arthritis', 'Psoriatic Arthritis', 'Frozen Shoulder', 'Tennis Elbow'] },
  { heading: 'Allergic Diseases', items: ['Allergic Rhinitis', 'Sinusitis Nasal Polyp', 'Asthma/Allergic Bronchitis', 'Allergic Cold & Cough', 'Skin Allergy/Dermatitis', 'Atopic Dermatitis/Urticaria', 'Allergic Conjunctivitis'] },
  { heading: 'Infertility (Female)', items: ['PCOD', 'Irregular Periods', 'Uterine Fibroids', 'Tubal Blocks', 'Female Hormonal Imbalances', 'Libido Problems'] },
  { heading: 'Infertility (Male)', items: ['Oligo Spermia/Less Motility', 'Arcospermia', 'Sexual Weakness/ED', 'Varicocete', 'Male Hormonal Imbalances', 'Premature Ejaculation'] },
  { heading: 'Thyroid Problems', items: ['Hypothyroid', 'Hyperthyroid', 'Gout'] },
  { heading: 'Spinal Cord Diseases', items: ['Neck Pain/Back Pain', 'Spondylosis/Sponylitis', 'Disc Budge/Disc Herniation/Slip Disc', 'Ankylosing Spondylitis', 'Spinal Canal Stenosis', 'Sciatica'] },
  { heading: 'Skin Diseases', items: ['Psoriasis', 'Leucoderma/Vitiligo', 'Eczema', 'Melasma Hyper Pigmentation', 'Lichen Planus', 'Pitirlasis', 'Ring Worm', 'Corns', 'Warts', 'Acne (Pimples)'] },
  { heading: 'Diabetes', items: ['Uncontrolled Diabetes', 'Diabetic Neuropathy', 'Diabetic Nephropathy', 'Diabetic Retinopathy', 'Diabetic Foot'] },
  { heading: 'Nervous System', items: ['Migraine Headache', 'Epilepsy / Fits', "Parkinson's Disease", 'Foot Drop', 'Motor Neuron Disease', 'Memory Weakness / Memory Loss', "Bell's Palsy"] },
  { heading: 'G.I.T Diseases', items: ['Hyperacidity', 'Gastritis', 'IBS - Irritable Bowel Syndrome', 'GERD / Oesophagitis', 'Piles / Fissures / Fistula', 'Hepatitis - B', 'Chronic Amoebiasis', 'Dysentry', 'Constipation', 'Jaundice', 'Duodenal Ulcers'] },
  { heading: 'Kidney Diseases', items: ['Kidney Stones', 'Chronic UTI (Urinary Tract Infection)', 'Hydronephrosis', 'Renal Cysts'] },
  { heading: 'Auto Immune Disorders', items: ['SLE (Systemic Lupus Erythematosus)', 'MCTD (Mixed Connective Tissue Disease)'] },
  { heading: 'Psychiatric Diseases', items: ['Panic Disorders / Anxiety', 'Depression', 'Insomnia / Sleeplessness', 'OCD', 'Schizophrenia'] },
  { heading: 'Heart Diseases', items: ['HTN (Hypertension)', 'High Cholesterol Levels'] },
  { heading: 'Children Diseases', items: ['Height/Weight Related Problems', 'Bed Wetting', 'ADHD', 'Autism', 'Hyperactivity / Inferiority Complex', 'Examination Fear', 'Behavioural Disorder', "Down's Syndrome"] },
  { heading: 'Others', items: ['Enlarged Prostrate', 'Lipoma', 'Neuro Fibroma', 'Hair Fall / Baldness', 'Premature Graying of Hair', 'Dandruff', 'Obesity', 'Skin Dryness', 'Tonsillitis'] },
];

export default function Navbar({ scrollTo, openBookingModal }: { scrollTo: (id: string) => void, openBookingModal: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Why Homeopathy', path: '/why-homeopathy' },
    { label: 'Services', path: '/services', hasMega: true },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/#contact', id: 'contact' }
  ];

  const handleLinkClick = (link: any) => {
    setMenuOpen(false);
    setServicesOpen(false);
    if (link.id === 'contact') {
      if (pathname !== '/') navigate('/#contact');
      else scrollTo('contact');
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 300); // 300ms delay
    setCloseTimeout(timeout);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#1B3A6B]/5' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 cursor-pointer">
            <img src={logoImg} alt="Dr. Arun Homeopathy" className="h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link =>
              link.hasMega ? (
                <div key={link.label} className="relative group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <Link to={link.path}
                    className={`flex items-center gap-1 text-[#1A1A2E] hover:text-[#1B3A6B] transition-colors text-sm font-bold relative group ${pathname.includes(link.path) ? 'text-[#1B3A6B]' : ''}`}>
                    {link.label} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C62828] transition-all group-hover:w-full ${pathname.includes(link.path) ? 'w-full' : 'w-0'}`} />
                  </Link>

                  {/* Mega Dropdown */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <div className="bg-white rounded-2xl shadow-2xl border border-[#1B3A6B]/10 p-6 w-[880px] max-h-[78vh] overflow-y-auto">
                      <div className="text-center mb-4 pb-3 border-b border-[#1B3A6B]/10">
                        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C62828]">Our Super Speciality Treatments</span>
                      </div>
                      <div className="grid grid-cols-4 gap-x-6 gap-y-5">
                        {serviceCategories.map((cat) => (
                          <div key={cat.heading}>
                            <div className="bg-[#1B3A6B] text-white text-[10px] font-black px-2 py-1 rounded mb-2 uppercase tracking-wide">
                              {cat.heading}
                            </div>
                            <ul className="space-y-0.5">
                              {cat.items.map((item) => (
                                <li key={item}>
                                  <Link 
                                    to={`/service/${encodeURIComponent(item)}`}
                                    onClick={() => { setIsHovered(false); setMenuOpen(false); }}
                                    className="text-[11px] text-[#5A6077] hover:text-[#C62828] cursor-pointer leading-snug transition-colors block py-0.5"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : link.path.startsWith('/#') ? (
                <button key={link.label} onClick={() => handleLinkClick(link)}
                  className="text-[#1A1A2E] hover:text-[#1B3A6B] transition-colors text-sm font-bold relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C62828] transition-all group-hover:w-full" />
                </button>
              ) : (
                <Link key={link.label} to={link.path} onClick={() => setMenuOpen(false)}
                  className={`text-[#1A1A2E] hover:text-[#1B3A6B] transition-colors text-sm font-bold relative group ${pathname === link.path ? 'text-[#1B3A6B]' : ''}`}>
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C62828] transition-all group-hover:w-full ${pathname === link.path ? 'w-full' : 'w-0'}`} />
                </Link>
              )
            )}
            <button onClick={openBookingModal}
              className="bg-[#1B3A6B] text-white px-5 py-2.5 rounded-full hover:bg-[#2A4F8A] transition-all shadow-md hover:shadow-lg text-sm font-bold animate-pulse-glow">
              Book Appointment
            </button>
            <img src={arhLogo} alt="ARH - Choose Homeopathy" className="h-12 w-auto object-contain" />
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#1B3A6B]">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="lg:hidden py-4 border-t border-[#1B3A6B]/10 overflow-hidden bg-white/95 backdrop-blur-md">
              <div className="flex flex-col gap-1">
                {navLinks.map(link =>
                  link.hasMega ? (
                    <div key={link.label} className="flex flex-col">
                      <button onClick={() => setServicesOpen(!servicesOpen)}
                        className={`flex items-center justify-between px-4 py-3 text-[#1A1A2E] hover:text-[#1B3A6B] font-bold text-sm ${pathname.includes('/services') ? 'bg-[#1B3A6B]/5 text-[#1B3A6B]' : ''}`}>
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 pr-2 pb-2 max-h-72 overflow-y-auto">
                            {serviceCategories.map((cat) => (
                              <div key={cat.heading} className="mb-3">
                                <div className="bg-[#1B3A6B] text-white text-[9px] font-black px-2 py-0.5 rounded mb-1 uppercase tracking-wide inline-block">
                                  {cat.heading}
                                </div>
                                {cat.items.map((item) => (
                                  <Link 
                                    key={item}
                                    to={`/service/${encodeURIComponent(item)}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[11px] text-[#5A6077] py-1 pl-2 border-l border-[#1B3A6B]/10 block hover:text-[#C62828] transition-colors"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.path.startsWith('/#') ? (
                    <button key={link.label} onClick={() => handleLinkClick(link)}
                      className="block w-full text-left px-4 py-3 text-[#1A1A2E] hover:text-[#1B3A6B] font-bold text-sm">
                      {link.label}
                    </button>
                  ) : (
                    <Link key={link.label} to={link.path} onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 text-[#1A1A2E] hover:text-[#1B3A6B] font-bold text-sm ${pathname === link.path ? 'bg-[#1B3A6B]/5 text-[#1B3A6B]' : ''}`}>
                      {link.label}
                    </Link>
                  )
                )}
                <div className="px-4 py-3 mt-2">
                  <button onClick={() => { setMenuOpen(false); openBookingModal(); }}
                    className="w-full bg-[#1B3A6B] text-white px-6 py-3 rounded-full font-bold shadow-lg">Book Appointment</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
