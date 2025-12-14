import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/contexts/AuthContext';
import DashboardLayout from '@/react-app/components/DashboardLayout';
import ArticleEditor from '@/react-app/components/dashboard/ArticleEditor';
import AgendaEditor from '@/react-app/components/dashboard/AgendaEditor';
import GalleryEditor from '@/react-app/components/dashboard/GalleryEditor';
import ServiceEditor from '@/react-app/components/dashboard/ServiceEditor';
import PPIDEditor from '@/react-app/components/dashboard/PPIDEditor';
import TransparencyEditor from '@/react-app/components/dashboard/TransparencyEditor';
import Kelolapenduduk from '@/react-app/components/dashboard/penduduk/Kelolapenduduk';
import Administrasi from '@/react-app/components/dashboard/Layanan/Administrasi';
import { mockTransparencyData, mockVillagePrograms } from '@/react-app/data/mockInformationData';
import {
  Users, UserPlus, Settings, Home, Shield,
  Clock, CheckCircle, XCircle, Plus, Edit3, Trash2,
  FileText, Upload, Download,
  Eye, Search, User, Mail, Phone, Calendar, MessageSquare,
  Activity, Bell, X, Newspaper, Save,
  BarChart3, DollarSign, Briefcase, Building2,
  TrendingUp, Globe, Heart, Award, Construction, ShoppingCart,
  GraduationCap, Stethoscope, Image, CalendarDays, Info, MapPin,
  HelpCircle, FileSpreadsheet, UserCheck, CreditCard, AlertCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import {
  forceSeed,
  getByCategoryFor,
  getReceivedFor,
  addReply,
  updateStatus,
  markRead,
  type AppMessage,
  type MessageCategory,
  type MessageStatus,
} from '@/react-app/lib/messageStore';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
  rt_number?: string;
  phone?: string;
  address?: string;
  created_at: string;
  last_login_at?: string;
  // Extended registration data
  ktp_image_url?: string;
  nik?: string;
  birth_place?: string;
  birth_date?: string;
  gender?: string;
  blood_type?: string;
  rw_number?: string;
  dusun?: string;
  village?: string;
  district?: string;
  province?: string;
  regency?: string;
  religion?: string;
  marital_status?: string;
  occupation?: string;
}

interface Request {
  id: number;
  user_id: number;
  service_id: number;
  request_type: string;
  subject: string;
  description: string;
  status: string;
  documents?: any[];
  response?: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user?: {
    id: number;
    full_name: string;
  };
  service?: {
    id: number;
    name: string;
  };
}

interface PopulationData {
  id: number;
  submitted_by: number;
  rt_number: string;
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

interface Article {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url?: string; // Still useful for frontend processing if not from direct upload
  image_path?: string; // Path from backend storage
  category: string; // Not currently used in backend, but kept for frontend compatibility
  status: string;
  featured: boolean; // Required to match ArticleEditor
  author_id?: number;
  author?: {
    id: number;
    name: string;
  };
  views?: number;
  created_at?: string;
  updated_at?: string;
}

interface TransparencyData {
  id?: number;
  type: string;
  title: string;
  description?: string;
  file_url?: string;
  amount?: number;
  year: number;
  quarter?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface VillageProgram {
  id: number;
  name: string;
  type: string;
  description?: string;
  beneficiaries?: number;
  budget?: number;
  status: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

interface AgendaItem {
  id?: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  created_at?: string;
}

interface GalleryItem {
  id?: number;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  uploaded_by?: number;
  status: string;
  created_at?: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

interface Dusun {
  id: string;
  name: string;
  head_name: string;
  head_phone?: string;
  rt_count: number;
  population_count: number;
}

interface Service {
  id?: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: string;
  category_id: number;
  category?: Category;
  templates?: { id?: number; name: string; file_url: string; file_object?: File | null; }[];
}

interface PPIDService {
  id?: number;
  title: string;
  category: string;
  description: string;
  document_url?: string;
  published_date: string;
  status: string;
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
  kabupaten_kota?: string;
  provinsi?: string;
  kode_pos?: string;
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

const OperatorDashboard = () => {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subTab, setSubTab] = useState('');
  const [informationSubTab, setInformationSubTab] = useState('articles');
  const [transparencySubTab, setTransparencySubTab] = useState('apbd');
  const [programSubTab, setProgramSubTab] = useState('ekonomi');
  const [servicesSubTab, setServicesSubTab] = useState('administration');
  const [selectedDusun, setSelectedDusun] = useState<string>('');
  const [selectedRT, setSelectedRT] = useState<string>('');
  
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data states
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [dusunHeads, setDusunHeads] = useState<User[]>([]);
  const [citizens, setCitizens] = useState<User[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [messages, setMessages] = useState<AppMessage[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [transparencyData, setTransparencyData] = useState<TransparencyData[]>(mockTransparencyData);
  const [villagePrograms, setVillagePrograms] = useState<VillageProgram[]>(mockVillagePrograms);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ppidServices, setPpidServices] = useState<PPIDService[]>([]);

  // Loading states
  const [servicesLoading, setServicesLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [agendaLoading, setAgendaLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);

  // Pagination states (currently not used - can be re-enabled when needed)

  // Messages UI state
  const [messageCategory, setMessageCategory] = useState<MessageCategory | 'all'>('all');
  const [selectedMessage, setSelectedMessage] = useState<AppMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newStatus, setNewStatus] = useState<MessageStatus>('dibaca');
  
  // Modal states
  const [showCreateDusunHead, setShowCreateDusunHead] = useState(false);
  const [showAddDusun, setShowAddDusun] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showEditDusun, setShowEditDusun] = useState(false);
  const [showEditRT, setShowEditRT] = useState(false);
  const [editingDusun, setEditingDusun] = useState<Dusun | null>(null);
  const [editingRT, setEditingRT] = useState<{id: string; name: string; ketua: string; phone?: string} | null>(null);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [selectedPendingUser, setSelectedPendingUser] = useState<User | null>(null);
  const [showUserManageModal, setShowUserManageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deleteVerificationNIK, setDeleteVerificationNIK] = useState('');
  
  // Import/Export states
  const [citizensData, setCitizensData] = useState<CitizenData[]>([]);
  const [selectedCitizens, setSelectedCitizens] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<CitizenData[]>([]);
  const [importTargetDusun, setImportTargetDusun] = useState<string>('');
  const [importDusunDropdownOpen, setImportDusunDropdownOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel');
  
  // Population view states
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [filterDusun, setFilterDusun] = useState<string>('all');
  const [filterRT, setFilterRT] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Editor modes for Information tab
  const [editorMode, setEditorMode] = useState<'list' | 'article' | 'agenda' | 'gallery' | 'transparency'>('list');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [selectedTransparency, setSelectedTransparency] = useState<TransparencyData | null>(null);
  
  // Editor mode for Services tab
  const [serviceEditorMode, setServiceEditorMode] = useState<'list' | 'editor'>('list');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Editor mode for PPID tab
  const [ppidEditorMode, setPpidEditorMode] = useState<'list' | 'editor'>('list');
  const [selectedPPID, setSelectedPPID] = useState<PPIDService | null>(null);



  // Request Management
  const [allRequests, setAllRequests] = useState<Request[]>([]);


  // Profile and Settings
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Notifications state
  const [notifications, setNotifications] = useState<Array<{
    id: number | string;
    type: 'message' | 'request' | 'user' | 'system';
    title: string;
    message: string;
    time: string;
    unread: boolean;
    action?: {
      tab: string;
      subTab?: string;
      data?: any;
    };
  }>>([]);
  
  // Forms
  const [newDusunHeadForm, setNewDusunHeadForm] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
    phone: '',
    rt_number: ''
  });

  const [newDusunForm, setNewDusunForm] = useState({
    dusun_name: '',
    dusun_code: '',
    description: '',
    head_username: '',
    head_password: '',
    head_full_name: '',
    head_email: '',
    head_phone: ''
  });

  const [editDusunForm, setEditDusunForm] = useState({
    name: '',
    head_name: '',
    head_phone: '',
    rt_count: 0,
    population_count: 0
  });

  const [editRTForm, setEditRTForm] = useState({
    name: '',
    ketua: '',
    phone: '',
    kk_count: 0
  });

  const [editUserForm, setEditUserForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    rt_number: '',
    rw_number: '',
    dusun: ''
  });

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await apiFetch("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch categories. Status:', response.status);
        console.error('Response:', errorText);
        setCategories([]);
        return;
      }

      const data = await response.json();
      console.log('Fetched categories:', data);
      setCategories(data);

    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchServices = async () => {
    setServicesLoading(true);
    try {
        const token = localStorage.getItem("auth_token");
        const response = await apiFetch("/admin/services", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch services. Status:', response.status);
        console.error('Response:', errorText);
        setServices([]);
        return;
      }

      const data = await response.json();
      console.log('Fetched admin services:', data);

      // Data yang diterima langsung berupa array
      const items = Array.isArray(data) ? data : [];

      const validItems = items.filter((item: Service) =>
        item &&
        typeof item === 'object' &&
        'id' in item &&
        'name' in item &&
        'description' in item &&
        'requirements' in item &&
        Array.isArray(item.requirements) &&
        'processing_time' in item &&
        'fee' in item &&
        'status' in item &&
        'category_id' in item
      );

      console.log('Valid services:', validItems);
      setServices(validItems);

    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchAllRequests = async () => {
  setRequestsLoading(true);
  try {
    const token = localStorage.getItem("auth_token");

    const response = await apiFetch("/requests/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch requests");
      setRequests([]);
      return;
    }

    const data = await response.json();

    // Data harus berupa objek dengan field 'requests'
    const items = Array.isArray(data.requests) ? data.requests : [];

    const validItems = items.filter((item: Request) =>
      item &&
      typeof item === "object" &&

      "id" in item &&
      "user_id" in item &&
      "service_id" in item &&
      "request_type" in item &&
      "subject" in item &&
      "description" in item &&
      "status" in item &&

      // validasi relasi user
      "user" in item &&
      item.user &&
      typeof item.user === "object" &&
      "id" in item.user &&
      "full_name" in item.user &&

      // validasi relasi service
      "service" in item &&
      item.service &&
      typeof item.service === "object" &&
      "id" in item.service &&
      "name" in item.service &&

      // validasi dokumen
      "documents" in item &&
      Array.isArray(item.documents)
    );

    setAllRequests(validItems);

  } catch (error) {
    console.error("Error fetching requests:", error);
    setAllRequests([]);
  } finally {
    setRequestsLoading(false);
  }
};


  const fetchGalleryItems = async () => {
    setGalleryLoading(true);
    try {
      const galleryResponse = await apiFetch('/gallery', {
        credentials: 'include'
      });

      if (!galleryResponse.ok) {
        console.error('Failed to fetch gallery items');
        setGalleryItems([]);
        return;
      }

      const data = await galleryResponse.json();

      // Pastikan ambil array dari field `galleries`
      const items = Array.isArray(data.galleries) ? data.galleries : [];

      // Validasi item seperti sebelumnya
      const validItems = items.filter((item: any) =>
        item &&
        typeof item === 'object' &&
        'id' in item &&
        'title' in item &&
        'image_url' in item &&
        'category' in item &&
        'status' in item
      );

      setGalleryItems(validItems);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGalleryItems([]);
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await apiFetch('/dashboard/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch articles');
        setArticles([]);
        return;
      }

      const data = await response.json();
      // Laravel's paginate returns data in 'data' field
      const items = Array.isArray(data.data) ? data.data : [];
      
      setArticles(items);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    }
  };


  // Redirect if not authorized
  useEffect(() => {
    if (user && user.role !== 'operator') {
      window.location.href = '/';
    }
  }, [user]);

  // Reset search term when switching tabs
  useEffect(() => {
    setSearchTerm('');
  }, [subTab]);

  // Seed demo messages and fetch
  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return;
      // Always seed for demo - show real message examples
      forceSeed(user.id);
      
      try {
        // Load demo data for simulation
        // In production, you would fetch from API only
        const token = localStorage.getItem("auth_token");
        // Demo data for pending users (always loaded for demo)
        const usersResponse = await apiFetch("/users/list", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (usersResponse.ok) {
          const data = await usersResponse.json();

          // Jika backend sudah memisahkan
          if (data.pending_users) setPendingUsers(data.pending_users);
          if (data.dusun_heads) setDusunHeads(data.dusun_heads);
          if (data.citizens) setCitizens(data.citizens);

          // Jika backend hanya return satu array user ⇒ kita pisahkan manual
          if (Array.isArray(data.users)) {
            setPendingUsers(data.users.filter((u: User) => u.status === "pending"));
            setDusunHeads(data.users.filter((u: User) => u.role === "dusun_head"));
            setCitizens(data.users.filter((u: User) => u.role === "citizen"));
          }
        }

        await fetchGalleryItems(); 
        // Fetch requests // This block was commented out, removed it entirely
        // const requestsResponse = await apiFetch('/api/requests', {
        //   credentials: 'include'
        // });
        // if (requestsResponse.ok) {
        //   const data = await requestsResponse.json();
        //   setRequests(data.requests || []);
        // }

        // Load messages from local store (demo)
        setMessages(getReceivedFor(user.id));

        // Fetch population data
        const populationResponse = await apiFetch('/population', {
          credentials: 'include'
        });
        if (populationResponse.ok) {
          const data = await populationResponse.json();
          setPopulationData(data.population || []);
        }

        // Fetch articles
        await fetchArticles();

        setAgendaLoading(true);
        try {
          const agendaResponse = await apiFetch('/agenda', {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          if (agendaResponse.ok) {
              const data = await agendaResponse.json();
              // ASUMSI: Backend Laravel mengembalikan { "agendas": [...] }
              setAgendaItems(data.agendas || []);
              console.log(`✅ Fetched ${data.agendas.length} agendas from API.`);
          } else {
              console.error('❌ Failed to fetch agendas from API:', agendaResponse.status);
              // Opsional: set ke array kosong jika gagal fetch
              setAgendaItems([]);
          }
        } catch (error) {
          console.error('Error fetching agenda:', error);
          setAgendaItems([]);
        } finally {
          setAgendaLoading(false);
        }
        // Fetch transparency data
        const transparencyResponse = await apiFetch('/transparency/all', {
          credentials: 'include'
        });
        if (transparencyResponse.ok) {
          const responseData = await transparencyResponse.json();
          setTransparencyData(responseData.data || []);
        }

        // Fetch village programs
        const programsResponse = await apiFetch('/programs', {
          credentials: 'include'
        });
        if (programsResponse.ok) {
          const data = await programsResponse.json();
          setVillagePrograms(data.programs || []);
        }

        // Fetch RT data (now uncommented and standardized)
        const rtResponse = await apiFetch('/rt-data', {
          credentials: 'include'
        });
        if (rtResponse.ok) {
          // setRTData(data.rt_data || []); // Assuming you have a state for this
        }
        
        // Mock services data - sesuai dengan Administrasi.tsx
        await fetchServices();
        await fetchCategories();

        // Fetch all requests for operator dashboard
        await fetchAllRequests();

        // Mock PPID services data - informasi publik yang lengkap
        setPpidServices([
          {
            id: 1,
            title: 'Profil Desa Fajar Baru',
            category: 'Informasi Berkala',
            description: 'Dokumen profil lengkap Desa Fajar Baru termasuk visi, misi, struktur organisasi, dan data demografi',
            document_url: '#',
            published_date: '2024-01-15',
            status: 'published'
          },
          {
            id: 2,
            title: 'Laporan Keuangan Desa Semester 1 Tahun 2024',
            category: 'Informasi Berkala',
            description: 'Laporan pertanggungjawaban keuangan desa periode Januari - Juni 2024 termasuk APBDes dan realisasi',
            document_url: '#',
            published_date: '2024-07-01',
            status: 'published'
          },
          {
            id: 3,
            title: 'Laporan Akses Informasi Publik 2024',
            category: 'Informasi Berkala',
            description: 'Laporan statistik permohonan dan layanan informasi publik kepada masyarakat',
            document_url: '#',
            published_date: '2024-08-15',
            status: 'published'
          },
          {
            id: 4,
            title: 'Peraturan Desa Nomor 1 Tahun 2024',
            category: 'Informasi Setiap Saat',
            description: 'Peraturan Desa tentang tata tertib kehidupan bermasyarakat dan sanksi pelanggaran',
            document_url: '#',
            published_date: '2024-03-10',
            status: 'published'
          },
          {
            id: 5,
            title: 'Daftar Inventaris Barang Milik Desa',
            category: 'Informasi Setiap Saat',
            description: 'Daftar lengkap aset dan inventaris barang milik desa termasuk tanah, bangunan, dan kendaraan',
            document_url: '#',
            published_date: '2024-06-20',
            status: 'published'
          },
          {
            id: 6,
            title: 'Keputusan Kepala Desa tentang Pengangkatan Perangkat Desa',
            category: 'Informasi Setiap Saat',
            description: 'SK Kepala Desa mengenai penetapan dan pengangkatan perangkat desa periode 2024-2030',
            document_url: '#',
            published_date: '2024-02-05',
            status: 'published'
          },
          {
            id: 7,
            title: 'Rencana Pembangunan Jangka Menengah Desa (RPJMDes)',
            category: 'Informasi Setiap Saat',
            description: 'RPJM Desa periode 2024-2029 berisi rencana pembangunan dan program prioritas desa',
            document_url: '#',
            published_date: '2024-01-20',
            status: 'published'
          },
          {
            id: 8,
            title: 'Pengumuman Bencana Banjir Wilayah RT 03',
            category: 'Informasi Serta Merta',
            description: 'Informasi darurat mengenai banjir di wilayah RT 03 dan lokasi pengungsian sementara',
            document_url: '#',
            published_date: '2024-10-15',
            status: 'published'
          },
          {
            id: 9,
            title: 'Peringatan Dini Cuaca Ekstrem',
            category: 'Informasi Serta Merta',
            description: 'Peringatan dini dari BMKG tentang potensi cuaca ekstrem dan himbauan kewaspadaan',
            document_url: '#',
            published_date: '2024-11-01',
            status: 'published'
          }
        ]);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAllData();
  }, [user]);

  // Generate smart notifications
  useEffect(() => {
    if (!user) return;
    
    const generatedNotifications: Array<{
      id: number | string;
      type: 'message' | 'request' | 'user' | 'system';
      title: string;
      message: string;
      time: string;
      unread: boolean;
      action?: {
        tab: string;
        subTab?: string;
        data?: any;
      };
    }> = [];

    // Notifications for unread messages
    const unreadMessages = messages.filter(m => !m.is_read);
    if (unreadMessages.length > 0) {
      generatedNotifications.push({
        id: `msg-${unreadMessages.length}`,
        type: 'message',
        title: `${unreadMessages.length} Pesan Baru`,
        message: `Anda memiliki ${unreadMessages.length} pesan belum dibaca dari masyarakat`,
        time: 'Baru saja',
        unread: true,
        action: {
          tab: 'messages'
        }
      });
    }

    // Notifications for pending user registrations
    if (pendingUsers.length > 0) {
      generatedNotifications.push({
        id: `user-pending-${pendingUsers.length}`,
        type: 'user',
        title: `${pendingUsers.length} Registrasi Pending`,
        message: `${pendingUsers.length} warga menunggu persetujuan registrasi`,
        time: '10 menit lalu',
        unread: true,
        action: {
          tab: 'users',
          subTab: 'pending'
        }
      });
    }

    // Notifications for pending requests
    const pendingRequests = requests.filter(r => r.status === 'pending');
    if (pendingRequests.length > 0) {
      generatedNotifications.push({
        id: `req-pending-${pendingRequests.length}`,
        type: 'request',
        title: `${pendingRequests.length} Permohonan Baru`,
        message: `Ada ${pendingRequests.length} permohonan layanan administrasi yang perlu ditinjau`,
        time: '30 menit lalu',
        unread: true,
        action: {
          tab: 'requests'
        }
      });
    }

    // Notifications for pending population data
    const pendingPopulation = populationData.filter(p => p.status === 'pending');
    if (pendingPopulation.length > 0) {
      generatedNotifications.push({
        id: `pop-pending-${pendingPopulation.length}`,
        type: 'system',
        title: `${pendingPopulation.length} Data Kependudukan Pending`,
        message: `${pendingPopulation.length} data kependudukan menunggu verifikasi`,
        time: '1 jam lalu',
        unread: true,
        action: {
          tab: 'population',
          subTab: 'data'
        }
      });
    }

    // System notification
    generatedNotifications.push({
      id: 'sys-backup',
      type: 'system',
      title: 'Backup Data Terjadwal',
      message: 'Backup data sistem akan dilakukan malam ini pukul 23:00',
      time: '2 jam lalu',
      unread: false
    });

    setNotifications(generatedNotifications);
  }, [user, messages, pendingUsers, requests, populationData]);

  const pendingCount = pendingUsers.length + requests.filter(r => r.status === 'pending').length + populationData.filter(p => p.status === 'pending').length + messages.filter(m => !m.is_read).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    {
      id: 'users',
      label: 'Kelola Pengguna',
      icon: Users,
      badge: pendingUsers.length
    },
    { id: 'population', label: 'Kelola Penduduk', icon: Building2 },
    { id: 'services', label: 'Kelola Layanan', icon: FileText },
    { id: 'information', label: 'Kelola Informasi', icon: Info },
    { id: 'transparency', label: 'Kelola Transparansi', icon: DollarSign },
    { id: 'programs', label: 'Kelola Program', icon: Briefcase },
    { id: 'messages', label: 'Pesan', icon: Mail, badge: messages.filter(m => !m.is_read).length },
    { id: 'website', label: 'Kelola Website', icon: Globe }
  ];

  // Daftar dusun sesuai struktur administrasi desa
  const dusuns: Dusun[] = [
    {
      id: 'dusun-1',
      name: 'Dusun I',
      head_name: '',
      head_phone: '',
      rt_count: 386,
      population_count: 1231,
    },
    {
      id: 'dusun-2',
      name: 'Dusun II A',
      head_name: '',
      head_phone: '',
      rt_count: 429,
      population_count: 1418,
    },
    {
      id: 'dusun-3',
      name: 'Dusun II B',
      head_name: '',
      head_phone: '',
      rt_count: 456,
      population_count: 1905,
    },
    {
      id: 'dusun-4',
      name: 'Dusun III A',
      head_name: '',
      head_phone: '',
      rt_count: 607,
      population_count: 2434,
    },
    {
      id: 'dusun-5',
      name: 'Dusun III B',
      head_name: '',
      head_phone: '',
      rt_count: 616,
      population_count: 2260,
    },
    {
      id: 'dusun-6',
      name: 'Dusun IV',
      head_name: '',
      head_phone: '',
      rt_count: 377,
      population_count: 1027,
    },
    {
      id: 'dusun-7',
      name: 'Dusun V',
      head_name: '',
      head_phone: '',
      rt_count: 365,
      population_count: 1297,
    },
  ];

  const importTargetDusunOptions = dusuns.map((d) => d.name);

  const importValidCount = importPreview.filter((row) => {
    const nik = String(row.nik || '').trim();
    const nama = String(row.nama_lengkap || '').trim();
    return nik !== '' && nama !== '';
  }).length;
  const importInvalidCount = importPreview.length - importValidCount;

  // citizensData will be filled from Excel import / API; no mock data

  useEffect(() => {
    setCitizensData([]);
  }, []);





  // Import/Export Functions
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      // Preview file
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: 'binary', cellDates: true });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          setImportTargetDusun('');
          
