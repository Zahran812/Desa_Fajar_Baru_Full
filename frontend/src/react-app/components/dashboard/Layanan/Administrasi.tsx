import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SuratTidakMampuPreview from '../../letters/SuratTidakMampuPreview';
import {
  Edit3, Trash2, Plus, ChevronLeft, ChevronRight, FileText, MessageSquare, User, Calendar, Eye, Search,
  X, XCircle, Download, Clock, DollarSign, Send
} from 'lucide-react';

interface Service {
  id?: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: string;
  category_id: number;
  category?: Category;
  templates?: { id?: number; name: string; file_url: string; file_object?: File | null; }[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

interface RequestDocument {
  id: number;
  required_name?: string;
}

interface LetterInputData {
  [key: string]: string | undefined;
  nama?: string;
  nik?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: string;
  agama?: string;
  pekerjaan?: string;
  alamat?: string;
}

interface Request {
  id: number;
  user_id: number;
  service_id: number;
  request_type: string;
  subject: string;
  description: string;
  status: string;
  documents?: RequestDocument[];
  response?: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user?: {
    id: number;
    full_name: string;
  };
  service?: {
    id: number;
    name: string;
  };
  generated_html_content?: string | null;
  letter_input_data?: LetterInputData | null;
}

interface CitizenData {
  id?: number;
  no?: number;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  umur?: number;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan?: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  kelurahan?: string;
  kecamatan?: string;
  no_kk: string;
  nama_kepala_keluarga?: string;
  status_dalam_keluarga: string;
  pendidikan_terakhir: string;
  nama_ibu?: string;
  nama_ayah?: string;
  golongan_darah?: string;
  status_perkawinan_dalam_kk?: string;
  tanggal_perkawinan?: string;
  status_hubungan_dalam_keluarga?: string;
  kelainan_fisik_mental?: string;
  no_telepon?: string;
  no_paspor?: string;
  no_akta_lahir?: string;
  no_akta_kawin?: string;
  tanggal_akhir_paspor?: string;
  created_at?: string;
}

interface AdministrasiProps {
  setSelectedService: (service: Service | null) => void;
  setServiceEditorMode: (mode: 'list' | 'editor') => void;
  categories: Category[];
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  allRequests: Request[];
  servicesLoading: boolean;
  requestsLoading: boolean;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  apiFetch: (url: string, options?: RequestInit) => Promise<Response>;
  setAllRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  citizensData: CitizenData[];
}

const Administrasi: React.FC<AdministrasiProps> = ({
  setSelectedService,
  setServiceEditorMode,
  categories,
  services,
  setServices,
  allRequests,
  servicesLoading,
  requestsLoading,
  getStatusColor,
  getStatusLabel,
  apiFetch,
  setAllRequests,
  citizensData,
}) => {
  const [servicesPage, setServicesPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestSearchQuery, setRequestSearchQuery] = useState('');
  const [requestFilterService, setRequestFilterService] = useState('all');

  const [showServiceDetailModal, setShowServiceDetailModal] = useState(false);
  const [serviceDetailModalData, setServiceDetailModalData] = useState<Service | null>(null);

  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [requestDetailModalData, setRequestDetailModalData] = useState<Request | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [letterNumber, setLetterNumber] = useState('');
  const [letterData, setLetterData] = useState({
    nama: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    agama: '',
    pekerjaan: '',
    alamat: '',
  });
  const [templateHtml, setTemplateHtml] = useState<{ kop_html: string; body_html: string; template_id?: number } | null>(null);
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  const numberPlaceholderKeys = useMemo(() => ['nomor_surat', 'no_surat', 'nomor'], []);
  const isNumberPlaceholder = useCallback(
    (key: string) => numberPlaceholderKeys.some(k => key === k || key.includes(k)),
    [numberPlaceholderKeys]
  );

  const ITEMS_PER_PAGE_SERVICES = 6;
  const ITEMS_PER_PAGE_REQUESTS = 8;

  const totalPagesServices = Math.ceil(services.length / ITEMS_PER_PAGE_SERVICES);
  const currentServices = services.slice(
    (servicesPage - 1) * ITEMS_PER_PAGE_SERVICES,
    servicesPage * ITEMS_PER_PAGE_SERVICES
  );

  const filteredRequests = allRequests.filter(request =>
    (request.subject.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
     (request.user?.full_name && request.user.full_name.toLowerCase().includes(requestSearchQuery.toLowerCase()))) &&
    (requestFilterService === 'all' || request.service_id === Number(requestFilterService))
  );
  const totalPagesRequests = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE_REQUESTS);
  const paginatedRequests = filteredRequests.slice(
    (requestsPage - 1) * ITEMS_PER_PAGE_REQUESTS,
    requestsPage * ITEMS_PER_PAGE_REQUESTS
  );

  useEffect(() => {
    if (!requestDetailModalData) return;

    // Prioritaskan data surat yang tersimpan di backend jika ada
    if (requestDetailModalData.letter_input_data) {
      const d = requestDetailModalData.letter_input_data as LetterInputData;
      setLetterData({
        nama: d.nama || '',
        nik: d.nik || '',
        tempat_lahir: d.tempat_lahir || '',
        tanggal_lahir: d.tanggal_lahir || '',
        jenis_kelamin: d.jenis_kelamin || '',
        agama: d.agama || '',
        pekerjaan: d.pekerjaan || '',
        alamat: d.alamat || '',
      });
      const numberFromInput =
        d.nomor_surat || d.no_surat || d.nomor || '';
      if (numberFromInput) setLetterNumber(String(numberFromInput));
      setPlaceholderValues(prev => ({
        ...prev,
        ...Object.entries(d || {}).reduce<Record<string, string>>((acc, [k, v]) => {
          acc[k] = v ? String(v) : '';
          return acc;
        }, {}),
      }));
      return;
    }

    // Kalau belum ada letter_input_data, fallback ke data warga berdasarkan nama pemohon
    if (requestDetailModalData.user) {
      const citizen = citizensData.find(c => c.nama_lengkap === requestDetailModalData.user?.full_name);
      if (citizen) {
        setLetterData({
          nama: citizen.nama_lengkap || '',
          nik: citizen.nik || '',
          tempat_lahir: citizen.tempat_lahir || '',
          tanggal_lahir: citizen.tanggal_lahir || '',
          jenis_kelamin: citizen.jenis_kelamin || '',
          agama: citizen.agama || '',
          pekerjaan: citizen.pekerjaan || '',
          alamat: citizen.alamat || '',
        });
        setPlaceholderValues(prev => ({
          ...prev,
          nama: citizen.nama_lengkap || '',
          nik: citizen.nik || '',
          tempat_lahir: citizen.tempat_lahir || '',
          tanggal_lahir: citizen.tanggal_lahir || '',
          jenis_kelamin: citizen.jenis_kelamin || '',
          agama: citizen.agama || '',
          pekerjaan: citizen.pekerjaan || '',
          alamat: citizen.alamat || '',
        }));
      }
    }
  }, [requestDetailModalData, citizensData]);

  useEffect(() => {
    if (requestDetailModalData) {
      setResponseText(requestDetailModalData.response || '');
    }
  }, [requestDetailModalData]);


  const handleRequestClick = async (request: Request) => {
    setRequestDetailModalData(request);
    setShowRequestDetailModal(true);
    setResponseText('');

    if (request.status === 'pending') {
      try {
        const token = localStorage.getItem('auth_token');
        await apiFetch(`/requests/${request.id}/status`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        setAllRequests(prev => prev.map(req => req.id === request.id ? { ...req, status: 'in_progress' } : req));
        setRequestDetailModalData(prev => prev ? { ...prev, status: 'in_progress' } : null);
      } catch (error) { console.error('Error updating status:', error); }
    }
  };

  const placeholders = useMemo(() => {
    if (!templateHtml) return [] as string[];
    const combined = `${templateHtml.kop_html || ''} ${templateHtml.body_html || ''}`;
    const matches = combined.match(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g) || [];
    const keys = matches.map(m => m.replace('{{', '').replace('}}', '').trim());
    return Array.from(new Set(keys));
  }, [templateHtml]);

  const displayPlaceholders = useMemo(
    () => placeholders.filter(key => !isNumberPlaceholder(key)),
    [placeholders, isNumberPlaceholder]
  );

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!requestDetailModalData?.service_id) return;
      try {
        const token = localStorage.getItem('auth_token');
        const response = await apiFetch(`/letter-templates/service/${requestDetailModalData.service_id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        let tmpl: { kop_html?: string; body_html?: string; id?: number; service_id?: number } | null = null;
        if (Array.isArray(data) && data.length > 0) tmpl = data[0];
        else if (data && data.data && typeof data.data === 'object') tmpl = data.data;
        else if (data && data.service_id) tmpl = data;
        if (tmpl) {
          setTemplateHtml({
            kop_html: tmpl.kop_html || '',
            body_html: tmpl.body_html || '',
            template_id: tmpl.id,
          });
          // Prefill placeholder values with existing letterData / backend saved inputs
          setPlaceholderValues(prev => {
            const next = { ...prev };
            displayPlaceholders.forEach(key => {
              if (!(key in next)) {
                const fromLetter = (requestDetailModalData.letter_input_data || undefined)?.[key] ?? (letterData as Record<string, string>)[key];
                next[key] = fromLetter ? String(fromLetter) : '';
              }
            });
            return next;
          });
        } else {
          setTemplateHtml(null);
        }
      } catch (e) {
        console.error('Failed to fetch letter template for service', e);
        setTemplateHtml(null);
      }
    };

    // fetch hanya saat modal dibuka atau service berubah
    if (showRequestDetailModal) {
      fetchTemplate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestDetailModalData?.service_id, showRequestDetailModal]);

  const replacePlaceholders = (html: string) => {
    return html.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
      if (isNumberPlaceholder(key)) return letterNumber || '';
      return placeholderValues[key] ?? '';
    });
  };

  const hasNumberPlaceholder = useMemo(
    () => placeholders.some((p) => isNumberPlaceholder(p)),
    [placeholders, isNumberPlaceholder]
  );

  const handleGenerateLetter = async () => {
    if (hasNumberPlaceholder && !letterNumber.trim()) {
      alert('Mohon lengkapi Nomor Surat pada form Input Data Surat.');
      return;
    }
    if (placeholders.length === 0 && (!letterData.nama.trim() || !letterData.nik.trim())) {
      alert('Mohon lengkapi data surat.');
      return;
    }
    if (!confirm('Anda yakin data yang diinput sudah benar? Surat akan dibuat dan dikirim ke Kepala Desa untuk ditinjau.')) return;

    setSubmitting(true);
    try {
        const token = localStorage.getItem('auth_token');
        const response = await apiFetch(`/requests/${requestDetailModalData!.id}/generate`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                letter_data: placeholders.length ? placeholderValues : letterData,
                letter_number: letterNumber,
                template_id: templateHtml?.template_id,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            setAllRequests(prev => prev.map(req =>
                req.id === requestDetailModalData!.id
                    ? {
                        ...req,
                        status: 'kades_review',
                        generated_html_content: result.request.generated_html_content,
                        letter_input_data: placeholders.length ? placeholderValues : letterData,
                      }
                    : req
            ));
            setShowRequestDetailModal(false);
            alert('Surat berhasil dibuat dan dikirim untuk review Kepala Desa.');
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal membuat surat.');
        }
    } catch (error) {
        console.error('Error generating letter:', error);
        alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!responseText.trim()) {
      alert('Mohon isi catatan/alasan penolakan sebelum menolak pengajuan.');
      return;
    }
    if (!confirm('Apakah Anda yakin ingin menolak pengajuan ini?')) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await apiFetch(`/requests/${requestDetailModalData!.id}/reject`, {
        method: 'POST',
        body: JSON.stringify({ response: responseText.trim() }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setAllRequests(prev => prev.map(req =>
          req.id === requestDetailModalData!.id
            ? { ...req, status: 'rejected', response: responseText.trim() }
            : req
        ));
        setShowRequestDetailModal(false);
        alert('Pengajuan berhasil ditolak!');
      } else {
        alert('Gagal menolak pengajuan.');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Terjadi kesalahan saat menolak pengajuan.');
    } finally {
      setSubmitting(false);
    }
  };

  const normalizeAssetUrls = useCallback((html: string) => {
    const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
    const baseUrl = (import.meta.env.BASE_URL || '').replace(/\/$/, '');
    const toApi = (path: string) => `${apiBase}/${path.replace(/^\//, '')}`;
    const toBase = (path: string) => `${baseUrl}/${path.replace(/^\//, '')}`;
    return html
      // handle Blade-style {{ asset('path') }} (general, kecuali kop/)
      .replace(/{{\s*asset\(['"](?!kop\/)([^'"]+)['"]\)\s*}}/g, (_m, p1) => toApi(p1))
      // handle Blade-style asset('path') (general, kecuali kop/)
      .replace(/asset\(['"](?!kop\/)([^'"]+)['"]\)/g, (_m, p1) => toApi(p1))
      // kop assets → BASE_URL (frontend public)
      .replace(/asset\(['"]kop\/([^'"]+)['"]\)/g, (_m, p1) => toBase(`kop/${p1}`))
      .replace(/{{\s*asset\(['"]kop\/([^'"]+)['"]\)\s*}}/g, (_m, p1) => toBase(`kop/${p1}`))
      // handle relative src paths for kop/* via BASE_URL
      .replace(/src=["'](?!https?:\/\/)(\/?)(kop\/[^"']+)["']/g, (_m, _slash, path) => `src="${toBase(path)}"`)
      // handle relative src paths for Logo/* via BASE_URL (public assets)
      .replace(/src=["'](?!https?:\/\/)(\/?)(Logo\/[^"']+)["']/g, (_m, _slash, path) => `src="${toBase(path)}"`)
      // fallback: if masih tersisa {{ /kop/... }} bungkus, hilangkan braces
      .replace(/{{\s*\/?(kop\/[^}]+)\s*}}/g, (_m, p1) => toBase(p1));
  }, []);

  const renderLetterTemplate = () => {
    if (!requestDetailModalData) return null;
    if (templateHtml) {
      const kopSection = normalizeAssetUrls(replacePlaceholders(templateHtml.kop_html || ''));
      const bodySection = normalizeAssetUrls(replacePlaceholders(templateHtml.body_html || ''));
      const qrUrl = requestDetailModalData.status === 'approved'
        ? `${import.meta.env.BASE_URL}qr/QR.png`
        : null;
      const html = `
        <style>
          .letterhead { position: relative; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 3px solid #000; overflow: hidden; }
          .letterhead-logo { float: left; width: 90px; text-align: center; margin-top: 5px; }
          .letterhead-logo img { width: 80px; height: auto; }
          .letterhead-text { margin-left: 5px; text-align: center; padding-top: 0; }
          .letterhead-text .lh1, .letterhead-text .lh2, .letterhead-text .lh3, .letterhead-text .addr { margin: 0; padding: 0; line-height: 1.3; }
          .lh1 { font-size: 16pt; font-weight: bold; letter-spacing: 1px; }
          .lh2 { font-size: 16pt; font-weight: bold; letter-spacing: 1px; }
          .lh3 { font-size: 19pt; font-weight: bold; letter-spacing: 2px; margin-top: 3px; margin-bottom: 3px; }
          .addr { margin-left: 5px; font-size: 10pt; font-style: italic; letter-spacing: 0.8px; }
          .signature-section { margin-top: 30px; width: 100%; display: flex; justify-content: flex-end; }
          .signature { width: 50%; text-align: center; }
          .qr-code { margin: 10px auto 0; height: 100px; width: 100px; }
        </style>
        <div class="letterhead">${kopSection}</div>
        <div class="body-wrapper">${bodySection}</div>
        <div class="signature-section">
          <div class="signature">
            <p>Fajar Baru, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>Kepala Desa Fajar Baru</p>
            ${qrUrl ? `<div class="qr-code"><img src="${qrUrl}" alt="QR Code" style="width:100px;height:100px;" /></div>` : `<div style="height:100px;"></div>`}
            <p style="margin-top:10px; font-weight:bold; text-decoration: underline;">(M. Agus Budiantoro, S.HI)</p>
          </div>
        </div>
      `;
      return (
        <div
          className="bg-white shadow-md"
          style={{
            width: '210mm',
            minHeight: '297mm',
            padding: '20mm',
            boxSizing: 'border-box',
            fontFamily: 'Times New Roman, serif',
            fontSize: '11pt',
            lineHeight: 1.5,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // fallback to static preview
    const isInProgress = requestDetailModalData.status === 'in_progress';
    const isApproved = requestDetailModalData.status === 'approved';

    const effectiveLetterNumber = isInProgress
      ? letterNumber
      : `470/${requestDetailModalData.id}/${new Date(requestDetailModalData.created_at).getFullYear()}`;

    const qrFlag = isApproved ? 'approved' : null;

    return (
      <SuratTidakMampuPreview
        letterNumber={effectiveLetterNumber}
        letterData={letterData}
        requestDescription={requestDetailModalData.description}
        qrCode={qrFlag}
      />
    );
  };

  const renderRequestDetailModal = () => {
    if (!showRequestDetailModal || !requestDetailModalData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowRequestDetailModal(false)}>
        <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-[96vw] lg:max-w-[1400px] max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-5 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><FileText className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-2xl font-bold">{requestDetailModalData.subject}</h3>
                  <p className="text-emerald-100 text-sm">Detail Pengajuan Layanan</p>
                </div>
              </div>
              <button onClick={() => setShowRequestDetailModal(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Preview Surat</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  {renderLetterTemplate()}
                </div>
              </div>
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                   <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><User className="w-5 h-5 text-blue-600" />Informasi Pemohon</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-gray-600">Nama</p><p className="font-medium text-gray-900">{requestDetailModalData.user?.full_name || 'Unknown'}</p></div>
                      <div><p className="text-xs text-gray-600">Layanan</p><p className="font-medium text-gray-900">{requestDetailModalData.service?.name || requestDetailModalData.request_type}</p></div>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Keperluan:</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">{requestDetailModalData.description}</p>
                </div>
                {requestDetailModalData.documents && requestDetailModalData.documents.length > 0 && (
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Dokumen Persyaratan ({requestDetailModalData.documents.length}):</h4>
                    <div className="space-y-2">
                      {requestDetailModalData.documents.map((doc: RequestDocument, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                          <p className="font-medium text-gray-900 text-sm">{doc.required_name || 'Dokumen'}</p>
                          <button onClick={() => {
                              const token = localStorage.getItem('auth_token');
                              window.open(`${import.meta.env.VITE_API_BASE_URL}/requests/document/${doc.id}/download?token=${encodeURIComponent(token || '')}`, '_blank');
                            }} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"><Download className="w-4 h-4" />Unduh</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-white border-2 border-blue-200 p-4 rounded-lg space-y-4">
                    <h4 className="text-sm font-semibold text-blue-900">Input Data Surat</h4>
                    {hasNumberPlaceholder && (
                      <div>
                        <label className="text-xs font-semibold text-gray-600">Nomor Surat</label>
                        <input type="text" value={letterNumber} onChange={(e) => setLetterNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                      </div>
                    )}

                    {placeholders.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600">Isikan data untuk placeholder di template.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {displayPlaceholders.map((key) => (
                            <div key={key}>
                              <label className="text-xs font-semibold text-gray-600">{key}</label>
                              <input
                                type="text"
                                value={placeholderValues[key] || ''}
                                onChange={(e) => setPlaceholderValues(prev => ({ ...prev, [key]: e.target.value }))}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-600">Nama</label>
                            <input type="text" value={letterData.nama} onChange={(e) => setLetterData(d => ({ ...d, nama: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                           <div>
                            <label className="text-xs font-semibold text-gray-600">NIK</label>
                            <input type="text" value={letterData.nik} onChange={(e) => setLetterData(d => ({ ...d, nik: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                           <div>
                            <label className="text-xs font-semibold text-gray-600">Tempat Lahir</label>
                            <input type="text" value={letterData.tempat_lahir} onChange={(e) => setLetterData(d => ({ ...d, tempat_lahir: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                           <div>
                            <label className="text-xs font-semibold text-gray-600">Tanggal Lahir</label>
                            <input type="text" value={letterData.tanggal_lahir} onChange={(e) => setLetterData(d => ({ ...d, tanggal_lahir: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                           <div>
                            <label className="text-xs font-semibold text-gray-600">Jenis Kelamin</label>
                            <input type="text" value={letterData.jenis_kelamin} onChange={(e) => setLetterData(d => ({ ...d, jenis_kelamin: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                           <div>
                            <label className="text-xs font-semibold text-gray-600">Agama</label>
                            <input type="text" value={letterData.agama} onChange={(e) => setLetterData(d => ({ ...d, agama: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                           <div className="md:col-span-2">
                             <label className="text-xs font-semibold text-gray-600">Pekerjaan</label>
                             <input type="text" value={letterData.pekerjaan} onChange={(e) => setLetterData(d => ({ ...d, pekerjaan: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                           </div>
                          <div className="md:col-span-2">
                            <label className="text-xs font-semibold text-gray-600">Alamat</label>
                            <input type="text" value={letterData.alamat} onChange={(e) => setLetterData(d => ({ ...d, alamat: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                          </div>
                      </div>
                    )}
                </div>
                <div className={`bg-white border-2 ${['pending', 'diproses'].includes(requestDetailModalData.status) ? 'border-yellow-300' : 'border-gray-200'} p-4 rounded-lg`}>
                  <h4 className="text-sm font-semibold text-yellow-900 mb-2">Catatan *</h4>
                  <p className="text-xs text-yellow-700 mb-2">Wajib diisi untuk menolak atau memverifikasi pengajuan.</p>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Masukkan catatan..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 bg-gray-100 p-4 rounded-b-2xl border-t border-gray-200 flex justify-between items-center gap-3">
            <div>
              {requestDetailModalData.status === 'kades_review' && (
                  <button onClick={() => window.open(`${import.meta.env.VITE_API_BASE_URL}/requests/${requestDetailModalData.id}/preview`, '_blank')}
                      className="flex items-center gap-2 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye className="w-5 h-5" />
                      Preview di Tab Baru
                  </button>
              )}
            </div>
            <div className="flex gap-3">
                <button
                    onClick={handleReject}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50"
                >
                    <XCircle className="w-5 h-5" />
                    {submitting ? 'Memproses...' : 'Tolak Pengajuan'}
                </button>
                {requestDetailModalData.status === 'in_progress' && (
                    <button
                        onClick={handleGenerateLetter}
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50"
                    >
                        <Send className="w-5 h-5" />
                        {submitting ? 'Memproses...' : 'Generate & Kirim ke Kades'}
                    </button>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderServiceDetailModal = () => {
    if (!showServiceDetailModal || !serviceDetailModalData) return null;

    const category = categories.find(c => c.id === serviceDetailModalData.category_id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowServiceDetailModal(false)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{serviceDetailModalData.name}</h3>
                  <p className="text-blue-100 text-sm">Detail Layanan Administrasi</p>
                </div>
              </div>
              <button
                onClick={() => setShowServiceDetailModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(serviceDetailModalData.status)}`}>
                {getStatusLabel(serviceDetailModalData.status)}
              </span>
              {category && (
                <span className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-full font-medium">
                  {category.name}
                </span>
              )}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Deskripsi:</h4>
              <p className="text-gray-600">{serviceDetailModalData.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Persyaratan:</h4>
              <ul className="list-disc list-inside space-y-1">
                {serviceDetailModalData.requirements.map((req, idx) => (
                  <li key={idx} className="text-gray-600 text-sm">{req}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Waktu Proses</span>
                </div>
                <p className="text-gray-900 font-medium">{serviceDetailModalData.processing_time}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-gray-700">Biaya</span>
                </div>
                <p className="text-gray-900 font-medium">
                  {serviceDetailModalData.fee === 0 ? 'Gratis' : `Rp ${serviceDetailModalData.fee.toLocaleString('id-ID')}`}
                </p>
              </div>
            </div>
            {serviceDetailModalData.templates && serviceDetailModalData.templates.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Template Dokumen:</h4>
                <div className="space-y-2">
                  {serviceDetailModalData.templates.map((template) => (
                    <a
                      key={template.id}
                      href={template.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900 text-sm">{template.name}</span>
                      </div>
                      <Download className="w-4 h-4 text-blue-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200 flex gap-3">
            <button
              onClick={() => {
                setShowServiceDetailModal(false);
                setSelectedService(serviceDetailModalData);
                setServiceEditorMode('editor');
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Edit3 className="w-5 h-5" />
              Edit Layanan
            </button>
            <button
              onClick={async () => {
                if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;

                try {
                  const token = localStorage.getItem('auth_token');
                  const response = await apiFetch(`/services/${serviceDetailModalData.id}`, {
                    method: 'DELETE',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json',
                    },
                  });

                  if (response.ok) {
                    setServices(prev => prev.filter(s => s.id !== serviceDetailModalData.id));
                    setShowServiceDetailModal(false);
                    alert('Layanan berhasil dihapus!');
                  } else {
                    alert('Gagal menghapus layanan');
                  }
                } catch (error) {
                  console.error('Error deleting service:', error);
                  alert('Terjadi kesalahan saat menghapus layanan');
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              Hapus Layanan
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="space-y-6">
      {renderServiceDetailModal()}
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{services.length}</div>
          <div className="text-sm text-gray-700">Total Layanan</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="text-2xl font-bold text-emerald-600">{services.filter(s => s.status === 'active').length}</div>
          <div className="text-sm text-gray-700">Aktif</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
          <div className="text-2xl font-bold text-amber-600">{allRequests.length}</div>
          <div className="text-sm text-gray-700">Total Pengajuan</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{allRequests.filter(r => r.status === 'pending').length}</div>
          <div className="text-sm text-gray-700">Pending</div>
        </div>
      </div>
      {renderRequestDetailModal()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - Services List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Daftar Layanan</h3>
                    <p className="text-xs text-blue-100">{services.length} layanan tersedia</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setServiceEditorMode('editor');
                  }}
                  className="flex items-center space-x-1 px-3 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="p-4">
              <div className="bg-white rounded-xl p-4 max-h-[650px] overflow-y-auto">
                {servicesLoading ? (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-2 border-gray-200 rounded-lg p-3 animate-pulse">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="flex items-center gap-2">
                              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                              <div className="h-3 bg-gray-200 rounded w-20"></div>
                            </div>
                          </div>
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Belum ada layanan</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {currentServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => {
                              setServiceDetailModalData(service);
                              setShowServiceDetailModal(true);
                            }}
                            className="group border-2 border-gray-200 rounded-lg p-3 hover:shadow-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{service.name}</h4>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                                    {getStatusLabel(service.status)}
                                  </span>
                                  <span className="text-xs text-gray-500 font-medium">
                                    {service.fee === 0 ? 'Gratis' : `Rp ${service.fee.toLocaleString('id-ID')}`}
                                  </span>
                                </div>
                              </div>
                              <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                          </div>
                        ))}
                    </div>

                    {services.length > ITEMS_PER_PAGE_SERVICES && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setServicesPage(p => Math.max(1, p - 1))}
                          disabled={servicesPage === 1}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Prev
                        </button>
                        <span className="text-sm text-gray-600">
                          {servicesPage}/{totalPagesServices}
                        </span>
                        <button
                          onClick={() => setServicesPage(p => Math.min(totalPagesServices, p + 1))}
                          disabled={servicesPage >= totalPagesServices}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Requests List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Pengajuan Masuk</h3>
                    <p className="text-xs text-emerald-100">
                      {allRequests.length} total pengajuan • {allRequests.filter(r => r.status === 'pending').length} menunggu
                    </p>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-2">
                  <div className="relative flex-1 md:w-56">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari pengajuan..."
                      value={requestSearchQuery}
                      onChange={(e) => setRequestSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-300"
                    />
                  </div>
                  <select
                    value={requestFilterService}
                    onChange={(e) => setRequestFilterService(e.target.value)}
                    className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-300 font-medium"
                  >
                    <option value="all">Semua Layanan</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="p-4">
              <div className="bg-white rounded-xl p-4 max-h-[650px] overflow-y-auto">
                {requestsLoading ? (
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="border-2 border-gray-200 rounded-lg p-4 animate-pulse">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="flex items-center gap-3">
                              <div className="h-3 bg-gray-200 rounded w-20"></div>
                              <div className="h-3 bg-gray-200 rounded w-24"></div>
                              <div className="h-3 bg-gray-200 rounded w-20"></div>
                            </div>
                          </div>
                          <div className="w-5 h-5 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredRequests.length === 0 ? (
                      <div className="text-center py-16">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm font-medium">
                          {allRequests.length === 0 ? 'Belum ada pengajuan masuk' : 'Tidak ada pengajuan yang sesuai filter'}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3">
                          {paginatedRequests.map((request) => (
                            <div
                              key={request.id}
                              onClick={() => handleRequestClick(request)}
                              className="group border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">{request.subject}</h4>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                                      {getStatusLabel(request.status)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{request.description}</p>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="flex items-center gap-1 font-medium"><User className="w-3 h-3" />{request.user?.full_name || 'Unknown'}</span>
                                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{request.service?.name || request.request_type}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(request.created_at).toLocaleDateString('id-ID')}</span>
                                  </div>
                                </div>
                                <Eye className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {filteredRequests.length > ITEMS_PER_PAGE_REQUESTS && (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
                            <button
                              onClick={() => setRequestsPage(p => Math.max(1, p - 1))}
                              disabled={requestsPage === 1}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto justify-center"
                            >
                              <ChevronLeft className="w-4 h-4" /> Prev
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Halaman</span>
                              <select
                                value={requestsPage}
                                onChange={(e) => setRequestsPage(Number(e.target.value))}
                                className="px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                              >
                                {[...Array(totalPagesRequests)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                              </select>
                              <span className="text-sm text-gray-600">dari {totalPagesRequests}</span>
                            </div>
                            <button
                              onClick={() => setRequestsPage(p => Math.min(totalPagesRequests, p + 1))}
                              disabled={requestsPage >= totalPagesRequests}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto justify-center"
                            >
                              Next <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrasi;