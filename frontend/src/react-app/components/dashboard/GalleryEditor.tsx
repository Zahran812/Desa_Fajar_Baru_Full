import { useState, useEffect } from 'react';
import { 
  Save, X, Upload, Image as ImageIcon, Tag, 
  AlertCircle, FileImage, Trash2
} from 'lucide-react';

// Tipe Data untuk File yang di-upload
interface FileUploadData {
    file: File | null;
    previewUrl: string;
}

interface GalleryItem {
  id?: number;
  title: string;
  description?: string;
  image_url: string; // URL file yang sudah di-upload (dari backend)
  category: string;
  uploaded_by?: number;
  status: string;
  created_at?: string;
}

// Props diubah agar onSave menerima data item DAN file yang diupload
interface GalleryEditorProps {
  item?: GalleryItem | null;
  // onSave sekarang menerima item dan file yang diupload
  onSave: (item: GalleryItem, file: File | null) => Promise<void>; 
  onCancel: () => void;
}

// Definisi Categories dipindahkan ke luar komponen agar tidak diinisialisasi ulang (walaupun React biasanya menangani ini)
const CATEGORIES_LIST = [
  { value: 'kegiatan', label: 'Kegiatan Desa', icon: '🎉', color: 'bg-blue-100 text-blue-700' },
  { value: 'pembangunan', label: 'Pembangunan', icon: '🏗️', color: 'bg-orange-100 text-orange-700' },
  { value: 'ekonomi', label: 'Ekonomi & UMKM', icon: '💼', color: 'bg-green-100 text-green-700' },
  { value: 'sosial', label: 'Sosial & Budaya', icon: '🤝', color: 'bg-purple-100 text-purple-700' },
  { value: 'pendidikan', label: 'Pendidikan', icon: '📚', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'kesehatan', label: 'Kesehatan', icon: '🏥', color: 'bg-red-100 text-red-700' },
  { value: 'lingkungan', label: 'Lingkungan', icon: '🌳', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'lainnya', label: 'Lainnya', icon: '📷', color: 'bg-gray-100 text-gray-700' }
];

