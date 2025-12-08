import { 
  CheckCircle, MapPin, Users, TrendingUp, Building2, Award, FileText, Download, ExternalLink, Calendar, Phone, Mail, 
  Target, Eye, Briefcase, ShoppingCart,
  PieChart, Shield, ChevronRight
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { useNavigate } from 'react-router-dom';

const BUMDesEkonomiPage = () => {
  const navigate = useNavigate();
  
  // About BUMDes data
  const aboutBumdes = {
    fullName: 'BUMDES MADANI FAJAR BARU',
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

  const businessUnits = [
    {
      id: 'kendar-ikan',
      name: 'Kendar Ikan',
      description: 'Jual Bibit Lele, Nila, Gurame, Cupang',
      capacity: 'Bibit Ikan Berkualitas',
      members: 'Tim Ahli',
      status: 'Beroperasi',
      manager: 'Pengelola Kendar Ikan',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      image: `${import.meta.env.BASE_URL}program/bumdes-ekonomi/unit-usaha/kendar-ikan.jpg`,
      features: ['Bibit Lele', 'Bibit Nila', 'Bibit Gurame', 'Bibit Cupang'],
      address: 'Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/9fJNCgjURtMuTh2Y7',
      phone: '(021) 12345678',
      email: 'kendar.ikan@example.com'
    },
    {
      id: 'mars-collections',
      name: 'Mars Collections',
      description: 'Toko fashion dengan berbagai koleksi pakaian dan aksesoris terkini',
      capacity: 'Fashion & Aksesoris',
      members: 'Tim Kreatif',
      status: 'Beroperasi',
      manager: 'Pengelola Mars Collections',
      icon: ShoppingCart,
      color: 'from-pink-500 to-rose-500',
      image: `${import.meta.env.BASE_URL}program/bumdes-ekonomi/unit-usaha/mars-collection.jpg`,
      features: ['Pakaian', 'Aksesoris', 'Fashion Muslim', 'Produk Lokal'],
      address: 'Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/dsmq2MgsH64PdDh89',
      phone: '(021) 12345679',
      email: 'mars.collections@example.com'
    },
    {
      id: 'rf-cctv',
      name: 'RF CCTV Lampung',
      description: 'Pemasangan dan perawatan sistem keamanan CCTV untuk rumah dan bisnis',
      capacity: 'Solusi Keamanan',
      members: 'Teknisi Berpengalaman',
      status: 'Beroperasi',
      manager: 'Pengelola RF CCTV',
      icon: Shield,
      color: 'from-gray-600 to-slate-700',
      image: `${import.meta.env.BASE_URL}program/bumdes-ekonomi/unit-usaha/rf-cctv-lampung.jpg`,
      features: ['Pemasangan CCTV', 'Maintenance', 'Sistem Keamanan', 'Konsultasi'],
      address: 'M74C+2J2, Jl. Rahayu Gg. Makmur No.6, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/RK828bBxqWZLY9gB7',
      phone: '(021) 12345680',
      email: 'rfcctv.lampung@example.com'
    },
    {
      id: 'tikatani',
      name: 'Tikatani Fajar Baru',
      description: 'Usaha kuliner khas dengan cita rasa otentik dari bahan-bahan pilihan',
      capacity: 'Kuliner Khas',
      members: 'Koki Profesional',
      status: 'Beroperasi',
      manager: 'Pengelola Tikatani',
      icon: ShoppingCart,
      color: 'from-amber-500 to-orange-500',
      image: `${import.meta.env.BASE_URL}program/bumdes-ekonomi/unit-usaha/tiktani.jpg`,
      features: ['Makanan Khas', 'Minuman Segar', 'Catering', 'Makanan Siap Saji'],
      address: 'M749+678, Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/YRacF4xQ12CmMxAh8',
      phone: '(021) 12345681',
      email: 'tikatani.fajarbaru@example.com'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center pt-28 md:pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4 mr-2" />
                BUMDES & EKONOMI DESA FAJAR BARU
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Menggerakkan Perekonomian <span className="text-blue-600">Desa</span> 
                <br className="hidden sm:block" />yang <span className="text-blue-600">Mandiri</span> dan Berkelanjutan
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Mendorong pertumbuhan ekonomi desa melalui pengelolaan BUMDes yang profesional dan pemberdayaan masyarakat 
                untuk kesejahteraan bersama di Desa Fajar Baru.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Unit Usaha */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Unit Usaha</div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Berbagai layanan mulai dari perikanan hingga kuliner</p>
              </div>
              
              {/* Anggota */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">156+</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Anggota Aktif</div>
                <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Bersinergi dalam pengembangan ekonomi desa</p>
              </div>
              
              {/* Aset */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">100%</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Milik Desa</div>
                <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Aset dan hasil usaha untuk kesejahteraan masyarakat</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                <span>Berdasarkan Peraturan Desa No. 05 Tahun 2020 tentang Pendirian BUMDes</span>
                <ChevronRight className="w-4 h-4 ml-1 text-blue-500" />
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
                  src={`${import.meta.env.BASE_URL}program/bumdes-ekonomi/gambar-bumdes.jpg`}
                  alt="BUMDes Madani Fajar Baru"
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
                BUMDES MADANI FAJAR BARU adalah lembaga ekonomi desa yang mengintegrasikan 
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
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              UNIT USAHA
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Unit Usaha BUMDes 
              <span className="text-village-green"> Fajar Baru</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Berbagai unit usaha yang dikelola oleh BUMDes untuk memajukan perekonomian masyarakat Desa Fajar Baru
            </p>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 text-center md:text-left">
            Geser ke samping untuk melihat unit usaha lainnya.
          </p>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-max">
              {businessUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex-shrink-0 w-[85vw] sm:w-[22rem] lg:w-[23%] max-w-sm"
                >
                  {/* Image Section */}
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <img 
                      src={unit.image}
                      alt={unit.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e2f0f0f94%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e2f0f0f94%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22150.921875%22%20y%3D%22168.1%22%3E' + encodeURIComponent(unit.name) + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${unit.color.replace('bg-gradient-to-r', 'bg-gradient-to-br')} text-white shadow-lg`}>
                        <unit.icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{unit.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{unit.description}</p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {unit.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                        {unit.features.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            +{unit.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{unit.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{unit.phone}</span>
                      </div>
                    </div>
                    
                    {/* Single Detail Button */}
                    <button 
                      onClick={() => {
                        navigate(`/program/unit-usaha/${unit.id}`);
                      }}
                      className="w-full bg-gradient-to-r from-village-green to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-village-green/90 hover:to-blue-600/90 transition-all duration-300 flex items-center justify-center group"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Cek Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text & Contact */}
            <div className="text-gray-900">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hubungi <span className="text-village-green">BUMDES Madani Fajar Baru</span>
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Kami siap membantu kebutuhan ekonomi dan usaha Anda. Hubungi tim kami 
                untuk konsultasi, kemitraan, dan informasi lebih lanjut mengenai BUMDES Madani Fajar Baru.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-village-green" />
                  </div>
                  <div>
                    <div className="font-semibold">Alamat Kantor</div>
                    <div className="text-gray-600">Kantor Desa Fajar Baru, Jl. Raya Fajar Baru No. 123</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-village-green" />
                  </div>
                  <div>
                    <div className="font-semibold">Telepon & WhatsApp</div>
                    <div className="text-gray-600">6285768192419 (WhatsApp)</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-village-green" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">bumdes@desafajarbaru.id</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-village-green" />
                  </div>
                  <div>
                    <div className="font-semibold">Jam Operasional</div>
                    <div className="text-gray-600">Senin - Jumat: 08:00 - 16:00 WIB</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-village-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  onClick={() => {
                    const waNumber = '6285768192419';
                    const message = 'Assalamualaikum, saya ingin berkonsultasi terkait layanan dan informasi BUMDES Madani Fajar Baru.';
                    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
                    window.open(waUrl, '_blank');
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Sekarang
                </button>
                <button
                  className="border border-gray-300 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                  onClick={() => {
                    window.open('https://maps.app.goo.gl/BdBkt919omF3ceMZ8', '_blank');
                  }}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Kunjungi Kantor
                </button>
              </div>
            </div>

            {/* Right: Maps Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="h-80 w-full">
                  <iframe
                    title="Lokasi Kantor BUMDES Madani Fajar Baru"
                    src="https://www.google.com/maps?q=Desa%20Fajar%20Baru%20Jati%20Agung%20Lampung%20Selatan&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Kantor BUMDES Madani Fajar Baru</h4>
                    <p className="text-gray-600 text-sm">Terbuka untuk kunjungan dan konsultasi</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 text-xs font-medium">Sedang Buka</span>
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
