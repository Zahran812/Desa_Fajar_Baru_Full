import PageLayout from '@/react-app/components/PageLayout';
import { 
  MapPin, Users, Award, Eye, Heart, 
  Zap, Building2
} from 'lucide-react';
import { useContentAnimation } from '@/react-app/hooks/useContentAnimation';
import { useState, useEffect } from 'react';

const ProfilSejarah = () => {
  const { isVisible: timelineVisible, elementRef: timelineRef } = useContentAnimation({ delay: 300 });
  const { isVisible: visiVisible, elementRef: visiRef } = useContentAnimation({ delay: 200 });

  // Mission carousel state
  const [currentMissionSlide, setCurrentMissionSlide] = useState(0);

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

  // Auto slide effect for missions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMissionSlide((prev) => (prev + 1) % misiList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageLayout
      title="Profil dan Sejarah"
      subtitle="Mengenal perjalanan sejarah dan visi misi pembangunan Desa Fajar Baru"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa' },
        { name: 'Profil dan Sejarah' }
      ]}
    >
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          
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
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilSejarah;
