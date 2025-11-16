export type GalleryItem = {
  id: string;
  title: string;
  caption?: string;
  category?: string;
  src: string; // path relative to site root, e.g. /gallery/filename.jpg
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-001',
    title: 'Kegiatan Desa Fajar Baru',
    caption: 'Dokumentasi kegiatan masyarakat',
    category: 'Kegiatan Desa',
    src: '/Galeri Desa/gambar1.jpg'
  },
  {
    id: 'g-002',
    title: 'Infrastruktur Desa',
    caption: 'Pembangunan dan perbaikan infrastruktur',
    category: 'Infrastruktur',
    src: '/Galeri Desa/gambar2.jpg'
  },
  {
    id: 'g-003',
    title: 'Kegiatan Masyarakat',
    caption: 'Aktivitas warga di lingkungan desa',
    category: 'Kegiatan Desa',
    src: '/Galeri Desa/gambar3.jpg'
  },
  {
    id: 'g-005',
    title: 'Program Pembangunan',
    caption: 'Pelaksanaan program pembangunan desa',
    category: 'Pembangunan',
    src: '/Galeri Desa/gambar5.jpg'
  },
  {
    id: 'g-006',
    title: 'Gotong Royong',
    caption: 'Semangat gotong royong warga',
    category: 'Komunitas',
    src: '/Galeri Desa/gambar6.jpg'
  },
  {
    id: 'g-007',
    title: 'Pelayanan Masyarakat',
    caption: 'Pelayanan administrasi desa',
    category: 'Pelayanan',
    src: '/Galeri Desa/gambar7.jpg'
  },
  {
    id: 'g-008',
    title: 'Kegiatan Posyandu',
    caption: 'Pelayanan kesehatan ibu dan anak',
    category: 'Kesehatan',
    src: '/Galeri Desa/gambar8.jpg'
  },
  {
    id: 'g-009',
    title: 'Rapat Desa',
    caption: 'Musyawarah dan rapat koordinasi',
    category: 'Pemerintahan',
    src: '/Galeri Desa/gambar9.jpg'
  },
  {
    id: 'g-010',
    title: 'Kegiatan PKK',
    caption: 'Pemberdayaan kesejahteraan keluarga',
    category: 'PKK',
    src: '/Galeri Desa/gambar10.jpg'
  },
  {
    id: 'g-011',
    title: 'Sosialisasi Program',
    caption: 'Sosialisasi program pemerintah desa',
    category: 'Pemerintahan',
    src: '/Galeri Desa/gambar11.jpg'
  },
  {
    id: 'g-012',
    title: 'Pembangunan Jalan',
    caption: 'Perbaikan jalan dan akses desa',
    category: 'Infrastruktur',
    src: '/Galeri Desa/gambar12.jpg'
  },
  {
    id: 'g-013',
    title: 'Kegiatan Pemuda',
    caption: 'Aktivitas karang taruna dan pemuda',
    category: 'Pemuda',
    src: '/Galeri Desa/gambar13.jpg'
  },
  {
    id: 'g-014',
    title: 'Pelatihan Keterampilan',
    caption: 'Peningkatan keterampilan masyarakat',
    category: 'Pendidikan',
    src: '/Galeri Desa/gambar14.jpg'
  },
  {
    id: 'g-015',
    title: 'Kegiatan Olahraga',
    caption: 'Turnamen dan kompetisi olahraga',
    category: 'Olahraga',
    src: '/Galeri Desa/gambar15.jpg'
  },
  {
    id: 'g-016',
    title: 'Perayaan Hari Besar',
    caption: 'Peringatan hari kemerdekaan',
    category: 'Budaya',
    src: '/Galeri Desa/gambar16.jpg'
  },
  {
    id: 'g-017',
    title: 'Kegiatan Sosial',
    caption: 'Bakti sosial dan kepedulian masyarakat',
    category: 'Sosial',
    src: '/Galeri Desa/gambar17.jpg'
  },
  {
    id: 'g-018',
    title: 'Pembinaan UMKM',
    caption: 'Pengembangan usaha mikro kecil menengah',
    category: 'Ekonomi',
    src: '/Galeri Desa/gambar18.jpg'
  },
  {
    id: 'g-019',
    title: 'Fasilitas Desa',
    caption: 'Sarana dan prasarana desa',
    category: 'Infrastruktur',
    src: '/Galeri Desa/gambar19.jpg'
  },
  {
    id: 'g-020',
    title: 'Kerja Bakti Bersih Desa',
    caption: 'Gotong royong membersihkan lingkungan',
    category: 'Komunitas',
    src: '/Galeri Desa/gambar20.jpg'
  },
  {
    id: 'g-021',
    title: 'Kegiatan Keagamaan',
    caption: 'Aktivitas keagamaan masyarakat',
    category: 'Keagamaan',
    src: '/Galeri Desa/gambar21.jpg'
  },
  {
    id: 'g-022',
    title: 'Pertemuan RT/RW',
    caption: 'Koordinasi tingkat rukun tetangga',
    category: 'Pemerintahan',
    src: '/Galeri Desa/gambar22.jpg'
  },
  {
    id: 'g-023',
    title: 'Program Kesehatan',
    caption: 'Layanan kesehatan untuk warga',
    category: 'Kesehatan',
    src: '/Galeri Desa/gambar23.jpg'
  },
  {
    id: 'g-024',
    title: 'Pengajian dan Tahlilan',
    caption: 'Kegiatan rutin pengajian warga',
    category: 'Keagamaan',
    src: '/Galeri Desa/gambar24.jpg'
  },
  {
    id: 'g-025',
    title: 'Kunjungan Pejabat',
    caption: 'Kunjungan tamu dan pejabat',
    category: 'Pemerintahan',
    src: '/Galeri Desa/gambar25.jpg'
  },
  {
    id: 'g-026',
    title: 'Lomba Desa',
    caption: 'Perlombaan dalam rangka HUT RI',
    category: 'Budaya',
    src: '/Galeri Desa/gambar26.jpg'
  },
  {
    id: 'g-027',
    title: 'Pasar Desa',
    caption: 'Aktivitas perdagangan di pasar desa',
    category: 'Ekonomi',
    src: '/Galeri Desa/gambar27.jpg'
  },
  {
    id: 'g-029',
    title: 'Peresmian Fasilitas',
    caption: 'Peresmian fasilitas umum desa',
    category: 'Pembangunan',
    src: '/Galeri Desa/gambar29.jpg'
  },
  {
    id: 'g-030',
    title: 'Suasana Desa',
    caption: 'Kehidupan sehari-hari masyarakat',
    category: 'Kegiatan Desa',
    src: '/Galeri Desa/gambar30.jpg'
  }
];
