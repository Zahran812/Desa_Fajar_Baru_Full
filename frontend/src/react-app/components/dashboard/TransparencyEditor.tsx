import { useState, useEffect } from 'react';
import { X, Save, Upload, FileText, DollarSign, AlertCircle } from 'lucide-react';

interface TransparencyData {
  id?: number;
  type: string;
  title: string;
  description?: string;
  file_url?: string;
  amount?: number;
  year: number;
  quarter?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface TransparencyEditorProps {
  data?: TransparencyData | null;
  onSave: (data: TransparencyData) => Promise<void>;
  onCancel: () => void;
}

const TransparencyEditor = ({ data, onSave, onCancel }: TransparencyEditorProps) => {
  const [formData, setFormData] = useState<TransparencyData>({
    type: data?.type || 'apbd',
    title: data?.title || '',
    description: data?.description || '',
    file_url: data?.file_url || '',
    amount: data?.amount || undefined,
    year: data?.year || new Date().getFullYear(),
    quarter: data?.quarter || undefined,
    status: data?.status || 'draft'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        type: data.type,
        title: data.title,
        description: data.description || '',
        file_url: data.file_url || '',
        amount: data.amount || undefined,
        year: data.year,
        quarter: data.quarter || undefined,
        status: data.status
      });
    }
  }, [data]);

  const categoryOptions = [
    { value: 'apbd', label: 'APBDes', icon: DollarSign, requiresAmount: true },
    { value: 'bansos', label: 'Bantuan Sosial', icon: DollarSign, requiresAmount: true },
    { value: 'pembangunan', label: 'Pembangunan', icon: DollarSign, requiresAmount: true },
    { value: 'idm', label: 'IDM (Indeks Desa Membangun)', icon: FileText, requiresAmount: false },
    { value: 'statistik', label: 'Statistik', icon: FileText, requiresAmount: false }
  ];

  const currentCategory = categoryOptions.find(c => c.value === formData.type);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul harus diisi';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Deskripsi harus diisi';
    }

    if (formData.year < 2000 || formData.year > 2100) {
      newErrors.year = 'Tahun tidak valid';
    }

    if (formData.quarter && (formData.quarter < 1 || formData.quarter > 4)) {
      newErrors.quarter = 'Triwulan harus antara 1-4';
    }

    if (currentCategory?.requiresAmount && !formData.amount) {
      newErrors.amount = 'Jumlah anggaran harus diisi untuk kategori ini';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    try {
      setSaving(true);
      await onSave(formData);
    } catch (error) {
      console.error('Error saving transparency data:', error);
      alert('Gagal menyimpan data transparansi');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {data ? 'Edit Data Transparansi' : 'Tambah Data Transparansi'}
                </h2>
                <p className="text-emerald-100 text-sm">
                  Kelola informasi transparansi desa untuk publikasi
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Kategori */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Kategori Transparansi *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {categoryOptions.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: category.value }))}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    formData.type === category.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <category.icon className={`w-5 h-5 ${
                      formData.type === category.value ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      formData.type === category.value ? 'text-emerald-700' : 'text-gray-700'
                    }`}>
                      {category.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Judul */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Dokumen/Informasi *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Contoh: APBDes Tahun Anggaran 2024"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Jelaskan secara singkat tentang dokumen atau informasi ini..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Tahun dan Triwulan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tahun *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                min="2000"
                max="2100"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.year ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Triwulan (Opsional)
              </label>
              <select
                value={formData.quarter || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, quarter: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Tidak Ada</option>
                <option value="1">Triwulan 1 (Jan-Mar)</option>
                <option value="2">Triwulan 2 (Apr-Jun)</option>
                <option value="3">Triwulan 3 (Jul-Sep)</option>
                <option value="4">Triwulan 4 (Okt-Des)</option>
              </select>
            </div>
          </div>

          {/* Jumlah Anggaran (conditional) */}
          {currentCategory?.requiresAmount && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Anggaran (Rp) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Rp
                </span>
                <input
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.amount}
                </p>
              )}
              {formData.amount && (
                <p className="text-sm text-gray-600 mt-1">
                  {formData.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </p>
              )}
            </div>
          )}

          {/* URL Dokumen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL Dokumen (Opsional)
            </label>
            <div className="relative">
              <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.file_url}
                onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="/documents/apbdes-2024.pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Link ke file dokumen PDF atau format lainnya
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status Publikasi
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-4 h-4 text-emerald-600"
                />
                <span className="text-gray-700">Draft</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-4 h-4 text-emerald-600"
                />
                <span className="text-gray-700">Published</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Data dengan status "Published" akan ditampilkan di website publik
            </p>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Preview</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Kategori:</span> {currentCategory?.label}</p>
              <p><span className="font-medium">Judul:</span> {formData.title || '(Belum diisi)'}</p>
              <p><span className="font-medium">Tahun:</span> {formData.year}{formData.quarter ? ` - Triwulan ${formData.quarter}` : ''}</p>
              {formData.amount && (
                <p><span className="font-medium">Anggaran:</span> Rp {formData.amount.toLocaleString('id-ID')}</p>
              )}
              <p><span className="font-medium">Status:</span> {formData.status === 'published' ? 'Published' : 'Draft'}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
          <button
            onClick={onCancel}
            disabled={saving}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Simpan Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransparencyEditor;
