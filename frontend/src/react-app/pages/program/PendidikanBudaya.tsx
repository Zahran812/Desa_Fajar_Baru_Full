import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Award, 
  Star, 
  Mail, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  User2, 
  ListChecks, 
  User, 
  Baby
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { useEffect, useState } from 'react';

type ImageSliderProps = {
  images: string[];
  alt: string;
  interval?: number;
};

const CardImageSlider: React.FC<ImageSliderProps> = ({ images, alt, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return (
      <div className="h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
        Tambahkan foto ke array images[]
      </div>
    );
  }

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl mb-4">
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PendidikanBudayaPage = () => {

  const formalEducation = [
    {
      name: 'SD N 1 Fajar Baru',
      description: 'Sekolah Dasar Negeri 1 Fajar Baru menyediakan pendidikan dasar berkualitas dengan fasilitas memadai dan tenaga pengajar yang berpengalaman.',
      npsn: '10801341',
      naungan: 'Kementerian Pendidikan dan Kebudayaan',
      berdiri: '1 Januari 1971',
      noSkPendirian: '-',
      tglOperasional: '1 Januari 1910',
      noSkOperasional: '-',
      jenjang: 'SD',
      status: 'Negeri',
      akreditasi: 'B',
      tglAkreditasi: '5 Oktober 2018',
      noSkAkreditasi: '75/BAN-SM/LPG/X/2018',
      sertifikasi: 'Belum Bersertifikat',
      alamat: 'Jl Ra Basyid Fajar Baru, Kec. Jati Agung, Kab. Lampung Selatan, Lampung',
      desa: 'Fajar Baru',
      kecamatan: 'Jati Agung',
      kabupaten: 'Lampung Selatan',
      provinsi: 'Lampung',
      email: 'sdnsatufajarbaru@gmail.com',
      telp: '-',
      fax: '-',
      website: '-',
      kepalaSekolah: 'Nuri Zahara',
      operator: 'Yanuar',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-1-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.14 (1).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-1-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.14 (2).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-1-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.14.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-1-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.15.jpeg`,
      ],
      achievements: [
        'Visi: membentuk SDM Indonesia yang berkualitas, berakhlak mulia, dan berlandaskan Pancasila',
        'Pembelajaran berfokus pada literasi, numerasi, dan Project Penguatan Profil Pelajar Pancasila',
        'Lingkungan sekolah asri, hijau, dan nyaman untuk belajar'
      ],
      facilities: [
        'Ruang guru, 2 perpustakaan, gudang, dan ruang UKS',
        'Kamar mandi guru (1), kamar mandi siswa (2), kantin, dapur, parkiran, dan rumah penjaga',
        'Lapangan upacara dan olahraga, taman hijau'
      ]
    },
    {
      name: 'SD N 2 Fajar Baru',
      description: 'Sekolah Dasar Negeri 2 Fajar Baru berkomitmen memberikan pendidikan dasar yang berkualitas dengan mengedepankan pengembangan karakter siswa.',
      npsn: '10801332',
      naungan: 'Kementerian Pendidikan dan Kebudayaan',
      berdiri: '1 Januari 1970',
      noSkPendirian: '-',
      tglOperasional: '1 Januari 1910',
      noSkOperasional: '-',
      jenjang: 'SD',
      status: 'Negeri',
      akreditasi: 'B',
      tglAkreditasi: '2 Juli 2019',
      noSkAkreditasi: '580/BAN-SM/SK/2019',
      sertifikasi: 'Belum Bersertifikat',
      alamat: 'Jl. Cendana 2 Fajarbaru, Kec. Jati Agung, Kab. Lampung Selatan',
      desa: 'Fajar Baru',
      kecamatan: 'Jati Agung',
      kabupaten: 'Lampung Selatan',
      provinsi: 'Lampung',
      email: 'sdnduafajarbaru83@gmail.com',
      telp: '-',
      fax: '-',
      website: '-',
      kepalaSekolah: 'Suyatini',
      operator: 'Zulvia Kurnia Sari',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-2-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.14 (1).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-2-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.14 (2).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-2-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.14.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-SDN-2-DESA-FAJAR-BARU/WhatsApp Image 2025-11-21 at 08.46.15.jpeg`,
      ],
      achievements: [
        'Berfokus pada pengembangan karakter siswa yang berakhlak mulia dan berprestasi',
        'Mengembangkan potensi siswa melalui berbagai kegiatan ekstrakurikuler',
        'Lingkungan belajar yang nyaman dan kondusif'
      ],
      facilities: [
        'Ruang kelas yang memadai',
        'Perpustakaan dan laboratorium',
        'Lapangan olahraga dan tempat ibadah'
      ]
    }
  ];

  const nonFormalEducation = [
    {
      title: 'TK Kartika',
      icon: Baby,
      npsn: '10811675',
      naungan: 'Kementerian Pendidikan dan Kebudayaan',
      berdiri: '8 Januari 1999',
      noSkPendirian: '01/YA/1999/PN.KLD',
      tglOperasional: '8 Februari 2022',
      noSkOperasional: '421/459/IV.02/2022',
      jenjang: 'TK',
      status: 'Swasta',
      akreditasi: 'C',
      tglAkreditasi: '29 Desember 2006',
      noSkAkreditasi: 'KAB/KOTA 205',
      sertifikasi: 'Belum Bersertifikat',
      alamat: 'Jl. RA BASYID DESA FAJAR BARU',
      desa: 'Fajar Baru',
      kecamatan: 'Jati Agung',
      kabupaten: 'Lampung Selatan',
      provinsi: 'Lampung',
      email: 'kartikafajar2711@gmail.com',
      telp: '-',
      fax: '-',
      website: '-',
      kepalaSekolah: 'Nurlaila',
      operator: 'Herliyansyah',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-KARTIKA/WhatsApp Image 2025-11-24 at 09.16.46 (1).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-KARTIKA/WhatsApp Image 2025-11-24 at 09.16.46 (2).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-KARTIKA/WhatsApp Image 2025-11-24 at 09.16.46.jpeg`,
      ],
      description: 'TK Kartika memberikan pendidikan usia dini yang berkualitas dengan fokus pada pengembangan karakter dan kreativitas anak.',
      programs: [
        'Pendidikan karakter dan akhlak mulia',
        'Pengembangan motorik halus dan kasar',
        'Kegiatan seni dan kreativitas',
        'Pembiasaan hidup bersih dan sehat'
      ]
    },
    {
      title: 'KB Karya Lestari',
      icon: Baby,
      npsn: '69789464',
      naungan: 'Kementerian Pendidikan dan Kebudayaan',
      berdiri: '2 Februari 2010',
      noSkPendirian: '01',
      tglOperasional: '14 September 2020',
      noSkOperasional: '421/1048/IV.02/2020',
      jenjang: 'KB',
      status: 'Swasta',
      akreditasi: '-',
      tglAkreditasi: '1 Januari 1970',
      noSkAkreditasi: '-',
      sertifikasi: 'Belum Bersertifikat',
      alamat: 'Jl. PNPM DUSUN IV TANJUNG LAUT',
      desa: 'Fajar Baru',
      kecamatan: 'Jati Agung',
      kabupaten: 'Lampung Selatan',
      provinsi: 'Lampung',
      email: 'paudkaryalestari@yahoo.co.id',
      telp: '-',
      fax: '-',
      website: '-',
      kepalaSekolah: 'Ria Nur Anisa Putri',
      operator: 'Lailatul Munawaroh',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-KB-KARYA-LESTARI/WhatsApp Image 2025-11-23 at 11.32.57.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-KB-KARYA-LESTARI/WhatsApp Image 2025-11-23 at 11.42.48.jpeg`,
      ],
      description: 'KB Karya Lestari memberikan layanan pendidikan anak usia dini dengan pendekatan yang menyenangkan dan edukatif.',
      programs: [
        'Stimulasi perkembangan anak usia dini',
        'Pembelajaran berbasis bermain',
        'Pengembangan sosial-emosional',
        'Aktivitas motorik dan sensorik'
      ]
    },
    {
      title: 'TK Nur Ikhsan',
      icon: Baby,
      npsn: '69984110',
      naungan: 'Kementerian Pendidikan dan Kebudayaan',
      berdiri: '6 April 2018',
      noSkPendirian: '49',
      tglOperasional: '12 November 2018',
      noSkOperasional: '421/2180/IV.02/2018',
      jenjang: 'TK',
      status: 'Swasta',
      akreditasi: 'C',
      tglAkreditasi: '29 November 2019',
      noSkAkreditasi: '190/BAN PAUD DAN PNF/AKR/2019',
      sertifikasi: 'Belum Bersertifikat',
      alamat: 'Jl. RA. BASYID Gg. BAITUL MAKMUR DUSUN 2A',
      desa: 'Fajar Baru',
      kecamatan: 'Jati Agung',
      kabupaten: 'Lampung Selatan',
      provinsi: 'Lampung',
      email: '-',
      telp: '-',
      fax: '-',
      website: '-',
      kepalaSekolah: 'Titing Suryani Dra',
      operator: 'Siti Aminah',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-NUR-IKHSAN/WhatsApp Image 2025-11-24 at 09.16.46 (1).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-NUR-IKHSAN/WhatsApp Image 2025-11-24 at 09.16.46 (2).jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-NUR-IKHSAN/WhatsApp Image 2025-11-24 at 09.16.46.jpeg`,
      ],
      description: 'TK Nur Ikhsan berkomitmen memberikan pendidikan yang berkualitas dengan mengedepankan nilai-nilai keislaman dan karakter mulia.',
      programs: [
        'Pendidikan agama dan akhlak mulia',
        'Pengembangan kognitif dan bahasa',
        'Kegiatan seni dan kreativitas',
        'Pembiasaan hidup bersih dan sehat'
      ]
    },
    {
      title: 'TK Puri Ceria',
      icon: Baby,
      npsn: '69947512',
      naungan: 'Kementerian Pendidikan dan Kebudayaan',
      berdiri: '23 Januari 2016',
      noSkPendirian: '11',
      tglOperasional: '8 November 2019',
      noSkOperasional: '421/1913/IV.02/2019',
      jenjang: 'TK',
      status: 'Swasta',
      akreditasi: '-',
      tglAkreditasi: '1 Januari 1970',
      noSkAkreditasi: '-',
      sertifikasi: 'Belum Bersertifikat',
      alamat: 'Jl. R.A BASYID No. 107',
      desa: 'Fajar Baru',
      kecamatan: 'Jati Agung',
      kabupaten: 'Lampung Selatan',
      provinsi: 'Lampung',
      email: 'tkpuriceria@gmail.com',
      telp: '-',
      fax: '-',
      website: '-',
      kepalaSekolah: 'Fransiska Brenti Rasanti',
      operator: 'Abi Anggara Gedeon',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-PURI-CERIA/FOTO TK PURI CERIA.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-TK-PURI-CERIA/TK PURI CERIA.jpeg`,
      ],
      description: 'TK Puri Ceria memberikan pendidikan yang menyenangkan dan bermakna untuk mengoptimalkan potensi anak usia dini.',
      programs: [
        'Pembelajaran berbasis sentra',
        'Pengembangan kreativitas dan imajinasi',
        'Kegiatan outdoor dan eksplorasi alam',
        'Program parenting dan kolaborasi dengan orang tua'
      ]
    }
  ];

  const culturalPrograms = [
    {
      title: 'Karate Madani Fajar Baru',
      icon: Users,
      members: 'Anak & remaja desa',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-KARATE-MADANI/WhatsApp Image 2025-11-16 at 10.08.11.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-KARATE-MADANI/WhatsApp Image 2025-11-16 at 10.08.18.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-KARATE-MADANI/WhatsApp Image 2025-11-16 at 10.08.53.jpeg`,
      ],
      description:
        'Komunitas bela diri yang melatih kedisiplinan, sportivitas, dan kepercayaan diri generasi muda melalui latihan rutin dan keikutsertaan lomba.',
      achievements: [
        'Latihan terjadwal untuk anak dan remaja di lingkungan Desa Fajar Baru',
        'Fokus pada pembinaan karakter, fisik, dan mental yang sehat',
        'Partisipasi dalam kegiatan olahraga dan kejuaraan tingkat lokal'
      ]
    },
    {
      title: 'Majelis Taklim Fajar Baru',
      icon: BookOpen,
      members: 'Ibu-ibu & masyarakat umum',
      images: [
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-MAJLIS-TAKLIM-FAJAR-BARU/WhatsApp Image 2025-11-21 at 13.26.02.jpeg`,
        `${import.meta.env.BASE_URL}program/pendidikan-budaya/FOTO-MAJLIS-TAKLIM-FAJAR-BARU/WhatsApp Image 2025-11-21 at 13.26.13.jpeg`,
      ],
      description:
        'Forum pengajian rutin untuk memperdalam ilmu agama, memperkuat ukhuwah, dan menghidupkan tradisi keagamaan di Desa Fajar Baru.',
      achievements: [
        'Kajian rutin dan perayaan hari besar Islam bersama masyarakat',
        'Kegiatan sosial dan santunan, terutama di bulan Ramadan',
        'Peran aktif dalam pembinaan akhlak dan kehidupan beragama warga'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center pt-28 md:pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4 mr-2" />
                PENDIDIKAN & BUDAYA DESA FAJAR BARU
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Membangun Generasi <span className="text-blue-600">Cerdas</span> 
                <br className="hidden sm:block" />dan <span className="text-blue-600">Berbudaya</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Menyediakan pendidikan berkualitas dan melestarikan warisan budaya sebagai pondasi 
                membangun masyarakat Fajar Baru yang berkarakter dan berdaya saing.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Pendidikan Formal */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">2</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Pendidikan Formal</div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">SD Negeri 1 & 2 Fajar Baru yang berkualitas</p>
              </div>
              
              {/* PAUD/TK */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">4</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">PAUD/TK/KB</div>
                <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Lembaga pendidikan anak usia dini yang berkualitas</p>
              </div>
              
              {/* Program Budaya */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">2</div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Program Budaya</div>
                <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-200 rounded-full mb-3"></div>
                <p className="text-sm text-gray-600">Kegiatan pelestarian seni dan budaya lokal</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                <span>Berdasarkan UU No.20 Tahun 2003 tentang Sistem Pendidikan Nasional</span>
                <ChevronRight className="w-4 h-4 ml-1 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Education */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pendidikan <span className="text-village-green">Formal</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Sekolah-sekolah formal di Desa Fajar Baru yang memberikan pendidikan berkualitas
              untuk membentuk generasi yang berkarakter dan berprestasi.
            </p>
          </div>

          <div className="space-y-8">
            {formalEducation.map((school, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-village-green to-blue-600"></div>
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{school.name}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{school.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2 text-village-green" />
                            Informasi Sekolah
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">NPSN:</span> {school.npsn}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Berdiri:</span> {school.berdiri}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Akreditasi:</span> {school.akreditasi}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Status:</span> {school.status || 'Negeri'}</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Mail className="w-5 h-5 mr-2 text-village-green" />
                            Kontak & Alamat
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Email:</span> {school.email || '-'}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Kepala Sekolah:</span> {school.kepalaSekolah}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Operator:</span> {school.operator}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-village-green mr-2">•</span>
                              <span className="text-gray-700"><span className="font-medium">Alamat:</span> {school.alamat}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {school.achievements && school.achievements.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-village-green" />
                            Prestasi & Keunggulan
                          </h4>
                          <ul className="space-y-2">
                            {school.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-village-green mr-2">•</span>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 text-center flex flex-col h-full">
                        <CardImageSlider images={school.images} alt={school.name} />
                        <div className="mt-4 p-4 bg-white rounded-lg shadow-inner">
                          <div className="text-5xl font-bold text-village-green mb-2">
                            {school.akreditasi?.charAt(0) || 'A'}
                          </div>
                          <div className="text-sm font-medium text-gray-500">Nilai Akreditasi</div>
                          <div className="mt-4">
                            <div className="flex items-center justify-center text-sm text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                              Sekolah Aktif
                            </div>
                          </div>
                        </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              PAUD & Pendidikan <span className="text-village-green">Anak Usia Dini</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Lembaga pendidikan anak usia dini di Desa Fajar Baru yang fokus pada pengembangan 
              karakter, kreativitas, dan potensi anak sejak dini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nonFormalEducation.map((program, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <CardImageSlider images={program.images} alt={program.title} />
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{program.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          NPSN: {program.npsn}
                        </span>
                        {program.akreditasi && program.akreditasi !== 'Belum Terakreditasi' ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Akreditasi {program.akreditasi}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            {program.akreditasi || 'Belum Terakreditasi'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 text-village-green mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">Berdiri</div>
                        <div className="text-gray-600">{program.berdiri}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <User2 className="w-4 h-4 text-village-green mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">Kepala Sekolah</div>
                        <div className="text-gray-600">{program.kepalaSekolah}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 text-village-green mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <div className="text-gray-600">{program.email || '-'}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-village-green mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">Alamat</div>
                        <div className="text-gray-600 line-clamp-2">{program.alamat}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <ListChecks className="w-5 h-5 mr-2 text-village-green" />
                      Program Unggulan
                    </h4>
                    <ul className="space-y-1.5">
                      {program.programs.map((activity, activityIndex) => (
                        <li key={activityIndex} className="flex items-start text-sm text-gray-700">
                          <span className="text-village-green mr-2 mt-1">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>Operator: {program.operator}</span>
                      </div>
                      <div className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Status: Aktif
                      </div>
                    </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {culturalPrograms.map((program, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                <div className="p-8 flex flex-col h-full">
                  <CardImageSlider images={program.images} alt={program.title} />
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-village-green transition-colors">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.members} anggota aktif</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>

                  <div className="mt-auto">
                    <h4 className="font-semibold text-gray-900 mb-4">Kegiatan & Pencapaian</h4>
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


      <Footer />
      <ChatBot />
    </div>
  );
};

export default PendidikanBudayaPage;