const GalleryEditor = ({ item, onSave, onCancel }: GalleryEditorProps) => {
  const [formData, setFormData] = useState<GalleryItem>({
    title: '',
    description: '',
    image_url: '', // image_url akan menyimpan URL lama (dari backend)
    category: 'kegiatan',
    status: 'published'
  });
  
  // State untuk menangani file yang diupload dari device
  const [fileUpload, setFileUpload] = useState<FileUploadData>({ file: null, previewUrl: '' });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!item;
  
  // Efek untuk memuat data saat mode edit/item berubah
  useEffect(() => {
    if (item) {
      setFormData(item);
      setFileUpload({ file: null, previewUrl: item.image_url });
    } else {
      // Reset saat membuat baru
      setFormData({
        title: '',
        description: '',
        image_url: '',
        category: CATEGORIES_LIST[0].value, // Ambil nilai default dari list
        status: 'published'
      });
      setFileUpload({ file: null, previewUrl: '' });
    }
    // Cleanup function untuk Object URLs
    return () => {
        if (fileUpload.previewUrl && !fileUpload.file) {
            URL.revokeObjectURL(fileUpload.previewUrl);
        }
    }
  }, [item]); // Hapus fileUpload dari dependency array, karena kita mengelola clean-up di dalam body.

  // MENGUBAH VALIDATE FORM UNTUK MENCEGAH RE-RENDER TAK TERBATAS DI JSX
  // Sekarang dipanggil hanya di handleSave dan tidak di JSX.
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul foto harus diisi';
    }

    // Wajib ada file baru (untuk create/update) atau image_url lama (untuk edit)
    if (!fileUpload.file && !formData.image_url) {
      newErrors.file = 'Wajib mengunggah file gambar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi File Sederhana
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar (JPEG, PNG, GIF).');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran file maksimum adalah 5MB.');
        e.target.value = '';
        return;
      }

      setFileUpload({ 
        file: file, 
        previewUrl: URL.createObjectURL(file) 
      });
      // Hapus error jika file sudah diupload
      setErrors(prev => ({ ...prev, file: '' }));
      
    } else {
      setFileUpload({ file: null, previewUrl: '' });
    }
  };

  const handleRemoveFile = () => {
    // Hapus file preview lokal
    if (fileUpload.previewUrl) {
      URL.revokeObjectURL(fileUpload.previewUrl);
    }
    setFileUpload({ file: null, previewUrl: '' });
    
    // Hapus image_url lama dari form data, sehingga foto lama terhapus saat disimpan (mode edit)
    setFormData(prev => ({ ...prev, image_url: '' }));
    // Hapus error file
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleSave = async () => {
    if (!validateForm()) {
      // Alert sudah dipanggil di validateForm
      alert('Mohon lengkapi semua field yang diperlukan.');
      return;
    }

    setSaving(true);
    
    // Siapkan data tekstual yang akan dikirim
    const dataToSave: GalleryItem = {
      ...formData,
      // Penting: Jika ada file baru, kita harus menghapus URL lama 
      // agar backend tahu harus mengganti file.
      image_url: fileUpload.file ? '' : formData.image_url,
    };

    try {
      // Panggil onSave, kirim data tekstual dan objek File (fileUpload.file mungkin null saat edit tanpa ganti foto)
      await onSave(dataToSave, fileUpload.file); 
    } catch (error) {
      // Error akan ditangkap di OperatorDashboard
    } finally {
      setSaving(false);
    }
  };

  // Definisikan variabel-variabel yang dihitung di sini
  const currentPreview = fileUpload.previewUrl || formData.image_url;
  const selectedCategory = CATEGORIES_LIST.find(c => c.value === formData.category);
  const isFormValidCheck = formData.title.trim() && (fileUpload.file || formData.image_url); // Check validasi dasar untuk tombol

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
                  {isEdit ? 'Edit Foto Galeri' : 'Upload Foto Baru'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.title || 'Galeri Desa'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving || !isFormValidCheck}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            
            {/* Image Upload Area - Hapus semua input URL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Gambar <span className="text-red-500 ml-1">*</span>
              </h3>

              <div className="space-y-4">
                
                {/* File Input Area */}
                <div className={`p-6 border-2 border-dashed rounded-lg text-center transition-all ${
                    errors.file ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-emerald-500'
                }`}>
                    <input
                      type="file"
                      id="fileUpload"
                      accept="image/jpeg, image/png, image/gif"
                      className="hidden"
                      onChange={handleFileChange} 
                    />
                    <label 
                      htmlFor="fileUpload" 
                      className="cursor-pointer flex flex-col items-center justify-center text-gray-600 hover:text-emerald-700"
                    >
                        <Upload className="w-10 h-10 mb-2 text-emerald-500"/>
                        <span className="font-semibold text-sm">
                            {fileUpload.file ? `File Terpilih: ${fileUpload.file.name}` : 
                             (isEdit && formData.image_url) ? 'Pilih file baru untuk mengganti foto lama' : 
                             'Klik untuk memilih file gambar (maks. 5MB)'}
                        </span>
                        <span className="text-xs mt-1">Hanya JPEG, PNG, GIF yang diperbolehkan.</span>
                    </label>
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.file}
                  </p>
                )}
                
                {/* Image Preview */}
                {(currentPreview) ? (
                  <div className="relative mt-6">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                        <img 
                            src={currentPreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            // Fallback jika URL gagal dimuat (terutama untuk URL lama dari DB)
                            onError={(e: any) => { e.currentTarget.src = 'https://placehold.co/600x400/f3f4f6/6b7280?text=Gagal+Memuat+Gambar'; }}
                        />
                    </div>
                    <button
                        onClick={handleRemoveFile}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg flex items-center space-x-1 text-sm"
                        title="Hapus gambar"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                    </button>
                    {fileUpload.file && (
                         <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            NEW FILE
                         </div>
                    )}
                  </div>
                ) : (
                    <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-sm">Gambar akan muncul di sini setelah diunggah.</p>
                    </div>
                )}
              </div>
            </div>

            {/* Title & Description (Bagian ini tidak diubah) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                 <FileImage className="w-5 h-5 mr-2" />
                 Informasi Foto
              </h3>
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
                  } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Deskripsi akan membantu pengunjung memahami konteks foto
                </p>
              </div>
            </div>
            
            {/* Preview Card (Bagian ini tidak diubah) */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                👁️ Live Preview
              </h3>
              <div className="bg-white rounded-xl overflow-hidden border border-emerald-200 shadow-md">
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

          {/* Sidebar (Bagian ini tidak diubah) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Kategori Foto
              </h3>
              
              <div className="space-y-2">
                {CATEGORIES_LIST.map((cat) => (
                  <label 
                    key={cat.value} 
                    className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.category === cat.value 
                        ? 'border-emerald-500 bg-emerald-50' 
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
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
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
                {['published', 'draft'].map(statusValue => (
                    <label 
                        key={statusValue}
                        className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.status === statusValue
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <input
                            type="radio"
                            name="status"
                            value={statusValue}
                            checked={formData.status === statusValue}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                            {statusValue} ({statusValue === 'published' ? 'Tampil' : 'Belum Tampil'})
                        </span>
                    </label>
                ))}
              </div>
            </div>
            
            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800">
                Gambar akan disimpan di server lokal `/storage/galeri-desa`. Pastikan `php artisan storage:link` sudah dijalankan.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;