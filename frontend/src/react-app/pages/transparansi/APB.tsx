import PageLayout from '@/react-app/components/PageLayout';
import { 
  DollarSign, TrendingUp, TrendingDown, PieChart, 
  Download, Calendar, Eye, BarChart3, Target, Users,
  Building, Heart, AlertCircle, CheckCircle,
  FileText, Calculator, CreditCard
} from 'lucide-react';

const APBPage = () => {
  const budgetSummary = {
    year: 2024,
    totalIncome: 2847500000,
    totalExpense: 2654300000,
    surplus: 193200000,
    realization: 89.2
  };

  const previousYears = [
    { year: 2020, income: 2100000000, expense: 2050000000, surplus: 50000000 },
    { year: 2021, income: 2350000000, expense: 2280000000, surplus: 70000000 },
    { year: 2022, income: 2580000000, expense: 2450000000, surplus: 130000000 },
    { year: 2023, income: 2720000000, expense: 2580000000, surplus: 140000000 },
    { year: 2024, income: 2847500000, expense: 2654300000, surplus: 193200000 }
  ];

  const incomeCategories = [
    {
      category: 'Dana Desa',
      amount: 1500000000,
      percentage: 52.7,
      color: 'bg-blue-500',
      source: 'Pemerintah Pusat',
      description: 'Dana transfer langsung dari APBN untuk pembangunan dan pemberdayaan'
    },
    {
      category: 'Alokasi Dana Desa (ADD)',
      amount: 650000000,
      percentage: 22.8,
      color: 'bg-green-500',
      source: 'Pemerintah Kabupaten',
      description: 'Bagian dari dana perimbangan yang diterima kabupaten'
    },
    {
      category: 'Bagi Hasil Pajak & Retribusi',
      amount: 400000000,
      percentage: 14.0,
      color: 'bg-purple-500',
      source: 'Pemerintah Daerah',
      description: 'Bagi hasil dari penerimaan pajak dan retribusi daerah'
    },
    {
      category: 'Pendapatan Asli Desa',
      amount: 297500000,
      percentage: 10.5,
      color: 'bg-orange-500',
      source: 'Desa',
      description: 'Pendapatan dari BUMDes, sewa aset, dan usaha desa lainnya'
    }
  ];

  const expenseCategories = [
    {
      category: 'Bidang Penyelenggaraan Pemerintahan Desa',
      amount: 564300000,
      percentage: 21.3,
      color: 'bg-blue-500',
      icon: Building,
      programs: [
        'Penghasilan Tetap dan Tunjangan Kepala Desa & Perangkat',
        'Operasional Perkantoran dan Pelayanan',
        'Sosialisasi Peraturan Desa',
        'Pemeliharaan Kantor dan Fasilitas'
      ]
    },
    {
      category: 'Bidang Pelaksanaan Pembangunan Desa',
      amount: 1200000000,
      percentage: 45.2,
      color: 'bg-red-500',
      icon: Building,
      programs: [
        'Pembangunan Jalan Desa (2.5 km)',
        'Renovasi Balai Desa',
        'Pembangunan Drainase dan Irigasi',
        'Sistem Air Bersih Desa'
      ]
    },
    {
      category: 'Bidang Pembinaan Kemasyarakatan',
      amount: 400000000,
      percentage: 15.1,
      color: 'bg-green-500',
      icon: Heart,
      programs: [
        'Program Posyandu dan Kesehatan',
        'Kegiatan Keagamaan dan Sosial',
        'Festival Budaya dan Seni',
        'Pembinaan Karang Taruna'
      ]
    },
    {
      category: 'Bidang Pemberdayaan Masyarakat',
      amount: 390000000,
      percentage: 14.7,
      color: 'bg-yellow-500',
      icon: Users,
      programs: [
        'Pengembangan BUMDes',
        'Pelatihan UMKM dan Keterampilan',
        'Bantuan Modal Usaha Mikro',
        'Program Ketahanan Pangan'
      ]
    },
    {
      category: 'Bidang Penanggulangan Bencana & Darurat',
      amount: 100000000,
      percentage: 3.7,
      color: 'bg-red-400',
      icon: AlertCircle,
      programs: [
        'Tanggap Darurat Bencana',
        'Penanggulangan Wabah Penyakit',
        'Bantuan Sosial Tidak Terduga',
        'Pemeliharaan Pos Keamanan'
      ]
    }
  ];

  const quarterlyProgress = [
    {
      quarter: 'Q1 2024',
      incomeTarget: 711875000,
      incomeRealized: 634567000,
      expenseTarget: 663575000,
      expenseRealized: 589432000,
      realizationRate: 89.1
    },
    {
      quarter: 'Q2 2024',
      incomeTarget: 711875000,
      incomeRealized: 698234000,
      expenseTarget: 663575000,
      expenseRealized: 612890000,
      realizationRate: 92.4
    },
    {
      quarter: 'Q3 2024',
      incomeTarget: 711875000,
      incomeRealized: 705123000,
      expenseTarget: 663575000,
      expenseRealized: 655432000,
      realizationRate: 98.8
    },
    {
      quarter: 'Q4 2024',
      incomeTarget: 711875000,
      incomeRealized: 445678000,
      expenseTarget: 663575000,
      expenseRealized: 396789000,
      realizationRate: 62.6
    }
  ];

  const majorAllocations = [
    {
      title: 'Pembangunan Infrastruktur Jalan',
      budget: 850000000,
      realization: 672500000,
      percentage: 79.1,
      description: 'Pembangunan dan pemeliharaan jalan desa sepanjang 2.5 km',
      beneficiaries: 2400,
      timeline: '8 bulan',
      status: 'Berjalan'
    },
    {
      title: 'Pengembangan BUMDes',
      budget: 250000000,
      realization: 235000000,
      percentage: 94.0,
      description: 'Modal kerja dan pengembangan unit usaha BUMDes',
      beneficiaries: 350,
      timeline: '12 bulan',
      status: 'Aktif'
    },
    {
      title: 'Program Kesehatan Masyarakat',
      budget: 180000000,
      realization: 165000000,
      percentage: 91.7,
      description: 'Operasional Posyandu dan program kesehatan preventif',
      beneficiaries: 3200,
      timeline: '12 bulan',
      status: 'Aktif'
    },
    {
      title: 'Sistem Air Bersih Desa',
      budget: 480000000,
      realization: 312000000,
      percentage: 65.0,
      description: 'Pembangunan sistem distribusi air bersih terintegrasi',
      beneficiaries: 1850,
      timeline: '10 bulan',
      status: 'Berjalan'
    }
  ];

  const budgetTransparency = [
    {
      aspect: 'Perencanaan Partisipatif',
      description: 'Melibatkan masyarakat dalam musyawarah perencanaan pembangunan desa',
      implementation: 'Musrenbangdes dengan 156 peserta dari berbagai elemen masyarakat',
      status: 'Terlaksana'
    },
    {
      aspect: 'Publikasi Anggaran',
      description: 'Memublikasikan APBDes secara terbuka dan mudah diakses',
      implementation: 'Website desa, papan pengumuman, dan media sosial resmi',
      status: 'Ongoing'
    },
    {
      aspect: 'Laporan Berkala',
      description: 'Menyampaikan laporan realisasi anggaran secara rutin',
      implementation: 'Laporan triwulan dan semester kepada masyarakat',
      status: 'Terlaksana'
    },
    {
      aspect: 'Audit dan Pengawasan',
      description: 'Pemeriksaan internal dan eksternal atas pengelolaan keuangan',
      implementation: 'Audit BPK dan pengawasan BPD serta masyarakat',
      status: 'Terlaksana'
    }
  ];

  const documents = [
    {
      title: 'APBDes 2024 - Dokumen Lengkap',
      type: 'PDF',
      size: '4.2 MB',
      date: '2024-01-15',
      downloads: 1247,
      description: 'Dokumen lengkap Anggaran Pendapatan dan Belanja Desa tahun 2024'
    },
    {
      title: 'Laporan Realisasi Semester I 2024',
      type: 'PDF', 
      size: '2.8 MB',
      date: '2024-07-01',
      downloads: 856,
      description: 'Laporan realisasi pendapatan dan belanja semester pertama'
    },
    {
      title: 'Perubahan APBDes 2024',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-07-20',
      downloads: 634,
      description: 'Dokumen perubahan anggaran desa tahun berjalan'
    },
    {
      title: 'Rincian Belanja per Program',
      type: 'Excel',
      size: '1.2 MB',
      date: '2024-11-01',
      downloads: 423,
      description: 'Detail alokasi anggaran untuk setiap program dan kegiatan'
    },
    {
      title: 'Laporan Audit BPK Tahun 2023',
      type: 'PDF',
      size: '2.1 MB',
      date: '2024-03-15',
      downloads: 789,
      description: 'Hasil audit pengelolaan keuangan desa oleh BPK'
    },
    {
      title: 'Evaluasi Kinerja Anggaran Q3 2024',
      type: 'PDF',
      size: '1.5 MB',
      date: '2024-10-15',
      downloads: 312,
      description: 'Analisis pencapaian target dan realisasi anggaran'
    }
  ];

  const publicParticipation = [
    {
      forum: 'Musyawarah Rencana Pembangunan Desa',
      date: '15 Januari 2024',
      participants: 156,
      decisions: [
        'Prioritas pembangunan jalan desa',
        'Alokasi dana untuk BUMDes',
        'Program pemberdayaan masyarakat'
      ]
    },
    {
      forum: 'Evaluasi APBDes Semester I',
      date: '20 Juli 2024',
      participants: 89,
      decisions: [
        'Penyesuaian target realisasi',
        'Realokasi anggaran infrastruktur',
        'Penambahan program kesehatan'
      ]
    },
    {
      forum: 'Rapat Evaluasi Triwulan III',
      date: '15 Oktober 2024',
      participants: 72,
      decisions: [
        'Percepatan proyek prioritas',
        'Optimalisasi PADes',
        'Persiapan anggaran 2025'
      ]
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
      case 'Terlaksana': return 'bg-green-100 text-green-800';
      case 'Berjalan': return 'bg-blue-100 text-blue-800';
      case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'Aktif': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout
      title="Anggaran Pendapatan dan Belanja Desa (APBDes)"
      subtitle="Transparansi pengelolaan keuangan desa untuk pembangunan berkelanjutan dan kesejahteraan masyarakat"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'APB Desa' }
      ]}
    >
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-3 md:px-4">
          
          {/* Summary Statistics */}
          <section className="mb-8 md:mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-2xl p-3 md:p-6 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs bg-white/20 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full">Pendapatan</span>
                </div>
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 line-clamp-2">{formatCurrency(budgetSummary.totalIncome)}</h3>
                <p className="text-blue-100 text-xs">Total Pendapatan {budgetSummary.year}</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg md:rounded-2xl p-3 md:p-6 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs bg-white/20 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full">Belanja</span>
                </div>
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 line-clamp-2">{formatCurrency(budgetSummary.totalExpense)}</h3>
                <p className="text-red-100 text-xs">Total Belanja {budgetSummary.year}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg md:rounded-2xl p-3 md:p-6 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs bg-white/20 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full">Surplus</span>
                </div>
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 line-clamp-2">{formatCurrency(budgetSummary.surplus)}</h3>
                <p className="text-green-100 text-xs">Sisa Lebih {budgetSummary.year}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg md:rounded-2xl p-3 md:p-6 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs bg-white/20 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full">Realisasi</span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">{budgetSummary.realization}%</h3>
                <p className="text-purple-100 text-xs">Target Pencapaian</p>
              </div>
            </div>
          </section>

          {/* Budget Trend */}
          <section className="mb-8 md:mb-16">
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-village-green mr-2" />
                Tren Anggaran 5 Tahun Terakhir
              </h2>
              <div className="space-y-3 md:space-y-4">
                {previousYears.map((year, index) => (
                  <div key={index} className="flex items-center space-x-2 md:space-x-4">
                    <div className="w-12 md:w-16 text-center">
                      <span className="text-xs md:text-sm font-medium text-gray-600">{year.year}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 space-y-1 md:space-y-0">
                        <span className="text-xs md:text-sm text-gray-600 truncate">Pendapatan: {formatCurrency(year.income)}</span>
                        <span className="text-xs md:text-sm text-gray-600 truncate">Belanja: {formatCurrency(year.expense)}</span>
                        <span className="text-xs md:text-sm font-semibold text-village-green truncate">Surplus: {formatCurrency(year.surplus)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                        <div 
                          className="h-2 md:h-3 bg-gradient-to-r from-village-green to-blue-500 rounded-full"
                          style={{ width: `${(year.surplus / 200000000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Income & Expense Structure */}
          <section className="mb-8 md:mb-16">
            <h2 className="text-lg md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-12">Struktur Anggaran {budgetSummary.year}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              {/* Income Structure */}
              <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
                <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                  <PieChart className="w-4 h-4 md:w-6 md:h-6 text-village-green mr-2" />
                  Sumber Pendapatan
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {incomeCategories.map((item, index) => (
                    <div key={index} className="space-y-2 md:space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-2">
                          <h4 className="text-sm md:text-base text-gray-800 font-semibold line-clamp-2">{item.category}</h4>
                          <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Sumber: {item.source}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm md:text-base text-gray-600 font-semibold">{item.percentage}%</span>
                          <p className="text-xs md:text-sm text-village-green font-medium line-clamp-2">{formatCurrency(item.amount)}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                        <div 
                          className={`h-2 md:h-3 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Structure */}
              <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
                <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                  <Calculator className="w-4 h-4 md:w-6 md:h-6 text-village-green mr-2" />
                  Alokasi Belanja
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {expenseCategories.map((item, index) => (
                    <div key={index} className="space-y-2 md:space-y-3">
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xs md:text-sm text-gray-800 font-semibold line-clamp-2 pr-2">{item.category}</h4>
                            <div className="text-right flex-shrink-0">
                              <span className="text-sm text-gray-600 font-semibold">{item.percentage}%</span>
                              <p className="text-xs md:text-sm text-village-green font-medium line-clamp-2">{formatCurrency(item.amount)}</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {item.programs.slice(0, 2).map((program, idx) => (
                              <li key={idx} className="line-clamp-1">• {program}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quarterly Progress */}
          <section className="mb-8 md:mb-16">
            <h2 className="text-lg md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-12">Realisasi Triwulan {budgetSummary.year}</h2>
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {quarterlyProgress.map((quarter, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="text-center mb-3">
                      <h3 className="text-sm md:text-lg font-semibold text-gray-800">{quarter.quarter}</h3>
                      <div className="text-lg md:text-2xl font-bold text-village-green">{quarter.realizationRate}%</div>
                      <p className="text-xs text-gray-500">Tingkat Realisasi</p>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Pendapatan</span>
                          <span>{((quarter.incomeRealized / quarter.incomeTarget) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-1.5 md:h-2">
                          <div 
                            className="h-1.5 md:h-2 bg-blue-500 rounded-full"
                            style={{ width: `${(quarter.incomeRealized / quarter.incomeTarget) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{formatCurrency(quarter.incomeRealized)}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Belanja</span>
                          <span>{((quarter.expenseRealized / quarter.expenseTarget) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-red-100 rounded-full h-1.5 md:h-2">
                          <div 
                            className="h-1.5 md:h-2 bg-red-500 rounded-full"
                            style={{ width: `${(quarter.expenseRealized / quarter.expenseTarget) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{formatCurrency(quarter.expenseRealized)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Major Allocations */}
          <section className="mb-8 md:mb-16">
            <h2 className="text-lg md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-12">Alokasi Anggaran Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {majorAllocations.map((allocation, index) => (
                <div key={index} className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="flex-1 pr-2">
                      <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{allocation.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{allocation.description}</p>
                    </div>
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(allocation.status)} flex-shrink-0`}>
                      {allocation.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs md:text-sm font-bold text-village-green line-clamp-2">{formatCurrency(allocation.budget)}</div>
                      <div className="text-xs text-gray-500">Anggaran</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs md:text-sm font-bold text-village-green">{allocation.beneficiaries}</div>
                      <div className="text-xs text-gray-500">Penerima Manfaat</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs md:text-sm font-bold text-village-green">{allocation.timeline}</div>
                      <div className="text-xs text-gray-500">Timeline</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-gray-600">Realisasi</span>
                      <span className="text-xs md:text-sm font-semibold text-gray-800">{allocation.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                      <div 
                        className="h-2 md:h-3 bg-gradient-to-r from-village-green to-blue-500 rounded-full"
                        style={{ width: `${allocation.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 line-clamp-1">{formatCurrency(allocation.realization)} dari {formatCurrency(allocation.budget)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Transparency Mechanisms */}
          <section className="mb-8 md:mb-16">
            <h2 className="text-lg md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-12">Mekanisme Transparansi</h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {budgetTransparency.map((item, index) => (
                <div key={index} className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-village-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{item.aspect}</h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-3">{item.description}</p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs md:text-sm text-gray-700 mb-2 line-clamp-3">{item.implementation}</p>
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Public Participation */}
          <section className="mb-8 md:mb-16">
            <h2 className="text-lg md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-12">Partisipasi Masyarakat</h2>
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <div className="space-y-4 md:space-y-6">
                {publicParticipation.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 border border-gray-200 rounded-lg">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 space-y-1 md:space-y-0">
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-2">{event.forum}</h3>
                        <div className="text-left md:text-right flex-shrink-0">
                          <p className="text-xs md:text-sm text-gray-600">{event.date}</p>
                          <p className="text-xs md:text-sm font-medium text-village-green">{event.participants} peserta</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs md:text-sm font-medium text-gray-700">Keputusan yang dihasilkan:</p>
                        <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                          {event.decisions.map((decision, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{decision}</span>
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

          {/* Documents and Reports */}
          <section className="mb-8 md:mb-16">
            <h2 className="text-lg md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-12">Dokumen dan Laporan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <button className="flex items-center space-x-1 bg-village-green text-white px-2 py-1 rounded-lg hover:bg-emerald-700 transition-colors text-xs flex-shrink-0">
                      <Download className="w-3 h-3" />
                      <span className="hidden sm:inline">Unduh</span>
                    </button>
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{doc.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-3">{doc.description}</p>
                  <div className="flex flex-col space-y-1 text-xs text-gray-500">
                    <div className="flex justify-between items-center">
                      <span>{doc.type} • {doc.size}</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{doc.downloads}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-lg md:rounded-2xl p-4 md:p-8 text-white text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">Komitmen Transparansi Keuangan</h2>
              <p className="text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Pemerintah Desa Fajar Baru berkomitmen untuk mengelola anggaran desa secara transparan, 
                akuntabel, dan partisipatif. Seluruh informasi keuangan desa dapat diakses oleh masyarakat 
                sebagai bentuk keterbukaan informasi publik dan membangun kepercayaan dalam pengelolaan 
                keuangan desa untuk kesejahteraan bersama.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button className="bg-white text-village-green px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base">
                  Pantau Realisasi Real-time
                </button>
                <button className="border-2 border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm md:text-base">
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

export default APBPage;
