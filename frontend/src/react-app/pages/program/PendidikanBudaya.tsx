import { 
  GraduationCap, BookOpen, Users, Star, Award, Music, 
  Baby, School, Trophy, Camera, Theater, FileText,
  CheckCircle, TrendingUp, Download,
  Calendar, MapPin
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';

const PendidikanBudayaPage = () => {
  const educationStats = [
    {
      icon: School,
      value: '2',
      label: 'SD & SMP',
      color: 'blue'
    },
    {
      icon: Baby,
      value: '3',
      label: 'PAUD/Taman Bacaan',
      color: 'emerald'
    },
    {
      icon: Users,
      value: '190',
      label: 'Total Siswa',
      color: 'purple'
    },
    {
      icon: Trophy,
      value: '95%',
      label: 'Capaian UN/UNBK',
      color: 'orange'
    }
  ];

  // Data indikator berdasarkan dokumen
  const indicatorData = [
    {
      indicator: 'Jumlah SD & SMP',
      '2023': '2',
      '2024': '2', 
      '2025': '2'
    },
    {
      indicator: 'Jumlah siswa',
      '2023': '180',
      '2024': '185',
      '2025': '190'
    },
    {
      indicator: 'Capaian UN/UNBK (%)',
      '2023': '92%',
      '2024': '93%',
      '2025': '95%'
    },
    {
      indicator: 'PAUD / Taman Bacaan',
      '2023': '2',
      '2024': '2',
      '2025': '3'
    },
    {
      indicator: 'Program ekstrakurikuler aktif',
      '2023': '5',
      '2024': '6',
      '2025': '7'
    },
    {
      indicator: 'Event budaya tahunan',
      '2023': '1',
      '2024': '1',
      '2025': '1'
    }
  ];

  const formalEducation = [
    {
      name: 'SD Negeri Fajar Baru',
      level: 'Sekolah Dasar',
      students: '110',
      classes: '6',
      teachers: '8',
      achievements: ['Juara 1 Lomba Sains Tingkat Kecamatan', 'Prestasi Olimpiade Matematika', 'Sekolah Adiwiyata Tingkat Kabupaten']
    },
    {
      name: 'SMP Negeri 2 Jati Agung',
      level: 'Sekolah Menengah Pertama',
      students: '80',
      classes: '6',
      teachers: '12',
      achievements: ['Juara 2 Festival Budaya Kabupaten', 'Prestasi UN Terbaik Kecamatan', 'Tim Robotika Tingkat Provinsi']
    }
  ];

  const nonFormalEducation = [
    {
      title: 'PAUD Desa Fajar Baru',
      icon: Baby,
      participants: '45',
      description: 'Pendidikan Anak Usia Dini untuk anak 3-6 tahun dengan kurikulum bermain sambil belajar',
      programs: ['Bermain dan Belajar', 'Motorik Halus dan Kasar', 'Sosialisasi Anak', 'Persiapan Sekolah Dasar']
    },
    {
      title: 'Taman Bacaan Desa',
      icon: BookOpen,
      participants: '65',
      description: 'Program literasi untuk anak dan remaja dengan koleksi buku dan kegiatan membaca',
      programs: ['Perpustakaan Keliling', 'Lomba Membaca', 'Dongeng untuk Anak', 'Klub Menulis Kreatif']
    },
    {
      title: 'Pelatihan Keterampilan Remaja',
      icon: Users,
      participants: '35',
      description: 'Program pelatihan komputer, bahasa Inggris, dan wirausaha untuk remaja desa',
      programs: ['Komputer Dasar', 'Bahasa Inggris', 'Wirausaha Muda', 'Literasi Digital']
    }
  ];

  const scholarshipPrograms = [
    {
      name: 'Beasiswa Prestasi Akademik',
      recipients: '15',
      amount: 'Rp 1.500.000',
      coverage: 'SPP + Buku + Seragam',
      criteria: ['Ranking 1-3 di kelas', 'Nilai rata-rata ≥ 85', 'Keluarga kurang mampu']
    },
    {
      name: 'Bantuan Pendidikan Dhuafa',
      recipients: '25',
      amount: 'Rp 1.000.000',
      coverage: 'SPP + Perlengkapan Sekolah',
      criteria: ['Kondisi ekonomi sangat kurang', 'Yatim/piatu/yatim piatu', 'Masih aktif sekolah']
    },
    {
      name: 'Beasiswa Prestasi Non-Akademik',
      recipients: '10',
      amount: 'Rp 1.200.000',
      coverage: 'SPP + Alat Olahraga/Seni',
      criteria: ['Juara lomba tingkat kabupaten', 'Aktif ekstrakurikuler', 'Berbakat seni/olahraga']
    }
  ];

  const culturalPrograms = [
    {
      title: 'Seni Tari Tradisional Siger',
      icon: Music,
      members: '28',
      description: 'Pelestarian tarian tradisional Lampung dengan inovasi modern untuk generasi muda',
      achievements: ['Festival Adat Lampung 2024', 'Juara 1 Lomba Tari Daerah', 'Tampil di Acara Kabupaten']
    },
    {
      title: 'Orkestra Gamelan Desa',
      icon: Theater,
      members: '22',
      description: 'Kelompok musik tradisional gamelan Lampung untuk acara adat dan festival budaya',
      achievements: ['Album Musik Tradisional', 'Pertunjukan Rutin Bulanan', 'Kolaborasi Musisi Modern']
    },
    {
      title: 'Teater Rakyat & Storytelling',
      icon: Camera,
      members: '18',
      description: 'Dokumentasi dan pertunjukan cerita rakyat Lampung untuk anak-anak dan masyarakat',
      achievements: ['Buku Cerita Rakyat Desa', 'Video Dokumenter Budaya', 'Festival Dongeng Anak']
    }
  ];

  const extracurricularActivities = [
    {
      title: 'Kompetisi Membaca & Menulis',
      participants: '45',
      type: 'Literasi',
      schedule: 'Setiap Sabtu, 08:00-11:00',
      location: 'Balai Desa Fajar Baru'
    },
    {
      title: 'Lomba Sains Remaja',
      participants: '30',
      type: 'Akademik',
      schedule: 'Setiap Minggu, 13:00-16:00', 
      location: 'SD Negeri Fajar Baru'
    },
    {
      title: 'Workshop Batik & Tenun Lampung',
      participants: '25',
      type: 'Seni & Budaya',
      schedule: 'Setiap Selasa & Kamis, 15:00-17:00',
      location: 'Gedung Serbaguna Desa'
    },
    {
      title: 'Bimbingan Belajar Tambahan',
      participants: '60',
      type: 'Akademik',
      schedule: 'Senin-Jumat, 19:00-21:00',
      location: 'Balai Desa Fajar Baru'
    }
  ];

  const documents = [
    {
      title: 'Profil Sekolah & PAUD',
      description: 'Informasi lengkap tentang sekolah formal dan PAUD di desa',
      type: 'PDF',
      size: '2.5 MB'
    },
    {
      title: 'Jadwal Ekstrakurikuler & Pelatihan Remaja',
      description: 'Jadwal lengkap kegiatan ekstrakurikuler dan pelatihan keterampilan',
      type: 'PDF', 
      size: '1.8 MB'
    },
    {
      title: 'Panduan Pelestarian Budaya & Kegiatan Seni',
      description: 'Panduan lengkap kegiatan seni dan budaya tradisional Lampung',
      type: 'PDF',
      size: '3.2 MB'
    },
    {
      title: 'Formulir Beasiswa / Dukungan Pendidikan',
      description: 'Formulir pendaftaran beasiswa dan bantuan pendidikan',
      type: 'PDF',
      size: '1.2 MB'
    }
  ];

  const getIconColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50 text-gray-600';
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
                <GraduationCap className="w-4 h-4 inline mr-2" />
                PENDIDIKAN & BUDAYA DESA FAJAR BARU
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Membangun Generasi 
                <span className="text-white"> Cerdas & Berbudaya</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Berkomitmen meningkatkan kualitas pendidikan formal dan non-formal serta 
                melestarikan budaya lokal Lampung untuk generasi mendatang yang berkarakter.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8">
                <p className="text-sm text-emerald-100 mb-2">Dasar Hukum:</p>
                <p className="text-white font-medium">UU No.20 Tahun 2003 tentang Sistem Pendidikan Nasional</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">2</div>
                  <div className="text-sm text-emerald-100">SD & SMP</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">3</div>
                  <div className="text-sm text-emerald-100">PAUD</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">190</div>
                  <div className="text-sm text-emerald-100">Total Siswa</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">95%</div>
                  <div className="text-sm text-emerald-100">Capaian UN</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=500&fit=crop"
                  alt="Program Pendidikan Desa"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">Pendidikan Berkualitas & Budaya Lestari</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-village-green to-blue-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Prestasi Terbaik</div>
                    <div className="text-xs text-gray-600">Tingkat Kabupaten</div>
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
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=500&fit=crop"
                  alt="Program Pendidikan"
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-village-green" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">95%</div>
                    <div className="text-xs text-gray-600">Capaian UN</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">140</div>
                    <div className="text-xs text-gray-600">Peserta Program</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                TENTANG PROGRAM
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Pendidikan Berkualitas & Pelestarian 
                <span className="text-village-green"> Budaya Lampung</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Desa Fajar Baru berkomitmen untuk meningkatkan kualitas pendidikan formal dan non-formal 
                bagi anak-anak, remaja, dan masyarakat umum, serta melestarikan budaya lokal Lampung 
                melalui kegiatan seni, tradisi, dan komunitas kreatif.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Pendidikan formal: SD Negeri Fajar Baru & SMP Negeri 2 Jati Agung</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">PAUD dan Taman Bacaan untuk pendidikan anak usia dini</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Pelatihan keterampilan: komputer, bahasa Inggris, dan wirausaha</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-village-green to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Pelestarian seni tradisional: tari Siger, gamelan, dan teater rakyat</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  <Award className="w-5 h-5" />
                  Daftar Beasiswa
                </button>
                <button className="btn-outline">
                  <BookOpen className="w-5 h-5" />
                  Info Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              STATISTIK PENDIDIKAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Data & Indikator 
              <span className="text-village-green"> Pendidikan & Budaya</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Perkembangan indikator pendidikan dan budaya Desa Fajar Baru 
              dalam tiga tahun terakhir (2023-2025).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {educationStats.map((stat, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-village-green to-blue-600"></div>
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 ${getIconColorClass(stat.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-2 bg-gradient-to-r from-village-green to-blue-600"></div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Indikator Pendidikan & Budaya (2023-2025)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Indikator</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">2023</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">2024</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indicatorData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{row.indicator}</td>
                        <td className="py-4 px-6 text-center text-gray-700">{row['2023']}</td>
                        <td className="py-4 px-6 text-center text-gray-700">{row['2024']}</td>
                        <td className="py-4 px-6 text-center text-emerald-600 font-semibold">{row['2025']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Education */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              PENDIDIKAN FORMAL
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sekolah 
              <span className="text-village-green"> Berkualitas</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Pendidikan formal yang berstandar nasional dengan fokus pada prestasi akademik 
              dan pengembangan karakter siswa.
            </p>
          </div>

          <div className="space-y-8">
            {formalEducation.map((school, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-village-green to-blue-600"></div>
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-village-green to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{school.name}</h3>
                          <p className="text-gray-600">{school.level}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-gray-900">{school.students}</p>
                          <p className="text-sm text-gray-600">Siswa</p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-emerald-600">{school.classes}</p>
                          <p className="text-sm text-gray-600">Kelas</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-blue-600">{school.teachers}</p>
                          <p className="text-sm text-gray-600">Guru</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Prestasi & Pencapaian</h4>
                        <ul className="space-y-2">
                          {school.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-center text-sm text-gray-600">
                              <Trophy className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <School className="w-10 h-10 text-emerald-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Status</p>
                        <p className="text-xl font-bold text-gray-900">Aktif</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Formal Education */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              PENDIDIKAN NON-FORMAL
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              PAUD & Pelatihan 
              <span className="text-village-green"> Keterampilan</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Program pendidikan non-formal untuk anak usia dini dan pelatihan keterampilan 
              yang mendukung pengembangan potensi masyarakat.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {nonFormalEducation.map((program, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.participants} peserta</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Program Kegiatan</h4>
                    <ul className="space-y-2">
                      {program.programs.map((activity, activityIndex) => (
                        <li key={activityIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-village-green mr-3 flex-shrink-0" />
                          {activity}
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

      {/* Scholarship Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              PROGRAM BEASISWA
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Beasiswa & Dukungan 
              <span className="text-village-green"> Pendidikan</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Bantuan pendidikan untuk siswa berprestasi dan keluarga kurang mampu 
              melalui kolaborasi Pemdes, Dinas Pendidikan, dan CSR lokal.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {scholarshipPrograms.map((scholarship, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{scholarship.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{scholarship.recipients}</p>
                      <p className="text-sm text-gray-600">Penerima</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-lg font-bold text-emerald-600">{scholarship.amount}</p>
                      <p className="text-sm text-gray-600">per Tahun</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Cakupan Bantuan</p>
                    <p className="font-semibold text-gray-900">{scholarship.coverage}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Persyaratan</h4>
                    <ul className="space-y-2">
                      {scholarship.criteria.map((criteria, criteriaIndex) => (
                        <li key={criteriaIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-village-green mr-3 flex-shrink-0" />
                          {criteria}
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

      {/* Cultural Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              PROGRAM BUDAYA & SENI
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pelestarian Seni & 
              <span className="text-village-green"> Budaya Lampung</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Kegiatan rutin pelestarian seni dan budaya tradisional Lampung melalui 
              festival adat, lomba tarian daerah, dan pembentukan kelompok seni.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {culturalPrograms.map((program, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.members} anggota aktif</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Prestasi & Pencapaian</h4>
                    <ul className="space-y-2">
                      {program.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0" />
                          {achievement}
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

      {/* Extracurricular Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              EKSTRAKURIKULER & PELATIHAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kegiatan 
              <span className="text-village-green"> Pengembangan Bakat</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Program ekstrakurikuler dan pelatihan keterampilan untuk mengembangkan 
              potensi anak dan remaja di berbagai bidang.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {extracurricularActivities.map((activity, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.type}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{activity.participants}</p>
                      <p className="text-sm text-gray-600">Peserta</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-sm font-bold text-emerald-600">{activity.schedule}</p>
                      <p className="text-xs text-gray-600">Jadwal</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 text-village-green mr-2" />
                    <span>{activity.location}</span>
                  </div>

                  <button className="w-full btn-outline group-hover:btn-primary transition-all duration-300">
                    <Calendar className="w-4 h-4" />
                    Jadwal Kegiatan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              DOKUMEN & UNDUHAN
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dokumen 
              <span className="text-village-green"> Pendidikan & Budaya</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Dokumen penting terkait program pendidikan dan budaya yang dapat diunduh 
              untuk referensi dan pendaftaran.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {documents.map((doc, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-red-500 to-pink-600"></div>
                <div className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">{doc.type}</span>
                          <span>{doc.size}</span>
                        </div>
                        <button className="btn-outline text-sm group-hover:btn-primary transition-all duration-300">
                          <Download className="w-4 h-4" />
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
                Kontak & Rujukan 
                <span className="text-white">Pendidikan & Budaya</span>
              </h2>
              <p className="text-emerald-100 mb-8 text-lg">
                Hubungi koordinator dan pengurus program pendidikan dan budaya 
                untuk informasi lebih lanjut atau pendaftaran kegiatan.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Kepala Sekolah SD & SMP</div>
                    <div className="text-emerald-100">Bapak Sutrisno, S.Pd | 0812-3456-7890</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <Baby className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Koordinator PAUD / Taman Bacaan</div>
                    <div className="text-emerald-100">Ibu Sari Dewi, S.Pd | 0813-4567-8901</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Pengurus Kelompok Seni & Budaya</div>
                    <div className="text-emerald-100">Bapak Agus Pratama | 0814-5678-9012</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Kantor Desa Fajar Baru</div>
                    <div className="text-emerald-100">Jl. Raya Fajar Baru No. 123, Jati Agung</div>
                    <div className="text-emerald-100">Senin-Jumat: 08:00-16:00 WIB</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-village-green px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Daftar Program
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-village-green transition-colors flex items-center justify-center">
                  <Award className="w-5 h-5 mr-2" />
                  Info Beasiswa
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=400&fit=crop"
                  alt="Kegiatan Pendidikan & Budaya"
                  className="w-full h-80 object-cover rounded-xl"
                />
                
                {/* Education Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Festival Budaya Desa Fajar Baru</h4>
                  <p className="text-gray-600 text-sm">Event tahunan pelestarian budaya Lampung</p>
                  <div className="flex items-center mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 text-sm font-medium">Program Aktif</span>
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

export default PendidikanBudayaPage;
