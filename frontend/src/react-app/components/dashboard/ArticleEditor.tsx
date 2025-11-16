import { useState, useEffect } from 'react';
import { 
  Save, X, Eye, Upload, Image as ImageIcon, 
  Bold, Italic, List, Link as LinkIcon, 
  Heading, FileText,
  Calendar, Tag, Star, Globe
} from 'lucide-react';

interface Article {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url?: string;
  category: string;
  status: string;
  featured: boolean;
  author_id?: number;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

interface ArticleEditorProps {
  article?: Article | null;
  onSave: (article: Article) => Promise<void>;
  onCancel: () => void;
}

const ArticleEditor = ({ article, onSave, onCancel }: ArticleEditorProps) => {
  const [formData, setFormData] = useState<Article>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: 'berita',
    status: 'draft',
    featured: false
  });

  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (article) {
      setFormData(article);
      setImagePreview(article.image_url || '');
    }
  }, [article]);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }));
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
    setImagePreview(url);
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title.trim()) {
      alert('Judul artikel harus diisi!');
      return;
    }

    if (!formData.content.trim()) {
      alert('Konten artikel harus diisi!');
      return;
    }

    setSaving(true);
    try {
      await onSave({ ...formData, status });
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Gagal menyimpan artikel');
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { value: 'berita', label: 'Berita' },
    { value: 'pengumuman', label: 'Pengumuman' },
    { value: 'artikel', label: 'Artikel' },
    { value: 'kegiatan', label: 'Kegiatan' },
    { value: 'informasi', label: 'Informasi Umum' }
  ];

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || 'teks';
    const newText = formData.content.substring(0, start) + 
                    prefix + selectedText + suffix + 
                    formData.content.substring(end);
    
    setFormData(prev => ({ ...prev, content: newText }));
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

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
                  {article ? 'Edit Artikel' : 'Tambah Artikel Baru'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.status === 'draft' ? 'Draft' : 'Published'} • 
                  {formData.title || 'Tanpa Judul'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Simpan Draft</span>
              </button>

              <button
                onClick={() => handleSave('published')}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-md transition-all disabled:opacity-50"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Publikasikan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Judul Artikel"
                className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none focus:ring-0 focus:outline-none"
              />
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <LinkIcon className="w-4 h-4 mr-2" />
                <span className="font-mono">/berita/{formData.slug || 'url-artikel'}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <ImageIcon className="w-4 h-4 inline mr-2" />
                Gambar Utama
              </label>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="URL gambar (https://...)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                
                {imagePreview && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview('')}
                    />
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image_url: '' }));
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <Upload className="w-3 h-3 inline mr-1" />
                    Gunakan URL gambar dari CDN atau pastikan gambar sudah diupload ke server
                  </p>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => insertFormatting('**', '**')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertFormatting('*', '*')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button
                    onClick={() => insertFormatting('## ', '')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all"
                    title="Heading"
                  >
                    <Heading className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertFormatting('- ', '')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all"
                    title="List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertFormatting('[', '](url)')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all"
                    title="Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <textarea
                id="article-content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tulis konten artikel di sini... 

Gunakan markdown untuk formatting:
- **tebal** untuk bold
- *miring* untuk italic
- ## untuk heading
- - untuk bullet list"
                className="w-full min-h-[500px] p-6 text-gray-900 placeholder-gray-400 border-none focus:ring-0 focus:outline-none resize-none font-mono text-sm"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <FileText className="w-4 h-4 inline mr-2" />
                Ringkasan Artikel (Excerpt)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Tulis ringkasan singkat artikel (akan ditampilkan di daftar artikel)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Maksimal 2-3 baris. Jika kosong, akan diambil dari konten awal.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Status Publikasi
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Artikel Unggulan
                </label>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData.featured ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.featured ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Kategori
              </h3>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.value} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-3">💡 Tips Menulis</h3>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>• Gunakan judul yang menarik dan deskriptif</li>
                <li>• Tambahkan gambar utama yang relevan</li>
                <li>• Buat ringkasan yang menggambarkan isi artikel</li>
                <li>• Gunakan heading untuk struktur konten</li>
                <li>• Preview sebelum publikasi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Preview Artikel</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt={formData.title}
                  className="w-full aspect-video object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                  {categories.find(c => c.value === formData.category)?.label}
                </span>
                {formData.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Unggulan
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {formData.title || 'Tanpa Judul'}
              </h1>
              
              {formData.excerpt && (
                <p className="text-lg text-gray-600 mb-6 italic">
                  {formData.excerpt}
                </p>
              )}
              
              <div className="prose prose-emerald max-w-none">
                <div className="whitespace-pre-wrap text-gray-800">
                  {formData.content || 'Konten kosong'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleEditor;
