import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, FileText, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular searches
  const popularSearches = [
    'Layanan administrasi',
    'Berita terbaru',
    'APB Desa 2024',
    'Program BUMDes',
    'Bantuan sosial',
    'Profil desa'
  ];

  // Quick links
  const quickLinks = [
    { title: 'Layanan', href: '/layanan', icon: FileText, desc: 'Administrasi dan pelayanan desa' },
    { title: 'Berita & Artikel', href: '/berita', icon: TrendingUp, desc: 'Informasi terbaru dari desa' },
    { title: 'Transparansi', href: '/transparansi/apb', icon: Building, desc: 'Data keuangan dan pembangunan' },
    { title: 'Program', href: '/program/bumdes-ekonomi', icon: Users, desc: 'Program pemberdayaan masyarakat' }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate search API call
      setTimeout(() => {
        const mockResults = [
          {
            title: 'Layanan Surat Keterangan Domisili',
            type: 'Layanan',
            href: '/layanan',
            excerpt: 'Pengurusan surat keterangan domisili untuk warga desa'
          },
          {
            title: 'Berita: Pembangunan Jalan Desa Tahap 2',
            type: 'Berita',
            href: '/berita',
            excerpt: 'Update terbaru pembangunan infrastruktur jalan desa'
          },
          {
            title: 'APB Desa 2024',
            type: 'Transparansi',
            href: '/transparansi/apb',
            excerpt: 'Anggaran Pendapatan dan Belanja Desa tahun 2024'
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Enhanced search functionality - redirect to berita page with search query
      window.location.href = `/berita?search=${encodeURIComponent(query)}`;
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 md:pt-20">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm md:max-w-xl mx-4 max-h-[85vh] md:max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200">
          <h2 className="text-sm md:text-lg font-semibold text-gray-800">Pencarian</h2>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 md:w-5 h-4 md:h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="p-3 md:p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari layanan, berita, informasi..."
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-village-green focus:border-transparent text-sm md:text-base"
            />
          </div>
        </form>

        <div className="max-h-72 md:max-h-96 overflow-y-auto">
          {/* Search Results */}
          {query.length > 2 && (
            <div className="p-3 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                Hasil Pencarian ({results.length})
              </h3>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <Link
                      key={index}
                      to={result.href}
                      onClick={onClose}
                      className="block p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <div className="mt-1">
                          <div className="w-6 md:w-8 h-6 md:h-8 bg-village-green bg-opacity-10 rounded-lg flex items-center justify-center">
                            <Search className="w-3 md:w-4 h-3 md:h-4 text-village-green" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm md:text-base text-gray-900 group-hover:text-village-green transition-colors">
                            {result.title}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{result.excerpt}</p>
                          <span className="inline-block mt-1 md:mt-2 px-2 py-0.5 md:py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded">
                            {result.type}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <p className="text-gray-600">Tidak ada hasil ditemukan untuk "{query}"</p>
                </div>
              )}
            </div>
          )}

          {/* Popular Searches */}
          {query.length <= 2 && (
            <>
              <div className="p-3 md:p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-3 md:mb-4">
                  <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-gray-500" />
                  <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Pencarian Popular
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-100 hover:bg-village-green hover:text-white text-xs md:text-sm rounded-full transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-3 md:p-4">
                <div className="flex items-center space-x-2 mb-3 md:mb-4">
                  <Clock className="w-3 md:w-4 h-3 md:h-4 text-gray-500" />
                  <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Akses Cepat
                  </h3>
                </div>
                <div className="grid gap-2 md:gap-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      onClick={onClose}
                      className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-village-green bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-village-green group-hover:bg-opacity-20 transition-colors">
                        <link.icon className="w-4 md:w-5 h-4 md:h-5 text-village-green" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm md:text-base text-gray-900 group-hover:text-village-green transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
