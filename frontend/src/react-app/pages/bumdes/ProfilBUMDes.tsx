import PageLayout from '@/react-app/components/PageLayout';
import { 
  Building2, Users, DollarSign, TrendingUp, Target, Award, Calendar, 
  MapPin, Phone, Mail, Eye, Star, CheckCircle, BarChart3,
  Factory, ShoppingCart, Leaf, Globe, Shield, FileText, Download,
  ExternalLink, Zap
} from 'lucide-react';

const ProfilBUMDesPage = () => {
  const bumdesInfo = {
    name: 'BUMDes Fajar Baru Sejahtera',
    fullName: 'Badan Usaha Milik Desa "Fajar Baru Sejahtera"',
    established: '2020',
    legalStatus: 'Perdes No. 05 Tahun 2020',
    capital: 450000000,
    employees: 45,
    businessUnits: 6,
    revenue2024: 180000000,
    members: 156,
    growth: 25.5
  };

  const management = [
    {
      name: 'H. Ahmad Suryadi, S.Sos',
      position: 'Dewan Pembina',
      role: 'Kepala Desa',
      experience: 'Kepemimpinan 8 Tahun',
      background: 'Administrasi Publik',
      icon: Shield
    },
    {
      name: 'Siti Nurhaliza',
      position: 'Pengawas',
      role: 'Perwakilan BPD',
      experience: 'Pengawasan 5 Tahun',
      background: 'Hukum & Tata Kelola',
      icon: Eye
    },
    {
      name: 'Budi Santoso, S.E',
      position: 'Direktur',
      role: 'Kepala BUMDes',
      experience: 'Manajemen 6 Tahun',
      background: 'Ekonomi & Bisnis',
      icon: Target
    },
    {
      name: 'Maya Sari, S.Pd',
      position: 'Sekretaris',
      role: 'Administrasi',
      experience: 'Administrasi 4 Tahun',
      background: 'Pendidikan & Admin',
      icon: FileText
    },
    {
      name: 'Andi Wijaya',
      position: 'Bendahara',
      role: 'Keuangan',
      experience: 'Keuangan 5 Tahun',
      background: 'Akuntansi',
      icon: DollarSign
    },
    {
      name: 'Agus Setiawan',
      position: 'Manajer Unit Agribisnis',
      role: 'Pertanian & Peternakan',
      experience: 'Agribisnis 7 Tahun',
      background: 'Pertanian Modern',
      icon: Leaf
    }
  ];

  const businessUnits = [
    {
      name: 'Aggregator Sayur & Cold Storage',
      description: 'Pengumpulan sayur dari petani dengan fasilitas penyimpanan dingin modern berkapasitas 2 ton per hari untuk menjaga kualitas dan memperpanjang masa simpan produk.',
      manager: 'Agus Setiawan',
      assets: 'Rp 180 Juta',
      members: 45,
      capacity: '2 ton/hari',
      status: 'Pilot 2025',
      icon: Factory,
      color: 'from-emerald-500 to-teal-600',
      features: ['Cold Storage 4°C', 'Grading & Sorting', 'Distribusi Regional', 'Quality Control']
    },
    {
      name: 'Unit Pengolahan & Kemasan',
      description: 'Pengolahan dan pengemasan produk pertanian dengan standar food grade dan sertifikat PIRT untuk meningkatkan nilai tambah produk lokal.',
      manager: 'Maya Sari',
      assets: 'Rp 120 Juta',
      members: 23,
      capacity: '500 paket/minggu',
      status: 'Beroperasi',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      features: ['Standar PIRT', 'Kemasan Modern', 'Brand Lokal', 'Sertifikasi Halal']
    },
    {
      name: 'Peternakan Terkoordinasi',
      description: 'Koordinasi peternakan ayam kampung dengan sistem kemitraan berkelanjutan, manajemen kesehatan terpadu, dan sistem pakan organik.',
      manager: 'Andi Wijaya',
      assets: 'Rp 95 Juta',
      members: 18,
      capacity: '300 ekor ayam',
      status: 'Beroperasi',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      features: ['Ayam Kampung', 'Vaksinasi Rutin', 'Pakan Organik', 'Sistem Kandang Modern']
    },
    {
      name: 'Pengelolaan Sampah → Kompos',
      description: 'Pengolahan sampah organik menjadi pupuk kompos berkualitas tinggi dengan teknologi fermentasi modern dan ramah lingkungan.',
      manager: 'Budi Santoso',
      assets: 'Rp 75 Juta',
      members: 12,
      capacity: '200 kg/bulan',
      status: 'Beroperasi',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      features: ['Kompos Berkualitas', 'Ramah Lingkungan', 'Harga Terjangkau', 'Proses Organik']
    },
    {
      name: 'Unit Jasa Konstruksi',
      description: 'Penyediaan jasa konstruksi dan pembangunan infrastruktur desa dengan tenaga kerja lokal terlatih dan material berkualitas.',
      manager: 'Budi Santoso',
      assets: 'Rp 200 Juta',
      members: 15,
      capacity: 'Sesuai Proyek',
      status: 'Aktif',
      icon: Building2,
      color: 'from-gray-600 to-slate-700',
      features: ['Tenaga Ahli', 'Material Berkualitas', 'Harga Kompetitif', 'Garansi Kerja']
    },
    {
      name: 'Marketplace Digital UMKM',
      description: 'Platform digital untuk pemasaran produk UMKM lokal dengan sistem e-commerce terintegrasi dan jangkauan pasar regional.',
      manager: 'Maya Sari',
      assets: 'Rp 65 Juta',
      members: 25,
      capacity: '50+ produk',
      status: 'Berkembang',
      icon: Globe,
      color: 'from-purple-500 to-indigo-600',
      features: ['E-Commerce', 'Digital Marketing', 'Pembayaran Online', 'Logistik Terpadu']
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Penghargaan Inovasi Agribisnis Provinsi Lampung',
      description: 'Inovasi dalam sistem aggregator dan cold storage untuk produk pertanian dengan teknologi modern',
      category: 'Inovasi Teknologi',
      icon: Zap
    },
    {
      year: '2023',
      title: 'Sertifikat ISO 9001:2015 Manajemen Mutu',
      description: 'Standar internasional untuk sistem manajemen mutu dalam operasional unit usaha dan layanan',
      category: 'Sertifikasi Internasional',
      icon: Star
    },
    {
      year: '2022',
      title: 'Juara 3 BUMDes Terbaik Lampung Selatan',
      description: 'Penghargaan dalam kategori tata kelola dan transparansi pengelolaan keuangan dari Pemerintah Kabupaten',
      category: 'Prestasi Regional',
      icon: Award
    },
    {
      year: '2021',
      title: 'Akreditasi A untuk Unit Simpan Pinjam',
      description: 'Akreditasi dari lembaga keuangan terkait untuk standar pelayanan keuangan mikro',
      category: 'Akreditasi Keuangan',
      icon: Shield
    }
  ];

  const financialHighlights = [
    { 
      label: 'Modal Dasar', 
      value: bumdesInfo.capital, 
      growth: null, 
      icon: DollarSign,
      description: 'Modal awal dari APBDes dan masyarakat'
    },
    { 
      label: 'Total Aset', 
      value: 735000000, 
      growth: 18.5, 
      icon: Building2,
      description: 'Aset gabungan seluruh unit usaha'
    },
    { 
      label: 'Pendapatan 2024', 
      value: bumdesInfo.revenue2024, 
      growth: 25.3, 
      icon: TrendingUp,
      description: 'Pendapatan kotor tahun berjalan'
    },
    { 
      label: 'Laba Bersih', 
      value: 54000000, 
      growth: 22.7, 
      icon: BarChart3,
      description: 'Keuntungan setelah operasional'
    },
    { 
      label: 'SHU untuk Desa', 
      value: 18900000, 
      growth: 28.2, 
      icon: Target,
      description: 'Kontribusi ke kas desa'
    }
  ];

  const visionMission = {
    vision: 'Menjadi pusat ekonomi desa yang mandiri, inklusif, dan berkelanjutan yang meningkatkan kesejahteraan seluruh warga Desa Fajar Baru pada 2030.',
    mission: [
      'Mengelola usaha agribisnis berbasis nilai tambah dan pasar regional',
      'Mengembangkan unit usaha yang ramah lingkungan dan inklusif gender',
      'Menyediakan layanan penyimpanan dan distribusi yang efisien untuk petani',
      'Meningkatkan kapasitas SDM desa melalui pelatihan kewirausahaan dan teknis',
      'Mengimplementasikan tata kelola yang transparan dan akuntabel'
    ]
  };

  const operationalData = {
    location: 'Desa Fajar Baru, Kec. Jati Agung, Kab. Lampung Selatan',
    legalBasis: 'Perdes No. 05 Tahun 2020',
    operationalHours: 'Senin - Jumat: 08:00 - 16:00 WIB',
    contactPhone: '(0721) 555-0123',
    contactEmail: 'bumdes@desafajarbaru.id'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  

  return (
    <PageLayout
      title="Profil BUMDes Fajar Baru Sejahtera"
      subtitle="Badan Usaha Milik Desa yang menggerakkan perekonomian dan kesejahteraan masyarakat dengan inovasi dan transparansi"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'BUMDes & Ekonomi', href: '/program/bumdes-ekonomi' },
        { name: 'Profil BUMDes' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Overview Stats */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                STATISTIK UTAMA
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Kinerja BUMDes dalam Angka
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{bumdesInfo.established}</h3>
                <p className="text-gray-600 text-sm">Tahun Berdiri</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{bumdesInfo.members}</h3>
                <p className="text-gray-600 text-sm">Total Anggota</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{bumdesInfo.businessUnits}</h3>
                <p className="text-gray-600 text-sm">Unit Usaha</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{bumdesInfo.growth}%</h3>
                <p className="text-gray-600 text-sm">Pertumbuhan Tahunan</p>
              </div>
            </div>
          </section>

          {/* About BUMDes */}
          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    TENTANG BUMDES
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                    {bumdesInfo.name}
                  </h2>
                  <div className="prose max-w-none text-gray-600">
                    <p className="text-lg leading-relaxed mb-6">
                      BUMDes "Fajar Baru Sejahtera" adalah lembaga ekonomi desa yang didirikan 
                      pada tahun 2020 berdasarkan Peraturan Desa No. 05/2020 sebagai motor 
                      penggerak ekonomi desa yang bertujuan meningkatkan kesejahteraan masyarakat 
                      dan mengoptimalkan potensi ekonomi lokal.
                    </p>
                    <p className="leading-relaxed mb-6">
                      Dengan modal awal Rp 450 juta yang berasal dari APBDes dan partisipasi 
                      masyarakat, BUMDes telah berkembang pesat mengelola 6 unit usaha strategis 
                      yang saling terintegrasi, mulai dari agregator hasil pertanian dengan 
                      teknologi cold storage hingga marketplace digital UMKM.
                    </p>
                    <p className="leading-relaxed">
                      Komitmen kami adalah terus berinovasi dalam memberikan layanan terbaik 
                      bagi masyarakat sambil mempertahankan nilai-nilai gotong royong, 
                      transparansi, dan berkelanjutan untuk generasi mendatang.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-village-green to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl transform -translate-x-4 translate-y-4"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <Eye className="w-6 h-6 mr-3" />
                        Visi BUMDes
                      </h3>
                      <p className="text-emerald-100 mb-8 italic leading-relaxed">
                        "{visionMission.vision}"
                      </p>
                      
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-3" />
                        Misi BUMDes
                      </h4>
                      <ul className="space-y-3 text-emerald-100">
                        {visionMission.mission.map((item, index) => (
                          <li key={index} className="flex items-start text-sm leading-relaxed">
                            <CheckCircle className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Management Team */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                TIM MANAJEMEN
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Struktur Pengelola</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tim profesional berpengalaman dengan komitmen tinggi untuk memajukan ekonomi desa
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {management.map((person, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-village-green to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <person.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{person.name}</h3>
                  <p className="text-village-green font-semibold mb-1">{person.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{person.role}</p>
                  
                  <div className="text-sm text-gray-500 space-y-1 mb-4 bg-gray-50 rounded-lg p-3">
                    <p><span className="font-medium">Pengalaman:</span> {person.experience}</p>
                    <p><span className="font-medium">Background:</span> {person.background}</p>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center mx-auto group-hover:underline">
                    <Mail className="w-4 h-4 mr-2" />
                    Kontak
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Business Units */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                UNIT USAHA
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Unit Usaha BUMDes</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                6 unit usaha strategis yang dikelola secara profesional dan terintegrasi untuk 
                menciptakan ekosistem ekonomi desa yang berkelanjutan
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessUnits.map((unit, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                  <div className={`h-2 bg-gradient-to-r ${unit.color}`}></div>
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${unit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <unit.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-village-green transition-colors">
                      {unit.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {unit.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {unit.features.map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm mb-6 bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Manager:</span>
                        <span className="text-gray-800 font-semibold">{unit.manager}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Aset:</span>
                        <span className="text-village-green font-semibold">{unit.assets}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Anggota:</span>
                        <span className="text-gray-800 font-semibold">{unit.members} orang</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Kapasitas:</span>
                        <span className="text-gray-800 font-semibold">{unit.capacity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Status:</span>
                        <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
                          unit.status === 'Beroperasi' ? 'bg-green-100 text-green-700' :
                          unit.status === 'Pilot 2025' ? 'bg-yellow-100 text-yellow-700' :
                          unit.status === 'Berkembang' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {unit.status}
                        </span>
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
          </section>

          {/* Financial Highlights */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                KINERJA KEUANGAN
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Transparansi Keuangan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pengelolaan keuangan yang transparan dan akuntabel dengan pertumbuhan yang konsisten
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
              <div className="grid md:grid-cols-5 gap-8">
                {financialHighlights.map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-village-green to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.label}</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-village-green mb-2">
                      {formatCurrency(item.value)}
                    </p>
                    {item.growth && (
                      <div className="flex items-center justify-center space-x-1 text-green-600 text-sm mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>+{item.growth}%</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                PRESTASI & PENGHARGAAN
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Pencapaian Membanggakan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Berbagai penghargaan dan sertifikasi sebagai bukti komitmen terhadap keunggulan dan standar terbaik
              </p>
            </div>
            
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                        <div className="flex items-center space-x-4 mb-2 lg:mb-0">
                          <span className="bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            {achievement.year}
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            {achievement.category}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <button className="btn-outline">
                        <Eye className="w-4 h-4" />
                        Lihat Sertifikat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Operational Information */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                INFORMASI OPERASIONAL
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Data & Legalitas</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FileText className="w-6 h-6 text-village-green mr-3" />
                  Informasi Legal & Operasional
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nama Resmi</p>
                    <p className="font-semibold text-gray-900">{bumdesInfo.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Lokasi</p>
                    <p className="font-semibold text-gray-900">{operationalData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dasar Hukum</p>
                    <p className="font-semibold text-gray-900">{operationalData.legalBasis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Jam Operasional</p>
                    <p className="font-semibold text-gray-900">{operationalData.operationalHours}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Dokumen Tersedia</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Perdes Pendirian</span>
                      <button className="text-village-green hover:text-village-green/80">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Laporan Keuangan</span>
                      <button className="text-village-green hover:text-village-green/80">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">SOP Operasional</span>
                      <button className="text-village-green hover:text-village-green/80">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-village-green to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Phone className="w-6 h-6 mr-3" />
                  Kontak BUMDes
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Alamat Kantor</div>
                      <div className="text-emerald-100 text-sm">Kantor Desa Fajar Baru</div>
                      <div className="text-emerald-100 text-sm">Jl. Raya Fajar Baru No. 123</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Telepon & WhatsApp</div>
                      <div className="text-emerald-100">{operationalData.contactPhone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-emerald-100">{operationalData.contactEmail}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Jam Operasional</div>
                      <div className="text-emerald-100 text-sm">{operationalData.operationalHours}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <button className="w-full bg-white text-village-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Hubungi Sekarang
                  </button>
                  <button className="w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-village-green transition-colors flex items-center justify-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Lihat Lokasi
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilBUMDesPage;
