import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CLINIC_WHATSAPP = '917207115599'; // +91 72071 15599

const concerns = [
  'Orthopedics', 'Allergic Diseases', 'Infertility (Female)', 'Infertility (Male)',
  'Thyroid Problems', 'Spinal Cord Diseases', 'Skin Diseases', 'Diabetes',
  'Nervous System', 'G.I.T Diseases', 'Kidney Diseases', 'Auto Immune Disorders',
  'Psychiatric Diseases', 'Heart Diseases', 'Children Diseases', 'Others',
];

const countryCodes = [
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+1', country: 'CA', flag: '🇨🇦' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
];

function CustomDropdown({ 
  label, options, value, onChange, dark, type = 'text' 
}: { 
  label: string; options: any[]; value: string; onChange: (v: string) => void; dark: boolean; type?: 'text' | 'country' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400); // 400ms delay
  };

  const selectedOption = type === 'country' 
    ? options.find(o => o.code === value) 
    : value;

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <label className={dark ? "block text-white/70 text-sm font-medium mb-1" : "block text-[#1A1A2E]/70 text-sm font-medium mb-1"}>
        {label}
      </label>
      <div className={`cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
        dark 
          ? "bg-white/10 border border-white/15 text-white hover:border-white/30" 
          : "bg-[#F0F4FA] border border-[#1B3A6B]/15 text-[#1A1A2E] hover:border-[#1B3A6B]/30"
      }`}>
        <span className="text-sm">
          {type === 'country' ? `${selectedOption.flag} ${selectedOption.code}` : (value || "Select concern")}
        </span>
        <ChevronDown className={`w-4 h-4 opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className={`absolute z-50 left-0 right-0 mt-2 rounded-xl shadow-2xl border overflow-hidden max-h-60 overflow-y-auto ${
          dark ? "bg-[#1A1A2E] border-white/10" : "bg-white border-[#1B3A6B]/10"
        }`}>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => { onChange(type === 'country' ? opt.code : opt); setIsOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                dark 
                  ? "text-white/80 hover:bg-white/10" 
                  : "text-[#1A1A2E]/80 hover:bg-[#F0F4FA]"
              } ${ (type === 'country' ? opt.code : opt) === value ? (dark ? 'bg-white/5' : 'bg-[#F0F4FA]') : '' }`}
            >
              {type === 'country' ? `${opt.flag} ${opt.country} (${opt.code})` : opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BookingForm({ dark = true, onSuccess, showQuestion = false }: { dark?: boolean; onSuccess?: () => void; showQuestion?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', problem: '', countryCode: '+91', question: '' });
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setForm({ ...form, phone: value });
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (!form.problem) {
      setError('Please select a health concern');
      return;
    }

    const fullPhone = `${form.countryCode}${form.phone}`;
    const intro = showQuestion ? 'I have a question for Dr. Arun Homeopathy.' : 'I would like to book an appointment.';
    const message =
      `Hello Dr. Arun Homeopathy, ${intro}%0A` +
      `*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Phone:* ${encodeURIComponent(fullPhone)}%0A` +
      `*Concern:* ${encodeURIComponent(form.problem)}` +
      (showQuestion && form.question ? `%0A*Question:* ${encodeURIComponent(form.question)}` : '');

    window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${message}`, '_blank');

    setForm({ name: '', phone: '', problem: '', countryCode: '+91', question: '' });
    if (onSuccess) onSuccess();
  };

  const inputClass = dark 
    ? "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40"
    : "w-full px-4 py-3 rounded-xl bg-[#F0F4FA] border border-[#1B3A6B]/15 text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 text-sm focus:outline-none focus:border-[#1B3A6B]/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={dark ? "block text-white/70 text-sm font-medium mb-1" : "block text-[#1A1A2E]/70 text-sm font-medium mb-1"}>Full Name</label>
        <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          placeholder="Enter your name" />
      </div>

      <div className="flex gap-2 items-end">
        <div className="w-[120px]">
          <CustomDropdown 
            label="Code"
            type="country"
            options={countryCodes}
            value={form.countryCode}
            onChange={(v) => setForm({ ...form, countryCode: v })}
            dark={dark}
          />
        </div>
        <div className="flex-1">
          <label className={dark ? "block text-white/70 text-sm font-medium mb-1" : "block text-[#1A1A2E]/70 text-sm font-medium mb-1"}>Phone Number</label>
          <input type="tel" required value={form.phone} onChange={handlePhoneChange}
            maxLength={10}
            className={`${inputClass} ${error ? 'border-red-500 bg-red-500/5' : ''}`}
            placeholder="10-digit mobile number" />
        </div>
      </div>
      {error && error.includes('phone') && <p className="text-red-400 text-[10px] mt-1 font-bold">{error}</p>}

      <CustomDropdown 
        label="Health Concern"
        options={concerns}
        value={form.problem}
        onChange={(v) => { setForm({ ...form, problem: v }); setError(''); }}
        dark={dark}
      />
      {error && error.includes('concern') && <p className="text-red-400 text-[10px] mt-1 font-bold">{error}</p>}

      {showQuestion && (
        <div>
          <label className={dark ? "block text-white/70 text-sm font-medium mb-1" : "block text-[#1A1A2E]/70 text-sm font-medium mb-1"}>
            Your Question
          </label>
          <textarea
            rows={3}
            value={form.question}
            onChange={e => setForm({ ...form, question: e.target.value })}
            placeholder="Type your question here..."
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      <button type="submit"
        className="w-full bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#1ebe5d] transition-all text-base font-bold shadow-lg hover:shadow-xl mt-2 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.1 1.522 5.83L.057 23.925l6.266-1.442C7.9 23.447 9.908 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.676-.52-5.2-1.424l-.373-.22-3.72.856.897-3.614-.244-.387C2.518 15.67 2 13.895 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        {showQuestion ? 'Send Question via WhatsApp' : 'Book via WhatsApp'}
      </button>
    </form>
  );
}
