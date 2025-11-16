import PageLayout from '@/react-app/components/PageLayout';
import { Info, Download, Calendar, Shield, Clock, Bell, FileText, Search } from 'lucide-react';
import { useState } from 'react';

const PPIDPage = () => {
  const [selectedTab, setSelectedTab] = useState<'permohonan' | 'prosedur'>('permohonan');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data PPID - dalam produksi akan diambil dari API/database
  const ppidDocuments = [
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
  ];

  const ppidData = {
    permohonan: [
      {
        kategori: 'Informasi Berkala',
        deskripsi: 'Informasi yang wajib disediakan dan diumumkan secara berkala',
        contoh: ['Profil Badan Publik', 'Ringkasan Laporan Keuangan', 'Laporan Akses Informasi Publik']
      },
      {
        kategori: 'Informasi Serta Merta',
        deskripsi: 'Informasi yang wajib diumumkan secara serta merta',
        contoh: ['Informasi keadaan darurat', 'Informasi ancaman terhadap hajat hidup orang banyak', 'Informasi peringatan dini']
      },
      {
        kategori: 'Informasi Setiap Saat',
        deskripsi: 'Informasi yang wajib tersedia setiap saat',
        contoh: ['Daftar seluruh informasi publik', 'Hasil keputusan badan publik', 'Seluruh kebijakan']
      }
    ],
    prosedur: [
      'Mengajukan permohonan informasi secara tertulis',
      'Melampirkan identitas yang sah',
      'Mencantumkan alamat yang jelas',
      'Menjelaskan informasi yang diminta',
      'Memilih cara memperoleh informasi'
    ],
    waktu: {
      segera: '3 hari kerja',
      reguler: '10 hari kerja',
      kompleks: '17 hari kerja'
    }
  };

  return (
    <PageLayout
      title="Layanan PPID"
      subtitle="Pejabat Pengelola Informasi dan Dokumentasi Desa Fajar Baru"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Layanan' },
        { name: 'PPID' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* PPID Header Info */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white mb-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Pejabat Pengelola Informasi dan Dokumentasi</h2>
                <p className="text-emerald-50 mb-4">
                  Layanan informasi publik sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">{ppidDocuments.length} Dokumen Tersedia</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">Transparan & Akuntabel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setSelectedTab('permohonan')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedTab === 'permohonan' ? 'bg-village-green text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Dokumen Informasi Publik
              </button>
              <button
                onClick={() => setSelectedTab('prosedur')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedTab === 'prosedur' ? 'bg-village-green text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Prosedur & Ketentuan
              </button>
            </div>
          </div>

          {selectedTab === 'permohonan' && (
            <div className="space-y-8">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari dokumen informasi publik..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="Informasi Berkala">Informasi Berkala</option>
                    <option value="Informasi Setiap Saat">Informasi Setiap Saat</option>
                    <option value="Informasi Serta Merta">Informasi Serta Merta</option>
                  </select>
                </div>
              </div>

              {/* Category Info Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {ppidData.permohonan.map((info, index) => {
                  const icons = [Calendar, Clock, Bell];
                  const colors = ['blue', 'emerald', 'orange'];
                  const IconComponent = icons[index];
                  const color = colors[index];
                  
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className={`w-6 h-6 text-${color}-600`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{info.kategori}</h3>
                      <p className="text-gray-600 mb-4">{info.deskripsi}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">Contoh:</h4>
                        <ul className="space-y-1">
                          {info.contoh.map((contoh, contohIndex) => (
                            <li key={contohIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-village-green rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {contoh}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Document List */}
              <div className="space-y-6">
                {['Informasi Berkala', 'Informasi Setiap Saat', 'Informasi Serta Merta'].map((category) => {
                  const docs = ppidDocuments
                    .filter(doc => doc.category === category)
                    .filter(doc => {
                      if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
                      if (searchQuery && !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
                          !doc.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                      return true;
                    });
                  
                  if (docs.length === 0) return null;

                  const categoryIcons: {[key: string]: any} = {
                    'Informasi Berkala': Calendar,
                    'Informasi Setiap Saat': Clock,
                    'Informasi Serta Merta': Bell
                  };

                  const CategoryIcon = categoryIcons[category];

                  return (
                    <div key={category} className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <CategoryIcon className="w-6 h-6 mr-2 text-emerald-600" />
                        {category}
                      </h3>
                      
                      <div className="space-y-3">
                        {docs.map((doc) => (
                          <div key={doc.id} className="border border-gray-200 rounded-lg p-5 hover:border-emerald-300 hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-2 text-lg">{doc.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(doc.published_date).toLocaleDateString('id-ID', { 
                                      day: 'numeric', 
                                      month: 'long', 
                                      year: 'numeric' 
                                    })}
                                  </span>
                                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                                    {doc.category}
                                  </span>
                                </div>
                              </div>
                              
                              {doc.document_url && (
                                <button 
                                  onClick={() => window.open(doc.document_url, '_blank')}
                                  className="flex items-center space-x-2 px-4 py-2 bg-village-green text-white hover:bg-emerald-700 rounded-lg transition-all shadow-md hover:shadow-lg"
                                >
                                  <Download className="w-4 h-4" />
                                  <span className="text-sm font-medium">Unduh</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {ppidDocuments.filter(doc => {
                  if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
                  if (searchQuery && !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
                      !doc.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                  return true;
                }).length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Tidak ada dokumen ditemukan</p>
                    <p className="text-gray-400 text-sm mt-2">Coba ubah kata kunci pencarian atau filter kategori</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'prosedur' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Prosedur Permohonan</h3>
                  <div className="space-y-4">
                    {ppidData.prosedur.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-village-green text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Waktu Layanan</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-800">Informasi Segera</span>
                      <span className="text-green-600 font-semibold">{ppidData.waktu.segera}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-800">Informasi Reguler</span>
                      <span className="text-blue-600 font-semibold">{ppidData.waktu.reguler}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                      <span className="font-medium text-gray-800">Informasi Kompleks</span>
                      <span className="text-orange-600 font-semibold">{ppidData.waktu.kompleks}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PPIDPage;
