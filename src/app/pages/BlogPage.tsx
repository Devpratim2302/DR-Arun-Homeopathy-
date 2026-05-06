import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, User, Calendar, ArrowRight, Share2, MessageCircle, ArrowLeft, ExternalLink, ShieldCheck, Search } from 'lucide-react';
import imgOrthoBlog from '@/assets/blog/ortho_blog.png';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const blogs = [
  { 
    id: 1,
    title: "What's the reason so many older adults aren't active?", 
    cat: 'Wellness', 
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    date: 'Oct 12, 2024',
    author: 'Dr. Arun',
    desc: 'Physical activity is vital for health as we age, yet many older adults face barriers. This post explores the common challenges and how homeopathy can help in maintaining vitality.',
    content: `
      Physical activity is a cornerstone of healthy aging. However, statistics from the World Health Organization (WHO) show that more than 25% of adults worldwide are not active enough. For older adults, this lack of activity is often tied to joint pain, fear of injury, or chronic conditions.
      
      Homeopathy offers a gentle, non-invasive way to manage these barriers. By addressing the root cause of inflammation and stiffness, natural remedies can help seniors regain their mobility and confidence.
      
      Key benefits of staying active:
      - Improved cardiovascular health
      - Better weight management
      - Enhanced mental well-being and cognitive function
      - Stronger immunity
    `,
    source: 'World Health Organization (WHO)',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity'
  },
  { 
    id: 2,
    title: 'Blood Cancers: Early Signs, Symptoms & Care', 
    cat: 'Oncology', 
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
    date: 'Sep 28, 2024',
    author: 'Medical Staff',
    desc: 'Understanding the early warning signs of blood-related disorders is crucial. We discuss how holistic care can support energy levels and immunity during treatment.',
    content: `
      Blood cancers, including leukemia, lymphoma, and myeloma, affect the production and function of your blood cells. According to the Leukemia & Lymphoma Society, early detection significantly improves treatment outcomes.
      
      Common early symptoms include:
      - Persistent fatigue and weakness
      - Frequent infections
      - Unexplained weight loss
      - Swollen lymph nodes
      
      While conventional treatments are primary, holistic and supportive homeopathic care focuses on managing the side effects of chemotherapy, boosting energy levels, and strengthening the body's natural defense systems.
    `,
    source: 'Leukemia & Lymphoma Society',
    sourceUrl: 'https://www.lls.org/facts-and-statistics'
  },
  { 
    id: 3,
    title: 'Best Orthopaedic Surgeons & Care Practices', 
    cat: 'Ortho', 
    img: imgOrthoBlog,
    date: 'Aug 15, 2024',
    author: 'Dr. Arun',
    desc: 'Joint pain and bone health are common concerns. In this post, we look at non-invasive ways to manage orthopaedic pain and improve mobility naturally.',
    content: `
      Chronic joint pain and osteoarthritis affect millions of people. The Mayo Clinic emphasizes that conservative management—including physical therapy and non-drug interventions—should often be the first line of defense.
      
      Homeopathic orthopaedic care targets the underlying inflammatory processes. Remedies like Rhus Tox and Arnica are widely recognized for their efficacy in reducing swelling and improving joint lubrication without the side effects associated with long-term NSAID use.
      
      Tips for better bone health:
      - Maintain a calcium-rich diet
      - Regular weight-bearing exercises
      - Natural anti-inflammatory support
    `,
    source: 'Mayo Clinic',
    sourceUrl: 'https://www.mayoclinic.org/diseases-conditions/osteoarthritis/diagnosis-treatment/drc-20351930'
  },
  { 
    id: 4,
    title: "Do's and Don'ts After Cataract Surgery", 
    cat: 'Eye Care', 
    img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80',
    date: 'Jul 05, 2024',
    author: 'Medical Staff',
    desc: 'Recovery after eye surgery requires careful attention. We provide a comprehensive guide on post-operative care and how natural remedies can aid healing.',
    content: `
      Cataract surgery is one of the most common and successful procedures. To ensure the best results, the American Academy of Ophthalmology recommends strict adherence to post-operative guidelines.
      
      Important Do's:
      - Use prescribed eye drops exactly as directed.
      - Wear your protective eye shield while sleeping.
      - Take it easy for the first few days.
      
      Important Don'ts:
      - Don't rub your eyes.
      - Don't swim or use a hot tub for at least two weeks.
      - Don't lift heavy objects or perform strenuous exercise.
      
      Homeopathy can provide supportive care during recovery to manage minor irritation and promote faster tissue healing.
    `,
    source: 'American Academy of Ophthalmology',
    sourceUrl: 'https://www.aao.org/eye-health/diseases/what-is-cataract-surgery'
  },
  { 
    id: 5,
    title: 'Managing Diabetes Naturally: A Holistic Guide', 
    cat: 'Endocrine', 
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80',
    date: 'Jun 20, 2024',
    author: 'Dr. Arun',
    desc: 'Diabetes management goes beyond insulin. Learn how lifestyle changes and constitutional homeopathy can help maintain stable blood sugar levels.',
    content: `
      The National Institute of Health (NIH) highlights that lifestyle modification is the foundation of type 2 diabetes management. Balancing blood sugar requires a multi-faceted approach involving diet, exercise, and stress management.
      
      Homeopathy focuses on the individual's metabolic profile. Remedies are chosen to support pancreatic function and improve the body's utilization of glucose, often working alongside conventional care to prevent long-term complications like neuropathy.
    `,
    source: 'National Institutes of Health (NIH)',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes'
  },
  { 
    id: 6,
    title: 'Kidney Stones: Prevention and Natural Care', 
    cat: 'Urology', 
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80',
    date: 'May 12, 2024',
    author: 'Medical Staff',
    desc: 'Preventing the recurrence of kidney stones is a major health priority. We explore hydration, diet, and homeopathic remedies for renal health.',
    content: `
      According to the National Kidney Foundation, 1 in 10 people will have a kidney stone at some point in their life. Hydration is the single most important factor in prevention.
      
      Homeopathy offers specific remedies like Berberis Vulgaris that are traditionally used to manage the pain of renal colic and assist in the natural passage of small stones by relaxing the urinary tract.
    `,
    source: 'National Kidney Foundation',
    sourceUrl: 'https://www.kidney.org/atoz/content/kidneystones'
  },
];

