import { 
  Heart, Users,
  MapPin, CheckCircle, TrendingUp,
  Phone, ChevronRight,
  Activity, Stethoscope, UserCheck,
  Clock, Calendar, Mail,
  Home, Utensils, GraduationCap, Briefcase,
  FileText
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';

const KesehatanSosialPage = () => {
  const bansosStats = {
    year: 2024,
    totalPrograms: 12,
    totalBeneficiaries: 847,
    totalBudget: 3254000000,
    completedPrograms: 9
  };

  const bansosPrograms = [
    {
      name: 'Bantuan Langsung Tunai (BLT)',
      category: 'Ekonomi',
      beneficiaries: 235,
      budget: 705000000,
      status: 'Aktif',
      description: 'Bantuan uang tunai untuk keluarga kurang mampu',
      distribution: 'Bulanan',
      amount: 300000,
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      name: 'Program Keluarga Harapan (PKH)',
      category: 'Sosial',
      beneficiaries: 189,
      budget: 1134000000,
      status: 'Aktif', 
      description: 'Bantuan untuk keluarga dengan anak sekolah dan ibu hamil',
      distribution: 'Triwulan',
      amount: 500000,
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      name: 'Bantuan Pangan Non Tunai (BPNT)',
      category: 'Pangan',
      beneficiaries: 156,
      budget: 468000000,
      status: 'Aktif',
      description: 'Bantuan beras dan telur untuk keluarga kurang mampu',
      distribution: 'Bulanan',
      amount: 250000,
      icon: Utensils,
      color: 'bg-orange-500'
    },
    {
      name: 'Bantuan Sosial Tunai (BST)',
      category: 'Ekonomi',
      beneficiaries: 145,
      budget: 435000000,
      status: 'Selesai',
      description: 'Bantuan khusus dampak pandemi COVID-19',
      distribution: 'Bulanan',
      amount: 300000,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Program Indonesia Pintar (PIP)',
      category: 'Pendidikan',
      beneficiaries: 78,
      budget: 390000000,
      status: 'Aktif',
      description: 'Bantuan pendidikan untuk siswa kurang mampu',
      distribution: 'Semester',
      amount: 500000,
      icon: GraduationCap,
      color: 'bg-purple-500'
    },
    {
      name: 'Bantuan Stimulan Perumahan Swadaya (BSPS)',
      category: 'Perumahan',
      beneficiaries: 44,
      budget: 1122000000,
      status: 'Aktif',
      description: 'Bantuan perbaikan dan pembangunan rumah',
      distribution: 'Sekali',
      amount: 25000000,
      icon: Home,
      color: 'bg-indigo-500'
    }
  ];

  const bansosBeneficiaryData = [
    {
      village: 'Dusun 1',
      households: 89,
      population: 267,
      programs: ['BLT', 'PKH', 'BPNT'],
      coordinator: 'Budi Santoso'
    },
    {
      village: 'Dusun 2A', 
      households: 72,
      population: 214,
      programs: ['BLT', 'BPNT', 'PIP'],
      coordinator: 'Siti Aminah'
    },
    {
      village: 'Dusun 2B',
      households: 68,
      population: 198,
      programs: ['BLT', 'BPNT'],
      coordinator: 'Rahmat Hidayat'
    },
    {
      village: 'Dusun 3A',
      households: 64,
      population: 187,
      programs: ['PKH', 'BPNT', 'BSPS'],
      coordinator: 'Ahmad Wijaya'
    },
    {
      village: 'Dusun 3B',
      households: 61,
      population: 176,
      programs: ['PKH', 'PIP'],
      coordinator: 'Nur Aini'
    },
    {
      village: 'Dusun 4',
      households: 83,
      population: 245,
      programs: ['BLT', 'PKH', 'PIP'],
      coordinator: 'Dewi Sartika'
    },
    {
      village: 'Dusun 5',
      households: 59,
      population: 169,
      programs: ['BLT', 'BPNT'],
      coordinator: 'Joko Prasetyo'
    }
  ];

  const posyanduData = [
    {
      name: 'Posyandu Melati 1',
      location: 'Dusun 1 (RT 01-03)',
      kader: '5',
      balita: '49',
      documentation: 'Sudah',
      coordinator: 'Ibu Sari Dewi',
      schedule: 'Kamis Minggu ke-2',
      phone: '0812-xxxx-xxxx',
      jadwal: 'Setiap hari Kamis minggu ke-2',
      waktu: '08.00 - 12.00 WIB',
      kegiatan: 'Penimbangan, Imunisasi, Penyuluhan',
      foto: `${import.meta.env.BASE_URL}program/kesehatan-sosial/posyandu-melati-1.jpeg`
    },
    {
      name: 'Posyandu Melati 2',
      location: 'Dusun 2 (RT 04-06)',
      kader: '5',
      balita: '48',
      documentation: 'Sudah',
      coordinator: 'Ibu Ratna Sari',
      schedule: 'Jumat Minggu ke-2',
      phone: '0812-xxxx-xxxx',
      jadwal: 'Setiap hari Jumat minggu ke-2',
      waktu: '08.00 - 12.00 WIB',
      kegiatan: 'Penimbangan, Imunisasi, Penyuluhan',
      foto: `${import.meta.env.BASE_URL}program/kesehatan-sosial/posyandu-melati-2.jpeg`
    },
    {
      name: 'Posyandu Melati 3',
      location: 'Dusun 3 (RT 07-09)',
      kader: '5',
      balita: '34',
      documentation: 'Sudah',
      coordinator: 'Ibu Maya Indah',
      schedule: 'Selasa Minggu ke-3',
      phone: '0812-xxxx-xxxx',
      jadwal: 'Setiap hari Selasa minggu ke-3',
      waktu: '08.00 - 12.00 WIB',
      kegiatan: 'Penimbangan, Imunisasi, Penyuluhan',
      foto: `${import.meta.env.BASE_URL}program/kesehatan-sosial/posyandu-melati-3.jpeg`
    },
    {
      name: 'Posyandu Melati 4',
      location: 'Dusun 4 (RT 10-12)',
      kader: '5',
      balita: '36',
      documentation: 'Sudah',
      coordinator: 'Ibu Rina Santi',
      schedule: 'Rabu Minggu ke-3',
      phone: '0812-xxxx-xxxx',
      jadwal: 'Setiap hari Rabu minggu ke-3',
      waktu: '08.00 - 12.00 WIB',
      kegiatan: 'Penimbangan, Imunisasi, Penyuluhan',
      foto: `${import.meta.env.BASE_URL}program/kesehatan-sosial/posyandu-melati-4.jpeg`
    }
  ];

  const healthServices = [
    {
      title: 'Poskesdes Fajar Baru',
      icon: Stethoscope,
      description: 'Pos Kesehatan Desa (Poskesdes) Fajar Baru adalah fasilitas kesehatan tingkat desa yang memberikan pelayanan kesehatan dasar kepada masyarakat.',
      features: [
        'Poli Umum', 
        'Pertolongan Pertama', 
        'Imunisasi', 
        'Pemeriksaan Ibu Hamil',
        'Pemeriksaan Bayi & Balita',
        'Konseling Gizi',
        'Penyuluhan Kesehatan'
      ],
      schedule: 'Senin - Sabtu, 08.00 - 14.00 WIB',
      location: 'Jl. Raya Fajar Baru No. 123, Desa Fajar Baru',
      mapLink: 'https://maps.app.goo.gl/P21CupWgcxxrBUY56',
      phone: '(021) 12345678',
      email: 'poskesdes.fajarbaru@example.com',
      facilities: [
        'Ruang Periksa', 
        'Ruang Tunggu', 
        'Apotek Desa', 
        'Ruang Konseling',
        'Tempat Cuci Taman'
      ],
      photo: `${import.meta.env.BASE_URL}program/kesehatan-sosial/poskesdes.jpg`
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-800';
      case 'Selesai': return 'bg-blue-100 text-blue-800';
      case 'Dijadwalkan': return 'bg-yellow-100 text-yellow-800';
      case 'Proses': return 'bg-orange-100 text-orange-800';
      case 'Diselesaikan': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center pt-28 md:pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4 mr-2" />
                KESEHATAN & SOSIAL DESA FAJAR BARU
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Mewujudkan <span className="text-blue-600">Masyarakat Sehat</span> 
                <br className="hidden sm:block" />dan <span className="text-blue-600">Sejahtera</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Melayani masyarakat dengan program kesehatan inklusif dan bantuan sosial
                untuk meningkatkan kualitas hidup warga Desa Fajar Baru secara menyeluruh.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Posyandu */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">6+</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Posyandu Aktif</div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Melayani pemantauan tumbuh kembang balita dan lansia di seluruh dusun</p>
              </div>
              
              {/* Cakupan Kesehatan */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">95%</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Cakupan KIA</div>
                <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Pelayanan kesehatan ibu dan anak di seluruh wilayah Desa Fajar Baru</p>
              </div>
              
              {/* Bantuan Sosial */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">156+</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Keluarga Terbantu</div>
                <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Menerima bantuan sosial dan pendampingan berkelanjutan</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                <span>Berdasarkan Peraturan Desa No. 04 Tahun 2020 tentang Kesehatan Masyarakat</span>
                <ChevronRight className="w-4 h-4 ml-1 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Objectives Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}program/kesehatan-sosial/gambar-kesehatan.jpg`}
                  alt="Program Kesehatan Desa Fajar Baru"
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Floating Achievement Cards */}
              <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-village-green" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">97%</div>
                    <div className="text-xs text-gray-600">Cakupan 2024</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">447</div>
                    <div className="text-xs text-gray-600">Penerima Bansos</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                TENTANG PROGRAM
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Dasar Hukum & 
                <span className="text-village-green"> Tujuan Program</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Program kesehatan dan sosial Desa Fajar Baru didasarkan pada UU No.6 Tahun 2014 tentang Desa 
                dan Peraturan Pemerintah terkait kesehatan desa & pelayanan sosial.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tujuan & Manfaat:</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Meningkatkan kesejahteraan dan kesehatan keluarga di Desa Fajar Baru</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Menyediakan layanan kesehatan primer yang mudah diakses</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Memantau dan menurunkan prevalensi stunting</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Menyalurkan bantuan sosial secara tepat sasaran dan transparan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Health Services - Poskesdes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              LAYANAN KESEHATAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Poskesdes 
              <span className="text-village-green">Fajar Baru</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Pusat layanan kesehatan tingkat desa yang memberikan pelayanan kesehatan dasar
              dan rujukan untuk masyarakat Desa Fajar Baru.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Image Section */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-blue-50 to-emerald-50 relative overflow-hidden">
              <img 
                src={healthServices[0].photo} 
                alt={healthServices[0].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e2f0f0f94%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e2f0f0f94%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22290.921875%22%20y%3D%22218.1%22%3E' + encodeURIComponent(healthServices[0].title) + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{healthServices[0].title}</h3>
                <p className="text-white/90">{healthServices[0].location}</p>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Description & Features */}
                <div className="md:w-1/2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-village-green to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Layanan Tersedia</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {healthServices[0].schedule}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{healthServices[0].description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Layanan Unggulan:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {healthServices[0].features.slice(0, 6).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-village-green mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Contact & Map - Sticky */}
                <div className="md:w-1/2 md:sticky md:top-24 h-fit">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Informasi Kontak</h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-village-green mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Alamat</p>
                        <p className="text-gray-800 font-medium">{healthServices[0].location}</p>
                        <a 
                          href={healthServices[0].mapLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:underline mt-1"
                        >
                          Lihat di Peta <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-village-green mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Telepon</p>
                        <a href={`tel:${healthServices[0].phone.replace(/[^0-9+]/g, '')}`} className="text-gray-800 font-medium hover:text-village-green">
                          {healthServices[0].phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-village-green mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href={`mailto:${healthServices[0].email}`} className="text-gray-800 font-medium hover:text-village-green break-all">
                          {healthServices[0].email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Fasilitas:</h5>
                    <div className="flex flex-wrap gap-2">
                      {healthServices[0].facilities.map((facility, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posyandu Directory */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              DIREKTORI POSYANDU
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Posyandu 
              <span className="text-village-green"> Desa Fajar Baru</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              6 Posyandu aktif melayani 7 dusun dengan jadwal rutin dan kader terlatih 
              untuk memastikan pelayanan kesehatan optimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posyanduData.map((posyandu, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image Section */}
                <div className="h-64 bg-gradient-to-r from-pink-100 to-red-100 relative overflow-hidden">
                  <img 
                    src={posyandu.foto} 
                    alt={posyandu.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to a solid color if image fails to load
                      e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e2f0f0f94%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e2f0f0f94%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22290.921875%22%20y%3D%22218.1%22%3E' + encodeURIComponent(posyandu.name) + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white">{posyandu.name}</h3>
                    <p className="text-white/90">{posyandu.location}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                      <p className="text-2xl font-bold text-pink-600">{posyandu.kader}</p>
                      <p className="text-sm text-gray-600">Kader</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
                      <p className="text-2xl font-bold text-amber-600">{posyandu.balita}</p>
                      <p className="text-sm text-gray-600">Balita</p>
                    </div>
                  </div>

                  {/* Schedule and Details */}
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Jadwal Kegiatan</p>
                          <p className="text-sm text-gray-600">{posyandu.jadwal}</p>
                          <p className="text-sm text-gray-600">{posyandu.waktu}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex items-start">
                        <Activity className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Kegiatan</p>
                          <p className="text-sm text-gray-600">{posyandu.kegiatan}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="flex items-start">
                        <UserCheck className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Koordinator</p>
                          <p className="text-sm text-gray-600">{posyandu.coordinator}</p>
                          <p className="text-sm text-village-green font-medium mt-1">{posyandu.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      <span>Dokumentasi: {posyandu.documentation}</span>
                    </div>
                    <button className="text-village-green hover:underline font-medium flex items-center">
                      Lihat Detail <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparansi Bantuan Sosial (dari halaman Bansos) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Summary Statistics */}
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs md:text-sm bg-white/20 px-2 md:px-3 py-1 rounded-full">Program</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{bansosStats.totalPrograms}</h3>
                <p className="text-blue-100 text-xs md:text-sm">Total Program Bansos</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Penerima</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{bansosStats.totalBeneficiaries}</h3>
                <p className="text-green-100 text-sm">Total Penerima Manfaat</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Anggaran</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{formatCurrency(bansosStats.totalBudget)}</h3>
                <p className="text-purple-100 text-sm">Total Anggaran {bansosStats.year}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Progress</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{bansosStats.completedPrograms}/{bansosStats.totalPrograms}</h3>
                <p className="text-orange-100 text-sm">Program Berjalan</p>
              </div>
            </div>
          </div>

          {/* Programs Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Program Bantuan Sosial</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {bansosPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${program.color} rounded-lg flex items-center justify-center`}>
                        <program.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{program.name}</h3>
                        <p className="text-sm text-gray-500">{program.category}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-village-green">{program.beneficiaries}</div>
                      <div className="text-xs text-gray-500">Penerima</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-bold text-village-green">{formatCurrency(program.amount)}</div>
                      <div className="text-xs text-gray-500">Per {program.distribution}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total Anggaran: {formatCurrency(program.budget)}</span>
                    <span>Distribusi: {program.distribution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficiary Distribution */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Sebaran Penerima per Wilayah</h2>
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-village-green text-white">
                    <tr>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm md:text-base">Wilayah</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-center text-sm md:text-base">KK Penerima</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-center text-sm md:text-base">Jumlah Jiwa</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-center text-sm md:text-base">Program Aktif</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm md:text-base">Koordinator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bansosBeneficiaryData.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-village-green" />
                            <span className="font-medium text-gray-800">{data.village}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-semibold text-village-green">{data.households}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-600">{data.population}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {data.programs.map((program, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {program}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{data.coordinator}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default KesehatanSosialPage;
