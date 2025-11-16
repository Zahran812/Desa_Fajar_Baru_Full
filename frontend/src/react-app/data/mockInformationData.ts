// Mock data untuk Artikel, Agenda, Galeri, dan Transparansi
export const mockArticles = [
  {
    id: 1,
    title: 'Pembangunan Jalan Desa Fajar Baru Tahap II Dimulai',
    slug: 'pembangunan-jalan-desa-fajar-baru-tahap-ii',
    excerpt: 'Pemerintah Desa Fajar Baru resmi memulai pembangunan jalan tahap II sepanjang 2 kilometer dengan anggaran dari Dana Desa tahun 2024.',
    content: '<p>Pembangunan infrastruktur jalan terus dilakukan untuk meningkatkan aksesibilitas warga...</p>',
    category: 'Pembangunan',
    status: 'published',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    author_id: 1,
    views: 245,
    created_at: '2024-10-15T08:00:00',
    updated_at: '2024-10-15T08:00:00'
  },
  {
    id: 2,
    title: 'Musyawarah Desa Membahas Program Prioritas 2025',
    slug: 'musyawarah-desa-program-prioritas-2025',
    excerpt: 'Musyawarah Desa dihadiri oleh seluruh RT, RW, dan tokoh masyarakat untuk membahas program prioritas pembangunan tahun 2025.',
    content: '<p>Musyawarah Desa merupakan forum tertinggi dalam pengambilan keputusan...</p>',
    category: 'Pemerintahan',
    status: 'published',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    author_id: 1,
    views: 178,
    created_at: '2024-10-20T10:30:00',
    updated_at: '2024-10-20T10:30:00'
  },
  {
    id: 3,
    title: 'Posyandu Balita Bulan November Berlangsung Sukses',
    slug: 'posyandu-balita-november-sukses',
    excerpt: 'Kegiatan Posyandu Balita bulan November diikuti oleh 85 balita dan ibu hamil dengan berbagai layanan kesehatan.',
    content: '<p>Posyandu merupakan salah satu program kesehatan yang rutin dilaksanakan...</p>',
    category: 'Kesehatan',
    status: 'published',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    author_id: 1,
    views: 123,
    created_at: '2024-11-01T09:00:00',
    updated_at: '2024-11-01T09:00:00'
  },
  {
    id: 4,
    title: 'Pelatihan UMKM untuk Warga Desa Fajar Baru',
    slug: 'pelatihan-umkm-warga-desa',
    excerpt: 'Dinas Koperasi dan UMKM mengadakan pelatihan kewirausahaan untuk meningkatkan ekonomi masyarakat desa.',
    content: '<p>Pelatihan UMKM ini bertujuan untuk meningkatkan keterampilan wirausaha...</p>',
    category: 'Ekonomi',
    status: 'published',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    author_id: 1,
    views: 201,
    created_at: '2024-10-25T14:00:00',
    updated_at: '2024-10-25T14:00:00'
  },
  {
    id: 5,
    title: 'Gotong Royong Bersihkan Saluran Air',
    slug: 'gotong-royong-bersihkan-saluran-air',
    excerpt: 'Warga bergotong royong membersihkan saluran air di seluruh RT untuk mencegah banjir saat musim hujan.',
    content: '<p>Kegiatan gotong royong ini dilakukan sebagai bentuk kepedulian warga...</p>',
    category: 'Lingkungan',
    status: 'draft',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800',
    author_id: 1,
    views: 45,
    created_at: '2024-11-02T07:00:00',
    updated_at: '2024-11-02T07:00:00'
  }
];

