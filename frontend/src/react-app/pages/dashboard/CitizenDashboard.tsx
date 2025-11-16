import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/contexts/AuthContext';
import DashboardLayout from '@/react-app/components/DashboardLayout';
import { 
  Home, FileText, MessageSquare, User, 
  Clock, CheckCircle, Send,
  Bell, Edit, Download, Upload, X, CreditCard, MapPin,
  AlertCircle, XCircle, Loader2, CheckCircle2, Eye,
  HelpCircle, Info, ChevronRight, CheckSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  seedIfEmpty,
  getMessagesForUser,
  sendMessage,
  type AppMessage,
  type MessageCategory,
} from '@/react-app/lib/messageStore';

interface Request {
  id: number;
  request_type: string;
  subject: string;
  description: string;
  status: string;
  documents?: string;
  response?: string;
  created_at: string;
  updated_at: string;
}


const CitizenDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<Request[]>([]);
  const [messages, setMessages] = useState<AppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({
    request_type: '',
    subject: '',
    description: '',
    documents: ''
  });
  // Extended profile data with simulation
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || 'Ahmad Fauzi Rahmatullah',
    email: user?.email || 'ahmad.fauzi@email.com',
    phone: user?.phone || '081234567890',
    nik: '3304012501950003',
    birth_place: 'Bandar Lampung',
    birth_date: '25-01-1995',
    gender: 'LAKI-LAKI',
    blood_type: 'A',
    religion: 'Islam',
    marital_status: 'Kawin',
    occupation: 'Wiraswasta',
    province: 'LAMPUNG',
    regency: 'LAMPUNG SELATAN',
    district: 'JATI AGUNG',
    village: 'FAJAR BARU',
    address: 'Jalan Raya Desa Fajar Baru No. 45',
    rt_number: user?.rt_number || '03',
    rw_number: '02',
    ktp_image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80' // Simulasi gambar KTP
  });
  const [editingProfile, setEditingProfile] = useState(false);
  // Messages UI state
  const [msgCategoryFilter, setMsgCategoryFilter] = useState<MessageCategory | 'all'>('all');
  const [compose, setCompose] = useState({ category: '' as MessageCategory | '', subject: '', content: '' });
  // Cara Pengajuan modal state
  const [showGuideModal, setShowGuideModal] = useState(false);
  // Selected message for conversation view
  const [selectedMessage, setSelectedMessage] = useState<AppMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  // Redirect if not authorized
  useEffect(() => {
    if (user && user.role !== 'citizen') {
      window.location.href = '/';
    }
  }, [user]);

  // Fetch user data and load messages from local store (demo)
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      // Seed demo messages so citizen sees initial data as well
      seedIfEmpty(1); // operator id assumed 1 in demo
      
      try {
        // Fetch requests
        const requestsResponse = await apiFetch(`/api/requests?user_id=${user.id}`, {
          credentials: 'include'
        });
        if (requestsResponse.ok) {
          const requestsData = await requestsResponse.json();
          // If empty, add simulation data
          if (!requestsData.requests || requestsData.requests.length === 0) {
            // Add simulation data for demo
            const simulationRequests: Request[] = [
              {
                id: 1,
                request_type: 'Surat Keterangan Domisili',
                subject: 'Pengajuan Surat Domisili untuk Pendaftaran Sekolah',
                description: 'Surat domisili diperlukan untuk pendaftaran anak masuk SD Negeri 1 Fajar Baru tahun ajaran 2024/2025',
                status: 'pending',
                created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 jam lalu
                updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
              },
              {
                id: 2,
                request_type: 'Surat Keterangan Usaha',
                subject: 'Surat Keterangan Usaha untuk Pengajuan Modal Bank',
                description: 'Diperlukan untuk mengajukan kredit usaha mikro di Bank BRI dengan nilai pinjaman Rp 50.000.000',
                status: 'in_progress',
                created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 hari lalu
                updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
              },
              {
                id: 3,
                request_type: 'Surat Keterangan Tidak Mampu',
                subject: 'SKTM untuk Berobat di Rumah Sakit',
                description: 'Diperlukan untuk mendapatkan keringanan biaya pengobatan ibu di RSUD Pringsewu',
                status: 'approved',
                response: 'Surat telah disetujui dan dapat diambil di kantor desa pada jam kerja (08.00-15.00 WIB). Jangan lupa membawa KTP asli.',
                created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 hari lalu
                updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                id: 4,
                request_type: 'Surat Keterangan Belum Menikah',
                subject: 'Surat Keterangan Belum Menikah untuk Melamar Kerja',
                description: 'Diperlukan sebagai persyaratan melamar pekerjaan di PT Maju Bersama Indonesia',
                status: 'rejected',
                response: 'Mohon lengkapi dokumen KK dan KTP. Foto yang diunggah kurang jelas. Silakan ajukan ulang dengan dokumen yang lebih jelas.',
                created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 hari lalu
                updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                id: 5,
                request_type: 'Surat Keterangan Domisili',
                subject: 'Surat Domisili untuk Pembuatan NPWP',
                description: 'Diperlukan untuk membuat NPWP pribadi di kantor pajak Lampung Selatan',
                status: 'approved',
                response: 'Surat sudah selesai diproses dan telah dikirim via email. Anda juga dapat mengambil hardcopy di kantor desa.',
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 hari lalu
                updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
              }
            ];
            setRequests(simulationRequests);
          } else {
            setRequests(requestsData.requests || []);
          }
        } else {
          // If API fails, use simulation data
          const simulationRequests: Request[] = [
            {
              id: 1,
              request_type: 'Surat Keterangan Domisili',
              subject: 'Pengajuan Surat Domisili untuk Pendaftaran Sekolah',
              description: 'Surat domisili diperlukan untuk pendaftaran anak masuk SD Negeri 1 Fajar Baru tahun ajaran 2024/2025',
              status: 'pending',
              created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 2,
              request_type: 'Surat Keterangan Usaha',
              subject: 'Surat Keterangan Usaha untuk Pengajuan Modal Bank',
              description: 'Diperlukan untuk mengajukan kredit usaha mikro di Bank BRI dengan nilai pinjaman Rp 50.000.000',
              status: 'in_progress',
              created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 3,
              request_type: 'Surat Keterangan Tidak Mampu',
              subject: 'SKTM untuk Berobat di Rumah Sakit',
              description: 'Diperlukan untuk mendapatkan keringanan biaya pengobatan ibu di RSUD Pringsewu',
              status: 'approved',
              response: 'Surat telah disetujui dan dapat diambil di kantor desa pada jam kerja (08.00-15.00 WIB). Jangan lupa membawa KTP asli.',
              created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 4,
              request_type: 'Surat Keterangan Belum Menikah',
              subject: 'Surat Keterangan Belum Menikah untuk Melamar Kerja',
              description: 'Diperlukan sebagai persyaratan melamar pekerjaan di PT Maju Bersama Indonesia',
              status: 'rejected',
              response: 'Mohon lengkapi dokumen KK dan KTP. Foto yang diunggah kurang jelas. Silakan ajukan ulang dengan dokumen yang lebih jelas.',
              created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 5,
              request_type: 'Surat Keterangan Domisili',
              subject: 'Surat Domisili untuk Pembuatan NPWP',
              description: 'Diperlukan untuk membuat NPWP pribadi di kantor pajak Lampung Selatan',
              status: 'approved',
              response: 'Surat sudah selesai diproses dan telah dikirim via email. Anda juga dapat mengambil hardcopy di kantor desa.',
              created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
            }
          ];
          setRequests(simulationRequests);
        }
        // Load messages from local store (both sent and received)
        let userMessages = getMessagesForUser(user.id);
        
        // If no messages, add simulation data
        if (userMessages.length === 0) {
          // Add simulation messages for all categories
          const simulationMessages: AppMessage[] = [
            {
              id: '1',
              from_user_id: 1, // operator
              to_user_id: user.id,
              subject: 'Surat Domisili Anda Telah Disetujui',
              content: 'Selamat! Pengajuan Surat Keterangan Domisili Anda untuk pendaftaran sekolah telah disetujui. Surat dapat diambil di kantor desa pada jam kerja (08.00-15.00 WIB) atau diunduh melalui dashboard.',
              category: 'administrasi' as MessageCategory,
              status: 'selesai',
              is_read: false,
              created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 jam lalu
              history: [],
              replies: []
            },
            {
              id: '2',
              from_user_id: user.id,
              to_user_id: 1,
              subject: 'Pertanyaan Terkait Surat Keterangan Usaha',
              content: 'Selamat pagi Bapak/Ibu operator. Saya ingin menanyakan dokumen apa saja yang diperlukan untuk mengajukan Surat Keterangan Usaha untuk keperluan pengajuan kredit bank. Terima kasih.',
              category: 'administrasi' as MessageCategory,
              status: 'dibaca',
              is_read: true,
              created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 jam lalu
              history: [],
              replies: []
            },
            {
              id: '3',
              from_user_id: 1,
              to_user_id: user.id,
              subject: 'Informasi Jadwal Pelayanan PPID',
              content: 'Kepada seluruh warga, kami informasikan bahwa layanan PPID (Pejabat Pengelola Informasi dan Dokumentasi) akan tersedia setiap hari Senin dan Rabu pukul 09.00-14.00 WIB di kantor desa.',
              category: 'ppid' as MessageCategory,
              status: 'dibaca',
              is_read: true,
              created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 hari lalu
              history: [],
              replies: []
            },
            {
              id: '4',
              from_user_id: user.id,
              to_user_id: 1,
              subject: 'Pengaduan Jalan Rusak di RT 03',
              content: 'Yth. Bapak/Ibu Operator Desa, saya ingin melaporkan kondisi jalan di RT 03 yang sudah rusak parah dan berlubang. Mohon dapat ditindaklanjuti untuk perbaikan. Terima kasih.',
              category: 'pengaduan' as MessageCategory,
              status: 'diproses',
              is_read: true,
              created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 hari lalu
              history: [],
              replies: []
            },
            {
              id: '5',
              from_user_id: 1,
              to_user_id: user.id,
              subject: 'Tindak Lanjut Pengaduan Jalan Rusak',
              content: 'Terima kasih atas laporannya. Pengaduan Anda telah kami teruskan ke dinas terkait. Tim survey akan melakukan pengecekan lokasi minggu depan. Kami akan informasikan perkembangan selanjutnya.',
              category: 'pengaduan' as MessageCategory,
              status: 'diproses',
              is_read: false,
              created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 hari lalu
              history: [],
              replies: []
            },
            {
              id: '6',
              from_user_id: user.id,
              to_user_id: 1,
              subject: 'Usulan Program Posyandu Balita',
              content: 'Assalamualaikum, saya ingin menyampaikan aspirasi untuk mengadakan program Posyandu Balita yang lebih rutin di desa kita, mengingat banyak ibu-ibu muda yang memerlukan layanan kesehatan untuk anak.',
              category: 'aspirasi' as MessageCategory,
              status: 'selesai',
              is_read: true,
              created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 hari lalu
              history: [],
              replies: []
            },
            {
              id: '7',
              from_user_id: 1,
              to_user_id: user.id,
              subject: 'Sambutan Aspirasi Program Posyandu',
              content: 'Waalaikumsalam. Terima kasih atas aspirasi yang sangat baik. Kami akan jadwalkan rapat dengan puskesmas dan kader kesehatan untuk merencanakan program ini. Aspirasi Anda sangat kami apresiasi.',
              category: 'aspirasi' as MessageCategory,
              status: 'selesai',
              is_read: true,
              created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 hari lalu
              history: [],
              replies: []
            },
            {
              id: '8',
              from_user_id: user.id,
              to_user_id: 1,
              subject: 'Konsultasi Persyaratan Pembuatan KK Baru',
              content: 'Selamat siang, saya mau tanya untuk pembuatan KK baru karena pisah rumah, dokumen apa saja yang perlu disiapkan? Apakah bisa diurus online atau harus datang ke kantor desa?',
              category: 'chat' as MessageCategory,
              status: 'dibaca',
              is_read: true,
              created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 hari lalu
              history: [],
              replies: []
            },
            {
              id: '9',
              from_user_id: 1,
              to_user_id: user.id,
              subject: 'Pengajuan Ditolak - Dokumen Kurang Lengkap',
              content: 'Pengajuan Surat Keterangan Belum Menikah Anda ditolak karena dokumen KTP dan KK yang diunggah kurang jelas. Mohon untuk mengajukan kembali dengan foto dokumen yang lebih jelas dan terbaca.',
              category: 'administrasi' as MessageCategory,
              status: 'baru',
              is_read: false,
              created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 jam lalu
              history: [],
              replies: []
            }
          ];
          
          // Store to local storage (optional for demo)
          userMessages = simulationMessages;
        }
        
        setMessages(userMessages);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Use simulation data on error
        const simulationRequests: Request[] = [
          {
            id: 1,
            request_type: 'Surat Keterangan Domisili',
            subject: 'Pengajuan Surat Domisili untuk Pendaftaran Sekolah',
            description: 'Surat domisili diperlukan untuk pendaftaran anak masuk SD Negeri 1 Fajar Baru tahun ajaran 2024/2025',
            status: 'pending',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            request_type: 'Surat Keterangan Usaha',
            subject: 'Surat Keterangan Usaha untuk Pengajuan Modal Bank',
            description: 'Diperlukan untuk mengajukan kredit usaha mikro di Bank BRI dengan nilai pinjaman Rp 50.000.000',
            status: 'in_progress',
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            request_type: 'Surat Keterangan Tidak Mampu',
            subject: 'SKTM untuk Berobat di Rumah Sakit',
            description: 'Diperlukan untuk mendapatkan keringanan biaya pengobatan ibu di RSUD Pringsewu',
            status: 'approved',
            response: 'Surat telah disetujui dan dapat diambil di kantor desa pada jam kerja (08.00-15.00 WIB). Jangan lupa membawa KTP asli.',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 4,
            request_type: 'Surat Keterangan Belum Menikah',
            subject: 'Surat Keterangan Belum Menikah untuk Melamar Kerja',
            description: 'Diperlukan sebagai persyaratan melamar pekerjaan di PT Maju Bersama Indonesia',
            status: 'rejected',
            response: 'Mohon lengkapi dokumen KK dan KTP. Foto yang diunggah kurang jelas. Silakan ajukan ulang dengan dokumen yang lebih jelas.',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 5,
            request_type: 'Surat Keterangan Domisili',
            subject: 'Surat Domisili untuk Pembuatan NPWP',
            description: 'Diperlukan untuk membuat NPWP pribadi di kantor pajak Lampung Selatan',
            status: 'approved',
            response: 'Surat sudah selesai diproses dan telah dikirim via email. Anda juga dapat mengambil hardcopy di kantor desa.',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        setRequests(simulationRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'requests', label: 'Pengajuan Saya', icon: FileText, badge: requests.filter(r => r.status === 'pending').length },
    { id: 'messages', label: 'Pesan', icon: MessageSquare, badge: messages.filter(m => !m.is_read && m.to_user_id === user?.id).length },
  ];

  // Notifications with proper actions that redirect to relevant tabs
  const layoutNotifications = [
    {
      id: 1,
      type: 'request' as const,
      title: 'Pengajuan Disetujui',
      message: 'Surat Keterangan Domisili Anda telah disetujui',
      time: '1 jam lalu',
      unread: true,
      action: { tab: 'requests' }
    },
    {
      id: 2,
      type: 'message' as const,
      title: 'Pesan Baru dari Operator',
      message: 'Anda menerima balasan terkait pengaduan jalan rusak',
      time: '2 jam lalu',
      unread: true,
      action: { tab: 'messages' }
    },
    {
      id: 3,
      type: 'request' as const,
      title: 'Pengajuan Ditolak',
      message: 'Surat Keterangan Belum Menikah ditolak - Dokumen kurang jelas',
      time: '4 jam lalu',
      unread: true,
      action: { tab: 'requests' }
    },
    {
      id: 4,
      type: 'message' as const,
      title: 'Balasan Aspirasi',
      message: 'Aspirasi program Posyandu Anda mendapat tanggapan',
      time: '1 hari lalu',
      unread: false,
      action: { tab: 'messages' }
    },
    {
      id: 5,
      type: 'request' as const,
      title: 'Pengajuan Sedang Diproses',
      message: 'Surat Keterangan Usaha Anda sedang ditinjau operator',
      time: '1 hari lalu',
      unread: false,
      action: { tab: 'requests' }
    }
  ];

  const handleNewRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const response = await apiFetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: user.id,
          ...newRequestForm
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(prev => [data.request, ...prev]);
        setNewRequestForm({
          request_type: '',
          subject: '',
          description: '',
          documents: ''
        });
        setActiveTab('requests');
      }
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would update user profile
    setEditingProfile(false);
    alert('Profil berhasil diperbarui!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Sedang Dikirim';
      case 'approved': return 'Diterima';
      case 'rejected': return 'Ditolak';
      case 'in_progress': return 'Sedang Diproses';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'in_progress': return <Eye className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Selamat datang kembali, {user?.full_name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengajuan Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'pending').length}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-amber-600">+12.3%</span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengajuan Disetujui</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'approved').length}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-emerald-600">+8.2%</span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pesan</p>
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-blue-600">+5.2%</span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Aktivitas Pengajuan</h3>
              <div className="flex items-center space-x-4">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                  <option>Bulan ini</option>
                  <option>3 Bulan</option>
                  <option>6 Bulan</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900">{requests.length}</p>
              <p className="text-sm text-emerald-600">Total pengajuan</p>
            </div>

            {/* Mock Chart Area */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Grafik Aktivitas Pengajuan</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-600">Disetujui</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Ditolak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => setActiveTab('new-request')}
                className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ajukan Surat</p>
                  <p className="text-xs text-gray-600">Buat pengajuan baru</p>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveTab('messages')}
                className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Lihat Pesan</p>
                  <p className="text-xs text-gray-600">Pesan dari operator</p>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveTab('requests')}
                className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Lihat Pengajuan</p>
                  <p className="text-xs text-gray-600">Status pengajuan surat</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi Terbaru</h3>
            
            <div className="space-y-3">
              {layoutNotifications.slice(0, 3).map((notification) => (
                <div 
                  key={notification.id} 
                  onClick={() => setActiveTab(notification.action.tab)}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'request' ? 'bg-emerald-500' :
                    notification.type === 'message' ? 'bg-blue-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="w-full mt-4 text-center text-xs text-gray-500">
              Klik icon 🔔 di navbar untuk semua notifikasi
            </p>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pengajuan Terbaru</h3>
            <button 
              onClick={() => setActiveTab('requests')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Lihat semua →
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada pengajuan</p>
              <button 
                onClick={() => setActiveTab('new-request')}
                className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Buat Pengajuan Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="text-sm font-medium text-gray-500 pb-3">Subject</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">Jenis</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">Tanggal</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.slice(0, 5).map((request) => (
                    <tr key={request.id} className="border-t border-gray-100">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{request.subject}</p>
                          <p className="text-sm text-gray-500">{request.description.substring(0, 40)}...</p>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{request.request_type}</td>
                      <td className="py-4 text-sm text-gray-600">
                        {new Date(request.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Profil Saya</h2>
      
      {/* Profile Header Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center space-x-8 mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {profileForm.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{profileForm.full_name}</h3>
            <p className="text-gray-600 text-lg mb-1">@{user?.username}</p>
            <p className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full inline-block">RT {profileForm.rt_number}/RW {profileForm.rw_number}, {profileForm.village}</p>
          </div>
          <button 
            onClick={() => setEditingProfile(!editingProfile)}
            className="ml-auto bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>{editingProfile ? 'Batal' : 'Edit Profil'}</span>
          </button>
        </div>

        {/* KTP Image Section */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border-2 border-blue-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Kartu Tanda Penduduk (KTP)</span>
          </h4>
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={profileForm.ktp_image} 
              alt="KTP" 
              className="w-full h-auto object-contain"
            />
            <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              ✓ Terverifikasi
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">
            <span className="font-medium">NIK:</span> {profileForm.nik}
          </p>
        </div>

        {/* Data Pribadi Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>Data Pribadi</span>
          </h4>
        </div>

        <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">NIK</label>
            <input
              type="text"
              value={profileForm.nik}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Nama Lengkap</label>
            <input
              type="text"
              value={profileForm.full_name}
              onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Tempat Lahir</label>
            <input
              type="text"
              value={profileForm.birth_place}
              onChange={(e) => setProfileForm(prev => ({ ...prev, birth_place: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Tanggal Lahir</label>
            <input
              type="text"
              value={profileForm.birth_date}
              onChange={(e) => setProfileForm(prev => ({ ...prev, birth_date: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Jenis Kelamin</label>
            <input
              type="text"
              value={profileForm.gender}
              onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Golongan Darah</label>
            <input
              type="text"
              value={profileForm.blood_type}
              onChange={(e) => setProfileForm(prev => ({ ...prev, blood_type: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Agama</label>
            <input
              type="text"
              value={profileForm.religion}
              onChange={(e) => setProfileForm(prev => ({ ...prev, religion: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Status Perkawinan</label>
            <input
              type="text"
              value={profileForm.marital_status}
              onChange={(e) => setProfileForm(prev => ({ ...prev, marital_status: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Pekerjaan</label>
            <input
              type="text"
              value={profileForm.occupation}
              onChange={(e) => setProfileForm(prev => ({ ...prev, occupation: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Username</label>
            <input
              type="text"
              value={user?.username || ''}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
              readOnly
            />
          </div>

          {/* Divider */}
          <div className="md:col-span-2 my-4">
            <div className="border-t-2 border-gray-200"></div>
            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Alamat & Kontak</span>
            </h4>
          </div>

          {/* Row 6 - Wilayah */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Provinsi</label>
            <input
              type="text"
              value={profileForm.province}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Kabupaten/Kota</label>
            <input
              type="text"
              value={profileForm.regency}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
              readOnly
            />
          </div>

          {/* Row 7 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Kecamatan</label>
            <input
              type="text"
              value={profileForm.district}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Kelurahan/Desa</label>
            <input
              type="text"
              value={profileForm.village}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
              readOnly
            />
          </div>

          {/* Row 8 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">RT</label>
            <input
              type="text"
              value={profileForm.rt_number}
              onChange={(e) => setProfileForm(prev => ({ ...prev, rt_number: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">RW</label>
            <input
              type="text"
              value={profileForm.rw_number}
              onChange={(e) => setProfileForm(prev => ({ ...prev, rw_number: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          {/* Row 9 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Alamat Lengkap</label>
            <textarea
              value={profileForm.address}
              onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              rows={3}
              readOnly={!editingProfile}
            />
          </div>

          {/* Row 10 - Kontak */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">No. Telepon</label>
            <input
              type="tel"
              value={profileForm.phone}
              onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${editingProfile ? 'border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'}`}
              readOnly={!editingProfile}
            />
          </div>

          {editingProfile && (
            <div className="md:col-span-2">
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
                Simpan Perubahan
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Pengajuan Saya</h2>
        <button 
          onClick={() => setActiveTab('new-request')}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Ajukan Baru</span>
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="p-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Memuat data...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada pengajuan</p>
              <button 
                onClick={() => setActiveTab('new-request')}
                className="btn-primary px-4 py-2 mt-4"
              >
                Buat Pengajuan Pertama
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-emerald-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Header with icon */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{request.subject}</h4>
                          <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md inline-block">
                            {request.request_type}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{request.description}</p>
                      
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Diajukan: {new Date(request.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Update: {new Date(request.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {/* Response messages */}
                      {request.status === 'rejected' && request.response && (
                        <div className="mt-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-red-800 font-semibold text-sm mb-1">Alasan Penolakan:</p>
                              <p className="text-red-700 text-sm">{request.response}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {request.status === 'approved' && request.response && (
                        <div className="mt-3 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-emerald-800 font-semibold text-sm mb-1">Informasi:</p>
                              <p className="text-emerald-700 text-sm">{request.response}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {request.status === 'in_progress' && (
                        <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-blue-800 font-semibold text-sm mb-1">Status Proses:</p>
                              <p className="text-blue-700 text-sm">Pengajuan Anda sedang ditinjau oleh operator desa. Harap menunggu.</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {request.status === 'pending' && (
                        <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <Loader2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 animate-spin" />
                            <div>
                              <p className="text-amber-800 font-semibold text-sm mb-1">Status Pengiriman:</p>
                              <p className="text-amber-700 text-sm">Pengajuan Anda sedang dalam antrian untuk diproses. Operator akan segera meninjau.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Status badge and actions */}
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {getStatusLabel(request.status)}
                      </span>
                      {request.status === 'approved' && (
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          <Download className="w-4 h-4" />
                          Unduh Surat
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNewRequest = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Ajukan Surat Baru</h2>
        <button
          type="button"
          onClick={() => setShowGuideModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <HelpCircle className="w-5 h-5" />
          Cara Pengajuan
        </button>
      </div>

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowGuideModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Tata Cara Pengajuan Surat</h3>
                    <p className="text-blue-100 text-sm">Panduan lengkap pengajuan layanan administrasi</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Langkah-langkah */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  Langkah-Langkah Pengajuan
                </h4>
                
                <div className="space-y-4">
                  {/* Langkah 1 */}
                  <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        1
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">Pilih Jenis Surat</h5>
                      <p className="text-sm text-gray-700">Pilih jenis surat yang ingin Anda ajukan sesuai dengan keperluan (Domisili, Usaha, SKTM, dll.)</p>
                    </div>
                  </div>

                  {/* Langkah 2 */}
                  <div className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        2
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">Isi Formulir</h5>
                      <p className="text-sm text-gray-700">Lengkapi semua informasi yang diperlukan: Judul/Subjek dan Keperluan penggunaan surat dengan jelas dan detail.</p>
                    </div>
                  </div>

                  {/* Langkah 3 */}
                  <div className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        3
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">Upload Dokumen Pendukung</h5>
                      <p className="text-sm text-gray-700">Unggah dokumen pendukung seperti KTP, KK, atau dokumen lain yang diperlukan. Format: PNG, JPG, PDF (maksimal 10MB).</p>
                    </div>
                  </div>

                  {/* Langkah 4 */}
                  <div className="flex gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">Kirim Pengajuan</h5>
                      <p className="text-sm text-gray-700">Periksa kembali semua data yang Anda masukkan, kemudian klik tombol "Kirim Pengajuan" untuk mengirimkan permohonan Anda.</p>
                    </div>
                  </div>

                  {/* Langkah 5 */}
                  <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        5
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">Pantau Status Pengajuan</h5>
                      <p className="text-sm text-gray-700">Cek status pengajuan Anda secara berkala di menu "Pengajuan Saya". Anda akan menerima notifikasi setiap ada perubahan status.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informasi Penting */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-2">Informasi Penting</h5>
                    <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                      <li>Pastikan semua data yang diisi benar dan sesuai dengan dokumen asli</li>
                      <li>Waktu proses pengajuan berkisar 1-3 hari kerja</li>
                      <li>Anda akan menerima notifikasi melalui dashboard dan email (jika terdaftar)</li>
                      <li>Surat yang sudah disetujui dapat diunduh atau diambil di kantor desa</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status Pengajuan */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-gray-900">Status Pengajuan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm">Sedang Dikirim</p>
                      <p className="text-xs text-amber-700">Pengajuan dalam antrian</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Sedang Diproses</p>
                      <p className="text-xs text-blue-700">Ditinjau oleh operator</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900 text-sm">Diterima</p>
                      <p className="text-xs text-emerald-700">Surat dapat diunduh/diambil</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-900 text-sm">Ditolak</p>
                      <p className="text-xs text-red-700">Perbaiki dan ajukan ulang</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak Bantuan */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl border border-emerald-200">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  Butuh Bantuan?
                </h5>
                <p className="text-sm text-gray-700 mb-3">
                  Jika Anda mengalami kesulitan atau memiliki pertanyaan, silakan hubungi operator desa melalui:
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowGuideModal(false);
                      setActiveTab('messages');
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Kirim Pesan
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Mengerti, Mulai Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <form onSubmit={handleNewRequest} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Jenis Surat *
            </label>
            <select 
              value={newRequestForm.request_type}
              onChange={(e) => setNewRequestForm(prev => ({ ...prev, request_type: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200" 
              required
            >
              <option value="">Pilih jenis surat</option>
              <option value="domisili">Surat Keterangan Domisili</option>
              <option value="usaha">Surat Keterangan Usaha</option>
              <option value="tidak_mampu">Surat Keterangan Tidak Mampu</option>
              <option value="belum_menikah">Surat Keterangan Belum Menikah</option>
              <option value="kelahiran">Surat Keterangan Kelahiran</option>
              <option value="kematian">Surat Keterangan Kematian</option>
              <option value="pindah">Surat Keterangan Pindah</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Judul/Subjek *
            </label>
            <input
              type="text"
              value={newRequestForm.subject}
              onChange={(e) => setNewRequestForm(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
              placeholder="Contoh: Pengajuan Surat Domisili untuk Pendaftaran Sekolah"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Keperluan *
            </label>
            <textarea
              value={newRequestForm.description}
              onChange={(e) => setNewRequestForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
              rows={4}
              placeholder="Jelaskan secara detail keperluan penggunaan surat ini"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Dokumen Pendukung
            </label>
            <div className="mt-1 flex justify-center px-8 pt-8 pb-8 border-2 border-emerald-200 border-dashed rounded-2xl bg-gradient-to-br from-emerald-50/50 to-blue-50/50 hover:border-emerald-300 transition-all duration-200">
              <div className="space-y-3 text-center">
                <Upload className="mx-auto h-16 w-16 text-emerald-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl px-4 py-2 font-medium hover:shadow-lg transition-all duration-200">
                    <span>Upload file</span>
                    <input type="file" className="sr-only" multiple />
                  </label>
                  <p className="pl-3 pt-2">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 font-medium">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">Upload KTP, KK, atau dokumen pendukung lainnya</p>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center space-x-2"
            >
              {submitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Mengirim...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Pengajuan</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNewRequestForm({ request_type: '', subject: '', description: '', documents: '' })}
              className="px-8 py-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium hover:scale-105"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderMessages = () => {
    const categories: Array<{ id: MessageCategory | 'all'; label: string }> = [
      { id: 'all', label: 'Semua' },
      { id: 'chat', label: 'Chat' },
      { id: 'administrasi', label: 'Layanan Administrasi' },
      { id: 'ppid', label: 'PPID' },
      { id: 'pengaduan', label: 'Pengaduan' },
      { id: 'aspirasi', label: 'Aspirasi' },
    ];

    const list = (msgCategoryFilter === 'all')
      ? messages
      : messages.filter(m => m.category === msgCategoryFilter);

    // Group messages by conversation (same subject)
    const conversationMap = new Map<string, AppMessage[]>();
    list.forEach(msg => {
      const key = msg.subject;
      if (!conversationMap.has(key)) {
        conversationMap.set(key, []);
      }
      conversationMap.get(key)!.push(msg);
    });

    // Get latest message from each conversation for list view
    const conversations = Array.from(conversationMap.values()).map(msgs => {
      msgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return msgs[0]; // Latest message
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // If a message is selected, show conversation view
    if (selectedMessage) {
      const conversationMessages = conversationMap.get(selectedMessage.subject) || [];
      conversationMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      return (
        <div className="space-y-6">
          {/* Header with back button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedMessage(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 transform rotate-180" />
            </button>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
              <p className="text-sm text-gray-600">Kategori: {selectedMessage.category}</p>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {conversationMessages.map((msg, idx) => {
                const isFromUser = msg.from_user_id === user?.id;
                return (
                  <div key={idx} className={`flex ${isFromUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${isFromUser ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl p-4 shadow-md`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isFromUser ? 'bg-white/20' : 'bg-emerald-200'}`}>
                          <User className={`w-4 h-4 ${isFromUser ? 'text-white' : 'text-emerald-700'}`} />
                        </div>
                        <span className={`text-xs font-semibold ${isFromUser ? 'text-white/90' : 'text-gray-700'}`}>
                          {isFromUser ? 'Anda' : 'Operator Desa'}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${isFromUser ? 'text-white' : 'text-gray-800'}`}>
                        {msg.content}
                      </p>
                      <p className={`text-xs mt-2 ${isFromUser ? 'text-white/70' : 'text-gray-500'}`}>
                        {new Date(msg.created_at).toLocaleString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply box */}
            <div className="border-t pt-4">
              <div className="flex gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan Anda..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  rows={3}
                />
                <button
                  onClick={() => {
                    if (!user || !replyText.trim()) return;
                    sendMessage(user.id, 1, selectedMessage.subject, replyText.trim(), selectedMessage.category);
                    setReplyText('');
                    setMessages(getMessagesForUser(user.id));
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // List view
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Pesan</h2>

        {/* Compose */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tulis Pesan Baru ke Operator</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={compose.category}
              onChange={(e) => setCompose(prev => ({ ...prev, category: e.target.value as MessageCategory }))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Pilih kategori</option>
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <input
              type="text"
              value={compose.subject}
              onChange={(e) => setCompose(prev => ({ ...prev, subject: e.target.value }))}
              className="md:col-span-2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Judul/Subjek"
            />
            <button
              onClick={() => {
                if (!user) return;
                if (!compose.category || !compose.subject.trim() || !compose.content.trim()) return;
                sendMessage(user.id, 1, compose.subject.trim(), compose.content.trim(), compose.category);
                setCompose({ category: '', subject: '', content: '' });
                setMessages(getMessagesForUser(user.id));
              }}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Kirim Pesan
            </button>
          </div>
          <textarea
            value={compose.content}
            onChange={(e) => setCompose(prev => ({ ...prev, content: e.target.value }))}
            className="mt-3 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            rows={3}
            placeholder="Tulis isi pesan..."
          />
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Pesan</h3>
          <select
            value={msgCategoryFilter}
            onChange={(e) => setMsgCategoryFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Memuat pesan...</p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada pesan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map((m) => (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMessage(m)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${!m.is_read && m.to_user_id === user?.id ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {!m.is_read && m.to_user_id === user?.id && (
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          )}
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium capitalize">{m.category}</span>
                          <h4 className="font-bold text-gray-900">{m.subject}</h4>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{m.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {m.from_user_id === user?.id ? 'Anda' : 'Operator Desa'}
                          </span>
                          <span className="text-xs text-gray-400">\u2022</span>
                          <span className="text-xs text-gray-400">
                            {new Date(m.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Pengaturan</h2>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <div className="space-y-8">
          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-emerald-600" />
              <span>Pengaturan Akun</span>
            </h3>
            <div className="space-y-4 bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Username</p>
                  <p className="text-sm text-gray-600">@{user?.username}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{user?.email || 'Belum diatur'}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ubah
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-600">••••••••</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ubah
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <span>Pengaturan Notifikasi</span>
            </h3>
            <div className="space-y-4 bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notifikasi Email</p>
                  <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notifikasi Push</p>
                  <p className="text-sm text-gray-600">Terima notifikasi di browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notifikasi SMS</p>
                  <p className="text-sm text-gray-600">Terima notifikasi via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-emerald-600" />
              <span>Privasi & Keamanan</span>
            </h3>
            <div className="space-y-4 bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Profil Publik</p>
                  <p className="text-sm text-gray-600">Tampilkan profil Anda ke publik</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Tambah keamanan ekstra ke akun Anda</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Aktifkan
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tentang</h3>
            <div className="space-y-3 bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Versi Aplikasi</p>
                <p className="text-sm font-medium text-gray-900">1.0.0</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Build</p>
                <p className="text-sm font-medium text-gray-900">2024.01</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'profile':
        return renderProfile();
      case 'requests':
        return renderRequests();
      case 'new-request':
        return renderNewRequest();
      case 'messages':
        return renderMessages();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.action?.tab) {
      setActiveTab(notification.action.tab);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-4 mx-auto"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  // Check authorization after loading complete
  if (!user || user.role !== 'citizen') {
    console.error('❌ Access denied - user:', user, 'role:', user?.role);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Anda tidak memiliki akses ke halaman ini.</p>
          <Link to="/" className="btn-primary px-6 py-3">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  console.log('✅ CitizenDashboard - Access granted for user:', user.role);

  return (
    <DashboardLayout
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Dashboard Masyarakat"
      userInfo={{
        name: user.full_name,
        role: 'Masyarakat'
      }}
      onLogout={logout}
      notifications={layoutNotifications}
      onNotificationClick={handleNotificationClick}
      onProfileClick={handleProfileClick}
      onSettingsClick={handleSettingsClick}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default CitizenDashboard;
