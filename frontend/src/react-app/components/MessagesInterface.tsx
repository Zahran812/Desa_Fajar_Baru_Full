import { useState, useEffect } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Archive, 
  Star, 
  ArrowLeft,
  Check,
  CheckCheck
} from 'lucide-react';



interface Conversation {
  id: number;
  participant: {
    name: string;
    role: string;
    avatar?: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    fromSelf: boolean;
  };
  unreadCount: number;
}

interface MessagesInterfaceProps {
  userId: number;
  userRole: string;
}

const MessagesInterface = ({ }: MessagesInterfaceProps) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock conversations data
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: 1,
        participant: {
          name: 'Operator Desa',
          role: 'Operator',
        },
        lastMessage: {
          content: 'Pengajuan KTP Anda telah disetujui dan dapat diambil besok.',
          timestamp: '10:30',
          isRead: false,
          fromSelf: false
        },
        unreadCount: 2
      },
      {
        id: 2,
        participant: {
          name: 'Kepala Dusun RT 01',
          role: 'Kepala Dusun',
        },
        lastMessage: {
          content: 'Terima kasih atas laporannya. Akan segera kami tindaklanjuti.',
          timestamp: '09:15',
          isRead: true,
          fromSelf: true
        },
        unreadCount: 0
      },
      {
        id: 3,
        participant: {
          name: 'Admin Sistem',
          role: 'Admin',
        },
        lastMessage: {
          content: 'Sistem akan maintenance mulai pukul 01.00 WIB hingga 03.00 WIB.',
          timestamp: 'Kemarin',
          isRead: true,
          fromSelf: false
        },
        unreadCount: 0
      }
    ];

    setConversations(mockConversations);
    setLoading(false);
  }, []);

  // Mock messages for selected conversation
  const getMessagesForConversation = () => {
    const mockMessages = [
      {
        id: 1,
        content: 'Selamat pagi, saya ingin menanyakan status pengajuan KTP saya.',
        timestamp: '08:00',
        fromSelf: true,
        status: 'read'
      },
      {
        id: 2,
        content: 'Selamat pagi. Boleh berikan nomor NIK untuk saya cek status pengajuannya?',
        timestamp: '08:05',
        fromSelf: false,
        status: 'read'
      },
      {
        id: 3,
        content: 'NIK saya 3201234567890123',
        timestamp: '08:07',
        fromSelf: true,
        status: 'read'
      },
      {
        id: 4,
        content: 'Pengajuan KTP Anda telah disetujui dan dapat diambil besok pukul 08.00-15.00 di kantor desa. Jangan lupa bawa fotokopi KK dan bukti pembayaran.',
        timestamp: '10:30',
        fromSelf: false,
        status: 'delivered'
      }
    ];

    return mockMessages;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Here you would typically send the message to your API
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? getMessagesForConversation() : [];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-200 overflow-hidden flex">
      {/* Conversation List */}
      <div className={`${
        isMobile && selectedConversation ? 'hidden' : 'flex'
      } flex-col w-full md:w-80 border-r border-gray-200`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pesan</h2>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari percakapan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-emerald-50 border-emerald-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {conversation.participant.name.charAt(0)}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {conversation.lastMessage.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-sm truncate ${
                      conversation.lastMessage.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'
                    }`}>
                      {conversation.lastMessage.fromSelf ? 'Anda: ' : ''}
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.lastMessage.fromSelf && (
                      <div className="ml-2 flex-shrink-0">
                        {conversation.lastMessage.isRead ? (
                          <CheckCheck className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Check className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{conversation.participant.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${
        isMobile && !selectedConversation ? 'hidden' : 'flex'
      } flex-1 flex flex-col`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                {isMobile && (
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {selectedConv?.participant.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {selectedConv?.participant.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedConv?.participant.role}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Star className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.fromSelf ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.fromSelf
                      ? 'bg-emerald-500 text-white rounded-l-lg rounded-tr-lg'
                      : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                  } px-4 py-2`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-between mt-1 ${
                      message.fromSelf ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{message.timestamp}</span>
                      {message.fromSelf && (
                        <div className="ml-2">
                          {message.status === 'read' ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Percakapan</h3>
              <p className="text-gray-500">Pilih percakapan dari daftar untuk memulai chat</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesInterface;
