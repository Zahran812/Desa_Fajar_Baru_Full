import { 
  CheckCircle, MapPin, Users, TrendingUp, Building2, Star,
  Award, FileText, Download, ExternalLink, Calendar, Phone, Mail, 
  DollarSign, Target, Eye, Briefcase, Factory, Leaf, ShoppingCart,
  BarChart3, PieChart, Shield, Globe, User
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';

const BUMDesEkonomiPage = () => {
  // About BUMDes data
  const aboutBumdes = {
    fullName: 'BUMDes "Fajar Baru Sejahtera"',
    location: 'Desa Fajar Baru, Kec. Jati Agung, Kab. Lampung Selatan',
    established: '2020',
    legalBasis: 'Perdes No. 05 Tahun 2020',
    vision: 'Menjadi pusat ekonomi desa yang mandiri, inklusif, dan berkelanjutan yang meningkatkan kesejahteraan seluruh warga Desa Fajar Baru pada 2030.',
    mission: [
      'Mengelola usaha agribisnis berbasis nilai tambah dan pasar regional',
      'Mengembangkan unit usaha yang ramah lingkungan dan inklusif gender', 
      'Menyediakan layanan penyimpanan dan distribusi yang efisien untuk petani',
      'Meningkatkan kapasitas SDM desa melalui pelatihan kewirausahaan dan teknis',
      'Mengimplementasikan tata kelola yang transparan dan akuntabel'
    ]
  };

  const organizationStructure = [
    { position: 'Dewan Pembina', name: 'H. Ahmad Suryadi, S.Sos', role: 'Kepala Desa', icon: Users },
    { position: 'Pengawas', name: 'Siti Nurhaliza', role: 'Perwakilan BPD', icon: Shield },
    { position: 'Direktur', name: 'Budi Santoso, S.E', role: 'Kepala BUMDes', icon: Target },
    { position: 'Sekretaris', name: 'Maya Sari, S.Pd', role: 'Administrasi', icon: FileText },
    { position: 'Bendahara', name: 'Andi Wijaya', role: 'Keuangan', icon: DollarSign },
    { position: 'Manajer Unit Agribisnis', name: 'Agus Setiawan', role: 'Pertanian & Peternakan', icon: Leaf }
  ];

  const businessUnits = [
    {
      name: 'Aggregator Sayur & Cold Storage',
      description: 'Pengumpulan sayur dari petani dengan fasilitas penyimpanan dingin modern untuk menjaga kualitas dan memperpanjang masa simpan',
      capacity: '2 ton/hari',
      members: '45 petani',
      status: 'Pilot 2025',
      manager: 'Agus Setiawan',
      icon: Factory,
      color: 'from-emerald-500 to-teal-600',
      features: ['Cold Storage 4°C', 'Grading & Sorting', 'Distribusi Regional']
    },
    {
      name: 'Unit Pengolahan & Kemasan',
      description: 'Pengolahan dan pengemasan produk pertanian dengan standar food grade untuk meningkatkan nilai tambah',
      capacity: '500 paket/minggu',
      members: '23 anggota',
      status: 'Beroperasi',
      manager: 'Maya Sari',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      features: ['Standar PIRT', 'Kemasan Modern', 'Brand Lokal']
    },
    {
      name: 'Peternakan Terkoordinasi',
      description: 'Koordinasi peternakan ayam kampung dengan sistem kemitraan berkelanjutan dan manajemen kesehatan terpadu',
      capacity: '300 ekor ayam',
      members: '18 peternak',
      status: 'Beroperasi',
      manager: 'Andi Wijaya',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      features: ['Ayam Kampung', 'Vaksinasi Rutin', 'Pakan Organik']
    },
    {
      name: 'Pengelolaan Sampah → Kompos',
      description: 'Pengolahan sampah organik menjadi pupuk kompos berkualitas tinggi dengan teknologi fermentasi modern',
      capacity: '200 kg/bulan',
      members: '12 anggota',
      status: 'Beroperasi',
      manager: 'Budi Santoso',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      features: ['Kompos Berkualitas', 'Ramah Lingkungan', 'Harga Terjangkau']
    },
    {
      name: 'Unit Jasa Konstruksi',
      description: 'Penyediaan jasa konstruksi dan pembangunan infrastruktur desa dengan tenaga kerja lokal terlatih',
      capacity: 'Sesuai Proyek',
      members: '15 pekerja',
      status: 'Aktif',
      manager: 'Budi Santoso',
      icon: Building2,
      color: 'from-gray-600 to-slate-700',
      features: ['Tenaga Ahli', 'Material Berkualitas', 'Harga Kompetitif']
    },
    {
      name: 'Marketplace Digital UMKM',
      description: 'Platform digital untuk pemasaran produk UMKM lokal dengan jangkauan pasar yang lebih luas',
      capacity: '50+ produk',
      members: '25 UMKM',
      status: 'Berkembang',
      manager: 'Maya Sari',
      icon: Globe,
      color: 'from-purple-500 to-indigo-600',
      features: ['E-Commerce', 'Digital Marketing', 'Pembayaran Online']
    }
  ];

  const financialHighlights = {
    initialCapital: 450000000,
    annualRevenue: 180000000,
    membersTotal: 156,
    activeUnits: 6,
    employmentCreated: 45,
    annualGrowth: 25.5,
    shuContribution: 45000000
  };

  const achievements = [
    { 
      year: '2022', 
      title: 'Juara 3 BUMDes Terbaik Lampung Selatan', 
      description: 'Penghargaan dalam kategori tata kelola dan transparansi pengelolaan keuangan',
      icon: Award,
      color: 'bg-yellow-500'
    },
    { 
      year: '2023', 
      title: 'Sertifikat ISO 9001:2015 Manajemen Mutu', 
      description: 'Standar internasional untuk sistem manajemen mutu dalam operasional unit usaha',
      icon: Star,
      color: 'bg-blue-600'
    },
    { 
      year: '2024', 
      title: 'Penghargaan Inovasi Agribisnis Provinsi Lampung', 
      description: 'Inovasi dalam sistem aggregator dan cold storage untuk produk pertanian',
      icon: Target,
      color: 'bg-emerald-600'
    }
  ];

  const keyFeatures = [
    'Manajemen hasil panen dengan standar mutu tinggi dan sistem traceability',
    'Strategi pemasaran produk agribisnis berkelanjutan dengan branding kuat',
    'Pengembangan teknologi pertanian modern dan precision farming',
    'Solusi inovatif untuk rantai pasok agribisnis yang efisien',
    'Panduan ahli untuk investasi ekonomi desa dan manajemen risiko',
    'Dukungan jangka panjang untuk pertumbuhan UMKM dan inkubasi bisnis'
  ];

  const legalDocuments = [
    {
      name: 'Perdes Pendirian BUMDes',
      description: 'Peraturan Desa tentang pendirian dan operasional BUMDes',
      type: 'Legal Document',
      icon: FileText
    },
    {
      name: 'Laporan Keuangan Audited',
      description: 'Laporan keuangan tahunan yang telah diaudit independen',
      type: 'Financial Report',
      icon: PieChart
    },
    {
      name: 'SOP Operasional Unit',
      description: 'Standar operasional prosedur untuk setiap unit usaha',
      type: 'Operational Manual',
      icon: Briefcase
    },
    {
      name: 'Sertifikat & Penghargaan',
      description: 'Sertifikat ISO dan berbagai penghargaan yang diraih',
      type: 'Certificates',
      icon: Award
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 via-blue-500 to-village-green relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                <Building2 className="w-4 h-4 inline mr-2" />
                BUMDes FAJAR BARU SEJAHTERA
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Membangun Ekonomi Desa yang 
                <span className="text-white"> Berkelanjutan</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                BUMDes "Fajar Baru Sejahtera" mengoptimalkan potensi ekonomi lokal melalui 
                agribisnis modern, teknologi, dan kemitraan strategis untuk kesejahteraan masyarakat.
              </p>
              
              

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {financialHighlights.activeUnits}
                  </div>
                  <div className="text-sm text-emerald-100">Unit Usaha</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {financialHighlights.membersTotal}+
                  </div>
                  <div className="text-sm text-emerald-100">Anggota</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    180M
                  </div>
                  <div className="text-sm text-emerald-100">Pendapatan/Tahun</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {financialHighlights.annualGrowth}%
                  </div>
                  <div className="text-sm text-emerald-100">Pertumbuhan</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=500&fit=crop"
                  alt="BUMDes Fajar Baru Sejahtera"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">BUMDes Terpercaya & Bersertifikat</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-village-green to-blue-600 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">ISO 9001:2015</div>
                    <div className="text-xs text-gray-600">Sertifikat Mutu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop"
                  alt="BUMDes Operations"
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-village-green" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">25.5%</div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">156+</div>
                    <div className="text-xs text-gray-600">Members</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                TENTANG KAMI
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Mengoptimalkan Potensi Ekonomi Desa dengan 
                <span className="text-village-green"> Inovasi & Teknologi</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BUMDes "Fajar Baru Sejahtera" adalah lembaga ekonomi desa yang mengintegrasikan 
                teknologi modern dengan kearifan lokal. Kami mengelola berbagai unit usaha mulai 
                dari aggregator hasil pertanian, pengolahan produk, hingga marketplace digital 
                untuk memberdayakan ekonomi masyarakat.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              
            </div>
          </div>
        </div>
      </section>

      {/* Business Units Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              UNIT USAHA
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Unit Usaha BUMDes yang 
              <span className="text-village-green"> Beragam & Inovatif</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Mengelola 6 unit usaha strategis yang saling terintegrasi untuk menciptakan 
              ekosistem ekonomi desa yang berkelanjutan dan menguntungkan semua pihak.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessUnits.map((unit, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className={`h-2 bg-gradient-to-r ${unit.color}`}></div>
                <div className="p-8">
                  <div className={`w-14 h-14 bg-gradient-to-br ${unit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <unit.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-village-green transition-colors">
                    {unit.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {unit.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {unit.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Kapasitas:
                      </span>
                      <span className="font-semibold text-gray-900">{unit.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Anggota:
                      </span>
                      <span className="font-semibold text-gray-900">{unit.members}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Status:
                      </span>
                      <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
                        unit.status === 'Beroperasi' ? 'bg-green-100 text-green-700' :
                        unit.status === 'Pilot 2025' ? 'bg-yellow-100 text-yellow-700' :
                        unit.status === 'Berkembang' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {unit.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Pengelola:
                      </span>
                      <span className="font-semibold text-gray-900">{unit.manager}</span>
                    </div>
                  </div>
                  
                  <button className="w-full btn-outline group-hover:btn-primary transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                    Detail Unit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              STRUKTUR ORGANISASI
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tim Profesional & 
              <span className="text-village-green"> Berpengalaman</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dipimpin oleh tim yang berpengalaman dalam mengelola ekonomi desa dan 
              memberdayakan masyarakat dengan tata kelola yang transparan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizationStructure.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-village-green to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <member.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-village-green font-semibold text-sm mb-1">{member.position}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                  
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Performance */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-village-green relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 text-white">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              KINERJA KEUANGAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Transparansi & Akuntabilitas 
              <span className="text-white">Pengelolaan Keuangan</span>
            </h2>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
              Mengelola keuangan dengan prinsip transparansi dan akuntabilitas untuk 
              pertumbuhan yang berkelanjutan dan kepercayaan masyarakat.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 text-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{formatCurrency(financialHighlights.initialCapital)}</div>
              <div className="text-emerald-200 text-sm">Modal Awal</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{formatCurrency(financialHighlights.annualRevenue)}</div>
              <div className="text-emerald-200 text-sm">Pendapatan Tahunan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{formatNumber(financialHighlights.membersTotal)}</div>
              <div className="text-emerald-200 text-sm">Total Anggota</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{financialHighlights.activeUnits}</div>
              <div className="text-emerald-200 text-sm">Unit Aktif</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{financialHighlights.employmentCreated}</div>
              <div className="text-emerald-200 text-sm">Lapangan Kerja</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{financialHighlights.annualGrowth}%</div>
              <div className="text-emerald-200 text-sm">Pertumbuhan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{formatCurrency(financialHighlights.shuContribution)}</div>
              <div className="text-emerald-200 text-sm">SHU untuk Desa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              PRESTASI & PENGHARGAAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pencapaian yang 
              <span className="text-village-green"> Membanggakan</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Berbagai penghargaan dan sertifikasi yang telah diraih sebagai bukti 
              komitmen terhadap keunggulan dan standar internasional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                <div className={`flex items-center justify-center w-16 h-16 ${achievement.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className="w-8 h-8" />
                </div>
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-village-green to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {achievement.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-village-green transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basic Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 text-village-green mr-3" />
                Informasi Dasar
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Resmi</p>
                  <p className="font-semibold text-gray-900">{aboutBumdes.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Lokasi</p>
                  <p className="font-semibold text-gray-900">{aboutBumdes.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tahun Berdiri</p>
                  <p className="font-semibold text-gray-900">{aboutBumdes.established}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Dasar Hukum</p>
                  <p className="font-semibold text-gray-900">{aboutBumdes.legalBasis}</p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="w-6 h-6 text-village-green mr-3" />
                Visi
              </h3>
              <p className="text-gray-700 leading-relaxed italic">"{aboutBumdes.vision}"</p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 text-blue-600 mr-3" />
                Misi
              </h3>
              <ul className="space-y-3">
                {aboutBumdes.mission.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-village-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Documents Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              DOKUMEN & LEGALITAS
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transparansi & 
              <span className="text-village-green"> Akuntabilitas</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Akses dokumen resmi dan laporan transparansi BUMDes untuk memastikan 
              akuntabilitas dan tata kelola yang baik.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {legalDocuments.map((doc, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-village-green to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <doc.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                <div className="text-xs text-gray-500 mb-4 bg-gray-100 px-2 py-1 rounded-full">
                  {doc.type}
                </div>
                <button className="text-village-green font-medium hover:text-village-green/80 flex items-center justify-center mx-auto group-hover:underline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-village-green relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Hubungi 
                <span className="text-white">BUMDes Fajar Baru Sejahtera</span>
              </h2>
              <p className="text-emerald-100 mb-8 text-lg">
                Kami siap membantu kebutuhan ekonomi dan usaha Anda. Hubungi tim kami 
                untuk konsultasi, kemitraan, dan informasi lebih lanjut.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Alamat Kantor</div>
                    <div className="text-emerald-100">Kantor Desa Fajar Baru, Jl. Raya Fajar Baru No. 123</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Telepon & WhatsApp</div>
                    <div className="text-emerald-100">(0721) 555-0123</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-emerald-100">bumdes@desafajarbaru.id</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Jam Operasional</div>
                    <div className="text-emerald-100">Senin - Jumat: 08:00 - 16:00 WIB</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-village-green px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Sekarang
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-village-green transition-colors flex items-center justify-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Kunjungi Kantor
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
                  alt="BUMDes Office"
                  className="w-full h-80 object-cover rounded-xl"
                />
                
                {/* Office Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Kantor BUMDes</h4>
                  <p className="text-gray-600 text-sm">Terbuka untuk kunjungan dan konsultasi</p>
                  <div className="flex items-center mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 text-sm font-medium">Sedang Buka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default BUMDesEkonomiPage;
