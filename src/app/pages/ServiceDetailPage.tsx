import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck, HeartPulse, Clock, Phone } from 'lucide-react';

const serviceData: Record<string, { desc: string; benefits: string[] }> = {
  'Orthopedics': {
    desc: 'Advanced homeopathic care for bone, joint, and muscular health. We focus on reducing inflammation and promoting natural tissue repair.',
    benefits: ['Non-surgical pain relief', 'Improved joint mobility', 'Long-term management of chronic arthritis', 'Safe for all age groups']
  },
  'Allergic Diseases': {
    desc: 'Holistic treatment for respiratory and skin allergies. Our remedies aim to desensitize the immune system rather than just suppressing symptoms.',
    benefits: ['Reduces dependency on inhalers/antihistamines', 'Deep constitutional healing', 'Prevention of seasonal recurrences', 'No side effects like drowsiness']
  },
  'Skin Diseases': {
    desc: 'Comprehensive healing for chronic skin conditions from the inside out. We address the root cause of flares and promote healthy skin regeneration.',
    benefits: ['Effective for Psoriasis and Eczema', 'Natural pigmentation restoration', 'Safe for sensitive skin', 'Treats the root cause, not just the surface']
  },
  'Infertility': {
    desc: 'Gentle and effective support for reproductive health. Our holistic approach addresses hormonal imbalances and improves vitality naturally.',
    benefits: ['Hormonal balance restoration', 'Improves egg/sperm quality', 'Stress-free natural treatment', 'Personalized constitutional protocols']
  },
  'Diabetes': {
    desc: 'Metabolic support to maintain healthy blood sugar levels and prevent long-term complications through constitutional homeopathy.',
    benefits: ['Supports pancreatic function', 'Prevents diabetic neuropathy', 'Improves insulin sensitivity naturally', 'Holistic metabolic regulation']
  }
};

export default function ServiceDetailPage({ openBookingModal }: { openBookingModal: () => void }) {
  const { serviceName } = useParams();
  const decodedName = decodeURIComponent(serviceName || '');
  
  // Find category based on name or use a default
  const category = Object.keys(serviceData).find(cat => decodedName.includes(cat)) || 'General Care';
  const data = serviceData[category] || {
    desc: `Professional homeopathic consultation and treatment for ${decodedName}. We provide personalized care plans focused on long-term wellness and root-cause healing.`,
    benefits: ['Personalized remedies', 'Root-cause analysis', 'Gentle & safe for all ages', 'Holistic approach to health']
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1B3A6B] to-[#2A4F8A] overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/#services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Lora' }}>
              {decodedName}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                Homeopathic Speciality
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <ShieldCheck className="w-4 h-4 text-green-400" /> Safe & Effective Treatment
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'Lora' }}>
                About the Treatment
              </h2>
              <p className="text-[#5A6077] text-lg leading-relaxed mb-10">
                {data.desc}
              </p>

              <h3 className="text-xl font-bold text-[#1A1A2E] mb-6">Why Choose Our Care?</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {data.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#F0F4FA] p-5 rounded-2xl border border-[#1B3A6B]/5">
                    <CheckCircle2 className="w-5 h-5 text-[#1B3A6B] mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-[#1A1A2E]">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#1B3A6B]/5 rounded-3xl p-8 border border-[#1B3A6B]/10">
                <div className="flex items-center gap-4 mb-4">
                  <HeartPulse className="w-8 h-8 text-[#C62828]" />
                  <h4 className="text-xl font-bold text-[#1A1A2E]">The Homeopathic Advantage</h4>
                </div>
                <p className="text-[#5A6077] leading-relaxed">
                  Unlike conventional medicine which often suppresses symptoms, homeopathy works by stimulating the body's own healing mechanisms. For {decodedName}, we analyze your unique symptoms and constitutional makeup to provide a remedy that is specifically tailored to you.
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-8 shadow-2xl border border-[#1B3A6B]/5 sticky top-24">
                <h4 className="text-xl font-bold text-[#1A1A2E] mb-6">Book Your Consultation</h4>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#5A6077]">
                    <Clock className="w-4 h-4 text-[#1B3A6B]" /> Available 7 Days a Week
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#5A6077]">
                    <Phone className="w-4 h-4 text-[#1B3A6B]" /> +91 72071 15599
                  </div>
                </div>
                <button onClick={openBookingModal} 
                  className="w-full bg-[#1B3A6B] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#2A4F8A] transition-all mb-4">
                  Request Appointment
                </button>
                <p className="text-[10px] text-center text-[#5A6077] uppercase tracking-widest font-bold">
                  Consultation starts at your convenience
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