const suggestions = [
  'Common Cold & Flu Prevention',
  'Homeopathy for Child Immunity',
  'Managing Anxiety Naturally',
  'Skin Care during Summers',
  'PCOD & Hormonal Balance',
  'Joint Pain Relief Tips'
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePosts(prev => prev + 2);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="pt-20">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Page Header */}
            <section className="relative py-20 bg-gradient-to-br from-[#1B3A6B] to-[#2A4F8A] overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A7CC9]/20 rounded-full blur-3xl opacity-50" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                    <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">Health Insights</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Lora' }}>
                    Our <span className="text-[#6B9BE0]">Blog</span>
                  </h1>
                  <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                    Explore our latest articles, guides, and research on holistic health, homeopathy, and wellness.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Blog List Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {blogs.slice(0, visiblePosts).map((b, i) => (
                    <motion.div key={i} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: (i % 2) * 0.1 }}
                      onClick={() => { setSelectedPost(b); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-[#F0F4FA] rounded-[32px] overflow-hidden hover:shadow-2xl transition-all group flex flex-col md:flex-row cursor-pointer">
                      <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                        <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 bg-[#1B3A6B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{b.cat}</div>
                      </div>
                      <div className="md:w-3/5 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 text-[10px] text-[#5A6077] mb-4">
                            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                              <Calendar className="w-3 h-3 text-[#1B3A6B]" /> {b.date}
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                              <User className="w-3 h-3 text-[#1B3A6B]" /> {b.author}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Lora' }}>{b.title}</h3>
                          <p className="text-[#5A6077] text-sm leading-relaxed mb-6 line-clamp-3">
                            {b.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-[#1B3A6B]/10">
                          <button className="text-[#1B3A6B] font-bold text-sm flex items-center gap-1.5 hover:gap-3 transition-all">
                            Continue Reading <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {visiblePosts < blogs.length && (
                  <motion.div {...fadeInUp} className="text-center mt-16">
                    <button 
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="inline-flex items-center gap-2 border-2 border-[#1B3A6B] text-[#1B3A6B] px-8 py-3 rounded-full font-bold hover:bg-[#1B3A6B] hover:text-white transition-all disabled:opacity-50">
                      {loading ? 'Loading...' : 'Load More Posts'}
                    </button>
                  </motion.div>
                )}

                {/* Topics Suggestions Section */}
                {visiblePosts >= blogs.length && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-20 pt-16 border-t border-[#1B3A6B]/10">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 text-[#C62828] mb-2">
                        <Search className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">More Topics to Explore</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Lora' }}>Popular Suggestions</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                      {suggestions.map((s, i) => (
                        <button key={i} className="px-5 py-2.5 bg-[#F0F4FA] text-[#1B3A6B] rounded-full text-sm font-semibold hover:bg-[#1B3A6B] hover:text-white transition-all shadow-sm">
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <button onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-[#1B3A6B] font-bold mb-8 hover:gap-4 transition-all">
                <ArrowLeft className="w-5 h-5" /> Back to Blog
              </button>

              <div className="rounded-[40px] overflow-hidden shadow-2xl mb-12">
                <img src={selectedPost.img} alt={selectedPost.title} className="w-full h-[400px] object-cover" />
              </div>

              <div className="flex items-center gap-6 text-sm text-[#5A6077] mb-8 pb-8 border-b border-[#1B3A6B]/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1B3A6B]" /> {selectedPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#1B3A6B]" /> By {selectedPost.author}
                </div>
                <div className="flex items-center gap-2 bg-[#1B3A6B]/5 text-[#1B3A6B] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest">
                  {selectedPost.cat}
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-10 leading-tight" style={{ fontFamily: 'Lora' }}>
                {selectedPost.title}
              </h1>

              <div className="prose prose-lg max-w-none text-[#5A6077] leading-relaxed mb-16 whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Verified Source Box */}
              <div className="bg-[#F0F4FA] rounded-[32px] p-8 border border-[#1B3A6B]/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A2E]">Trusted Source</h4>
                    <p className="text-xs text-[#5A6077]">Verified information from {selectedPost.source}</p>
                  </div>
                </div>
                <a href={selectedPost.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-[#1B3A6B] px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all text-sm">
                  View Source <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-20 pt-10 border-t border-[#1B3A6B]/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#1A1A2E]">Share this article:</span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-[#F0F4FA] hover:bg-[#1B3A6B] hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                    <button className="p-2 rounded-full bg-[#F0F4FA] hover:bg-[#1B3A6B] hover:text-white transition-all"><MessageCircle className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stay Informed Banner (only shown on list view) */}
      {!selectedPost && (
        <section className="py-20 bg-[#F0F4FA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1B3A6B] rounded-[32px] p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mb-16 -mr-16" />
                <motion.div {...fadeInUp}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Lora' }}>
                    Never Miss a Health Tip
                  </h2>
                  <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                    Our blog is updated weekly with insights and tips to keep you and your family healthy.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
                      <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50" />
                      <button className="bg-white text-[#1B3A6B] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-white/90 transition-all">Subscribe</button>
                  </div>
                </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
