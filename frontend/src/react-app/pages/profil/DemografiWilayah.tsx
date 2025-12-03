import PageLayout from '@/react-app/components/PageLayout';
import { 
  Map, BarChart3, Globe, Users, Building2
} from 'lucide-react';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';
import { useState, useEffect } from 'react';

const DemografiWilayah = () => {
  const { isVisible: wilayahVisible, elementRef: wilayahRef } = useContentAnimation({ delay: 400 });
  const { visibleItems: demoItems, containerRef: demoRef } = useStaggeredAnimation(6, 120);

  // Demografi carousel state
  const [currentDemoSlide, setCurrentDemoSlide] = useState(0);

  // Selected map type state
  const [selectedMapType, setSelectedMapType] = useState('administrasi');

  // Data Wilayah & Peta
  const wilayahData = {
    luas: '756 Ha',
    alamat: 'Jl. R.A. Basyid No.48, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
    batasTeritori: [
      {
        arah: 'Utara',
        deskripsi: 'Desa Karang Anyar dan Karang Sari Kecamatan Jati Agung',
        color: 'bg-emerald-500',
        bgColor: 'bg-emerald-50',
        icon: 'U'
      },
      {
        arah: 'Timur',
        deskripsi: 'Desa Jatimulyo Kecamatan Jati Agung dan Balai Desa Tanjung Senang serta Balai Desa Way Kandis Kecamatan Tanjung Senang',
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50',
        icon: 'T'
      },
      {
        arah: 'Selatan',
        deskripsi: 'Balai Desa Labuhan Dalam Kecamatan Tanjung Senang',
        color: 'bg-teal-500',
        bgColor: 'bg-teal-50',
        icon: 'S'
      },
      {
        arah: 'Barat',
        deskripsi: 'Desa Sidosari Kecamatan Natar dan Balai Desa Rajabasa Jaya Kecamatan Rajabasa',
        color: 'bg-cyan-500',
        bgColor: 'bg-cyan-50',
        icon: 'B'
      }
    ],
    pembagianWilayah: ['Dusun 1', 'Dusun 2A', 'Dusun 2B', 'Dusun 3A', 'Dusun 3B', 'Dusun 4', 'Dusun 5'],
    topografi: 'Dataran rendah dengan sedikit perbukitan',
    ketinggian: '25-150 mdpl',
    iklim: 'Tropis dengan curah hujan 2.200-2.800 mm/tahun'
  };

  // Data Demografi
  const demografiData = {
    totalPenduduk: 11626,
    lakiLaki: 5905,
    perempuan: 5698,
    kk: 3626
  };

  const dusunData = [
    { name: 'Dusun I', kk: 386, penduduk: 1231, lakiLaki: 661, perempuan: 570 },
    { name: 'Dusun II A', kk: 429, penduduk: 1418, lakiLaki: 778, perempuan: 640 },
    { name: 'Dusun II B', kk: 456, penduduk: 1905, lakiLaki: 943, perempuan: 963 },
    { name: 'Dusun III A', kk: 607, penduduk: 2434, lakiLaki: 1216, perempuan: 1218 },
    { name: 'Dusun III B', kk: 616, penduduk: 2260, lakiLaki: 1157, perempuan: 1138 },
    { name: 'Dusun IV', kk: 377, penduduk: 1027, lakiLaki: 498, perempuan: 524 },
    { name: 'Dusun V', kk: 365, penduduk: 1297, lakiLaki: 652, perempuan: 645 }
  ];

  const rekapitulasiDusun = {
    kk: 3626,
    penduduk: 11626
  };

  const aggregatedDusun = dusunData.reduce(
    (acc, dusun) => ({
      kk: acc.kk + dusun.kk,
      penduduk: acc.penduduk + dusun.penduduk,
      lakiLaki: (acc.lakiLaki ?? 0) + dusun.lakiLaki,
      perempuan: (acc.perempuan ?? 0) + dusun.perempuan
    }),
    { kk: 0, penduduk: 0, lakiLaki: 0, perempuan: 0 }
  );

  // Demo stats for carousel
  const demoStats = [
    {
      title: 'Total Penduduk',
      value: demografiData.totalPenduduk.toLocaleString(),
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-100',
      icon: Users
    },
    {
      title: 'Laki-laki',
      value: demografiData.lakiLaki.toLocaleString(),
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100',
      icon: Users
    },
    {
      title: 'Perempuan',
      value: demografiData.perempuan.toLocaleString(),
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-100',
      icon: Users
    },
    {
      title: 'Kepala Keluarga',
      value: demografiData.kk.toLocaleString(),
      color: 'from-cyan-500 to-cyan-600',
      textColor: 'text-cyan-100',
      icon: Building2
    }
  ];

  // Auto slide effect for demo stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDemoSlide((prev) => (prev + 1) % demoStats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageLayout
      title="Demografi Wilayah"
      subtitle="Data kependudukan, wilayah, dan karakteristik geografis Desa Fajar Baru"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa' },
        { name: 'Demografi Wilayah' }
      ]}
    >
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Wilayah & Peta */}
          <section id="wilayah" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Wilayah & Peta Desa</h2>
            
            <div 
              ref={wilayahRef as any}
              className={`${wilayahVisible ? 'animate-slide-up' : 'opacity-0'}`}
            >
              {/* 2 Column Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Informasi Wilayah */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover-lift hover-glow">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Map className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 mr-2" />
                    Informasi Wilayah
                  </h3>
                  
                  {/* Basic Info */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Luas Wilayah</span>
                      <span className="text-emerald-600 font-semibold">{wilayahData.luas}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Ketinggian</span>
                      <span className="text-emerald-600 font-semibold">{wilayahData.ketinggian}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Topografi</span>
                      <span className="text-emerald-600 font-semibold text-sm">{wilayahData.topografi}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Iklim</span>
                      <span className="text-emerald-600 font-semibold text-sm">{wilayahData.iklim}</span>
                    </div>
                  </div>

                  {/* Alamat Balai Desa */}
                  <div className="mb-8">
                    <span className="font-medium text-gray-700 block mb-2">Alamat Balai Desa</span>
                    <p className="text-emerald-600 font-semibold text-sm leading-relaxed">{wilayahData.alamat}</p>
                  </div>

                  {/* Batas Wilayah */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Batas Wilayah</h4>
                    <div className="space-y-3">
                      {wilayahData.batasTeritori.map((batas, index) => (
                        <div key={index} className={`p-3 ${batas.bgColor} rounded-lg`}>
                          <div className="flex items-start">
                            <div className={`w-6 h-6 ${batas.color} rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                              <span className="text-white font-semibold text-xs">{batas.icon}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700 block mb-1">Sebelah {batas.arah}</span>
                              <p className="text-sm text-gray-600">{batas.deskripsi}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Akses Transportasi */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Akses Transportasi</h4>
                    <div className="space-y-3">
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <p className="text-gray-700">
                          <span className="font-medium text-emerald-700">Jalur Akses:</span><br />
                          <span className="text-sm">Dapat diakses melalui Jl. Teuku Umar - Jl. R.A. Basyid dengan kendaraan pribadi dan transportasi umum</span>
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-700">
                          <span className="font-medium text-blue-700">Jarak dari Pusat Kota:</span><br />
                          <span className="text-sm">±15 km dari pusat Bandar Lampung, ±8 km dari Kecamatan Jati Agung</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pembagian Wilayah Dusun */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Pembagian Wilayah Dusun</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {wilayahData.pembagianWilayah.map((dusun, index) => (
                        <div key={index} className="p-3 bg-emerald-600/10 rounded-lg text-center">
                          <span className="text-emerald-600 font-medium text-sm">{dusun}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Peta Lokasi */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover-lift hover-glow">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 mr-2" />
                    Peta Lokasi Desa Fajar Baru
                  </h3>
                  
                  {/* Google Maps Embed */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.7234567!2d105.2652679!3d-5.3420085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c4e05391e265%3A0x19082a5416920514!2sGg.%20Balai%20Desa!5e1!3m2!1sen!2sid!4v1696176000000!5m2!1sen!2sid"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    ></iframe>
                    
                    {/* Overlay dengan informasi dan link */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm md:text-base mb-1">Kantor Balai Desa Fajar Baru</h4>
                          <p className="text-xs md:text-sm text-gray-600">Jl. R.A. Basyid No.48, Fajar Baru</p>
                        </div>
                        <a
                          href="https://www.google.com/maps/place/Gg.+Balai+Desa/@-5.3420085,105.2652679,1288m/data=!3m1!1e3!4m7!3m6!1s0x2e40c4e05391e265:0x19082a5416920514!4b1!8m2!3d-5.3435775!4d105.2684809!16s%2Fg%2F11k3qk06j8!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDkyOC4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary px-3 py-2 text-xs md:text-sm hover:scale-105 transition-transform whitespace-nowrap"
                        >
                          <Map className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Buka di Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Peta Tematik Section */}
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-emerald-100">
                    <div className="mb-6">
                      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <Map className="w-5 h-5 text-emerald-600 mr-2" />
                        Peta Tematik Desa Fajar Baru
                      </h4>
                      
                      {/* Map Type Selector */}
                      <div className="relative">
                        <select 
                          value={selectedMapType}
                          onChange={(e) => setSelectedMapType(e.target.value)}
                          className="w-full md:w-auto px-4 py-3 bg-white border border-emerald-200 rounded-xl text-gray-700 font-medium shadow-sm hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                        >
                          <option value="administrasi">🗺️ Peta Administrasi</option>
                          <option value="kelerengan">⛰️ Peta Kelerengan</option>
                          <option value="agrisawah">🌾 Peta AgriSawah</option>
                        </select>
                      </div>
                    </div>

                    {/* Map Content */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Map Statistics */}
                      <div className="lg:col-span-1 space-y-4">
                        {selectedMapType === 'administrasi' && (
                          <>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Luas Wilayah</h5>
                              <p className="text-2xl font-bold text-emerald-600">756 Ha</p>
                              <p className="text-xs text-gray-500">Total wilayah administrasi</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Skala Peta</h5>
                              <p className="text-2xl font-bold text-blue-600">1:18.000</p>
                              <p className="text-xs text-gray-500">Tingkat detail administrasi</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Jumlah Dusun</h5>
                              <p className="text-2xl font-bold text-purple-600">7 Dusun</p>
                              <p className="text-xs text-gray-500">Pembagian wilayah administratif</p>
                            </div>
                          </>
                        )}

                        {selectedMapType === 'kelerengan' && (
                          <>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Skala Peta</h5>
                              <p className="text-2xl font-bold text-orange-600">1:30.000</p>
                              <p className="text-xs text-gray-500">Analisis topografi detail</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Klasifikasi Lereng</h5>
                              <p className="text-2xl font-bold text-red-600">3 Kelas</p>
                              <p className="text-xs text-gray-500">Datar, Landai, Agak Curam</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Sumber Data</h5>
                              <p className="text-lg font-bold text-green-600">RBI & UTM</p>
                              <p className="text-xs text-gray-500">Peta Rupa Bumi Indonesia, WGS 1984 UTM Zone 48S</p>
                            </div>
                          </>
                        )}

                        {selectedMapType === 'agrisawah' && (
                          <>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Skala Peta</h5>
                              <p className="text-2xl font-bold text-green-600">1:30.000</p>
                              <p className="text-xs text-gray-500">Analisis pertanian detail</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Kontur Interval</h5>
                              <p className="text-2xl font-bold text-blue-600">5-6 meter</p>
                              <p className="text-xs text-gray-500">Analisis ketinggian lahan sawah</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h5 className="text-sm font-medium text-gray-600 mb-2">Sumber Data</h5>
                              <p className="text-lg font-bold text-amber-600">RBI & UTM</p>
                              <p className="text-xs text-gray-500">Peta Rupa Bumi Indonesia, WGS 1984 UTM Zone 48S</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Map Display */}
                      <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {selectedMapType === 'administrasi' && (
                              <img 
                                src="https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_0781.png"
                                alt="Peta Administrasi Desa Fajar Baru"
                                className="w-full h-full object-contain"
                              />
                            )}
                            {selectedMapType === 'kelerengan' && (
                              <img 
                                src="https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_9342.png"
                                alt="Peta Kelerengan Desa Fajar Baru"
                                className="w-full h-full object-contain"
                              />
                            )}
                            {selectedMapType === 'agrisawah' && (
                              <img 
                                src="https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_8404.png"
                                alt="Peta AgriSawah Desa Fajar Baru"
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                          
                          {/* Map Legend */}
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">Keterangan Peta</h6>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                              {selectedMapType === 'administrasi' && (
                                <>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-amber-700 rounded-sm"></div>
                                    <span>Wilayah Fajar Baru</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-amber-600 rounded-sm"></div>
                                    <span>Perkebunan</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                                    <span>Persawahan</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                                    <span>Pemukiman</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 border-2 border-blue-500 bg-transparent rounded-sm"></div>
                                    <span>Sungai</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-2 border-dashed border-gray-700 bg-transparent"></div>
                                    <span>Batas Dusun</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-2 border-gray-400 bg-transparent"></div>
                                    <span>Jalan Tol</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-4 border-black bg-transparent"></div>
                                    <span>Jalan Raya</span>
                                  </div>
                                </>
                              )}

                              {selectedMapType === 'kelerengan' && (
                                <>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                    <span>1. Datar</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                                    <span>2. Landai</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                    <span>3. Agak Curam</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-2 border-black bg-transparent"></div>
                                    <span>Batas Desa Lampung</span>
                                  </div>
                                </>
                              )}

                              {selectedMapType === 'agrisawah' && (
                                <>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-2 border-blue-500 bg-transparent"></div>
                                    <span>Sungai</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-2 border-amber-700 bg-transparent"></div>
                                    <span>Kontur 6 meter</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-1 border-t-2 border-amber-600 bg-transparent"></div>
                                    <span>Kontur 5 meter</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                                    <span>Agrisawah</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-amber-700 rounded-sm"></div>
                                    <span>Batas Desa</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map Info Footer */}
                    <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Sumber Data</p>
                            <p className="text-xs text-gray-500">
                              {selectedMapType === 'administrasi' && 'Google Earth, Data Peta Rupa Bumi Indonesia, Batas Desa Dukcapil Lampung 2019, Informasi Geospasial Tematik Petas Desa 2024, Open Street Map Roads'}
                              {selectedMapType === 'kelerengan' && 'Data Peta Rupa Bumi Indonesia, Data WGS 1984 UTM Zone 48S'}
                              {selectedMapType === 'agrisawah' && 'Data Peta Rupa Bumi Indonesia, Data WGS 1984 UTM Zone 48S'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            Skala: {selectedMapType === 'administrasi' ? '1:18.000' : '1:30.000'}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {selectedMapType === 'administrasi' && 'KKN ITERA Kelompok 13 Periode Ke-15'}
                            {selectedMapType === 'kelerengan' && 'KKN ITERA Kelompok 13 Periode Ke-15'}
                            {selectedMapType === 'agrisawah' && 'KKN ITERA Kelompok 13 Periode Ke-15'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Demografi */}
          <section id="demografi" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Data Demografi Desa</h2>
            
            {/* Statistik Utama Carousel for Mobile */}
            <div className="md:hidden mb-8">
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentDemoSlide * 100}%)` }}
                >
                  {demoStats.map((stat, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white text-center hover-lift hover-glow`}>
                        <stat.icon className="w-8 h-8 mx-auto mb-3" />
                        <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                        <p className={stat.textColor}>{stat.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {demoStats.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentDemoSlide ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentDemoSlide(index)}
                  />
                ))}
              </div>
            </div>

            {/* Statistik Utama Desktop */}
            <div ref={demoRef as any} className="hidden md:grid md:grid-cols-4 gap-6 mb-12">
              {demoStats.map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white text-center hover-lift hover-glow ${
                  demoItems[index] ? 'animate-bounce-in' : 'opacity-0'
                }`}>
                  <stat.icon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className={stat.textColor}>{stat.title}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Data Dusun</h3>
                <p className="text-sm text-gray-500">Rekapitulasi tercatat sesuai dokumen terakhir.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs uppercase bg-emerald-50 text-emerald-600">
                    <tr>
                      <th className="px-3 py-2">Dusun</th>
                      <th className="px-3 py-2 text-right">KK</th>
                      <th className="px-3 py-2 text-right">Penduduk</th>
                      <th className="px-3 py-2 text-right">Laki-laki</th>
                      <th className="px-3 py-2 text-right">Perempuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dusunData.map((dusun) => (
                      <tr key={dusun.name} className="border-b border-gray-100">
                        <td className="px-3 py-2 font-medium text-gray-700">{dusun.name}</td>
                        <td className="px-3 py-2 text-right font-semibold text-gray-700">{dusun.kk.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right font-semibold text-gray-700">{dusun.penduduk.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right">{dusun.lakiLaki.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right">{dusun.perempuan.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50 text-emerald-800 font-semibold">
                      <td className="px-3 py-2">Total</td>
                      <td className="px-3 py-2 text-right">{aggregatedDusun.kk.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{aggregatedDusun.penduduk.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{aggregatedDusun.lakiLaki?.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{aggregatedDusun.perempuan?.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-gray-100 text-gray-600 font-medium">
                      <td className="px-3 py-2">Rekapitulasi Dokumen</td>
                      <td className="px-3 py-2 text-right">{rekapitulasiDusun.kk.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{rekapitulasiDusun.penduduk.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right" colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Catatan: jumlah rekapitulasi sudah diverifikasi dengan catatan gambar, "tiga ribu dua ratus dua puluh enam" untuk KK dan 11.626 penduduk.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default DemografiWilayah;
