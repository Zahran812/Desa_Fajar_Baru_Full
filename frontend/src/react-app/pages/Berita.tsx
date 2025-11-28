import PageLayout from '@/react-app/components/PageLayout';
import {
  User, Eye, Search,
  Filter, Grid, List, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryLabels, getCategoryColor } from '@/react-app/data/beritaData';
import { apiFetch } from '@/react-app/lib/api';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';

// Interface matching the backend's Article model
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

// Interface for Laravel's paginated response
interface PaginatedResponse {
  data: Article[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const BeritaPage = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [paginatedArticles, setPaginatedArticles] = useState<PaginatedResponse | null>(null);

  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Derived state - must be before hooks that use them
  const mainFeaturedArticle = featuredArticles.length > 0 ? featuredArticles[0] : null;
  const sideFeaturedArticles = featuredArticles.length > 1 ? featuredArticles.slice(1, 4) : [];

  // Content Animation Hooks
  const { isVisible: featuredVisible, elementRef: featuredRef } = useContentAnimation();
  const { isVisible: filterVisible, elementRef: filterRef } = useContentAnimation({ delay: 100 });
  const { isVisible: listVisible, elementRef: listRef } = useContentAnimation({ delay: 200 });

  // Staggered animation for article cards
  const articleCount = paginatedArticles?.data.length || 0;
  const { visibleItems, containerRef } = useStaggeredAnimation(articleCount, 80);

  // Staggered animation for side featured articles
  const sideFeaturedCount = sideFeaturedArticles.length;
  const { visibleItems: sideFeaturedVisible, containerRef: sideFeaturedContainerRef } = useStaggeredAnimation(sideFeaturedCount, 150);

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Effect to fetch featured articles (runs once)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoadingFeatured(true);
        const response = await apiFetch('/articles?limit=4');
        if (!response.ok) throw new Error('Gagal memuat berita unggulan.');
        const data = await response.json();
        setFeaturedArticles(data);
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
          category: selectedCategory,
          search: debouncedSearchQuery,
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

  // Helper Functions
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
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
          {/* Featured Section */}
          <section
            ref={(el) => { if (el) (featuredRef as any).current = el; }}
            className={`mb-16 transition-all duration-700 ${featuredVisible ? 'animate-fade-up opacity-100' : 'opacity-100'}`}
          >
            {loadingFeatured ? renderFeaturedSkeleton() : (
              <div className="grid lg:grid-cols-5 gap-8">
                {mainFeaturedArticle && (
                  <div className="lg:col-span-3">
                    {/* Main Featured Card */}
                    <Link to={`/berita/${mainFeaturedArticle.slug}`} className="block group">
                      <article className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                        <img src={mainFeaturedArticle.image_url} alt={mainFeaturedArticle.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"/>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{mainFeaturedArticle.title}</h3>
                          <p className="text-gray-600 my-3 line-clamp-3">{mainFeaturedArticle.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500 gap-4">
                            <span><User size={16} className="inline mr-1"/>{mainFeaturedArticle.author.full_name}</span>
                            <span><Eye size={16} className="inline mr-1"/>{mainFeaturedArticle.views}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                )}
                <div
                  ref={(el) => { if (el) (sideFeaturedContainerRef as any).current = el; }}
                  className="lg:col-span-2 space-y-4"
                >
                  {sideFeaturedArticles.map((article, index) => (
                    // Side Featured Cards
                    <Link
                      key={article.id}
                      to={`/berita/${article.slug}`}
                      className={`block group transition-all duration-500 ${
                        sideFeaturedVisible[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                    >
                      <article className="bg-white rounded-xl shadow-lg flex hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                        <img src={article.image_url} alt={article.title} className="w-1/3 h-28 object-cover group-hover:scale-105 transition-transform duration-300"/>
                        <div className="p-3 w-2/3">
                          <h4 className="font-bold text-gray-800 line-clamp-2 text-sm">{article.title}</h4>
                          <div className="text-xs text-gray-500 mt-2">
                            {formatDate(article.published_at)}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Filter and Search Section */}
          <section
            ref={(el) => { if (el) (filterRef as any).current = el; }}
            className={`mb-12 transition-all duration-700 ${filterVisible ? 'animate-slide-up opacity-100' : 'opacity-100'}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Search, Filter, View Mode UI (same as before) */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari berita..." className="w-full pl-12 pr-4 py-4 border rounded-xl" />
                    </div>
                    <div className="flex items-center space-x-3">
                        <Filter className="w-5 h-5" />
                        <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className="px-4 py-4 border rounded-xl bg-white">
                            {Object.entries(categoryLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                        </select>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid/></button>
                        <button onClick={() => setViewMode('list')} className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}><List/></button>
                    </div>
                </div>
            </div>
          </section>

          {/* Main List Section */}
          <section
            ref={(el) => { if (el) (listRef as any).current = el; }}
            className={`mb-16 transition-all duration-700 ${listVisible ? 'animate-fade-up opacity-100' : 'opacity-100'}`}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Semua Berita & Artikel</h2>
            {loadingList ? renderListSkeleton() : error ? <p className="text-red-500">{error}</p> : (
              <>
                <div
                  ref={(el) => { if (el) (containerRef as any).current = el; }}
                  className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-6'}
                >
                  {paginatedArticles?.data.map((berita, index) => (
                    <Link
                      key={berita.id}
                      to={`/berita/${berita.slug}`}
                      className={`block group transition-all duration-500 ${
                        visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <article className={viewMode === 'grid' ? 'bg-white rounded-xl shadow-lg h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' : 'bg-white rounded-xl shadow-lg flex hover:shadow-xl transition-all duration-300'}>
                          <img src={berita.image_url} alt={berita.title} className={viewMode === 'grid' ? 'w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300' : 'w-1/3 h-auto object-cover group-hover:scale-105 transition-transform duration-300'}/>
                          <div className="p-4 flex flex-col">
                              <span className={`text-xs font-bold ${getCategoryColor(berita.category)}`}>{categoryLabels[berita.category] || berita.category}</span>
                              <h4 className="font-bold text-gray-800 my-2 line-clamp-2">{berita.title}</h4>
                              {viewMode === 'list' && <p className="text-sm text-gray-600 line-clamp-3 mb-2">{berita.excerpt}</p>}
                              <div className="text-xs text-gray-500 mt-auto">{formatDate(berita.published_at)}</div>
                          </div>
                      </article>
                    </Link>
                  ))}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-12 space-x-4">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-full disabled:opacity-50"><ChevronLeft/></button>
                    <span>Halaman {paginatedArticles?.current_page} dari {paginatedArticles?.last_page}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(paginatedArticles?.last_page || 1, p + 1))} disabled={currentPage === paginatedArticles?.last_page} className="p-2 border rounded-full disabled:opacity-50"><ChevronRight/></button>
                </div>
              </>
            )}
          </section>

        </div>
      </div>
    </PageLayout>
  );
};

export default BeritaPage;
