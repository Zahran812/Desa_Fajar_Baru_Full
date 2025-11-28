import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/react-app/components/PageLayout';
import { 
  MessageCircle, Send
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
  comments: Comment[]; // Add comments to the article type
}

const BeritaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
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
        
        const mainArticleResponse = await apiFetch(`/articles/${slug}`);
        if (!mainArticleResponse.ok) {
          if (mainArticleResponse.status === 404) {
            throw new Error('Artikel tidak ditemukan.');
          }
          throw new Error('Gagal memuat artikel.');
        }
        const mainArticleData: Article = await mainArticleResponse.json();
        setArticle(mainArticleData);

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
          {/* ... existing loading skeleton ... */}
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
      <div className="py-4 md:py-8 lg:py-12">
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
                  {/* ... existing article header ... */}
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                </div>
              </article>

              {/* Comments Section */}
              <div id="comments" className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MessageCircle className="mr-3 text-village-green" />
                  Komentar ({article.comments.length})
                </h2>

                {/* Comment Form */}
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

                {/* Comments List */}
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* ... existing sidebar content ... */}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BeritaDetail;
