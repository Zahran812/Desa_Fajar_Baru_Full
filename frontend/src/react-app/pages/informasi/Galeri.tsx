import PageLayout from '@/react-app/components/PageLayout';
import { useMemo, useState } from 'react';
import { Image as ImageIcon, Filter, Search, X } from 'lucide-react';
import { galleryItems } from '@/data/gallery';

const GaleriPage = () => {
  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState<string>('semua');
  const [preview, setPreview] = useState<{ src: string; caption: string; title?: string; category?: string } | null>(null);

  // Build categories from data (plus 'semua')
  const categories = useMemo(() => {
    const set = new Set<string>();
    galleryItems.forEach(i => { if (i.category) set.add(i.category); });
    return ['semua', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return galleryItems.filter(p =>
      (kategori === 'semua' || (p.category || '').toLowerCase() === kategori.toLowerCase()) &&
      ((p.caption || p.title || '').toLowerCase().includes(query.toLowerCase()))
    );
  }, [kategori, query]);

  return (
    <PageLayout
      title="Galeri Desa"
      subtitle="Dokumentasi foto kegiatan dan potensi Desa Fajar Baru"
      breadcrumb={[{ name: 'Beranda', href: '/' }, { name: 'Informasi' }, { name: 'Galeri Desa' }]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-100">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold">Filter Galeri</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="flex items-center bg-gray-100 rounded-xl px-3 hover:bg-gray-200 transition-colors">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input 
                      className="bg-transparent px-2 py-2 text-sm w-full focus:outline-none" 
                      placeholder="Cari caption atau judul..." 
                      value={query} 
                      onChange={e => setQuery(e.target.value)} 
                    />
                  </div>
                  <select 
                    className="bg-gray-100 rounded-xl px-3 py-2 text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    value={kategori} 
                    onChange={e => setKategori(e.target.value)}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Results Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <ImageIcon className="w-4 h-4" />
                  <span>
                    Menampilkan <span className="font-bold text-emerald-600">{filtered.length}</span> dari <span className="font-bold">{galleryItems.length}</span> foto
                  </span>
                </div>
                {(query || kategori !== 'semua') && (
                  <button
                    onClick={() => { setQuery(''); setKategori('semua'); }}
                    className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reset Filter</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p) => (
                <figure 
                  key={p.id} 
                  className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => setPreview({ src: p.src, caption: p.caption || p.title || '', title: p.title, category: p.category })}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={p.src} 
                      alt={p.caption || p.title || 'Foto galeri'} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {p.category && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {p.category}
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                  {/* Caption temporarily removed */}
                </figure>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada foto ditemukan</h3>
              <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}

          {/* Lightbox */}
          {preview && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" 
              onClick={() => setPreview(null)}
            >
              <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button 
                  className="absolute -top-12 right-0 md:-right-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-xl text-gray-700 transition-colors z-10" 
                  onClick={() => setPreview(null)} 
                  aria-label="Tutup"
                >
                  <X className="w-6 h-6" />
                </button>
                
                {/* Image Container */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={preview.src} 
                    alt={preview.caption} 
                    loading="lazy" 
                    className="w-full max-h-[70vh] object-contain bg-gray-100" 
                  />
                  
                  {/* Image Info */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {preview.title && (
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{preview.title}</h3>
                        )}
                        <p className="text-gray-600 mb-3">{preview.caption}</p>
                        {preview.category && (
                          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                            <ImageIcon className="w-4 h-4" />
                            <span>{preview.category}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation hint */}
                <div className="text-center mt-4">
                  <p className="text-white/80 text-sm">Klik di luar gambar atau tombol ✕ untuk menutup</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GaleriPage;
