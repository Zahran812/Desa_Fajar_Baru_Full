import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { 
  Menu, X, Home, User, Search, ChevronDown,
  FileText, Eye, Briefcase,
  Newspaper, LogIn, LogOut
} from 'lucide-react';
import SearchModal from '@/react-app/components/SearchModal';
import MusicControls from '@/react-app/components/MusicControls';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // More specific targeting to avoid conflicts
      const isDropdownElement = target.closest('.dropdown-container') || 
                               target.closest('.dropdown-trigger') ||
                               target.closest('.dropdown-menu');
      
      if (!isDropdownElement && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeDropdown]);

  const menuItems = [
    { 
      name: 'Beranda', 
      href: '/', 
      icon: Home,
      hasDropdown: false
    },
    { 
      name: 'Profil', 
      href: '/profil', 
      icon: User,
      hasDropdown: true,
      submenu: [
        { name: 'Pejabat dan Struktural', href: '/profil/pejabat-struktural' },
        { name: 'Profil dan Sejarah', href: '/profil/profil-sejarah' },
        { name: 'Wilayah dan Demografi', href: '/profil/demografi-wilayah' }
      ]
    },
    { 
      name: 'Layanan', 
      href: '/layanan', 
      icon: FileText,
      hasDropdown: true,
      submenu: [
        { name: 'Layanan Administrasi', href: '/layanan/administrasi' },
        { name: 'Layanan PPID', href: '/layanan/ppid' }
      ]
    },
    { 
      name: 'Transparansi', 
      href: '/transparansi', 
      icon: Eye,
      hasDropdown: true,
      submenu: [
        { name: 'APB Desa', href: '/transparansi/apb' },
        { name: 'Laporan Pembangunan', href: '/transparansi/pembangunan' },
        { name: 'Statistik', href: '/transparansi/statistik' }
      ]
    },
    { 
      name: 'Program', 
      href: '/program', 
      icon: Briefcase,
      hasDropdown: true,
      submenu: [
        { name: 'BUMDes & Ekonomi', href: '/program/bumdes-ekonomi' },
        { name: 'Kesehatan & Sosial', href: '/program/kesehatan-sosial' },
        { name: 'Pendidikan & Budaya', href: '/program/pendidikan-budaya' }
      ]
    },
    { 
      name: 'Informasi', 
      href: '/berita', 
      icon: Newspaper,
      hasDropdown: true,
      submenu: [
        { name: 'Berita dan Artikel', href: '/berita' },
        { name: 'Agenda Kegiatan', href: '/informasi/agenda' },
        { name: 'Galeri Desa', href: '/informasi/galeri' }
      ]
    }
  ];

  const handleDropdownClick = (itemName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <>
      {/* Background Layer */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-100 will-change-transform ${
          isScrolled ? 'h-20' : 'h-24'
        }`}
        style={{
          backgroundImage: `url('https://mocha-cdn.com/0199a0ab-e05b-7337-b3a1-2db426100c05/Desain-tanpa-judul-(2).jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Main Header - Removed overflow-hidden to allow submenu visibility */}
      <header className={`fixed top-4 left-4 right-4 z-50 transition-all duration-100 will-change-transform ${
        isScrolled ? 'top-2' : 'top-4'
      }`}>
        <div 
          className="shadow-xl rounded-2xl border border-gray-100 backdrop-blur-sm relative bg-white/95 will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative z-10">
            <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2 lg:py-2.5">
              <div className="flex items-center justify-between">
                
                {/* Logo Section */}
                <Link className="flex items-center space-x-2 sm:space-x-3 group" to="/">
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex-shrink-0">
                    <img 
                      src="https://mocha-cdn.com/0199c514-1ce8-7384-a2ba-f3a333c09788/LrSjPPUnIW.png" 
                      alt="Logo Desa Fajar Baru" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="block min-w-0 flex-1">
                    <h1 className="font-bold text-[11px] sm:text-[12px] lg:text-sm text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 leading-tight truncate">
                      Desa Fajar Baru
                    </h1>
                    <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-gray-600 leading-tight truncate">
                      Jati Agung, Lampung Selatan
                    </p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                  {menuItems.map((item) => (
                    <div 
                      key={item.name} 
                      className="relative dropdown-container"
                      ref={(el) => { dropdownRefs.current[item.name] = el; }}
                    >
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={(e) => handleDropdownClick(item.name, e)}
                            className={`dropdown-trigger group flex items-center space-x-1.5 transition-all duration-200 font-medium text-sm px-3 py-2 rounded-lg ${
                              activeDropdown === item.name 
                                ? 'text-emerald-600 bg-emerald-50' 
                                : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            aria-expanded={activeDropdown === item.name}
                            aria-haspopup="true"
                          >
                            <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span className="relative">
                              {item.name}
                              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-200 ${
                                activeDropdown === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                              }`}></span>
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {/* Desktop Submenu - positioned absolutely within this container */}
                          {activeDropdown === item.name && (
                            <div className="dropdown-menu absolute top-full left-0 mt-2 z-[9999] animate-in fade-in duration-200">
                              <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-60 backdrop-blur-sm">
                                <div className="px-3 py-2 border-b border-gray-100">
                                  <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <item.icon className="w-3.5 h-3.5" />
                                    <span>{item.name}</span>
                                  </div>
                                </div>
                                {item.submenu?.map((subitem) => (
                                  <Link 
                                    key={subitem.name}
                                    to={subitem.href}
                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3"></div>
                                    <span>{subitem.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          className="group flex items-center space-x-1.5 text-gray-700 hover:text-emerald-600 transition-all duration-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-emerald-50"
                          to={item.href}
                        >
                          <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                          <span className="relative">
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-200"></span>
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
                    {/* Music Controls */}
                    <MusicControls />
                    
                    <button 
                      onClick={() => setIsSearchOpen(true)}
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105"
                      aria-label="Pencarian"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    {user ? (
                      <div className="flex items-center space-x-2">
                        <Link to={
                          user.role === 'operator' ? '/dashboard/operator' :
                          user.role === 'dusun_head' ? '/dashboard/dusun' :
                          '/dashboard/citizen'
                        }>
                          <button className="btn-secondary text-sm px-2.5 py-2.5" title="Dashboard">
                            <User className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={logout}
                          className="btn-outline text-sm px-2.5 py-2.5 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-500"
                          title="Keluar"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Link to="/login">
                        <button className="btn-primary text-sm px-4 py-2.5">
                          <LogIn className="w-4 h-4" />
                          <span>Masuk</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2">
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-all duration-300"
                    aria-label="Pencarian"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-all duration-300"
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 rounded-2xl shadow-xl border border-gray-100 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-300 relative bg-white/95 z-[60]">
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl"></div>
            <div className="relative z-10">
              {/* Music Player Controls Section */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider leading-tight">Pemutar Musik</p>
                      <p className="text-[10px] text-gray-500 leading-tight">Kontrol pemutaran</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <MusicControls />
                  </div>
                </div>
              </div>
              
              <nav className="py-2">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-50 last:border-b-0">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={(e) => handleDropdownClick(item.name, e)}
                          className={`w-full flex items-center justify-between px-4 py-4 font-medium text-sm transition-all duration-200 ${
                            activeDropdown === item.name
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                              activeDropdown === item.name ? 'bg-emerald-200' : 'bg-emerald-100'
                            }`}>
                              <item.icon className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {/* Mobile Submenu */}
                        {activeDropdown === item.name && (
                          <div className="bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top duration-200">
                            {item.submenu?.map((subitem) => (
                              <Link
                                key={subitem.name}
                                to={subitem.href}
                                className="flex items-center px-6 py-3 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 border-b border-white last:border-b-0"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                                <span>{subitem.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 px-4 py-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-medium text-sm">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="px-4 py-4 border-t border-gray-100 mt-2 space-y-3">
                  {user ? (
                    <div className="space-y-2">
                      <div className="text-center py-2">
                        <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{
                          user.role === 'operator' ? 'Operator Desa' :
                          user.role === 'dusun_head' ? 'Kepala Dusun' :
                          'Masyarakat'
                        }</p>
                      </div>
                      <Link to={
                        user.role === 'operator' ? '/dashboard/operator' :
                        user.role === 'dusun_head' ? '/dashboard/dusun' :
                        '/dashboard/citizen'
                      } className="block">
                        <button className="w-full btn-secondary py-3 font-bold text-sm">
                          <User className="w-4 h-4" />
                          Dashboard
                        </button>
                      </Link>
                      <button 
                        onClick={logout}
                        className="w-full btn-outline py-3 font-bold text-sm text-red-600 border-red-300 hover:bg-red-50 hover:border-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="block">
                      <button className="w-full btn-primary py-3 font-bold text-sm">
                        <LogIn className="w-4 h-4" />
                        Masuk
                      </button>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
