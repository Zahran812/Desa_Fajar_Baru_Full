import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/react-app/components/PageLayout';
import { 
  Calendar, Clock, User, Eye, Share2, Facebook, Twitter, 
  MessageCircle, Heart, Bookmark, Tag, ExternalLink
} from 'lucide-react';
import { beritaData, categoryLabels, getCategoryColor, BeritaItem } from '@/react-app/data/beritaData';

const BeritaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentBerita, setCurrentBerita] = useState<BeritaItem | null>(null);
  const [relatedBerita, setRelatedBerita] = useState<BeritaItem[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      nama: 'Siti Nurhaliza',
      waktu: '2 jam yang lalu',
      komentar: 'Alhamdulillah, pembangunan jalan ini sangat ditunggu-tunggu warga. Semoga bisa selesai tepat waktu.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face',
      likes: 5
    },
    {
      id: 2,
      nama: 'Ahmad Budiman',
      waktu: '4 jam yang lalu', 
      komentar: 'Ini sangat membantu petani untuk mengangkut hasil panen. Terima kasih pemerintah desa!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      likes: 3
    },
    {
      id: 3,
      nama: 'Dewi Lestari',
      waktu: '6 jam yang lalu',
      komentar: 'Semoga proyek-proyek pembangunan lainnya juga bisa terlaksana dengan baik.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      likes: 2
    }
  ]);
  const [newComment, setNewComment] = useState('');
  
  // Animation hooks for smooth content loading (currently unused but kept for future enhancements)
  // const { isVisible: contentVisible, elementRef: contentRef } = useContentAnimation();
  // const { isVisible: sidebarVisible, elementRef: sidebarRef } = useContentAnimation({ delay: 200 });

  useEffect(() => {
    console.log('BeritaDetail useEffect triggered with slug:', slug);
    console.log('Available slugs:', beritaData.map(item => item.slug));
    
    if (slug) {
      const berita = beritaData.find(item => item.slug === slug);
      console.log('Found berita:', berita);
      
      if (berita) {
        setCurrentBerita(berita);
        // Increment views (in real app, this would be API call)
        berita.views += 1;
        
        // Get all other articles and news (excluding current one)
        const related = beritaData
          .filter(item => item.id !== berita.id)
          .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
          .slice(0, 8);
        setRelatedBerita(related);
      } else {
        console.error('Berita not found for slug:', slug);
      }
    } else {
      console.error('No slug provided');
    }
  }, [slug]);

  // Show the content if we have currentBerita, regardless of loading state
  console.log('Rendering component with currentBerita:', currentBerita);
  
  if (!currentBerita) {
    return (
      <PageLayout title="Berita Tidak Ditemukan">
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Artikel dengan URL "{slug}" tidak dapat ditemukan.</p>
          <Link to="/berita" className="btn-primary px-6 py-3">
            Kembali ke Halaman Berita
          </Link>
        </div>
      </PageLayout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${currentBerita.judul} - ${currentBerita.ringkasan}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link berhasil disalin!');
        break;
    }
    setShowShareModal(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        nama: 'Pengunjung',
        waktu: 'Baru saja',
        komentar: newComment,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <PageLayout
      title={currentBerita.judul}
      subtitle={`${categoryLabels[currentBerita.kategori]} • ${formatDate(currentBerita.tanggal)}`}
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Berita', href: '/berita' },
        { name: currentBerita.judul.length > 50 ? currentBerita.judul.substring(0, 50) + '...' : currentBerita.judul }
      ]}
    >
      <div className="py-4 md:py-8 lg:py-16">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8">
                {/* Cover Image */}
                <div className="relative">
                  <img 
                    src={currentBerita.image} 
                    alt={currentBerita.judul}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>

                <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                  {/* Article Header */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(currentBerita.kategori)} w-fit`}>
                        {categoryLabels[currentBerita.kategori]}
                      </span>
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <button 
                          onClick={() => setShowShareModal(true)}
                          className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-village-green transition-colors text-sm md:text-base"
                        >
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
                      {currentBerita.judul}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-6 text-sm md:text-base">
                      <div className="flex items-center space-x-2">
                        <User size={14} className="md:w-4 md:h-4" />
                        <span className="font-medium">{currentBerita.penulis}</span>
                        <span className="text-gray-400 hidden sm:inline">•</span>
                        <span className="text-xs md:text-sm text-gray-500 hidden sm:inline">{currentBerita.posisiPenulis}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="md:w-4 md:h-4" />
                        <span>{formatDate(currentBerita.tanggal)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="md:w-4 md:h-4" />
                        <span>{currentBerita.estimasiBaca} baca</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye size={14} className="md:w-4 md:h-4" />
                        <span>{currentBerita.views} views</span>
                      </div>
                    </div>

                    <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                      {currentBerita.ringkasan}
                    </p>
                  </div>

                  {/* Article Content */}
                  <div className="prose max-w-none">
                    {currentBerita.kontenLengkap.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={index} className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-6 md:mt-8 mb-3 md:mb-4">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={index} className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                    <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Tag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentBerita.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 lg:space-y-8">
                
                {/* Share Modal */}
                {showShareModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-4 md:p-6 max-w-md w-full">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Bagikan Artikel</h3>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <button 
                          onClick={() => handleShare('facebook')}
                          className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                        >
                          <Facebook size={16} className="md:w-5 md:h-5" />
                          <span>Facebook</span>
                        </button>
                        <button 
                          onClick={() => handleShare('twitter')}
                          className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm md:text-base"
                        >
                          <Twitter size={16} className="md:w-5 md:h-5" />
                          <span>Twitter</span>
                        </button>
                        <button 
                          onClick={() => handleShare('whatsapp')}
                          className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                        >
                          <MessageCircle size={16} className="md:w-5 md:h-5" />
                          <span>WhatsApp</span>
                        </button>
                        <button 
                          onClick={() => handleShare('copy')}
                          className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
                        >
                          <ExternalLink size={16} className="md:w-5 md:h-5" />
                          <span>Salin Link</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => setShowShareModal(false)}
                        className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm md:text-base"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                )}

                {/* Related Articles */}
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Berita dan Artikel Lainnya</h3>
                  <div className="space-y-4">
                    {relatedBerita.map((berita) => (
                      <Link 
                        key={berita.id}
                        to={`/berita/${berita.slug}`}
                        className="block group hover-lift"
                      >
                        <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                          <div className="relative">
                            <img 
                              src={berita.image} 
                              alt={berita.judul}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(berita.kategori)} bg-white shadow-sm`}>
                                {categoryLabels[berita.kategori]}
                              </span>
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-semibold text-gray-800 group-hover:text-village-green transition-colors line-clamp-2 mb-2 text-sm leading-tight">
                              {berita.judul}
                            </h4>
                            <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                              {berita.ringkasan}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar size={10} />
                                <span>{formatDate(berita.tanggal)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye size={10} />
                                <span>{berita.views}</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          {/* Comments Section - Full Width */}
          <section className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mt-6 md:mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              Komentar ({comments.length})
            </h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                  alt="Your avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full self-start"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar Anda..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent resize-none text-sm md:text-base"
                  />
                  <div className="flex justify-end mt-3">
                    <button 
                      type="submit"
                      className="btn-primary px-4 md:px-6 py-2 text-sm md:text-base"
                    >
                      Kirim Komentar
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 md:space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <img 
                    src={comment.avatar} 
                    alt={comment.nama}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">{comment.nama}</h4>
                      <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">{comment.waktu}</span>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm md:text-base leading-relaxed break-words">{comment.komentar}</p>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors text-sm">
                        <Heart size={14} className="md:w-4 md:h-4" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-village-green transition-colors text-sm">
                        Balas
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default BeritaDetail;