export const mockAgendaItems = [
  {
    id: 1,
    title: 'Rapat Koordinasi RT/RW',
    description: 'Rapat koordinasi bulanan membahas program kerja dan keluhan warga di masing-masing wilayah RT/RW',
    date: '2024-11-10',
    time: '19:00',
    location: 'Balai Desa Fajar Baru',
    category: 'Rapat',
    status: 'scheduled',
    organizer: 'Pemerintah Desa',
    created_at: '2024-10-28T08:00:00',
    updated_at: '2024-10-28T08:00:00'
  },
  {
    id: 2,
    title: 'Posyandu Balita dan Ibu Hamil',
    description: 'Pelayanan kesehatan untuk balita dan ibu hamil meliputi penimbangan, imunisasi, dan pemberian vitamin',
    date: '2024-11-15',
    time: '08:00',
    location: 'Posyandu Melati RT 03',
    category: 'Kesehatan',
    status: 'scheduled',
    organizer: 'Kader Posyandu',
    created_at: '2024-10-28T08:00:00',
    updated_at: '2024-10-28T08:00:00'
  },
  {
    id: 3,
    title: 'Senam Sehat Bersama',
    description: 'Senam sehat rutin setiap minggu untuk meningkatkan kesehatan masyarakat desa',
    date: '2024-11-07',
    time: '06:00',
    location: 'Lapangan Desa',
    category: 'Olahraga',
    status: 'scheduled',
    organizer: 'Karang Taruna',
    created_at: '2024-10-28T08:00:00',
    updated_at: '2024-10-28T08:00:00'
  },
  {
    id: 4,
    title: 'Pembagian Bantuan Sosial',
    description: 'Pembagian bantuan sosial berupa sembako untuk warga kurang mampu dan lansia',
    date: '2024-11-12',
    time: '09:00',
    location: 'Kantor Desa',
    category: 'Sosial',
    status: 'scheduled',
    organizer: 'Pemerintah Desa',
    created_at: '2024-10-28T08:00:00',
    updated_at: '2024-10-28T08:00:00'
  },
  {
    id: 5,
    title: 'Pelatihan Komputer untuk Pemuda',
    description: 'Pelatihan komputer dasar dan Microsoft Office untuk pemuda desa agar meningkatkan keterampilan digital',
    date: '2024-11-18',
    time: '13:00',
    location: 'Aula Balai Desa',
    category: 'Pendidikan',
    status: 'scheduled',
    organizer: 'Karang Taruna',
    created_at: '2024-10-28T08:00:00',
    updated_at: '2024-10-28T08:00:00'
  },
  {
    id: 6,
    title: 'Gotong Royong Bersih Desa',
    description: 'Kegiatan gotong royong membersihkan lingkungan desa, saluran air, dan fasilitas umum',
    date: '2024-11-05',
    time: '07:00',
    location: 'Seluruh Wilayah Desa',
    category: 'Lingkungan',
    status: 'completed',
    organizer: 'Pemerintah Desa',
    created_at: '2024-10-20T08:00:00',
    updated_at: '2024-11-05T10:00:00'
  }
];

export const mockGalleryItems = [
  {
    id: 1,
    title: 'Pembangunan Jalan Desa',
    description: 'Proses pengaspalan jalan desa tahap II sepanjang 2 kilometer',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    category: 'kegiatan',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-10-15T10:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 2,
    title: 'Musyawarah Desa',
    description: 'Foto bersama peserta Musyawarah Desa membahas program prioritas 2025',
    image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    category: 'kegiatan',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-10-20T11:00:00',
    updated_at: '2024-10-20T11:00:00'
  },
  {
    id: 3,
    title: 'Posyandu Balita',
    description: 'Kegiatan penimbangan dan imunisasi balita di Posyandu Melati',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    category: 'kesehatan',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-11-01T09:30:00',
    updated_at: '2024-11-01T09:30:00'
  },
  {
    id: 4,
    title: 'Pelatihan UMKM',
    description: 'Peserta antusias mengikuti pelatihan kewirausahaan dan pengelolaan keuangan usaha',
    image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    category: 'ekonomi',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-10-25T15:00:00',
    updated_at: '2024-10-25T15:00:00'
  },
  {
    id: 5,
    title: 'Gotong Royong Warga',
    description: 'Warga bersama-sama membersihkan saluran air dan lingkungan sekitar',
    image_url: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800',
    category: 'lingkungan',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-11-02T08:00:00',
    updated_at: '2024-11-02T08:00:00'
  },
  {
    id: 6,
    title: 'Balai Desa Fajar Baru',
    description: 'Gedung Balai Desa yang menjadi pusat pemerintahan dan pelayanan masyarakat',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    category: 'fasilitas',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-10-10T10:00:00',
    updated_at: '2024-10-10T10:00:00'
  },
  {
    id: 7,
    title: 'Sawah Produktif Desa',
    description: 'Hamparan sawah hijau yang menjadi sumber pangan utama masyarakat desa',
    image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    category: 'pertanian',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-10-05T07:00:00',
    updated_at: '2024-10-05T07:00:00'
  },
  {
    id: 8,
    title: 'Senam Sehat Pagi',
    description: 'Kegiatan senam sehat rutin setiap minggu pagi di lapangan desa',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    category: 'olahraga',
    status: 'published',
    uploaded_by: 1,
    created_at: '2024-10-28T06:30:00',
    updated_at: '2024-10-28T06:30:00'
  }
];

