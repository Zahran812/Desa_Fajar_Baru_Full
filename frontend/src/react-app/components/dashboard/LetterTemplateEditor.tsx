import { useState, useEffect, useRef } from 'react';
import {
  Upload, X, FileText, Download, Trash2, AlertCircle, Loader2, CheckCircle, Eye
} from 'lucide-react';
import { apiFetch } from '@/react-app/lib/api';

// Set PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  // Worker setup for PDF preview (optional, can be added later if needed)
}

interface LetterTemplate {
  id?: number;
  service_id: number;
  name: string;
  file_name: string;
  file_path?: string;
  mime_type?: string;
  file_size?: number;
  formatted_file_size?: string;
  status: string;
  description?: string;
  created_at?: string;
}

interface LetterTemplateEditorProps {
  serviceId: number;
  onClose: () => void;
}

const LetterTemplateEditor = ({ serviceId, onClose }: LetterTemplateEditorProps) => {
  const [templates, setTemplates] = useState<LetterTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null as File | null,
  });

  // Preview state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch templates
  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Otentikasi gagal: Token tidak ditemukan.');
        setLoading(false);
        return;
      }

      const response = await apiFetch(`/letter-templates/service/${serviceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates(Array.isArray(data) ? data : []);
      } else {
        setError('Gagal memuat template surat');
      }
    } catch (err) {
      console.error('Error fetching templates:', err);
      setError('Terjadi kesalahan saat memuat template');
    } finally {
      setLoading(false);
    }
  };

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setPreviewUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/vnd.oasis.opendocument.text'];
      if (!allowedTypes.includes(file.type)) {
        setError('Tipe file tidak didukung. Gunakan Word (.doc, .docx), PDF, atau ODT');
        return;
      }

      // Validasi ukuran (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Ukuran file terlalu besar. Maksimal 10MB');
        return;
      }

      setFormData(prev => ({ ...prev, file }));
      generatePreview(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!formData.name.trim()) {
      setError('Nama template harus diisi');
      return;
    }

    if (!formData.file) {
      setError('Pilih file terlebih dahulu');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('service_id', serviceId.toString());
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('file', formData.file);

      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Otentikasi gagal: Token tidak ditemukan.');
        setUploading(false);
        return;
      }

      const response = await apiFetch('/letter-templates', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      if (response.ok) {
        const newTemplate = await response.json();
        setTemplates(prev => [...prev, newTemplate.data]);
        setSuccess('Template surat berhasil diupload');
        setFormData({ name: '', description: '', file: null });
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => setSuccess(null), 3000);
      } else {
        // Try to parse error response as JSON
        let errorMessage = 'Gagal mengupload template';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        setError(errorMessage);
        console.error('Upload error response:', response.status, response.statusText);
      }
    } catch (err) {
      console.error('Error uploading template:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengupload template');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (templateId: number | undefined) => {
    if (!templateId) return;

    if (!confirm('Apakah Anda yakin ingin menghapus template ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Otentikasi gagal: Token tidak ditemukan.');
        return;
      }
      const response = await apiFetch(`/letter-templates/${templateId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      if (response.ok) {
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        setSuccess('Template surat berhasil dihapus');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Gagal menghapus template');
      }
    } catch (err) {
      console.error('Error deleting template:', err);
      setError('Terjadi kesalahan saat menghapus template');
    }
  };

  const handleDownload = async (templateId: number | undefined) => {
    if (!templateId) return;

    try {
      const token = localStorage.getItem('auth_token');
      const url = `${import.meta.env.VITE_API_BASE_URL}/letter-templates/${templateId}/download?token=${token}`;
      window.open(url, '_blank');
      
    } catch (err) {
      console.error('Error downloading template:', err);
      setError('Terjadi kesalahan saat mengunduh template');
    }
  };

  const handlePreview = async (template: LetterTemplate) => {
    if (!template.id) return;
  
    setPreviewTitle(`Preview: ${template.name}`);
    setShowPreviewModal(true);
    setIsPreviewLoading(true);
    setPreviewContent(null);
    setError(null);
  
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Token otentikasi tidak ditemukan');
      }
  
      // Use preview-pdf endpoint which converts Word to PDF
      const response = await apiFetch(`/letter-templates/${template.id}/preview-pdf`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
  
      if (!response.ok) {
        let errorMessage = `Gagal membuat preview: ${response.statusText}`;
        try {
          const errorData = await response.json();
          // Use the detailed error message from the backend
          errorMessage = errorData.message || errorMessage;
          if (errorData.checked_path) {
            errorMessage += ` Path: ${errorData.checked_path}`;
          }
        } catch (e) {
          // Ignore if response is not JSON
        }
        throw new Error(errorMessage);
      }
  
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      setPreviewContent(fileUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat preview.';
      setError(errorMessage);
      setPreviewContent(`error:${errorMessage}`);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleToggleStatus = async (templateId: number | undefined) => {
    if (!templateId) return;

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Otentikasi gagal: Token tidak ditemukan.');
        return;
      }
      const response = await apiFetch(`/letter-templates/${templateId}/toggle-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      if (response.ok) {
        const updatedTemplate = await response.json();
        setTemplates(prev =>
          prev.map(t => t.id === templateId ? updatedTemplate.data : t)
        );
        setSuccess('Status template berhasil diubah');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Gagal mengubah status template');
      }
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Terjadi kesalahan saat mengubah status template');
    }
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Template Surat</h2>
              <p className="text-sm text-blue-100">Kelola template surat untuk layanan ini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Alert Messages */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {/* Upload Form */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Upload Template Surat Baru</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Template <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Contoh: Template Surat Keterangan Domisili"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi (Opsional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsi template (opsional)"
                rows={2}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih File <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".doc,.docx,.pdf,.odt"
                  className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Format: Word (.doc, .docx), PDF, atau ODT. Maksimal 10MB
              </p>
              {formData.file && (
                <div className="mt-2 p-3 bg-white border border-blue-200 rounded-lg flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{formData.file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(formData.file.size)}</p>
                  </div>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Preview Section */}
              {previewUrl && showPreview && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">Preview Template</h4>
                    <button
                      type="button"
                      onClick={() => setShowPreview(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {formData.file?.type === 'application/pdf' ? (
                      <iframe
                        src={previewUrl}
                        className="w-full h-96 border-0"
                        title="PDF Preview"
                      />
                    ) : (
                      <div className="h-96 flex items-center justify-center bg-gray-100 p-4">
                        <div className="text-center">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Preview untuk file Word/ODT tidak tersedia di browser
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            File akan ditampilkan setelah diupload
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading || !formData.name || !formData.file}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengupload...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Template
                </>
              )}
            </button>
          </div>

          {/* Templates List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Daftar Template ({templates.length})
            </h3>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : templates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Belum ada template surat</p>
              </div>
            ) : (
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{template.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">{template.file_name}</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-500">{formatFileSize(template.file_size)}</p>
                          {template.description && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <p className="text-xs text-gray-500 truncate">{template.description}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handlePreview(template)}
                        className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(template.id)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                          template.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title={template.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                      >
                        {template.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </button>

                      <button
                        onClick={() => handleDownload(template.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
    
    {/* Preview Modal */}
    {showPreviewModal && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4"
        onClick={() => setShowPreviewModal(false)}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex-shrink-0 p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{previewTitle}</h3>
            <button
              onClick={() => setShowPreviewModal(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-grow overflow-auto bg-gray-50">
            {isPreviewLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : previewContent?.startsWith('error:') ? (
              <div className="flex items-center justify-center h-full p-4">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-red-600 font-medium">{previewContent.replace('error:', '')}</p>
                </div>
              </div>
            ) : previewContent?.startsWith('html:') ? (
              <div className="flex justify-center py-8" style={{ backgroundColor: '#f3f4f6' }}>
                <div 
                  className="bg-white shadow-lg"
                  style={{
                    width: '210mm',
                    height: '297mm',
                    padding: '20mm',
                    boxSizing: 'border-box',
                    fontFamily: 'Calibri, Arial, sans-serif',
                    fontSize: '11pt',
                    lineHeight: '1.5',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: previewContent.replace('html:', '') }} />
                </div>
              </div>
            ) : previewContent ? (
              <iframe
                src={previewContent}
                className="w-full h-full border-0"
                title="PDF Preview"
              />
            ) : null}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default LetterTemplateEditor;