          console.log('=== DEBUGGING EXCEL IMPORT ===');
          console.log('Sheet Name:', wsname);
          console.log('Sheet Range:', ws['!ref']);
          
          // Coba baca semua data termasuk header untuk analisis
          const rawData = XLSX.utils.sheet_to_json<any>(ws, { 
            header: 1, // Baca sebagai array, bukan object
            defval: '',
            raw: false,
            blankrows: false // Skip baris kosong
          });
          
          console.log('Total Raw Rows:', rawData.length);
          console.log('First 5 rows (raw):', rawData.slice(0, 5));
          
          // Cari baris header (baris yang memiliki "NIK" atau "Nama")
          let headerRowIndex = 0;
          for (let i = 0; i < Math.min(10, rawData.length); i++) {
            const row = rawData[i];
            if (Array.isArray(row)) {
              const rowStr = row.join('|').toLowerCase();
              if (rowStr.includes('nik') || rowStr.includes('nama')) {
                headerRowIndex = i;
                console.log('Header found at row:', i + 1, 'Content:', row);
                break;
              }
            }
          }
          
          // Baca ulang dengan header yang benar
          const data = XLSX.utils.sheet_to_json<any>(ws, { 
            range: headerRowIndex, // Mulai dari baris header
            defval: '',
            raw: false,
            dateNF: 'DD-MM-YYYY',
            blankrows: false
          });
          
          console.log('Total Data Rows (after header):', data.length);
          console.log('Parsed Data (first 3 rows):', data.slice(0, 3));
          if (data.length > 0) {
            console.log('Detected Columns:', Object.keys(data[0]));
          }

          const detectDusunName = (source: string) => {
            const s = (source || '').toLowerCase();
            if (s.includes('dusun') && /dusun\s*1/.test(s)) return 'Dusun I';
            if (s.includes('dusun') && /dusun\s*2\s*a/.test(s)) return 'Dusun II A';
            if (s.includes('dusun') && /dusun\s*2\s*b/.test(s)) return 'Dusun II B';
            if (s.includes('dusun') && /dusun\s*3\s*a/.test(s)) return 'Dusun III A';
            if (s.includes('dusun') && /dusun\s*3\s*b/.test(s)) return 'Dusun III B';
            if (s.includes('dusun') && /dusun\s*4/.test(s)) return 'Dusun IV';
            if (s.includes('dusun') && /dusun\s*5/.test(s)) return 'Dusun V';
            return '';
          };

          const detectedDusun = detectDusunName(wsname) || detectDusunName(file.name);

          setImportTargetDusun(detectedDusun);
          
          // Map Excel columns to CitizenData dengan semua field
          const mappedData: CitizenData[] = data.map((row: any, index: number) => {
            // Normalize column names untuk matching yang lebih fleksibel
            const normalizedRow: any = {};
            Object.keys(row).forEach(key => {
              const normalizedKey = key.toLowerCase().trim().replace(/[\s_.-]+/g, '');
              normalizedRow[normalizedKey] = row[key];
            });
            
            // Helper function untuk mendapatkan nilai dari berbagai kemungkinan nama kolom
            const getVal = (...keys: string[]) => {
              // Coba dengan nama asli dulu
              for (const key of keys) {
                if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
                  return String(row[key]).trim();
                }
              }
              // Coba dengan normalized keys
              for (const key of keys) {
                const normalizedKey = key.toLowerCase().trim().replace(/[\s_.-]+/g, '');
                if (normalizedRow[normalizedKey] !== undefined && normalizedRow[normalizedKey] !== null && normalizedRow[normalizedKey] !== '') {
                  return String(normalizedRow[normalizedKey]).trim();
                }
              }
              return '';
            };

            // Format tanggal lahir ke MM/DD/YYYY (leading zero, 4 digit tahun)
            const pad2 = (n: number) => String(n).padStart(2, '0');
            const formatDateObj = (d: Date) =>
              `${pad2(d.getUTCMonth() + 1)}/${pad2(d.getUTCDate())}/${d.getUTCFullYear()}`;
            const formatBirthDate = (value: string) => {
              if (!value) return '';
              // Jika numeric (serial Excel), convert via Date
              if (!isNaN(Number(value))) {
                const parsed = XLSX.SSF.parse_date_code(Number(value));
                if (parsed) {
                  const dateObj = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
                  if (!isNaN(dateObj.getTime())) return formatDateObj(dateObj);
                }
              }
              // Normal string
              const cleaned = value.trim();
              const dateFromStr = new Date(cleaned);
              if (!isNaN(dateFromStr.getTime())) {
                return formatDateObj(new Date(Date.UTC(
                  dateFromStr.getUTCFullYear(),
                  dateFromStr.getUTCMonth(),
                  dateFromStr.getUTCDate()
                )));
              }
              // Try manual split
              const splitters = ['-', '/'];
              for (const s of splitters) {
                if (cleaned.includes(s)) {
                  const parts = cleaned.split(s).map(p => p.trim());
                  if (parts.length === 3) {
                    const [a, b, c] = parts;
                    const year = c.length === 2 ? Number(`20${c}`) - (Number(c) > 30 ? 100 : 0) : Number(c);
                    const month = Number(a) > 12 ? Number(b) : Number(a); // fallback
                    const day = Number(a) > 12 ? Number(a) : Number(b);
                    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                      const dateObj = new Date(Date.UTC(year, month - 1, day));
                      if (!isNaN(dateObj.getTime())) return formatDateObj(dateObj);
                    }
                  }
                }
              }
              return cleaned;
            };

            const rawTanggalLahir = getVal('Tanggal Lahir', 'TANGGAL LAHIR', 'tanggal_lahir', 'TGL LAHIR', 'Tgl Lahir', 'TGL. LAHIR', 'Tanggal Lahir', 'TANGGAL LAHIR', 'Tgl. Lahir', 'TGL. LAHIR', 'TTL');
            const tanggalLahir = formatBirthDate(rawTanggalLahir);

            const umurRaw = getVal('Umur', 'UMUR', 'Usia', 'USIA');
            const umurParsed = Number.parseInt(String(umurRaw || '').trim(), 10);
            const umurValue = !Number.isNaN(umurParsed) ? umurParsed : undefined;

