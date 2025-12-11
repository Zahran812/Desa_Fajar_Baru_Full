import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/contexts/AuthContext';
import DashboardLayout from '@/react-app/components/DashboardLayout';
import SuratTidakMampuPreview from '@/react-app/components/letters/SuratTidakMampuPreview';
import {
  Home, FileText, CheckCircle, XCircle, Loader2,
  FileSignature, FileCheck, FileX, FileClock,
  Eye, BarChart2, Archive, X, User
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentItem {
  id: number;
  required_name: string;
  original_name: string;
}

interface LetterInputData {
    nama: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    agama: string;
    pekerjaan: string;
    alamat: string;
}

interface Request {
  id: number;
  user_id: number;
  service_id: number;
  request_type: string;
  subject: string;
  description: string;
  status: string;
  documents?: DocumentItem[];
  response?: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    full_name: string;
    nik?: string;
    address?: string;
  };
  service?: {
    id: number;
    name: string;
  };
  generated_html_content?: string | null;
  letter_input_data?: LetterInputData;
}

const KadesDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 0,
    inProcessRequests: 0,
  });
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [detailedRequest, setDetailedRequest] = useState<Request | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [submittingAction, setSubmittingAction] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);


  useEffect(() => {
    if (!authLoading && user?.role !== 'kades') {
      window.location.href = '/';
    }
  }, [user, authLoading]);

  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await apiFetch('/requests/all', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data pengajuan');
      }

      const data = await response.json();
      const items = Array.isArray(data.requests) ? data.requests : [];
      
      const sortedRequests = items.sort((a: Request, b: Request) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setAllRequests(sortedRequests);

      setStats({
        totalRequests: sortedRequests.length,
        pendingRequests: sortedRequests.filter((r: Request) => r.status === 'kades_review').length,
        approvedRequests: sortedRequests.filter((r: Request) => r.status === 'approved').length,
        rejectedRequests: sortedRequests.filter((r: Request) => r.status === 'rejected').length,
        completedRequests: sortedRequests.filter((r: Request) => r.status === 'completed').length,
        inProcessRequests: sortedRequests.filter((r: Request) => r.status === 'in_progress').length,
      });

    } catch (error) {
      console.error('Error fetching requests:', error);
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'kades') {
      fetchAllRequests();
    }
  }, [user]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'requests', label: 'Review Pengajuan', icon: FileText, badge: stats.pendingRequests },
  ];


  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-cyan-100 text-cyan-800';
      case 'kades_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'Diproses Operator';
      case 'kades_review': return 'Menunggu TTD Kades';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <FileClock className="w-4 h-4" />;
      case 'kades_review': return <FileSignature className="w-4 h-4" />;
      case 'approved': return <FileCheck className="w-4 h-4" />;
      case 'rejected': return <FileX className="w-4 h-4" />;
      case 'completed': return <Archive className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const fetchRequestDetail = useCallback(async (requestId: number) => {
    const token = localStorage.getItem('auth_token');
    const response = await apiFetch(`/requests/${requestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Gagal mengambil detail pengajuan');
    }
    const data = await response.json();
    setDetailedRequest(data);
    if (data.status === 'approved') {
      setQrCode('approved');
    } else {
      setQrCode(null);
    }
  }, []);

  const handleViewRequest = async (request: Request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
    setLoadingModal(true);
    setQrCode(null);
    try {
      await fetchRequestDetail(request.id);
    } catch (error) {
      console.error('Error fetching request details:', error);
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
      setShowRequestModal(false);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleSign = async () => {
    if (!selectedRequest) return;
    if (!confirm('Apakah Anda yakin ingin menyetujui dan menandatangani surat ini?')) return;
    
    setSubmittingAction(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await apiFetch(`/requests/${selectedRequest.id}/sign`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'No JSON response' }));
        console.error('Backend Error Response:', response.status, errorData);
        throw new Error(`Gagal menandatangani surat: ${errorData.message || response.statusText}`);
      }
      
      await response.json();
      await fetchRequestDetail(selectedRequest.id); // refresh detail & qr
      alert('Surat berhasil disetujui dan ditandatangani. Silakan tutup modal ini.');
      await fetchAllRequests(); // Refresh list in the background
      // Don't close modal, let Kades see the signed letter with QR
    } catch (error) {
      console.error('Error signing request:', error);
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan.');
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      alert('Mohon isi alasan penolakan.');
      return;
    }
    if (!confirm('Apakah Anda yakin ingin menolak pengajuan ini?')) return;

    setSubmittingAction(true);
    try {
      const token = localStorage.getItem('auth_token');
      await apiFetch(`/requests/${selectedRequest.id}/reject`, {
        method: 'POST',
        body: JSON.stringify({ response: rejectionReason.trim() }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      await fetchAllRequests();
      setShowRequestModal(false);
      alert('Pengajuan berhasil ditolak.');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Gagal menolak pengajuan.');
    } finally {
      setSubmittingAction(false);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Kepala Desa</h1>
        <p className="text-gray-600">Selamat datang kembali, {user?.full_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Menunggu Persetujuan', value: stats.pendingRequests, icon: FileSignature, color: 'yellow' },
          { title: 'Total Pengajuan', value: stats.totalRequests, icon: BarChart2, color: 'blue' },
          { title: 'Pengajuan Disetujui', value: stats.approvedRequests, icon: FileCheck, color: 'emerald' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={`bg-white rounded-xl p-6 border-l-4 border-${item.color}-500 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${item.color}-50 rounded-full flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pengajuan Menunggu Persetujuan</h3>
        </div>
        
        <div className="p-6">
          {loading ? <p>Memuat...</p> : <RequestTable requests={allRequests.filter(r => r.status === 'kades_review')} onView={handleViewRequest} />}
        </div>
      </div>
    </div>
  );

  const renderRequestsList = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Daftar Semua Pengajuan</h2>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        {loading ? <p>Memuat...</p> : <RequestTable requests={allRequests} onView={handleViewRequest} />}
      </div>
    </div>
  );

  const RequestTable = ({ requests, onView }: { requests: Request[], onView: (req: Request) => void }) => (
    <div className="overflow-x-auto">
      {requests.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada pengajuan</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-sm font-medium text-gray-500 pb-3">Subjek</th>
              <th className="text-sm font-medium text-gray-500 pb-3">Pemohon</th>
              <th className="text-sm font-medium text-gray-500 pb-3">Tanggal</th>
              <th className="text-sm font-medium text-gray-500 pb-3">Status</th>
              <th className="text-sm font-medium text-gray-500 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-4">
                  <div>
                    <p className="font-medium text-gray-900">{request.subject}</p>
                    <p className="text-sm text-gray-500">{request.request_type}</p>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-600">{request.user?.full_name || 'N/A'}</td>
                <td className="py-4 text-sm text-gray-600">{new Date(request.created_at).toLocaleDateString('id-ID')}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {getStatusLabel(request.status)}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button onClick={() => onView(request)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'requests': return renderRequestsList();
      default: return renderDashboard();
    }
  };

  const renderRequestDetailModal = () => {
    if (!showRequestModal || !selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowRequestModal(false)}>
        <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-[96vw] xl:max-w-[1400px] 2xl:max-w-[1600px] max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-5 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><FileSignature className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-2xl font-bold">Review dan Tanda Tangan</h3>
                    <p className="text-yellow-100 text-sm">Pengajuan: {selectedRequest.subject}</p>
                  </div>
                </div>
                <button onClick={() => setShowRequestModal(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6">
            {loadingModal ? (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
                </div>
            ) : !detailedRequest ? (
                <div className="text-center p-8 text-gray-600">Gagal memuat detail pengajuan.</div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
                    {/* Left Column: Preview */}
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Preview Surat</h3>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          {detailedRequest.generated_html_content ? (
                            <div
                              className="bg-white shadow-md"
                              style={{
                                width: '210mm',
                                minHeight: '297mm',
                                padding: '10mm',
                                boxSizing: 'border-box',
                                fontFamily: 'Times New Roman, serif',
                                fontSize: '11pt',
                                lineHeight: 1.5,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: `
                                  <style>
                                    .kop-wrapper { margin-bottom: 12px; text-align: center; }
                                    .kop-wrapper img { max-height: 120px; width: auto; display: block; margin: 0 auto 6px; }
                                  </style>
                                  ${detailedRequest.generated_html_content || ''}
                                `,
                              }}
                            />
                          ) : (
                            <SuratTidakMampuPreview
                                letterNumber={`470/${detailedRequest.id}/${new Date(detailedRequest.created_at).getFullYear()}`}
                                letterData={detailedRequest.letter_input_data}
                                requestDescription={detailedRequest.description}
                                qrCode={qrCode}
                            />
                          )}
                        </div>
                    </div>
                    {/* Right Column: Details & Actions */}
                    <div className="space-y-5">
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                         <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><User className="w-5 h-5 text-blue-600" />Informasi Pemohon</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div><p className="text-xs text-gray-600">Nama</p><p className="font-medium text-gray-900">{detailedRequest.user?.full_name || 'Unknown'}</p></div>
                            <div><p className="text-xs text-gray-600">Layanan</p><p className="font-medium text-gray-900">{detailedRequest.service?.name || detailedRequest.request_type}</p></div>
                          </div>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Keperluan:</h4>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">{detailedRequest.description}</p>
                      </div>

                      {detailedRequest.status === 'kades_review' && !qrCode && (
                        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-yellow-900 mb-2">Alasan Penolakan</h4>
                            <p className="text-xs text-gray-600 mb-2">Isi kolom ini jika Anda ingin menolak pengajuan.</p>
                            <textarea
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="Contoh: Data tidak sesuai dengan dokumen..."
                              className="w-full p-2 border border-gray-300 rounded-md"
                              rows={3}
                            />
                        </div>
                      )}
                      {detailedRequest.status === 'approved' && qrCode && (
                          <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500">
                              <p className="font-semibold text-emerald-800">Surat telah disetujui dan ditandatangani.</p>
                              <p className="text-sm text-emerald-700">Warga kini dapat mengunduh surat yang sudah final.</p>
                          </div>
                      )}
                    </div>
                </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-gray-100 p-4 rounded-b-2xl border-t border-gray-200 flex justify-end gap-3">
              {detailedRequest?.status === 'kades_review' && !qrCode ? (
                <>
                  <button type="button" onClick={handleReject} disabled={submittingAction} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50">
                      {submittingAction ? <Loader2 className="animate-spin w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      Tolak
                  </button>
                  <button type="button" onClick={handleSign} disabled={submittingAction} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50">
                      {submittingAction ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                      Setujui & Tandatangani
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setShowRequestModal(false)} className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-100">
                  Tutup
                </button>
              )}
          </div>
        </div>
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'kades') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Anda tidak memiliki wewenang untuk mengakses halaman ini.</p>
          <Link to="/" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardLayout
        menuItems={menuItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Dashboard Kepala Desa"
        userInfo={{ name: user.full_name, role: 'Kepala Desa' }}
        onLogout={logout}
      >
        {renderContent()}
      </DashboardLayout>
      
      {renderRequestDetailModal()}
    </>
  );
};

export default KadesDashboard;

