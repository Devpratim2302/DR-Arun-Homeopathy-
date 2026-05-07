import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'booking' | 'question';
}

export default function BookingModal({ isOpen, onClose, mode = 'booking' }: BookingModalProps) {
  const isQuestion = mode === 'question';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1A2E]/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-[#1B3A6B]/5 text-[#1B3A6B] hover:bg-[#1B3A6B]/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3A6B]/10 flex items-center justify-center">
                  {isQuestion
                    ? <MessageCircle className="w-6 h-6 text-[#1B3A6B]" />
                    : <Calendar className="w-6 h-6 text-[#1B3A6B]" />
                  }
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Lora' }}>
                    {isQuestion ? 'Ask a Question' : 'Book Appointment'}
                  </h3>
                  <p className="text-sm text-[#5A6077]">
                    {isQuestion ? 'We\'ll reply on WhatsApp shortly' : 'Safe · Gentle · Effective Healing'}
                  </p>
                </div>
              </div>

              <BookingForm dark={false} onSuccess={onClose} showQuestion={isQuestion} />
              
              <p className="mt-6 text-center text-xs text-[#5A6077]">
                By {isQuestion ? 'submitting' : 'booking'}, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
