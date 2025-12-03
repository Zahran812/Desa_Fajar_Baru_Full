import { Users, Home, User, User2, TrendingUp, MapPin } from 'lucide-react';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';
import { useState, useEffect } from 'react';

const Statistics = () => {
  const { isVisible: headerVisible, elementRef: headerRef } = useContentAnimation();
  const { visibleItems: statItems, containerRef: statsRef } = useStaggeredAnimation(4, 150);
  const { isVisible: demoVisible, elementRef: demoRef } = useContentAnimation({ delay: 400 });
  const { isVisible: areaVisible, elementRef: areaRef } = useContentAnimation({ delay: 600 });
  const { isVisible: mapVisible, elementRef: mapRef } = useContentAnimation({ delay: 900 });
  
  // Mobile carousel state for village areas
  const [currentAreaSlide, setCurrentAreaSlide] = useState(0);
  
  const stats = [
    {
      icon: Users,
      title: 'Total Penduduk',
      value: '11.626',
      subtitle: 'Jiwa',
      color: 'from-emerald-500 to-blue-500',
      trend: '+0.8%'
    },
    {
      icon: Home,
      title: 'Kepala Keluarga',
      value: '3.626',
      subtitle: 'KK',
      color: 'from-blue-500 to-emerald-500',
      trend: '+0.4%'
    },
    {
      icon: User,
      title: 'Laki-laki',
      value: '5.905',
      subtitle: 'Jiwa',
      color: 'from-cyan-500 to-blue-500',
      trend: '+0.2%'
    },
    {
      icon: User2,
      title: 'Perempuan',
      value: '5.698',
      subtitle: 'Jiwa',
      color: 'from-pink-500 to-rose-500',
      trend: '+0.1%'
    }
  ];

  const demographics = [
    { category: 'Laki-laki', value: 5905, percentage: 51, color: 'bg-emerald-500' },
    { category: 'Perempuan', value: 5698, percentage: 49, color: 'bg-blue-500' }
  ];

  const ageGroups = [
    { category: '0-14 tahun', value: 28.3, color: 'bg-emerald-500' },
    { category: '15-64 tahun', value: 64.7, color: 'bg-blue-500' },
    { category: '65+ tahun', value: 7.0, color: 'bg-gradient-to-r from-emerald-500 to-blue-500' }
  ];

  const [selectedMapType, setSelectedMapType] = useState<'administrasi' | 'kelerengan' | 'agrisawah'>('administrasi');

  const areas = [
    { name: 'Dusun I', population: 1231, area: '2.2 km²' },
    { name: 'Dusun II A', population: 1418, area: '1.8 km²' },
    { name: 'Dusun II B', population: 1905, area: '1.6 km²' },
    { name: 'Dusun III A', population: 2434, area: '2.0 km²' },
    { name: 'Dusun III B', population: 2260, area: '1.9 km²' },
    { name: 'Dusun IV', population: 1027, area: '2.1 km²' },
    { name: 'Dusun V', population: 1297, area: '2.0 km²' }
  ];

  const mapTemplates = {
    administrasi: {
      label: 'Peta Administrasi',
      scale: '1:18.000',
      image: 'https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_0781.png'
    },
    kelerengan: {
      label: 'Peta Kelerengan',
      scale: '1:30.000',
      image: 'https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_9342.png'
    },
    agrisawah: {
      label: 'Peta AgriSawah',
      scale: '1:30.000',
      image: 'https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_8404.png'
    }
  } as const;

  // Auto slide effect for village areas (mobile only)
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth < 768) { // Only on mobile
        setCurrentAreaSlide((prev) => (prev + 1) % areas.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [areas.length]);

  return (
    <section id="statistik" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef as any}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Data & Statistik Desa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Data demografi dan statistik terkini Desa Fajar Baru
          </p>
        </div>

        {/* Main Statistics */}
        <div ref={statsRef as any} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover-lift hover-glow ${
                statItems[index] ? 'animate-zoom-in' : 'opacity-0'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 lg:p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 text-sm font-medium">
                  <TrendingUp size={14} />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <span className="text-gray-500 text-sm">{stat.subtitle}</span>
                </div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Demographics and Age Groups */}
        <div 
          ref={demoRef as any}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 ${demoVisible ? 'animate-slide-left' : 'opacity-0'}`}
        >
          {/* Gender Demographics */}
          <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Demografi Berdasarkan Jenis Kelamin</h3>
            <div className="space-y-4">
              {demographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${demo.color}`} />
                    <span className="text-gray-700 text-sm lg:text-base">{demo.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800 text-sm lg:text-base">{demo.value.toLocaleString()}</div>
                    <div className="text-xs lg:text-sm text-gray-500">{demo.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Visual representation */}
            <div className="mt-6">
              <div className="flex rounded-full overflow-hidden h-3 lg:h-4">
                {demographics.map((demo, index) => (
                  <div
                    key={index}
                    className={demo.color}
                    style={{ width: `${demo.percentage}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Age Groups */}
          <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Kelompok Usia</h3>
            <div className="space-y-4">
              {ageGroups.map((group, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm lg:text-base">{group.category}</span>
                    <span className="font-semibold text-gray-800 text-sm lg:text-base">{group.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                    <div
                      className={`h-2 lg:h-3 rounded-full ${group.color}`}
                      style={{ width: `${group.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area Distribution */}
        <div 
          ref={areaRef as any}
          className={`bg-gray-50 rounded-xl p-4 lg:p-6 ${areaVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Sebaran Penduduk Per Dusun</span>
          </h3>
          
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentAreaSlide * 100}%)` }}
              >
                {areas.map((area, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg">{area.name}</h4>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                          {area.population.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Jiwa</div>
                        <div className="text-xs text-gray-500 mt-2">
                          Luas: {area.area}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {areas.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentAreaSlide ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentAreaSlide(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {areas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm lg:text-base">{area.name}</h4>
                <div className="space-y-1">
                  <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    {area.population.toLocaleString()}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">Jiwa</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Luas: {area.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Showcase */}
        <div
          ref={mapRef as any}
          className={`mt-10 bg-white rounded-2xl shadow-xl p-6 lg:p-8 space-y-6 ${mapVisible ? 'animate-slide-up' : 'opacity-0'}`}
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 lg:p-6 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Peta Lokasi</p>
                  <h3 className="text-lg font-semibold text-gray-800">Desa Fajar Baru</h3>
                </div>
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.7234567!2d105.2652679!3d-5.3420085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c4e05391e265%3A0x19082a5416920514!2sGg.+Balai+Desa!5e1!3m2!1sen!2sid!4v1696176000000!5m2!1sen!2sid"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Kantor Balai Desa Fajar Baru</p>
                  <p className="text-xs text-gray-500">Jl. R.A. Basyid No.48, Fajar Baru, Lampung Selatan</p>
                </div>
                <a
                  href="https://www.google.com/maps/place/Gg.+Balai+Desa/@-5.3420085,105.2652679,1288m/data=!3m1!1e3!4m7!3m6!1s0x2e40c4e05391e265:0x19082a5416920514!4b1!8m2!3d-5.3435775!4d105.2684809!16s%2Fg%2F11k3qk06j8!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDkyOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
                >
                  Buka di Maps
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Peta Tematik</p>
                  <h3 className="text-lg font-semibold text-gray-800">Desa Fajar Baru</h3>
                </div>
                <select
                  value={selectedMapType}
                  onChange={(e) => setSelectedMapType(e.target.value as typeof selectedMapType)}
                  className="px-3 py-2 bg-white rounded-xl border border-emerald-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {Object.entries(mapTemplates).map(([key, template]) => (
                    <option key={key} value={key}>{template.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3 mb-4">
                {[
                  { label: 'Luas Wilayah', value: '756 Ha', description: 'Total wilayah administrasi' },
                  { label: 'Skala Peta', value: mapTemplates[selectedMapType].scale, description: 'Detail cakupan' },
                  { label: 'Jumlah Dusun', value: '7 Dusun', description: 'Pembagian wilayah administratif' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/80 rounded-xl border border-white/70 p-3 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden border border-emerald-100 shadow-inner">
                <img
                  src={mapTemplates[selectedMapType].image}
                  alt={mapTemplates[selectedMapType].label}
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <p>Sumber data: Google Earth, Data Peta Rupa Bumi Indonesia, Batas Desa Dukcapil Lampung 2019, Informasi Geospasial Tematik Peta Desa 2024, Open Street Map Roads.</p>
                <p>Skala mengikuti anggaran KKN ITERA Kelompok 13 Periode Ke-15.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Data terakhir diperbarui: November 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
