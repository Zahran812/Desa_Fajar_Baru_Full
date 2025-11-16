import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/react-app/components/OptimizedImage';
import { useContentAnimation } from '@/react-app/hooks/useContentAnimation';
import { beritaData, categoryLabels, getCategoryColor } from '@/react-app/data/beritaData';

const News = () => {
  const { isVisible: headerVisible, elementRef: headerRef } = useContentAnimation();
  const { isVisible: featuredVisible, elementRef: featuredRef } = useContentAnimation({ delay: 200 });
  
  const newsItems = beritaData.slice(0, 4).map(berita => ({
    id: berita.id,
    title: berita.judul,
    excerpt: berita.ringkasan,
    image: berita.image,
    date: new Date(berita.tanggal).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    author: berita.penulis,
    views: berita.views,
    category: categoryLabels[berita.kategori],
    slug: berita.slug
  }));

  return (
    <section id="informasi" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef as any}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Berita & Informasi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru dari Desa Fajar Baru
          </p>
        </div>

        {/* Featured News */}
        <div 
          ref={featuredRef as any}
          className={`grid lg:grid-cols-2 gap-8 mb-12 ${featuredVisible ? 'animate-slide-left' : 'opacity-0'}`}
        >
          {/* Main Featured Article */}
          <Link to={`/berita/${newsItems[0].slug}`} className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl">
              <OptimizedImage
                src={newsItems[0].image}
                alt={newsItems[0].title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white ${getCategoryColor(beritaData[0].kategori)}`}>
                  {newsItems[0].category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">
                  {newsItems[0].title}
                </h3>
                <p className="text-emerald-100 mb-4 line-clamp-2">
                  {newsItems[0].excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-emerald-200">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{newsItems[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{newsItems[0].views}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary Featured Articles - Now 3 cards */}
          <div className="space-y-4">
            {newsItems.slice(1, 4).map((item, index) => (
              <Link key={item.id} to={`/berita/${item.slug}`} className="group cursor-pointer">
                <div className="flex space-x-4">
                  <div className="relative overflow-hidden rounded-lg w-24 sm:w-28 md:w-32 h-18 sm:h-20 md:h-24 flex-shrink-0">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 bg-white ${getCategoryColor(beritaData[index + 1].kategori)}`}>
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={12} />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

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

export default News;
