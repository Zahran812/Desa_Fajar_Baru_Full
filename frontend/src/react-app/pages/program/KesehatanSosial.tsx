import { 
  Heart, Users, Baby, Shield, 
  MapPin, Award, CheckCircle, Star, TrendingUp,
  Phone, FileText, Download,
  Activity, Stethoscope, UserCheck, Home,
  AlertCircle, Clock
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';

const KesehatanSosialPage = () => {
  // Updated health indicators based on the document
  const healthIndicators = [
    {
      indicator: 'Balita ditimbang',
      year2023: '95%',
      year2024: '97%',
      year2025: '98%',
      status: 'Meningkat'
    },
    {
      indicator: 'Imunisasi lengkap',
      year2023: '90%',
      year2024: '92%',
      year2025: '94%',
      status: 'Meningkat'
    },
    {
      indicator: 'ANC ≥4 kunjungan',
      year2023: '85%',
      year2024: '88%',
      year2025: '90%',
      status: 'Meningkat'
    },
    {
      indicator: 'Keluarga berisiko stunting',
      year2023: '12%',
      year2024: '10%',
      year2025: '8%',
      status: 'Menurun'
    }
  ];

  const posyanduData = [
    {
      name: 'Posyandu Melati 1',
      location: 'Dusun 1 (RT 01-03)',
      kader: '3',
      balita: '28',
      coordinator: 'Ibu Sari Dewi',
      schedule: 'Kamis Minggu ke-2',
      phone: '0812-xxxx-xxxx'
    },
    {
      name: 'Posyandu Melati 2', 
      location: 'Dusun 2A (RT 04-06)',
      kader: '3',
      balita: '32',
      coordinator: 'Ibu Ratna Sari',
      schedule: 'Jumat Minggu ke-2',
      phone: '0812-xxxx-xxxx'
    },
    {
      name: 'Posyandu Melati 3',
      location: 'Dusun 2B (RT 07-09)',
      kader: '3',
      balita: '25',
      coordinator: 'Ibu Maya Indah',
      schedule: 'Selasa Minggu ke-3',
      phone: '0812-xxxx-xxxx'
    },
    {
      name: 'Posyandu Melati 4',
      location: 'Dusun 3A (RT 10-12)',
      kader: '3',
      balita: '30',
      coordinator: 'Ibu Rina Santi',
      schedule: 'Rabu Minggu ke-3',
      phone: '0812-xxxx-xxxx'
    },
    {
      name: 'Posyandu Melati 5',
      location: 'Dusun 3B (RT 13-15)',
      kader: '3',
      balita: '22',
      coordinator: 'Ibu Desi Wulan',
      schedule: 'Kamis Minggu ke-3',
      phone: '0812-xxxx-xxxx'
    },
    {
      name: 'Posyandu Melati 6',
      location: 'Dusun 4 (RT 16-18)',
      kader: '3',
      balita: '27',
      coordinator: 'Ibu Sinta Hari',
      schedule: 'Jumat Minggu ke-3',
      phone: '0812-xxxx-xxxx'
    }
  ];

  const healthServices = [
    {
      title: 'Posyandu Balita & Lansia',
      icon: Baby,
      description: 'Penimbangan balita, pemberian PMT, imunisasi, dan konseling gizi. Pemeriksaan kesehatan rutin untuk lansia.',
      features: ['Penimbangan & Pengukuran', 'Imunisasi Dasar & Lanjutan', 'PMT untuk Balita', 'Konseling Gizi', 'Pemeriksaan Lansia'],
      schedule: 'Bulanan per RT/RW'
    },
    {
      title: 'Pelayanan Ibu Hamil & KB',
      icon: Heart,
      description: 'Pemeriksaan ANC, imunisasi ibu hamil, dan layanan KB dasar dengan rujukan ke Puskesmas.',
      features: ['Pemeriksaan ANC', 'Imunisasi Ibu Hamil', 'Layanan KB Dasar', 'Konseling Reproduksi', 'Rujukan Puskesmas'],
      schedule: 'Sesuai kebutuhan'
    },
    {
      title: 'Pencegahan & Penanganan Stunting',
      icon: Shield,
      description: 'Pemetaan keluarga berisiko, edukasi gizi, suplementasi, dan intervensi langsung.',
      features: ['Pemetaan Keluarga Berisiko', 'Edukasi Gizi', 'Suplementasi', 'Intervensi Langsung', 'Monitoring Berkala'],
      schedule: 'Program berkelanjutan'
    },
    {
      title: 'Kesehatan Lingkungan & Sanitasi',
      icon: Home,
      description: 'Program jambanisasi, pengelolaan sampah rumah tangga, dan edukasi PHBS.',
      features: ['Program Jambanisasi', 'Pengelolaan Sampah', 'Edukasi PHBS', 'Air Bersih', 'Sanitasi Lingkungan'],
      schedule: 'Program berkelanjutan'
    },
    {
      title: 'Layanan Kesehatan Bergerak',
      icon: Activity,
      description: 'Kunjungan petugas Puskesmas untuk layanan dasar (hipertensi, diabetes, dsb.).',
      features: ['Pemeriksaan Umum', 'Cek Tekanan Darah', 'Cek Gula Darah', 'Konsultasi Dokter', 'Pemberian Obat'],
      schedule: 'Mingguan'
    },
    {
      title: 'Imunisasi & Skrining Anak',
      icon: Stethoscope,
      description: 'Imunisasi dasar dan lanjutan, skrining tumbuh kembang, rujukan kasus gizi buruk.',
      features: ['Imunisasi Dasar', 'Imunisasi Lanjutan', 'Skrining Tumbuh Kembang', 'Deteksi Gizi Buruk', 'Rujukan Medis'],
      schedule: 'Sesuai jadwal nasional'
    }
  ];

  const socialPrograms = [
    {
      title: 'BLT-DD & Bantuan Sosial Desa',
      beneficiaries: '156',
      budget: 'Rp 890 Juta',
      type: 'BLT-DD',
      description: 'Bantuan Langsung Tunai Dana Desa untuk keluarga kurang mampu yang terdampak pandemi dan kesulitan ekonomi.',
      benefits: ['Bantuan tunai Rp 600.000', 'Paket sembako bulanan', 'Bantuan usaha produktif', 'Akses layanan kesehatan'],
      mechanism: 'Pendaftaran melalui RT/RW, verifikasi tim desa, penyaluran bulanan'
    },
    {
      title: 'Program Keluarga Harapan (PKH)',
      beneficiaries: '89',
      budget: 'Koordinasi Kemensos',
      type: 'PKH',
      description: 'Program bantuan sosial bersyarat untuk keluarga sangat miskin dengan fokus pendidikan dan kesehatan.',
      benefits: ['Bantuan pendidikan anak', 'Akses kesehatan gratis', 'Pendampingan sosial', 'Pelatihan keterampilan'],
      mechanism: 'Koordinasi dengan Dinas Sosial, pendampingan fasilitator desa'
    },
    {
      title: 'Bantuan Pangan Non Tunai (BPNT)',
      beneficiaries: '124',
      budget: 'Koordinasi Kemensos',
      type: 'BPNT',
      description: 'Bantuan sembako melalui kartu elektronik untuk keluarga penerima manfaat.',
      benefits: ['Beras 10 kg/bulan', 'Telur 2 kg/bulan', 'Minyak goreng', 'Gula pasir'],
      mechanism: 'Pengambilan di e-warung terdekat dengan kartu KKS'
    },
    {
      title: 'Kampung KB & Pemberdayaan Keluarga',
      beneficiaries: '78',
      budget: 'Rp 125 Juta',
      type: 'Kampung KB',
      description: 'Program pemberdayaan keluarga melalui parenting, keluarga berencana, dan ekonomi keluarga.',
      benefits: ['Edukasi parenting', 'Layanan KB gratis', 'Pelatihan ekonomi keluarga', 'Konseling keluarga'],
      mechanism: 'Kegiatan rutin bulanan, koordinasi dengan BKKBN dan PKK'
    }
  ];

  const documents = [
    {
      title: 'Jadwal Posyandu & Nama Kader',
      description: 'Daftar lengkap jadwal pelayanan Posyandu dan kontak kader di setiap dusun',
      type: 'PDF',
      size: '245 KB',
      downloadUrl: '#'
    },
    {
      title: 'Laporan Bulanan Posyandu',
      description: 'Laporan kegiatan dan pencapaian program kesehatan bulanan',
      type: 'PDF',
      size: '1.2 MB',
      downloadUrl: '#'
    },
    {
      title: 'Booklet Gizi & Pencegahan Stunting',
      description: 'Panduan lengkap gizi seimbang dan pencegahan stunting untuk keluarga',
      type: 'PDF',
      size: '3.5 MB',
      downloadUrl: '#'
    },
    {
      title: 'Formulir Permohonan Bantuan Sosial',
      description: 'Form pendaftaran untuk berbagai program bantuan sosial desa',
      type: 'PDF',
      size: '180 KB',
      downloadUrl: '#'
    },
    {
      title: 'SOP Pelayanan Kesehatan Desa',
      description: 'Standar Operasional Prosedur pelayanan kesehatan di tingkat desa',
      type: 'PDF',
      size: '890 KB',
      downloadUrl: '#'
    }
  ];

  const contacts = [
    {
      title: 'Koordinator Kader Posyandu',
      name: 'Ibu Siti Nurhalimah, S.Pd (Ketua PKK)',
      phone: '0812-7890-1234',
      description: 'Koordinasi kegiatan Posyandu dan program kesehatan desa'
    },
    {
      title: 'Puskesmas Karang Anyar',
      name: 'dr. Ahmad Fauzi',
      phone: '(0721) 555-0156',
      description: 'Puskesmas rujukan untuk pelayanan kesehatan lanjutan'
    },
    {
      title: 'Puskesmas Sinar Rejeki',
      name: 'dr. Sari Indah, M.Kes',
      phone: '(0721) 555-0178',
      description: 'Puskesmas alternatif untuk rujukan medis'
    },
    {
      title: 'Dinas Kesehatan Lampung Selatan',
      name: 'Bagian Kesehatan Masyarakat',
      phone: '(0721) 555-0200',
      description: 'Koordinasi program kesehatan tingkat kabupaten'
    }
  ];

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
                <Heart className="w-4 h-4 inline mr-2" />
                KESEHATAN & SOSIAL DESA FAJAR BARU
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Membangun Masyarakat 
                <span className="text-white"> Sehat & Sejahtera</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Desa Fajar Baru bekerja sama dengan Puskesmas setempat dan kader Posyandu/PKK 
                untuk meningkatkan akses layanan kesehatan primer, mencegah stunting, dan memberikan 
                bantuan sosial bagi keluarga rentan.
              </p>
              
              {/* Quick CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-white text-village-green px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Laporkan Keluarga Risiko
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-village-green transition-colors flex items-center justify-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Form Bantuan Sosial
                </button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">6</div>
                  <div className="text-sm text-emerald-100">Posyandu Aktif</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">18</div>
                  <div className="text-sm text-emerald-100">Kader Kesehatan</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">164</div>
                  <div className="text-sm text-emerald-100">Balita Terpantau</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">97%</div>
                  <div className="text-sm text-emerald-100">Imunisasi Lengkap</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=500&fit=crop"
                  alt="Program Kesehatan Desa Fajar Baru"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">Program Kesehatan Terpadu Desa Fajar Baru</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Info Card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-village-green to-blue-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">UU No.6 Tahun 2014</div>
                    <div className="text-xs text-gray-600">Dasar Hukum Desa</div>
                  </div>
                </div>
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
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=500&fit=crop"
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

      {/* Health Indicators Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              DATA & INDIKATOR KESEHATAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pencapaian 
              <span className="text-village-green"> Indikator Kesehatan</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Monitoring dan evaluasi pencapaian indikator kesehatan desa untuk memastikan 
              program berjalan efektif dan berkelanjutan.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Indikator</th>
                      <th className="text-center py-4 px-4 font-bold text-gray-900">2023</th>
                      <th className="text-center py-4 px-4 font-bold text-gray-900">2024</th>
                      <th className="text-center py-4 px-4 font-bold text-gray-900">2025 (Target)</th>
                      <th className="text-center py-4 px-4 font-bold text-gray-900">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthIndicators.map((indicator, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-semibold text-gray-800">{indicator.indicator}</td>
                        <td className="py-4 px-4 text-center text-gray-700">{indicator.year2023}</td>
                        <td className="py-4 px-4 text-center font-semibold text-village-green">{indicator.year2024}</td>
                        <td className="py-4 px-4 text-center text-gray-700">{indicator.year2025}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            indicator.status === 'Meningkat' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {indicator.status === 'Meningkat' ? '↗' : '↘'} {indicator.status}
                          </span>
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

      {/* Health Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              LAYANAN KESEHATAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Layanan Kesehatan 
              <span className="text-village-green"> Terpadu</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Pelayanan kesehatan komprehensif dari tingkat desa hingga rujukan ke Puskesmas 
              untuk memenuhi kebutuhan kesehatan masyarakat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {healthServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-village-green to-blue-600"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-village-green to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{service.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.schedule}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Fitur Layanan:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-village-green mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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

          <div className="grid lg:grid-cols-3 gap-8">
            {posyanduData.map((posyandu, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-red-500"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{posyandu.name}</h3>
                      <p className="text-sm text-gray-600">{posyandu.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{posyandu.kader}</p>
                      <p className="text-sm text-gray-600">Kader</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-emerald-600">{posyandu.balita}</p>
                      <p className="text-sm text-gray-600">Balita</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Koordinator</p>
                      <p className="font-semibold text-gray-900">{posyandu.coordinator}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jadwal Pelayanan</p>
                      <p className="font-semibold text-gray-900">{posyandu.schedule}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kontak</p>
                      <p className="font-semibold text-village-green">{posyandu.phone}</p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-village-green to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Hubungi Posyandu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              PROGRAM BANTUAN SOSIAL
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Bantuan Sosial 
              <span className="text-village-green"> Tepat Sasaran</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Program bantuan sosial untuk meningkatkan kesejahteraan masyarakat kurang mampu 
              dengan pendekatan yang komprehensif dan berkelanjutan.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {socialPrograms.map((program, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{program.title}</h3>
                        <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium">{program.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{program.beneficiaries}</p>
                      <p className="text-sm text-gray-600">Penerima</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-lg font-bold text-emerald-600">{program.budget}</p>
                      <p className="text-sm text-gray-600">Anggaran</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Manfaat yang Diterima:</h4>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                          <Award className="w-4 h-4 text-village-green mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Mekanisme Penyaluran:</h4>
                    <p className="text-sm text-gray-600">{program.mechanism}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Daftar Program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Download Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              DOKUMEN & UNDUHAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dokumen 
              <span className="text-village-green"> Pendukung</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Unduh dokumen penting terkait program kesehatan dan sosial untuk referensi 
              dan kemudahan akses informasi.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {documents.map((doc, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-village-green transition-colors">{doc.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{doc.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded font-medium">{doc.type}</span>
                          <span>{doc.size}</span>
                        </div>
                        <button className="bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Unduh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Emergency Info */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-village-green relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Kontak & 
              <span className="text-white"> Rujukan</span>
            </h2>
            <p className="text-emerald-100 max-w-3xl mx-auto text-lg">
              Hubungi koordinator program kesehatan dan sosial untuk informasi lebih lanjut 
              atau dalam kondisi darurat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-emerald-100 font-semibold mb-2">{contact.name}</p>
                    <p className="text-white font-mono text-lg mb-3">{contact.phone}</p>
                    <p className="text-emerald-100 text-sm">{contact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 inline-block">
              <h3 className="text-xl font-bold text-white mb-4">Kantor Desa Fajar Baru</h3>
              <div className="flex items-center justify-center space-x-6 text-emerald-100">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Jl. R.A. Basyid No.48, Fajar Baru</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>(0721) 123-456</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>08:00-16:00 WIB</span>
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

export default KesehatanSosialPage;
