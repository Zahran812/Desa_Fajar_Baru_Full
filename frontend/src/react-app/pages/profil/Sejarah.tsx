import PageLayout from '@/react-app/components/PageLayout';
import { Clock, MapPin, Users, Award } from 'lucide-react';

const SejarahPage = () => {
  const timelineEvents = [
    {
      year: '1945',
      title: 'Pembentukan Desa',
      description: 'Desa Fajar Baru resmi dibentuk sebagai bagian dari reorganisasi wilayah pasca kemerdekaan Indonesia.',
      icon: MapPin
    },
    {
      year: '1965',
      title: 'Pembangunan Infrastruktur',
      description: 'Dimulainya pembangunan jalan utama dan fasilitas dasar seperti balai desa dan sekolah pertama.',
      icon: Users
    },
    {
      year: '1985',
      title: 'Program Transmigrasi',
      description: 'Desa Fajar Baru menjadi lokasi program transmigrasi yang meningkatkan jumlah penduduk secara signifikan.',
      icon: Users
    },
    {
      year: '2000',
      title: 'Era Digital',
      description: 'Masuknya teknologi komunikasi dan internet pertama kali ke desa, membuka akses informasi yang lebih luas.',
      icon: Award
    },
    {
      year: '2020',
      title: 'Smart Village Initiative',
      description: 'Desa Fajar Baru menjadi pilot project smart village dengan implementasi sistem digital terintegrasi.',
      icon: Award
    }
  ];

  const culturalElements = [
    {
      name: 'Bahasa Lampung',
      description: 'Bahasa tradisional yang masih dipertahankan dalam kehidupan sehari-hari masyarakat desa.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    },
    {
      name: 'Tari Melinting',
      description: 'Tarian tradisional Lampung yang rutin dipentaskan dalam acara-acara adat dan festival desa.',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=300&h=200&fit=crop'
    },
    {
      name: 'Kerajinan Tapis',
      description: 'Kerajinan tenun tradisional khas Lampung yang menjadi warisan budaya turun temurun.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop'
    },
    {
      name: 'Kuliner Tradisional',
      description: 'Berbagai makanan khas seperti Seruit, Tempoyak, dan Gulai Taboh yang menjadi identitas kuliner desa.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop'
    }
  ];

  const importantFigures = [
    {
      name: 'Bapak Sutrisno',
      role: 'Kepala Desa Pertama (1945-1965)',
      contribution: 'Memimpin pembentukan struktur pemerintahan desa dan pembangunan infrastruktur dasar.'
    },
    {
      name: 'Ibu Siti Aminah',
      role: 'Tokoh Pendidikan (1970-2000)',
      contribution: 'Mendirikan sekolah pertama dan mengembangkan program pendidikan untuk anak-anak desa.'
    },
    {
      name: 'Bapak Ahmad Wijaya',
      role: 'Pengembang Ekonomi (1990-2010)',
      contribution: 'Memperkenalkan sistem pertanian modern dan mengembangkan koperasi desa pertama.'
    }
  ];

  return (
    <PageLayout
      title="Sejarah Desa Fajar Baru"
      subtitle="Perjalanan panjang membangun desa dari masa ke masa"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa' },
        { name: 'Sejarah Desa' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Sejarah Singkat */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Asal Mula Desa Fajar Baru</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-6">
                  Desa Fajar Baru memiliki sejarah panjang yang dimulai sejak tahun 1945, tepat setelah Indonesia merdeka. 
                  Nama "Fajar Baru" dipilih sebagai simbol harapan akan masa depan yang cerah dan kehidupan yang lebih baik 
                  bagi masyarakat yang tinggal di wilayah ini.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Desa ini awalnya merupakan area hutan yang kemudian dibuka oleh para pendatang dari berbagai daerah di Jawa 
                  dan Sumatera. Mereka datang dengan semangat membangun kehidupan baru di tanah Lampung yang subur. 
                  Keberagaman asal daerah ini kemudian menjadi kekayaan budaya yang unik dalam kehidupan masyarakat desa.
                </p>
                <p className="text-lg leading-relaxed">
                  Seiring berjalannya waktu, Desa Fajar Baru terus berkembang menjadi desa yang mandiri dan modern. 
                  Pada tahun 2020, desa ini dipilih sebagai pilot project untuk program Smart Village, 
                  menandai babak baru dalam sejarah perkembangan desa menuju era digital.
                </p>
              </div>
            </div>
          </section>

          {/* Timeline Sejarah */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Timeline Sejarah Desa</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-village-green to-blue-500"></div>
              
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white rounded-xl shadow-lg p-6 relative">
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-village-green rounded-full ${
                          index % 2 === 0 ? '-right-2' : '-left-2'
                        }`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <event.icon className="w-5 h-5 text-village-green" />
                          <span className="text-2xl font-bold text-village-green">{event.year}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Budaya dan Tradisi */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Budaya dan Tradisi</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {culturalElements.map((culture, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={culture.image} 
                    alt={culture.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{culture.name}</h3>
                    <p className="text-gray-600 text-sm">{culture.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tokoh Penting */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Tokoh Penting dalam Sejarah Desa</h2>
            <div className="space-y-6">
              {importantFigures.map((figure, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-village-green to-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{figure.name}</h3>
                      <p className="text-village-green font-medium mb-3">{figure.role}</p>
                      <p className="text-gray-600">{figure.contribution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default SejarahPage;
