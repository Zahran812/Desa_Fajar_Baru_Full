import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/react-app/components/PageLayout';
import { 
  MessageCircle, Send, Calendar, User, Eye, Tag, Share2, Heart, Bookmark
} from 'lucide-react';
import { categoryLabels } from '@/react-app/data/beritaData';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/hooks/useAuth';
import { Comment } from '@/react-app/interfaces/comment';

// Interface matching the backend's Article model + accessors
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  status: string;
  views: number;
  author: {
    full_name: string;
  };
  published_at: string;
  tags?: string[];
  comments: Comment[];
}

const BeritaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Slug artikel tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchArticleData = async () => {
      try {
        setLoading(true);
        
        // Fetch main article
        const mainArticleResponse = await apiFetch(`/articles/${slug}`);
        if (!mainArticleResponse.ok) {
          if (mainArticleResponse.status === 404) {
            throw new Error('Artikel tidak ditemukan.');
          }
          throw new Error('Gagal memuat artikel.');
        }
        const mainArticleData: Article = await mainArticleResponse.json();
        setArticle(mainArticleData);

        // Fetch other articles
        const otherArticlesResponse = await apiFetch('/articles?limit=5'); // Fetch 5 to have a buffer
        if (otherArticlesResponse.ok) {
            const responseData = await otherArticlesResponse.json();
            // The API might return a paginated object or a direct array. This handles both cases.
            const allArticles: Article[] = responseData.data || responseData; 
            
            if (Array.isArray(allArticles)) {
                setOtherArticles(
                    allArticles
                    // Filter out the current article
                    .filter(a => a.id !== mainArticleData.id) 
                    // Take the first 4 of the remaining
                    .slice(0, 4)
                );
            }
        }

        setError(null);
      } catch (err: any) {
        console.error("Error fetching detail page data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);

  const formatDate = (dateString: string, includeTime = false) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    return date.toLocaleDateString('id-ID', options);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
        'pemerintahan': 'bg-blue-100 text-blue-800',
        'pembangunan': 'bg-green-100 text-green-800',
        'sosial': 'bg-yellow-100 text-yellow-800',
        'teknologi': 'bg-indigo-100 text-indigo-800',
        'lainnya': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors['lainnya'];
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !article || !user) {
      setCommentError('Komentar tidak boleh kosong.');
      return;
    }

    setSubmittingComment(true);
    setCommentError(null);

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Anda harus login untuk berkomentar.');
      }

      const response = await apiFetch(`/articles/${article.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim komentar. Silakan coba lagi.');
      }

      const addedComment: Comment = await response.json();

      setArticle(prevArticle => {
        if (!prevArticle) return null;
        return {
          ...prevArticle,
          comments: [addedComment, ...prevArticle.comments],
        };
      });

      setNewComment('');
    } catch (err: any) {
      setCommentError(err.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Memuat Berita...">
        <div className="py-16 container mx-auto px-4 animate-pulse">
            <div className="w-full h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
            </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !article) {
    return (
      <PageLayout title="Error">
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Artikel tidak dapat dimuat."}
          </h2>
          <p className="text-gray-600 mb-6">Maaf, terjadi kesalahan saat mengambil data.</p>
          <button onClick={() => navigate('/berita')} className="btn-primary px-6 py-3">
            Kembali ke Halaman Berita
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={article.title}
      subtitle={`${categoryLabels[article.category] || article.category} • ${formatDate(article.published_at)}`}
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Berita', href: '/berita' },
        { name: article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title }
      ]}
    >
      <div className="py-4 md:py-8 lg:py-16">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8">
                <div className="relative">
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>

                <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(article.category)} w-fit`}>
                        {categoryLabels[article.category] || article.category}
                      </span>
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <button className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-village-green transition-colors text-sm md:text-base">
                          <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                          <span className="hidden sm:inline">Bagikan</span>
                        </button>
                        <button className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-red-500 transition-colors text-sm md:text-base">
                          <Heart size={16} className="md:w-[18px] md:h-[18px]" />
                          <span className="hidden sm:inline">Suka</span>
                        </button>
                        <button className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-blue-500 transition-colors text-sm md:text-base">
                          <Bookmark size={16} className="md:w-[18px] md:h-[18px]" />
                          <span className="hidden sm:inline">Simpan</span>
                        </button>
                      </div>
                    </div>
                    
                    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                      {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-6 text-sm md:text-base">
                      <div className="flex items-center space-x-2">
                        <User size={14} className="md:w-4 md:h-4" />
                        <span className="font-medium">{article.author.full_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="md:w-4 md:h-4" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye size={14} className="md:w-4 md:h-4" />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none text-justify" dangerouslySetInnerHTML={{ __html: article.content }}></div>

                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                      <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <Tag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 lg:space-y-8 sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Berita Lainnya</h3>
                  <div className="space-y-4">
                    {otherArticles.length > 0 ? (
                        otherArticles.map((otherArticle) => (
                        <Link 
                            key={otherArticle.id}
                            to={`/berita/${otherArticle.slug}`}
                            className="block group hover-lift"
                        >
                            <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="relative">
                                <img 
                                src={otherArticle.image_url} 
                                alt={otherArticle.title}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 left-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(otherArticle.category)} bg-white shadow-sm`}>
                                    {categoryLabels[otherArticle.category]}
                                </span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-semibold text-gray-800 group-hover:text-village-green transition-colors line-clamp-2 mb-2 text-sm leading-tight">
                                {otherArticle.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                                <div className="flex items-center space-x-1">
                                    <Calendar size={10} />
                                    <span>{formatDate(otherArticle.published_at)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Eye size={10} />
                                    <span>{otherArticle.views}</span>
                                </div>
                                </div>
                            </div>
                            </article>
                        </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Tidak ada berita lain untuk ditampilkan.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <section id="comments" className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mt-6 md:mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="mr-3 text-village-green" />
                Komentar ({article.comments.length})
            </h3>
            
            <div className="mb-8">
                {authLoading ? (
                    <div className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : user ? (
                <form onSubmit={handleCommentSubmit}>
                    <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-village-green/20 text-village-green flex items-center justify-center font-bold">
                        {user.full_name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-700 mb-1">{user.full_name}</p>
                        <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full border-gray-300 rounded-lg focus:ring-village-green focus:border-village-green transition duration-200 p-3"
                        rows={3}
                        placeholder="Tulis komentar Anda..."
                        disabled={submittingComment}
                        />
                        {commentError && <p className="text-red-500 text-sm mt-2">{commentError}</p>}
                        <div className="mt-3 text-right">
                        <button 
                            type="submit" 
                            className="btn-primary inline-flex items-center px-4 py-2"
                            disabled={submittingComment}
                        >
                            {submittingComment ? 'Mengirim...' : 'Kirim Komentar'}
                            <Send size={16} className="ml-2" />
                        </button>
                        </div>
                    </div>
                    </div>
                </form>
                ) : (
                <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <h3 className="text-lg font-medium text-gray-700">Anda harus masuk untuk berkomentar</h3>
                    <p className="text-gray-500 mt-2 mb-4">Silakan masuk untuk berpartisipasi dalam diskusi.</p>
                    <Link to="/login" className="btn-primary px-6 py-2">
                    Masuk
                    </Link>
                </div>
                )}
            </div>

            <div className="space-y-6">
                {article.comments.length > 0 ? (
                article.comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                        {comment.citizen.full_name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800">{comment.citizen.full_name}</p>
                        <span className="text-xs text-gray-500">{formatDate(comment.created_at, true)}</span>
                        </div>
                        <p className="text-gray-600 mt-1 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                    </div>
                ))
                ) : (
                <div className="text-center text-gray-500 py-8">
                    <p>Belum ada komentar.</p>
                    <p>Jadilah yang pertama berkomentar!</p>
                </div>
                )}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default BeritaDetail;
