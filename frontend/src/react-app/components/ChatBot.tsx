import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  RotateCcw,
  Loader2,
  FileText,
  Heart
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Note: Embedding API keys in client code is insecure. This is minimal obfuscation only.
const OPENAI_KEY_PARTS = [
  'sk-proj-41SOmzU_',
  'd3jZAPT2i3R_UeI',
  '7KOxrZqEhokcIUJ',
  'ZMuG38EtkfkIYxa',
  'khFaipeJolFtbmM',
  'HNmiPtT3BlbkFJJ',
  'fQyTd_3l8MoMTHu',
  'x3XKOvYNZEUDJRv',
  'mItzUcPXazQnJkG',
  'lsQSAyGxkrgo1JI',
  'CJsPQCbcamywA'
];
const OPENAI_API_KEY = OPENAI_KEY_PARTS.join('');

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Halo! Saya adalah asisten virtual Desa Fajar Baru. Saya siap membantu Anda mendapatkan informasi tentang layanan desa, transparansi data, program, dan berbagai informasi lainnya. Ada yang bisa saya bantu?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick reply questions
  const quickReplies = [
    {
      id: 'layanan',
      text: 'Apa saja layanan yang tersedia?',
      icon: FileText,
      color: 'from-emerald-500 to-blue-500'
    },
    {
      id: 'akun',
      text: 'Bagaimana cara membuat akun?',
      icon: User,
      color: 'from-blue-500 to-emerald-500'
    },
    {
      id: 'website',
      text: 'Website desa ini untuk keperluan apa saja?',
      icon: Heart,
      color: 'from-emerald-500 to-blue-500'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Hide quick replies when user starts typing or sends a message
  useEffect(() => {
    if (messages.length > 1) {
      setShowQuickReplies(false);
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    setShowQuickReplies(false);

    // Simulate typing delay for better UX
    setTimeout(async () => {
      try {
        const history = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));
        const openaiMessages = [
          { role: 'system', content: `Anda adalah asisten virtual resmi Desa Fajar Baru, Kecamatan Jati Agung, Kabupaten Lampung Selatan, Provinsi Lampung. Tugas Anda: memberikan jawaban akurat, sopan, dan mudah dipahami tentang layanan dan informasi desa berdasarkan data berikut.

INFORMASI DESA:
- Nama: Desa Fajar Baru
- Kecamatan: Jati Agung
- Kabupaten: Lampung Selatan
- Provinsi: Lampung
- Alamat Kantor: Jl. R.A. Basyid No.48, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141
- Telepon: (0721) 123-456
- Email: admin@desafajarbaru.id
- Website: https://ginotyioeoqhs.mocha.app

VISI & MISI:
- Visi: "Terwujudnya Desa Fajar Baru yang Religius, Bermartabat, Maju, Mandiri, Sehat dan Sejahtera"
- Misi: 1) Pelayanan cepat tanggap, 2) Sarana/prasarana untuk ekonomi, 3) Program kesehatan dan pencegahan stunting, 4) Pembinaan pemuda dan peningkatan SDM

SEJARAH DESA (ringkas):
- 1968: Awal mula dari hutan belantara, dimekarkan dari Karang Anyar
- 1986: Desa persiapan (Kepala Desa Aliesan)
- 1991: Definitif menjadi Desa Fajar Baru
- 2019–sekarang: Kepala Desa M. Agus Budiantoro, S.HI

WILAYAH & DEMOGRAFI (ringkas):
- Luas: 756 Ha, Penduduk: 5.247 (2.635 L, 2.612 P), KK: 1.456, Kepadatan: 116 jiwa/km², 7 Dusun (1, 2A, 2B, 3A, 3B, 4, 5)

PIMPINAN DESA (contoh):
- Kepala Desa: M. Agus Budiantoro, S.HI
- Ketua PKK: Siti Nurhalimah, S.Pd
- Sekretaris Desa: Solichen, S.Sos
- Kasi Pemerintahan: Yunani | Kasi Pelayanan: Junaidi | Kasi Kesejahteraan: Hadi Johan | Kasi Perencanaan: Tri Wahita H

LAYANAN (contoh waktu proses):
1) Administrasi Kependudukan
   - Surat Domisili (online, 3–5 hari), Kartu Keluarga (online, 7–14 hari), Akta Kelahiran (online, 5–7 hari), Surat Pindah (online, 3–5 hari),
     Surat Keterangan Usaha (offline, 5–7 hari), Surat Keterangan Sekolah (online, 2–3 hari)
2) PPID: Informasi Berkala/Serta Merta/Setiap Saat (3–17 hari kerja)
3) Pengaduan Warga: Infrastruktur, Pelayanan, Kebersihan, Lainnya (form online/offline)

PROGRAM & EKONOMI (ringkas):
- BUMDes Fajar Sejahtera (unit Simpan Pinjam, Perdagangan, Wisata, Pertanian, Jasa; total pendapatan 2023 ± Rp 850 jt)
- Koperasi: Tani Makmur, Wanita Sejahtera, Pemuda Kreatif
- Pemberdayaan: Pelatihan UMKM, Akses Modal, Digitalisasi UMKM

TRANSPARANSI (APBDes 2024 ringkas):
- Pendapatan Rp 2.847.500.000 | Belanja Rp 2.654.300.000 | Surplus Rp 193.200.000 | Realisasi 89.2%
- Sumber: Dana Desa (52.7%), ADD (22.8%), Bagi Hasil Pajak (14.0%), PADes (10.5%)

TENTANG WEBSITE:
- Fungsi: Transparansi, Layanan Online, Promosi Potensi, Komunikasi, Pemberdayaan Ekonomi Digital, Berita, Dashboard Monitoring
- Fitur: Layanan administrasi online, Chatbot AI, Galeri, Marketplace UMKM, Pengaduan, Transparansi keuangan, Info program/kegiatan, Statistik realtime

ATURAN JAWAB:
- Jawab ringkas, jelas, dan langsung menjawab pertanyaan user. Sertakan detail angka/tanggal jika relevan.
- Jika ditanya tentang website atau pembuat BOT AI: jelaskan bahwa pengembang/pembuatnya adalah Robin (developer). Gunakan bahasa Indonesia yang sopan.
- Jika data spesifik tidak tersedia, katakan dengan jujur lalu beri alternatif saran langkah atau kontak resmi.
` },
          ...history,
          { role: 'user', content: textToSend }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: openaiMessages as any,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1.0
          })
        });

        const data = await response.json();
        if (!response.ok) {
          const msg = data?.error?.message || 'Maaf, layanan AI sementara tidak tersedia.';
          throw new Error(msg);
        }

        const assistantText: string = data?.choices?.[0]?.message?.content || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';

        // Simulate natural typing delay
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: assistantText,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 800);
      } catch (error) {
        console.error('Chatbot error:', error);
        setTimeout(() => {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: error instanceof Error ? error.message : 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin desa untuk bantuan lebih lanjut.',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 800);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleQuickReply = (questionText: string) => {
    sendMessage(questionText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Halo! Saya adalah asisten virtual Desa Fajar Baru. Saya siap membantu Anda mendapatkan informasi tentang layanan desa, transparansi data, program, dan berbagai informasi lainnya. Ada yang bisa saya bantu?',
        timestamp: new Date()
      }
    ]);
    setShowQuickReplies(true);
    setInputMessage('');
    setIsTyping(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 animate-pulse"
            aria-label="Buka Chat AI"
          >
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            
            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
              AI
            </div>
            
            {/* Pulse Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 opacity-20 group-hover:opacity-30 animate-ping"></div>
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat dengan AI Desa Fajar Baru
            <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white shadow-2xl border border-gray-200 transition-all duration-300 ${
            isMinimized
              ? 'inset-x-2 bottom-2 w-[calc(100vw-1rem)] h-16 rounded-xl md:bottom-4 md:right-4 md:inset-x-auto md:w-80 md:h-16 md:rounded-2xl'
              : 'inset-x-2 bottom-2 w-[calc(100vw-1rem)] h-[calc(100dvh-1rem)] max-h-[88vh] rounded-2xl md:bottom-4 md:right-4 md:inset-x-auto md:w-96 md:h-[36rem] md:rounded-2xl'
          } flex flex-col`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">AI Desa Fajar Baru</h3>
                <p className="text-xs text-white/80">
                  {isTyping ? 'Sedang mengetik...' : 'Asisten Virtual Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label={isMinimized ? "Perbesar chat" : "Perkecil chat"}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={resetConversation}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="Reset percakapan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="Tutup chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 min-h-0 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className={`px-4 py-2 rounded-2xl animate-fade-up ${
                            message.role === 'user'
                              ? 'bg-emerald-500 text-white rounded-br-md'
                              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Quick Reply Suggestions */}
                  {showQuickReplies && messages.length === 1 && (
                    <div className="animate-fade-up space-y-3 mt-4">
                      <p className="text-xs text-gray-500 text-center">Pertanyaan yang sering ditanyakan:</p>
                      <div className="space-y-2">
                        {quickReplies.map((reply) => (
                          <button
                            key={reply.id}
                            onClick={() => handleQuickReply(reply.text)}
                            disabled={isLoading}
                            className={`w-full p-2 text-left bg-gradient-to-r ${reply.color} text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs`}
                          >
                            <div className="flex items-center space-x-2">
                              <reply.icon className="w-3 h-3 flex-shrink-0" />
                              <span className="line-clamp-2">{reply.text}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(isLoading || isTyping) && (
                    <div className="flex justify-start animate-fade-up">
                      <div className="flex items-start space-x-2 max-w-[85%]">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-2">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                            <span className="text-sm text-gray-500">Sedang mengetik</span>
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-none md:rounded-b-2xl">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan Anda..."
                    disabled={isLoading}
                    autoComplete="off"
                    autoCorrect="on"
                    spellCheck={true}
                    inputMode="text"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base md:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-3 md:p-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                    aria-label="Kirim pesan"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  AI dapat memberikan informasi tentang layanan, program, dan data desa
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
