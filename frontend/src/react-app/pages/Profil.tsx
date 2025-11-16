import PageLayout from '@/react-app/components/PageLayout';
import { 
  MapPin, Users, Award, Eye, Heart, 
  Zap, Building2,
  Map, BarChart3, Globe
} from 'lucide-react';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';
import { useState, useEffect } from 'react';

const ProfilPage = () => {
  const { isVisible: timelineVisible, elementRef: timelineRef } = useContentAnimation({ delay: 300 });
  const { isVisible: visiVisible, elementRef: visiRef } = useContentAnimation({ delay: 200 });
  const { isVisible: wilayahVisible, elementRef: wilayahRef } = useContentAnimation({ delay: 400 });
  const { visibleItems: demoItems, containerRef: demoRef } = useStaggeredAnimation(6, 120);

  // Mission carousel state
  const [currentMissionSlide, setCurrentMissionSlide] = useState(0);
  
  
  
  // Fungsi pemerintahan carousel state
  const [currentFungsiSlide, setCurrentFungsiSlide] = useState(0);
  
  // Demografi carousel state
  const [currentDemoSlide, setCurrentDemoSlide] = useState(0);

  // Selected map type state
  const [selectedMapType, setSelectedMapType] = useState('administrasi');

  // Data Sejarah
  const timelineEvents = [
    {
      year: '1968',
      title: 'Asal Mula dari Hutan Belantara',
      description: 'Desa Fajar Baru yang awalnya merupakan hutan belantara, berasal dari desa Karang Anyar Kecamatan Tanjung Bintang dan dimekarkan menjadi desa Fajar Baru Kabupaten Lampung Selatan.',
      icon: MapPin
    },
    {
      year: '1986',
      title: 'Penetapan Desa Persiapan',
      description: 'Pada tanggal 20 Oktober 1986 ditetapkan menjadi desa persiapan dengan Kepala Desa Persiapan Saudara Aliesan yang menjabat selama 5 tahun.',
      icon: Building2
    },
    {
      year: '1991',
      title: 'Definitif Menjadi Desa',
      description: 'Fajar Baru Kecamatan Jati Agung definitif menjadi desa Fajar Baru. Pada tahun 1992 diadakan pilkades awal dan tahun 1993 terpilih Saudara Aliesan hingga tahun 2002.',
      icon: Users
    },
    {
      year: '2019',
      title: 'Era Kepemimpinan Terkini',
      description: 'Pemilihan kepala desa serentak gelombang III dilaksanakan pada 26 Juni 2019. Terpilih Bapak M. Agus Budiantoro, S.HI yang dilantik pada 23 Agustus 2019.',
      icon: Award
    }
  ];

  // Data Visi Misi
  const misiList = [
    {
      icon: Users,
      title: 'Meningkatkan Pelayanan kepada Masyarakat',
      description: 'Meningkatkan pelayanan kepada masyarakat Desa Fajar Baru dan menciptakan pemerintah desa yang cepat tanggap terhadap keadaan dan aspirasi masyarakat dan pemuda pemudinya.'
    },
    {
      icon: Building2,
      title: 'Meningkatkan Sarana dan Prasarana',
      description: 'Meningkatkan sarana dan prasarana umum guna mendukung kelancaran perekonomian masyarakat serta sarana tempat ibadah dan kegiatan keagamaan.'
    },
    {
      icon: Heart,
      title: 'Mengoptimalkan Program Kesehatan',
      description: 'Meningkatkan sarana dan prasarana kesehatan serta mengoptimalkan pelayanan posyandu, pos lansia, poskesdes, bidan desa dan perawat desa. Mengoptimalkan program pencegahan stunting.'
    },
    {
      icon: Zap,
      title: 'Pembinaan Pemuda dan SDM',
      description: 'Meningkatkan sarana kegiatan pemuda dan pemudi baik bidang olahraga, kesenian, serta peningkatan SDMnya sehingga tercipta suasana yang aktif dan produktif.'
    }
  ];

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
    totalPenduduk: 5247,
    lakiLaki: 2635,
    perempuan: 2612,
    kk: 1456,
    kepadatan: '116 jiwa/km²',
    kelompokUsia: [
      { kategori: '0-14 tahun', jumlah: 1258, persentase: 24 },
      { kategori: '15-64 tahun', jumlah: 3465, persentase: 66 },
      { kategori: '65+ tahun', jumlah: 524, persentase: 10 }
    ],
    pendidikan: [
      { tingkat: 'Tidak/Belum Sekolah', jumlah: 425 },
      { tingkat: 'SD/Sederajat', jumlah: 1785 },
      { tingkat: 'SMP/Sederajat', jumlah: 1456 },
      { tingkat: 'SMA/Sederajat', jumlah: 1248 },
      { tingkat: 'Perguruan Tinggi', jumlah: 333 }
    ],
    pekerjaan: [
      { jenis: 'Petani', jumlah: 1567 },
      { jenis: 'Buruh', jumlah: 892 },
      { jenis: 'Pedagang', jumlah: 445 },
      { jenis: 'PNS/TNI/Polri', jumlah: 234 },
      { jenis: 'Wiraswasta', jumlah: 678 },
      { jenis: 'Lainnya', jumlah: 431 }
    ]
  };

  // Fungsi Pemerintahan Data
  const fungsiPemerintahan = [
    {
      nama: 'Pelaksanaan Kegiatan Pemerintahan',
      deskripsi: 'Menjalankan urusan pemerintahan di tingkat desa',
      color: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      nama: 'Pemberdayaan Masyarakat',
      deskripsi: 'Meningkatkan kapasitas dan partisipasi masyarakat',
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      nama: 'Pelayanan Masyarakat',
      deskripsi: 'Memberikan layanan administrasi kepada warga',
      color: 'bg-teal-50',
      textColor: 'text-teal-700'
    },
    {
      nama: 'Ketentraman dan Ketertiban',
      deskripsi: 'Menjaga stabilitas keamanan desa',
      color: 'bg-cyan-50',
      textColor: 'text-cyan-700'
    },
    {
      nama: 'Pemeliharaan Prasarana',
      deskripsi: 'Merawat fasilitas pelayanan umum',
      color: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      nama: 'Pembinaan Lembaga',
      deskripsi: 'Mengembangkan organisasi kemasyarakatan',
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ];

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

  // Auto slide effect for missions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMissionSlide((prev) => (prev + 1) % misiList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  

  // Auto slide effect for fungsi pemerintahan (1 card per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFungsiSlide((prev) => (prev + 1) % fungsiPemerintahan.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Auto slide effect for demo stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDemoSlide((prev) => (prev + 1) % demoStats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageLayout
      title="Profil Desa Fajar Baru"
      subtitle="Mengenal lebih dekat sejarah, visi misi, wilayah, perangkat desa, dan demografi"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa' }
      ]}
    >
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Pimpinan Desa */}
          <section id="pimpinan" className="mb-16 md:mb-20">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Pimpinan Desa Fajar Baru</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Kepemimpinan yang berkualitas untuk kemajuan dan kesejahteraan masyarakat</p>
            </div>
            
            {/* Kepala Desa - Hero Card */}
            <div className="mb-12 md:mb-16">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/50 rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-2xl border border-emerald-100/50 hover-lift hover-glow relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-full translate-y-24 -translate-x-24"></div>
                
                <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  {/* Photo Section */}
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <div className="relative inline-block">
                      <div className="w-72 h-80 md:w-80 md:h-96 lg:w-72 lg:h-80 xl:w-80 xl:h-96 mx-auto lg:mx-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-6 border-white/80 backdrop-blur-sm relative">
                        <img 
                          src="https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_4953.png" 
                          alt="M. Agus Budiantoro, S.HI - Kepala Desa Fajar Baru"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute -bottom-4 left-1/2 lg:left-4 transform -translate-x-1/2 lg:translate-x-0">
                        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-white">
                          <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base">Kepala Desa</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information Section */}
                  <div className="lg:col-span-3 text-center lg:text-left mt-8 lg:mt-0">
                    <div className="space-y-6">
                      {/* Name & Title */}
                      <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 leading-tight">
                          M. Agus Budiantoro, S.HI
                        </h3>
                        <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-2">Kepala Desa Fajar Baru</p>
                        <p className="text-lg text-gray-600">Kecamatan Jati Agung, Kabupaten Lampung Selatan</p>
                      </div>

                      

                      {/* Quote */}
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                        <blockquote className="text-lg md:text-xl text-gray-700 italic font-medium leading-relaxed">
                          "Melayani dengan hati untuk kemajuan Desa Fajar Baru yang religius, bermartabat, maju, mandiri, sehat dan sejahtera"
                        </blockquote>
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ketua PKK - Elegant Card */}
            <div className="mb-12 md:mb-16">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/50 rounded-3xl md:rounded-[2rem] p-8 md:p-12 shadow-2xl border border-emerald-100/50 hover-lift hover-glow relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-56 h-56 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full -translate-y-28 -translate-x-28"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/10 to-emerald-500/10 rounded-full translate-y-20 translate-x-20"></div>
                
                <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  {/* Information Section - Left on Large Screens */}
                  <div className="lg:col-span-3 text-center lg:text-left order-2 lg:order-1">
                    <div className="space-y-6">
                      {/* Name & Title */}
                      <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 leading-tight">
                          Siti Nurhalimah, S.Pd
                        </h3>
                        <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-2">Ketua PKK Desa Fajar Baru</p>
                        <p className="text-lg text-gray-600">Pemberdayaan & Kesejahteraan Keluarga</p>
                      </div>

                      

                      {/* Quote */}
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                        <blockquote className="text-lg md:text-xl text-gray-700 italic font-medium leading-relaxed">
                          "Memberdayakan perempuan untuk mewujudkan keluarga sejahtera dan masyarakat yang berkualitas"
                        </blockquote>
                      </div>

                      
                    </div>
                  </div>

                  {/* Photo Section - Right on Large Screens */}
                  <div className="lg:col-span-2 text-center lg:text-right order-1 lg:order-2">
                    <div className="relative inline-block">
                      <div className="w-64 h-72 md:w-72 md:h-80 lg:w-64 lg:h-72 xl:w-72 xl:h-80 mx-auto lg:mx-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-6 border-white/80 backdrop-blur-sm relative">
                        <img 
                          src="https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_3051.png" 
                          alt="Siti Nurhalimah, S.Pd - Ketua PKK Desa Fajar Baru"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute -bottom-4 right-1/2 lg:right-4 transform translate-x-1/2 lg:translate-x-0">
                        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-white">
                          <div className="flex items-center space-x-2">
                            <Heart className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base">Ketua PKK</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tim Perangkat Desa */}
            <div className="bg-gradient-to-br from-white via-emerald-50/50 to-blue-50/30 rounded-2xl md:rounded-3xl lg:rounded-[2rem] p-4 md:p-6 lg:p-8 shadow-xl border border-emerald-100">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Tim Perangkat Desa</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full mb-3 md:mb-4"></div>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg px-2">Struktur organisasi pemerintahan desa yang profesional</p>
              </div>

              <div className="space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                {/* Sekretaris Desa */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 hover-lift hover-glow border border-emerald-100/50">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-24 sm:w-22 sm:h-26 md:w-24 md:h-30 lg:w-26 lg:h-32 rounded-lg md:rounded-xl overflow-hidden shadow-lg border-2 border-white bg-gray-100">
                        
                      </div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-2 py-1 rounded-md md:rounded-lg shadow-lg">
                          <span className="font-bold text-xs">Sekretaris</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1 truncate">Solichen, S.Sos</h4>
                      <p className="text-emerald-600 font-semibold text-sm md:text-base mb-1">Sekretaris Desa</p>
                      <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">
                        "Mengorganisir administrasi dengan teliti untuk pelayanan yang efektif dan transparan"
                      </p>
                    </div>
                  </div>

                  {/* Fungsi Pemerintahan Carousel */}
                  <div className="mt-4 md:mt-6 border-t border-emerald-100 pt-4 md:pt-6">
                    <div className="text-center mb-3 md:mb-4">
                      <h5 className="text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-1 md:mb-2">Fungsi Pemerintahan</h5>
                      <p className="text-gray-600 text-xs">Tugas dan kewenangan desa</p>
                    </div>

                    <div className="relative overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentFungsiSlide * 100}%)` }}
                      >
                        {fungsiPemerintahan.map((fungsi, index) => (
                          <div key={index} className="w-full flex-shrink-0 px-1">
                            <div className={`p-2 md:p-3 ${fungsi.color} rounded-md md:rounded-lg border border-emerald-200/50`}>
                              <h6 className={`font-semibold ${fungsi.textColor} mb-1 md:mb-2 text-xs md:text-sm leading-tight`}>{fungsi.nama}</h6>
                              <p className="text-xs text-gray-600 leading-relaxed">{fungsi.deskripsi}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel indicators */}
                    <div className="flex justify-center mt-3 md:mt-4 space-x-2">
                      {fungsiPemerintahan.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors touch-manipulation ${
                            index === currentFungsiSlide ? 'bg-emerald-600' : 'bg-gray-300'
                          }`}
                          onClick={() => setCurrentFungsiSlide(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kepala Seksi */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 hover-lift hover-glow border border-emerald-100/50">
                  <div className="text-center mb-3 md:mb-4">
                    <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1">Kepala Seksi</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Struktur kepemimpinan bidang</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-emerald-50 rounded-lg p-2 md:p-3 border-l-3 border-emerald-500 hover:bg-emerald-100 transition-colors">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-emerald-100 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-gray-800 text-xs md:text-sm truncate">Yunani</h5>
                          <p className="text-emerald-600 text-xs font-medium leading-tight">Kepala Seksi Pemerintahan</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-50 rounded-lg p-2 md:p-3 border-l-3 border-emerald-500 hover:bg-emerald-100 transition-colors">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-emerald-100 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-gray-800 text-xs md:text-sm truncate">Junaidi</h5>
                          <p className="text-emerald-600 text-xs font-medium leading-tight">Kepala Seksi Pelayanan</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-2 md:p-3 border-l-3 border-blue-500 hover:bg-blue-100 transition-colors">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-blue-100 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0">
                          <Heart className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-gray-800 text-xs md:text-sm truncate">Hadi Johan</h5>
                          <p className="text-blue-600 text-xs font-medium leading-tight">Kepala Seksi Kesejahteraan</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-teal-50 rounded-lg p-2 md:p-3 border-l-3 border-teal-500 hover:bg-teal-100 transition-colors">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-teal-100 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="w-3 h-3 text-teal-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-gray-800 text-xs md:text-sm truncate">Tri Wahita H</h5>
                          <p className="text-teal-600 text-xs font-medium leading-tight">Kepala Seksi Perencanaan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
          
          {/* Sejarah Desa */}
          <section id="sejarah" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Sejarah Desa Fajar Baru</h2>
            
            {/* Sejarah Singkat */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Asal Mula Desa Fajar Baru</h3>
              <div className="prose max-w-none text-gray-600">
                <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  Desa Fajar Baru adalah hutan belantara. Konon menurut cerita penduduk desa ini berasal dari desa Karang Anyar Kecamatan Tanjung Bintang. 
                  Pada tahun 1968 telah dimekarkan menjadi desa Fajar Baru Kabupaten Lampung Selatan dan pada tanggal 20 Oktober 1986 ditetapkan menjadi desa persiapan.
                </p>
                <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  Fajar Baru kecamatan Jati Agung definitif menjadi desa Fajar Baru tahun 1991. Pada tahun 1992 diadakan pilkades awal dan tahun 1993 terpilih saudara Aliesan hingga tahun 2002.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Seiring berjalannya waktu, Desa Fajar Baru terus berkembang dengan kepemimpinan yang berganti dari masa ke masa. 
                  Terakhir pada 26 Juni 2019 dilaksanakan pemilihan kepala desa serentak gelombang III yang berhasil memilih Bapak M. Agus Budiantoro, S.HI 
                  sebagai kepala desa yang dilantik pada 23 Agustus 2019.
                </p>
              </div>
            </div>

            {/* Timeline - Mobile Responsive */}
            <div 
              ref={timelineRef as any}
              className={`${timelineVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <div className="space-y-6 md:space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative">
                    {/* Mobile Layout */}
                    <div className="md:hidden bg-white rounded-xl shadow-lg p-6 ml-8 relative">
                      <div className="absolute -left-8 top-6 w-6 h-6 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
                        <event.icon className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute -left-6 top-7 w-2 h-2 bg-white rounded-full"></div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-xl font-bold text-emerald-600">{event.year}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-600 to-blue-600"></div>
                      <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 text-left pl-8'}`}>
                        <div className="bg-white rounded-xl shadow-lg p-6 relative hover-lift hover-glow">
                          <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-emerald-600 rounded-full ${
                            index % 2 === 0 ? '-right-2' : '-left-2'
                          }`}></div>
                          <div className="flex items-center space-x-3 mb-3">
                            <event.icon className="w-5 h-5 text-emerald-600" />
                            <span className="text-2xl font-bold text-emerald-600">{event.year}</span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h4>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                      </div>
                      {index % 2 !== 0 && <div className="w-5/12"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visi & Misi */}
          <section id="visi-misi" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">Visi & Misi Desa</h2>
            
            {/* Visi */}
            <div 
              ref={visiRef as any}
              className={`bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-white mb-8 md:mb-12 hover-glow ${
                visiVisible ? 'animate-zoom-in' : 'opacity-0'
              }`}
            >
              <div className="text-center mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 hover-lift">
                  <Eye className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">VISI DESA FAJAR BARU</h3>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8">
                <blockquote className="text-center">
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold leading-relaxed italic">
                    "Terwujudnya Desa Fajar Baru yang Religius, Bermartabat, Maju, Mandiri, Sehat dan Sejahtera"
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Misi Carousel */}
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6 md:mb-8">MISI DESA FAJAR BARU</h3>
              
              <div className="relative overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentMissionSlide * 100}%)` }}
                >
                  {misiList.map((misi, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow hover-lift">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-600 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 hover-lift">
                            <misi.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">{misi.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{misi.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {misiList.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMissionSlide ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentMissionSlide(index)}
                  />
                ))}
              </div>
            </div>
          </section>

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

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Kelompok Usia */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 text-emerald-600 mr-2" />
                  Kelompok Usia
                </h3>
                <div className="space-y-4">
                  {demografiData.kelompokUsia.map((kelompok, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium text-sm md:text-base">{kelompok.kategori}</span>
                        <span className="text-gray-600 text-sm md:text-base">{kelompok.persentase}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 bg-emerald-600 rounded-full"
                          style={{ width: `${kelompok.persentase}%` }}
                        ></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs md:text-sm text-gray-500">{kelompok.jumlah.toLocaleString()} jiwa</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pendidikan */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">Tingkat Pendidikan</h3>
                <div className="space-y-3">
                  {demografiData.pendidikan.map((pendidikan, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 text-sm md:text-base">{pendidikan.tingkat}</span>
                      <span className="text-emerald-600 font-semibold text-sm md:text-base">{pendidikan.jumlah.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pekerjaan */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">Mata Pencaharian</h3>
                <div className="space-y-3">
                  {demografiData.pekerjaan.map((pekerjaan, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 text-sm md:text-base">{pekerjaan.jenis}</span>
                      <span className="text-emerald-600 font-semibold text-sm md:text-base">{pekerjaan.jumlah.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilPage;
