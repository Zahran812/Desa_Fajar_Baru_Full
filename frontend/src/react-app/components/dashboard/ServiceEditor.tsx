import { useState, useEffect } from 'react';
import { 
  Save, X, FileText, Upload, Download, 
  AlertCircle, Clock, DollarSign, CheckCircle, Plus, Trash2
} from 'lucide-react';

interface ServiceTemplate {
  id?: number;
  name: string;
  file_url: string;
}

interface Service {
  id?: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: string;
  category: string;
  templates?: ServiceTemplate[];
}

interface ServiceEditorProps {
  service?: Service | null;
  onSave: (service: Service) => Promise<void>;
  onCancel: () => void;
}

const ServiceEditor = ({ service, onSave, onCancel }: ServiceEditorProps) => {
  const [formData, setFormData] = useState<Service>({
    name: '',
    description: '',
    requirements: [''],
    processing_time: '',
    fee: 0,
    status: 'active',
    category: 'administrasi',
    templates: []
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTemplate, setNewTemplate] = useState({ name: '', file_url: '' });

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        requirements: service.requirements.length > 0 ? service.requirements : [''],
        templates: service.templates || []
      });
    }
  }, [service]);

  const categories = [
    { value: 'administrasi', label: 'Administrasi Kependudukan', icon: '👥' },
    { value: 'ekonomi', label: 'Ekonomi & Usaha', icon: '💼' },
    { value: 'tanah', label: 'Pertanahan', icon: '🏡' },
    { value: 'sosial', label: 'Sosial & Kesejahteraan', icon: '🤝' },
    { value: 'perizinan', label: 'Perizinan', icon: '📋' },
    { value: 'lainnya', label: 'Lainnya', icon: '📄' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama layanan harus diisi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi harus diisi';
    }

    if (!formData.processing_time.trim()) {
      newErrors.processing_time = 'Waktu proses harus diisi';
    }

    if (formData.requirements.filter(r => r.trim()).length === 0) {
      newErrors.requirements = 'Minimal 1 persyaratan harus diisi';
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
      // Filter out empty requirements
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(r => r.trim()),
        fee: Number(formData.fee)
      };
      await onSave(cleanedData);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Gagal menyimpan layanan');
    } finally {
      setSaving(false);
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((r, i) => i === index ? value : r)
    }));
  };

  const addTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.file_url.trim()) {
      alert('Nama dan URL template harus diisi');
      return;
    }

    setFormData(prev => ({
      ...prev,
      templates: [
        ...(prev.templates || []),
        { ...newTemplate, id: Date.now() }
      ]
    }));

    setNewTemplate({ name: '', file_url: '' });
  };

  const removeTemplate = (id: number | undefined) => {
    setFormData(prev => ({
      ...prev,
      templates: (prev.templates || []).filter(t => t.id !== id)
    }));
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
                  {service ? 'Edit Layanan' : 'Tambah Layanan Baru'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.name || 'Layanan Administrasi'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Layanan'}</span>
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
                  Nama Layanan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: Surat Keterangan Domisili"
                  className={`w-full px-4 py-3 text-lg font-medium border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Deskripsi Layanan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan layanan ini secara detail..."
                  rows={4}
                  className={`w-full px-4 py-3 border ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Persyaratan <span className="text-red-500">*</span>
                </h3>
                <button
                  onClick={addRequirement}
                  className="flex items-center space-x-1 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Persyaratan</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder={`Persyaratan ${index + 1}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {formData.requirements.length > 1 && (
                      <button
                        onClick={() => removeRequirement(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.requirements}
                </p>
              )}
            </div>

            {/* Processing Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Proses</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Waktu Proses <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.processing_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, processing_time: e.target.value }))}
                    placeholder="Contoh: 3 hari kerja"
                    className={`w-full px-4 py-3 border ${
                      errors.processing_time ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.processing_time && (
                    <p className="text-red-500 text-sm mt-1">{errors.processing_time}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Biaya Layanan
                  </label>
                  <input
                    type="number"
                    value={formData.fee}
                    onChange={(e) => setFormData(prev => ({ ...prev, fee: Number(e.target.value) }))}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.fee === 0 ? 'Gratis' : `Rp ${formData.fee.toLocaleString('id-ID')}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Templates/Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Download className="w-5 h-5 inline mr-2" />
                Template & Berkas
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tambahkan template formulir atau berkas yang dapat diunduh oleh pengguna
              </p>

              {/* Current Templates */}
              {formData.templates && formData.templates.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{template.name}</p>
                          <p className="text-xs text-gray-500">{template.file_url}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTemplate(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Template */}
              <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nama template (contoh: Formulir Surat Keterangan)"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newTemplate.file_url}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, file_url: e.target.value }))}
                    placeholder="URL file template (https://...)"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addTemplate}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Template</span>
                </button>
                <p className="text-xs text-blue-700">
                  <Upload className="w-3 h-3 inline mr-1" />
                  Untuk produksi, upload file ke server/CDN terlebih dahulu
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kategori Layanan</h3>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label 
                    key={cat.value} 
                    className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.category === cat.value 
                        ? 'border-blue-500 bg-blue-50' 
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
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
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
              <h3 className="font-semibold text-gray-900 mb-4">Status Layanan</h3>
              
              <div className="space-y-2">
                <label className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.status === 'active'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Aktif (Ditampilkan)
                  </span>
                </label>

                <label className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.status === 'inactive'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <X className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Tidak Aktif
                  </span>
                </label>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                👁️ Preview Layanan
              </h3>
              
              <div className="bg-white rounded-lg p-4 border border-blue-200 space-y-3">
                <div className="flex items-center space-x-2">
                  {selectedCategory && (
                    <span className="text-2xl">{selectedCategory.icon}</span>
                  )}
                  <h4 className="font-semibold text-gray-900">
                    {formData.name || 'Nama Layanan'}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {formData.description || 'Deskripsi layanan'}
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2" />
                    {formData.processing_time || '-'}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {formData.fee === 0 ? 'Gratis' : `Rp ${formData.fee.toLocaleString('id-ID')}`}
                  </div>
                </div>
                {formData.templates && formData.templates.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Template tersedia:</p>
                    <p className="text-xs font-medium text-blue-600">
                      {formData.templates.length} berkas
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">
                💡 Tips
              </h3>
              <ul className="text-xs text-yellow-800 space-y-2">
                <li>• Gunakan nama yang jelas dan deskriptif</li>
                <li>• Cantumkan semua persyaratan yang diperlukan</li>
                <li>• Sediakan template untuk mempermudah pengguna</li>
                <li>• Update waktu proses secara berkala</li>
                <li>• Pastikan informasi biaya akurat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEditor;