            return {
              id: citizensData.length + index + 1,
              no: index + 1,
              nik: getVal('NIK', 'nik', 'No. NIK', 'NO NIK', 'NOMOR NIK', 'NO. NIK', 'No NIK', 'Nomor NIK', 'nomor nik'),
              nama_lengkap: getVal('Nama Lengkap', 'NAMA LENGKAP', 'nama_lengkap', 'NAMA', 'Nama', 'nama', 'Nama Lengkap', 'NAMA LENGKAP'),
              jenis_kelamin: getVal('Jenis Kelamin', 'JENIS KELAMIN', 'jenis_kelamin', 'JK', 'L/P', 'Kelamin', 'KELAMIN', 'Sex', 'Gender'),
              tempat_lahir: getVal('Tempat Lahir', 'TEMPAT LAHIR', 'tempat_lahir', 'Tmp Lahir', 'TMP LAHIR', 'Tmpt Lahir', 'TMPT LAHIR'),
              tanggal_lahir: tanggalLahir,
              umur: umurValue,
              agama: getVal('Agama', 'AGAMA', 'agama', 'Agm', 'AGM'),
              status_perkawinan: getVal('Status Perkawinan', 'STATUS PERKAWINAN', 'status_perkawinan', 'STATUS KAWIN', 'Kawin', 'KAWIN', 'Status Kawin', 'STATUS KAWIN'),
              pekerjaan: getVal('Jenis Pekerjaan', 'JENIS PEKERJAAN', 'Pekerjaan', 'PEKERJAAN', 'pekerjaan', 'Pkj', 'PKJ', 'Kerja', 'KERJA'),
              kewarganegaraan: getVal('Kewarganegaraan', 'KEWARGANEGARAAN', 'kewarganegaraan', 'WNI/WNA', 'Warga Negara', 'WARGA NEGARA'),
              alamat: getVal('Alamat', 'ALAMAT', 'alamat', 'Almt', 'ALMT', 'Alamat Lengkap', 'ALAMAT LENGKAP'),
              rt: getVal('RT', 'rt', 'R.T', 'R T', 'R.T.', 'No RT', 'NO RT'),
              rw: getVal('RW', 'rw', 'R.W', 'R W', 'R.W.', 'No RW', 'NO RW'),
              dusun: detectedDusun || getVal('Dusun', 'DUSUN', 'dusun', 'Dsn', 'DSN', 'Nama Dusun', 'NAMA DUSUN'),
              kelurahan: getVal('Kelurahan', 'KELURAHAN', 'kelurahan', 'Kel', 'KEL', 'Desa', 'DESA', 'Nama Desa', 'NAMA DESA'),
              kecamatan: getVal('Kecamatan', 'KECAMATAN', 'kecamatan', 'Kec', 'KEC', 'Nama Kecamatan', 'NAMA KECAMATAN'),
              no_kk: getVal('No KK', 'NO KK', 'no_kk', 'NO. KK', 'NOMOR KK', 'Nomor KK', 'No. KK', 'KK', 'Nomor Kartu Keluarga', 'NOMOR KARTU KELUARGA'),
              nama_kepala_keluarga: getVal('Nama Kepala Keluarga', 'NAMA KEPALA KELUARGA', 'nama_kepala_keluarga', 'NAMA KK', 'Nama KK', 'Kepala Keluarga', 'KEPALA KELUARGA', 'KK'),
              status_dalam_keluarga: getVal('Status Hubungan Dalam Keluarga', 'STATUS HUBUNGAN DALAM KELUARGA', 'Status Dalam Keluarga', 'STATUS DALAM KELUARGA', 'status_dalam_keluarga', 'STATUS KELUARGA', 'Status Keluarga', 'Shdk', 'SHDK'),
              pendidikan_terakhir: getVal('Pendidikan Terakhir', 'PENDIDIKAN TERAKHIR', 'pendidikan_terakhir', 'PENDIDIKAN', 'Pendidikan', 'Pend', 'PEND', 'Pddk', 'PDDK'),
              nama_ibu: getVal('Nama Ibu', 'NAMA IBU', 'nama_ibu', 'IBU', 'Ibu', 'Nama Ibu Kandung', 'NAMA IBU KANDUNG'),
              nama_ayah: getVal('Nama Ayah', 'NAMA AYAH', 'nama_ayah', 'AYAH', 'Ayah', 'Nama Ayah Kandung', 'NAMA AYAH KANDUNG'),
              golongan_darah: getVal('Golongan Darah', 'GOLONGAN DARAH', 'golongan_darah', 'GOL DARAH', 'GOL. DARAH', 'Gol Darah', 'Gol. Darah', 'Darah', 'DARAH'),
              status_perkawinan_dalam_kk: getVal('Status Perkawinan Dalam KK', 'status_perkawinan_dalam_kk', 'Status Kawin KK', 'STATUS KAWIN KK'),
              tanggal_perkawinan: getVal('Tanggal Perkawinan', 'TANGGAL PERKAWINAN', 'tanggal_perkawinan', 'Tgl Kawin', 'TGL KAWIN', 'Tanggal Kawin', 'TANGGAL KAWIN'),
              kelainan_fisik_mental: getVal('Kelainan Fisik Mental', 'KELAINAN FISIK MENTAL', 'kelainan_fisik_mental', 'KELAINAN', 'Kelainan', 'Cacat', 'CACAT'),
              no_telepon: getVal('No Telepon', 'NO TELEPON', 'no_telepon', 'NO. TELEPON', 'TELEPON', 'HP', 'No HP', 'NO HP', 'Handphone', 'HANDPHONE', 'No. HP', 'NO. HP'),
              no_paspor: getVal('No Paspor', 'NO PASPOR', 'no_paspor', 'Nomor Paspor', 'NOMOR PASPOR', 'Paspor', 'PASPOR'),
              no_akta_lahir: getVal('No Akta Lahir', 'NO AKTA LAHIR', 'no_akta_lahir', 'Nomor Akta Lahir', 'NOMOR AKTA LAHIR', 'Akta Lahir', 'AKTA LAHIR'),
              no_akta_kawin: getVal('No Akta Kawin', 'NO AKTA KAWIN', 'no_akta_kawin', 'Nomor Akta Kawin', 'NOMOR AKTA KAWIN', 'Akta Kawin', 'AKTA KAWIN'),
              created_at: new Date().toISOString().split('T')[0]
            };
          });
          
          // Filter out empty rows (rows without NIK or Name)
          const validData = mappedData.filter(row => {
            const hasNIK = row.nik && row.nik.trim() !== '';
            const hasName = row.nama_lengkap && row.nama_lengkap.trim() !== '';
            return hasNIK && hasName;
          });
          
          console.log('Mapped Data Count:', mappedData.length);
          console.log('Valid Data Count:', validData.length);
          console.log('Sample Mapped Data (first 3):', mappedData.slice(0, 3));
          console.log('Sample Valid Data (first 3):', validData.slice(0, 3));
          
          // Tampilkan preview untuk semua data (termasuk yang invalid)
          setImportPreview(mappedData);
          
          if (validData.length === 0) {
            alert(`File Excel tidak berisi data valid.\n\nDitemukan ${mappedData.length} baris data.\n\nPastikan:\n- Kolom NIK dan Nama Lengkap terisi dengan benar\n- Format file sesuai dengan template\n- Periksa preview data di bawah untuk melihat masalahnya\n\nKolom yang terdeteksi: ${data.length > 0 ? Object.keys(data[0]).join(', ') : 'Tidak ada'}`);
          } else if (validData.length < mappedData.length) {
            const skipped = mappedData.length - validData.length;
            alert(`Ditemukan ${mappedData.length} baris data.\n\nData valid: ${validData.length} baris\nData tidak lengkap: ${skipped} baris (NIK atau Nama kosong)\n\nPeriksa preview data di bawah. Baris yang tidak valid ditandai dengan warna merah.`);
          } else {
            alert(`Berhasil membaca ${validData.length} data valid!\n\nSemua data siap untuk diimport.\nSilakan periksa preview data di bawah sebelum melanjutkan.`);
          }
        } catch (error) {
          alert('Gagal membaca file. Pastikan format file sesuai dengan template.');
          console.error('Error reading Excel:', error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleImportData = () => {
    if (importPreview.length > 0) {
      if (!importTargetDusun) {
        alert('Pilih dusun tujuan import terlebih dahulu!');
        return;
      }
      const validData = importPreview.filter((row) => {
        return (
          String(row.nik || '').trim() !== '' &&
          String(row.nama_lengkap || '').trim() !== ''
        );
      });

      const invalidCount = importPreview.length - validData.length;
      const dataWithTargetDusun = importPreview.map((row) => ({
        ...row,
        dusun: importTargetDusun,
      }));
      setCitizensData(prev => [...prev, ...dataWithTargetDusun]);

      if (invalidCount > 0) {
        alert(
          `Import selesai!\n\nTotal: ${importPreview.length} data\nValid: ${validData.length} data\nTidak lengkap: ${invalidCount} data (ditandai merah)\n\nSemua data telah ditambahkan ke database.`,
        );
      } else {
        alert(
          `Berhasil mengimport ${importPreview.length} data penduduk!\n\nSemua data telah ditambahkan ke database.`,
        );
      }
      
      setShowImportModal(false);
      setImportFile(null);
      setImportPreview([]);
      setImportTargetDusun('');
      setImportDusunDropdownOpen(false);
    }
  };

  const handleExportData = () => {
    const dataToExport = selectAll 
      ? citizensData 
      : citizensData.filter(c => c.id && selectedCitizens.has(c.id));

    if (dataToExport.length === 0) {
      alert('Pilih data yang ingin di-export terlebih dahulu!');
      return;
    }

    const excelRows = dataToExport.map((c) => ({
      'RT': c.rt,
      'RW': c.rw,
      'Alamat': c.alamat,
            'Nomor Kartu Keluarga': c.no_kk,
      'Nama Lengkap': c.nama_lengkap,
      'NIK': c.nik,
      'Jenis Kelamin': c.jenis_kelamin,
      'Tempat Lahir': c.tempat_lahir,
      'Tanggal Lahir': c.tanggal_lahir,
      'Umur': c.umur ?? '',
      'Agama': c.agama,
      'Pendidikan': c.pendidikan_terakhir,
      'Jenis Pekerjaan': c.pekerjaan,
      'Golongan Darah': c.golongan_darah || '',
      'Status Perkawinan': c.status_perkawinan,
      'Status Hubungan Dalam Keluarga':
        c.status_dalam_keluarga || c.status_hubungan_dalam_keluarga || '',
      'Nama Ayah': c.nama_ayah || '',
      'Nama Ibu': c.nama_ibu || '',
    }));

    const headerOrder = Object.keys(excelRows[0] || {});

    if (exportFormat === 'excel') {
      const ws = XLSX.utils.json_to_sheet(excelRows, { header: headerOrder });

      // Auto-fit column widths based on the longest cell content per column
      const colWidths = headerOrder.map((h) => {
        const headerLen = String(h).length;
        const maxCellLen = excelRows.reduce((max, row) => {
          const v = (row as Record<string, unknown>)[h];
          const len = String(v ?? '').length;
          return Math.max(max, len);
        }, 0);
        const wch = Math.min(Math.max(headerLen, maxCellLen) + 2, 60);
        return { wch };
      });
      (ws as any)['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data Penduduk');
      XLSX.writeFile(wb, `Data_Penduduk_${new Date().toISOString().split('T')[0]}.xlsx`);
      alert(`Berhasil export ${dataToExport.length} data ke Excel!`);
    } else {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      });

      doc.setFontSize(12);
      doc.text('Data Penduduk', 40, 40);
      doc.setFontSize(9);
      doc.text(`Total: ${dataToExport.length} data`, 40, 58);

      const body = excelRows.map((row) => headerOrder.map((h) => String((row as any)[h] ?? '')));

      autoTable(doc, {
        head: [headerOrder],
        body,
        startY: 75,
        theme: 'grid',
        styles: {
          fontSize: 7,
          cellPadding: 3,
          overflow: 'linebreak',
          valign: 'top',
        },
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: 20,
          fontStyle: 'bold',
        },
        columnStyles: {
          2: { cellWidth: 160 },
          5: { cellWidth: 120 },
          6: { cellWidth: 150 },
          7: { cellWidth: 110 },
          17: { cellWidth: 160 },
        },
        margin: { left: 40, right: 40 },
      });

      doc.save(`Data_Penduduk_${new Date().toISOString().split('T')[0]}.pdf`);
      alert(`Berhasil export ${dataToExport.length} data ke PDF!`);
    }

    setShowExportModal(false);
    setSelectedCitizens(new Set());
    setSelectAll(false);
  };

  const handleSelectAllCitizens = () => {
    if (selectAll) {
      setSelectedCitizens(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(citizensData.filter(c => c.id).map(c => c.id!));
      setSelectedCitizens(allIds);
      setSelectAll(true);
    }
  };

  const handleSelectCitizen = (id: number) => {
    const newSelected = new Set(selectedCitizens);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCitizens(newSelected);
    setSelectAll(newSelected.size === citizensData.length);
  };

  const downloadTemplate = () => {
    const template = [{
      'NIK': '3304012001950001',
      'Nama Lengkap': 'Contoh Nama',
      'Jenis Kelamin': 'Laki-laki',
      'Tempat Lahir': 'Lampung',
      'Tanggal Lahir': '01-01-1990',
      'Agama': 'Islam',
      'Status Perkawinan': 'Kawin',
      'Pekerjaan': 'Wiraswasta',
      'Alamat': 'Jl. Contoh No. 1',
      'RT': '01',
      'RW': '01',
      'Dusun': 'Dusun Mawar',
      'No KK': '3304012001950001',
      'Status Dalam Keluarga': 'Kepala Keluarga',
      'Pendidikan Terakhir': 'SMA',
      'No Telepon': '081234567890'
    }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'Template_Data_Penduduk.xlsx');
  };

  // Handle Edit Dusun
  const handleEditDusun = (dusun: Dusun, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingDusun(dusun);
    setEditDusunForm({
      name: dusun.name,
      head_name: dusun.head_name,
      head_phone: dusun.head_phone || '',
      rt_count: dusun.rt_count,
      population_count: dusun.population_count
    });
    setShowEditDusun(true);
  };

  const handleSaveEditDusun = () => {
    if (!editingDusun) return;
    
    // Simulasi update - dalam produksi, kirim ke backend
    alert(`Dusun "${editDusunForm.name}" berhasil diperbarui!\n\nData yang diupdate:\n- Nama: ${editDusunForm.name}\n- Kepala Dusun: ${editDusunForm.head_name}\n- No. HP: ${editDusunForm.head_phone}\n- Jumlah RT: ${editDusunForm.rt_count}\n- Jumlah Penduduk: ${editDusunForm.population_count}`);
    
    setShowEditDusun(false);
    setEditingDusun(null);
    setEditDusunForm({
      name: '',
      head_name: '',
      head_phone: '',
      rt_count: 0,
      population_count: 0
    });
  };

  // Handle Edit RT
  const handleEditRT = (rtNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const rtData = {
      id: `rt-${rtNumber}`,
      name: `RT ${String(rtNumber).padStart(2, '0')}`,
      ketua: `Bapak RT ${rtNumber}`,
      phone: `0812345678${rtNumber}`
    };
    setEditingRT(rtData);
    setEditRTForm({
      name: rtData.name,
      ketua: rtData.ketua,
      phone: rtData.phone || '',
      kk_count: Math.floor(Math.random() * 50) + 20
    });
    setShowEditRT(true);
  };

  const handleSaveEditRT = () => {
    if (!editingRT) return;
    
    // Simulasi update - dalam produksi, kirim ke backend
    alert(`${editRTForm.name} berhasil diperbarui!\n\nData yang diupdate:\n- Nama RT: ${editRTForm.name}\n- Ketua RT: ${editRTForm.ketua}\n- No. HP: ${editRTForm.phone}\n- Jumlah KK: ${editRTForm.kk_count}`);
    
    setShowEditRT(false);
    setEditingRT(null);
    setEditRTForm({
      name: '',
      ketua: '',
      phone: '',
      kk_count: 0
    });
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      setSubmitting(true);
      // In production, call API to update user
      // await apiFetch(`/api/users/${selectedUser.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(editUserForm)
      // });

      // Update local state
      const updateUserInList = (users: User[]) => 
        users.map(u => u.id === selectedUser.id ? { ...u, ...editUserForm } : u);

      if (selectedUser.role === 'dusun_head') {
        setDusunHeads(prev => updateUserInList(prev));
      } else {
        setCitizens(prev => updateUserInList(prev));
      }

      alert('Data pengguna berhasil diperbarui!');
      setShowEditUserModal(false);
      setShowUserManageModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Gagal memperbarui data pengguna');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    // Verify NIK
    if (deleteVerificationNIK !== selectedUser.nik) {
      alert('NIK yang dimasukkan tidak sesuai!');
      return;
    }

    try {
      setSubmitting(true);
      // In production, call API to delete user
      // await apiFetch(`/api/users/${selectedUser.id}`, {
      //   method: 'DELETE'
      // });

      // Update local state
      if (selectedUser.role === 'dusun_head') {
        setDusunHeads(prev => prev.filter(u => u.id !== selectedUser.id));
      } else {
        setCitizens(prev => prev.filter(u => u.id !== selectedUser.id));
      }

      alert('Akun berhasil dihapus!');
      setShowDeleteUserModal(false);
      setShowUserManageModal(false);
      setSelectedUser(null);
      setDeleteVerificationNIK('');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Gagal menghapus akun');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await apiFetch('/approve-user', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ user_id: userId, action: 'approve' })
      });

      if (response.ok) {
        setPendingUsers(prev => prev.filter(u => u.id !== userId));
        const approvedUser = pendingUsers.find(u => u.id === userId);
        if (approvedUser) {
          setCitizens(prev => [{...approvedUser, status: 'active'}, ...prev]);
        }
      }
    } catch (error) {
      console.error('Failed to approve user:', error);
    }
  };

  const handleRejectUser = async (userId: number) => {
    try {
      const response = await apiFetch('/auth/reject-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user_id: userId, action: 'reject' })
      });

      if (response.ok) {
        setPendingUsers(prev => prev.filter(u => u.id !== userId));
      }
    } catch (error) {
      console.error('Failed to reject user:', error);
    }
  };

  const handleCreateDusunHead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiFetch('/auth/create-dusun-head', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newDusunHeadForm)
      });

      if (response.ok) {
        const data = await response.json();
        setDusunHeads(prev => [data.user, ...prev]);
        setNewDusunHeadForm({
          username: '',
          password: '',
          full_name: '',
          email: '',
          phone: '',
          rt_number: ''
        });
        setShowCreateDusunHead(false);
        alert('Akun kepala dusun berhasil dibuat!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Gagal membuat akun');
      }
    } catch (error) {
      console.error('Failed to create dusun head:', error);
      alert('Gagal membuat akun');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateDusun = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create the dusun head account with rt_number as dusun identifier
      const response = await apiFetch('/auth/create-dusun-head', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: newDusunForm.head_username,
          password: newDusunForm.head_password,
          full_name: newDusunForm.head_full_name,
          email: newDusunForm.head_email,
          phone: newDusunForm.head_phone,
          rt_number: newDusunForm.dusun_code // Use dusun_code as rt_number identifier
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDusunHeads(prev => [data.user, ...prev]);
        
        // Reset form
        setNewDusunForm({
          dusun_name: '',
          dusun_code: '',
          description: '',
          head_username: '',
          head_password: '',
          head_full_name: '',
          head_email: '',
          head_phone: ''
        });
        setShowAddDusun(false);
        alert(`Dusun "${newDusunForm.dusun_name}" berhasil dibuat!\n\nAkun Kepala Dusun:\nUsername: ${newDusunForm.head_username}\nPassword: ${newDusunForm.head_password}\n\nKepala dusun dapat login menggunakan kredensial ini.`);
        
        // Refresh dusun heads list
        const dusunResponse = await apiFetch('/auth/users?role=dusun_head', {
          credentials: 'include'
        });
        if (dusunResponse.ok) {
          const refreshData = await dusunResponse.json();
          setDusunHeads(refreshData.users || []);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Gagal membuat dusun dan akun kepala dusun');
      }
    } catch (error) {
      console.error('Failed to create dusun:', error);
      alert('Gagal membuat dusun');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveArticle = async (articleData: Article, imageFile: File | null) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("auth_token");

      const formData = new FormData();
      formData.append('title', articleData.title);
      formData.append('content', articleData.content);
      formData.append('excerpt', articleData.excerpt);
      formData.append('status', articleData.status);
      formData.append('category', articleData.category); // FIX: Added category to form data

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (articleData.id && selectedArticle && selectedArticle.image_path && !articleData.image_path) {
          // If it's an existing article, and it had an image, but now there's no new file
          // and ArticleEditor cleared the image_path (meaning user removed it)
          formData.append('clear_image', 'true'); // Explicitly tell backend to clear image
      }


      const isEdit = !!articleData.id;
      const url = isEdit ? `/dashboard/articles/${articleData.id}` : '/dashboard/articles';
      const method = 'POST'; // Always POST for FormData, use _method for PUT/PATCH

      if (isEdit) {
        formData.append('_method', 'PUT'); // Spoof PUT request for Laravel
      }
      
      const response = await apiFetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type for FormData, browser sets it automatically
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save article:', errorData);
        alert(`Gagal menyimpan artikel: ${errorData.message || response.statusText}`);
        return;
      }

      await fetchArticles(); // Refresh the list of articles
      
      setSelectedArticle(null);
      setEditorMode('list');
      alert('Artikel berhasil disimpan!');
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Gagal menyimpan artikel');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteArticle = async (articleId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("auth_token");
      const response = await apiFetch(`/dashboard/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete article:', errorData);
        alert(`Gagal menghapus artikel: ${errorData.message || response.statusText}`);
        return;
      }

      await fetchArticles(); // Refresh the list of articles
      alert('Artikel berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Gagal menghapus artikel');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveAgenda = async (agendaData: AgendaItem) => {
      try {
          setSubmitting(true); // Asumsi Anda memiliki state submitting untuk tombol loading

          // 1. Persiapkan data untuk dikirim ke API
          const dataToSend = {
              title: agendaData.title,
              description: agendaData.description,
              // Gabungkan tanggal dan waktu menjadi format ISO string jika diperlukan oleh backend
              // Atau kirim terpisah jika backend ingin memprosesnya sendiri.
              // Kita kirim sebagai string terpisah sesuai yang diketik user
              date: agendaData.date, 
              time: agendaData.time, 
              location: agendaData.location,
              category: agendaData.category.toLowerCase(), // Pastikan konsisten
              status: 'scheduled', // Status default saat membuat baru
          };

          const token = localStorage.getItem("auth_token");
          
          // Cek apakah ini edit atau buat baru
          const isEdit = !!selectedAgenda;
          const url = isEdit ? `/agenda/${selectedAgenda!.id}` : '/agenda';
          const method = isEdit ? 'PUT' : 'POST';

          console.log(`Sending ${method} request to ${url} with data:`, dataToSend);

          // 2. Lakukan panggilan API menggunakan apiFetch (diasumsikan sudah dikonfigurasi)
          const response = await apiFetch(url, {
              method,
              headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(dataToSend)
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || `Gagal menyimpan agenda: Status ${response.status}`);
          }

          const data = await response.json();
          const savedAgenda = data.agenda; // Asumsi API mengembalikan objek agenda yang baru/diperbarui

          // 3. Update state lokal (Simulasi berhasil)
          if (isEdit) {
              setAgendaItems(prev => prev.map(a => a.id === selectedAgenda!.id ? savedAgenda : a));
          } else {
              setAgendaItems(prev => [savedAgenda, ...prev]);
          }

          setSelectedAgenda(null);
          setEditorMode('list');
          alert(`Agenda "${savedAgenda.title}" berhasil disimpan!`);

      } catch (error) {
          console.error('Failed to save agenda:', error);
          alert(`Gagal menyimpan agenda. Cek console untuk detail error.`);
          // Re-throw untuk ditangkap oleh komponen pemanggil jika perlu (opsional)
          // throw error; 
      } finally {
          setSubmitting(false);
      }
  };

  const handleSaveGallery = async (galleryData: GalleryItem, imageFile: File | null) => {
      try {
          setSubmitting(true);

          const isEdit = !!galleryData.id;
          const url = isEdit ? `/gallery/${galleryData.id}` : `/gallery`;
          const method = isEdit ? "POST" : "POST"; // atau PUT jika backend kamu pakai PUT

          const formData = new FormData();
          formData.append("title", galleryData.title);
          formData.append("description", galleryData.description || "");
          formData.append("category", galleryData.category);
          formData.append("status", galleryData.status);

          if (imageFile) {
              formData.append("image", imageFile);
          }

          // Jika edit, dan user tidak upload gambar baru
          if (isEdit && !imageFile) {
              formData.append("image_url", galleryData.image_url || "");
          }

          const token = localStorage.getItem("auth_token");

          const response = await apiFetch(url, {
              method,
              body: formData,
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });

          if (!response.ok) {
              const err = await response.json();
              console.log(err);
              alert("Gagal menyimpan galeri");
              return;
          }

          const savedGallery = await response.json(); // karena API return langsung object

          // 🔥 reload data dari server, tidak update manual state
          await fetchGalleryItems();

          setSelectedGallery(null);
          setEditorMode("list");

          alert(`Galeri "${savedGallery.title}" berhasil disimpan!`);

        } catch (e) {
          console.error(e);
          alert("Terjadi kesalahan saat menyimpan galeri.");
        } finally {
          setSubmitting(false);
        }
      };

 const handleSaveService = async (serviceData: Service, templateFiles: Record<string, File>) => {
    try {
        // setSubmitting(true);
        
        const isEdit = !!serviceData.id;
        const url = isEdit ? `/services/${serviceData.id}` : `/services`;
        // Laravel umumnya menggunakan POST untuk store dan PUT/PATCH/POST dengan _method=PUT untuk update
        // Kita gunakan POST untuk Create, dan POST untuk Update (sesuai contoh gallery Anda, jika API Anda dikonfigurasi demikian)
        const method = "POST"; 

        const formData = new FormData();
        
        // 1. Append Data Layanan Utama (di-JSON-kan yang berbentuk array/object)
        formData.append("name", serviceData.name);
        formData.append("description", serviceData.description);
        formData.append("processing_time", serviceData.processing_time);
        formData.append("fee", serviceData.fee.toString());
        formData.append("status", serviceData.status);
        formData.append("category_id", serviceData.category_id.toString());
        
        // Requirements dikirim sebagai JSON string (karena ini array)
        formData.append("requirements", JSON.stringify(serviceData.requirements));
        
        // 2. Siapkan Data Template (Name dan ID/URL lama)
        const templatesDataToSend: { id?: number; name: string; file_url?: string }[] = [];
        serviceData.templates?.forEach(t => {
            // Kita hanya kirim data nama dan ID lama (atau file_url lama)
            // File object diabaikan di sini, karena akan diupload terpisah
            templatesDataToSend.push({
                id: t.id,
                name: t.name,
                // Jika ini adalah file lama, kirimkan file_url agar backend tahu mana yang tidak dihapus
                file_url: t.file_object ? undefined : t.file_url,
            });
        });
        
        // Data template yang berupa teks/ID dikirim sebagai JSON string
        formData.append("templates_data", JSON.stringify(templatesDataToSend));


        // 3. Append File Upload Baru
        for (const [key, file] of Object.entries(templateFiles)) {
            // key adalah 'template_file_0', 'template_file_1', dst.
            formData.append(key, file);
        }
        
        // Jika update, Laravel perlu tahu methodnya adalah PUT (jika Anda tidak menggunakan POST untuk update)
        if (isEdit && method === "POST") {
            formData.append("_method", "PUT");
        }

        // Debug: Log FormData
        console.log('=== Sending Service Data ===');
        console.log('URL:', url);
        console.log('Method:', method);
        console.log('Is Edit:', isEdit);
        for (const [key, value] of formData.entries()) {
            console.log(key, ':', value);
        }
        console.log('=== End Service Data ===');

        const token = localStorage.getItem("auth_token");

        const response = await apiFetch(url, {
            method,
            body: formData,
            // Penting: Jangan set Content-Type header secara manual untuk FormData. Browser akan mengaturnya.
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error('Response status:', response.status);
            console.error('Response text:', responseText);
            try {
                const err = JSON.parse(responseText);
                console.error('Validation Errors:', err.errors);
                alert(`Gagal menyimpan layanan: ${err.message || responseText.substring(0, 200)}`);
            } catch {
                alert(`Gagal menyimpan layanan. Status: ${response.status}\n${responseText.substring(0, 500)}`);
            }
            return;
        }

        const savedService = await response.json();

        // Refresh data layanan dari database
        await fetchServices();

        setSelectedService(null);
        setServiceEditorMode("list");

        alert(`Layanan "${savedService.name}" berhasil disimpan!`);

    } catch (e) {
        console.error(e);
        alert("Terjadi kesalahan saat menyimpan layanan.");
    } finally {
        // setSubmitting(false);
    }
};


  const handleSavePPID = async (ppidData: PPIDService) => {
    try {
      // Simulasi save ke backend
      // Untuk produksi, ganti dengan API call yang sebenarnya
      const newPPID = {
        ...ppidData,
        id: selectedPPID?.id || Date.now()
      };

      if (selectedPPID) {
        setPpidServices(prev => prev.map(p => p.id === selectedPPID.id ? newPPID : p));
      } else {
        setPpidServices(prev => [newPPID, ...prev]);
      }
      
      setSelectedPPID(null);
      setPpidEditorMode('list');
      alert('Informasi publik berhasil disimpan!');
    } catch (error) {
      console.error('Failed to save PPID:', error);
      throw error;
    }
  };

  const handleSaveTransparency = async (transparencyData: TransparencyData) => {
    try {
      const newTransparency = {
        ...transparencyData,
        id: selectedTransparency?.id || Date.now(),
        created_at: selectedTransparency?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (selectedTransparency) {
        setTransparencyData(prev => prev.map(t => t.id === selectedTransparency.id ? newTransparency : t));
      } else {
        setTransparencyData(prev => [newTransparency, ...prev]);
      }
      
      setSelectedTransparency(null);
      setEditorMode('list');
      alert('Data transparansi berhasil disimpan!');
    } catch (error) {
      console.error('Failed to save transparency data:', error);
      throw error;
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': case 'active': case 'published': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': case 'inactive': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'active': return 'Aktif';
      case 'rejected': return 'Ditolak';
      case 'inactive': return 'Tidak Aktif';
      case 'in_progress': return 'Diproses';
      case 'published': return 'Published';
      case 'draft': return 'Draft';
      default: return status;
    }
  };



  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Ringkasan data lengkap Desa Fajar Baru</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-amber-600">Perlu Perhatian</span>
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
              <p className="text-sm font-medium text-gray-600">Total Penduduk</p>
              <p className="text-2xl font-bold text-gray-900">
                {dusuns.reduce((total, d) => total + d.population_count, 0)}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-emerald-600">Dalam {dusuns.length} Dusun</span>
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
              <p className="text-sm font-medium text-gray-600">Layanan Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === 'active').length}</p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-blue-600">Siap Melayani</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Artikel Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {articles.filter(a => a.status === 'published').length}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-emerald-600">Dari {articles.length} Total</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Structure Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Struktur Desa */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Building2 className="w-5 h-5 text-blue-600 mr-2" />
            Struktur Desa
          </h3>
          <div className="space-y-3">
            {dusuns.map((dusun) => (
              <div key={dusun.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-gray-900">{dusun.name}</p>
                  <p className="text-xs text-gray-600">Kepala: {dusun.head_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{dusun.population_count} jiwa</p>
                  <p className="text-xs text-gray-500">{dusun.rt_count} RT</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('population')}
            className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Kelola Struktur Desa →
          </button>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 text-green-600 mr-2" />
            Ringkasan Aktivitas
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Pengajuan Pending</span>
              <span className="font-semibold text-amber-600">{requests.filter(r => r.status === 'pending').length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Pengajuan Disetujui</span>
              <span className="font-semibold text-emerald-600">{requests.filter(r => r.status === 'approved').length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Data Transparansi</span>
              <span className="font-semibold">{transparencyData.length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Program Aktif</span>
              <span className="font-semibold text-blue-600">{villagePrograms.filter(p => p.status === 'active').length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Pesan Belum Dibaca</span>
              <span className="font-semibold text-red-600">{messages.filter(m => !m.is_read).length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => {
              setActiveTab('users');
              setSubTab('pending');
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
          >
            <Clock className="w-8 h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold">Review Registrasi</h4>
            <p className="text-sm text-gray-600">Setujui akun masyarakat baru</p>
            {pendingUsers.length > 0 && (
              <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                {pendingUsers.length} pending
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('information')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
          >
            <Info className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold">Kelola Informasi</h4>
            <p className="text-sm text-gray-600">Berita, agenda, dan galeri</p>
            <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {articles.filter(a => a.status === 'published').length} artikel
            </span>
          </button>
          
          <button 
            onClick={() => setActiveTab('population')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
          >
            <Building2 className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold">Kelola Penduduk</h4>
            <p className="text-sm text-gray-600">Atur struktur dusun dan RT</p>
            <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
              {dusuns.length} dusun
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('services')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
          >
            <FileText className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold">Kelola Layanan</h4>
            <p className="text-sm text-gray-600">Atur layanan desa</p>
            <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
              {services.filter(s => s.status === 'active').length} aktif
            </span>
          </button>
        </div>
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

    const list = messageCategory === 'all' || !user
      ? messages
      : getByCategoryFor(user.id, messageCategory);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pesan Masyarakat</h2>
            <p className="text-sm text-gray-600 mt-1">
              {list.length} pesan {messageCategory === 'all' ? 'dari semua kategori' : `dari kategori ${messageCategory}`}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={messageCategory}
              onChange={(e) => setMessageCategory(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200">
            <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
              {list.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium">Tidak ada pesan</p>
                  <p className="text-sm mt-1">Belum ada pesan dari masyarakat untuk kategori ini</p>
                </div>
              ) : (
                list.map(m => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedMessage(m); markRead(m.id); setMessages(getReceivedFor(user!.id)); }}
                    className={`w-full text-left p-4 hover:bg-gray-50 ${selectedMessage?.id === m.id ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {!m.is_read && <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">{m.category}</span>
                        </div>
                        <p className="font-semibold text-gray-900 mt-1 line-clamp-1">{m.subject}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{m.content}</p>
                      </div>
                      <span className="text-xs text-gray-400 ml-2">{new Date(m.created_at).toLocaleString('id-ID')}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            {!selectedMessage ? (
              <div className="text-center text-gray-500">Pilih pesan untuk melihat detail</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                    <div className="flex items-center space-x-2 mt-1 text-sm">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">{selectedMessage.category}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 capitalize">{selectedMessage.status}</span>
                      <span className="text-gray-500">{new Date(selectedMessage.created_at).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-wrap">{selectedMessage.content}</div>

                {/* History */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Riwayat Status</h4>
                  <div className="space-y-1 text-sm">
                    {selectedMessage.history.map((h, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="text-gray-700 capitalize">{h.status}{h.note ? ` — ${h.note}` : ''}</div>
                        <div className="text-gray-400">{new Date(h.at).toLocaleString('id-ID')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Replies */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Percakapan</h4>
                  <div className="space-y-2">
                    {selectedMessage.replies.length === 0 ? (
                      <div className="text-gray-500 text-sm">Belum ada balasan</div>
                    ) : (
                      selectedMessage.replies.map(r => (
                        <div key={r.id} className="p-3 bg-gray-50 rounded text-sm">
                          <div className="text-gray-800 whitespace-pre-wrap">{r.content}</div>
                          <div className="text-xs text-gray-400 mt-1">{new Date(r.at).toLocaleString('id-ID')}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
                  <div className="lg:col-span-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Tulis balasan untuk warga..."
                    />
                  </div>
                  <div className="space-y-2">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as MessageStatus)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="dibaca">Tandai Dibaca</option>
                      <option value="diproses">Tandai Diproses</option>
                      <option value="selesai">Tandai Selesai</option>
                      <option value="ditutup">Tutup</option>
                    </select>
                    <button
                      onClick={() => {
                        if (!user || !selectedMessage) return;
                        if (replyText.trim()) {
                          addReply(selectedMessage.id, user.id, replyText.trim());
                          setReplyText('');
                        }
                        const updated = updateStatus(selectedMessage.id, newStatus);
                        if (updated) setSelectedMessage({ ...updated });
                        setMessages(getReceivedFor(user.id));
                      }}
                      className="w-full btn-primary py-2"
                    >
                      Kirim & Update Status
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderUsers = () => {
    const subTabs = [
      { id: 'pending', label: 'Registrasi Pending', count: pendingUsers.length },
      { id: 'dusun', label: 'Kepala Dusun', count: dusunHeads.length },
      { id: 'citizens', label: 'Masyarakat', count: citizens.filter(c => c.status === 'active').length }
    ];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Kelola Pengguna</h2>
          <button 
            onClick={() => setShowCreateDusunHead(true)}
            className="btn-primary px-4 py-2"
          >
            <UserPlus className="w-4 h-4" />
            Tambah Kepala Dusun
          </button>
        </div>

        {/* Sub tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSubTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                    subTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      subTab === tab.id
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {(subTab === 'pending' || subTab === '') && renderPendingUsers()}
            {subTab === 'dusun' && renderDusunHeads()}
            {subTab === 'citizens' && renderCitizens()}
          </div>
        </div>
      </div>
    );
  };

  const renderPendingUsers = () => (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Registrasi Pending Approval</h3>
          <p className="text-sm text-gray-500 mt-1">
            {pendingUsers.length} akun menunggu persetujuan
          </p>
        </div>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Tidak ada registrasi pending</p>
          <p className="text-sm text-gray-400 mt-1">Semua pendaftaran telah diproses</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingUsers.map((pendingUser) => (
            <div 
              key={pendingUser.id} 
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-yellow-300 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                {/* User Info - Minimal */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-yellow-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-gray-900 text-base truncate">
                        {pendingUser.full_name}
                      </h4>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex-shrink-0">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      <span>
                        {new Date(pendingUser.created_at).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setSelectedPendingUser(pendingUser);
                    setShowUserDetailModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm flex-shrink-0"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Cek Detail</span>
                  <span className="sm:hidden">Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDusunHeads = () => {
    const filteredHeads = dusunHeads.filter(head => 
      head.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      head.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (head.rt_number && head.rt_number.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Daftar Kepala Dusun</h3>
            <p className="text-sm text-gray-500 mt-1">
              {filteredHeads.length} dari {dusunHeads.length} kepala dusun
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, username, atau RT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
        
        {filteredHeads.length === 0 ? (
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">
              {searchTerm ? 'Tidak ditemukan kepala dusun' : 'Belum ada kepala dusun'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm ? 'Coba kata kunci lain' : 'Tambahkan kepala dusun baru'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHeads.map((head) => (
              <div 
                key={head.id} 
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Head Info - Minimal */}
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-gray-900 text-base truncate">
                          {head.full_name}
                        </h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex-shrink-0">
                          {head.rt_number || 'RT -'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>
                          Bergabung {new Date(head.created_at).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => {
                      setSelectedUser(head);
                      setShowUserManageModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm flex-shrink-0"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Detail</span>
                    <span className="sm:hidden">Detail</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCitizens = () => {
    const activeCitizens = citizens.filter(c => c.status === 'active');
    const filteredCitizens = activeCitizens.filter(citizen => 
      citizen.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (citizen.rt_number && citizen.rt_number.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Daftar Akun Masyarakat</h3>
            <p className="text-sm text-gray-500 mt-1">
              {filteredCitizens.length} dari {activeCitizens.length} akun aktif
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, username, atau RT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
        </div>
        
        {filteredCitizens.length === 0 ? (
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">
              {searchTerm ? 'Tidak ditemukan akun masyarakat' : 'Belum ada akun masyarakat aktif'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm ? 'Coba kata kunci lain' : 'Akun akan muncul setelah disetujui'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCitizens.map((citizen) => (
              <div 
                key={citizen.id} 
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Citizen Info - Minimal */}
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-gray-900 text-base truncate">
                          {citizen.full_name}
                        </h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 flex-shrink-0">
                          {citizen.rt_number || 'RT -'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>
                          Bergabung {new Date(citizen.created_at).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => {
                      setSelectedUser(citizen);
                      setShowUserManageModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-sm flex-shrink-0"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Detail</span>
                    <span className="sm:hidden">Detail</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sortCitizensForDisplay = (data: CitizenData[]) => data;

  const renderPopulation = () => {
    return (
      <Kelolapenduduk
        citizensData={citizensData}
        dusuns={dusuns.map((d) => ({
          id: d.id,
          name: d.name,
          head_name: d.head_name,
          head_phone: d.head_phone,
          rt_count: d.rt_count,
          population_count: d.population_count,
        }))}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterDusun={filterDusun}
        setFilterDusun={setFilterDusun}
        filterRT={filterRT}
        setFilterRT={setFilterRT}
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowGuideModal={setShowGuideModal}
        setShowImportModal={setShowImportModal}
        setShowExportModal={setShowExportModal}
        setShowAddDusun={setShowAddDusun}
        selectedDusun={selectedDusun}
        setSelectedDusun={setSelectedDusun}
        selectedRT={selectedRT}
        setSelectedRT={setSelectedRT}
        sortCitizensForDisplay={sortCitizensForDisplay}
        setSelectedCitizens={setSelectedCitizens}
        handleEditDusun={handleEditDusun as any}
        handleEditRT={handleEditRT as any}
      />
    );
  };

  const renderServices = () => {
    // Show ServiceEditor if in editor mode
    if (serviceEditorMode === 'editor' && servicesSubTab === 'administration') {
      return (
        <ServiceEditor
          service={selectedService}
          onSave={handleSaveService}
          onCancel={() => {
            setServiceEditorMode('list');
            setSelectedService(null);
          }}
        />
      );
    }

    // Show PPID editor if in editor mode
    if (ppidEditorMode === 'editor' && servicesSubTab === 'ppid') {
      return (
        <PPIDEditor
          ppid={selectedPPID}
          onSave={handleSavePPID}
          onCancel={() => {
            setPpidEditorMode('list');
            setSelectedPPID(null);
          }}
        />
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kelola Layanan</h2>
            <p className="text-sm text-gray-600 mt-1">Kelola layanan administrasi dan PPID</p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setServicesSubTab('administration')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                servicesSubTab === 'administration'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">Layanan Administrasi</span>
              <span className="sm:hidden">Administrasi</span>
            </button>
            
            <button
              onClick={() => setServicesSubTab('ppid')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                servicesSubTab === 'ppid'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="hidden sm:inline">Layanan PPID</span>
              <span className="sm:hidden">PPID</span>
            </button>
          </div>
        </div>

        {/* Content based on active subtab */}
        {servicesSubTab === 'administration' && (
          <Administrasi
            setSelectedService={setSelectedService}
            setServiceEditorMode={setServiceEditorMode}
            categories={categories}
            services={services}
            setServices={setServices}
            allRequests={allRequests}
            servicesLoading={servicesLoading}
            requestsLoading={requestsLoading}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
            apiFetch={apiFetch}
            setAllRequests={setAllRequests}
            citizensData={citizensData}
          />
        )}

        {servicesSubTab === 'ppid' && (
          <div className="space-y-6">
            {/* PPID Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Pejabat Pengelola Informasi dan Dokumentasi</h3>
                  <p className="text-emerald-50 mb-4">
                    Layanan informasi publik sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">{ppidServices.length} Dokumen</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Transparan & Akuntabel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{ppidServices.length}</div>
                <div className="text-sm text-gray-700">Total Dokumen</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{ppidServices.filter(p => p.status === 'published').length}</div>
                <div className="text-sm text-gray-700">Published</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{ppidServices.filter(p => p.category === 'Informasi Berkala').length}</div>
                <div className="text-sm text-gray-700">Info Berkala</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                <div className="text-2xl font-bold text-amber-600">{ppidServices.filter(p => p.category === 'Informasi Setiap Saat').length}</div>
                <div className="text-sm text-gray-700">Info Setiap Saat</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Kelola Informasi Publik</h3>
              <button 
                onClick={() => {
                  setSelectedPPID(null);
                  setPpidEditorMode('editor');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Informasi Publik</span>
              </button>
            </div>

            {/* Category Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Informasi Berkala</h4>
                    <p className="text-xs text-gray-600">{ppidServices.filter(p => p.category === 'Informasi Berkala').length} dokumen</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Informasi yang wajib disediakan dan diumumkan secara berkala minimal 6 bulan sekali
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Informasi Setiap Saat</h4>
                    <p className="text-xs text-gray-600">{ppidServices.filter(p => p.category === 'Informasi Setiap Saat').length} dokumen</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Informasi yang wajib tersedia setiap saat dan dapat diakses publik
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Informasi Serta Merta</h4>
                    <p className="text-xs text-gray-600">{ppidServices.filter(p => p.category === 'Informasi Serta Merta').length} dokumen</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum
                </p>
              </div>
            </div>

            {/* PPID Documents by Category */}
            <div className="space-y-6">
              {['Informasi Berkala', 'Informasi Setiap Saat', 'Informasi Serta Merta'].map((category) => {
                const docs = ppidServices.filter(p => p.category === category);
                if (docs.length === 0) return null;

                return (
                  <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                      {category}
                    </h4>
                    
                    <div className="space-y-3">
                      {docs.map((ppid) => (
                        <div key={ppid.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-sm transition-all">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-1">{ppid.title}</h5>
                              <p className="text-sm text-gray-600 mb-2">{ppid.description}</p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(ppid.published_date).toLocaleDateString('id-ID', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })}
                                </span>
                                <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(ppid.status)}`}>
                                  {getStatusLabel(ppid.status)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedPPID(ppid);
                                setPpidEditorMode('editor');
                              }}
                              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
                            >
                              <Edit3 className="w-4 h-4" />
                              <span className="text-sm font-medium">Edit</span>
                            </button>
                            {ppid.document_url && (
                              <button 
                                onClick={() => window.open(ppid.document_url, '_blank')}
                                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
                              >
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium">Unduh</span>
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus informasi publik ini?')) {
                                  setPpidServices(prev => prev.filter(p => p.id !== ppid.id));
                                }
                              }}
                              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Hapus</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Information Box */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-900 mb-2">Cara Mengakses Informasi Publik</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>1. <strong>Informasi Terbuka:</strong> Dapat diakses langsung melalui website ini</p>
                    <p>2. <strong>Permohonan Informasi:</strong> Untuk informasi khusus, ajukan permohonan ke PPID Desa</p>
                    <p>3. <strong>Waktu Layanan:</strong> Senin - Jumat, 08:00 - 15:00 WIB</p>
                    <p>4. <strong>Kontak PPID:</strong> Email: ppid@desafajarbaru.id | Telp: (021) 1234567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInformation = () => {
    // Show editor if in editor mode
    if (editorMode === 'article') {
      return (
        <ArticleEditor
          article={selectedArticle}
          onSave={handleSaveArticle}
          onCancel={() => {
            setEditorMode('list');
            setSelectedArticle(null);
          }}
        />
      );
    }

    if (editorMode === 'agenda') {
      return (
        <AgendaEditor
          agenda={selectedAgenda}
          onSave={handleSaveAgenda}
          onCancel={() => {
            setEditorMode('list');
            setSelectedAgenda(null);
          }}
        />
      );
    }

    if (editorMode === 'gallery') {
      return (
        <GalleryEditor
            item={selectedGallery}
            onSave={(item, file) => handleSaveGallery(item, file)}
            onCancel={() => setEditorMode("list")}
        />
      );
    }

    if (editorMode === 'transparency') {
      return (
        <TransparencyEditor
          data={selectedTransparency}
          onSave={handleSaveTransparency}
          onCancel={() => {
            setEditorMode('list');
            setSelectedTransparency(null);
          }}
        />
      );
    }

    // Default list view
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kelola Informasi</h2>
            <p className="text-sm text-gray-600 mt-1">Kelola berita, agenda, dan galeri desa</p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setInformationSubTab('articles')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                informationSubTab === 'articles'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Newspaper className="w-5 h-5" />
              <span className="hidden sm:inline">Berita & Artikel</span>
              <span className="sm:hidden">Berita</span>
            </button>
            
            <button
              onClick={() => setInformationSubTab('agenda')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                informationSubTab === 'agenda'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <CalendarDays className="w-5 h-5" />
              <span className="hidden sm:inline">Agenda Kegiatan</span>
              <span className="sm:hidden">Agenda</span>
            </button>
            
            <button
              onClick={() => setInformationSubTab('gallery')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                informationSubTab === 'gallery'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Image className="w-5 h-5" />
              <span className="hidden sm:inline">Galeri Desa</span>
              <span className="sm:hidden">Galeri</span>
            </button>
          </div>
        </div>

        {/* Content based on active subtab */}
        {informationSubTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Berita & Artikel</h3>
              <button 
                onClick={() => {
                  setSelectedArticle(null);
                  setEditorMode('article');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Artikel</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{articles.length}</div>
                <div className="text-sm text-gray-700">Total Artikel</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{articles.filter(a => a.status === 'published').length}</div>
                <div className="text-sm text-gray-700">Published</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{articles.filter(a => a.status === 'draft').length}</div>
                <div className="text-sm text-gray-700">Draft</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{articles.filter(a => a.featured).length}</div>
                <div className="text-sm text-gray-700">Featured</div>
              </div>
            </div>

            {/* Articles List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <div className="text-center py-12">
                    <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Belum ada artikel</p>
                    <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Artikel" untuk membuat artikel baru</p>
                  </div>
                ) : (
                  articles.map((article) => (
                    <div key={article.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-emerald-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900 text-lg">{article.title}</h4>
                            {article.featured && (
                              <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(article.status)}`}>
                              {getStatusLabel(article.status)}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                              {article.category}
                            </span>
                            <span className="text-gray-500">{article.views || 0} views</span>
                            <span className="text-gray-500">{article.created_at ? new Date(article.created_at).toLocaleDateString('id-ID') : '-'}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => window.open(`/berita/${article.slug}`, '_blank')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                            title="Preview"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedArticle(article);
                              setEditorMode('article');
                            }}
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteArticle(article.id!)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {informationSubTab === 'agenda' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Agenda Kegiatan</h3>
              <button 
                onClick={() => {
                  setSelectedAgenda(null);
                  setEditorMode('agenda');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Agenda</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{agendaItems.length}</div>
                <div className="text-sm text-gray-700">Total Agenda</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{agendaItems.filter(a => a.status === 'scheduled').length}</div>
                <div className="text-sm text-gray-700">Terjadwal</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-600">{agendaItems.filter(a => a.status === 'completed').length}</div>
                <div className="text-sm text-gray-700">Selesai</div>
              </div>
            </div>

            {/* Agenda List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                {agendaLoading ? (
                  // Loading Skeleton
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4 animate-pulse">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                              <div className="flex gap-3">
                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : agendaItems.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Belum ada agenda</p>
                    <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Agenda" untuk membuat agenda baru</p>
                  </div>
                ) : (
                  agendaItems.map((agenda) => (
                    <div key={agenda.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-blue-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                              <div className="text-xs text-blue-600 font-semibold">
                                {new Date(agenda.date).toLocaleDateString('id-ID', { day: 'numeric' })}
                              </div>
                              <div className="text-[10px] text-blue-500">
                                {new Date(agenda.date).toLocaleDateString('id-ID', { month: 'short' })}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg mb-1">{agenda.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{agenda.description}</p>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{agenda.time} WIB</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{agenda.location}</span>
                                </span>
                                <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(agenda.status)}`}>
                                  {agenda.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedAgenda(agenda);
                              setEditorMode('agenda');
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
                                try {
                                  const token = localStorage.getItem('auth_token');
                                  const response = await apiFetch(`/agenda/${agenda.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                      'Authorization': `Bearer ${token}`,
                                    },
                                  });

                                  if (response.ok) {
                                    setAgendaItems(prev => prev.filter(a => a.id !== agenda.id));
                                    alert('Agenda berhasil dihapus!');
                                  } else {
                                    alert('Gagal menghapus agenda. Silakan coba lagi.');
                                  }
                                } catch (error) {
                                  console.error('Error deleting agenda:', error);
                                  alert('Terjadi kesalahan saat menghapus agenda.');
                                }
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

{informationSubTab === 'gallery' && (
  <div className="space-y-6">

    {/* Header */}
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-900">Galeri Desa</h3>
      <button
        onClick={() => {
          setSelectedGallery(null);
          setEditorMode('gallery');
        }}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <Upload className="w-4 h-4" />
        <span>Upload Foto</span>
      </button>
    </div>

    {/* Statistik */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
        <div className="text-2xl font-bold text-emerald-600">
          {galleryItems?.length || 0}
        </div>
        <div className="text-sm text-gray-700">Total Foto</div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
        <div className="text-2xl font-bold text-emerald-600">
          {galleryItems?.filter(g => g?.status === 'published').length || 0}
        </div>
        <div className="text-sm text-gray-700">Published</div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">
          {galleryItems?.filter(g => g?.category === 'kegiatan').length || 0}
        </div>
        <div className="text-sm text-gray-700">Kegiatan</div>
      </div>
    </div>

    {/* Gallery List */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {galleryLoading ? (
        // Loading Skeleton
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                  <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                  <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !galleryItems || galleryItems.length === 0 ? (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Belum ada foto</p>
          <p className="text-gray-400 text-sm mt-2">
            Klik tombol "Upload Foto" untuk menambah foto baru
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {galleryItems
            .filter(item => item)
            .map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-emerald-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex gap-4 flex-1">

                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-32 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={() => window.open(item.image_url, '_blank')}
                      />
                    </div>

                    {/* Informasi */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                          {item.category}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full font-medium ${
                            item.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.status === 'published' ? 'Published' : 'Draft'}
                        </span>

                        <span className="text-gray-500">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString('id-ID')
                            : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2 md:flex-shrink-0">
                          <button 
                            onClick={() => window.open(item.image_url, '_blank')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                            title="Lihat Penuh"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedGallery(item);
                              setEditorMode('gallery');
                            }}
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                                try {
                                  const token = localStorage.getItem('auth_token');
                                  const response = await apiFetch(`/gallery/${item.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                      'Authorization': `Bearer ${token}`,
                                    },
                                  });

                                  if (response.ok) {
                                    setGalleryItems(prev => prev.filter(g => g.id !== item.id));
                                    alert('Foto berhasil dihapus!');
                                  } else {
                                    alert('Gagal menghapus foto. Silakan coba lagi.');
                                  }
                                } catch (error) {
                                  console.error('Error deleting gallery:', error);
                                  alert('Terjadi kesalahan saat menghapus foto.');
                                }
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTransparency = () => {
    const transparencyCategories = [
      { id: 'apbd', label: 'APBDes', icon: DollarSign, color: 'emerald', bgColor: 'from-emerald-500 to-emerald-600' },
      { id: 'bansos', label: 'Bantuan Sosial', icon: Heart, color: 'red', bgColor: 'from-red-500 to-red-600' },
      { id: 'pembangunan', label: 'Pembangunan', icon: Construction, color: 'blue', bgColor: 'from-blue-500 to-blue-600' },
      { id: 'idm', label: 'IDM', icon: TrendingUp, color: 'purple', bgColor: 'from-emerald-500 to-emerald-600' },
      { id: 'statistik', label: 'Statistik', icon: BarChart3, color: 'yellow', bgColor: 'from-yellow-500 to-yellow-600' }
    ];

    const currentCategory = transparencyCategories.find(c => c.id === transparencySubTab) || transparencyCategories[0];
    const currentData = transparencyData.filter(t => t.type === transparencySubTab);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kelola Transparansi</h2>
            <p className="text-sm text-gray-600 mt-1">Kelola data transparansi dan dokumen publik desa</p>
          </div>
          <button 
            onClick={() => {
              setSelectedTransparency(null);
              setEditorMode('transparency');
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data Transparansi</span>
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            {transparencyCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setTransparencySubTab(category.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  transparencySubTab === category.id
                    ? `bg-gradient-to-r ${category.bgColor} text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden text-xs">{category.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`bg-gradient-to-br from-${currentCategory.color}-50 to-${currentCategory.color}-100 rounded-xl p-4 border border-${currentCategory.color}-200`}>
            <div className={`text-2xl font-bold text-${currentCategory.color}-600`}>{currentData.length}</div>
            <div className="text-sm text-gray-700">Total Data</div>
          </div>
          <div className={`bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200`}>
            <div className="text-2xl font-bold text-emerald-600">{currentData.filter(d => d.status === 'published').length}</div>
            <div className="text-sm text-gray-700">Published</div>
          </div>
          <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200`}>
            <div className="text-2xl font-bold text-blue-600">{currentData.filter(d => d.year === 2024).length}</div>
            <div className="text-sm text-gray-700">Tahun 2024</div>
          </div>
          <div className={`bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200`}>
            <div className="text-2xl font-bold text-emerald-600">
              {currentData.filter(d => d.amount).length > 0 ? 'Rp ' + Math.floor(currentData.filter(d => d.amount).reduce((sum, d) => sum + (d.amount || 0), 0) / 1000000) + 'M' : '-'}
            </div>
            <div className="text-sm text-gray-700">Total Anggaran</div>
          </div>
        </div>

        {/* Data List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <currentCategory.icon className="w-6 h-6 mr-2 text-emerald-600" />
              Data {currentCategory.label}
            </h3>
          </div>

          {currentData.length === 0 ? (
            <div className="text-center py-12">
              <currentCategory.icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada data {currentCategory.label.toLowerCase()}</p>
              <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Data Transparansi" untuk menambah data</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentData.map((data) => (
                <div key={data.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-emerald-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-lg pr-4">{data.title}</h4>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          data.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {data.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{data.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="flex items-center space-x-1 text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>Tahun {data.year}</span>
                          {data.quarter && <span>• Triwulan {data.quarter}</span>}
                        </span>
                        {data.amount && (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                            💰 Rp {data.amount.toLocaleString('id-ID')}
                          </span>
                        )}
                        {data.file_url && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>Dokumen tersedia</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 md:flex-shrink-0">
                      {data.file_url && (
                        <button 
                          onClick={() => window.open(data.file_url, '_blank')}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                          title="Lihat Dokumen"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          setSelectedTransparency(data);
                          setEditorMode('transparency');
                        }}
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                        title="Edit"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                            setTransparencyData(prev => prev.filter(t => t.id !== data.id));
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                        title="Hapus"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      {data.file_url && (
                        <button 
                          onClick={() => {
                            if (data.file_url) {
                              const link = document.createElement('a');
                              link.href = data.file_url;
                              link.download = data.file_url.split('/').pop() || 'document';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                          title="Download"
                        >
                          <Download className="w-5 h-5" />
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
    );
  };

  const renderPrograms = () => {
    const programCategories = [
      { id: 'ekonomi', label: 'BUMDes & Ekonomi', icon: ShoppingCart, color: 'emerald', bgColor: 'from-emerald-500 to-emerald-600' },
      { id: 'kesehatan', label: 'Kesehatan & Sosial', icon: Stethoscope, color: 'red', bgColor: 'from-red-500 to-red-600' },
      { id: 'pendidikan', label: 'Pendidikan & Budaya', icon: GraduationCap, color: 'blue', bgColor: 'from-blue-500 to-blue-600' }
    ];

    const currentCategory = programCategories.find(c => c.id === programSubTab) || programCategories[0];
    const currentPrograms = villagePrograms.filter(p => p.type === programSubTab);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kelola Program</h2>
            <p className="text-sm text-gray-600 mt-1">Kelola program pemberdayaan dan layanan masyarakat desa</p>
          </div>
          <button 
            onClick={() => alert('Fitur tambah program akan segera diimplementasikan')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Program</span>
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            {programCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setProgramSubTab(category.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  programSubTab === category.id
                    ? `bg-gradient-to-r ${category.bgColor} text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{currentPrograms.length}</div>
            <div className="text-sm text-gray-700">Total Program</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">{currentPrograms.filter(p => p.status === 'active').length}</div>
            <div className="text-sm text-gray-700">Program Aktif</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">{currentPrograms.reduce((sum, p) => sum + (p.beneficiaries || 0), 0).toLocaleString('id-ID')}</div>
            <div className="text-sm text-gray-700">Penerima Manfaat</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
            <div className="text-2xl font-bold text-amber-600">
              {currentPrograms.filter(p => p.budget).length > 0 ? 'Rp ' + Math.floor(currentPrograms.reduce((sum, p) => sum + (p.budget || 0), 0) / 1000000) + 'M' : '-'}
            </div>
            <div className="text-sm text-gray-700">Total Anggaran</div>
          </div>
        </div>

        {/* Program List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <currentCategory.icon className="w-6 h-6 mr-2 text-blue-600" />
              Program {currentCategory.label}
            </h3>
          </div>

          {currentPrograms.length === 0 ? (
            <div className="text-center py-12">
              <currentCategory.icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada program {currentCategory.label.toLowerCase()}</p>
              <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Program" untuk menambah program baru</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentPrograms.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-blue-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-lg pr-4">{program.name}</h4>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          program.status === 'active' ? 'bg-emerald-100 text-emerald-800' : program.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {program.status === 'active' ? 'Aktif' : program.status === 'completed' ? 'Selesai' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        {program.beneficiaries && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{program.beneficiaries.toLocaleString('id-ID')} Penerima</span>
                          </span>
                        )}
                        {program.budget && (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                            \ud83d\udcb0 Rp {program.budget.toLocaleString('id-ID')}
                          </span>
                        )}
                        {program.start_date && (
                          <span className="flex items-center space-x-1 text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>Mulai: {new Date(program.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </span>
                        )}
                        {program.end_date && (
                          <span className="flex items-center space-x-1 text-gray-500">
                            <span>\u2022</span>
                            <span>Selesai: {new Date(program.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 md:flex-shrink-0">
                      <button 
                        onClick={() => alert('Fitur lihat detail akan segera diimplementasikan')}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Lihat Detail"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => alert('Fitur edit akan segera diimplementasikan')}
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                        title="Edit"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Apakah Anda yakin ingin menghapus program ini?')) {
                            setVillagePrograms(prev => prev.filter(p => p.id !== program.id));
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                        title="Hapus"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWebsite = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Website</h2>
        <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
          🛠️ Khusus Developer
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Pengaturan Umum
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Nama Website</span>
              <span className="font-medium">Desa Fajar Baru</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Domain</span>
              <span className="font-medium">desa-fajar-baru.id</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Theme</span>
              <span className="font-medium">Modern Village</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Online</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-600" />
            Fitur Website
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mode Maintenance</span>
              <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Komentar Artikel</span>
              <button className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Registrasi Publik</span>
              <button className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Music Player</span>
              <button className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Kelola Konten Halaman</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Hero Section</h4>
            <p className="text-sm text-gray-600 mb-3">Banner utama dan pesan sambutan</p>
            <button className="w-full btn-primary py-2 text-sm">Edit Hero</button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Galeri Foto</h4>
            <p className="text-sm text-gray-600 mb-3">Koleksi foto kegiatan desa</p>
            <button className="w-full btn-primary py-2 text-sm">Kelola Galeri</button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Footer</h4>
            <p className="text-sm text-gray-600 mb-3">Informasi kontak dan link penting</p>
            <button className="w-full btn-primary py-2 text-sm">Edit Footer</button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Menu Navigasi</h4>
            <p className="text-sm text-gray-600 mb-3">Struktur menu website</p>
            <button className="w-full btn-primary py-2 text-sm">Kelola Menu</button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">SEO Settings</h4>
            <p className="text-sm text-gray-600 mb-3">Meta tags dan optimasi mesin pencari</p>
            <button className="w-full btn-primary py-2 text-sm">Edit SEO</button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Backup & Restore</h4>
            <p className="text-sm text-gray-600 mb-3">Kelola backup data website</p>
            <button className="w-full btn-primary py-2 text-sm">Backup</button>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Bell className="w-6 h-6 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Catatan Developer</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Fitur ini khusus untuk developer website</li>
              <li>• Backup otomatis dilakukan setiap hari pukul 02:00 WIB</li>
              <li>• Untuk perubahan major, hubungi developer</li>
              <li>• Update keamanan dijalankan otomatis</li>
              <li>• Monitoring performa 24/7 aktif</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );





  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'population':
        return renderPopulation();
      case 'services':
        return renderServices();
      case 'information':
        return renderInformation();
      case 'transparency':
        return renderTransparency();
      case 'programs':
        return renderPrograms();
      case 'messages':
        return renderMessages();
      case 'website':
        return renderWebsite();
      default:
        return renderDashboard();
    }
  };

  // Modal Detail Pendaftar
  const renderUserDetailModal = () => {
    if (!showUserDetailModal || !selectedPendingUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-blue-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">Detail Pendaftaran</h2>
                  <p className="text-emerald-100 text-sm mt-1">Verifikasi data pendaftar sebelum menyetujui</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowUserDetailModal(false);
                  setSelectedPendingUser(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Foto KTP */}
            {selectedPendingUser.ktp_image_url && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                    Foto KTP
                  </h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                    Uploaded
                  </span>
                </div>
                
                {/* Frame KTP dengan efek realistic */}
                <div className="relative">
                  {/* Shadow effect untuk membuat terlihat seperti foto yang di-scan */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl blur opacity-25"></div>
                  
                  {/* Container foto KTP */}
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                    {/* Overlay grid subtle untuk efek scan */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
                    
                    {/* Gambar KTP */}
                    <img
                      src={selectedPendingUser.ktp_image_url}
                      alt="Foto KTP"
                      className="w-full h-auto object-cover max-h-[400px] sm:max-h-[500px]"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/800x500/f3f4f6/6b7280?text=Foto+KTP+Tidak+Tersedia';
                      }}
                    />
                    
                    {/* Watermark / Label */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Verified Upload
                    </div>
                  </div>
                </div>
                
                {/* Info & Tips */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <span className="font-semibold">Pastikan foto KTP jelas dan dapat dibaca.</span> Periksa apakah semua data terlihat dengan jelas sebelum menyetujui.
                    </p>
                  </div>
                  
                  {/* File info simulation */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5" />
                      <span>JPG/PNG</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Uploaded {new Date(selectedPendingUser.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="text-emerald-600 font-medium">✓ Valid</span>
                  </div>
                </div>
              </div>
            )}

            {/* Data Pribadi */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Data Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">NIK</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.nik || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Lengkap</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.full_name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tempat Lahir</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.birth_place || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal Lahir</label>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {selectedPendingUser.birth_date 
                      ? new Date(selectedPendingUser.birth_date).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })
                      : '-'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Jenis Kelamin</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.gender || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Golongan Darah</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.blood_type || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Agama</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.religion || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status Perkawinan</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.marital_status || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pekerjaan</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.occupation || '-'}</p>
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                Alamat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alamat Lengkap</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.address || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">RT</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.rt_number || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">RW</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.rw_number || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dusun</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.dusun || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Desa/Kelurahan</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.village || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kecamatan</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.district || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kabupaten/Kota</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.regency || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Provinsi</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.province || '-'}</p>
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Informasi Kontak
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Username</label>
                  <p className="text-base font-medium text-gray-900 mt-1">@{selectedPendingUser.username}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.email || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nomor Telepon</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedPendingUser.phone || '-'}</p>
                </div>
              </div>
            </div>

            {/* Informasi Pendaftaran */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center text-sm text-blue-800">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>
                  Mendaftar pada {new Date(selectedPendingUser.created_at).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Footer - Action Buttons */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t-2 border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => {
                  setShowUserDetailModal(false);
                  setSelectedPendingUser(null);
                }}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleRejectUser(selectedPendingUser.id);
                  setShowUserDetailModal(false);
                  setSelectedPendingUser(null);
                }}
                className="px-6 py-3 bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Tolak Pendaftaran
              </button>
              <button
                onClick={() => {
                  handleApproveUser(selectedPendingUser.id);
                  setShowUserDetailModal(false);
                  setSelectedPendingUser(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Setujui Pendaftaran
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal User Management (Detail User Aktif)
  const renderUserManageModal = () => {
    if (!showUserManageModal || !selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedUser.role === 'dusun_head' ? (
                  <Shield className="w-8 h-8" />
                ) : (
                  <User className="w-8 h-8" />
                )}
                <div>
                  <h2 className="text-2xl font-bold">Detail Pengguna</h2>
                  <p className="text-blue-100 text-sm">
                    {selectedUser.role === 'dusun_head' ? 'Kepala Dusun' : 'Masyarakat'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowUserManageModal(false);
                  setSelectedUser(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Informasi Akun */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                Informasi Akun
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Username</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.username}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.email || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status Akun</label>
                  <p className="mt-1">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      selectedUser.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedUser.status === 'active' ? 'Aktif' : selectedUser.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</label>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {selectedUser.role === 'dusun_head' ? 'Kepala Dusun' : 'Masyarakat'}
                  </p>
                </div>
              </div>
            </div>

            {/* Data Pribadi */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Data Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">NIK</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.nik || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Lengkap</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.full_name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">No. Telepon</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.phone || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Jenis Kelamin</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.gender || '-'}</p>
                </div>
                {selectedUser.birth_date && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal Lahir</label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(selectedUser.birth_date).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                )}
                {selectedUser.occupation && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pekerjaan</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.occupation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Alamat */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                Alamat & Wilayah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alamat Lengkap</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.address || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">RT</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.rt_number || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">RW</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.rw_number || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dusun</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.dusun || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Desa/Kelurahan</label>
                  <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.village || 'Fajar Baru'}</p>
                </div>
              </div>
            </div>

            {/* Informasi Akun */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Bergabung: {new Date(selectedUser.created_at).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                {selectedUser.last_login_at && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Login terakhir: {new Date(selectedUser.last_login_at).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setShowUserManageModal(false);
                setSelectedUser(null);
              }}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                setEditUserForm({
                  full_name: selectedUser.full_name,
                  email: selectedUser.email || '',
                  phone: selectedUser.phone || '',
                  address: selectedUser.address || '',
                  rt_number: selectedUser.rt_number || '',
                  rw_number: selectedUser.rw_number || '',
                  dusun: selectedUser.dusun || ''
                });
                setShowEditUserModal(true);
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Edit3 className="w-5 h-5" />
              Edit Data
            </button>
            <button
              onClick={() => {
                setShowDeleteUserModal(true);
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal Edit User
  const renderEditUserModal = () => {
    if (!showEditUserModal || !selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Edit3 className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Edit Data Pengguna</h2>
                  <p className="text-blue-100 text-sm">{selectedUser.full_name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
              <input
                type="text"
                value={editUserForm.full_name}
                onChange={(e) => setEditUserForm(prev => ({ ...prev, full_name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama lengkap"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editUserForm.email}
                  onChange={(e) => setEditUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                <input
                  type="tel"
                  value={editUserForm.phone}
                  onChange={(e) => setEditUserForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="08123456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
              <textarea
                value={editUserForm.address}
                onChange={(e) => setEditUserForm(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Alamat lengkap"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">RT</label>
                <input
                  type="text"
                  value={editUserForm.rt_number}
                  onChange={(e) => setEditUserForm(prev => ({ ...prev, rt_number: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="RT 01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">RW</label>
                <input
                  type="text"
                  value={editUserForm.rw_number}
                  onChange={(e) => setEditUserForm(prev => ({ ...prev, rw_number: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="RW 02"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dusun</label>
                <input
                  type="text"
                  value={editUserForm.dusun}
                  onChange={(e) => setEditUserForm(prev => ({ ...prev, dusun: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nama Dusun"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Catatan:</p>
                  <p>Data seperti NIK, tanggal lahir, dan jenis kelamin tidak dapat diubah untuk menjaga integritas data.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
            <button
              onClick={() => setShowEditUserModal(false)}
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleUpdateUser}
              disabled={submitting || !editUserForm.full_name}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal Delete User dengan Verifikasi NIK
  const renderDeleteUserModal = () => {
    if (!showDeleteUserModal || !selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Konfirmasi Hapus Akun</h2>
                <p className="text-red-100 text-sm">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <p className="font-semibold mb-2">Peringatan!</p>
                  <p className="mb-2">Anda akan menghapus akun:</p>
                  <div className="bg-white rounded p-2 mt-2">
                    <p className="font-bold text-gray-900">{selectedUser.full_name}</p>
                    <p className="text-xs text-gray-600">NIK: {selectedUser.nik || '-'}</p>
                    <p className="text-xs text-gray-600">Username: {selectedUser.username}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Untuk melanjutkan, masukkan NIK dari akun ini:
              </label>
              <input
                type="text"
                value={deleteVerificationNIK}
                onChange={(e) => setDeleteVerificationNIK(e.target.value)}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Masukkan NIK untuk verifikasi"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                Ketik NIK: <span className="font-mono font-bold">{selectedUser.nik || '(Tidak ada NIK)'}</span>
              </p>
            </div>

            {selectedUser.nik && deleteVerificationNIK && deleteVerificationNIK !== selectedUser.nik && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  NIK tidak sesuai
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
            <button
              onClick={() => {
                setShowDeleteUserModal(false);
                setDeleteVerificationNIK('');
              }}
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteUser}
              disabled={submitting || !selectedUser.nik || deleteVerificationNIK !== selectedUser.nik}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Hapus Akun
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle notification click
  const handleNotificationClick = (notification: any) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, unread: false } : n)
    );

    // Navigate to related content
    if (notification.action) {
      setActiveTab(notification.action.tab);
      if (notification.action.subTab) {
        setSubTab(notification.action.subTab);
      }
    }
  };

  // Render Profile Modal
  const renderProfileModal = () => {
    if (!showProfileModal || !user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Profil Saya</h2>
                  <p className="text-emerald-100">Informasi akun operator</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user.full_name}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user.username}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user.email || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user.phone || '-'}</div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <div className="px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium capitalize">
                  {user.role === 'operator' ? 'Operator Desa' : user.role}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-3 bg-green-50 text-green-700 rounded-lg font-medium flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Aktif</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Aktivitas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{requests.length}</div>
                  <div className="text-sm text-gray-700">Total Permohonan</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">{messages.length}</div>
                  <div className="text-sm text-gray-700">Total Pesan</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">{citizens.length}</div>
                  <div className="text-sm text-gray-700">Warga Terdaftar</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">{articles.length}</div>
                  <div className="text-sm text-gray-700">Artikel Published</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Settings Modal
  const renderSettingsModal = () => {
    if (!showSettingsModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Pengaturan</h2>
                  <p className="text-blue-100">Kelola preferensi dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Account Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pengaturan Akun</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Ganti Password</p>
                    <p className="text-sm text-gray-600">Update password akun Anda</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Ubah
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Update Email</p>
                    <p className="text-sm text-gray-600">Perbarui alamat email Anda</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Ubah
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Notifikasi Pesan Baru</p>
                      <p className="text-sm text-gray-600">Terima notifikasi untuk pesan baru</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Notifikasi Registrasi User</p>
                      <p className="text-sm text-gray-600">Terima notifikasi registrasi pending</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Notifikasi Permohonan</p>
                      <p className="text-sm text-gray-600">Terima notifikasi permohonan baru</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tampilan</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Mode Gelap</p>
                    <p className="text-sm text-gray-600">Aktifkan tema gelap</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Ukuran Teks</p>
                    <p className="text-sm text-gray-600">Sesuaikan ukuran teks interface</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Normal</option>
                    <option>Besar</option>
                    <option>Sangat Besar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">Versi Aplikasi</p>
                  <p className="font-semibold text-gray-900">v1.0.0</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">Terakhir Update</p>
                  <p className="font-semibold text-gray-900">Nov 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Tutup
            </button>
            <button
              onClick={() => alert('Pengaturan berhasil disimpan!')}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Show loading while checking auth
  if (loading) {
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
  if (!user || user.role !== 'operator') {
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

  console.log('✅ OperatorDashboard - Access granted for user:', user.role);

  return (
    <>
      <DashboardLayout
        menuItems={menuItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Dashboard Operator Desa"
        userInfo={{
          name: user.full_name,
          role: 'Operator Desa',
          email: user.email,
          phone: user.phone,
          address: user.address
        }}
        onLogout={logout}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onProfileClick={() => setShowProfileModal(true)}
        onSettingsClick={() => setShowSettingsModal(true)}
      >
        {renderContent()}
      </DashboardLayout>
      
      {/* Profile Modal */}
      {renderProfileModal()}
      
      {/* Settings Modal */}
      {renderSettingsModal()}

      {/* User Detail Modal (Pending) */}
      {renderUserDetailModal()}

      {/* User Management Modal (Active Users) */}
      {renderUserManageModal()}

      {/* Edit User Modal */}
      {renderEditUserModal()}

      {/* Delete User Confirmation Modal */}
      {renderDeleteUserModal()}

      {/* Service Detail Modal */}


      {/* Request Detail Modal */}


      {/* Create Dusun Head Modal */}
      {showCreateDusunHead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Tambah Kepala Dusun</h3>
                <button
                  onClick={() => setShowCreateDusunHead(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <form onSubmit={handleCreateDusunHead} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  value={newDusunHeadForm.username}
                  onChange={(e) => setNewDusunHeadForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={newDusunHeadForm.password}
                  onChange={(e) => setNewDusunHeadForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={newDusunHeadForm.full_name}
                  onChange={(e) => setNewDusunHeadForm(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RT/Dusun *
                </label>
                <input
                  type="text"
                  value={newDusunHeadForm.rt_number}
                  onChange={(e) => setNewDusunHeadForm(prev => ({ ...prev, rt_number: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contoh: Dusun Mawar"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newDusunHeadForm.email}
                  onChange={(e) => setNewDusunHeadForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. HP
                </label>
                <input
                  type="tel"
                  value={newDusunHeadForm.phone}
                  onChange={(e) => setNewDusunHeadForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary py-3 disabled:opacity-50"
                >
                  {submitting ? 'Membuat...' : 'Buat Akun'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateDusunHead(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Dusun Modal */}
      {showAddDusun && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tambah Dusun Baru</h3>
                  <p className="text-sm text-gray-600 mt-1">Buat dusun dan akun kepala dusun sekaligus</p>
                </div>
                <button
                  onClick={() => setShowAddDusun(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateDusun} className="p-6 space-y-6">
              {/* Informasi Dusun Section */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Informasi Dusun
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Dusun *
                    </label>
                    <input
                      type="text"
                      value={newDusunForm.dusun_name}
                      onChange={(e) => setNewDusunForm(prev => ({ ...prev, dusun_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Dusun Mawar"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kode Dusun *
                    </label>
                    <input
                      type="text"
                      value={newDusunForm.dusun_code}
                      onChange={(e) => setNewDusunForm(prev => ({ ...prev, dusun_code: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: DSN-01 atau Dusun 1"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Kode unik untuk identifikasi dusun</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      value={newDusunForm.description}
                      onChange={(e) => setNewDusunForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                      placeholder="Keterangan singkat tentang dusun..."
                    />
                  </div>
                </div>
              </div>

              {/* Akun Kepala Dusun Section */}
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Akun Kepala Dusun
                </h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username *
                      </label>
                      <input
                        type="text"
                        value={newDusunForm.head_username}
                        onChange={(e) => setNewDusunForm(prev => ({ ...prev, head_username: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="username_kepala_dusun"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Untuk login ke dashboard</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="text"
                        value={newDusunForm.head_password}
                        onChange={(e) => setNewDusunForm(prev => ({ ...prev, head_password: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Minimal 6 karakter"
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">Password untuk login</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap Kepala Dusun *
                    </label>
                    <input
                      type="text"
                      value={newDusunForm.head_full_name}
                      onChange={(e) => setNewDusunForm(prev => ({ ...prev, head_full_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nama lengkap kepala dusun"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newDusunForm.head_email}
                        onChange={(e) => setNewDusunForm(prev => ({ ...prev, head_email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        No. HP
                      </label>
                      <input
                        type="tel"
                        value={newDusunForm.head_phone}
                        onChange={(e) => setNewDusunForm(prev => ({ ...prev, head_phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Bell className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Informasi Penting:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Akun kepala dusun akan dibuat otomatis dengan role "dusun_head"</li>
                      <li>Kepala dusun dapat login menggunakan username dan password yang dibuat</li>
                      <li>Simpan kredensial login dengan aman untuk diberikan ke kepala dusun</li>
                      <li>Kepala dusun akan memiliki akses ke dashboard khusus untuk mengelola data dusunnya</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Membuat Dusun...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Save className="w-5 h-5 mr-2" />
                      Buat Dusun & Akun Kepala Dusun
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDusun(false)}
                  disabled={submitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[98vw] xl:max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Import Data Penduduk</h3>
                  <p className="text-sm text-gray-600 mt-1">Upload file Excel untuk menambahkan data penduduk</p>
                </div>
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportFile(null);
                    setImportPreview([]);
                    setImportTargetDusun('');
                    setImportDusunDropdownOpen(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Download Template */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileSpreadsheet className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-1">Template Excel</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Download template Excel terlebih dahulu untuk memastikan format data sesuai.
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Template</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pilih File Excel (XLS/XLSX)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="import-file"
                  />
                  <label htmlFor="import-file" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium mb-1">
                      {importFile ? importFile.name : 'Klik untuk memilih file'}
                    </p>
                    <p className="text-sm text-gray-500">
                      atau drag & drop file Excel di sini
                    </p>
                  </label>
                </div>
                
                {/* File Info */}
                {importFile && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">{importFile.name}</p>
                          <p className="text-xs text-blue-700">
                            {(importFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setImportFile(null);
                          setImportPreview([]);
                          setImportTargetDusun('');
                          // Reset file input
                          const fileInput = document.getElementById('import-file') as HTMLInputElement;
                          if (fileInput) fileInput.value = '';
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Data */}
              {importPreview.length > 0 && (
                <>
                <div>
                  {/* Summary Statistics */}
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">📊 Ringkasan Data Import</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">Total Baris</div>
                        <div className="text-2xl font-bold text-gray-900">{importPreview.length}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex items-center space-x-1 mb-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <div className="text-xs text-green-700 font-medium">Data Valid</div>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {importValidCount}
                        </div>
                        <div className="text-xs text-green-600 mt-1">Siap diimport</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-red-200">
                        <div className="flex items-center space-x-1 mb-1">
                          <XCircle className="w-3 h-3 text-red-600" />
                          <div className="text-xs text-red-700 font-medium">Data Tidak Lengkap</div>
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          {importInvalidCount}
                        </div>
                        <div className="text-xs text-red-600 mt-1">Ditandai merah</div>
                      </div>
                    </div>
                    {importInvalidCount > 0 && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs text-yellow-800">
                            <strong>Perhatian:</strong> {importInvalidCount} baris data tidak lengkap (NIK atau Nama kosong). 
                            Baris yang tidak valid ditandai dengan ❌ dan background merah di tabel preview, namun tetap akan diimport.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setImportDusunDropdownOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                      >
                        <div>
                          <div className="text-sm font-semibold text-gray-800">Dusun Tujuan Import</div>
                          <div className="text-xs text-gray-600 mt-0.5">
                            {importTargetDusun ? `Terpilih: ${importTargetDusun}` : 'Klik untuk memilih dusun tujuan'}
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">{importDusunDropdownOpen ? '▲' : '▼'}</span>
                      </button>
                      {importDusunDropdownOpen && (
                        <div className="px-4 pb-4">
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Pilih Dusun</label>
                          <select
                            value={importTargetDusun}
                            onChange={(e) => setImportTargetDusun(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                          >
                            <option value="">-- Pilih Dusun Tujuan --</option>
                            {importTargetDusunOptions.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <div className="text-xs text-gray-600 mt-2">
                            Semua data yang diimport akan dimasukkan ke dusun ini.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      Preview Data ({importPreview.length} baris)
                    </h4>
                    <div className="flex items-center space-x-2">
                      {importValidCount > 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">
                            {importValidCount} data siap diimport
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="text-sm text-red-600 font-medium">Tidak ada data valid</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gradient-to-r from-blue-50 to-emerald-50 sticky top-0 z-10">
                          <tr className="text-xs font-bold uppercase tracking-wide text-gray-700">
                            <th className="px-3 py-2 text-left border-r border-gray-200 sticky left-0 bg-blue-50 whitespace-nowrap">No</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">RT</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">RW</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 min-w-[200px]">Alamat</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 min-w-[170px] whitespace-nowrap">Nomor Kartu Keluarga</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Nama Lengkap</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">NIK</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Jenis Kelamin</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Tempat Lahir</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Tanggal Lahir</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Umur</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Agama</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Pendidikan</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Jenis Pekerjaan</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Golongan Darah</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Status Perkawinan</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 min-w-[200px] whitespace-nowrap">Status Hubungan Dalam Keluarga</th>
                            <th className="px-3 py-2 text-left border-r border-gray-200 whitespace-nowrap">Nama Ayah</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">Nama Ibu</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {importPreview.map((citizen, idx) => {
                            // Validasi data wajib
                            const isValid = citizen.nik && citizen.nama_lengkap && citizen.jenis_kelamin;
                            const rowClass = isValid ? 'hover:bg-gray-50' : 'bg-red-50 hover:bg-red-100';
                            const stickyBgClass = isValid ? 'bg-white' : 'bg-red-50';
                            
                            return (
                            <tr key={idx} className={rowClass}>
                              <td className={`px-3 py-2 text-sm text-gray-900 border-r border-gray-200 sticky left-0 ${stickyBgClass} whitespace-nowrap`}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold">{idx + 1}</span>
                                  {isValid ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                </div>
                              </td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 text-center whitespace-nowrap">{citizen.rt || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 text-center whitespace-nowrap">{citizen.rw || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-normal break-words min-w-[200px]">{citizen.alamat || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 font-mono border-r border-gray-200 whitespace-nowrap min-w-[170px]">{citizen.no_kk || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm font-medium border-r border-gray-200 whitespace-nowrap">
                                {citizen.nama_lengkap ? (
                                  <span className="text-gray-900 font-semibold">{citizen.nama_lengkap}</span>
                                ) : (
                                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-xs">KOSONG</span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-sm font-mono border-r border-gray-200 whitespace-nowrap">
                                {citizen.nik ? (
                                  <span className="text-gray-900 font-semibold">{citizen.nik}</span>
                                ) : (
                                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-xs">KOSONG</span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-sm border-r border-gray-200 whitespace-nowrap">
                                {citizen.jenis_kelamin ? (
                                  <span className="text-gray-900 font-semibold">{citizen.jenis_kelamin}</span>
                                ) : (
                                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-xs">KOSONG</span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.tempat_lahir || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.tanggal_lahir || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 text-center whitespace-nowrap">{citizen.umur || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.agama || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.pendidikan_terakhir || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.pekerjaan || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.golongan_darah || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.status_perkawinan || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-normal break-words min-w-[200px]">{citizen.status_dalam_keluarga || citizen.status_hubungan_dalam_keluarga || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">{citizen.nama_ayah || <span className="text-gray-400 italic">-</span>}</td>
                              <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{citizen.nama_ibu || <span className="text-gray-400 italic">-</span>}</td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600 text-center border-t border-gray-200">
                      Menampilkan semua {importPreview.length} data yang akan diimport
                    </div>
                  </div>
                  
                  {/* Data Summary */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{importPreview.length}</div>
                      <div className="text-xs text-blue-700">Total Data</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">
                        {importValidCount}
                      </div>
                      <div className="text-xs text-green-700">Data Valid</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-yellow-600">
                        {importTargetDusun || '-'}
                      </div>
                      <div className="text-xs text-yellow-700">Dusun Tujuan</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-emerald-600">
                        {new Set(importPreview.map(c => c.rt)).size}
                      </div>
                      <div className="text-xs text-emerald-700">RT</div>
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex space-x-3">
              <button
                onClick={handleImportData}
                disabled={importPreview.length === 0 || !importTargetDusun}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-5 h-5" />
                <span>Import {importPreview.length} Data</span>
              </button>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportPreview([]);
                  setImportTargetDusun('');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Export Data Penduduk</h3>
                  <p className="text-sm text-gray-600 mt-1">Pilih data yang ingin di-export</p>
                </div>
                <button
                  onClick={() => {
                    setShowExportModal(false);
                    setSelectedCitizens(new Set());
                    setSelectAll(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Export Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Format Export
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setExportFormat('excel')}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                      exportFormat === 'excel'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileSpreadsheet className={`w-6 h-6 ${
                      exportFormat === 'excel' ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Excel (XLSX)</div>
                      <div className="text-xs text-gray-500">Format spreadsheet</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setExportFormat('pdf')}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                      exportFormat === 'pdf'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className={`w-6 h-6 ${
                      exportFormat === 'pdf' ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">PDF</div>
                      <div className="text-xs text-gray-500">Format dokumen</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Data Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Pilih Data ({selectedCitizens.size} dari {citizensData.length} dipilih)
                  </label>
                  <button
                    onClick={handleSelectAllCitizens}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {selectAll ? 'Batalkan Semua' : 'Pilih Semua'}
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAllCitizens}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">JK</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dusun</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">RT/RW</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {citizensData.map((citizen) => (
                          <tr key={citizen.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={citizen.id ? selectedCitizens.has(citizen.id) : false}
                                onChange={() => citizen.id && handleSelectCitizen(citizen.id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{citizen.nik}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{citizen.nama_lengkap}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{citizen.jenis_kelamin}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{citizen.dusun}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{citizen.rt}/{citizen.rw}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex space-x-3">
              <button
                onClick={handleExportData}
                disabled={selectedCitizens.size === 0 && !selectAll}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                <span>Export {selectAll ? citizensData.length : selectedCitizens.size} Data</span>
              </button>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setSelectedCitizens(new Set());
                  setSelectAll(false);
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Panduan Import & Export Data</h3>
                    <p className="text-sm text-gray-600">Tata cara kelola data penduduk</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Import Guide */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-900">Cara Import Data</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Download Template Excel</p>
                      <p className="text-gray-600">Klik tombol "Download Template" untuk mendapatkan file Excel dengan format yang sesuai.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Isi Data Penduduk</p>
                      <p className="text-gray-600">Buka file template dan isi data penduduk sesuai dengan kolom yang tersedia. Pastikan semua data terisi dengan benar.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Upload File</p>
                      <p className="text-gray-600">Klik tombol "Import Data", pilih file Excel yang sudah diisi, dan sistem akan menampilkan preview data.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Konfirmasi Import</p>
                      <p className="text-gray-600">Periksa preview data, jika sudah sesuai klik tombol "Import" untuk menyimpan data ke database.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Download className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-lg font-bold text-gray-900">Cara Export Data</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 font-bold text-xs">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Pilih Format Export</p>
                      <p className="text-gray-600">Klik tombol "Export Data" dan pilih format file yang diinginkan (Excel atau PDF).</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Pilih Data</p>
                      <p className="text-gray-600">Centang data penduduk yang ingin di-export. Anda bisa memilih semua data atau data tertentu saja dengan checkbox.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 font-bold text-xs">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Download File</p>
                      <p className="text-gray-600">Klik tombol "Export" dan file akan otomatis terdownload ke komputer Anda.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900 mb-2">Catatan Penting:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                      <li>Pastikan format NIK 16 digit dan tidak ada yang duplikat</li>
                      <li>Format tanggal lahir: DD-MM-YYYY (contoh: 01-01-1990)</li>
                      <li>Jenis kelamin: "Laki-laki" atau "Perempuan"</li>
                      <li>RT dan RW diisi dengan 2 digit (contoh: 01, 02, 03)</li>
                      <li>Nama dusun harus sesuai dengan dusun yang sudah terdaftar</li>
                      <li>File Excel maksimal 1000 baris data per import</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dusun Modal */}
      {showEditDusun && editingDusun && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Edit Dusun</h3>
                    <p className="text-sm text-gray-600">Perbarui informasi dusun</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowEditDusun(false);
                    setEditingDusun(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Nama Dusun */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Dusun *
                </label>
                <input
                  type="text"
                  value={editDusunForm.name}
                  onChange={(e) => setEditDusunForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Dusun Mawar"
                  required
                />
              </div>

              {/* Kepala Dusun */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Kepala Dusun *
                </label>
                <input
                  type="text"
                  value={editDusunForm.head_name}
                  onChange={(e) => setEditDusunForm(prev => ({ ...prev, head_name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Budi Santoso"
                  required
                />
              </div>

              {/* No. HP Kepala Dusun */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. HP Kepala Dusun
                </label>
                <input
                  type="tel"
                  value={editDusunForm.head_phone}
                  onChange={(e) => setEditDusunForm(prev => ({ ...prev, head_phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              {/* Jumlah RT dan Penduduk */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah RT *
                  </label>
                  <input
                    type="number"
                    value={editDusunForm.rt_count}
                    onChange={(e) => setEditDusunForm(prev => ({ ...prev, rt_count: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah Penduduk *
                  </label>
                  <input
                    type="number"
                    value={editDusunForm.population_count}
                    onChange={(e) => setEditDusunForm(prev => ({ ...prev, population_count: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Informasi:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Pastikan data yang diinput sudah benar</li>
                      <li>Perubahan akan langsung tersimpan di sistem</li>
                      <li>Jumlah RT dan penduduk harus sesuai dengan data aktual</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex space-x-3">
              <button
                onClick={handleSaveEditDusun}
                disabled={!editDusunForm.name || !editDusunForm.head_name}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>Simpan Perubahan</span>
              </button>
              <button
                onClick={() => {
                  setShowEditDusun(false);
                  setEditingDusun(null);
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit RT Modal */}
      {showEditRT && editingRT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Edit RT</h3>
                    <p className="text-sm text-gray-600">Perbarui informasi RT</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowEditRT(false);
                    setEditingRT(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Nama RT */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama RT *
                </label>
                <input
                  type="text"
                  value={editRTForm.name}
                  onChange={(e) => setEditRTForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contoh: RT 01"
                  required
                />
              </div>

              {/* Ketua RT */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Ketua RT *
                </label>
                <input
                  type="text"
                  value={editRTForm.ketua}
                  onChange={(e) => setEditRTForm(prev => ({ ...prev, ketua: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contoh: Bapak RT 1"
                  required
                />
              </div>

              {/* No. HP Ketua RT */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. HP Ketua RT
                </label>
                <input
                  type="tel"
                  value={editRTForm.phone}
                  onChange={(e) => setEditRTForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              {/* Jumlah KK */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jumlah Kepala Keluarga *
                </label>
                <input
                  type="number"
                  value={editRTForm.kk_count}
                  onChange={(e) => setEditRTForm(prev => ({ ...prev, kk_count: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  min="0"
                  required
                />
              </div>

              {/* Info Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-emerald-800">
                    <p className="font-semibold mb-1">Informasi:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Pastikan data yang diinput sudah benar</li>
                      <li>Perubahan akan langsung tersimpan di sistem</li>
                      <li>Jumlah KK harus sesuai dengan data aktual di RT</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex space-x-3">
              <button
                onClick={handleSaveEditRT}
                disabled={!editRTForm.name || !editRTForm.ketua}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>Simpan Perubahan</span>
              </button>
              <button
                onClick={() => {
                  setShowEditRT(false);
                  setEditingRT(null);
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OperatorDashboard;
