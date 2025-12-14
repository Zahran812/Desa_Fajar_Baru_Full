import { useState, useEffect, useRef } from 'react';
import {
  Save, X, FileText, Download,
  AlertCircle, Clock, DollarSign, CheckCircle, Plus, Trash2, Link, ChevronDown,
  Briefcase, Users, Home, School, Baby, FileCheck, ClipboardList, Building2, Stamp, LucideIcon, Pencil
} from 'lucide-react';
import { apiGet, apiPost, apiPut, apiDelete } from '@/react-app/lib/api';
import LetterTemplateEditor from './LetterTemplateEditor';

// Icon mapping untuk kategori surat desa
const CATEGORY_ICONS: Record<string, { icon: LucideIcon; label: string }> = {
  FileText: { icon: FileText, label: 'Dokumen Umum' },
  Briefcase: { icon: Briefcase, label: 'Usaha' },
  Users: { icon: Users, label: 'Kependudukan' },
  Home: { icon: Home, label: 'Domisili' },
  School: { icon: School, label: 'Pendidikan' },
  Baby: { icon: Baby, label: 'Kelahiran' },
  FileCheck: { icon: FileCheck, label: 'Keterangan' },
  ClipboardList: { icon: ClipboardList, label: 'Pernyataan' },
  Building2: { icon: Building2, label: 'Bangunan' },
  Stamp: { icon: Stamp, label: 'Legalisir' },
};

// Helper function untuk render icon dari string
export const getCategoryIcon = (iconName?: string) => {
  if (!iconName || !CATEGORY_ICONS[iconName]) {
    return FileText; // Default icon
  }
  return CATEGORY_ICONS[iconName].icon;
};

interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string; // Add icon property to category if needed
}

interface ServiceTemplate {
  id?: number;
  name: string;
  file_url: string; // URL publik dari server
  file_object?: File | null; // File baru yang diupload
  is_new?: boolean;
}

interface Service {
  id?: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: string;
  category_id: number; // Use category_id for relation
  category?: Category; // Optional, for displaying purposes
  templates?: ServiceTemplate[];
}

