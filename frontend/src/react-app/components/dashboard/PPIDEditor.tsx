import { useState, useEffect } from 'react';
import { 
  Save, X, FileText, AlertCircle, Calendar, 
  CheckCircle, Shield, Info, Clock, Bell
} from 'lucide-react';

interface PPIDService {
  id?: number;
  title: string;
  category: string;
  description: string;
  document_url?: string;
  published_date: string;
  status: string;
}

interface PPIDEditorProps {
  ppid?: PPIDService | null;
  onSave: (ppid: PPIDService) => Promise<void>;
  onCancel: () => void;
}

const PPIDEditor = ({ ppid, onSave, onCancel }: PPIDEditorProps) => {
  const [formData, setFormData] = useState<PPIDService>({
    title: '',
    category: 'Informasi Berkala',
    description: '',
    document_url: '',
    published_date: new Date().toISOString().split('T')[0],
    status: 'published'
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ppid) {
      setFormData({
        ...ppid,
        published_date: ppid.published_date.split('T')[0] // Format untuk input date
      });
    }
  }, [ppid]);

  const categories = [
    { 
      value: 'Informasi Berkala', 
      label: 'Informasi Berkala', 
      icon: Calendar,
      color: 'blue',
      description: 'Informasi yang wajib disediakan dan diumumkan secara berkala'
    },
    { 
      value: 'Informasi Setiap Saat', 
      label: 'Informasi Setiap Saat', 
      icon: Clock,
      color: 'emerald',
      description: 'Informasi yang wajib tersedia setiap saat dan dapat diakses publik'
    },
    { 
      value: 'Informasi Serta Merta', 
      label: 'Informasi Serta Merta', 
      icon: Bell,
      color: 'orange',
      description: 'Informasi yang dapat mengancam hajat hidup orang banyak'
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul informasi publik harus diisi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi harus diisi';
    }

    if (!formData.published_date) {
      newErrors.published_date = 'Tanggal publikasi harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving PPID:', error);
      alert('Gagal menyimpan informasi publik');
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
                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                  <Shield className="w-6 h-6 text-emerald-600 mr-2" />
                  {ppid ? 'Edit Informasi Publik' : 'Tambah Informasi Publik Baru'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.title || 'Dokumen PPID'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Informasi'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informasi Dasar</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Judul Dokumen <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Contoh: Laporan Keuangan Desa Tahun 2024"
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
                  Deskripsi / Ringkasan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan dokumen ini secara detail untuk memudahkan masyarakat..."
                  rows={5}
                  className={`w-full px-4 py-3 border ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Document & Publication Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Dokumen</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    URL Dokumen (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.document_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, document_url: e.target.value }))}
                    placeholder="https://example.com/dokumen-ppid.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Link ke file PDF atau dokumen yang bisa diunduh publik
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Publikasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, published_date: e.target.value }))}
                    className={`w-full px-4 py-3 border ${
                      errors.published_date ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  />
                  {errors.published_date && (
                    <p className="text-red-500 text-sm mt-1">{errors.published_date}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Tentang PPID</h4>
                  <p className="text-sm text-blue-800">
                    Pejabat Pengelola Informasi dan Dokumentasi (PPID) bertugas menyediakan dan melayani 
                    permintaan informasi publik sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kategori Informasi</h3>
              
              <div className="space-y-3">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <label 
                      key={cat.value} 
                      className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.category === cat.value 
                          ? `border-${cat.color}-500 bg-${cat.color}-50` 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={formData.category === cat.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <IconComponent className={`w-5 h-5 text-${cat.color}-600`} />
                        <span className="text-sm font-semibold text-gray-900">
                          {cat.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-7">
                        {cat.description}
                      </p>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Status Publikasi</h3>
              
              <div className="space-y-2">
                <label className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.status === 'published'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === 'published'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Published (Publik)
                  </span>
                </label>

                <label className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.status === 'draft'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === 'draft'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Draft (Belum Publik)
                  </span>
                </label>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Preview PPID
              </h3>
              
              <div className="bg-white rounded-lg p-4 border border-emerald-200 space-y-3">
                <div className="flex items-start space-x-2">
                  {selectedCategory && (
                    <selectedCategory.icon className={`w-5 h-5 text-${selectedCategory.color}-600 mt-0.5 flex-shrink-0`} />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {formData.title || 'Judul Dokumen'}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {formData.description || 'Deskripsi dokumen'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1 text-xs pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="font-medium">Kategori:</span>
                    <span className={`px-2 py-1 bg-${selectedCategory?.color}-100 text-${selectedCategory?.color}-700 rounded-full`}>
                      {formData.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="font-medium">Publikasi:</span>
                    <span>
                      {formData.published_date 
                        ? new Date(formData.published_date).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })
                        : '-'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="font-medium">Status:</span>
                    <span className={`px-2 py-1 ${
                      formData.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-gray-100 text-gray-700'
                    } rounded-full`}>
                      {formData.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">
                💡 Panduan PPID
              </h3>
              <ul className="text-xs text-yellow-800 space-y-2">
                <li>• Gunakan judul yang jelas dan informatif</li>
                <li>• Pastikan deskripsi menjelaskan isi dokumen</li>
                <li>• Pilih kategori yang sesuai dengan jenis informasi</li>
                <li>• Upload dokumen ke server terlebih dahulu</li>
                <li>• Perbarui informasi secara berkala</li>
                <li>• Status Published akan tampil di website publik</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPIDEditor;
