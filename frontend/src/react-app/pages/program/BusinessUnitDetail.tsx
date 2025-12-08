import { 
  MapPin, Phone, Mail, Clock, Users, 
  Star, Shield, ShoppingCart, ArrowLeft
} from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BusinessUnitDetailPage = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();

  // Business units data
  const businessUnits = {
    'kendar-ikan': {
      id: 'kendar-ikan',
      name: 'Kendar Ikan',
      description: 'Jual Bibit Lele, Nila, Gurame, Cupang',
      fullDescription: 'Kendar Ikan adalah unit usaha BUMDes Fajar Baru yang bergerak di bidang perikanan, khususnya penjualan bibit ikan berkualitas tinggi. Kami menyediakan berbagai jenis bibit ikan seperti Lele, Nila, Gurame, dan Cupang dengan kualitas terbaik untuk mendukung budidaya ikan di Desa Fajar Baru dan sekitarnya.',
      capacity: 'Bibit Ikan Berkualitas',
      members: 'Tim Ahli',
      status: 'Beroperasi',
      manager: 'Pengelola Kendar Ikan',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      rating: 4.8,
      reviewsCount: 18,
      foundedYear: 2018,
      image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan.jpg',
      reviews: [
        {
          author: 'Budi Santoso',
          rating: 5,
          comment: 'Bibit ikan sehat dan pelayanan sangat ramah.'
        },
        {
          author: 'Siti Aminah',
          rating: 4,
          comment: 'Pengiriman tepat waktu, kualitas bibit bagus.'
        }
      ],
      products: [
        {
          name: 'Bibit Ikan Lele Premium',
          price: 'Rp750.000',
          description: 'Bibit lele unggul untuk budidaya skala rumahan maupun kolam besar.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan/bibit-ikan-lele.jpg'
        },
        {
          name: 'Bibit Nila Merah',
          price: 'Rp900.000',
          description: 'Bibit nila merah dengan pertumbuhan cepat dan tahan penyakit.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan/bibit-nila.jpg'
        },
        {
          name: 'Paket Bibit Gurame',
          price: 'Rp1.250.000',
          description: 'Paket bibit gurame siap tebar untuk kolam keluarga atau usaha.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan/bibit-gurame.jpg'
        },
        {
          name: 'Paket Campuran Bibit Ikan',
          price: 'Rp1.500.000',
          description: 'Paket campuran bibit lele, nila, dan gurame untuk percobaan budidaya skala kecil.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan/bibit-campuran.jpg'
        },
        {
          name: 'Bibit Ikan Cupang Hias',
          price: 'Rp300.000',
          description: 'Bibit cupang hias warna-warni untuk hobi dan koleksi.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan/bibit-ikan-cupang.jpg'
        },
        {
          name: 'Paket Pendampingan Budidaya',
          price: 'Rp500.000',
          description: 'Paket konsultasi dan pendampingan budidaya ikan selama 1 bulan.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan/paket-budidaya.jpg'
        }
      ],
      features: ['Bibit Lele', 'Bibit Nila', 'Bibit Gurame', 'Bibit Cupang'],
      address: 'Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/9fJNCgjURtMuTh2Y7',
      phone: '(021) 12345678',
      email: 'kendar.ikan@example.com',
      operatingHours: 'Senin - Sabtu, 08.00 - 17.00 WIB',
      services: [
        'Penjualan Bibit Ikan Berkualitas',
        'Konsultasi Budidaya Ikan',
        'Pengiriman Bibit ke Lokasi',
        'Garansi Kualitas Bibit',
        'Teknis Budidaya Gratis'
      ],
      achievements: [
        'Supplier Bibit Terpercaya 2023',
        'Pelayanan Terbaik Desa Fajar Baru',
        'Produksi Bibit 10.000+ ekor/bulan'
      ]
    },
    'mars-collections': {
      id: 'mars-collections',
      name: 'Mars Collections',
      description: 'Toko fashion dengan berbagai koleksi pakaian dan aksesoris terkini',
      fullDescription: 'Mars Collections adalah unit usaha BUMDes Fajar Baru di bidang fashion retail. Kami menyediakan berbagai koleksi pakaian dan aksesoris terkini dengan harga terjangkau, mulai dari pakaian kasual, fashion muslim, hingga aksesoris pelengkap gaya Anda.',
      capacity: 'Fashion & Aksesoris',
      members: 'Tim Kreatif',
      status: 'Beroperasi',
      manager: 'Pengelola Mars Collections',
      icon: ShoppingCart,
      color: 'from-pink-500 to-rose-500',
      rating: 4.7,
      reviewsCount: 24,
      foundedYear: 2019,
      image: 'program/bumdes-ekonomi/unit-usaha/mars-collection.jpg',
      reviews: [
        {
          author: 'Dewi Lestari',
          rating: 5,
          comment: 'Koleksi pakaian sangat lengkap dan trendi.'
        },
        {
          author: 'Rudi Hartono',
          rating: 4,
          comment: 'Harga terjangkau, pelayanan baik.'
        }
      ],
      products: [
        {
          name: 'Gaun Casual Everyday',
          price: 'Rp250.000',
          description: 'Gaun santai dengan bahan lembut dan nyaman dipakai sepanjang hari.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/mars-collection/gaun-kasual.jpg'
        },
        {
          name: 'Kemeja Pria Slim Fit',
          price: 'Rp199.000',
          description: 'Kemeja pria modern cocok untuk kerja maupun acara semi formal.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/mars-collection/kemeja-slimfit.jpg'
        },
        {
          name: 'Set Hijab Fashion',
          price: 'Rp275.000',
          description: 'Paket kerudung dan aksesoris untuk melengkapi gaya muslimah.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/mars-collection/set-hijab.jpg'
        },
        {
          name: 'Kemeja Batik Modern',
          price: 'Rp320.000',
          description: 'Kemeja batik dengan potongan modern cocok untuk kerja maupun acara resmi.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/mars-collection/kemeja-batik.jpg'
        },
        {
          name: 'Jaket Hoodie Unisex',
          price: 'Rp230.000',
          description: 'Hoodie nyaman dengan bahan lembut, cocok untuk segala usia.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/mars-collection/jaket-hoodie.jpg'
        },
        {
          name: 'Paket Aksesoris Harian',
          price: 'Rp150.000',
          description: 'Paket aksesoris berisi kalung, gelang, dan anting untuk tampilan sehari-hari.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/mars-collection/paket-aksesoris.jpg'
        }
      ],
      features: ['Pakaian', 'Aksesoris', 'Fashion Muslim', 'Produk Lokal'],
      address: 'Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/dsmq2MgsH64PdDh89',
      phone: '(021) 12345679',
      email: 'mars.collections@example.com',
      operatingHours: 'Senin - Minggu, 09.00 - 21.00 WIB',
      services: [
        'Penjualan Pakaian Pria & Wanita',
        'Fashion Muslim Collection',
        'Aksesoris Fashion',
        'Custom Design',
        'Layanan Pengiriman'
      ],
      achievements: [
        'Toko Fashion Terfavorit 2023',
        '100+ Produk Lokal',
        'Pelanggan Setia 500+'
      ]
    },
    'rf-cctv': {
      id: 'rf-cctv',
      name: 'RF CCTV Lampung',
      description: 'Pemasangan dan perawatan sistem keamanan CCTV untuk rumah dan bisnis',
      fullDescription: 'RF CCTV Lampung adalah unit usaha BUMDes Fajar Baru yang bergerak di bidang solusi keamanan. Kami menyediakan layanan pemasangan dan perawatan sistem CCTV untuk rumah, kantor, dan bisnis dengan produk berkualitas dan teknisi berpengalaman.',
      capacity: 'Solusi Keamanan',
      members: 'Teknisi Berpengalaman',
      status: 'Beroperasi',
      manager: 'Pengelola RF CCTV',
      icon: Shield,
      color: 'from-gray-600 to-slate-700',
      rating: 4.9,
      reviewsCount: 15,
      foundedYear: 2017,
      image: 'program/bumdes-ekonomi/unit-usaha/rf-cctv-lampung.jpg',
      reviews: [
        {
          author: 'Andi Pratama',
          rating: 5,
          comment: 'Pemasangan rapi dan kualitas gambar CCTV sangat jelas.'
        },
        {
          author: 'Lina Oktavia',
          rating: 5,
          comment: 'Respon cepat saat ada kendala teknis.'
        }
      ],
      products: [
        {
          name: 'Paket CCTV Rumah 4 Kamera',
          price: 'Rp3.500.000',
          description: 'Paket pemasangan CCTV lengkap untuk rumah dengan 4 kamera HD.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/RF-CCTV-Lampung/Paket-CCTV-Rumah-4-Kamera.jpeg'
        },
        {
          name: 'Paket CCTV Toko 8 Kamera',
          price: 'Rp6.800.000',
          description: 'Solusi keamanan toko dan kantor dengan 8 kamera dan DVR.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/RF-CCTV-Lampung/Pake-CCTV-Toko-8-Kamera.jpg'
        },
        {
          name: 'Layanan Maintenance Tahunan',
          price: 'Rp1.200.000',
          description: 'Perawatan sistem CCTV selama satu tahun dengan kunjungan berkala.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/RF-CCTV-Lampung/Layanan-Maintenance-Tahunan.jpg'
        },
        {
          name: 'Paket CCTV Rumah 2 Kamera',
          price: 'Rp2.300.000',
          description: 'Pilihan hemat untuk rumah kecil dengan 2 kamera HD dan DVR.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/RF-CCTV-Lampung/Paket-CCTV-Rumah-2-Kamera.jpg'
        },
        {
          name: 'Upgrade Penyimpanan DVR',
          price: 'Rp800.000',
          description: 'Upgrade kapasitas penyimpanan DVR agar rekaman tersimpan lebih lama.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/RF-CCTV-Lampung/Upgrade-Penyimpanan-DVR.jpg'
        },
        {
          name: 'Paket Konsultasi Keamanan',
          price: 'Rp500.000',
          description: 'Survey lokasi dan rekomendasi sistem keamanan yang sesuai kebutuhan.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/RF-CCTV-Lampung/Paket-Konsultasi-Keamanan.jpg'
        }
      ],
      features: ['Pemasangan CCTV', 'Maintenance', 'Sistem Keamanan', 'Konsultasi'],
      address: 'M74C+2J2, Jl. Rahayu Gg. Makmur No.6, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/RK828bBxqWZLY9gB7',
      phone: '(021) 12345680',
      email: 'rfcctv.lampung@example.com',
      operatingHours: 'Senin - Sabtu, 08.00 - 17.00 WIB',
      services: [
        'Pemasangan CCTV Rumah',
        'CCTV untuk Kantor',
        'Sistem Keamanan Terintegrasi',
        'Maintenance CCTV',
        'Konsultasi Keamanan'
      ],
      achievements: [
        '100+ Instalasi CCTV',
        'Teknisi Bersertifikat',
        'Garansi Service 1 Tahun'
      ]
    },
    'tikatani': {
      id: 'tikatani',
      name: 'Tikatani Fajar Baru',
      description: 'Usaha kuliner khas dengan cita rasa otentik dari bahan-bahan pilihan',
      fullDescription: 'Tikatani Fajar Baru adalah unit usaha BUMDes di bidang kuliner yang menyajikan berbagai makanan khas dengan cita rasa otentik. Kami menggunakan bahan-bahan pilihan lokal untuk menciptakan hidangan lezat yang melestarikan kuliner tradisional Desa Fajar Baru.',
      capacity: 'Kuliner Khas',
      members: 'Koki Profesional',
      status: 'Beroperasi',
      manager: 'Pengelola Tikatani',
      icon: ShoppingCart,
      color: 'from-amber-500 to-orange-500',
      rating: 4.6,
      reviewsCount: 12,
      foundedYear: 2020,
      image: 'program/bumdes-ekonomi/unit-usaha/tiktani.jpg',
      reviews: [
        {
          author: 'Mahmud',
          rating: 5,
          comment: 'Masakan enak dan porsinya pas untuk acara keluarga.'
        },
        {
          author: 'Rina',
          rating: 4,
          comment: 'Snack box variatif dan selalu fresh.'
        }
      ],
      products: [
        {
          name: 'Paket Nasi Kotak Khas Fajar Baru',
          price: 'Rp25.000',
          description: 'Nasi kotak dengan lauk khas desa, cocok untuk acara keluarga.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/tiktani/Paket-Nasi-Kotak-Khas.jpg'
        },
        {
          name: 'Snack Box Tradisional',
          price: 'Rp18.000',
          description: 'Aneka kue tradisional dalam satu kotak untuk rapat atau arisan.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/tiktani/Snack-Box-Tradisional.jpg'
        },
        {
          name: 'Paket Prasmanan Lengkap',
          price: 'Mulai Rp45.000/porsi',
          description: 'Layanan catering prasmanan untuk acara pernikahan atau hajatan.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/tiktani/Paket-Prasmanan-Lengkap.jpg'
        },
        {
          name: 'Paket Coffee Break Kantor',
          price: 'Rp22.000',
          description: 'Paket kopi, teh, dan snack untuk kebutuhan rapat atau pelatihan kantor.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/tiktani/Paket-Coffee-Break-Kantor.jpg'
        },
        {
          name: 'Paket Tumpeng Ulang Tahun',
          price: 'Mulai Rp350.000',
          description: 'Tumpeng lengkap dengan lauk pendamping untuk perayaan spesial.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/tiktani/Paket-Tumpeng-Ulang-Tahun.jpg'
        },
        {
          name: 'Paket Nasi Kotak Ekonomis',
          price: 'Rp20.000',
          description: 'Pilihan nasi kotak hemat dengan menu sederhana namun tetap lezat.'
          ,
          image: 'program/bumdes-ekonomi/unit-usaha/tiktani/Paket-Nasi-Kotak-Ekonomis.jpg'
        }
      ],
      features: ['Makanan Khas', 'Minuman Segar', 'Catering', 'Makanan Siap Saji'],
      address: 'M749+678, Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
      mapLink: 'https://maps.app.goo.gl/YRacF4xQ12CmMxAh8',
      phone: '(021) 12345681',
      email: 'tikatani.fajarbaru@example.com',
      operatingHours: 'Senin - Minggu, 06.00 - 22.00 WIB',
      services: [
        'Makanan Khas Daerah',
        'Catering Acara',
        'Pesan Antar',
        'Paket Hemat',
        'Menu Harian'
      ],
      achievements: [
        'Restoran Terfavorit 2023',
        'Menu Khas Terbaik',
        'Pelayanan Ramah'
      ]
    }
  };

  const unit = businessUnits[unitId as keyof typeof businessUnits];

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Unit Usaha Tidak Ditemukan</h1>
            <button 
              onClick={() => navigate('/program/bumdes-ekonomi')}
              className="btn-primary"
            >
              Kembali ke Halaman BUMDes
            </button>
          </div>
        </div>
        <Footer />
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 md:pt-28 pb-10 md:pb-16">
        <div className="container mx-auto px-4">
          {/* Back link area */}
          <div className="mb-4 md:mb-6">
            <button
              type="button"
              onClick={() => navigate('/program/bumdes-ekonomi')}
              className="inline-flex items-center text-sm md:text-base text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke BUMDes & Ekonomi
            </button>
          </div>

          {/* Top Section: Image + Contact */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-10 md:mb-12">
            {/* Left: Image Card with CTA */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="bg-gray-100 flex-1 flex items-center justify-center aspect-[16/9] overflow-hidden">
                {unit.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${unit.image}`}
                    alt={unit.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center mb-3">
                      <unit.icon className="w-7 h-7" />
                    </div>
                    <p className="text-sm">Belum ada foto unit usaha</p>
                  </div>
                )}
              </div>

              {(() => {
                const waNumber = '6285768514691';
                const contactMessage = `Assalamualaikum, saya tertarik dengan layanan unit usaha ${unit.name}. Mohon info produk, harga, dan cara pemesanannya.`;
                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(contactMessage)}`;

                return (
                  <>
                    <button
                      type="button"
                      className="mt-0 w-full bg-village-green hover:bg-green-600 text-white font-semibold py-3 md:py-3.5 text-sm md:text-base flex items-center justify-center gap-2"
                      onClick={() => window.open(waUrl, '_blank')}
                    >
                      <Phone className="w-4 h-4" />
                      Hubungi Unit Usaha
                    </button>
                    <div className="mt-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
                      <p className="font-semibold text-gray-700 text-[0.65rem]">Template chat WhatsApp:</p>
                      <p className="whitespace-pre-line leading-snug text-[0.75rem]">{contactMessage}</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Right: Title, Rating, Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{unit.name}</h1>
              <p className="text-gray-600 text-sm md:text-base mb-4">{unit.description}</p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 font-semibold text-sm md:text-base">{unit.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs md:text-sm text-gray-500">
                  ({unit.reviewsCount} ulasan)
                </span>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Alamat</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base">{unit.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Telepon</p>
                    <a
                      href={`tel:${unit.phone}`}
                      className="text-gray-800 font-medium hover:text-village-green text-sm md:text-base"
                    >
                      {unit.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a
                      href={`mailto:${unit.email}`}
                      className="text-gray-800 font-medium hover:text-village-green break-all text-sm md:text-base"
                    >
                      {unit.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Tahun Berdiri</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base">{unit.foundedYear}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Pengelola</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base">{unit.manager}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={unit.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm md:text-base text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <MapPin className="w-4 h-4 mr-1.5" />
                    Lihat di Peta
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Tabs (Produk, Ulasan, Tentang) */}
          <BottomSection unit={unit} navigate={navigate} />
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default BusinessUnitDetailPage;

type UnitProduct = {
  name: string;
  price: string;
  description: string;
  image?: string;
};

type UnitReview = {
  author: string;
  rating: number;
  comment: string;
};

type BottomSectionProps = {
  unit: {
    id: string;
    name: string;
    capacity: string;
    manager: string;
    foundedYear: number;
    address: string;
    phone: string;
    email: string;
    fullDescription: string;
    rating: number;
    reviewsCount: number;
    products?: UnitProduct[];
    reviews?: UnitReview[];
  };
  navigate: (path: string, options?: { state?: unknown }) => void;
};

const BottomSection: React.FC<BottomSectionProps> = ({ unit, navigate }) => {
  const [activeTab, setActiveTab] = useState<'produk' | 'ulasan' | 'tentang'>('produk');

  const [reviews, setReviews] = useState<UnitReview[]>(() => {
    const baseReviews = unit.reviews ?? [];
    const dummyReviews: UnitReview[] = [
      {
        author: 'Yusuf',
        rating: 5,
        comment: 'Pelayanan sangat baik dan responsif, sangat direkomendasikan.'
      },
      {
        author: 'Nurul',
        rating: 4,
        comment: 'Produk sesuai deskripsi, pengiriman juga cukup cepat.'
      },
      {
        author: 'Adi',
        rating: 5,
        comment: 'Sangat puas, akan kembali pesan lagi di sini.'
      },
      {
        author: 'Lestari',
        rating: 4,
        comment: 'Harga terjangkau dengan kualitas yang sangat baik.'
      },
      {
        author: 'Bagus',
        rating: 5,
        comment: 'Lokasi mudah dijangkau dan staf ramah sekali.'
      },
      {
        author: 'Rahma',
        rating: 4,
        comment: 'Secara keseluruhan bagus, hanya saja waktu tunggunya agak lama.'
      },
      {
        author: 'Diana',
        rating: 5,
        comment: 'Tempat yang tepat untuk kebutuhan usaha di desa, mantap.'
      },
      {
        author: 'Hendra',
        rating: 4,
        comment: 'Pelayanan oke dan komunikatif, prosesnya juga jelas.'
      },
      {
        author: 'Sari',
        rating: 5,
        comment: 'Sangat membantu usaha kecil seperti saya, terima kasih.'
      },
      {
        author: 'Imam',
        rating: 5,
        comment: 'Kualitas layanan konsisten, sudah beberapa kali pakai jasa di sini.'
      }
    ];

    return [...baseReviews, ...dummyReviews];
  });

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleSeeAllReviews = () => {
    setActiveTab('ulasan');
    setShowAllReviews(true);
    const el = document.getElementById('unit-tabs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmitReview = (event: React.FormEvent) => {
    event.preventDefault();

    if (!reviewRating || reviewRating < 1 || reviewRating > 5 || !reviewComment.trim()) {
      return;
    }

    const newReview: UnitReview = {
      author: reviewName.trim() || 'Pengguna',
      rating: reviewRating,
      comment: reviewComment.trim(),
    };

    setReviews((prev) => [...prev, newReview]);
    setShowAllReviews(true);
    setReviewName('');
    setReviewRating(0);
    setReviewComment('');
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="space-y-8 md:space-y-10 mt-8" id="unit-tabs">
      {/* Tabs header */}
      <div className="bg-white rounded-2xl shadow-md p-1 flex justify-between text-sm md:text-base">
        <button
          type="button"
          onClick={() => setActiveTab('produk')}
          className={`flex-1 py-2 md:py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'produk'
              ? 'bg-village-green text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Produk
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ulasan')}
          className={`flex-1 py-2 md:py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'ulasan'
              ? 'bg-village-green text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Ulasan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tentang')}
          className={`flex-1 py-2 md:py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'tentang'
              ? 'bg-village-green text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Tentang
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'produk' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Produk dari {unit.name}
          </h2>

          {unit.products && unit.products.length > 0 ? (
            <>
              <p className="text-xs md:text-sm text-gray-500 mb-3">
                Geser ke samping untuk melihat produk lainnya.
              </p>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 md:gap-5 min-w-max">
                  {unit.products.map((product, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col overflow-hidden w-64 sm:w-72 md:w-80 flex-shrink-0"
                    >
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {product.image ? (
                          <img
                            src={`${import.meta.env.BASE_URL}${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = `${import.meta.env.BASE_URL}program/bumdes-ekonomi/unit-usaha/` + unit.id + '.jpg';
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gray-100">
                            <ShoppingCart className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 text-white text-xs tracking-wide">
                          {unit.name}
                        </div>
                      </div>

                      <div className="p-4 md:p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base mr-2">
                            {product.name}
                          </h3>
                          <span className="text-xs md:text-sm font-semibold text-village-green whitespace-nowrap">
                            {product.price}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
                          {product.description}
                        </p>

                        <button
                          type="button"
                          className="mt-auto w-full bg-gradient-to-r from-village-green to-blue-600 text-white text-xs md:text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-village-green/30 hover:from-village-green/90 hover:to-blue-600/90 transition-all duration-300"
                          onClick={() => {
                            navigate('/checkout', {
                              state: {
                                unitName: unit.name,
                                product,
                              },
                            });
                          }}
                        >
                          <Phone className="w-4 h-4" />
                          Pesan Produk
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              Belum ada katalog produk yang ditampilkan untuk unit usaha ini.
            </p>
          )}
        </div>
      )}

      {activeTab === 'tentang' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Tentang {unit.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6 text-sm md:text-base">
            <div className="space-y-2">
              <p><span className="font-semibold">Kategori:</span> {unit.capacity}</p>
              <p><span className="font-semibold">Pengelola:</span> {unit.manager}</p>
              <p><span className="font-semibold">Tahun Berdiri:</span> {unit.foundedYear}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Alamat:</p>
              <p className="text-gray-700">{unit.address}</p>
              <p className="font-semibold mt-2">Kontak:</p>
              <p className="text-gray-700">{unit.phone}</p>
              <p className="text-gray-700 break-all">{unit.email}</p>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Deskripsi</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {unit.fullDescription}
          </p>
        </div>
      )}

      {activeTab === 'ulasan' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Ulasan untuk {unit.name}
          </h2>

          <div className="mb-6 border border-gray-100 rounded-2xl p-4 md:p-5 bg-gray-50">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
              Beri ulasan Anda
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4">
              Simulasi form ulasan publik tanpa perlu login. Data hanya tersimpan sementara di halaman ini.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-sm md:text-base">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700">
                    Nama (opsional)
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-village-green focus:border-village-green bg-white"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <select
                    value={reviewRating || ''}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-village-green focus:border-village-green bg-white"
                  >
                    <option value="" disabled>
                      Pilih rating
                    </option>
                    <option value={5}>5 - Sangat puas</option>
                    <option value={4}>4 - Puas</option>
                    <option value={3}>3 - Cukup</option>
                    <option value={2}>2 - Kurang</option>
                    <option value={1}>1 - Tidak puas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs md:text-sm font-medium text-gray-700">
                  Ulasan
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-village-green focus:border-village-green bg-white resize-none"
                  placeholder="Ceritakan pengalaman Anda dengan unit usaha ini"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs md:text-sm text-gray-500">
                  *Form ini hanya simulasi. Ulasan yang Anda kirim tidak tersimpan di server.
                </p>
                <button
                  type="submit"
                  disabled={!reviewRating || !reviewComment.trim()}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-white bg-village-green hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {displayedReviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-100 rounded-xl p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm md:text-base text-gray-900">
                      {review.author}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs md:text-sm">
                      <Star className="w-4 h-4 fill-amber-400 mr-1" />
                      {review.rating.toFixed(1)}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}

              {!showAllReviews && reviews.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAllReviews(true)}
                  className="w-full md:w-auto mt-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm md:text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  Lihat semua ulasan ({reviews.length})
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Belum ada ulasan untuk unit usaha ini.
            </p>
          )}
        </div>
      )}

      {/* Summary reviews section at bottom */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Ringkasan Ulasan</h3>
        {reviews.length > 0 ? (
          <>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              Rating rata-rata {unit.rating.toFixed(1)} dari {unit.reviewsCount} ulasan.
            </p>
            <div className="space-y-3 mb-4">
              {reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs md:text-sm text-gray-900">
                      {review.author}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs">
                      <Star className="w-3 h-3 fill-amber-400 mr-1" />
                      {review.rating.toFixed(1)}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-sm mb-4">
            Belum ada ulasan yang dapat diringkas.
          </p>
        )}

        <button
          type="button"
          onClick={handleSeeAllReviews}
          className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-sm md:text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          Lihat semua ulasan
        </button>
      </div>
    </div>
  );
};
