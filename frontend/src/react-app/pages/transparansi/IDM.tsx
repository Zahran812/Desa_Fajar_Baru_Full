import PageLayout from '@/react-app/components/PageLayout';
import { 
  TrendingUp, Briefcase, Heart,
  Zap, Leaf, Award, BarChart3, Target, CheckCircle
} from 'lucide-react';

const IDMPage = () => {
  const currentIDM = {
    year: 2024,
    score: 0.7856,
    status: 'Berkembang',
    rank: 12,
    totalVillages: 156
  };

  const previousYears = [
    { year: 2020, score: 0.6234, status: 'Tertinggal' },
    { year: 2021, score: 0.6789, status: 'Berkembang' },
    { year: 2022, score: 0.7123, status: 'Berkembang' },
    { year: 2023, score: 0.7456, status: 'Berkembang' },
    { year: 2024, score: 0.7856, status: 'Berkembang' }
  ];

  const dimensions = [
    {
      name: 'IKS (Indeks Ketahanan Sosial)',
      score: 0.8245,
      description: 'Mengukur ketahanan sosial masyarakat desa',
      indicators: [
        { name: 'Kesehatan', value: 85, status: 'Baik' },
        { name: 'Pendidikan', value: 82, status: 'Baik' },
        { name: 'Modal Sosial', value: 78, status: 'Cukup' }
      ],
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      name: 'IKE (Indeks Ketahanan Ekonomi)', 
      score: 0.7634,
      description: 'Mengukur ketahanan ekonomi dan kesejahteraan',
      indicators: [
        { name: 'Keragaman Produksi', value: 75, status: 'Cukup' },
        { name: 'Tersedia Pusat Perdagangan', value: 80, status: 'Baik' },
        { name: 'Akses Distribusi', value: 73, status: 'Cukup' }
      ],
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      name: 'IKL (Indeks Ketahanan Ekologi)',
      score: 0.7689,
      description: 'Mengukur kualitas lingkungan dan sumber daya alam',
      indicators: [
        { name: 'Kualitas Lingkungan', value: 79, status: 'Baik' },
        { name: 'Potensi Rawan Bencana', value: 88, status: 'Baik' },
        { name: 'Iklim', value: 65, status: 'Cukup' }
      ],
      icon: Leaf,
      color: 'bg-blue-500'
    }
  ];

  const achievements = [
    {
      title: 'Naik Status dari Tertinggal ke Berkembang',
      year: '2021',
      description: 'Berhasil meningkatkan status desa dari tertinggal menjadi berkembang dalam waktu 2 tahun',
      icon: TrendingUp
    },
    {
      title: 'Ranking 12 dari 156 Desa',
      year: '2024', 
      description: 'Masuk dalam 10% teratas desa terbaik di kabupaten berdasarkan IDM',
      icon: Award
    },
    {
      title: 'Peningkatan IKS Tertinggi',
      year: '2023',
      description: 'Memiliki peningkatan Indeks Ketahanan Sosial tertinggi di kecamatan',
      icon: Heart
    },
    {
      title: 'Program Digitalisasi Terdepan',
      year: '2024',
      description: 'Menjadi desa percontohan implementasi teknologi digital di Lampung Selatan',
      icon: Zap
    }
  ];

  const programs = [
    {
      category: 'Ketahanan Sosial',
      programs: [
        'Perbaikan fasilitas kesehatan (Puskesmas Pembantu)',
        'Program beasiswa untuk anak kurang mampu',
        'Pelatihan keterampilan untuk ibu-ibu PKK',
        'Pembentukan kelompok gotong royong pemuda'
      ]
    },
    {
      category: 'Ketahanan Ekonomi',
      programs: [
        'Pengembangan BUMDes dengan 5 unit usaha',
        'Pembangunan pasar desa modern',
        'Program kredit mikro untuk UMKM',
        'Pelatihan teknologi pertanian modern'
      ]
    },
    {
      category: 'Ketahanan Ekologi',
      programs: [
        'Program bank sampah dan daur ulang',
        'Penanaman 1000 pohon per tahun',
        'Sistem pengelolaan air bersih komunal',
        'Edukasi lingkungan untuk anak sekolah'
      ]
    }
  ];

  const futureTargets = [
    {
      target: 'Mencapai Status Mandiri',
      timeline: '2026',
      currentProgress: 78,
      description: 'Target mencapai skor IDM di atas 0.8155 untuk status desa mandiri'
    },
    {
      target: 'Ranking 5 Besar Kabupaten',
      timeline: '2025',
      currentProgress: 65,
      description: 'Masuk dalam 5 besar desa terbaik di Kabupaten Lampung Selatan'
    },
    {
      target: 'Skor IKS di atas 0.85',
      timeline: '2025',
      currentProgress: 82,
      description: 'Meningkatkan ketahanan sosial melalui program pendidikan dan kesehatan'
    },
    {
      target: 'Skor IKE di atas 0.80',
      timeline: '2026',
      currentProgress: 76,
      description: 'Memperkuat ekonomi desa melalui diversifikasi usaha dan inovasi'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Mandiri': return 'bg-green-500';
      case 'Maju': return 'bg-blue-500';
      case 'Berkembang': return 'bg-yellow-500';
      case 'Tertinggal': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getIndicatorColor = (status: string) => {
    switch (status) {
      case 'Baik': return 'text-green-600 bg-green-100';
      case 'Cukup': return 'text-yellow-600 bg-yellow-100';
      case 'Kurang': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <PageLayout
      title="Indeks Desa Membangun (IDM)"
      subtitle="Transparansi perkembangan dan capaian pembangunan desa berdasarkan standar nasional"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'IDM' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Current IDM Score */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-village-green to-blue-600 rounded-3xl p-8 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Skor IDM Desa Fajar Baru {currentIDM.year}</h2>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{currentIDM.score}</div>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(currentIDM.status)} text-white`}>
                      Status: {currentIDM.status}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">#{currentIDM.rank}</div>
                    <div className="text-emerald-100">
                      dari {currentIDM.totalVillages} desa di kabupaten
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trend Chart */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 text-village-green mr-2" />
                Tren Perkembangan IDM
              </h2>
              <div className="space-y-4">
                {previousYears.map((year, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-center">
                      <span className="text-sm font-medium text-gray-600">{year.year}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-800">{year.score}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(year.status)} text-white`}>
                          {year.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 bg-gradient-to-r from-village-green to-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${year.score * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Dimensions Breakdown */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Rincian Dimensi IDM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {dimensions.map((dimension, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 ${dimension.color} rounded-lg flex items-center justify-center`}>
                      <dimension.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{dimension.name}</h3>
                      <p className="text-2xl font-bold text-village-green">{dimension.score}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{dimension.description}</p>
                  <div className="space-y-3">
                    {dimension.indicators.map((indicator, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{indicator.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{indicator.value}%</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getIndicatorColor(indicator.status)}`}>
                            {indicator.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Pencapaian dan Prestasi</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-village-green to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{achievement.title}</h3>
                        <span className="bg-village-green text-white px-2 py-1 rounded text-xs font-medium">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Programs and Initiatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Program Peningkatan IDM</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {programs.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-village-green mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.programs.map((program, programIndex) => (
                      <li key={programIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Future Targets */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Target Pencapaian</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {futureTargets.map((target, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{target.target}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Target {target.timeline}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{target.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Progress saat ini</span>
                      <span className="text-sm font-semibold text-village-green">{target.currentProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-village-green to-blue-500 rounded-full"
                        style={{ width: `${target.currentProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Commitment Statement */}
          <section>
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Komitmen Berkelanjutan</h2>
              <p className="text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-6">
                Pemerintah Desa Fajar Baru berkomitmen untuk terus meningkatkan Indeks Desa Membangun 
                melalui program-program pembangunan yang terukur, berkelanjutan, dan partisipatif. 
                Transparansi data IDM menjadi bagian dari akuntabilitas publik dalam mencapai 
                visi desa mandiri dan sejahtera.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-village-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Unduh Laporan IDM Lengkap
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Sampaikan Masukan
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default IDMPage;
