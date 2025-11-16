import { useState, useEffect } from 'react';
import { 
  Save, X, Upload, Image as ImageIcon, Tag, 
  Eye, AlertCircle, Link as LinkIcon, FileImage
} from 'lucide-react';

interface GalleryItem {
  id?: number;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  uploaded_by?: number;
  status: string;
  created_at?: string;
}

interface GalleryEditorProps {
  item?: GalleryItem | null;
  onSave: (item: GalleryItem) => Promise<void>;
  onCancel: () => void;
}

const GalleryEditor = ({ item, onSave, onCancel }: GalleryEditorProps) => {
  const [formData, setFormData] = useState<GalleryItem>({
    title: '',
    description: '',
    image_url: '',
    category: 'kegiatan',
    status: 'published'
  });

  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
      setImagePreview(item.image_url);
    }
  }, [item]);

  const categories = [
    { value: 'kegiatan', label: 'Kegiatan Desa', icon: '🎉', color: 'bg-blue-100 text-blue-700' },
    { value: 'pembangunan', label: 'Pembangunan', icon: '🏗️', color: 'bg-orange-100 text-orange-700' },
    { value: 'ekonomi', label: 'Ekonomi & UMKM', icon: '💼', color: 'bg-green-100 text-green-700' },
    { value: 'sosial', label: 'Sosial & Budaya', icon: '🤝', color: 'bg-purple-100 text-purple-700' },
    { value: 'pendidikan', label: 'Pendidikan', icon: '📚', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'kesehatan', label: 'Kesehatan', icon: '🏥', color: 'bg-red-100 text-red-700' },
    { value: 'lingkungan', label: 'Lingkungan', icon: '🌳', color: 'bg-emerald-100 text-emerald-700' },
    { value: 'lainnya', label: 'Lainnya', icon: '📷', color: 'bg-gray-100 text-gray-700' }
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul foto harus diisi';
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'URL gambar harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
    setImagePreview(url);
    setImageError(false);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    if (imageError) {
      alert('Gambar tidak dapat dimuat. Pastikan URL gambar valid');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Gagal menyimpan foto');
    } finally {
      setSaving(false);
    }
  };

  const selectedCategory = categories.find(c => c.value === formData.category);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                title="Kembali"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {item ? 'Edit Foto Galeri' : 'Upload Foto Baru'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.title || 'Galeri Desa'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Foto'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload/URL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Gambar
              </h3>

              <div className="space-y-4">
                {/* URL Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <LinkIcon className="w-4 h-4 inline mr-2" />
                    URL Gambar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-3 border ${
                      errors.image_url ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                  {errors.image_url && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.image_url}
                    </p>
                  )}
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                      {!imageError ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <FileImage className="w-16 h-16 mb-2" />
                          <p className="text-sm">Gagal memuat gambar</p>
                          <p className="text-xs">Periksa URL gambar</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image_url: '' }));
                        setImagePreview('');
                        setImageError(false);
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                      title="Hapus gambar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Sample Images */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 mb-3 flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Atau gunakan contoh gambar:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {sampleImages.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageUrlChange(url)}
                        className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all group"
                      >
                        <img 
                          src={url} 
                          alt={`Sample ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-blue-700 mt-3">
                    💡 Tip: Gunakan layanan seperti Unsplash, Pexels, atau upload ke CDN untuk gambar berkualitas
                  </p>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Judul Foto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Contoh: Upacara HUT RI ke-79"
                  className={`w-full px-4 py-3 text-lg font-medium border ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Deskripsi (Opsional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan tentang foto ini, kapan dan di mana foto diambil..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Deskripsi akan membantu pengunjung memahami konteks foto
                </p>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                👁️ Preview Galeri
              </h3>
              
              <div className="bg-white rounded-xl overflow-hidden border border-purple-200 shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {imagePreview && !imageError ? (
                    <img 
                      src={imagePreview} 
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm">Belum ada gambar</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {formData.title || 'Judul Foto'}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.description || 'Deskripsi foto'}
                  </p>
                  <div className="flex items-center justify-between">
                    {selectedCategory && (
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${selectedCategory.color}`}>
                        {selectedCategory.icon} {selectedCategory.label}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Kategori Foto
              </h3>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label 
                    key={cat.value} 
                    className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.category === cat.value 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={formData.category === cat.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {cat.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Status Publikasi
              </h3>
              
              <div className="space-y-2">
                <label className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.status === 'published'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === 'published'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Published (Tampil di galeri)
                  </span>
                </label>

                <label className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.status === 'draft'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === 'draft'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Draft (Belum tampil)
                  </span>
                </label>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">
                💡 Tips Upload Foto
              </h3>
              <ul className="text-xs text-yellow-800 space-y-2">
                <li>• Gunakan foto dengan resolusi tinggi (min. 800x600px)</li>
                <li>• Pastikan foto jelas dan tidak buram</li>
                <li>• Pilih kategori yang sesuai</li>
                <li>• Beri judul dan deskripsi yang informatif</li>
                <li>• Foto akan tampil di halaman Galeri Desa</li>
              </ul>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800">
                <strong>Catatan:</strong> Untuk produksi, sebaiknya upload gambar ke CDN atau server terlebih dahulu untuk performa yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