export const mockTransparencyData = [
  // APBDes
  {
    id: 1,
    type: 'apbd',
    title: 'APBDes Tahun Anggaran 2024',
    description: 'Anggaran Pendapatan dan Belanja Desa Fajar Baru untuk tahun anggaran 2024',
    file_url: '/documents/apbdes-2024.pdf',
    amount: 1250000000,
    year: 2024,
    quarter: undefined,
    status: 'published',
    created_at: '2024-01-10T08:00:00',
    updated_at: '2024-01-10T08:00:00'
  },
  {
    id: 2,
    type: 'apbd',
    title: 'Laporan Realisasi APBDes Semester 1 Tahun 2024',
    description: 'Laporan realisasi anggaran semester pertama menunjukkan penyerapan 48% dari total APBDes',
    file_url: '/documents/realisasi-apbdes-sem1-2024.pdf',
    amount: 600000000,
    year: 2024,
    quarter: 2,
    status: 'published',
    created_at: '2024-07-15T09:00:00',
    updated_at: '2024-07-15T09:00:00'
  },
  {
    id: 3,
    type: 'apbd',
    title: 'Rencana Kerja Pemerintah Desa (RKPDes) 2024',
    description: 'Dokumen perencanaan kegiatan dan anggaran desa untuk tahun 2024',
    file_url: '/documents/rkpdes-2024.pdf',
    amount: undefined,
    year: 2024,
    quarter: undefined,
    status: 'published',
    created_at: '2023-12-20T10:00:00',
    updated_at: '2023-12-20T10:00:00'
  },
  
  // Bantuan Sosial
  {
    id: 4,
    type: 'bansos',
    title: 'Program Bantuan Langsung Tunai (BLT) Dana Desa 2024',
    description: 'Penyaluran BLT kepada 150 keluarga penerima manfaat di Desa Fajar Baru',
    file_url: '/documents/blt-2024.pdf',
    amount: 225000000,
    year: 2024,
    quarter: 1,
    status: 'published',
    created_at: '2024-03-10T08:00:00',
    updated_at: '2024-03-10T08:00:00'
  },
  {
    id: 5,
    type: 'bansos',
    title: 'Bantuan Pangan Non Tunai (BPNT) Triwulan 2',
    description: 'Distribusi bantuan pangan untuk 200 KPM melalui kartu elektronik',
    file_url: '/documents/bpnt-tw2-2024.pdf',
    amount: 180000000,
    year: 2024,
    quarter: 2,
    status: 'published',
    created_at: '2024-06-05T09:00:00',
    updated_at: '2024-06-05T09:00:00'
  },
  {
    id: 6,
    type: 'bansos',
    title: 'Program Keluarga Harapan (PKH) Tahun 2024',
    description: 'Bantuan sosial bersyarat untuk 120 keluarga sangat miskin',
    file_url: '/documents/pkh-2024.pdf',
    amount: 288000000,
    year: 2024,
    quarter: undefined,
    status: 'published',
    created_at: '2024-01-15T08:30:00',
    updated_at: '2024-01-15T08:30:00'
  },
  
  // Pembangunan
  {
    id: 7,
    type: 'pembangunan',
    title: 'Pembangunan Jalan Desa Tahap II',
    description: 'Pengaspalan jalan desa sepanjang 2 km dengan dana desa',
    file_url: '/documents/jalan-tahap2-2024.pdf',
    amount: 450000000,
    year: 2024,
    quarter: 3,
    status: 'published',
    created_at: '2024-08-20T10:00:00',
    updated_at: '2024-08-20T10:00:00'
  },
  {
    id: 8,
    type: 'pembangunan',
    title: 'Rehabilitasi Balai Desa',
    description: 'Perbaikan dan pengecatan ulang gedung balai desa',
    file_url: '/documents/rehab-balai-2024.pdf',
    amount: 85000000,
    year: 2024,
    quarter: 2,
    status: 'published',
    created_at: '2024-05-10T09:00:00',
    updated_at: '2024-05-10T09:00:00'
  },
  {
    id: 9,
    type: 'pembangunan',
    title: 'Pembangunan Saluran Drainase RT 03',
    description: 'Pembuatan saluran air untuk mencegah genangan saat hujan',
    file_url: '/documents/drainase-rt03-2024.pdf',
    amount: 120000000,
    year: 2024,
    quarter: 1,
    status: 'published',
    created_at: '2024-04-01T08:00:00',
    updated_at: '2024-04-01T08:00:00'
  },
  
  // IDM (Indeks Desa Membangun)
  {
    id: 10,
    type: 'idm',
    title: 'Indeks Desa Membangun (IDM) 2024',
    description: 'Status IDM Desa Fajar Baru: Berkembang dengan skor 0.7125',
    file_url: '/documents/idm-2024.pdf',
    amount: undefined,
    year: 2024,
    quarter: undefined,
    status: 'published',
    created_at: '2024-09-15T10:00:00',
    updated_at: '2024-09-15T10:00:00'
  },
  {
    id: 11,
    type: 'idm',
    title: 'Profil Kemajuan Desa 2023-2024',
    description: 'Peningkatan status dari Berkembang Awal ke Berkembang dalam setahun',
    file_url: '/documents/profil-kemajuan-2024.pdf',
    amount: undefined,
    year: 2024,
    quarter: undefined,
    status: 'published',
    created_at: '2024-10-01T09:00:00',
    updated_at: '2024-10-01T09:00:00'
  },
  
  // Statistik
  {
    id: 12,
    type: 'statistik',
    title: 'Data Kependudukan Desa Fajar Baru 2024',
    description: 'Total penduduk 2,847 jiwa dengan 847 KK terdaftar',
    file_url: '/documents/data-penduduk-2024.pdf',
    amount: undefined,
    year: 2024,
    quarter: 3,
    status: 'published',
    created_at: '2024-09-01T08:00:00',
    updated_at: '2024-09-01T08:00:00'
  },
  {
    id: 13,
    type: 'statistik',
    title: 'Statistik Pelayanan Administrasi Semester 1',
    description: 'Rekapitulasi 456 permohonan layanan administrasi yang telah diproses',
    file_url: '/documents/stat-layanan-sem1-2024.pdf',
    amount: undefined,
    year: 2024,
    quarter: 2,
    status: 'published',
    created_at: '2024-07-10T09:00:00',
    updated_at: '2024-07-10T09:00:00'
  },
  {
    id: 14,
    type: 'statistik',
    title: 'Laporan Kegiatan Desa Januari-September 2024',
    description: 'Total 45 kegiatan berhasil dilaksanakan dengan partisipasi warga',
    file_url: '/documents/lap-kegiatan-2024.pdf',
    amount: undefined,
    year: 2024,
    quarter: 3,
    status: 'published',
    created_at: '2024-10-05T10:00:00',
    updated_at: '2024-10-05T10:00:00'
  }
];

