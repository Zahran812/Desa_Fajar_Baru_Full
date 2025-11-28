import { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
// Hapus import galleryItems dan mockAgendaItems
// import { galleryItems } from '@/data/gallery';
// import { mockAgendaItems } from '@/react-app/data/mockInformationData';

// Import apiFetch dari lokasi yang sudah Anda tentukan
import { apiFetch } from '@/react-app/lib/api'; 

// Tentukan tipe data untuk konsistensi
interface AgendaItem {
  id: number;
  date: string; // ISO date string
  time: string; // e.g. "09:00"
  location: string;
  title: string;
  category: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface GalleryItem {
  id: number;
  title: string;
  src: string; // image URL
  category: string;
}

const FALLBACK_IMAGE = "/images/fallback-gallery.jpg"; // Path gambar fallback

const AgendaGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // State untuk data real
  const [upcomingAgendas, setUpcomingAgendas] = useState<AgendaItem[]>([]);
  const [gallerySlides, setGallerySlides] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi utilitas
  const formatTime = (timeString: string) => {
    return `${timeString} WIB`;
  };
  
  const getDay = (dateString: string) => new Date(dateString).getDate();
  const getMonthShort = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { month: 'short' });

  // --- LOGIC FETCH DATA ---

  const fetchAgenda = useCallback(async () => {
    try {
      const res = await apiFetch("/agenda", { credentials: "include" });

      if (!res.ok) throw new Error("Gagal mengambil data agenda.");

      const data = await res.json();
      const items: any[] = Array.isArray(data.agendas) ? data.agendas : [];

      // Filter, map, dan sort di sini
      const mappedAgendas: AgendaItem[] = items
        .filter((item: any) => item.status === 'scheduled') // Filter yang berstatus 'scheduled'
        .map((item: any) => ({
          id: item.id,
          date: item.date, // Gunakan ISO date string untuk sorting
          time: item.time,
          location: item.location,
          title: item.title,
          category: item.category,
          status: item.status,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3); // Ambil hanya 3 event mendatang

      setUpcomingAgendas(mappedAgendas);
      setError('');
    } catch (err: any) {
      console.error("Error fetching agenda:", err);
      setError('Gagal memuat agenda: ' + (err.message || 'Server error.'));
      setUpcomingAgendas([]);
    }
  }, []);

  const fetchGallery = useCallback(async () => {
    try {
      const galleryResponse = await apiFetch("/gallery", { credentials: "include" });

      if (!galleryResponse.ok) {
        throw new Error("Gagal mengambil data galeri.");
      }

      const data = await galleryResponse.json();
      const items = Array.isArray(data.galleries) ? data.galleries : [];

      const normalized: GalleryItem[] = items
        .filter((item: any) => item.status === 'published') // Filter yang berstatus 'published' (jika ada field status)
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          src: item.image_url || FALLBACK_IMAGE, // Gunakan image_url atau fallback
        }))
        .slice(0, 10); // Ambil 10 slide pertama

      setGallerySlides(normalized);
    } catch (err: any) {
      console.error("Error fetching galleries:", err);
      // Cukup log error galeri, tidak perlu overwrite error agenda
      setGallerySlides([]);
    }
  }, []);
  
  // Kombinasikan fetch di useEffect
  useEffect(() => {
    setIsLoading(true);
    // Jalankan kedua fetch, gunakan Promise.all untuk menunggu keduanya
    Promise.all([fetchAgenda(), fetchGallery()])
        .finally(() => {
            setIsLoading(false);
        });
  }, [fetchAgenda, fetchGallery]);

  // --- LOGIC SLIDESHOW ---

  // Auto-play slideshow
  useEffect(() => {
    // Pastikan ada slide dan tidak dalam loading
    if (!isAutoPlaying || gallerySlides.length === 0) return; 
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % gallerySlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, gallerySlides.length]);

  const nextSlide = () => {
    if (gallerySlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % gallerySlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (gallerySlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    if (gallerySlides.length === 0) return;
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };
  
  // Tampilkan loading state
  if (isLoading) {
    return (
        <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
            <div className="container mx-auto px-4 text-center">
                <p className="text-xl font-semibold text-emerald-600">Memuat Agenda & Galeri...</p>
                {/* Tambahkan spinner/skeleton loading di sini jika diperlukan */}
            </div>
        </div>
    )
  }
  
  // Tampilkan error state (jika ada error yang terjadi)
  if (error && upcomingAgendas.length === 0) {
      return (
          <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
              <div className="container mx-auto px-4 text-center">
                  <p className="text-red-500 font-medium">⚠️ {error}</p>
              </div>
          </div>
      )
  }

  // Render komponen utama
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Agenda & Galeri Desa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jadwal kegiatan mendatang dan dokumentasi aktivitas Desa Fajar Baru
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - AGENDA LIST */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <h3 className="text-2xl font-bold text-gray-900">Agenda Kegiatan</h3>
            </div>

            <div className="space-y-4">
              {upcomingAgendas.length > 0 ? (
                upcomingAgendas.map((agenda) => (
                  <div
                    // Pastikan key unik, jika item API tidak memiliki 'id', gunakan index (kurang disarankan)
                    key={agenda.id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:border-emerald-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Date Badge */}
                      <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg p-3 text-center min-w-[70px] shadow-lg">
                        <div className="text-2xl font-bold">
                          {getDay(agenda.date)}
                        </div>
                        <div className="text-xs uppercase">
                          {getMonthShort(agenda.date)}
                        </div>
                      </div>

                      {/* Agenda Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {agenda.title}
                        </h4>
                        
                        <div className="space-y-1.5 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="line-clamp-1">{formatTime(agenda.time)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="line-clamp-1">{agenda.location}</span>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                            {agenda.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada agenda terjadwal</p>
                </div>
              )}
            </div>

            {/* View All Link */}
            <div className="pt-4">
              <a
                href="/informasi/agenda"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Lihat Semua Agenda
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - GALLERY SLIDESHOW */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Galeri Desa</h3>
              <a
                href="/informasi/galeri"
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center transition-colors"
              >
                Lihat Semua
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Slideshow Container */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {gallerySlides.length > 0 ? (
                    <>
                        {/* Main Slide */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            {gallerySlides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-700 ${
                                        index === currentSlide
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-105'
                                    }`}
                                >
                                    <img
                                        src={slide.src}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    
                                    {/* Slide Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h4 className="text-xl font-bold mb-1 drop-shadow-lg">
                                            {slide.title}
                                        </h4>
                                        {slide.category && (
                                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                                {slide.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Dot Indicators */}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                            {gallerySlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-300 rounded-full ${
                                        index === currentSlide
                                            ? 'bg-white w-8 h-2'
                                            : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Counter */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                            {currentSlide + 1} / {gallerySlides.length}
                        </div>
                    </>
                ) : (
                    <div className="aspect-[4/3] flex items-center justify-center text-center bg-gray-100 rounded-2xl">
                        <p className="text-gray-500">Belum ada foto galeri.</p>
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaGallery;