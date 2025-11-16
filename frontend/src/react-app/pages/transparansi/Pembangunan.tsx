import PageLayout from '@/react-app/components/PageLayout';
import { 
  Building, Car, Zap, Droplets, Wifi, TreePine,
  Calendar, MapPin, Eye, Download,
  CheckCircle, Clock, DollarSign,
  BarChart3, Target, Wrench
} from 'lucide-react';

const PembangunanPage = () => {
  const overviewStats = {
    year: 2024,
    totalProjects: 28,
    completedProjects: 19,
    ongoingProjects: 7,
    plannedProjects: 2,
    totalBudget: 4850000000,
    budgetRealized: 3455000000
  };

  const projectCategories = [
    {
      name: 'Infrastruktur Jalan',
      projects: 8,
      budget: 1650000000,
      completion: 85,
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      name: 'Fasilitas Umum',
      projects: 6,
      budget: 1200000000,
      completion: 92,
      icon: Building,
      color: 'bg-green-500'
    },
    {
      name: 'Air Bersih & Sanitasi',
      projects: 5,
      budget: 850000000,
      completion: 78,
      icon: Droplets,
      color: 'bg-cyan-500'
    },
    {
      name: 'Listrik & Energi',
      projects: 4,
      budget: 750000000,
      completion: 100,
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      name: 'Teknologi Digital',
      projects: 3,
      budget: 400000000,
      completion: 67,
      icon: Wifi,
      color: 'bg-purple-500'
    },
    {
      name: 'Lingkungan Hidup',
      projects: 2,
      budget: 300000000,
      completion: 50,
      icon: TreePine,
      color: 'bg-emerald-500'
    }
  ];

  const majorProjects = [
    {
      title: 'Pembangunan Jalan Lingkar Desa',
      description: 'Pembangunan jalan aspal sepanjang 2.5 km untuk menghubungkan seluruh wilayah desa',
      budget: 850000000,
      timeline: '8 bulan',
      startDate: '2024-03-01',
      endDate: '2024-10-31',
      progress: 78,
      status: 'Berjalan',
      contractor: 'CV. Bangun Jaya',
      beneficiaries: 2400,
      location: 'Seluruh Wilayah Desa',
      category: 'Infrastruktur',
      images: [
        'https://images.unsplash.com/photo-1581092335878-5e2b7e4e17d6?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop'
      ]
    },
    {
      title: 'Renovasi Balai Desa Modern',
      description: 'Renovasi total balai desa dengan fasilitas digital dan ramah disabilitas',
      budget: 650000000,
      timeline: '6 bulan',
      startDate: '2024-04-15',
      endDate: '2024-10-15',
      progress: 95,
      status: 'Hampir Selesai',
      contractor: 'PT. Mitra Konstruksi',
      beneficiaries: 3200,
      location: 'Balai Desa Fajar Baru',
      category: 'Fasilitas Umum',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop'
      ]
    },
    {
      title: 'Sistem Air Bersih Terintegrasi',
      description: 'Pembangunan sistem distribusi air bersih ke seluruh rumah penduduk',
      budget: 480000000,
      timeline: '10 bulan',
      startDate: '2024-02-01',
      endDate: '2024-12-01',
      progress: 65,
      status: 'Berjalan',
      contractor: 'CV. Tirta Sejahtera',
      beneficiaries: 1850,
      location: '4 Wilayah RW',
      category: 'Infrastruktur',
      images: [
        'https://images.unsplash.com/photo-1581092582155-684ac75fb9c6?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1581093458791-9d42e4b4a9d7?w=400&h=250&fit=crop'
      ]
    }
  ];

  const completedProjects = [
    {
      title: 'Digitalisasi Layanan Desa',
      description: 'Implementasi sistem pelayanan online dan website desa',
      budget: 250000000,
      completedDate: '2024-08-30',
      beneficiaries: 3200,
      contractor: 'PT. Digital Solusi'
    },
    {
      title: 'Penerangan Jalan Umum LED',
      description: 'Pemasangan lampu LED di seluruh jalan utama desa',
      budget: 180000000,
      completedDate: '2024-07-15',
      beneficiaries: 2800,
      contractor: 'CV. Cahaya Terang'
    },
    {
      title: 'Taman Bermain Anak',
      description: 'Pembangunan taman bermain dengan fasilitas lengkap',
      budget: 120000000,
      completedDate: '2024-06-20',
      beneficiaries: 650,
      contractor: 'CV. Kreasi Anak'
    },
    {
      title: 'Pos Keamanan Desa',
      description: 'Pembangunan 3 pos keamanan di titik strategis',
      budget: 95000000,
      completedDate: '2024-05-10',
      beneficiaries: 3200,
      contractor: 'CV. Bangun Aman'
    }
  ];

  const upcomingProjects = [
    {
      title: 'Pasar Desa Modern',
      description: 'Pembangunan pasar desa dengan fasilitas modern dan higienis',
      budget: 850000000,
      plannedStart: '2025-01-15',
      duration: '12 bulan',
      status: 'Tender'
    },
    {
      title: 'Pusat Kesehatan Masyarakat (Puskesmas)',
      description: 'Pembangunan puskesmas untuk melayani kebutuhan kesehatan warga',
      budget: 1200000000,
      plannedStart: '2025-03-01',
      duration: '18 bulan',
      status: 'Perencanaan'
    }
  ];

  const monthlyProgress = [
    { month: 'Jan', target: 100, realisasi: 95 },
    { month: 'Feb', target: 100, realisasi: 88 },
    { month: 'Mar', target: 100, realisasi: 92 },
    { month: 'Apr', target: 100, realisasi: 97 },
    { month: 'Mei', target: 100, realisasi: 85 },
    { month: 'Jun', target: 100, realisasi: 91 },
    { month: 'Jul', target: 100, realisasi: 89 },
    { month: 'Ags', target: 100, realisasi: 94 },
    { month: 'Sep', target: 100, realisasi: 87 },
    { month: 'Okt', target: 100, realisasi: 96 },
    { month: 'Nov', target: 100, realisasi: 83 }
  ];

  const documents = [
    {
      title: 'Rencana Kerja Pembangunan Desa 2024',
      type: 'PDF',
      size: '4.2 MB',
      date: '2024-01-10',
      description: 'Dokumen perencanaan pembangunan tahunan'
    },
    {
      title: 'Laporan Progress Triwulan III',
      type: 'PDF',
      size: '2.8 MB',
      date: '2024-10-01',
      description: 'Laporan kemajuan proyek triwulan ketiga'
    },
    {
      title: 'RAB Proyek Infrastruktur 2024',
      type: 'Excel',
      size: '3.5 MB',
      date: '2024-02-15',
      description: 'Rencana Anggaran Biaya semua proyek'
    },
    {
      title: 'Evaluasi Dampak Pembangunan',
      type: 'PDF',
      size: '1.9 MB',
      date: '2024-09-20',
      description: 'Analisis dampak pembangunan terhadap masyarakat'
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
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Berjalan': return 'bg-blue-100 text-blue-800';
      case 'Hampir Selesai': return 'bg-purple-100 text-purple-800';
      case 'Tertunda': return 'bg-red-100 text-red-800';
      case 'Perencanaan': return 'bg-gray-100 text-gray-800';
      case 'Tender': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout
      title="Laporan Pembangunan Desa"
      subtitle="Transparansi progres dan realisasi pembangunan infrastruktur dan fasilitas desa"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'Laporan Pembangunan' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Overview Statistics */}
          <section className="mb-12 md:mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl p-3 md:p-4 text-white col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">{overviewStats.totalProjects}</h3>
                <p className="text-blue-100 text-xs md:text-sm">Total Proyek {overviewStats.year}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">{overviewStats.completedProjects}</h3>
                <p className="text-green-100 text-xs">Selesai</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">{overviewStats.ongoingProjects}</h3>
                <p className="text-yellow-100 text-xs">Berjalan</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">{overviewStats.plannedProjects}</h3>
                <p className="text-purple-100 text-xs">Direncanakan</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg md:rounded-xl p-3 md:p-4 text-white col-span-2">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Realisasi</span>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1">{formatCurrency(overviewStats.budgetRealized)}</h3>
                <p className="text-red-100 text-xs md:text-sm">dari {formatCurrency(overviewStats.totalBudget)}</p>
              </div>
            </div>
          </section>

          {/* Categories Overview */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Kategori Pembangunan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projectCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.projects} proyek</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Anggaran</span>
                      <span className="text-sm font-semibold text-village-green">
                        {formatCurrency(category.budget)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-semibold text-gray-800">{category.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Major Projects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Proyek Utama Tahun Ini</h2>
            <div className="space-y-8">
              {majorProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                      {/* Project Images */}
                      <div className="lg:w-1/3 mb-6 lg:mb-0">
                        <div className="grid grid-cols-2 gap-2">
                          {project.images.map((image, imgIndex) => (
                            <img 
                              key={imgIndex}
                              src={image} 
                              alt={`${project.title} ${imgIndex + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Project Details */}
                      <div className="lg:w-2/3">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-3">{project.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-bold text-village-green">{formatCurrency(project.budget)}</div>
                            <div className="text-xs text-gray-500">Anggaran</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-bold text-village-green">{project.timeline}</div>
                            <div className="text-xs text-gray-500">Durasi</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-bold text-village-green">{project.beneficiaries}</div>
                            <div className="text-xs text-gray-500">Penerima Manfaat</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-bold text-village-green">{project.progress}%</div>
                            <div className="text-xs text-gray-500">Progress</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Progress Pekerjaan</span>
                            <span className="text-sm font-semibold text-gray-800">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-3 bg-gradient-to-r from-village-green to-blue-500 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{project.startDate} - {project.endDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wrench className="w-4 h-4" />
                            <span>{project.contractor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Monthly Progress Chart */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 text-village-green mr-2" />
                Realisasi Bulanan (%)</h2>
              <div className="space-y-4">
                {monthlyProgress.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-center">
                      <span className="text-sm font-medium text-gray-600">{data.month}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">Target</span>
                            <span className="text-xs text-gray-600">{data.target}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 bg-gray-400 rounded-full"
                              style={{ width: `${data.target}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-village-green">Realisasi</span>
                            <span className="text-xs text-village-green">{data.realisasi}%</span>
                          </div>
                          <div className="w-full bg-green-100 rounded-full h-2">
                            <div 
                              className="h-2 bg-village-green rounded-full"
                              style={{ width: `${data.realisasi}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Completed Projects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Proyek yang Telah Selesai</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {completedProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Selesai
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-bold text-village-green">{formatCurrency(project.budget)}</div>
                      <div className="text-xs text-gray-500">Anggaran</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-bold text-village-green">{project.beneficiaries}</div>
                      <div className="text-xs text-gray-500">Penerima Manfaat</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs font-bold text-village-green">{project.completedDate}</div>
                      <div className="text-xs text-gray-500">Selesai</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <Wrench className="w-4 h-4" />
                    <span>{project.contractor}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Projects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Proyek yang Akan Datang</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-bold text-village-green">{formatCurrency(project.budget)}</div>
                      <div className="text-xs text-gray-500">Anggaran</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-bold text-village-green">{project.duration}</div>
                      <div className="text-xs text-gray-500">Durasi</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs font-bold text-village-green">{project.plannedStart}</div>
                      <div className="text-xs text-gray-500">Mulai</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents and Reports */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Dokumen Pembangunan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{doc.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{doc.type} • {doc.size}</span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{doc.date}</span>
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 bg-village-green text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Unduh</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Pantau Pembangunan Desa</h2>
              <p className="text-emerald-100 max-w-2xl mx-auto mb-6">
                Ikuti perkembangan proyek pembangunan desa secara real-time. 
                Sampaikan masukan dan saran untuk pembangunan yang lebih baik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-village-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Lihat Peta Proyek
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

export default PembangunanPage;
