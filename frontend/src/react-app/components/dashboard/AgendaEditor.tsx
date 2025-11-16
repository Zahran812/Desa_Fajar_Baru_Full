import { useState, useEffect } from 'react';
import { 
  Save, X, Calendar, Clock, MapPin, Tag, 
  Users, FileText, AlertCircle
} from 'lucide-react';

interface AgendaItem {
  id?: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  created_at?: string;
}

interface AgendaEditorProps {
  agenda?: AgendaItem | null;
  onSave: (agenda: AgendaItem) => Promise<void>;
  onCancel: () => void;
}

const AgendaEditor = ({ agenda, onSave, onCancel }: AgendaEditorProps) => {
  const [formData, setFormData] = useState<AgendaItem>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'rapat',
    status: 'scheduled'
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (agenda) {
      setFormData(agenda);
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [agenda]);

  const categories = [
    { value: 'rapat', label: 'Rapat', color: 'bg-blue-100 text-blue-700', icon: '📋' },
    { value: 'kesehatan', label: 'Kesehatan', color: 'bg-red-100 text-red-700', icon: '🏥' },
    { value: 'sosial', label: 'Sosial', color: 'bg-green-100 text-green-700', icon: '🤝' },
    { value: 'pendidikan', label: 'Pendidikan', color: 'bg-purple-100 text-purple-700', icon: '📚' },
    { value: 'keagamaan', label: 'Keagamaan', color: 'bg-yellow-100 text-yellow-700', icon: '🕌' },
    { value: 'olahraga', label: 'Olahraga', color: 'bg-orange-100 text-orange-700', icon: '⚽' },
    { value: 'lainnya', label: 'Lainnya', color: 'bg-gray-100 text-gray-700', icon: '📌' }
  ];

  const statuses = [
    { value: 'scheduled', label: 'Terjadwal', color: 'bg-blue-100 text-blue-700' },
    { value: 'ongoing', label: 'Berlangsung', color: 'bg-green-100 text-green-700' },
    { value: 'completed', label: 'Selesai', color: 'bg-gray-100 text-gray-700' },
    { value: 'cancelled', label: 'Dibatalkan', color: 'bg-red-100 text-red-700' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul agenda harus diisi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi harus diisi';
    }

    if (!formData.date) {
      newErrors.date = 'Tanggal harus diisi';
    }

    if (!formData.time) {
      newErrors.time = 'Waktu harus diisi';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi harus diisi';
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
      console.error('Error saving agenda:', error);
      alert('Gagal menyimpan agenda');
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
                  {agenda ? 'Edit Agenda' : 'Tambah Agenda Baru'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.title || 'Agenda Kegiatan'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Agenda'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Judul Agenda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Contoh: Rapat Koordinasi RT/RW Bulanan"
                  className={`w-full px-4 py-3 text-lg font-medium border ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                  <FileText className="w-4 h-4 inline mr-2" />
                  Deskripsi Agenda <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan detail agenda kegiatan, tujuan, dan hal-hal penting lainnya..."
                  rows={6}
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
                <p className="text-xs text-gray-500 mt-2">
                  Jelaskan dengan detail agar masyarakat memahami agenda ini
                </p>
              </div>
            </div>

            {/* Date, Time & Location */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Waktu dan Tempat
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border ${
                      errors.date ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Waktu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className={`w-full px-4 py-3 border ${
                      errors.time ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Contoh: Balai Desa Fajar Baru"
                  className={`w-full px-4 py-3 border ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                👁️ Preview Agenda
              </h3>
              
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white">
                    <div className="text-lg font-bold">
                      {formData.date ? new Date(formData.date).getDate() : '--'}
                    </div>
                    <div className="text-[10px]">
                      {formData.date ? new Date(formData.date).toLocaleDateString('id-ID', { month: 'short' }) : '---'}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {formData.title || 'Judul Agenda'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.description || 'Deskripsi agenda'}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formData.time || '--:--'} WIB
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {formData.location || 'Lokasi'}
                      </span>
                      {selectedCategory && (
                        <span className={`px-2 py-1 rounded-full ${selectedCategory.color}`}>
                          {selectedCategory.icon} {selectedCategory.label}
                        </span>
                      )}
                    </div>
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
                Kategori Agenda
              </h3>
              
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
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Status Agenda
              </h3>
              
              <div className="space-y-2">
                {statuses.map((status) => (
                  <label 
                    key={status.value}
                    className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.status === status.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={formData.status === status.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm font-medium px-2 py-1 rounded ${status.color}`}>
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">
                📌 Informasi
              </h3>
              <ul className="text-xs text-yellow-800 space-y-2">
                <li>• Field dengan tanda <span className="text-red-500">*</span> wajib diisi</li>
                <li>• Agenda akan ditampilkan di halaman Informasi publik</li>
                <li>• Pilih kategori yang sesuai agar mudah ditemukan</li>
                <li>• Pastikan waktu dan lokasi jelas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaEditor;
