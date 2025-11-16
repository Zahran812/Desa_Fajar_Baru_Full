import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/contexts/AuthContext';
import DashboardLayout from '@/react-app/components/DashboardLayout';
import MessagesInterface from '@/react-app/components/MessagesInterface';
import { 
  Users, Plus, Clock, CheckCircle, 
  XCircle, Home, MessageSquare,
  UserPlus, Send, FileText, Search, Eye, User,
  X, BarChart3, TrendingUp, Calendar, Download,
  PieChart, Activity, AlertCircle, Edit3,
  List, LayoutGrid, Upload, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PopulationData {
  id: number;
  citizen_name: string;
  id_number?: string;
  birth_date?: string;
  gender?: string;
  address?: string;
  phone?: string;
  status: string;
  change_type: string;
  notes?: string;
  created_at: string;
  submitted_by_name?: string;
}

interface CitizenData {
  id?: number;
  no?: number;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  umur?: number;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan?: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  kelurahan?: string;
  kecamatan?: string;
  no_kk: string;
  nama_kepala_keluarga?: string;
  status_dalam_keluarga: string;
  pendidikan_terakhir: string;
  nama_ibu?: string;
  nama_ayah?: string;
  golongan_darah?: string;
  status_perkawinan_dalam_kk?: string;
  tanggal_perkawinan?: string;
  status_hubungan_dalam_keluarga?: string;
  kelainan_fisik_mental?: string;
  no_telepon?: string;
  no_paspor?: string;
  no_akta_lahir?: string;
  no_akta_kawin?: string;
  tanggal_akhir_paspor?: string;
  created_at?: string;
}

interface Message {
  id: number;
  from_user_id: number;
  to_user_id: number;
  subject: string;
  content: string;
  is_read: boolean;
  message_type: string;
  created_at: string;
  from_name?: string;
  to_name?: string;
}

interface DevelopmentProposal {
  id: number;
  proposal_type: 'jalan' | 'irigasi' | 'fasilitas_umum' | 'sanitasi' | 'listrik' | 'lainnya';
  title: string;
  description: string;
  location: string;
  estimated_budget?: number;
  priority_level: 'rendah' | 'sedang' | 'tinggi' | 'mendesak';
  reason: string;
  beneficiaries?: number;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected' | 'completed';
  submitted_by: string;
  submitted_date: string;
  reviewed_date?: string;
  operator_notes?: string;
  attachments?: string[];
}

interface Aspiration {
  id: number;
  ticket_number: string;
  category: 'pembangunan' | 'administrasi' | 'sosial' | 'keamanan' | 'lingkungan' | 'lainnya';
  title: string;
  description: string;
  location?: string;
  incident_time?: string;
  attachments?: string[];
  submitter_nik: string;
  submitter_name: string;
  submitter_address: string;
  submitter_phone: string;
  status: 'diterima' | 'proses' | 'selesai' | 'ditolak';
  submitted_date: string;
  updated_date?: string;
  action_notes?: string;
  officer_name?: string;
  priority: 'rendah' | 'sedang' | 'tinggi';
}

interface MonthlyReport {
  id: number;
  report_month: string; // YYYY-MM
  report_category: 'kependudukan' | 'pembangunan' | 'kemasyarakatan' | 'ekonomi' | 'khusus';
  submitted_by: string;
  submitted_date: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved';
  operator_notes?: string;
  // Kependudukan
  population_male?: number;
  population_female?: number;
  total_kk?: number;
  births?: number;
  deaths?: number;
  move_in?: number;
  move_out?: number;
  vulnerable_elderly?: number;
  vulnerable_disabled?: number;
  vulnerable_poor?: number;
  // Pembangunan
  development_ongoing?: string;
  development_completed?: string;
  infrastructure_condition?: string;
  development_priorities?: string;
  community_service?: string;
  // Kemasyarakatan
  social_activities?: string;
  security_condition?: string;
  security_incidents?: string;
  school_children?: number;
  social_programs?: string;
  // Ekonomi
  agricultural_area?: number;
  harvest_data?: string;
  market_prices?: string;
  farmer_groups?: string;
  umkm_activities?: string;
  // Khusus
  stunting_cases?: number;
  food_security?: string;
  social_aid_recipients?: string;
  environmental_condition?: string;
  special_notes?: string;
}

const DusunDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [citizensData, setCitizensData] = useState<CitizenData[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedData, setSelectedData] = useState<PopulationData | null>(null);
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [showAddCitizenModal, setShowAddCitizenModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposals, setProposals] = useState<DevelopmentProposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<DevelopmentProposal | null>(null);
  const [showProposalDetail, setShowProposalDetail] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    proposal_type: 'jalan' as const,
    title: '',
    description: '',
    location: '',
    estimated_budget: '',
    priority_level: 'sedang' as const,
    reason: '',
    beneficiaries: ''
  });
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState<'kependudukan' | 'pembangunan' | 'kemasyarakatan' | 'ekonomi' | 'khusus'>('kependudukan');
  const [reportForm, setReportForm] = useState({
    report_month: new Date().toISOString().slice(0, 7),
    // Kependudukan
    population_male: '',
    population_female: '',
    total_kk: '',
    births: '',
    deaths: '',
    move_in: '',
    move_out: '',
    vulnerable_elderly: '',
    vulnerable_disabled: '',
    vulnerable_poor: '',
    // Pembangunan
    development_ongoing: '',
    development_completed: '',
    infrastructure_condition: '',
    development_priorities: '',
    community_service: '',
    // Kemasyarakatan
    social_activities: '',
    security_condition: '',
    security_incidents: '',
    school_children: '',
    social_programs: '',
    // Ekonomi
    agricultural_area: '',
    harvest_data: '',
    market_prices: '',
    farmer_groups: '',
    umkm_activities: '',
    // Khusus
    stunting_cases: '',
    food_security: '',
    social_aid_recipients: '',
    environmental_condition: '',
    special_notes: ''
  });
  const [submissionTab, setSubmissionTab] = useState<'aspiration' | 'development'>('development');
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [showAspirationModal, setShowAspirationModal] = useState(false);
  const [showAspirationDetail, setShowAspirationDetail] = useState(false);
  const [selectedAspiration, setSelectedAspiration] = useState<Aspiration | null>(null);
  const [aspirationForm, setAspirationForm] = useState({
    category: 'pembangunan' as const,
    title: '',
    description: '',
    location: '',
    incident_time: '',
    submitter_nik: '',
    submitter_name: '',
    submitter_address: '',
    submitter_phone: ''
  });
  const [reportTab, setReportTab] = useState<'statistics' | 'monthly'>('monthly');
  
  const [newPopulationForm, setNewPopulationForm] = useState({
    citizen_name: '',
    id_number: '',
    birth_date: '',
    birth_place: '',
    gender: '',
    religion: '',
    marital_status: '',
    occupation: '',
    education: '',
    phone: '',
    address: '',
    change_type: '',
    notes: ''
  });

  // Redirect if not authorized
  useEffect(() => {
    if (user && user.role !== 'dusun_head') {
      window.location.href = '/';
    }
  }, [user]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch population data for this RT
        const populationResponse = await apiFetch(`/api/population?rt_number=${user.rt_number}&status=all`, {
          credentials: 'include'
        });
        if (populationResponse.ok) {
          const populationDataResponse = await populationResponse.json();
          setPopulationData(populationDataResponse.population || []);
        }

        // Fetch messages
        const messagesResponse = await apiFetch(`/api/messages?user_id=${user.id}&type=received`, {
          credentials: 'include'
        });
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          setMessages(messagesData.messages || []);
        }

        // Fetch citizens data for this RT - Mock data for now
        // TODO: Replace with actual API call when endpoint is ready
        // const citizensResponse = await apiFetch(`/api/citizens?rt=${user.rt_number}`, { credentials: 'include' });
        
        // Mock citizens data for demonstration
        const mockCitizens: CitizenData[] = [
          {
            id: 1,
            nik: '1234567890123456',
            nama_lengkap: 'Budi Santoso',
            jenis_kelamin: 'Laki-laki',
            tempat_lahir: 'Jakarta',
            tanggal_lahir: '1985-05-15',
            umur: 39,
            agama: 'Islam',
            status_perkawinan: 'Kawin',
            pekerjaan: 'Pegawai Swasta',
            kewarganegaraan: 'WNI',
            alamat: 'Jl. Mawar No. 123',
            rt: user.rt_number || '01',
            rw: '01',
            dusun: 'Dusun Mawar',
            kelurahan: 'Fajar Baru',
            kecamatan: 'Way Jepara',
            no_kk: '1234567890123456',
            nama_kepala_keluarga: 'Budi Santoso',
            status_dalam_keluarga: 'Kepala Keluarga',
            pendidikan_terakhir: 'S1',
            nama_ibu: 'Siti Aminah',
            nama_ayah: 'Ahmad Santoso',
            golongan_darah: 'A',
            kelainan_fisik_mental: 'Tidak Ada',
            no_telepon: '081234567890'
          },
          {
            id: 2,
            nik: '1234567890123457',
            nama_lengkap: 'Ani Wijaya',
            jenis_kelamin: 'Perempuan',
            tempat_lahir: 'Bandung',
            tanggal_lahir: '1987-08-20',
            umur: 37,
            agama: 'Islam',
            status_perkawinan: 'Kawin',
            pekerjaan: 'Ibu Rumah Tangga',
            kewarganegaraan: 'WNI',
            alamat: 'Jl. Mawar No. 123',
            rt: user.rt_number || '01',
            rw: '01',
            dusun: 'Dusun Mawar',
            kelurahan: 'Fajar Baru',
            kecamatan: 'Way Jepara',
            no_kk: '1234567890123456',
            nama_kepala_keluarga: 'Budi Santoso',
            status_dalam_keluarga: 'Istri',
            pendidikan_terakhir: 'SMA',
            nama_ibu: 'Dewi Lestari',
            nama_ayah: 'Bambang Wijaya',
            golongan_darah: 'B',
            kelainan_fisik_mental: 'Tidak Ada',
            no_telepon: '081234567891'
          },
          {
            id: 3,
            nik: '1234567890123458',
            nama_lengkap: 'Rizki Santoso',
            jenis_kelamin: 'Laki-laki',
            tempat_lahir: 'Lampung',
            tanggal_lahir: '2010-03-10',
            umur: 14,
            agama: 'Islam',
            status_perkawinan: 'Belum Kawin',
            pekerjaan: 'Pelajar',
            kewarganegaraan: 'WNI',
            alamat: 'Jl. Mawar No. 123',
            rt: user.rt_number || '01',
            rw: '01',
            dusun: 'Dusun Mawar',
            kelurahan: 'Fajar Baru',
            kecamatan: 'Way Jepara',
            no_kk: '1234567890123456',
            nama_kepala_keluarga: 'Budi Santoso',
            status_dalam_keluarga: 'Anak',
            pendidikan_terakhir: 'SMP',
            nama_ibu: 'Ani Wijaya',
            nama_ayah: 'Budi Santoso',
            golongan_darah: 'A',
            kelainan_fisik_mental: 'Tidak Ada',
            no_telepon: '-'
          }
        ];
        
        setCitizensData(mockCitizens);

        // Mock development proposals
        const mockProposals: DevelopmentProposal[] = [
          {
            id: 1,
            proposal_type: 'jalan',
            title: 'Perbaikan Jalan RT 01',
            description: 'Perbaikan jalan utama yang rusak parah sepanjang 500 meter',
            location: 'Jalan Utama RT 01',
            estimated_budget: 50000000,
            priority_level: 'tinggi',
            reason: 'Jalan rusak parah mengganggu aktivitas warga dan kendaraan',
            beneficiaries: 250,
            status: 'approved',
            submitted_by: user.full_name,
            submitted_date: '2024-10-15',
            reviewed_date: '2024-10-20',
            operator_notes: 'Disetujui untuk anggaran tahun 2025'
          },
          {
            id: 2,
            proposal_type: 'fasilitas_umum',
            title: 'Pembangunan Pos Ronda',
            description: 'Pembangunan pos ronda baru untuk keamanan lingkungan',
            location: 'Pertigaan Jalan Mawar',
            estimated_budget: 15000000,
            priority_level: 'sedang',
            reason: 'Meningkatkan keamanan lingkungan warga',
            beneficiaries: 150,
            status: 'pending',
            submitted_by: user.full_name,
            submitted_date: '2024-11-01'
          },
          {
            id: 3,
            proposal_type: 'irigasi',
            title: 'Perbaikan Saluran Irigasi',
            description: 'Perbaikan saluran irigasi untuk area pertanian warga',
            location: 'Area Sawah RT 01',
            estimated_budget: 25000000,
            priority_level: 'mendesak',
            reason: 'Saluran tersumbat mengancam panen warga',
            beneficiaries: 80,
            status: 'reviewed',
            submitted_by: user.full_name,
            submitted_date: '2024-10-25',
            reviewed_date: '2024-10-30',
            operator_notes: 'Sedang dalam proses verifikasi lapangan'
          }
        ];
        setProposals(mockProposals);

        // Mock monthly reports with various categories and statuses
        const mockReports: MonthlyReport[] = [
          {
            id: 1,
            report_month: '2024-10',
            report_category: 'kependudukan',
            submitted_by: user.full_name,
            submitted_date: '2024-11-01',
            status: 'approved',
            operator_notes: 'Laporan diterima dengan baik. Data sudah sesuai dengan SIAK.',
            population_male: 125,
            population_female: 128,
            total_kk: 85,
            births: 2,
            deaths: 1,
            move_in: 3,
            move_out: 1,
            vulnerable_elderly: 15,
            vulnerable_disabled: 5,
            vulnerable_poor: 20
          },
          {
            id: 2,
            report_month: '2024-10',
            report_category: 'pembangunan',
            submitted_by: user.full_name,
            submitted_date: '2024-11-01',
            status: 'submitted',
            development_ongoing: 'Perbaikan jalan RT 01 (50% progress)',
            development_completed: 'Pembersihan saluran air selesai 100%',
            infrastructure_condition: 'Baik. Jalan utama dalam kondisi baik setelah perbaikan. Drainase berfungsi dengan baik.',
            development_priorities: 'Pembangunan pos ronda, perbaikan drainase blok B',
            community_service: 'Gotong royong setiap Minggu pagi, diikuti 40-50 warga'
          },
          {
            id: 3,
            report_month: '2024-09',
            report_category: 'kemasyarakatan',
            submitted_by: user.full_name,
            submitted_date: '2024-10-05',
            status: 'approved',
            operator_notes: 'Kegiatan sosial berjalan baik',
            social_activities: 'Pengajian rutin setiap Kamis malam, Posyandu tanggal 15, PKK setiap Senin, Karang taruna aktif',
            security_condition: 'Kondusif dan aman. Tidak ada kejadian kriminal.',
            security_incidents: 'Tidak ada kejadian',
            school_children: 85,
            social_programs: 'Distribusi BLT untuk 20 KK, bantuan sembako untuk lansia'
          },
          {
            id: 4,
            report_month: '2024-09',
            report_category: 'ekonomi',
            submitted_by: user.full_name,
            submitted_date: '2024-10-03',
            status: 'reviewed',
            operator_notes: 'Sedang diverifikasi oleh dinas pertanian',
            agricultural_area: 15.5,
            harvest_data: 'Panen padi: 8 ton, Jagung: 2 ton, Sayuran: 500 kg',
            market_prices: 'Beras Rp 6.500/kg, Jagung Rp 4.000/kg, Cabai Rp 35.000/kg',
            farmer_groups: 'Kelompok Tani Sejahtera (35 anggota), Tani Maju (28 anggota), Tani Jaya (22 anggota)',
            umkm_activities: '12 UMKM aktif: 5 warung kelontong, 3 bengkel, 2 tukang bangunan, 2 penjahit'
          },
          {
            id: 5,
            report_month: '2024-08',
            report_category: 'khusus',
            submitted_by: user.full_name,
            submitted_date: '2024-09-05',
            status: 'approved',
            operator_notes: 'Data lengkap dan akurat',
            stunting_cases: 3,
            food_security: 'Stabil. Semua keluarga memiliki akses pangan yang cukup.',
            social_aid_recipients: 'PKH: 15 KK, BLT: 25 KK, Sembako lansia: 10 KK, Kartu Prakerja: 8 orang',
            environmental_condition: 'Bersih dan tertata. Program bank sampah berjalan. Tidak ada bencana.',
            special_notes: 'Perlu perhatian khusus untuk 3 balita stunting. Sudah koordinasi dengan Puskesmas.'
          }
        ];
        setMonthlyReports(mockReports);

        // Mock aspirations data
        const mockAspirations: Aspiration[] = [
          {
            id: 1,
            ticket_number: 'ASP-2024-001',
            category: 'pembangunan',
            title: 'Perbaikan Jalan Rusak di RT 01',
            description: 'Jalan di depan rumah warga mengalami kerusakan parah dengan lubang besar yang membahayakan pengendara, terutama saat hujan.',
            location: 'Jalan Utama RT 01, depan rumah no. 25',
            incident_time: '2024-11-01',
            submitter_nik: '1234567890123456',
            submitter_name: user.full_name,
            submitter_address: 'RT 01',
            submitter_phone: '081234567890',
            status: 'proses',
            priority: 'tinggi',
            submitted_date: '2024-11-01',
            updated_date: '2024-11-02',
            action_notes: 'Sudah dilakukan survey lapangan. Akan masuk dalam program perbaikan infrastruktur bulan ini.',
            officer_name: 'Pak Budi - Kasi Pembangunan'
          },
          {
            id: 2,
            ticket_number: 'ASP-2024-002',
            category: 'administrasi',
            title: 'Pengajuan Surat Keterangan Tidak Mampu',
            description: 'Membutuhkan bantuan untuk pembuatan SKTM untuk keperluan berobat di rumah sakit.',
            submitter_nik: '1234567890123456',
            submitter_name: user.full_name,
            submitter_address: 'RT 01',
            submitter_phone: '081234567891',
            status: 'selesai',
            priority: 'sedang',
            submitted_date: '2024-10-28',
            updated_date: '2024-10-29',
            action_notes: 'SKTM sudah diterbitkan dan dapat diambil di kantor desa.',
            officer_name: 'Ibu Siti - Staff Administrasi'
          },
          {
            id: 3,
            ticket_number: 'ASP-2024-003',
            category: 'lingkungan',
            title: 'Sampah Menumpuk di Pinggir Jalan',
            description: 'Tumpukan sampah di pinggir jalan RT 01 sudah seminggu tidak diangkut, menimbulkan bau dan lalat.',
            location: 'Jalan Melati RT 01',
            incident_time: '2024-10-25',
            submitter_nik: '1234567890123456',
            submitter_name: user.full_name,
            submitter_address: 'RT 01',
            submitter_phone: '081234567892',
            status: 'diterima',
            priority: 'sedang',
            submitted_date: '2024-11-03',
            action_notes: 'Laporan diterima, akan segera ditindaklanjuti.',
            officer_name: 'Pak Ahmad - Kasi Lingkungan'
          }
        ];
        setAspirations(mockAspirations);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'population', label: 'Data Penduduk', icon: Users },
    { id: 'submissions', label: 'Pengajuan', icon: Send, badge: populationData.filter(p => p.status === 'pending').length },
    { id: 'reports', label: 'Pelaporan', icon: BarChart3 },
    { id: 'messages', label: 'Pesan', icon: MessageSquare, badge: messages.filter(m => !m.is_read).length },
  ];

  const handleSubmitAspiration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const ticketNumber = `ASP-${new Date().getFullYear()}-${String(aspirations.length + 1).padStart(3, '0')}`;
      
      const newAspiration: Aspiration = {
        id: aspirations.length + 1,
        ticket_number: ticketNumber,
        category: aspirationForm.category,
        title: aspirationForm.title,
        description: aspirationForm.description,
        location: aspirationForm.location,
        incident_time: aspirationForm.incident_time,
        submitter_nik: aspirationForm.submitter_nik,
        submitter_name: aspirationForm.submitter_name,
        submitter_address: aspirationForm.submitter_address,
        submitter_phone: aspirationForm.submitter_phone,
        status: 'diterima',
        priority: 'sedang',
        submitted_date: new Date().toISOString().split('T')[0],
        action_notes: 'Aspirasi Anda telah diterima dan akan segera ditindaklanjuti.'
      };

      setAspirations(prev => [newAspiration, ...prev]);
      setAspirationForm({
        category: 'pembangunan',
        title: '',
        description: '',
        location: '',
        incident_time: '',
        submitter_nik: '',
        submitter_name: '',
        submitter_address: '',
        submitter_phone: ''
      });
      setShowAspirationModal(false);
      alert(`Aspirasi berhasil dikirim!\nNomor Tiket: ${ticketNumber}\n\nGunakan nomor tiket ini untuk melacak status aspirasi Anda.`);
    } catch (error) {
      console.error('Failed to submit aspiration:', error);
      alert('Gagal mengirim aspirasi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const newReport: MonthlyReport = {
        id: monthlyReports.length + 1,
        report_month: reportForm.report_month,
        report_category: reportCategory,
        submitted_by: user.full_name,
        submitted_date: new Date().toISOString().split('T')[0],
        status: 'submitted',
        // Include relevant fields based on category
        ...(reportCategory === 'kependudukan' && {
          population_male: reportForm.population_male ? parseInt(reportForm.population_male) : undefined,
          population_female: reportForm.population_female ? parseInt(reportForm.population_female) : undefined,
          total_kk: reportForm.total_kk ? parseInt(reportForm.total_kk) : undefined,
          births: reportForm.births ? parseInt(reportForm.births) : undefined,
          deaths: reportForm.deaths ? parseInt(reportForm.deaths) : undefined,
          move_in: reportForm.move_in ? parseInt(reportForm.move_in) : undefined,
          move_out: reportForm.move_out ? parseInt(reportForm.move_out) : undefined,
          vulnerable_elderly: reportForm.vulnerable_elderly ? parseInt(reportForm.vulnerable_elderly) : undefined,
          vulnerable_disabled: reportForm.vulnerable_disabled ? parseInt(reportForm.vulnerable_disabled) : undefined,
          vulnerable_poor: reportForm.vulnerable_poor ? parseInt(reportForm.vulnerable_poor) : undefined
        }),
        ...(reportCategory === 'pembangunan' && {
          development_ongoing: reportForm.development_ongoing,
          development_completed: reportForm.development_completed,
          infrastructure_condition: reportForm.infrastructure_condition,
          development_priorities: reportForm.development_priorities,
          community_service: reportForm.community_service
        }),
        ...(reportCategory === 'kemasyarakatan' && {
          social_activities: reportForm.social_activities,
          security_condition: reportForm.security_condition,
          security_incidents: reportForm.security_incidents,
          school_children: reportForm.school_children ? parseInt(reportForm.school_children) : undefined,
          social_programs: reportForm.social_programs
        }),
        ...(reportCategory === 'ekonomi' && {
          agricultural_area: reportForm.agricultural_area ? parseFloat(reportForm.agricultural_area) : undefined,
          harvest_data: reportForm.harvest_data,
          market_prices: reportForm.market_prices,
          farmer_groups: reportForm.farmer_groups,
          umkm_activities: reportForm.umkm_activities
        }),
        ...(reportCategory === 'khusus' && {
          stunting_cases: reportForm.stunting_cases ? parseInt(reportForm.stunting_cases) : undefined,
          food_security: reportForm.food_security,
          social_aid_recipients: reportForm.social_aid_recipients,
          environmental_condition: reportForm.environmental_condition,
          special_notes: reportForm.special_notes
        })
      };

      setMonthlyReports(prev => [newReport, ...prev]);
      setShowReportModal(false);
      alert('Laporan bulanan berhasil disubmit!');
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Gagal submit laporan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const newProposal: DevelopmentProposal = {
        id: proposals.length + 1,
        proposal_type: proposalForm.proposal_type,
        title: proposalForm.title,
        description: proposalForm.description,
        location: proposalForm.location,
        estimated_budget: proposalForm.estimated_budget ? parseInt(proposalForm.estimated_budget) : undefined,
        priority_level: proposalForm.priority_level,
        reason: proposalForm.reason,
        beneficiaries: proposalForm.beneficiaries ? parseInt(proposalForm.beneficiaries) : undefined,
        status: 'pending',
        submitted_by: user.full_name,
        submitted_date: new Date().toISOString().split('T')[0]
      };

      setProposals(prev => [newProposal, ...prev]);
      setProposalForm({
        proposal_type: 'jalan',
        title: '',
        description: '',
        location: '',
        estimated_budget: '',
        priority_level: 'sedang',
        reason: '',
        beneficiaries: ''
      });
      setShowProposalModal(false);
      alert('Proposal pembangunan berhasil diajukan!');
    } catch (error) {
      console.error('Failed to submit proposal:', error);
      alert('Gagal mengajukan proposal');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewPopulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const response = await apiFetch('/api/population', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          submitted_by: user.id,
          rt_number: user.rt_number,
          ...newPopulationForm
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPopulationData(prev => [data.population, ...prev]);
        setNewPopulationForm({
          citizen_name: '',
          id_number: '',
          birth_date: '',
          birth_place: '',
          gender: '',
          religion: '',
          marital_status: '',
          occupation: '',
          education: '',
          phone: '',
          address: '',
          change_type: '',
          notes: ''
        });
        setActiveTab('submissions');
        alert('Data penduduk berhasil diajukan ke operator desa!');
      }
    } catch (error) {
      console.error('Failed to submit population data:', error);
      alert('Gagal mengajukan data penduduk');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'reviewed': return 'Sedang Ditinjau';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getProposalTypeLabel = (type: string) => {
    switch (type) {
      case 'jalan': return 'Jalan';
      case 'irigasi': return 'Irigasi';
      case 'fasilitas_umum': return 'Fasilitas Umum';
      case 'sanitasi': return 'Sanitasi';
      case 'listrik': return 'Listrik';
      case 'lainnya': return 'Lainnya';
      default: return type;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'rendah': return 'Rendah';
      case 'sedang': return 'Sedang';
      case 'tinggi': return 'Tinggi';
      case 'mendesak': return 'Mendesak';
      default: return priority;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'rendah': return 'bg-gray-100 text-gray-800';
      case 'sedang': return 'bg-blue-100 text-blue-800';
      case 'tinggi': return 'bg-amber-100 text-amber-800';
      case 'mendesak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'kependudukan': return 'Kependudukan';
      case 'pembangunan': return 'Pembangunan & Infrastruktur';
      case 'kemasyarakatan': return 'Kemasyarakatan';
      case 'ekonomi': return 'Ekonomi & Pertanian';
      case 'khusus': return 'Laporan Khusus';
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'kependudukan': return '👥';
      case 'pembangunan': return '🏗️';
      case 'kemasyarakatan': return '🤝';
      case 'ekonomi': return '💰';
      case 'khusus': return '📋';
      default: return '📄';
    }
  };

  const getAspirationCategoryLabel = (category: string) => {
    switch (category) {
      case 'pembangunan': return 'Pembangunan';
      case 'administrasi': return 'Administrasi';
      case 'sosial': return 'Sosial/Kemasyarakatan';
      case 'keamanan': return 'Keamanan & Ketertiban';
      case 'lingkungan': return 'Lingkungan Hidup';
      case 'lainnya': return 'Lainnya';
      default: return category;
    }
  };

  const getAspirationCategoryIcon = (category: string) => {
    switch (category) {
      case 'pembangunan': return '🏗️';
      case 'administrasi': return '📋';
      case 'sosial': return '🤝';
      case 'keamanan': return '🛡️';
      case 'lingkungan': return '🌳';
      case 'lainnya': return '📌';
      default: return '📄';
    }
  };

  const getAspirationStatusColor = (status: string) => {
    switch (status) {
      case 'diterima': return 'bg-blue-100 text-blue-800';
      case 'proses': return 'bg-yellow-100 text-yellow-800';
      case 'selesai': return 'bg-emerald-100 text-emerald-800';
      case 'ditolak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAspirationStatusLabel = (status: string) => {
    switch (status) {
      case 'diterima': return 'Diterima';
      case 'proses': return 'Dalam Proses';
      case 'selesai': return 'Selesai';
      case 'ditolak': return 'Ditolak';
      default: return status;
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'rendah': return 'bg-gray-100 text-gray-700';
      case 'sedang': return 'bg-blue-100 text-blue-700';
      case 'tinggi': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'submitted': return 'Dikirim';
      case 'reviewed': return 'Ditinjau';
      case 'approved': return 'Diterima';
      default: return status;
    }
  };


  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Selamat datang kembali, {user?.full_name}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Penduduk RT</p>
              <p className="text-2xl font-bold text-gray-900">
                {populationData.filter(p => p.status === 'approved').length}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-emerald-600">+2.5%</span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengajuan Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {populationData.filter(p => p.status === 'pending').length}
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
              <p className="text-sm font-medium text-gray-600">Data Kelahiran</p>
              <p className="text-2xl font-bold text-gray-900">
                {populationData.filter(p => p.change_type === 'Kelahiran').length}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-blue-600">+5.2%</span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Kematian</p>
              <p className="text-2xl font-bold text-gray-900">
                {populationData.filter(p => p.change_type === 'Kematian').length}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-gray-600">+0%</span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-gray-600" />
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
              <h3 className="text-lg font-semibold text-gray-900">Aktivitas Dusun</h3>
              <div className="flex items-center space-x-4">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                  <option>Bulan ini</option>
                  <option>3 Bulan</option>
                  <option>6 Bulan</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900">{populationData.length}</p>
              <p className="text-sm text-emerald-600">Total perubahan data warga</p>
            </div>

            {/* Mock Chart Area */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Grafik Aktivitas Warga</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-600">Kelahiran</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Pindah Masuk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-600">Pindah Keluar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-600">Kematian</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Usulan Pembangunan */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usulan Pembangunan</h3>
            <p className="text-3xl font-bold text-gray-900">{proposals.length}</p>
            <p className="text-sm text-blue-600 mb-4">Total usulan bulan ini</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pending</span>
                <span className="font-medium">{proposals.filter(p => p.status === 'pending').length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: `${(proposals.filter(p => p.status === 'pending').length / (proposals.length || 1)) * 100}%`}}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Direview</span>
                <span className="font-medium">{proposals.filter(p => p.status === 'reviewed').length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${(proposals.filter(p => p.status === 'reviewed').length / (proposals.length || 1)) * 100}%`}}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Disetujui</span>
                <span className="font-medium">{proposals.filter(p => p.status === 'approved').length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{width: `${(proposals.filter(p => p.status === 'approved').length / (proposals.length || 1)) * 100}%`}}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Selesai</span>
                <span className="font-medium">{proposals.filter(p => p.status === 'completed').length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{width: `${(proposals.filter(p => p.status === 'completed').length / (proposals.length || 1)) * 100}%`}}></div>
              </div>
            </div>
          </div>

          {/* Pengumuman Penting */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Pengumuman Penting</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Informasi terkini untuk warga RT {user?.rt_number}</p>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-emerald-100">
                <p className="text-xs font-medium text-emerald-600 mb-1">KEGIATAN</p>
                <p className="text-sm text-gray-800">Gotong royong pembersihan selokan - Minggu ini</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <p className="text-xs font-medium text-blue-600 mb-1">ADMINISTRASI</p>
                <p className="text-sm text-gray-800">Update data warga untuk sensus - Deadline akhir bulan</p>
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('messages')}
              className="w-full mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Lihat Semua
            </button>
          </div>
        </div>
      </div>

      {/* Kegiatan Terbaru */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Perubahan Data Warga Terbaru</h3>
            <button 
              onClick={() => setActiveTab('population')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Lihat semua →
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {populationData.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada perubahan data warga</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="text-sm font-medium text-gray-500 pb-3">Nama Warga</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">Jenis Perubahan</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">RT</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">Tanggal</th>
                    <th className="text-sm font-medium text-gray-500 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {populationData.slice(0, 5).map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <span className="font-medium">{item.citizen_name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.change_type === 'Kelahiran' ? 'bg-emerald-100 text-emerald-700' :
                          item.change_type === 'Kematian' ? 'bg-gray-100 text-gray-700' :
                          item.change_type === 'Pindah Masuk' ? 'bg-blue-100 text-blue-700' :
                          item.change_type === 'Pindah Keluar' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.change_type}
                        </span>
                      </td>
                      <td className="py-4">{user?.rt_number}</td>
                      <td className="py-4">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
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

  const renderPopulationData = () => {
    // Filter citizens data
    const filteredCitizens = citizensData.filter(citizen => {
      const matchGender = filterGender === 'all' || citizen.jenis_kelamin === filterGender;
      const matchSearch = searchQuery === '' || 
        citizen.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        citizen.nik.includes(searchQuery) ||
        citizen.alamat.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchGender && matchSearch;
    });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Data Penduduk {user?.rt_number}</h2>
            <p className="text-sm text-gray-600 mt-1">Daftar lengkap penduduk di wilayah {user?.rt_number}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Tabel</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Kartu</span>
              </button>
            </div>
            
            <button 
              onClick={() => setShowGuideModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors shadow-md"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Panduan</span>
            </button>
            <button 
              onClick={() => setShowImportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import Data</span>
            </button>
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Data</span>
            </button>
            <button 
              onClick={() => setShowAddCitizenModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Tambah Data</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              {/* Filters and Search */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Cari nama, NIK, atau alamat..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-2">
                    <select
                      value={filterGender}
                      onChange={(e) => setFilterGender(e.target.value)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                      <option value="all">Semua JK</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    
                    {(filterGender !== 'all' || searchQuery !== '') && (
                      <button
                        onClick={() => {
                          setFilterGender('all');
                          setSearchQuery('');
                        }}
                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Results count */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Menampilkan <span className="font-semibold text-gray-900">{filteredCitizens.length}</span> dari <span className="font-semibold text-gray-900">{citizensData.length}</span> data penduduk
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">No</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">Nama Lengkap</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JK</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Tempat Lahir</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Lahir</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Umur</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agama</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Status Perkawinan</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Pekerjaan</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kewarganegaraan</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Alamat</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RT</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RW</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dusun</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelurahan</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kecamatan</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No KK</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Nama KK</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Status Keluarga</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendidikan</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Nama Ibu</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Nama Ayah</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gol Darah</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Kelainan Fisik/Mental</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Telepon</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCitizens.length === 0 ? (
                        <tr>
                          <td colSpan={27} className="px-4 py-8 text-center text-gray-500">
                            <div className="flex flex-col items-center">
                              <Users className="w-12 h-12 text-gray-300 mb-2" />
                              <p>Tidak ada data penduduk yang sesuai dengan filter</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredCitizens.map((citizen, index) => (
                          <tr key={citizen.id} className="hover:bg-gray-50">
                            <td className="px-3 py-3 text-sm text-gray-900 sticky left-0 bg-white">{index + 1}</td>
                            <td className="px-3 py-3 text-sm text-gray-900 font-mono">{citizen.nik}</td>
                            <td className="px-3 py-3 text-sm text-gray-900 font-medium">{citizen.nama_lengkap}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.jenis_kelamin}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.tempat_lahir}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.tanggal_lahir}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.umur || '-'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.agama}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.status_perkawinan}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.pekerjaan}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.kewarganegaraan || 'WNI'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.alamat}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.rt}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.rw}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.dusun}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.kelurahan || 'Fajar Baru'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.kecamatan || 'Way Jepara'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900 font-mono">{citizen.no_kk}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.nama_kepala_keluarga || '-'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.status_dalam_keluarga}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.pendidikan_terakhir}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.nama_ibu || '-'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.nama_ayah || '-'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.golongan_darah || '-'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.kelainan_fisik_mental || 'Tidak Ada'}</td>
                            <td className="px-3 py-3 text-sm text-gray-900">{citizen.no_telepon || '-'}</td>
                            <td className="px-3 py-3 text-sm sticky right-0 bg-white">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => alert(`Detail: ${citizen.nama_lengkap}`)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Lihat Detail"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => alert('Fitur edit akan segera tersedia')}
                                  className="text-emerald-600 hover:text-emerald-900"
                                  title="Edit"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // List/Card View - Simple list of citizens
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCitizens.map((citizen) => (
              <div key={citizen.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                    {citizen.nama_lengkap.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{citizen.nama_lengkap}</h4>
                    <p className="text-sm text-gray-600 font-mono mb-2">{citizen.nik}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📍 {citizen.alamat}</p>
                      <p>👤 {citizen.jenis_kelamin}, {citizen.umur} tahun</p>
                      <p>💼 {citizen.pekerjaan}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => alert(`Detail: ${citizen.nama_lengkap}`)}
                        className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredCitizens.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada data penduduk</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSubmissions = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pengajuan ke Operator Desa</h2>
            <p className="text-sm text-gray-600 mt-1">Kelola pengajuan data penduduk dan proposal pembangunan</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setSubmissionTab('development')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                submissionTab === 'development'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Proposal Pembangunan</span>
              {proposals.filter(p => p.status === 'pending').length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {proposals.filter(p => p.status === 'pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setSubmissionTab('aspiration')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                submissionTab === 'aspiration'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Aspirasi Masyarakat</span>
              {aspirations.filter(a => a.status === 'diterima' || a.status === 'proses').length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {aspirations.filter(a => a.status === 'diterima' || a.status === 'proses').length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Development Proposals Tab */}
        {submissionTab === 'development' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowProposalModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Ajukan Proposal Pembangunan</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                              proposal.proposal_type === 'jalan' ? 'bg-blue-100 text-blue-800' :
                              proposal.proposal_type === 'irigasi' ? 'bg-green-100 text-green-800' :
                              proposal.proposal_type === 'fasilitas_umum' ? 'bg-emerald-100 text-emerald-800' :
                              proposal.proposal_type === 'sanitasi' ? 'bg-cyan-100 text-cyan-800' :
                              proposal.proposal_type === 'listrik' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {getProposalTypeLabel(proposal.proposal_type)}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${getPriorityColor(proposal.priority_level)}`}>
                              Prioritas: {getPriorityLabel(proposal.priority_level)}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{proposal.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center text-gray-600">
                              <span className="font-semibold mr-2">📍 Lokasi:</span>
                              {proposal.location}
                            </div>
                            {proposal.estimated_budget && (
                              <div className="flex items-center text-gray-600">
                                <span className="font-semibold mr-2">💰 Estimasi:</span>
                                Rp {proposal.estimated_budget.toLocaleString('id-ID')}
                              </div>
                            )}
                            {proposal.beneficiaries && (
                              <div className="flex items-center text-gray-600">
                                <span className="font-semibold mr-2">👥 Penerima Manfaat:</span>
                                {proposal.beneficiaries} warga
                              </div>
                            )}
                            <div className="flex items-center text-gray-600">
                              <span className="font-semibold mr-2">📅 Diajukan:</span>
                              {new Date(proposal.submitted_date).toLocaleDateString('id-ID')}
                            </div>
                          </div>

                          {proposal.operator_notes && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-xs font-semibold text-blue-900 mb-1">Catatan Operator:</p>
                              <p className="text-sm text-blue-800">{proposal.operator_notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end space-y-2 ml-4">
                          <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${getProposalStatusColor(proposal.status)}`}>
                            {getStatusLabel(proposal.status)}
                          </span>
                          <button 
                            onClick={() => {
                              setSelectedProposal(proposal);
                              setShowProposalDetail(true);
                            }}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {proposals.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Proposal</h3>
                      <p className="text-gray-500 mb-4">Ajukan proposal pembangunan untuk kebutuhan dusun Anda</p>
                      <button 
                        onClick={() => setShowProposalModal(true)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Buat Proposal</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aspirations Tab */}
        {submissionTab === 'aspiration' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Form Aspirasi Masyarakat Desa</p>
                  <p className="text-blue-700">Silakan sampaikan aspirasi, keluhan, atau saran Anda. Data Anda akan dijaga kerahasiaannya dan hanya digunakan untuk keperluan penanganan aspirasi.</p>
                  <p className="text-blue-700 mt-2">📋 <strong>Nomor Tiket</strong> akan diberikan setelah pengajuan untuk melacak status</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setShowAspirationModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Kirim Aspirasi / Pengaduan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {aspirations.map((aspiration) => (
                <div key={aspiration.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getAspirationCategoryIcon(aspiration.category)}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">{aspiration.title}</h3>
                          <p className="text-sm text-gray-500">
                            Tiket: <span className="font-mono font-semibold">{aspiration.ticket_number}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                          aspiration.category === 'pembangunan' ? 'bg-blue-100 text-blue-800' :
                          aspiration.category === 'administrasi' ? 'bg-emerald-100 text-emerald-800' :
                          aspiration.category === 'sosial' ? 'bg-green-100 text-green-800' :
                          aspiration.category === 'keamanan' ? 'bg-red-100 text-red-800' :
                          aspiration.category === 'lingkungan' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getAspirationCategoryLabel(aspiration.category)}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${getPriorityBadgeColor(aspiration.priority)}`}>
                          Prioritas: {aspiration.priority.charAt(0).toUpperCase() + aspiration.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{aspiration.description}</p>
                      {aspiration.location && (
                        <p className="text-sm text-gray-600 mb-2">📍 Lokasi: {aspiration.location}</p>
                      )}
                    </div>
                    <div className="ml-4">
                      <span className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap ${getAspirationStatusColor(aspiration.status)}`}>
                        {getAspirationStatusLabel(aspiration.status)}
                      </span>
                    </div>
                  </div>

                  {aspiration.action_notes && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs font-semibold text-blue-900 mb-1">💬 Tindak Lanjut:</p>
                      <p className="text-sm text-blue-800">{aspiration.action_notes}</p>
                      {aspiration.officer_name && (
                        <p className="text-xs text-blue-700 mt-2">👤 Penanggung Jawab: {aspiration.officer_name}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                    <div>
                      <span>📅 Diajukan: {new Date(aspiration.submitted_date).toLocaleDateString('id-ID')}</span>
                      {aspiration.updated_date && (
                        <span className="ml-4">🔄 Update: {new Date(aspiration.updated_date).toLocaleDateString('id-ID')}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedAspiration(aspiration);
                        setShowAspirationDetail(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              ))}

              {aspirations.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Aspirasi</h3>
                  <p className="text-gray-500 mb-4">Sampaikan aspirasi atau keluhan Anda kepada operator desa</p>
                  <button 
                    onClick={() => setShowAspirationModal(true)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Kirim Aspirasi</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAddCitizen = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Tambah Data Penduduk</h2>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <form onSubmit={handleNewPopulation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              value={newPopulationForm.citizen_name}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, citizen_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIK
            </label>
            <input
              type="text"
              value={newPopulationForm.id_number}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, id_number: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="16 digit NIK"
              maxLength={16}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin
            </label>
            <select 
              value={newPopulationForm.gender}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={newPopulationForm.birth_date}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, birth_date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempat Lahir
            </label>
            <input
              type="text"
              value={newPopulationForm.birth_place}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, birth_place: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Tempat lahir"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. HP
            </label>
            <input
              type="tel"
              value={newPopulationForm.phone}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nomor HP"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap
            </label>
            <textarea
              value={newPopulationForm.address}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="Alamat lengkap"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Perubahan *
            </label>
            <select 
              value={newPopulationForm.change_type}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, change_type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
              required
            >
              <option value="">Pilih jenis perubahan</option>
              <option value="Kelahiran">Kelahiran</option>
              <option value="Kematian">Kematian</option>
              <option value="Pindah Masuk">Pindah Masuk</option>
              <option value="Pindah Keluar">Pindah Keluar</option>
              <option value="Perubahan Status">Perubahan Status</option>
              <option value="Koreksi Data">Koreksi Data</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RT
            </label>
            <input
              type="text"
              value={user?.rt_number || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan
            </label>
            <textarea
              value={newPopulationForm.notes}
              onChange={(e) => setNewPopulationForm(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="Catatan tambahan (opsional)"
            ></textarea>
          </div>
          
          <div className="md:col-span-2 flex space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-6 py-3 disabled:opacity-50"
            >
              {submitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Mengirim...</span>
                </div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Simpan & Ajukan ke Operator Desa
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNewPopulationForm({
                citizen_name: '',
                id_number: '',
                birth_date: '',
                birth_place: '',
                gender: '',
                religion: '',
                marital_status: '',
                occupation: '',
                education: '',
                phone: '',
                address: '',
                change_type: '',
                notes: ''
              })}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pesan</h2>
      </div>
      
      <MessagesInterface 
        userId={user?.id || 0} 
        userRole={user?.role || 'citizen'} 
      />
    </div>
  );

  const renderReports = () => {
    const birthCount = populationData.filter(p => p.change_type === 'Kelahiran' && p.status === 'approved').length;
    const deathCount = populationData.filter(p => p.change_type === 'Kematian' && p.status === 'approved').length;
    const moveInCount = populationData.filter(p => p.change_type === 'Pindah Masuk' && p.status === 'approved').length;
    const moveOutCount = populationData.filter(p => p.change_type === 'Pindah Keluar' && p.status === 'approved').length;
    const totalApproved = populationData.filter(p => p.status === 'approved').length;
    const totalPending = populationData.filter(p => p.status === 'pending').length;
    const totalRejected = populationData.filter(p => p.status === 'rejected').length;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pelaporan Bulanan Dusun</h2>
            <p className="text-gray-600">Laporan statistik dan laporan bulanan ke operator desa</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setReportTab('monthly')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                reportTab === 'monthly'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Laporan Bulanan</span>
              {monthlyReports.filter(r => r.status === 'submitted').length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {monthlyReports.filter(r => r.status === 'submitted').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setReportTab('statistics')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                reportTab === 'statistics'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Statistik</span>
            </button>
          </div>
        </div>

        {/* Monthly Reports Tab */}
        {reportTab === 'monthly' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowReportModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Buat Laporan Bulanan</span>
              </button>
            </div>

            {/* Monthly Reports List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthlyReports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{getCategoryIcon(report.report_category)}</span>
                        <h3 className="font-bold text-gray-900">{getCategoryLabel(report.report_category)}</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Periode: {new Date(report.report_month + '-01').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${getReportStatusColor(report.status)}`}>
                      {getReportStatusLabel(report.status)}
                    </span>
                  </div>

                  {/* Show data based on category */}
                  {report.report_category === 'kependudukan' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Penduduk:</span>
                        <span className="font-semibold">{(report.population_male || 0) + (report.population_female || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kelahiran:</span>
                        <span className="font-semibold text-emerald-600">+{report.births || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kematian:</span>
                        <span className="font-semibold text-red-600">-{report.deaths || 0}</span>
                      </div>
                    </div>
                  )}

                  {report.operator_notes && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Catatan Operator:</p>
                      <p className="text-xs text-blue-800">{report.operator_notes}</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                    <span>Dikirim: {new Date(report.submitted_date).toLocaleDateString('id-ID')}</span>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Lihat Detail →
                    </button>
                  </div>
                </div>
              ))}

              {monthlyReports.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Laporan</h3>
                  <p className="text-gray-500 mb-4">Buat laporan bulanan pertama Anda</p>
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Laporan</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {reportTab === 'statistics' && (
          <>
            <div className="flex items-center space-x-3">
              <select
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="weekly">Minggu Ini</option>
                <option value="monthly">Bulan Ini</option>
                <option value="quarterly">Triwulan Ini</option>
                <option value="yearly">Tahun Ini</option>
              </select>
              <button
                onClick={() => alert('Fitur export laporan akan segera tersedia')}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-emerald-700 mb-1">Total Disetujui</p>
            <p className="text-3xl font-bold text-emerald-900">{totalApproved}</p>
            <p className="text-xs text-emerald-600 mt-2">Data telah diverifikasi</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-amber-700 mb-1">Menunggu Review</p>
            <p className="text-3xl font-bold text-amber-900">{totalPending}</p>
            <p className="text-xs text-amber-600 mt-2">Perlu tindak lanjut</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm font-medium text-red-700 mb-1">Ditolak</p>
            <p className="text-3xl font-bold text-red-900">{totalRejected}</p>
            <p className="text-xs text-red-600 mt-2">Perlu perbaikan</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <PieChart className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-blue-700 mb-1">Total Data</p>
            <p className="text-3xl font-bold text-blue-900">{populationData.length}</p>
            <p className="text-xs text-blue-600 mt-2">Semua status</p>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Population Changes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Perubahan Kependudukan</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Kelahiran</p>
                    <p className="text-sm text-gray-600">Data kelahiran baru</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{birthCount}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Kematian</p>
                    <p className="text-sm text-gray-600">Data kematian</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-600">{deathCount}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pindah Masuk</p>
                    <p className="text-sm text-gray-600">Penduduk pindah masuk</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{moveInCount}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white transform rotate-180" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pindah Keluar</p>
                    <p className="text-sm text-gray-600">Penduduk pindah keluar</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{moveOutCount}</div>
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Distribusi Status</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Disetujui</span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {populationData.length > 0 ? Math.round((totalApproved / populationData.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-emerald-500 h-3 rounded-full transition-all"
                    style={{ width: `${populationData.length > 0 ? (totalApproved / populationData.length) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{totalApproved} dari {populationData.length} data</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Menunggu</span>
                  <span className="text-sm font-semibold text-amber-600">
                    {populationData.length > 0 ? Math.round((totalPending / populationData.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-amber-500 h-3 rounded-full transition-all"
                    style={{ width: `${populationData.length > 0 ? (totalPending / populationData.length) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{totalPending} dari {populationData.length} data</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Ditolak</span>
                  <span className="text-sm font-semibold text-red-600">
                    {populationData.length > 0 ? Math.round((totalRejected / populationData.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full transition-all"
                    style={{ width: `${populationData.length > 0 ? (totalRejected / populationData.length) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{totalRejected} dari {populationData.length} data</p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Ringkasan</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Tingkat Persetujuan</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {populationData.length > 0 ? Math.round((totalApproved / populationData.length) * 100) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Perlu Review</p>
                  <p className="text-lg font-bold text-amber-600">{totalPending}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {populationData.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'approved' ? 'bg-emerald-100' :
                    item.status === 'pending' ? 'bg-amber-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'approved' ? <CheckCircle className="w-5 h-5 text-emerald-600" /> :
                     item.status === 'pending' ? <Clock className="w-5 h-5 text-amber-600" /> :
                     <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{item.citizen_name}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{item.change_type}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.created_at).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
              {populationData.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada aktivitas</p>
                </div>
              )}
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    );
  };

  const renderDetailModal = () => {
    if (!showDetailModal || !selectedData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Detail Data Penduduk</h2>
                <p className="text-emerald-100">Informasi lengkap data kependudukan</p>
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedData(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-center">
              <span className={`px-6 py-2 text-sm font-semibold rounded-full ${getStatusColor(selectedData.status)}`}>
                {getStatusLabel(selectedData.status)}
              </span>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Informasi Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Nama Lengkap</p>
                  <p className="font-semibold text-gray-900">{selectedData.citizen_name}</p>
                </div>
                {selectedData.id_number && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">NIK</p>
                    <p className="font-semibold text-gray-900">{selectedData.id_number}</p>
                  </div>
                )}
                {selectedData.gender && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Jenis Kelamin</p>
                    <p className="font-semibold text-gray-900">{selectedData.gender}</p>
                  </div>
                )}
                {selectedData.birth_date && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Tanggal Lahir</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedData.birth_date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                )}
                {selectedData.phone && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">No. Telepon</p>
                    <p className="font-semibold text-gray-900">{selectedData.phone}</p>
                  </div>
                )}
                {selectedData.address && (
                  <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Alamat</p>
                    <p className="font-semibold text-gray-900">{selectedData.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                Detail Pengajuan
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-700">Jenis Perubahan</span>
                  <span className="font-semibold text-blue-900">{selectedData.change_type}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Tanggal Pengajuan</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(selectedData.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {selectedData.submitted_by_name && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Diajukan Oleh</span>
                    <span className="font-semibold text-gray-900">{selectedData.submitted_by_name}</span>
                  </div>
                )}
                {selectedData.notes && (
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">Catatan</p>
                    <p className="text-gray-900">{selectedData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
            <button
              onClick={() => {
                setShowDetailModal(false);
                setSelectedData(null);
              }}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Tutup
            </button>
            {selectedData.status === 'pending' && (
              <button
                onClick={() => alert('Fitur edit akan segera tersedia')}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all"
              >
                Edit Data
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render modals
  const renderAddCitizenModal = () => {
    if (!showAddCitizenModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Tambah Data Penduduk</h2>
                <p className="text-emerald-100">Ajukan data penduduk baru ke operator desa</p>
              </div>
              <button
                onClick={() => setShowAddCitizenModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content - Form */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {renderAddCitizen()}
          </div>
        </div>
      </div>
    );
  };

  const renderImportModal = () => {
    if (!showImportModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Upload className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-bold">Import Data Penduduk</h2>
                  <p className="text-blue-100">Upload file Excel/CSV data penduduk</p>
                </div>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload File Data Penduduk
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Format: Excel (.xlsx, .xls) atau CSV (.csv)
              </p>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="hidden"
                id="import-file"
              />
              <label
                htmlFor="import-file"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Pilih File</span>
              </label>
              {importFile && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    📄 {importFile.name}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-2">Format Template:</h4>
              <p className="text-sm text-amber-800 mb-3">
                Pastikan file mengikuti format template yang telah ditentukan
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                📥 Download Template Excel
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
            <button
              onClick={() => setShowImportModal(false)}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Batal
            </button>
            <button
              onClick={() => {
                if (importFile) {
                  alert(`Import file: ${importFile.name}`);
                  setShowImportModal(false);
                  setImportFile(null);
                } else {
                  alert('Pilih file terlebih dahulu');
                }
              }}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
            >
              Import Data
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExportModal = () => {
    if (!showExportModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-bold">Export Data Penduduk</h2>
                  <p className="text-amber-100">Download data penduduk {user?.rt_number}</p>
                </div>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Pilih Format Export:
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                  <input
                    type="radio"
                    name="export-format"
                    value="excel"
                    checked={exportFormat === 'excel'}
                    onChange={() => setExportFormat('excel')}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Excel (.xlsx)</span>
                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Format spreadsheet dengan semua kolom data
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all">
                  <input
                    type="radio"
                    name="export-format"
                    value="pdf"
                    checked={exportFormat === 'pdf'}
                    onChange={() => setExportFormat('pdf')}
                    className="w-4 h-4 text-red-600"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">PDF (.pdf)</span>
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Format dokumen siap cetak
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 Data yang akan di-export: <strong>{citizensData.length} penduduk</strong> di wilayah {user?.rt_number}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
            <button
              onClick={() => setShowExportModal(false)}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Batal
            </button>
            <button
              onClick={() => {
                alert(`Export data ke ${exportFormat.toUpperCase()}`);
                setShowExportModal(false);
              }}
              className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all"
            >
              Export {exportFormat.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProposalFormModal = () => {
    if (!showProposalModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Ajukan Proposal Pembangunan</h2>
                <p className="text-emerald-100">Usulan prioritas kebutuhan pembangunan dusun</p>
              </div>
              <button
                onClick={() => setShowProposalModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitProposal} className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jenis Proposal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jenis Proposal *
                </label>
                <select
                  value={proposalForm.proposal_type}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, proposal_type: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="jalan">Jalan</option>
                  <option value="irigasi">Irigasi</option>
                  <option value="fasilitas_umum">Fasilitas Umum</option>
                  <option value="sanitasi">Sanitasi</option>
                  <option value="listrik">Listrik</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              {/* Tingkat Prioritas */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tingkat Prioritas *
                </label>
                <select
                  value={proposalForm.priority_level}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, priority_level: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="rendah">Rendah</option>
                  <option value="sedang">Sedang</option>
                  <option value="tinggi">Tinggi</option>
                  <option value="mendesak">Mendesak</option>
                </select>
              </div>

              {/* Judul Proposal */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Proposal *
                </label>
                <input
                  type="text"
                  value={proposalForm.title}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contoh: Perbaikan Jalan RT 01"
                  required
                />
              </div>

              {/* Lokasi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lokasi *
                </label>
                <input
                  type="text"
                  value={proposalForm.location}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contoh: Jalan Utama RT 01"
                  required
                />
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi Proposal *
                </label>
                <textarea
                  value={proposalForm.description}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={4}
                  placeholder="Jelaskan secara detail rencana pembangunan..."
                  required
                />
              </div>

              {/* Alasan/Justifikasi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alasan/Justifikasi *
                </label>
                <textarea
                  value={proposalForm.reason}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="Jelaskan mengapa proposal ini penting dan mendesak..."
                  required
                />
              </div>

              {/* Estimasi Anggaran */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estimasi Anggaran (Rp)
                </label>
                <input
                  type="number"
                  value={proposalForm.estimated_budget}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, estimated_budget: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="50000000"
                />
              </div>

              {/* Jumlah Penerima Manfaat */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jumlah Penerima Manfaat
                </label>
                <input
                  type="number"
                  value={proposalForm.beneficiaries}
                  onChange={(e) => setProposalForm(prev => ({ ...prev, beneficiaries: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Jumlah warga yang mendapat manfaat"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={() => setShowProposalModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50"
              >
                {submitting ? 'Mengirim...' : 'Ajukan Proposal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderProposalDetailModal = () => {
    if (!showProposalDetail || !selectedProposal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Detail Proposal Pembangunan</h2>
                <p className="text-emerald-100">Informasi lengkap proposal</p>
              </div>
              <button
                onClick={() => {
                  setShowProposalDetail(false);
                  setSelectedProposal(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Status & Tags */}
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${getProposalStatusColor(selectedProposal.status)}`}>
                Status: {getStatusLabel(selectedProposal.status)}
              </span>
              <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                selectedProposal.proposal_type === 'jalan' ? 'bg-blue-100 text-blue-800' :
                selectedProposal.proposal_type === 'irigasi' ? 'bg-green-100 text-green-800' :
                selectedProposal.proposal_type === 'fasilitas_umum' ? 'bg-emerald-100 text-emerald-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {getProposalTypeLabel(selectedProposal.proposal_type)}
              </span>
              <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${getPriorityColor(selectedProposal.priority_level)}`}>
                Prioritas: {getPriorityLabel(selectedProposal.priority_level)}
              </span>
            </div>

            {/* Judul & Deskripsi */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedProposal.title}</h3>
              <p className="text-gray-700 leading-relaxed">{selectedProposal.description}</p>
            </div>

            {/* Detail Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-semibold mb-1">📍 Lokasi</p>
                <p className="text-blue-900 font-medium">{selectedProposal.location}</p>
              </div>

              {selectedProposal.estimated_budget && (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-emerald-700 font-semibold mb-1">💰 Estimasi Anggaran</p>
                  <p className="text-emerald-900 font-bold">
                    Rp {selectedProposal.estimated_budget.toLocaleString('id-ID')}
                  </p>
                </div>
              )}

              {selectedProposal.beneficiaries && (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-emerald-700 font-semibold mb-1">👥 Penerima Manfaat</p>
                  <p className="text-emerald-900 font-medium">{selectedProposal.beneficiaries} warga</p>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-semibold mb-1">📅 Tanggal Pengajuan</p>
                <p className="text-gray-900 font-medium">
                  {new Date(selectedProposal.submitted_date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {selectedProposal.reviewed_date && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 font-semibold mb-1">✅ Tanggal Review</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(selectedProposal.reviewed_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-semibold mb-1">👤 Diajukan Oleh</p>
                <p className="text-gray-900 font-medium">{selectedProposal.submitted_by}</p>
              </div>
            </div>

            {/* Alasan */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-gray-900 mb-3">Alasan/Justifikasi</h4>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {selectedProposal.reason}
              </p>
            </div>

            {/* Catatan Operator */}
            {selectedProposal.operator_notes && (
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Catatan dari Operator Desa
                  </h4>
                  <p className="text-blue-800 leading-relaxed">{selectedProposal.operator_notes}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
            <button
              onClick={() => {
                setShowProposalDetail(false);
                setSelectedProposal(null);
              }}
              className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderGuideModal = () => {
    if (!showGuideModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-bold">Panduan Penggunaan</h2>
                  <p className="text-emerald-100">Dashboard Kepala Dusun</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Data Penduduk Guide */}
            <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Mengelola Data Penduduk
              </h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• <strong>Tambah Data:</strong> Klik tombol "Tambah Data" untuk menambah data penduduk baru</li>
                <li>• <strong>Import:</strong> Upload file Excel/CSV untuk import data massal</li>
                <li>• <strong>Export:</strong> Download data dalam format Excel atau PDF</li>
                <li>• <strong>Pencarian:</strong> Gunakan search bar untuk mencari berdasarkan nama, NIK, atau alamat</li>
                <li>• <strong>Filter:</strong> Filter data berdasarkan jenis kelamin</li>
                <li>• <strong>View Mode:</strong> Toggle antara tampilan Tabel atau Kartu</li>
              </ul>
            </div>

            {/* Pengajuan Guide */}
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Pengajuan ke Operator Desa
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Data yang ditambahkan akan masuk ke daftar pengajuan</li>
                <li>• Status pengajuan: <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Pending</span>, <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Disetujui</span>, <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Ditolak</span></li>
                <li>• Operator desa akan review dan approve/reject pengajuan Anda</li>
                <li>• Anda dapat melihat catatan dari operator untuk pengajuan yang ditolak</li>
              </ul>
            </div>

            {/* Pelaporan Guide */}
            <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Pelaporan
              </h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Lihat statistik lengkap data penduduk di wilayah Anda</li>
                <li>• Grafik distribusi berdasarkan status pengajuan</li>
                <li>• Laporan perubahan kependudukan (kelahiran, kematian, pindah)</li>
                <li>• Filter laporan berdasarkan periode (minggu, bulan, triwulan, tahun)</li>
                <li>• Export laporan dalam format PDF</li>
              </ul>
            </div>

            {/* Import Data Guide */}
            <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-amber-900 mb-2 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Import Data Excel/CSV
              </h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Download template Excel terlebih dahulu</li>
                <li>• Isi data sesuai kolom yang tersedia</li>
                <li>• Upload file (.xlsx, .xls, atau .csv)</li>
                <li>• Sistem akan validasi data sebelum import</li>
                <li>• Data yang berhasil di-import akan masuk ke daftar pengajuan</li>
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                💡 Tips & Trik
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Pastikan data NIK lengkap 16 digit untuk validasi</li>
                <li>✓ Gunakan import data untuk menambah banyak data sekaligus</li>
                <li>✓ Export data secara berkala untuk backup</li>
                <li>✓ Periksa status pengajuan secara rutin</li>
                <li>✓ Komunikasikan dengan operator jika ada masalah</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl sticky bottom-0">
            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all"
            >
              Mengerti, Tutup Panduan
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyReportModal = () => {
    if (!showReportModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Buat Laporan Bulanan</h2>
                <p className="text-emerald-100">Laporan Dusun kepada Operator Desa</p>
              </div>
              <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitReport} className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Periode Bulan *</label>
                <input type="month" value={reportForm.report_month} onChange={(e) => setReportForm(prev => ({ ...prev, report_month: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Laporan *</label>
                <select value={reportCategory} onChange={(e) => setReportCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" required>
                  <option value="kependudukan">👥 Kependudukan</option>
                  <option value="pembangunan">🏗️ Pembangunan & Infrastruktur</option>
                  <option value="kemasyarakatan">🤝 Kemasyarakatan</option>
                  <option value="ekonomi">💰 Ekonomi & Pertanian</option>
                  <option value="khusus">📋 Laporan Khusus</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Kategori: {getCategoryLabel(reportCategory)}</p>
                  <p className="text-blue-700">{getCategoryIcon(reportCategory)} {
                    reportCategory === 'kependudukan' ? 'Isi data jumlah penduduk dan perubahan kependudukan bulan ini' :
                    reportCategory === 'pembangunan' ? 'Laporkan kegiatan pembangunan dan kondisi infrastruktur' :
                    reportCategory === 'kemasyarakatan' ? 'Laporan kegiatan sosial dan keamanan lingkungan' :
                    reportCategory === 'ekonomi' ? 'Data ekonomi, pertanian, dan UMKM di dusun' :
                    'Laporan khusus: stunting, bantuan sosial, lingkungan'
                  }</p>
                </div>
              </div>
            </div>

            {/* FORM KEPENDUDUKAN */}
            {reportCategory === 'kependudukan' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">📊 Data Penduduk</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Penduduk Laki-laki *</label>
                    <input type="number" value={reportForm.population_male} onChange={(e) => setReportForm(prev => ({ ...prev, population_male: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="125" required /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Penduduk Perempuan *</label>
                    <input type="number" value={reportForm.population_female} onChange={(e) => setReportForm(prev => ({ ...prev, population_female: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="128" required /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah KK *</label>
                    <input type="number" value={reportForm.total_kk} onChange={(e) => setReportForm(prev => ({ ...prev, total_kk: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="85" required /></div>
                </div>
                <h4 className="text-md font-semibold text-gray-800 mt-6">Perubahan Penduduk</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Kelahiran</label>
                    <input type="number" value={reportForm.births} onChange={(e) => setReportForm(prev => ({ ...prev, births: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Kematian</label>
                    <input type="number" value={reportForm.deaths} onChange={(e) => setReportForm(prev => ({ ...prev, deaths: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="1" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Pindah Masuk</label>
                    <input type="number" value={reportForm.move_in} onChange={(e) => setReportForm(prev => ({ ...prev, move_in: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="3" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Pindah Keluar</label>
                    <input type="number" value={reportForm.move_out} onChange={(e) => setReportForm(prev => ({ ...prev, move_out: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="1" /></div>
                </div>
                <h4 className="text-md font-semibold text-gray-800 mt-6">Warga Rentan</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Lansia</label>
                    <input type="number" value={reportForm.vulnerable_elderly} onChange={(e) => setReportForm(prev => ({ ...prev, vulnerable_elderly: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="15" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Disabilitas</label>
                    <input type="number" value={reportForm.vulnerable_disabled} onChange={(e) => setReportForm(prev => ({ ...prev, vulnerable_disabled: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="5" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Keluarga Miskin</label>
                    <input type="number" value={reportForm.vulnerable_poor} onChange={(e) => setReportForm(prev => ({ ...prev, vulnerable_poor: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="20" /></div>
                </div>
              </div>
            )}

            {/* FORM PEMBANGUNAN */}
            {reportCategory === 'pembangunan' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">🏗️ Pembangunan & Infrastruktur</h3>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kegiatan Pembangunan Sedang Berjalan</label>
                  <textarea value={reportForm.development_ongoing} onChange={(e) => setReportForm(prev => ({ ...prev, development_ongoing: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={3} placeholder="Perbaikan jalan RT 01 (50% progress)" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kegiatan Pembangunan Selesai</label>
                  <textarea value={reportForm.development_completed} onChange={(e) => setReportForm(prev => ({ ...prev, development_completed: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Pembersihan saluran air selesai 100%" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kondisi Infrastruktur *</label>
                  <textarea value={reportForm.infrastructure_condition} onChange={(e) => setReportForm(prev => ({ ...prev, infrastructure_condition: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={3} placeholder="Jelaskan kondisi jalan, drainase, jembatan..." required /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Usulan Prioritas Pembangunan</label>
                  <textarea value={reportForm.development_priorities} onChange={(e) => setReportForm(prev => ({ ...prev, development_priorities: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Pembangunan pos ronda, perbaikan drainase" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kegiatan Gotong Royong</label>
                  <textarea value={reportForm.community_service} onChange={(e) => setReportForm(prev => ({ ...prev, community_service: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Gotong royong setiap Minggu" /></div>
              </div>
            )}

            {/* FORM KEMASYARAKATAN */}
            {reportCategory === 'kemasyarakatan' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">🤝 Kemasyarakatan</h3>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kegiatan Masyarakat *</label>
                  <textarea value={reportForm.social_activities} onChange={(e) => setReportForm(prev => ({ ...prev, social_activities: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={3} placeholder="Pengajian rutin, Posyandu, PKK..." required /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kondisi Keamanan *</label>
                  <textarea value={reportForm.security_condition} onChange={(e) => setReportForm(prev => ({ ...prev, security_condition: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Kondusif dan aman" required /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Laporan Kejadian</label>
                  <textarea value={reportForm.security_incidents} onChange={(e) => setReportForm(prev => ({ ...prev, security_incidents: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Tidak ada kejadian" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Anak Sekolah</label>
                  <input type="number" value={reportForm.school_children} onChange={(e) => setReportForm(prev => ({ ...prev, school_children: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="85" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Program Sosial</label>
                  <textarea value={reportForm.social_programs} onChange={(e) => setReportForm(prev => ({ ...prev, social_programs: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Distribusi BLT, bantuan sembako" /></div>
              </div>
            )}

            {/* FORM EKONOMI */}
            {reportCategory === 'ekonomi' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">💰 Ekonomi & Pertanian</h3>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Luas Lahan Pertanian (Ha)</label>
                  <input type="number" step="0.1" value={reportForm.agricultural_area} onChange={(e) => setReportForm(prev => ({ ...prev, agricultural_area: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="15.5" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Data Panen</label>
                  <textarea value={reportForm.harvest_data} onChange={(e) => setReportForm(prev => ({ ...prev, harvest_data: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Panen padi: 8 ton, Jagung: 2 ton" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Harga Pasar</label>
                  <textarea value={reportForm.market_prices} onChange={(e) => setReportForm(prev => ({ ...prev, market_prices: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Beras Rp 6.500/kg" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kelompok Tani</label>
                  <textarea value={reportForm.farmer_groups} onChange={(e) => setReportForm(prev => ({ ...prev, farmer_groups: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Kelompok Tani Sejahtera (35 anggota)" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">UMKM & Aktivitas Ekonomi</label>
                  <textarea value={reportForm.umkm_activities} onChange={(e) => setReportForm(prev => ({ ...prev, umkm_activities: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="12 UMKM aktif: 5 warung, 3 bengkel" /></div>
              </div>
            )}

            {/* FORM KHUSUS */}
            {reportCategory === 'khusus' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">📋 Laporan Khusus</h3>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kasus Stunting</label>
                  <input type="number" value={reportForm.stunting_cases} onChange={(e) => setReportForm(prev => ({ ...prev, stunting_cases: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="3" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Ketahanan Pangan</label>
                  <textarea value={reportForm.food_security} onChange={(e) => setReportForm(prev => ({ ...prev, food_security: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Stabil. Semua keluarga memiliki akses pangan" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Penerima Bantuan Sosial</label>
                  <textarea value={reportForm.social_aid_recipients} onChange={(e) => setReportForm(prev => ({ ...prev, social_aid_recipients: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={3} placeholder="PKH: 15 KK, BLT: 25 KK" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kondisi Lingkungan</label>
                  <textarea value={reportForm.environmental_condition} onChange={(e) => setReportForm(prev => ({ ...prev, environmental_condition: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={2} placeholder="Bersih dan tertata. Tidak ada bencana" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Catatan Tambahan</label>
                  <textarea value={reportForm.special_notes} onChange={(e) => setReportForm(prev => ({ ...prev, special_notes: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" rows={3} placeholder="Catatan khusus yang perlu disampaikan" /></div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
              <button type="button" onClick={() => setShowReportModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all">Batal</button>
              <button type="submit" disabled={submitting}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                {submitting ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Mengirim...</span></> : 
                <><Send className="w-5 h-5" /><span>Kirim Laporan</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'population':
        return renderPopulationData();
      case 'submissions':
        return renderSubmissions();
      case 'reports':
        return renderReports();
      case 'messages':
        return renderMessages();
      default:
        return renderDashboard();
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
  if (!user || user.role !== 'dusun_head') {
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

  console.log('✅ DusunDashboard - Access granted for user:', user.role);

  return (
    <>
      <DashboardLayout
        menuItems={menuItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Dashboard Kepala Dusun"
        userInfo={{
          name: user.full_name,
          role: 'Kepala Dusun'
        }}
        onLogout={logout}
      >
        {renderContent()}
      </DashboardLayout>

      {/* Detail Modal */}
      {renderDetailModal()}

      {/* Add Citizen Modal */}
      {renderAddCitizenModal()}

      {/* Import Modal */}
      {renderImportModal()}

      {/* Export Modal */}
      {renderExportModal()}

      {/* Guide Modal */}
      {renderGuideModal()}

      {/* Proposal Form Modal */}
      {renderProposalFormModal()}

      {/* Proposal Detail Modal */}
      {renderProposalDetailModal()}

      {/* Monthly Report Modal */}
      {renderMonthlyReportModal()}

      {/* Aspiration Form Modal */}
      {showAspirationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Form Aspirasi Masyarakat</h2>
                  <p className="text-blue-100">Sampaikan aspirasi, keluhan, atau saran Anda</p>
                </div>
                <button onClick={() => setShowAspirationModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitAspiration} className="p-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  🔐 <strong>Privasi Terjamin:</strong> Data Anda dijaga kerahasiaannya dan hanya digunakan untuk penanganan aspirasi. Jangka waktu tindak lanjut: 3-7 hari kerja.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Aspirasi / Pengaduan *</label>
                  <select value={aspirationForm.category} onChange={(e) => setAspirationForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    <option value="pembangunan">🏗️ Pembangunan (jalan, jembatan, fasilitas umum)</option>
                    <option value="administrasi">📋 Administrasi (layanan surat, data kependudukan)</option>
                    <option value="sosial">🤝 Sosial / Kemasyarakatan</option>
                    <option value="keamanan">🛡️ Keamanan & Ketertiban</option>
                    <option value="lingkungan">🌳 Lingkungan Hidup</option>
                    <option value="lainnya">📌 Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Aspirasi *</label>
                  <input type="text" value={aspirationForm.title} onChange={(e) => setAspirationForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Perbaikan jalan rusak di RT 01" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Lengkap *</label>
                  <textarea value={aspirationForm.description} onChange={(e) => setAspirationForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={5}
                    placeholder="Jelaskan aspirasi/keluhan Anda secara detail..." required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi Kejadian (Opsional)</label>
                  <input type="text" value={aspirationForm.location} onChange={(e) => setAspirationForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Jalan Utama RT 01, depan rumah no. 25" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Waktu Kejadian (Opsional)</label>
                  <input type="date" value={aspirationForm.incident_time} onChange={(e) => setAspirationForm(prev => ({ ...prev, incident_time: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Data Pelapor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">NIK *</label>
                      <input type="text" value={aspirationForm.submitter_nik} onChange={(e) => setAspirationForm(prev => ({ ...prev, submitter_nik: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="16 digit NIK" maxLength={16} required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                      <input type="text" value={aspirationForm.submitter_name} onChange={(e) => setAspirationForm(prev => ({ ...prev, submitter_name: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Nama sesuai KTP" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat / RT *</label>
                      <input type="text" value={aspirationForm.submitter_address} onChange={(e) => setAspirationForm(prev => ({ ...prev, submitter_address: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="RT 01" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon *</label>
                      <input type="tel" value={aspirationForm.submitter_phone} onChange={(e) => setAspirationForm(prev => ({ ...prev, submitter_phone: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="081234567890" required />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    📷 <strong>Upload Lampiran:</strong> Fitur upload foto/dokumen akan segera tersedia untuk melengkapi aspirasi Anda.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                <button type="button" onClick={() => setShowAspirationModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all">
                  Batal
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                  {submitting ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Mengirim...</span></>
                  ) : (
                    <><Send className="w-5 h-5" /><span>Kirim Aspirasi</span></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Aspiration Detail Modal */}
      {showAspirationDetail && selectedAspiration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Detail Aspirasi</h2>
                  <p className="text-blue-100">Nomor Tiket: {selectedAspiration.ticket_number}</p>
                </div>
                <button onClick={() => {setShowAspirationDetail(false); setSelectedAspiration(null);}} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getAspirationCategoryIcon(selectedAspiration.category)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedAspiration.title}</h3>
                    <p className="text-sm text-gray-600">{getAspirationCategoryLabel(selectedAspiration.category)}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${getAspirationStatusColor(selectedAspiration.status)}`}>
                  {getAspirationStatusLabel(selectedAspiration.status)}
                </span>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Deskripsi:</h4>
                <p className="text-gray-700 leading-relaxed">{selectedAspiration.description}</p>
              </div>

              {selectedAspiration.location && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-1">📍 Lokasi Kejadian:</p>
                  <p className="text-gray-900">{selectedAspiration.location}</p>
                </div>
              )}

              {selectedAspiration.incident_time && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-1">📅 Waktu Kejadian:</p>
                  <p className="text-gray-900">{new Date(selectedAspiration.incident_time).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Data Pelapor:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Nama:</p>
                    <p className="font-medium text-gray-900">{selectedAspiration.submitter_name}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">NIK:</p>
                    <p className="font-medium text-gray-900">{selectedAspiration.submitter_nik}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Alamat:</p>
                    <p className="font-medium text-gray-900">{selectedAspiration.submitter_address}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Telepon:</p>
                    <p className="font-medium text-gray-900">{selectedAspiration.submitter_phone}</p>
                  </div>
                </div>
              </div>

              {selectedAspiration.action_notes && (
                <div className="border-t pt-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-bold text-blue-900 mb-2">💬 Tindak Lanjut dari Operator Desa:</h4>
                    <p className="text-blue-800 leading-relaxed mb-3">{selectedAspiration.action_notes}</p>
                    {selectedAspiration.officer_name && (
                      <p className="text-sm text-blue-700">👤 <strong>Penanggung Jawab:</strong> {selectedAspiration.officer_name}</p>
                    )}
                    {selectedAspiration.updated_date && (
                      <p className="text-xs text-blue-600 mt-2">🔄 Update terakhir: {new Date(selectedAspiration.updated_date).toLocaleDateString('id-ID')}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                <p>📅 Tanggal Pengajuan: {new Date(selectedAspiration.submitted_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="mt-1">🎫 Simpan nomor tiket <strong className="font-mono text-gray-900">{selectedAspiration.ticket_number}</strong> untuk melacak status</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
              <button onClick={() => {setShowAspirationDetail(false); setSelectedAspiration(null);}}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DusunDashboard;