interface ServiceEditorProps {
  service?: Service | null;
  onSave: (serviceData: Service, templateFiles: Record<string, File>) => Promise<void>;
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
    category_id: 0, // Will be set after fetching categories
    templates: []
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State for Category Management
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isManageCategoryOpen, setIsManageCategoryOpen] = useState(false);
  
  // State untuk template yang akan ditambahkan, menyimpan nama dan File object
  const [newTemplate, setNewTemplate] = useState<{ name: string; file: File | null }>({ name: '', file: null });

  // State untuk Letter Template Editor kini tidak menggunakan modal; editor ditanam langsung di halaman

  // Ref untuk file input agar bisa di-reset
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('auth_token');
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  };

  const refetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await apiGet('/categories', { headers: getAuthHeaders() });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch categories. Server responded with:", errorText);
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('Fetched categories:', data);
      setCategories(data);
      // Set default category_id on initial load (when it's 0)
      setFormData(prev => {
        if (data.length > 0 && prev.category_id === 0) {
          console.log('Setting default category_id to:', data[0].id);
          return { ...prev, category_id: data[0].id };
        }
        return prev;
      });
    } catch (error) {
      console.error('Error refetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    refetchCategories();
  }, []); // Initial fetch

  useEffect(() => {
    if (service) {
      console.log('ServiceEditor received service:', service);
      console.log('Service category_id:', service.category_id);
      setFormData({
        ...service,
        requirements: service.requirements.length > 0 ? service.requirements : [''],
        templates: service.templates || []
      });
    } else {
      console.log('ServiceEditor in CREATE mode (no service prop)');
    }
    // Cleanup Object URLs saat component unmount atau service berubah
    return () => {
        if (service && service.templates) {
            service.templates.forEach(t => {
                if (t.file_object && t.file_url.startsWith('blob:')) {
                    URL.revokeObjectURL(t.file_url);
                }
            });
        }
    }
  }, [service]);

  // Category CRUD Handlers
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
        alert('Nama kategori tidak boleh kosong.');
        return;
    }
    try {
        const response = await apiPost('/categories', {
            name: newCategoryName,
            description: newCategoryDescription,
            icon: newCategoryIcon
        }, { headers: getAuthHeaders() });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Status:', response.status);
            console.error('Response:', errorText);
            try {
                const errorData = JSON.parse(errorText);
                throw new Error(errorData.message || 'Gagal menambahkan kategori');
            } catch {
                throw new Error(`Server error (${response.status}): ${errorText.substring(0, 200)}`);
            }
        }
        const newCategory = await response.json();
        alert(`Kategori "${newCategory.name}" berhasil ditambahkan!`);
        setNewCategoryName('');
        setNewCategoryDescription('');
        setNewCategoryIcon('');
        refetchCategories();
    } catch (error: any) {
        alert(error.message);
        console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
        alert('Nama kategori tidak boleh kosong.');
        return;
    }
    try {
        const response = await apiPut(`/categories/${editingCategory.id}`, {
            name: editingCategory.name,
            description: editingCategory.description,
            icon: editingCategory.icon
        }, { headers: getAuthHeaders() });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Status:', response.status);
            console.error('Response:', errorText);
            try {
                const errorData = JSON.parse(errorText);
                throw new Error(errorData.message || 'Gagal mengupdate kategori');
            } catch {
                throw new Error(`Server error (${response.status}): ${errorText.substring(0, 200)}`);
            }
        }
        const updatedCategory = await response.json();
        alert(`Kategori "${updatedCategory.name}" berhasil diupdate!`);
        setEditingCategory(null);
        refetchCategories();
    } catch (error: any) {
        alert(error.message);
        console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini? Layanan yang menggunakan kategori ini mungkin akan terpengaruh.')) {
        return;
    }
    try {
        const response = await apiDelete(`/categories/${id}`, { headers: getAuthHeaders() });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal menghapus kategori');
        }
        alert('Kategori berhasil dihapus!');
        refetchCategories();
    } catch (error: any) {
        alert(error.message);
        console.error('Error deleting category:', error);
    }
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewTemplate(prev => ({ ...prev, file }));
  };

  const addTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.file) {
      alert('Nama template dan file harus diisi');
      return;
    }

    // Gunakan URL.createObjectURL untuk pratinjau di frontend sebelum upload
    const objectUrl = URL.createObjectURL(newTemplate.file);
    
    setFormData(prev => ({
      ...prev,
      templates: [
        ...(prev.templates || []),
        { 
            name: newTemplate.name, 
            file_url: objectUrl, // Sementara pakai Object URL
            file_object: newTemplate.file, // Simpan objek File untuk dikirim ke backend
            is_new: true, // Tandai ini sebagai template baru yang perlu diupload
            id: Date.now() // ID sementara untuk key di list
        }
      ]
    }));

    // Reset form penambahan template
    setNewTemplate({ name: '', file: null });
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset input file
    }
  };

  const removeTemplate = (id: number | undefined) => {
    setFormData(prev => ({
      ...prev,
      templates: (prev.templates || []).filter(t => t.id !== id)
    }));
    
    // Opsional: Hapus Object URL jika itu adalah file yang baru diupload
    const templateToRemove = formData.templates?.find(t => t.id === id);
    if (templateToRemove && templateToRemove.file_url.startsWith('blob:')) {
        URL.revokeObjectURL(templateToRemove.file_url);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    setSaving(true);

    // 1. Filter persyaratan yang kosong dan buat data utama
    const cleanedData = {
      ...formData,
      requirements: formData.requirements.filter(r => r.trim()),
      fee: Number(formData.fee)
    };

    console.log('=== ServiceEditor handleSave ===');
    console.log('FormData:', formData);
    console.log('CleanedData:', cleanedData);
    console.log('category_id:', cleanedData.category_id);

    // 2. Siapkan data template untuk dikirim ke Controller
    const templatesDataToBackend: Omit<ServiceTemplate, 'file_object'>[] = [];
    const templateFilesToSend: Record<string, File> = {};
    let fileIndex = 0;
    
    // Pisahkan data template (name + id/file_url lama) dan file baru
    formData.templates?.forEach((template) => {
        // Jika ada file_object, berarti ini adalah file baru yang harus diupload
        if (template.file_object) {
            // Data untuk templates_data: hanya nama (dan ID sementara yang tidak perlu di backend)
            templatesDataToBackend.push({ 
                id: template.id, 
                name: template.name, 
                file_url: template.file_url 
            }); 
            
            // File object dikumpulkan di object terpisah dengan key unik
            // Key format: 'template_file_0', 'template_file_1', dst.
            templateFilesToSend[`template_file_${fileIndex}`] = template.file_object;
            fileIndex++;

        } else if (template.id && template.file_url) {
            // Template lama yang tidak ada perubahan file, hanya kirim ID dan nama
            templatesDataToBackend.push({ 
                id: template.id, 
                name: template.name, 
                file_url: template.file_url // Kirim URL lama
            });
        }
    });

    try {
        await onSave(cleanedData, templateFilesToSend);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Gagal menyimpan layanan');
    } finally {
      setSaving(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.category_id);

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
            {/* Basic Information (Tetap sama) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informasi Dasar</h3>
              
              {/* Input Nama Layanan */}
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

              {/* Input Deskripsi Layanan */}
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

            {/* Requirements (Tetap sama) */}
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

            {/* Processing Details (Tetap sama) */}
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

            {/* Templates/Documents (REVISI) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Download className="w-5 h-5 inline mr-2" />
                Template & Berkas
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload template formulir atau berkas yang dapat diunduh oleh pengguna.
              </p>

              {/* Current Templates */}
              {formData.templates && formData.templates.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {template.name}
                            {template.file_object && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
                                    {service ? 'Baru' : 'Siap Upload'}
                                </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            {template.file_object ? (
                                <>
                                    <FileText className="w-3 h-3 mr-1 text-gray-500" />
                                    {template.file_object.name} ({Math.round(template.file_object.size / 1024)} KB)
                                </>
                            ) : (
                                <>
                                    <Link className="w-3 h-3 mr-1 text-gray-500" />
                                    {template.file_url.split('/').pop()}
                                </>
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTemplate(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Template Form (REVISI) */}
              <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <label className="block text-xs font-semibold text-blue-800 mb-1">
                    Nama Template
                  </label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nama template (contoh: Formulir Surat Keterangan)"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-blue-800 mb-1">
                        Pilih File (.pdf, .doc, .zip dll.)
                    </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                </div>
                <button
                  onClick={addTemplate}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Template ke Daftar</span>
                </button>
                {newTemplate.file && (
                    <p className="text-xs text-blue-700">
                        File terpilih: **{newTemplate.file.name}**
                    </p>
                )}
              </div>
            </div>

            {/* Letter Templates Section - hanya tampilkan editor inline */}
            {service && service.id && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <LetterTemplateEditor serviceId={service.id} />
              </div>
            )}
          </div>

          {/* Sidebar (Tetap sama) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kategori Layanan</h3>

              {loadingCategories ? (
                <p>Memuat kategori...</p>
              ) : (
                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.category_id === cat.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="category_id"
                          value={cat.id}
                          checked={formData.category_id === cat.id}
                          onChange={(e) => setFormData(prev => ({ ...prev, category_id: Number(e.target.value) }))}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        {cat.icon && (() => {
                          const IconComponent = getCategoryIcon(cat.icon);
                          return <IconComponent className="w-5 h-5 text-blue-600" />;
                        })()}
                        <span className="text-sm font-medium text-gray-700">
                          {cat.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Category Management Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => setIsManageCategoryOpen(!isManageCategoryOpen)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">Kelola Kategori</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                      isManageCategoryOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isManageCategoryOpen && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    {/* Add/Edit Category Form */}
                    <div className="space-y-3 mb-4 mt-4">
                    <input 
                        type="text" 
                        placeholder="Nama Kategori Baru" 
                        value={editingCategory?.name || newCategoryName}
                        onChange={(e) => editingCategory ? setEditingCategory(prev => prev ? {...prev, name: e.target.value} : null) : setNewCategoryName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea 
                        placeholder="Deskripsi Kategori (opsional)"
                        value={editingCategory?.description || newCategoryDescription}
                        onChange={(e) => editingCategory ? setEditingCategory(prev => prev ? {...prev, description: e.target.value} : null) : setNewCategoryDescription(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                    />
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pilih Ikon
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(CATEGORY_ICONS).map(([iconKey, { icon: IconComponent, label }]) => {
                          const isSelected = (editingCategory?.icon || newCategoryIcon) === iconKey;
                          return (
                            <button
                              key={iconKey}
                              type="button"
                              onClick={() => {
                                if (editingCategory) {
                                  setEditingCategory(prev => prev ? {...prev, icon: iconKey} : null);
                                } else {
                                  setNewCategoryIcon(iconKey);
                                }
                              }}
                              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                              title={label}
                            >
                              <IconComponent className={`w-5 h-5 mx-auto ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            {editingCategory ? 'Update Kategori' : 'Tambah Kategori'}
                        </button>
                        {editingCategory && (
                            <button 
                                onClick={() => setEditingCategory(null)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Batal
                            </button>
                        )}
                    </div>
                </div>

                    {/* List of Categories */}
                    <ul className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
                        {categories.filter(cat => cat.id !== 0).map(cat => (
                            <li key={cat.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200">
                                <div className="flex items-center space-x-2">
                                    {cat.icon && (() => {
                                      const IconComponent = getCategoryIcon(cat.icon);
                                      return <IconComponent className="w-4 h-4 text-gray-600" />;
                                    })()}
                                    <span className="text-sm font-medium">{cat.name}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setEditingCategory(cat)}
                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-md"
                                        title="Edit Kategori"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="p-1 text-red-600 hover:bg-red-100 rounded-md"
                                        title="Hapus Kategori"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Status (Tetap sama) */}
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

            {/* Preview Card (Tetap sama) */}
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

            {/* Tips (Tetap sama) */}
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

      {/* Letter Template Editor kini ditampilkan inline di atas; tidak lagi menggunakan modal */}
    </div>
  );
};

export default ServiceEditor;