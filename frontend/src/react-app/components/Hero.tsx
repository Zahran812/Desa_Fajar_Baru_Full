import { Building, Search, Sparkles, Wifi, Smartphone, BarChart3, Shield, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    // Set real viewport height for mobile
    const setViewportHeight = () => {
      const actualVh = window.innerHeight * 0.01;
      setVh(actualVh * 100);
      document.documentElement.style.setProperty('--vh', `${actualVh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <section 
      className="relative bg-gray-900 overflow-hidden pt-16 md:pt-20"
      style={{ height: vh ? `${vh}px` : '100vh' }}
    >
      
      {/* Full Screen Video Background - Mobile optimized */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source 
            src="https://ia601000.us.archive.org/32/items/desa_20251002/desa.mp4" 
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-village-green to-blue-600"></div>
        </video>
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>
      
      {/* Content Container - Slightly lower for better mobile view */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center pt-8 sm:pt-6 md:pt-0">
        {/* Recognition Badge - Mobile optimized */}
        <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 shadow-lg">
            <Sparkles className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 text-emerald-300 flex-shrink-0" />
            <span className="text-white text-base sm:text-base md:text-lg font-medium text-center leading-tight">
              Inisiatif Desa Cerdas Digital
            </span>
          </div>
        </div>

        {/* Main Heading - Mobile responsive */}
        <div className="text-center max-w-5xl mx-auto mb-3 sm:mb-4 md:mb-5">
          <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl px-2">
            Selamat Datang di
            <br className="hidden sm:block" />
            <span className="relative inline-block mt-1 sm:mt-0">
              Desa 
              <span className="italic text-emerald-300 font-script relative ml-1.5 sm:ml-2 md:ml-3 drop-shadow-lg">
                Fajar Baru
                <div className="absolute -bottom-0.5 sm:-bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transform -rotate-1" />
              </span>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2 sm:px-4">
            Desa cerdas yang mengintegrasikan teknologi digital untuk memberikan pelayanan terbaik, transparansi data, dan kemudahan akses informasi bagi seluruh masyarakat
          </p>
        </div>

        {/* Action Buttons - Compact mobile layout */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center items-stretch sm:items-center mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0 max-w-sm sm:max-w-lg md:max-w-2xl mx-auto">
          <button 
            onClick={() => window.location.href = '/profil/profil-sejarah'}
            className="group w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 active:scale-95 sm:hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
          >
            <Search className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform flex-shrink-0" />
            <span className="whitespace-nowrap text-sm sm:text-base md:text-lg">Profil Desa</span>
          </button>
          <button 
            onClick={() => window.location.href = '/login'}
            className="group w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-semibold active:scale-95 sm:hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
          >
            <Building className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="whitespace-nowrap text-sm sm:text-base md:text-lg">Masuk Sekarang</span>
          </button>
        </div>

        {/* Feature Marquee - Right below buttons */}
        <div className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 mx-0 sm:mx-4 md:mx-auto max-w-6xl shadow-2xl">
          <div className="flex animate-marquee-mobile md:animate-marquee-smooth space-x-2 sm:space-x-3 md:space-x-6 justify-center items-center">
            {/* First set of badges - Compact mobile sizing */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Wifi className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Koneksi Digital</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Smartphone className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Ramah Mobile</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <BarChart3 className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Analisa Data</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Shield className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Layanan Cerdas</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Heart className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Pusat Komunitas</span>
            </div>
            
            {/* Second set for seamless loop */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Wifi className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Koneksi Digital</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Smartphone className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-teal-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Ramah Mobile</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <BarChart3 className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-cyan-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Analisa Data</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Shield className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Layanan Cerdas</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Heart className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-teal-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Pusat Komunitas</span>
            </div>
            
            {/* Third set for extra smooth loop */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Wifi className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-cyan-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Koneksi Digital</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Smartphone className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Ramah Mobile</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <BarChart3 className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-teal-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Analisa Data</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Shield className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-cyan-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Layanan Cerdas</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-md sm:rounded-lg md:rounded-xl px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 whitespace-nowrap shadow-lg">
              <Heart className="w-3 sm:w-3.5 md:w-5 h-3 sm:h-3.5 md:h-5 text-blue-300 flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Pusat Komunitas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
