import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import OptimizedImage from '@/react-app/components/OptimizedImage';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { isVisible: headerVisible, elementRef: headerRef } = useContentAnimation();
  const { isVisible: filterVisible, elementRef: filterRef } = useContentAnimation({ delay: 200 });
  const { visibleItems: visibleGalleryItems, containerRef: galleryRef } = useStaggeredAnimation(8, 80);

  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop',
      title: 'Balai Desa Fajar Baru',
      category: 'Infrastruktur'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      title: 'Sawah dan Ladang Desa',
      category: 'Pertanian'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516685018646-549198525c1b?w=600&h=400&fit=crop',
      title: 'Kegiatan Gotong Royong',
      category: 'Kegiatan'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      title: 'Pemandangan Alam Desa',
      category: 'Alam'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      title: 'Jalan Utama Desa',
      category: 'Infrastruktur'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1574400869906-df4e5b57b6eb?w=600&h=400&fit=crop',
      title: 'Pasar Desa',
      category: 'Ekonomi'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop',
      title: 'Masjid Desa',
      category: 'Infrastruktur'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      title: 'Hutan Desa',
      category: 'Alam'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
    }
  };

  const categories = ['Semua', ...Array.from(new Set(galleryItems.map(item => item.category)))];
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredItems = activeCategory === 'Semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="galeri" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef as any}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Galeri Desa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dokumentasi visual kehidupan dan keindahan Desa Fajar Baru
          </p>
        </div>

        {/* Category Filter */}
        <div 
          ref={filterRef as any}
          className={`flex flex-wrap justify-center gap-2 mb-8 ${filterVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-village-green text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-village-green'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef as any} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer hover-lift hover-glow ${
                visibleGalleryItems[index] ? 'animate-rotate-in' : 'opacity-0'
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-square">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-emerald-200 text-xs">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-emerald-300 z-10"
              >
                <X size={32} />
              </button>

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-emerald-300 z-10"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-emerald-300 z-10"
              >
                <ChevronRight size={32} />
              </button>

              {/* Image */}
              <img
                src={galleryItems[selectedImage].image}
                alt={galleryItems[selectedImage].title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {galleryItems[selectedImage].title}
                </h3>
                <p className="text-emerald-300">
                  {galleryItems[selectedImage].category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
