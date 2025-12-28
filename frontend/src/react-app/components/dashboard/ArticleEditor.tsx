import { useState, useEffect, useRef } from 'react';
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
  image_path?: string; // Backend sends image_path
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
  onSave: (article: Article, imageFile: File | null) => Promise<void>;
  onCancel: () => void;
}

const ArticleEditor = ({ article, onSave, onCancel }: ArticleEditorProps) => {
  const previewStyles = `
  .article-preview { text-align: justify; line-height: 1.8; }
  .article-preview p { margin-bottom: 1rem; }
  .article-preview img { max-width: 100%; display: block; margin: 1.25rem auto; border-radius: 0.5rem; }
  .article-preview .article-inline-image { text-align: center; }
  .article-preview h1, .article-preview h2, .article-preview h3, .article-preview h4 { margin-top: 1.5rem; margin-bottom: 0.75rem; }
  `;
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [inlineImageUrl, setInlineImageUrl] = useState('');
  const [inlineImageFile, setInlineImageFile] = useState<File | null>(null);
  const [inlineImagePreview, setInlineImagePreview] = useState<string | null>(null);
  const [inlineImageAlt, setInlineImageAlt] = useState('Gambar');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inlineFileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const lastSelectionRef = useRef<Range | null>(null);
  const isHydratingEditorRef = useRef(false);
  const lastHydratedContentRef = useRef<string>('');

  useEffect(() => {
    if (article) {
      setFormData(article);
      // Use the image_url provided by the backend model accessor directly
      if (article.image_url) {
        setImagePreview(article.image_url);
      } else if (article.image_path) { // Fallback if image_url is not set but image_path exists
        setImagePreview(`/storage/${article.image_path}`); // Ensure this is also the public path
      } else {
        setImagePreview(null);
      }
    }
  }, [article]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Hydrate editor content when loading a new article (or when formData.content changes externally)
    // without clobbering user typing.
    const nextHtml = formatContentForDisplay(formData.content);

    // Only force-update if:
    // - we're switching articles, or
    // - editor is empty, or
    // - content changed from outside the editor (save/load)
    const shouldHydrate =
      (article?.id ? true : false) &&
      (lastHydratedContentRef.current !== formData.content || editor.innerHTML.trim() === '');

    if (shouldHydrate && editor.innerHTML !== nextHtml) {
      isHydratingEditorRef.current = true;
      editor.innerHTML = nextHtml;
      lastHydratedContentRef.current = formData.content;
      // move caret to end
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      lastSelectionRef.current = range;
      // allow next onInput to run normally
      setTimeout(() => {
        isHydratingEditorRef.current = false;
      }, 0);
    }
  }, [article?.id, formData.content]);

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

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a local URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Also clear image_path/image_url from form data
    setFormData(prev => ({...prev, image_path: '', image_url: ''}));
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

    // Fallback excerpt jika kosong: ambil hingga 500 karakter pertama konten (plain)
    const serializedContent = formatContentForDisplay(formData.content);
    const plainExcerpt = formData.excerpt.trim()
      ? formData.excerpt.trim().slice(0, 500)
      : serializedContent
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 500);

    setSaving(true);
    try {
      // Pass both form data and the selected image file
      await onSave({ ...formData, status, content: serializedContent, excerpt: plainExcerpt }, imageFile);
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
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    if (!selection) return;

    let range: Range | null = null;
    if (selection.rangeCount > 0) range = selection.getRangeAt(0);
    if (!range && lastSelectionRef.current) range = lastSelectionRef.current;
    if (!range) return;

    // Ensure range is inside editor
    if (!editor.contains(range.commonAncestorContainer)) return;

    const selectedText = selection.toString() || 'teks';
    const textNode = document.createTextNode(`${prefix}${selectedText}${suffix}`);
    range.deleteContents();
    range.insertNode(textNode);

    // Move caret after inserted content
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    lastSelectionRef.current = range;

    setFormData((prev) => ({ ...prev, content: editor.innerHTML }));
  };

  const handleInsertImageInline = () => {
    setShowImageModal(true);
  };

  const handleInlineFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setInlineImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setInlineImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setInlineImagePreview(null);
    }
  };

  const insertInlineImageAtCaret = (src: string, alt: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    let range: Range | null = null;
    if (selection && selection.rangeCount > 0) range = selection.getRangeAt(0);
    if (!range && lastSelectionRef.current) range = lastSelectionRef.current;
    if (!range) return;

    if (!editor.contains(range.commonAncestorContainer)) {
      range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
    }

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Gambar';
    img.style.maxWidth = '100%';
    img.style.display = 'block';
    img.style.margin = '1.25rem auto';
    img.style.borderRadius = '0.5rem';

    const wrapper = document.createElement('p');
    wrapper.className = 'article-inline-image';
    wrapper.appendChild(img);

    // Insert wrapper paragraph and ensure cursor lands after it.
    range.deleteContents();
    range.insertNode(wrapper);

    const after = document.createTextNode('');
    wrapper.parentNode?.insertBefore(after, wrapper.nextSibling);

    const newRange = document.createRange();
    newRange.setStartAfter(wrapper);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
    lastSelectionRef.current = newRange;

    setFormData((prev) => ({ ...prev, content: editor.innerHTML }));
  };

  const handleInsertImageConfirm = () => {
    const src = inlineImageFile && inlineImagePreview ? inlineImagePreview : inlineImageUrl.trim();
    if (!src) {
      alert('Masukkan URL gambar atau unggah file.');
      return;
    }
    insertInlineImageAtCaret(src, inlineImageAlt);
    setShowImageModal(false);
    setInlineImageUrl('');
    setInlineImageFile(null);
    setInlineImagePreview(null);
    setInlineImageAlt('Gambar');
  };

  const formatContentForDisplay = (content: string) => {
    if (!content.trim()) return '';
    // If content is already HTML (from the editor), keep it.
    if (/<\s*(p|div|img|h1|h2|h3|h4|ul|ol|li|br)\b/i.test(content)) {
      return content;
    }
    const paragraphs = content.trim().split(/\n{2,}/);
    return paragraphs
      .map((p) => {
        const withBr = p.replace(/\n/g, '<br />');
        const hasImg = /<img\s/i.test(withBr);
        return hasImg ? `<p class="article-inline-image">${withBr}</p>` : `<p>${withBr}</p>`;
      })
      .join('');
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
                {imagePreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 hover:border-gray-400 transition-all"
                  >
                    <Upload className="w-10 h-10 mb-2" />
                    <span className="font-semibold">Klik untuk mengunggah gambar</span>
                    <span className="text-xs">PNG, JPG, WEBP (Maks. 2MB)</span>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
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
                  <button
                    onClick={handleInsertImageInline}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-all"
                    title="Sisip Gambar (URL)"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {showImageModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Sisipkan Gambar</h3>
                      <button
                        onClick={() => {
                          setShowImageModal(false);
                          setInlineImageUrl('');
                          setInlineImageFile(null);
                          setInlineImagePreview(null);
                          setInlineImageAlt('Gambar');
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Alt Text</label>
                      <input
                        value={inlineImageAlt}
                        onChange={(e) => setInlineImageAlt(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Deskripsi gambar"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
                      <input
                        value={inlineImageUrl}
                        onChange={(e) => setInlineImageUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Atau Unggah Gambar</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => inlineFileInputRef.current?.click()}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                        >
                          <Upload className="w-4 h-4" />
                          Pilih File
                        </button>
                        <input
                          ref={inlineFileInputRef}
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={handleInlineFileChange}
                        />
                        {inlineImageFile && (
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">{inlineImageFile.name}</span>
                        )}
                      </div>
                      {inlineImagePreview && (
                        <div className="mt-2">
                          <img src={inlineImagePreview} alt="Preview" className="max-h-40 rounded-lg border border-gray-200" />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          setShowImageModal(false);
                          setInlineImageUrl('');
                          setInlineImageFile(null);
                          setInlineImagePreview(null);
                          setInlineImageAlt('Gambar');
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleInsertImageConfirm}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Sisipkan
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div
                ref={editorRef}
                id="article-content"
                contentEditable
                suppressContentEditableWarning
                onMouseUp={() => {
                  const sel = window.getSelection();
                  if (sel && sel.rangeCount > 0) lastSelectionRef.current = sel.getRangeAt(0);
                }}
                onKeyUp={() => {
                  const sel = window.getSelection();
                  if (sel && sel.rangeCount > 0) lastSelectionRef.current = sel.getRangeAt(0);
                }}
                onFocus={() => {
                  const sel = window.getSelection();
                  if (sel && sel.rangeCount > 0) lastSelectionRef.current = sel.getRangeAt(0);
                }}
                onInput={(e) => {
                  if (isHydratingEditorRef.current) return;
                  const html = (e.currentTarget as HTMLDivElement).innerHTML;
                  setFormData((prev) => ({ ...prev, content: html }));
                }}
                className="w-full min-h-[500px] p-6 text-gray-900 placeholder-gray-400 border-none focus:ring-0 focus:outline-none resize-none text-sm"
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
              <style>{previewStyles}</style>
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
              
              <div className="article-preview prose prose-emerald max-w-none" dangerouslySetInnerHTML={{ __html: formatContentForDisplay(formData.content) || 'Konten kosong' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleEditor;
