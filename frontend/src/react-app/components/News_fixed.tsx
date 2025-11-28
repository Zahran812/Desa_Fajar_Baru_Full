import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// import OptimizedImage from '@/react-app/components/OptimizedImage'; // DEBUG: Disabled
// import { useContentAnimation } from '@/react-app/hooks/useContentAnimation'; // DEBUG: Disabled
import { categoryLabels, getCategoryColor } from '@/react-app/data/beritaData';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';

// Interface matching the backend's Article model
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  views: number;
  author?: { // Made author optional for safety
    full_name: string;
  };
  published_at: string;
}

const NewsFixed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('/articles?limit=4');
        if (!response.ok) {
          throw new Error('Gagal mengambil data berita.');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching articles in News.tsx:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const mainArticle = articles.length > 0 ? articles[0] : null;
  const sideArticles = articles.length > 1 ? articles.slice(1, 4) : [];

  const renderSkeleton = () => (
    <div className={`grid lg:grid-cols-2 gap-8 mb-12 animate-pulse`}>
        <div className="relative bg-gray-200 rounded-2xl h-80"></div>
        <div className="space-y-4">
            <div className="flex space-x-4">
                <div className="bg-gray-200 rounded-lg w-32 h-24"></div>
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="bg-gray-200 rounded-lg w-32 h-24"></div>
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="bg-gray-200 rounded-lg w-32 h-24"></div>
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-10 bg-gray-50 rounded-2xl mb-12">
        <h3 className="text-xl font-semibold text-gray-700">Belum Ada Berita</h3>
        <p className="text-gray-500 mt-2">Saat ini belum ada berita yang dipublikasikan. Silakan cek kembali nanti.</p>
        <Link to="/berita" className="btn-primary px-8 py-3 mx-auto mt-4">
          <span>Lihat Semua Berita</span>
        </Link>
    </div>
  );

  return (
    <section id="informasi" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Berita & Informasi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru dari Desa Fajar Baru
          </p>
        </div>

        {/* Featured News Section */}
        {loading ? renderSkeleton() : error ? <p className="text-center text-red-500">{error}</p> : (
            articles.length === 0 ? renderEmptyState() : (
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Main Featured Article */}
                    {mainArticle && (
                        <Link to={`/berita/${mainArticle.slug}`} className="relative group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={mainArticle.image_url}
                                alt={mainArticle.title}
                                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white ${getCategoryColor(mainArticle.category)}`}>
                                {categoryLabels[mainArticle.category] || mainArticle.category}
                                </span>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">{mainArticle.title}</h3>
                                <p className="text-emerald-100 mb-4 line-clamp-2">{mainArticle.excerpt}</p>
                                <div className="flex items-center space-x-4 text-sm text-emerald-200">
                                    <div className="flex items-center space-x-1"><Calendar size={14} /><span>{formatDate(mainArticle.published_at)}</span></div>
                                    <div className="flex items-center space-x-1"><Eye size={14} /><span>{mainArticle.views}</span></div>
                                </div>
                            </div>
                            </div>
                        </Link>
                    )}

                    {/* Secondary Featured Articles */}
                    <div className="space-y-4">
                        {sideArticles.map((item) => (
                        <Link key={item.id} to={`/berita/${item.slug}`} className="group cursor-pointer">
                            <div className="flex space-x-4">
                            <div className="relative overflow-hidden rounded-lg w-24 sm:w-28 md:w-32 h-18 sm:h-20 md:h-24 flex-shrink-0">
                                <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 bg-white ${getCategoryColor(item.category)}`}>
                                {categoryLabels[item.category] || item.category}
                                </span>
                                <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2 text-sm sm:text-base">{item.title}</h3>
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                <div className="flex items-center space-x-1"><Calendar size={12} /><span>{formatDate(item.published_at)}</span></div>
                                <div className="flex items-center space-x-1"><Eye size={12} /><span>{item.views}</span></div>
                                </div>
                            </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            )
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link to="/berita" className="btn-primary px-8 py-3 mx-auto">
            <span>Lihat Semua Berita</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsFixed;
