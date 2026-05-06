import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Bot, User, Send, Sparkles, Mic, MicOff, Volume2, VolumeX, RotateCcw } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
};

const SYSTEM_PROMPT = `You are a helpful, friendly AI assistant for Dr. Arun Homeopathy clinic. 
You answer questions about homeopathy, the clinic's services, appointments, timings, and health concerns. 
Keep answers concise (2-4 sentences max). 
Key clinic facts:
- Clinic timings: Mon–Sun, 10:00 AM – 8:00 PM (open all 7 days including Sunday)
- WhatsApp & Phone: +91 72071 15599
- Locations: Visakhapatnam, Vizianagaram, Vissannapeta
- Specialities: Orthopedics, Allergic Diseases, Thyroid, Infertility, Skin Diseases, Diabetes, Nervous System, GIT, Kidney, Psychiatric, Heart, Children's Diseases, and more.
- Doctor: Dr. Arun — 15+ years experience, 50,000+ patients treated, 945 Google reviews.
- All treatments are 100% natural, safe, no side effects.
Always be warm, professional, and encourage booking an appointment for specific health queries.`;

const quickSuggestions = [
  "What conditions do you treat?",
  "What are the clinic timings?",
  "Is homeopathy safe for children?",
  "How to book an appointment?",
];

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

async function callQwen(messages: { role: string; content: string }[]): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://drarunhomeopathy.com',
      'X-Title': 'Dr. Arun Homeopathy',
    },
    body: JSON.stringify({
      model: 'qwen/qwen3-next-80b-a3b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-6), // Keep context manageable
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't process that. Please try again or WhatsApp us at +91 72071 15599.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm the AI assistant for Dr. Arun Homeopathy 🌿 How can I help you today?", sender: 'bot' }
  ]);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Voice Recognition Setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputValue(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        setInputValue(''); // Clear input for new recording
        recognitionRef.current.start();
      } catch (err) {
        console.error('Recognition start error:', err);
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string, msgId: number) => {
    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(null);
    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const clearChat = () => {
    setMessages([{ id: Date.now(), text: "Chat cleared. How can I help you now?", sender: 'bot' }]);
    setChatHistory([]);
  };

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isTyping) return;

    const newMsgId = Date.now();
    setMessages(prev => [...prev, { id: newMsgId, text: userText, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    const updatedHistory = [...chatHistory, { role: 'user', content: userText }];

    try {
      const reply = await callQwen(updatedHistory);
      setChatHistory([...updatedHistory, { role: 'assistant', content: reply }]);
      setMessages(prev => [...prev, { id: newMsgId + 1, text: reply, sender: 'bot' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: newMsgId + 1,
        text: "I'm having trouble connecting to my AI core right now. Please WhatsApp us directly at +91 72071 15599.",
        sender: 'bot'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 left-6 bg-[#C62828] text-white p-4 rounded-full shadow-2xl hover:bg-[#E53935] transition-colors z-40 ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 left-6 w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden z-50 border border-[#1B3A6B]/10 flex flex-col"
            style={{ maxHeight: '85vh', height: '650px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C62828] to-[#E53935] p-4 flex items-center justify-between text-white shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
                  <Bot className="w-6 h-6 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    AI Assistant <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={clearChat} title="Clear Chat" className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F0F4FA]">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2 items-start`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-[#1B3A6B] text-white rounded-tr-sm shadow-md' : 'bg-white text-[#1A1A2E] rounded-tl-sm shadow-sm border border-[#C62828]/5 relative group'}`}>
                      {msg.text}
                      
                      {msg.sender === 'bot' && (
                        <button 
                          onClick={() => speakText(msg.text, msg.id)}
                          className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white border border-[#1B3A6B]/10 rounded-full shadow-sm text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white"
                        >
                          {isSpeaking === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                    <span className="text-[9px] text-[#5A6077]/60 px-1">{msg.sender === 'user' ? 'You' : 'Assistant'}</span>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#5A6077] flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start gap-2 items-end">
                  <div className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-3 py-4 rounded-2xl bg-white rounded-tl-sm shadow-sm border border-[#1B3A6B]/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#1B3A6B]/50 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#1B3A6B]/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-[#1B3A6B]/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}

              {/* Quick Suggestions */}
              {!isTyping && messages[messages.length - 1]?.sender === 'bot' && messages.length <= 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2 pt-1 pl-10">
                  {quickSuggestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="bg-white border border-[#C62828]/20 text-[#C62828] text-[11px] px-3 py-1.5 rounded-full hover:bg-[#C62828] hover:text-white transition-all text-left shadow-sm active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-[#1B3A6B]/10 shrink-0">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                {recognitionRef.current && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${isListening ? 'bg-[#C62828] text-white animate-pulse' : 'bg-[#F0F4FA] text-[#5A6077] hover:bg-[#1B3A6B] hover:text-white'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening... (Speak now)" : "Ask me anything..."}
                  className="flex-1 bg-[#F0F4FA] border border-[#1B3A6B]/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A6B]/30 transition-colors"
                  autoComplete="off"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-[#C62828] hover:bg-[#E53935] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 transition-all shadow-md active:scale-90"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="flex justify-between items-center mt-3 px-1">
                 <p className="text-[9px] text-[#5A6077] uppercase tracking-wider">
                  Always consult a doctor.
                </p>
                 <p className="text-[8px] text-[#5A6077]/40 font-bold uppercase">
                  AI Assistant
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