export const mockVillagePrograms = [
  // BUMDes & Ekonomi
  {
    id: 1,
    name: 'BUMDes Mart Desa Fajar Baru',
    type: 'ekonomi',
    description: 'Toko kelontong desa yang menyediakan kebutuhan pokok dan UMKM lokal dengan harga terjangkau',
    beneficiaries: 2847,
    budget: 150000000,
    status: 'active',
    start_date: '2023-05-15',
    end_date: undefined,
    created_at: '2023-05-10T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 2,
    name: 'Pelatihan Kewirausahaan UMKM',
    type: 'ekonomi',
    description: 'Program pelatihan untuk meningkatkan keterampilan wirausaha dan manajemen usaha bagi pelaku UMKM desa',
    beneficiaries: 45,
    budget: 25000000,
    status: 'active',
    start_date: '2024-08-01',
    end_date: '2024-12-31',
    created_at: '2024-07-20T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 3,
    name: 'Koperasi Simpan Pinjam Desa',
    type: 'ekonomi',
    description: 'Koperasi yang memberikan akses permodalan dengan bunga rendah untuk warga desa',
    beneficiaries: 320,
    budget: 500000000,
    status: 'active',
    start_date: '2022-01-10',
    end_date: undefined,
    created_at: '2021-12-01T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 4,
    name: 'Pengembangan Budidaya Ikan Lele',
    type: 'ekonomi',
    description: 'Program pemberdayaan masyarakat melalui budidaya ikan lele dalam kolam terpal',
    beneficiaries: 25,
    budget: 35000000,
    status: 'active',
    start_date: '2024-06-01',
    end_date: '2025-05-31',
    created_at: '2024-05-15T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  
  // Kesehatan & Sosial
  {
    id: 5,
    name: 'Posyandu Balita dan Ibu Hamil',
    type: 'kesehatan',
    description: 'Pelayanan kesehatan rutin setiap bulan untuk balita dan ibu hamil di 5 posyandu desa',
    beneficiaries: 185,
    budget: 45000000,
    status: 'active',
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    created_at: '2023-12-10T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 6,
    name: 'Program Lansia Sehat',
    type: 'kesehatan',
    description: 'Pemeriksaan kesehatan gratis dan senam lansia rutin untuk warga usia lanjut',
    beneficiaries: 142,
    budget: 18000000,
    status: 'active',
    start_date: '2024-03-01',
    end_date: '2024-12-31',
    created_at: '2024-02-15T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 7,
    name: 'Bantuan Sosial untuk Keluarga Miskin',
    type: 'kesehatan',
    description: 'Program bantuan sembako dan layanan kesehatan gratis untuk 150 keluarga kurang mampu',
    beneficiaries: 150,
    budget: 180000000,
    status: 'active',
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    created_at: '2023-12-20T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 8,
    name: 'Program Sanitasi dan Air Bersih',
    type: 'kesehatan',
    description: 'Pembangunan fasilitas MCK dan akses air bersih untuk 50 rumah tangga',
    beneficiaries: 50,
    budget: 125000000,
    status: 'active',
    start_date: '2024-07-01',
    end_date: '2025-06-30',
    created_at: '2024-06-10T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  
  // Pendidikan & Budaya
  {
    id: 9,
    name: 'Beasiswa Pendidikan Anak Berprestasi',
    type: 'pendidikan',
    description: 'Bantuan beasiswa untuk 30 siswa berprestasi dari keluarga kurang mampu tingkat SD-SMA',
    beneficiaries: 30,
    budget: 60000000,
    status: 'active',
    start_date: '2024-07-15',
    end_date: '2025-06-30',
    created_at: '2024-06-25T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 10,
    name: 'Perpustakaan Desa Digital',
    type: 'pendidikan',
    description: 'Pengadaan buku dan fasilitas perpustakaan dengan akses internet gratis untuk belajar',
    beneficiaries: 500,
    budget: 75000000,
    status: 'active',
    start_date: '2024-05-01',
    end_date: undefined,
    created_at: '2024-04-10T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 11,
    name: 'Sanggar Seni dan Budaya Desa',
    type: 'pendidikan',
    description: 'Wadah untuk melestarikan seni tari tradisional, musik gamelan, dan kerajinan lokal',
    beneficiaries: 85,
    budget: 40000000,
    status: 'active',
    start_date: '2024-02-01',
    end_date: undefined,
    created_at: '2024-01-15T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 12,
    name: 'Pelatihan Komputer untuk Pemuda',
    type: 'pendidikan',
    description: 'Kursus komputer dan internet untuk meningkatkan literasi digital pemuda desa',
    beneficiaries: 60,
    budget: 30000000,
    status: 'active',
    start_date: '2024-09-01',
    end_date: '2024-12-31',
    created_at: '2024-08-20T08:00:00',
    updated_at: '2024-10-15T10:00:00'
  },
  {
    id: 13,
    name: 'Festival Budaya Desa Tahunan',
    type: 'pendidikan',
    description: 'Event tahunan untuk menampilkan kesenian lokal dan mempromosikan potensi desa',
    beneficiaries: 1500,
    budget: 55000000,
    status: 'completed',
    start_date: '2024-08-17',
    end_date: '2024-08-18',
    created_at: '2024-07-01T08:00:00',
    updated_at: '2024-08-20T10:00:00'
  }
];
