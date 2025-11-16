import PageLayout from '@/react-app/components/PageLayout';
import { 
  Calendar, Clock, User, Eye, Search,
  Filter, Grid, List, LogIn, Bell
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';
import { beritaData, categoryLabels, getCategoryColor } from '@/react-app/data/beritaData';

const BeritaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Check for search parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);
  
  const { isVisible: featuredVisible, elementRef: featuredRef } = useContentAnimation({ delay: 200 });
  const { isVisible: searchVisible, elementRef: searchRef } = useContentAnimation({ delay: 400 });
  const { visibleItems: newsItems, containerRef: newsRef } = useStaggeredAnimation(9, 100);

  // Get latest news and articles
  const sortedData = [...beritaData].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
  const latestNews = sortedData.find(item => item.kategori === 'berita');
  const latestArticles = sortedData.filter(item => item.kategori === 'artikel').slice(0, 3);

  // Filter berita berdasarkan kategori dan pencarian (including featured items in main listing)
  const filteredBerita = sortedData.filter(berita => {
    const matchCategory = selectedCategory === 'semua' || berita.kategori === selectedCategory;
    const matchSearch = berita.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       berita.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'short'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} minggu lalu`;
    return formatDate(dateString);
  };

  return (
    <PageLayout
      title="Berita dan Artikel Desa Fajar Baru"
      subtitle="Informasi terkini, transparan, dan terpercaya langsung dari desa"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Berita dan Artikel' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">

          {/* Category Filter Section - Moved to Top */}
          <section 
            ref={searchRef as any}
            className={`mb-12 ${searchVisible ? 'animate-slide-up' : 'opacity-0'}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari berita, artikel, atau topik..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-village-green focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-3">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-village-green focus:border-transparent bg-white"
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-white shadow-sm text-village-green' : 'text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-white shadow-sm text-village-green' : 'text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Category Filters */}
              <div className="flex flex-wrap gap-3 mt-6">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-lift ${
                      selectedCategory === key
                        ? 'btn-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Section */}
          <section 
            ref={featuredRef as any}
            className={`mb-16 ${featuredVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Latest News - Left Side (3/5 width) */}
              {latestNews && (
                <div className="lg:col-span-3">
                  <Link 
                    to={`/berita/${latestNews.slug}`}
                    className="block group"
                  >
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift h-full">
                      <div className="relative">
                        <img 
                          src={latestNews.image} 
                          alt={latestNews.judul}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(latestNews.kategori)} bg-white shadow-md`}>
                            {categoryLabels[latestNews.kategori]}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md">
                          <span className="text-sm font-semibold text-gray-700">
                            {formatDateShort(latestNews.tanggal)}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <span className="inline-block px-3 py-1 bg-emerald-600 rounded-full text-xs font-medium mb-3">
                            BERITA TERBARU
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-village-green transition-colors mb-3 line-clamp-2">
                          {latestNews.judul}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {latestNews.ringkasan}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <User size={16} />
                              <span>{latestNews.penulis}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>{latestNews.estimasiBaca}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye size={16} />
                            <span>{latestNews.views}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Latest Articles - Right Side (2/5 width) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Artikel Terbaru</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded"></div>
                </div>
                
                {latestArticles.map((artikel) => (
                  <Link 
                    key={artikel.id}
                    to={`/berita/${artikel.slug}`}
                    className="block group"
                  >
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                      <div className="flex">
                        <div className="w-1/3 relative">
                          <img 
                            src={artikel.image} 
                            alt={artikel.judul}
                            className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(artikel.kategori)} bg-white`}>
                              {categoryLabels[artikel.kategori]}
                            </span>
                          </div>
                        </div>
                        <div className="w-2/3 p-3">
                          <h4 className="text-xs font-bold text-gray-800 group-hover:text-village-green transition-colors mb-2 line-clamp-2">
                            {artikel.judul}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar size={10} />
                              <span className="text-xs">{getTimeAgo(artikel.tanggal)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye size={10} />
                              <span className="text-xs">{artikel.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          

          {/* News Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Berita dan Artikel Lainnya
                {searchQuery && (
                  <span className="text-lg text-gray-600 font-normal ml-3">
                    ({filteredBerita.length} hasil untuk "{searchQuery}")
                  </span>
                )}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-village-green to-transparent mx-4"></div>
            </div>

            {viewMode === 'grid' ? (
              <div ref={newsRef as any} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBerita.map((berita, index) => (
                  <Link 
                    key={berita.id}
                    to={`/berita/${berita.slug}`}
                    className={`block group ${newsItems[index] ? 'animate-bounce-in' : 'opacity-0'}`}
                  >
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift h-full">
                      <div className="relative">
                        <img 
                          src={berita.image} 
                          alt={berita.judul}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(berita.kategori)} bg-white`}>
                            {categoryLabels[berita.kategori]}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1">
                          <span className="text-xs font-semibold text-gray-700">
                            {formatDateShort(berita.tanggal)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-village-green transition-colors mb-2 line-clamp-2">
                          {berita.judul}
                        </h4>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                          {berita.ringkasan}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <User size={10} />
                              <span className="text-xs">{berita.penulis}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={10} />
                              <span className="text-xs">{berita.estimasiBaca}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye size={10} />
                            <span className="text-xs">{berita.views}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBerita.map((berita, index) => (
                  <Link 
                    key={berita.id}
                    to={`/berita/${berita.slug}`}
                    className={`block group ${newsItems[index] ? 'animate-slide-up' : 'opacity-0'}`}
                  >
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                          <img 
                            src={berita.image} 
                            alt={berita.judul}
                            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(berita.kategori)} bg-white`}>
                              {categoryLabels[berita.kategori]}
                            </span>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <h4 className="text-xl font-bold text-gray-800 group-hover:text-village-green transition-colors mb-3">
                            {berita.judul}
                          </h4>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {berita.ringkasan}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User size={14} />
                                <span>{berita.penulis}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{getTimeAgo(berita.tanggal)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>{berita.estimasiBaca}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye size={14} />
                              <span>{berita.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {filteredBerita.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada konten ditemukan</h3>
                <p className="text-gray-600 mb-6">Coba ubah kata kunci pencarian atau filter kategori</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('semua');
                  }}
                  className="btn-primary px-6 py-3"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </section>

          {/* Login CTA Section */}
          <section>
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Bell className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Dapatkan Notifikasi Berita Terbaru</h2>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                Masuk sebagai pengguna terdaftar untuk mendapatkan notifikasi otomatis setiap ada berita dan artikel terbaru dari desa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/login">
                  <button className="btn-secondary bg-white text-village-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex items-center gap-3">
                    <LogIn className="w-5 h-5" />
                    Masuk Sekarang
                  </button>
                </Link>
                <p className="text-emerald-200 text-sm">
                  Belum punya akun? <Link to="/register" className="underline hover:text-white">Daftar di sini</Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default BeritaPage;
