import { Users, Home, GraduationCap, Briefcase, TrendingUp, MapPin } from 'lucide-react';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';
import { useState, useEffect } from 'react';

const Statistics = () => {
  const { isVisible: headerVisible, elementRef: headerRef } = useContentAnimation();
  const { visibleItems: statItems, containerRef: statsRef } = useStaggeredAnimation(4, 150);
  const { isVisible: demoVisible, elementRef: demoRef } = useContentAnimation({ delay: 400 });
  const { isVisible: areaVisible, elementRef: areaRef } = useContentAnimation({ delay: 600 });
  
  // Mobile carousel state for village areas
  const [currentAreaSlide, setCurrentAreaSlide] = useState(0);
  
  const stats = [
    {
      icon: Users,
      title: 'Total Penduduk',
      value: '2,847',
      subtitle: 'Jiwa',
      color: 'from-emerald-500 to-blue-500',
      trend: '+2.3%'
    },
    {
      icon: Home,
      title: 'Kepala Keluarga',
      value: '847',
      subtitle: 'KK',
      color: 'from-blue-500 to-emerald-500',
      trend: '+1.8%'
    },
    {
      icon: GraduationCap,
      title: 'Tingkat Pendidikan',
      value: '89%',
      subtitle: 'Melek Huruf',
      color: 'from-emerald-500 to-blue-500',
      trend: '+5.2%'
    },
    {
      icon: Briefcase,
      title: 'Tingkat Ekonomi',
      value: '76%',
      subtitle: 'Produktif',
      color: 'from-blue-500 to-emerald-500',
      trend: '+3.1%'
    }
  ];

  const demographics = [
    { category: 'Laki-laki', value: 1458, percentage: 51.2, color: 'bg-emerald-500' },
    { category: 'Perempuan', value: 1389, percentage: 48.8, color: 'bg-blue-500' },
  ];

  const ageGroups = [
    { category: '0-14 tahun', value: 28.3, color: 'bg-emerald-500' },
    { category: '15-64 tahun', value: 64.7, color: 'bg-blue-500' },
    { category: '65+ tahun', value: 7.0, color: 'bg-gradient-to-r from-emerald-500 to-blue-500' },
  ];

  const areas = [
    { name: 'Dusun 1', population: 467, area: '2.2 km²' },
    { name: 'Dusun 2A', population: 423, area: '1.8 km²' },
    { name: 'Dusun 2B', population: 398, area: '1.6 km²' },
    { name: 'Dusun 3A', population: 445, area: '2.0 km²' },
    { name: 'Dusun 3B', population: 412, area: '1.9 km²' },
    { name: 'Dusun 4', population: 456, area: '2.1 km²' },
    { name: 'Dusun 5', population: 446, area: '2.0 km²' },
  ];

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
