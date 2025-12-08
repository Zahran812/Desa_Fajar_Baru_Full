import PageLayout from '@/react-app/components/PageLayout';
import {
  User, Eye, Search, Filter, Grid, List, ChevronLeft, ChevronRight, Calendar, LogIn, Bell
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '@/react-app/lib/api';
import { getCategoryColor } from '@/react-app/data/beritaData'; // Only getCategoryColor now

// --- Animation Hooks (Copied directly to avoid import issues) ---

interface UseContentAnimationOptions {
  threshold?: number;
  delay?: number;
}

const useContentAnimation = (options: UseContentAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const { threshold = 0.1, delay = 0 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, delay]);

  return { isVisible, elementRef };
};

const useStaggeredAnimation = (itemCount: number, delayPerItem: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset visibility when itemCount changes (e.g., on pagination)
    setVisibleItems(new Array(itemCount).fill(false));
  }, [itemCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
              }, i * delayPerItem);
            }
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, delayPerItem]);

  return { visibleItems, containerRef };
};


// --- Interfaces ---

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  views: number;
  author: {
    full_name: string;
  };
  published_at: string;
}

interface PaginatedResponse {
  data: Article[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// --- Main Component ---

const BeritaPage = () => {
  // --- STATE MANAGEMENT ---
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [paginatedArticles, setPaginatedArticles] = useState<PaginatedResponse | null>(null);
  const [articleCategories, setArticleCategories] = useState<string[]>([]); // New state for dynamic categories

  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setSearchQueryDebounced] = useState(searchQuery);

  // --- DERIVED STATE ---
  const mainFeaturedArticle = featuredArticles.length > 0 ? featuredArticles[0] : null;
  const sideFeaturedArticles = featuredArticles.length > 1 ? featuredArticles.slice(1, 4) : [];

  // --- ANIMATION HOOKS ---
  const { isVisible: featuredVisible, elementRef: featuredRef } = useContentAnimation({ delay: 200 });
  const { isVisible: filterVisible, elementRef: filterRef } = useContentAnimation({ delay: 400 });
  const { isVisible: listVisible, elementRef: listRef } = useContentAnimation({ delay: 600 });
  const { visibleItems: newsItems, containerRef: newsRef } = useStaggeredAnimation(paginatedArticles?.data.length || 0, 100);
  const { visibleItems: sideFeaturedVisible, containerRef: sideFeaturedContainerRef } = useStaggeredAnimation(sideFeaturedArticles.length, 150);


  // --- DATA FETCHING & SIDE EFFECTS ---
  
  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQueryDebounced(searchQuery);
      setCurrentPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Effect to fetch article categories
  useEffect(() => {
    const fetchArticleCategories = async () => {
      try {
        const response = await apiFetch('/article-categories');
        if (!response.ok) throw new Error('Failed to fetch article categories.');
        const data: string[] = await response.json();
        // Prepend 'semua' to the fetched categories and capitalize for display
        setArticleCategories(['semua', ...data]);
      } catch (err) {
        console.error("Error fetching article categories:", err);
        setArticleCategories(['semua', 'berita', 'artikel']); // Fallback to static if API fails
      }
    };
    fetchArticleCategories();
  }, []);

  // Effect to fetch featured articles (runs once)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoadingFeatured(true);
        const response = await apiFetch('/articles?sort_by=views&limit=4'); 
        if (!response.ok) throw new Error('Gagal memuat berita unggulan.');
        const data = await response.json();
        setFeaturedArticles(data.data || data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingFeatured(false);
      }
    };
    fetchFeatured();
  }, []);

  // Effect to fetch the main list of articles (paginated, filtered)
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoadingList(true);
        const params = new URLSearchParams({
          page: String(currentPage),
          category: selectedCategory === 'semua' ? '' : selectedCategory,
          search: debouncedSearchQuery,
          per_page: '8'
        });
        const response = await apiFetch(`/articles?${params.toString()}`);
        if (!response.ok) throw new Error('Gagal memuat daftar berita.');
        const data: PaginatedResponse = await response.json();
        setPaginatedArticles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    };
    fetchList();
  }, [currentPage, selectedCategory, debouncedSearchQuery]);

  // --- HELPER FUNCTIONS ---
  const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  const formatDateShort = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Hari ini';
    if (diffDays === 2) return 'Kemarin';
    if (diffDays <= 7) return `${diffDays} hari lalu`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} minggu lalu`;
    return formatDate(dateString);
  };

  // --- RENDER SKELETONS ---
  const renderFeaturedSkeleton = () => (
    <div className="grid lg:grid-cols-5 gap-8 animate-pulse">
      <div className="lg:col-span-3 bg-gray-200 rounded-2xl h-[480px]"></div>
      <div className="lg:col-span-2 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="bg-gray-200 rounded-xl h-24 w-full"></div>
        <div className="bg-gray-200 rounded-xl h-24 w-full"></div>
        <div className="bg-gray-200 rounded-xl h-24 w-full"></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className={`gap-6 ${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4' : 'space-y-6'}`}>
      {Array.from({ length: 8 }).map((_, i) => (
        viewMode === 'grid' ? (
          <div key={i} className="bg-gray-200 rounded-xl h-96"></div>
        ) : (
          <div key={i} className="bg-gray-200 rounded-xl h-48 w-full"></div>
        )
      ))}
    </div>
  );

  return (
    <PageLayout
      title="Berita dan Artikel Desa Fajar Baru"
      subtitle="Informasi terkini, transparan, dan terpercaya langsung dari desa"
      breadcrumb={[{ name: 'Beranda', href: '/' }, { name: 'Berita dan Artikel' }]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">

          <section
            ref={filterRef}
            className={`mb-12 transition-all duration-700 ${filterVisible ? 'animate-slide-up' : 'opacity-0'}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari berita, artikel, atau topik..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-village-green focus:border-transparent text-lg"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-village-green focus:border-transparent bg-white"
                  >
                    {articleCategories.map((category) => (
                      <option key={category} value={category}>{capitalizeFirstLetter(category)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button onClick={() => setViewMode('grid')} className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-village-green' : 'text-gray-600'}`}><Grid className="w-5 h-5" /></button>
                  <button onClick={() => setViewMode('list')} className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-village-green' : 'text-gray-600'}`}><List className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {articleCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-lift ${selectedCategory === category ? 'btn-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {capitalizeFirstLetter(category)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={featuredRef}
            className={`mb-16 transition-all duration-700 ${featuredVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            {loadingFeatured ? renderFeaturedSkeleton() : (
              <div className="grid lg:grid-cols-5 gap-8">
                {mainFeaturedArticle && (
                  <div className="lg:col-span-3">
                    <Link to={`/berita/${mainFeaturedArticle.slug}`} className="block group">
                      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift h-full">
                        <div className="relative">
                          <img src={mainFeaturedArticle.image_url} alt={mainFeaturedArticle.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute top-4 left-4"><span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(mainFeaturedArticle.category)} bg-white shadow-md`}>{capitalizeFirstLetter(mainFeaturedArticle.category)}</span></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white"><span className="inline-block px-3 py-1 bg-emerald-600 rounded-full text-xs font-medium mb-3">ARTIKEL TERBARU</span></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-village-green transition-colors mb-3 line-clamp-2">{mainFeaturedArticle.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{mainFeaturedArticle.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2"><User size={16} /><span>{mainFeaturedArticle.author.full_name}</span></div>
                              <div className="flex items-center space-x-2"><Calendar size={16} /><span>{formatDate(mainFeaturedArticle.published_at)}</span></div>
                            </div>
                            <div className="flex items-center space-x-2"><Eye size={16} /><span>{mainFeaturedArticle.views}</span></div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                )}
                <div ref={sideFeaturedContainerRef} className="lg:col-span-2 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Populer Lainnya</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded"></div>
                  </div>
                  {sideFeaturedArticles.map((article, index) => (
                    <Link key={article.id} to={`/berita/${article.slug}`} className={`block group transition-all duration-500 ${sideFeaturedVisible[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                        <div className="flex">
                          <div className="w-1/3"><img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                          <div className="w-2/3 p-3">
                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-village-green transition-colors mb-2 line-clamp-2">{article.title}</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-1"><Calendar size={10} /><span className="text-xs">{getTimeAgo(article.published_at)}</span></div>
                              <div className="flex items-center space-x-1"><Eye size={10} /><span className="text-xs">{article.views}</span></div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section 
            ref={listRef}
            className={`mb-16 transition-all duration-700 ${listVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Semua Berita & Artikel
                {debouncedSearchQuery && !loadingList && (
                  <span className="text-lg text-gray-600 font-normal ml-3">
                    ({paginatedArticles?.total || 0} hasil untuk "{debouncedSearchQuery}")
                  </span>
                )}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-village-green to-transparent mx-4"></div>
            </div>

            {loadingList ? renderListSkeleton() : error ? <p className="text-red-500 text-center py-16">{error}</p> : (
              paginatedArticles && paginatedArticles.data.length > 0 ? (
                <>
                  <div ref={newsRef} className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-6'}>
                    {paginatedArticles.data.map((berita, index) => (
                      <Link key={berita.id} to={`/berita/${berita.slug}`} className={`block group transition-all duration-300 ${newsItems[index] ? 'animate-bounce-in' : 'opacity-0'}`}>
                        {viewMode === 'grid' ? (
                          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift h-full flex flex-col">
                            <div className="relative">
                              <img src={berita.image_url} alt={berita.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute top-3 left-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(berita.category)} bg-white shadow`}>{capitalizeFirstLetter(berita.category)}</span></div>
                              <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 shadow"><span className="text-xs font-semibold text-gray-700">{formatDateShort(berita.published_at)}</span></div>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                              <h4 className="text-sm font-bold text-gray-800 group-hover:text-village-green transition-colors mb-2 line-clamp-2 flex-grow">{berita.title}</h4>
                              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1"><User size={10} /><span>{berita.author.full_name.split(' ')[0]}</span></div>
                                </div>
                                <div className="flex items-center space-x-1"><Eye size={10} /><span>{berita.views}</span></div>
                              </div>
                            </div>
                          </article>
                        ) : (
                          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 relative">
                                <img src={berita.image_url} alt={berita.title} className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute top-3 left-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(berita.category)} bg-white shadow`}>{capitalizeFirstLetter(berita.category)}</span></div>
                              </div>
                              <div className="md:w-2/3 p-6">
                                <h4 className="text-xl font-bold text-gray-800 group-hover:text-village-green transition-colors mb-3">{berita.title}</h4>
                                <p className="text-gray-600 mb-4 line-clamp-3">{berita.excerpt}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1"><User size={14} /><span>{berita.author.full_name}</span></div>
                                    <div className="flex items-center space-x-1"><Calendar size={14} /><span>{getTimeAgo(berita.published_at)}</span></div>
                                  </div>
                                  <div className="flex items-center space-x-1"><Eye size={14} /><span>{berita.views}</span></div>
                                </div>
                              </div>
                            </div>
                          </article>
                        )}
                      </Link>
                    ))}
                  </div>
                  {paginatedArticles.last_page > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-4">
                      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-3 border rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft/></button>
                      <span className="font-medium">Halaman {paginatedArticles.current_page} dari {paginatedArticles.last_page}</span>
                      <button onClick={() => setCurrentPage(p => Math.min(paginatedArticles.last_page, p + 1))} disabled={currentPage === paginatedArticles.last_page} className="p-3 border rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRight/></button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4"><Search size={64} className="mx-auto" /></div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada konten ditemukan</h3>
                  <p className="text-gray-600 mb-6">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('semua'); }} className="btn-primary px-6 py-3">Reset Filter</button>
                </div>
              )
            )}
          </section>

          <section>
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4"><Bell className="w-8 h-8" /></div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Dapatkan Notifikasi Berita Terbaru</h2>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">Masuk sebagai pengguna terdaftar untuk mendapatkan notifikasi otomatis setiap ada berita dan artikel terbaru dari desa.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/login"><button className="btn-secondary bg-white text-village-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex items-center gap-3"><LogIn className="w-5 h-5" />Masuk Sekarang</button></Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PageLayout>
  );
};

export default BeritaPage;
