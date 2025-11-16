import PageLayout from '@/react-app/components/PageLayout';
import { 
  Users, Heart, Home, Utensils, GraduationCap, Briefcase,
  Calendar, MapPin, Download, CheckCircle, AlertCircle,
  UserCheck, FileText, Search
} from 'lucide-react';

const BansosPage = () => {
  const bansosStats = {
    year: 2024,
    totalPrograms: 12,
    totalBeneficiaries: 847,
    totalBudget: 3254000000,
    completedPrograms: 9
  };

  const programs = [
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

  const beneficiaryData = [
    {
      village: 'Fajar Baru 1',
      households: 89,
      population: 267,
      programs: ['BLT', 'PKH', 'BPNT'],
      coordinator: 'Budi Santoso'
    },
    {
      village: 'Fajar Baru 2', 
      households: 92,
      population: 284,
      programs: ['BLT', 'BPNT', 'PIP'],
      coordinator: 'Siti Aminah'
    },
    {
      village: 'Fajar Baru 3',
      households: 76,
      population: 231,
      programs: ['PKH', 'BPNT', 'BSPS'],
      coordinator: 'Ahmad Wijaya'
    },
    {
      village: 'Fajar Baru 4',
      households: 83,
      population: 245,
      programs: ['BLT', 'PKH', 'PIP'],
      coordinator: 'Dewi Sartika'
    }
  ];

  const distributions = [
    {
      date: '2024-11-01',
      program: 'BLT November 2024',
      beneficiaries: 235,
      amount: 70500000,
      location: 'Balai Desa',
      status: 'Selesai'
    },
    {
      date: '2024-10-25',
      program: 'BPNT Oktober 2024',
      beneficiaries: 156,
      amount: 39000000,
      location: 'Kantor Pos Desa',
      status: 'Selesai'
    },
    {
      date: '2024-10-15',
      program: 'PKH Triwulan IV',
      beneficiaries: 189,
      amount: 94500000,
      location: 'Bank BRI Unit Desa',
      status: 'Selesai'
    },
    {
      date: '2024-12-01',
      program: 'BLT Desember 2024',
      beneficiaries: 235,
      amount: 70500000,
      location: 'Balai Desa',
      status: 'Dijadwalkan'
    },
    {
      date: '2024-12-15',
      program: 'BPNT November 2024',
      beneficiaries: 156,
      amount: 39000000,
      location: 'Kantor Pos Desa',
      status: 'Dijadwalkan'
    }
  ];

  const documents = [
    {
      title: 'Data Penerima Bantuan Sosial 2024',
      type: 'PDF',
      size: '3.2 MB',
      date: '2024-01-15',
      description: 'Daftar lengkap penerima bansos dengan nama dan alamat'
    },
    {
      title: 'Laporan Penyaluran BLT Q3 2024',
      type: 'PDF',
      size: '1.8 MB', 
      date: '2024-10-01',
      description: 'Laporan distribusi BLT triwulan ketiga'
    },
    {
      title: 'Verifikasi Data PKH 2024',
      type: 'Excel',
      size: '2.1 MB',
      date: '2024-07-20',
      description: 'Data verifikasi dan validasi penerima PKH'
    },
    {
      title: 'Monitoring BPNT Semester I',
      type: 'PDF',
      size: '1.5 MB',
      date: '2024-06-30',
      description: 'Laporan monitoring penyaluran BPNT'
    }
  ];

  const complaints = [
    {
      date: '2024-10-28',
      type: 'Data Tidak Akurat',
      description: 'Nama tidak sesuai dengan KTP',
      status: 'Diselesaikan',
      response: '2 hari'
    },
    {
      date: '2024-10-25',
      type: 'Belum Menerima',
      description: 'BLT Oktober belum diterima',
      status: 'Proses',
      response: '1 hari'
    },
    {
      date: '2024-10-20',
      type: 'Duplikasi Data',
      description: 'Terdaftar di 2 program sekaligus',
      status: 'Diselesaikan',
      response: '3 hari'
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
    <PageLayout
      title="Bantuan Sosial (Bansos)"
      subtitle="Transparansi penyaluran bantuan sosial dan program pemberdayaan masyarakat"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'Bantuan Sosial' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Summary Statistics */}
          <section className="mb-12 md:mb-16">
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
          </section>

          {/* Programs Overview */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Program Bantuan Sosial</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {programs.map((program, index) => (
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
          </section>

          {/* Beneficiary Distribution */}
          <section className="mb-12 md:mb-16">
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
                    {beneficiaryData.map((data, index) => (
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
          </section>

          {/* Distribution Schedule */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Jadwal Penyaluran</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                {distributions.map((distribution, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-village-green rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{distribution.program}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{distribution.date}</span>
                          <span>•</span>
                          <span>{distribution.beneficiaries} penerima</span>
                          <span>•</span>
                          <span>{distribution.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-village-green">
                        {formatCurrency(distribution.amount)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(distribution.status)}`}>
                        {distribution.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Documents and Reports */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Dokumen dan Laporan</h2>
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

          {/* Complaints and Feedback */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Pengaduan dan Tanggapan</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                {complaints.map((complaint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{complaint.type}</h3>
                        <p className="text-gray-600 text-sm">{complaint.description}</p>
                        <div className="text-xs text-gray-500 mt-1">{complaint.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Respon: {complaint.response}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Search and Report */}
          <section>
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Cek Status Bantuan Sosial</h2>
              <p className="text-emerald-100 max-w-2xl mx-auto mb-6">
                Cek status penerimaan bantuan sosial Anda atau laporkan jika ada masalah 
                dalam penyaluran bantuan. Tim kami siap membantu Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-village-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Cek Status Bansos
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Laporkan Masalah
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default BansosPage;
