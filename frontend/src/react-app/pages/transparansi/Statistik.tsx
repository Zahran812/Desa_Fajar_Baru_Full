import { useState } from 'react';
import PageLayout from '@/react-app/components/PageLayout';
import { 
  BarChart3, Users, User, Heart, Home, 
  TrendingUp, PieChart, Activity, Target, Database,
  ArrowLeft, Eye, Download
} from 'lucide-react';

const StatistikPage = () => {
  const [activeCategory, setActiveCategory] = useState('penduduk');
  const [activeSubcategory, setActiveSubcategory] = useState('jenis-kelamin');

  const categories = [
    {
      id: 'penduduk',
      label: 'Statistik Penduduk',
      icon: Users,
      subcategories: [
        { id: 'jenis-kelamin', label: 'Jenis Kelamin', count: 3247 },
        { id: 'agama', label: 'Agama', count: 3247 },
        { id: 'kelompok-umur', label: 'Kelompok Umur', count: 3247 },
        { id: 'kategori-umur', label: 'Kategori Umur', count: 3247 },
        { id: 'status-perkawinan', label: 'Status Perkawinan', count: 3247 },
        { id: 'pendidikan', label: 'Pendidikan', count: 3247 },
        { id: 'pekerjaan', label: 'Pekerjaan', count: 3247 },
        { id: 'disabilitas', label: 'Disabilitas', count: 3247 },
        { id: 'golongan-darah', label: 'Golongan Darah', count: 2847 },
        { id: 'suku-etnis', label: 'Suku/Etnis', count: 3247 },
        { id: 'status-penduduk', label: 'Status Penduduk', count: 3247 },
        { id: 'penduduk-wilayah', label: 'Penduduk per Wilayah', count: 3247 }
      ]
    },
    {
      id: 'keluarga',
      label: 'Statistik Keluarga',
      icon: Home,
      subcategories: [
        { id: 'hubungan-keluarga', label: 'Hubungan Keluarga', count: 820 },
        { id: 'kelas-sosial', label: 'Kelas Sosial', count: 820 }
      ]
    },
    {
      id: 'bantuan',
      label: 'Statistik Bantuan',
      icon: Heart,
      subcategories: [
        { id: 'bantuan-keluarga', label: 'Bantuan Keluarga', count: 156 },
        { id: 'bantuan-individual', label: 'Bantuan Individual', count: 89 }
      ]
    }
  ];

  // Data untuk berbagai kategori statistik
  const statisticData = {
    'golongan-darah': {
      total: 2847,
      terbanyak: { type: 'O', percentage: 43.4 },
      rhesusPositif: { count: 2645, percentage: 92.9 },
      distribution: [
        { type: 'O', count: 1234, percentage: 43.4, color: 'bg-red-500' },
        { type: 'A', count: 892, percentage: 31.3, color: 'bg-blue-500' },
        { type: 'B', count: 567, percentage: 19.9, color: 'bg-green-500' },
        { type: 'AB', count: 154, percentage: 5.4, color: 'bg-yellow-500' }
      ],
      ageGroups: [
        { age: '0-17', o: 634, a: 456, b: 289, ab: 78 },
        { age: '18-35', o: 567, a: 423, b: 267, ab: 67 },
        { age: '36-55', o: 423, a: 345, b: 234, ab: 56 },
        { age: '56+', o: 234, a: 123, b: 89, ab: 23 }
      ],
      detailed: [
        { type: 'O Positif', laki: 634, perempuan: 567, total: 1201, percentage: 42.2 },
        { type: 'A Positif', laki: 456, perempuan: 423, total: 879, percentage: 30.9 },
        { type: 'B Positif', laki: 289, perempuan: 267, total: 556, percentage: 19.5 },
        { type: 'AB Positif', laki: 78, perempuan: 67, total: 145, percentage: 5.1 },
        { type: 'O Negatif', laki: 18, perempuan: 15, total: 33, percentage: 1.2 },
        { type: 'Lainnya', laki: 18, perempuan: 15, total: 33, percentage: 1.2 }
      ]
    },
    'jenis-kelamin': {
      total: 3247,
      lakiLaki: { count: 1634, percentage: 50.3 },
      perempuan: { count: 1613, percentage: 49.7 },
      distribution: [
        { type: 'Laki-laki', count: 1634, percentage: 50.3, color: 'bg-blue-500' },
        { type: 'Perempuan', count: 1613, percentage: 49.7, color: 'bg-pink-500' }
      ],
      ageGroups: [
        { age: '0-17', laki: 423, perempuan: 398 },
        { age: '18-35', laki: 467, perempuan: 456 },
        { age: '36-55', laki: 445, perempuan: 434 },
        { age: '56+', laki: 299, perempuan: 325 }
      ]
    },
    'agama': {
      total: 3247,
      distribution: [
        { type: 'Islam', count: 2987, percentage: 92.0, color: 'bg-green-500' },
        { type: 'Kristen', count: 156, percentage: 4.8, color: 'bg-blue-500' },
        { type: 'Katolik', count: 67, percentage: 2.1, color: 'bg-purple-500' },
        { type: 'Hindu', count: 23, percentage: 0.7, color: 'bg-orange-500' },
        { type: 'Buddha', count: 14, percentage: 0.4, color: 'bg-yellow-500' }
      ]
    },
    'kelompok-umur': {
      total: 3247,
      distribution: [
        { type: '0-4 tahun', count: 289, percentage: 8.9, color: 'bg-purple-500' },
        { type: '5-9 tahun', count: 298, percentage: 9.2, color: 'bg-blue-500' },
        { type: '10-14 tahun', count: 287, percentage: 8.8, color: 'bg-cyan-500' },
        { type: '15-19 tahun', count: 345, percentage: 10.6, color: 'bg-green-500' },
        { type: '20-34 tahun', count: 867, percentage: 26.7, color: 'bg-orange-500' },
        { type: '35-49 tahun', count: 723, percentage: 22.3, color: 'bg-red-500' },
        { type: '50-64 tahun', count: 298, percentage: 9.2, color: 'bg-yellow-500' },
        { type: '65+ tahun', count: 140, percentage: 4.3, color: 'bg-gray-500' }
      ]
    },
    'status-perkawinan': {
      total: 2456, // Usia 17+
      distribution: [
        { type: 'Belum Kawin', count: 567, percentage: 23.1, color: 'bg-blue-500' },
        { type: 'Kawin', count: 1623, percentage: 66.1, color: 'bg-green-500' },
        { type: 'Cerai Hidup', count: 156, percentage: 6.4, color: 'bg-yellow-500' },
        { type: 'Cerai Mati', count: 110, percentage: 4.5, color: 'bg-gray-500' }
      ]
    },
    'pendidikan': {
      total: 2567, // Usia 7+
      distribution: [
        { type: 'Tidak/Belum Sekolah', count: 234, percentage: 9.1, color: 'bg-gray-500' },
        { type: 'Tidak Tamat SD', count: 189, percentage: 7.4, color: 'bg-red-500' },
        { type: 'SD/Sederajat', count: 723, percentage: 28.2, color: 'bg-orange-500' },
        { type: 'SMP/Sederajat', count: 634, percentage: 24.7, color: 'bg-yellow-500' },
        { type: 'SMA/Sederajat', count: 567, percentage: 22.1, color: 'bg-green-500' },
        { type: 'Diploma I/II', count: 98, percentage: 3.8, color: 'bg-blue-500' },
        { type: 'Diploma III/IV', count: 89, percentage: 3.5, color: 'bg-indigo-500' },
        { type: 'S1', count: 78, percentage: 3.0, color: 'bg-purple-500' },
        { type: 'S2/S3', count: 23, percentage: 0.9, color: 'bg-pink-500' }
      ]
    },
    'pekerjaan': {
      total: 1890, // Usia kerja yang bekerja
      distribution: [
        { type: 'Petani', count: 567, percentage: 30.0, color: 'bg-green-500' },
        { type: 'Buruh Tani', count: 345, percentage: 18.3, color: 'bg-lime-500' },
        { type: 'Wiraswasta', count: 298, percentage: 15.8, color: 'bg-blue-500' },
        { type: 'Pedagang', count: 234, percentage: 12.4, color: 'bg-orange-500' },
        { type: 'PNS', count: 156, percentage: 8.3, color: 'bg-purple-500' },
        { type: 'Karyawan Swasta', count: 123, percentage: 6.5, color: 'bg-cyan-500' },
        { type: 'Guru', count: 78, percentage: 4.1, color: 'bg-indigo-500' },
        { type: 'Bidan/Perawat', count: 45, percentage: 2.4, color: 'bg-pink-500' },
        { type: 'Lainnya', count: 44, percentage: 2.3, color: 'bg-gray-500' }
      ]
    },
    'disabilitas': {
      total: 67,
      distribution: [
        { type: 'Tunanetra', count: 23, percentage: 34.3, color: 'bg-blue-500' },
        { type: 'Tunarungu', count: 18, percentage: 26.9, color: 'bg-green-500' },
        { type: 'Tunawicara', count: 12, percentage: 17.9, color: 'bg-orange-500' },
        { type: 'Tunadaksa', count: 9, percentage: 13.4, color: 'bg-purple-500' },
        { type: 'Tunagrahita', count: 5, percentage: 7.5, color: 'bg-red-500' }
      ]
    },
    'suku-etnis': {
      total: 3247,
      distribution: [
        { type: 'Jawa', count: 1834, percentage: 56.5, color: 'bg-green-500' },
        { type: 'Lampung', count: 723, percentage: 22.3, color: 'bg-blue-500' },
        { type: 'Sunda', count: 345, percentage: 10.6, color: 'bg-orange-500' },
        { type: 'Bali', count: 189, percentage: 5.8, color: 'bg-purple-500' },
        { type: 'Batak', count: 98, percentage: 3.0, color: 'bg-red-500' },
        { type: 'Lainnya', count: 58, percentage: 1.8, color: 'bg-gray-500' }
      ]
    }
  };

  

  const getCurrentData = () => {
    return statisticData[activeSubcategory as keyof typeof statisticData] || statisticData['jenis-kelamin'];
  };

  const getCurrentTitle = () => {
    const subcategory = categories
      .find(cat => cat.id === activeCategory)
      ?.subcategories.find(sub => sub.id === activeSubcategory);
    return `Statistik ${subcategory?.label || 'Data'}`;
  };

  const getCurrentDescription = () => {
    const descriptions = {
      'jenis-kelamin': 'Data distribusi jenis kelamin penduduk Desa Fajar Baru berdasarkan kelompok usia',
      'agama': 'Data distribusi agama yang dianut oleh penduduk Desa Fajar Baru',
      'kelompok-umur': 'Data distribusi penduduk berdasarkan kelompok umur di Desa Fajar Baru',
      'kategori-umur': 'Data kategorisasi penduduk berdasarkan rentang usia produktif',
      'status-perkawinan': 'Data status perkawinan penduduk dewasa Desa Fajar Baru',
      'pendidikan': 'Data tingkat pendidikan formal tertinggi penduduk Desa Fajar Baru',
      'pekerjaan': 'Data jenis pekerjaan utama penduduk usia kerja Desa Fajar Baru',
      'disabilitas': 'Data penyandang disabilitas di Desa Fajar Baru berdasarkan jenis keterbatasan',
      'golongan-darah': 'Data distribusi golongan darah penduduk Desa Fajar Baru berdasarkan sistem ABO dan Rhesus',
      'suku-etnis': 'Data keragaman suku dan etnis penduduk Desa Fajar Baru',
      'status-penduduk': 'Data status kependudukan (KTP, KK) penduduk Desa Fajar Baru',
      'penduduk-wilayah': 'Data persebaran penduduk berdasarkan wilayah RT/RW di Desa Fajar Baru',
      'hubungan-keluarga': 'Data hubungan dalam keluarga dan struktur kepala keluarga',
      'kelas-sosial': 'Data klasifikasi sosial ekonomi keluarga di Desa Fajar Baru',
      'bantuan-keluarga': 'Data penerima program bantuan sosial untuk keluarga',
      'bantuan-individual': 'Data penerima bantuan sosial individual di Desa Fajar Baru'
    };
    
    return descriptions[activeSubcategory as keyof typeof descriptions] || 'Data statistik penduduk Desa Fajar Baru Way Kandis';
  };

  const renderStatCards = () => {
    const data = getCurrentData();
    
    switch(activeSubcategory) {
      case 'golongan-darah': {
        const bloodData = data as any;
        return (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
              </div>
              <h3 className="text-2xl font-bold">{bloodData.total.toLocaleString()}</h3>
              <p className="text-blue-100 text-sm">Total Data Golongan Darah</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Terbanyak</span>
              </div>
              <h3 className="text-2xl font-bold">{bloodData.terbanyak.type} ({bloodData.terbanyak.percentage}%)</h3>
              <p className="text-red-100 text-sm">Golongan Darah Terbanyak</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Rhesus Positif</span>
              </div>
              <h3 className="text-2xl font-bold">{bloodData.rhesusPositif.percentage}%</h3>
              <p className="text-green-100 text-sm">{bloodData.rhesusPositif.count} orang</p>
            </div>
          </div>
        );
      }
      case 'jenis-kelamin': {
        const genderData = data as any;
        return (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
              </div>
              <h3 className="text-2xl font-bold">{genderData.total.toLocaleString()}</h3>
              <p className="text-blue-100 text-sm">Total Penduduk</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <User className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Laki-laki</span>
              </div>
              <h3 className="text-2xl font-bold">{genderData.lakiLaki.count.toLocaleString()}</h3>
              <p className="text-green-100 text-sm">{genderData.lakiLaki.percentage}% dari total</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <User className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Perempuan</span>
              </div>
              <h3 className="text-2xl font-bold">{genderData.perempuan.count.toLocaleString()}</h3>
              <p className="text-pink-100 text-sm">{genderData.perempuan.percentage}% dari total</p>
            </div>
          </div>
        );
      }
      default: {
        const generalData = data as any;
        return (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <Database className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
              </div>
              <h3 className="text-2xl font-bold">{generalData.total?.toLocaleString() || '3,247'}</h3>
              <p className="text-blue-100 text-sm">Total Data</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Kategori</span>
              </div>
              <h3 className="text-2xl font-bold">{generalData.distribution?.length || '5'}</h3>
              <p className="text-purple-100 text-sm">Kategori Data</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-8 h-8 text-white/80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Akurasi</span>
              </div>
              <h3 className="text-2xl font-bold">98.5%</h3>
              <p className="text-green-100 text-sm">Data Valid</p>
            </div>
          </div>
        );
      }
    }
  };

  const renderCharts = () => {
    const data = getCurrentData();
    
    return (
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Distribution Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <PieChart className="w-5 h-5 text-village-green mr-2" />
            Distribusi {activeSubcategory === 'golongan-darah' ? 'Golongan Darah ABO' : 'Data'}
          </h3>
          
          {/* Pie Chart Visualization */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 42 42" className="w-full h-full">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e7eb" strokeWidth="3" />
                {(data as any).distribution?.map((item: any, index: number) => {
                  const offset = index === 0 ? 0 : (data as any).distribution.slice(0, index).reduce((sum: number, prev: any) => sum + prev.percentage, 0);
                  const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                  const strokeDashoffset = -offset;
                  
                  return (
                    <circle
                      key={index}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={
                        item.color?.includes('red') ? '#ef4444' :
                        item.color?.includes('blue') ? '#3b82f6' :
                        item.color?.includes('green') ? '#10b981' :
                        item.color?.includes('yellow') ? '#f59e0b' :
                        item.color?.includes('purple') ? '#8b5cf6' :
                        item.color?.includes('orange') ? '#f97316' :
                        item.color?.includes('pink') ? '#ec4899' :
                        item.color?.includes('cyan') ? '#06b6d4' :
                        '#6b7280'
                      }
                      strokeWidth="3"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 21 21)"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-2">
            {(data as any).distribution?.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    item.color?.includes('red') ? 'bg-red-500' :
                    item.color?.includes('blue') ? 'bg-blue-500' :
                    item.color?.includes('green') ? 'bg-green-500' :
                    item.color?.includes('yellow') ? 'bg-yellow-500' :
                    item.color?.includes('purple') ? 'bg-purple-500' :
                    item.color?.includes('orange') ? 'bg-orange-500' :
                    item.color?.includes('pink') ? 'bg-pink-500' :
                    item.color?.includes('cyan') ? 'bg-cyan-500' :
                    'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-700">{item.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-800">{item.count.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Group Chart (for applicable data) */}
        {(activeSubcategory === 'golongan-darah' || activeSubcategory === 'jenis-kelamin') && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-village-green mr-2" />
              {activeSubcategory === 'golongan-darah' ? 'Golongan Darah Berdasarkan Kelompok Usia' : 'Distribusi Berdasarkan Kelompok Usia'}
            </h3>
            
            <div className="space-y-4">
              {(data as any).ageGroups?.map((group: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{group.age}</span>
                    <span className="text-xs text-gray-500">
                      {activeSubcategory === 'golongan-darah' 
                        ? (group.o + group.a + group.b + group.ab).toLocaleString()
                        : (group.laki + group.perempuan).toLocaleString()
                      } orang
                    </span>
                  </div>
                  
                  {activeSubcategory === 'golongan-darah' ? (
                    <div className="flex space-x-1 h-6">
                      <div className="bg-red-500 rounded-l" style={{ width: `${(group.o / (group.o + group.a + group.b + group.ab)) * 100}%` }}></div>
                      <div className="bg-blue-500" style={{ width: `${(group.a / (group.o + group.a + group.b + group.ab)) * 100}%` }}></div>
                      <div className="bg-green-500" style={{ width: `${(group.b / (group.o + group.a + group.b + group.ab)) * 100}%` }}></div>
                      <div className="bg-yellow-500 rounded-r" style={{ width: `${(group.ab / (group.o + group.a + group.b + group.ab)) * 100}%` }}></div>
                    </div>
                  ) : (
                    <div className="flex space-x-1 h-6">
                      <div className="bg-blue-500 rounded-l" style={{ width: `${(group.laki / (group.laki + group.perempuan)) * 100}%` }}></div>
                      <div className="bg-pink-500 rounded-r" style={{ width: `${(group.perempuan / (group.laki + group.perempuan)) * 100}%` }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {activeSubcategory === 'golongan-darah' && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>O</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>A</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>B</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>AB</span>
                </div>
              </div>
            )}

            {activeSubcategory === 'jenis-kelamin' && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Laki-laki</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-pink-500 rounded"></div>
                  <span>Perempuan</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional chart for other data types */}
        {!['golongan-darah', 'jenis-kelamin'].includes(activeSubcategory) && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-village-green mr-2" />
              Distribusi Rhesus
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Positif (+)</span>
                  <span className="text-sm font-semibold text-green-600">92.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '92.9%' }}></div>
                </div>
                <span className="text-xs text-gray-500">2,645 orang</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Negatif (-)</span>
                  <span className="text-sm font-semibold text-red-600">7.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                </div>
                <span className="text-xs text-gray-500">202 orang</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDetailTable = () => {
    const data = getCurrentData();
    
    if (activeSubcategory === 'golongan-darah') {
      const bloodData = data as any;
      return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Statistik Detail Golongan Darah</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Golongan Darah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laki-laki</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perempuan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bloodData.detailed?.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.laki.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.perempuan.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{row.total.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-village-green font-semibold">{row.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Generic table for other data types
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Statistik Detail {getCurrentTitle()}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(data as any).distribution?.map((row: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.count.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-village-green font-semibold">{row.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <PageLayout
      title="Statistik Desa"
      subtitle="Data statistik komprehensif penduduk dan demografi Desa Fajar Baru"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'Statistik' }
      ]}
    >
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-32">
                
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-village-green to-blue-600 text-white">
                  <div className="flex items-center space-x-2">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm">Kembali ke Infografis</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="max-h-[70vh] overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => {
                          setActiveCategory(category.id);
                          setActiveSubcategory(category.subcategories[0].id);
                        }}
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <category.icon className="w-5 h-5" />
                          <span className="font-medium">{category.label}</span>
                        </div>
                      </button>
                      
                      {activeCategory === category.id && (
                        <div className="bg-gray-50">
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory.id}
                              onClick={() => setActiveSubcategory(subcategory.id)}
                              className={`w-full flex items-center justify-between px-6 py-3 text-left text-sm transition-colors ${
                                activeSubcategory === subcategory.id
                                  ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500'
                                  : 'hover:bg-emerald-50 text-gray-600'
                              }`}
                            >
                              <span>{subcategory.label}</span>
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                {subcategory.count.toLocaleString()}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Data statistik terkini Desa Fajar Baru Way Kandis
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="space-y-6">
                
                {/* Content Header */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{getCurrentTitle()}</h1>
                      <p className="text-gray-600 mt-1">{getCurrentDescription()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-village-green hover:bg-emerald-700 text-white transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Statistics Cards */}
                {renderStatCards()}

                {/* Charts */}
                {renderCharts()}

                {/* Detail Table */}
                {renderDetailTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StatistikPage;
