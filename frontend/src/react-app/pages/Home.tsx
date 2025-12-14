import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import Services from '@/react-app/components/Services';
import Statistics from '@/react-app/components/Statistics';
import News from '@/react-app/components/News';
import AgendaGallery from '@/react-app/components/AgendaGallery';
import ContactCTA from '@/react-app/components/ContactCTA';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { Award, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const businessUnitsHome = [
  {
    id: 'kendar-ikan',
    name: 'Kendar Ikan',
    description: 'Jual Bibit Lele, Nila, Gurame, Cupang',
    features: ['Bibit Lele', 'Bibit Nila', 'Bibit Gurame', 'Bibit Cupang'],
    address: 'Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
    phone: '(021) 12345678',
    image: 'program/bumdes-ekonomi/unit-usaha/kendar-ikan.jpg',
  },
  {
    id: 'mars-collections',
    name: 'Mars Collections',
    description: 'Toko fashion dengan berbagai koleksi pakaian dan aksesoris terkini',
    features: ['Pakaian', 'Aksesoris', 'Fashion Muslim', 'Produk Lokal'],
    address: 'Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
    phone: '(021) 12345679',
    image: 'program/bumdes-ekonomi/unit-usaha/mars-collection.jpg',
  },
  {
    id: 'rf-cctv',
    name: 'RF CCTV Lampung',
    description: 'Pemasangan dan perawatan sistem keamanan CCTV untuk rumah dan bisnis',
    features: ['Pemasangan CCTV', 'Maintenance', 'Sistem Keamanan', 'Konsultasi'],
    address: 'M74C+2J2, Jl. Rahayu Gg. Makmur No.6, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
    phone: '(021) 12345680',
    image: 'program/bumdes-ekonomi/unit-usaha/rf-cctv-lampung.jpg',
  },
  {
    id: 'tikatani',
    name: 'Tikatani Fajar Baru',
    description: 'Usaha kuliner khas dengan cita rasa otentik dari bahan-bahan pilihan',
    features: ['Makanan Khas', 'Minuman Segar', 'Catering', 'Makanan Siap Saji'],
    address: 'M749+678, Jl. R.A. Basyid, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141',
    phone: '(021) 12345681',
    image: 'program/bumdes-ekonomi/unit-usaha/tiktani.jpg',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-6">
        <Hero />
      </div>
      {/* Sambutan Kepala Desa */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-white via-emerald-50/40 to-blue-50/60 rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-emerald-100/60 overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Foto Kepala Desa */}
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative inline-block">
                  <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                    <img
                      src={`${import.meta.env.BASE_URL}pejabat-dan-struktural/kades.png`}
                      alt="Foto Kepala Desa Fajar Baru - M. Agus Budiantoro, S.HI"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-5 py-2 rounded-2xl shadow-lg border-2 border-white flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span className="text-xs font-semibold">Kepala Desa Fajar Baru</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teks Sambutan */}
              <div className="lg:col-span-3 mt-10 lg:mt-0">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Sambutan Kepala Desa Fajar Baru
                </h2>
                <p className="text-lg text-emerald-700 font-semibold mb-2">
                  M. Agus Budiantoro, S.HI
                </p>
                <p className="text-sm text-gray-600 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-village-green" />
                  Desa Fajar Baru, Kec. Jati Agung, Kab. Lampung Selatan
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  "Selamat datang di website resmi Desa Fajar Baru. Melalui layanan digital ini,
                  kami berupaya menghadirkan informasi desa yang transparan, akses layanan publik
                  yang lebih mudah, serta ruang kolaborasi untuk seluruh warga demi terwujudnya desa
                  yang religius, bermartabat, maju, mandiri, sehat, dan sejahtera."
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Kami mengundang masyarakat untuk aktif memanfaatkan layanan yang tersedia,
                  mulai dari informasi program desa, layanan kesehatan dan sosial, hingga unit usaha BUMDES
                  yang menjadi penggerak ekonomi desa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <News />
      <Services />
      <AgendaGallery />

      {/* Ringkasan Unit Usaha BUMDES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block bg-gradient-to-r from-village-green to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              UNIT USAHA BUMDES
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              BUMDES Madani <span className="text-village-green">Fajar Baru</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
              Berbagai unit usaha desa yang dikelola BUMDES Madani Fajar Baru untuk menggerakkan
              ekonomi lokal dan membuka lapangan kerja bagi warga.
            </p>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 text-center md:text-left">
            Geser ke samping untuk melihat unit usaha lainnya.
          </p>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-max">
              {businessUnitsHome.map((unit) => (
                <div
                  key={unit.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex-shrink-0 w-[85vw] sm:w-[22rem] lg:w-[23%] max-w-sm"
                >
                  {/* Image Section */}
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}${unit.image}`}
                      alt={`${unit.name} - Unit Usaha BUMDES Madani Desa Fajar Baru`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{unit.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{unit.description}</p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {unit.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                        {unit.features.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            +{unit.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{unit.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{unit.phone}</span>
                      </div>
                    </div>

                    {/* Detail Button */}
                    <button
                      onClick={() => navigate(`/program/unit-usaha/${unit.id}`)}
                      className="w-full bg-gradient-to-r from-village-green to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-village-green/90 hover:to-blue-600/90 transition-all duration-300 flex items-center justify-center group"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Cek Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Statistics />
      <ContactCTA />
      <Footer />
      <ChatBot />
    </div>
  );
}
