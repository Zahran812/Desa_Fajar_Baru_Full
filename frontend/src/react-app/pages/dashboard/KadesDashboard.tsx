import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/contexts/AuthContext';
import DashboardLayout from '@/react-app/components/DashboardLayout';
import {
  Home, FileText, CheckCircle, XCircle, Loader2,
  FileSignature, FileCheck, FileX, FileClock,
  Download, Eye, BarChart2, Users, Archive,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentItem {
  id: number;
  required_name: string;
  original_name: string;
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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

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

      const validItems = items.filter((item: Request) =>
        item && typeof item === 'object' && 'id' in item && 'status' in item &&
        item.user && typeof item.user === 'object' && 'full_name' in item.user &&
        item.service && typeof item.service === 'object' && 'name' in item.service
      );
      
      const sortedRequests = validItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setAllRequests(sortedRequests);

      setStats({
        totalRequests: sortedRequests.length,
        pendingRequests: sortedRequests.filter(r => r.status === 'pending').length,
        approvedRequests: sortedRequests.filter(r => r.status === 'approved').length,
        rejectedRequests: sortedRequests.filter(r => r.status === 'rejected').length,
        completedRequests: sortedRequests.filter(r => r.status === 'completed').length,
        inProcessRequests: sortedRequests.filter(r => r.status === 'processed').length
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
    { id: 'requests', label: 'Daftar Pengajuan', icon: FileText, badge: stats.pendingRequests },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processed': return 'bg-blue-100 text-blue-800'; // Renamed from in_progress
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'processed': return 'Diproses';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <FileSignature className="w-4 h-4" />;
      case 'approved': return <FileCheck className="w-4 h-4" />;
      case 'rejected': return <FileX className="w-4 h-4" />;
      case 'processed': return <FileClock className="w-4 h-4" />;
      case 'completed': return <Archive className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedRequest) return;
    
    setLoadingRequests(true);
    try {
      const token = localStorage.getItem('auth_token');
      // Endpoint to update status by Kades
      const response = await apiFetch(`/requests/${selectedRequest.id}/status/kades`, {
        method: 'PATCH',
        body: JSON.stringify({ status, response: `Status diperbarui oleh Kepala Desa` }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memperbarui status');
      }

      await fetchAllRequests();
      setShowRequestModal(false);
    } catch (error) {
      console.error('Error updating request status:', error);
      alert(`Gagal memperbarui status: ${error instanceof Error ? error.message : 'Error tidak diketahui'}`);
    } finally {
      setLoadingRequests(false);
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
          { title: 'Total Pengajuan', value: stats.totalRequests, icon: BarChart2, color: 'blue' },
          { title: 'Menunggu Persetujuan', value: stats.pendingRequests, icon: FileSignature, color: 'yellow' },
          { title: 'Pengajuan Disetujui', value: stats.approvedRequests, icon: FileCheck, color: 'emerald' },
          { title: 'Pengajuan Ditolak', value: stats.rejectedRequests, icon: FileX, color: 'red' },
          { title: 'Sedang Diproses', value: stats.inProcessRequests, icon: FileClock, color: 'blue' },
          { title: 'Pengajuan Selesai', value: stats.completedRequests, icon: Archive, color: 'purple' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${item.color}-50 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pengajuan Terbaru</h3>
            <button onClick={() => setActiveTab('requests')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat semua →
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {loading ? <p>Memuat...</p> : <RequestTable requests={allRequests.slice(0, 5)} onView={handleViewRequest} />}
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
          <p className="text-gray-500">Belum ada pengajuan</p>
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

      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Detail Pengajuan</h3>
                  <p className="text-sm text-gray-500">ID: {selectedRequest.id}</p>
                </div>
                <button onClick={() => setShowRequestModal(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {[
                { label: 'Jenis Surat', value: selectedRequest.request_type },
                { label: 'Layanan', value: selectedRequest.service?.name || 'Lainnya' },
                { label: 'Pemohon', value: selectedRequest.user?.full_name || 'N/A' },
                { label: 'NIK Pemohon', value: selectedRequest.user?.nik || '-' },
                { label: 'Deskripsi', value: selectedRequest.description, pre: true },
                { label: 'Tanggal Pengajuan', value: formatDate(selectedRequest.created_at) },
              ].map(item => (
                <div key={item.label}>
                  <h4 className="text-sm font-semibold text-gray-600">{item.label}</h4>
                  <p className={`mt-1 text-gray-900 ${item.pre ? 'whitespace-pre-wrap' : ''}`}>{item.value}</p>
                </div>
              ))}
              
              <div>
                <h4 className="text-sm font-semibold text-gray-600">Status</h4>
                <div className="mt-1">
                  <span className={`px-3 py-1.5 text-sm font-semibold rounded-full flex items-center gap-2 w-fit ${getStatusColor(selectedRequest.status)}`}>
                    {getStatusIcon(selectedRequest.status)}
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                </div>
              </div>
              
              <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Dokumen Persyaratan</h4>
                  {selectedRequest.documents && selectedRequest.documents.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRequest.documents.map((doc: DocumentItem) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{doc.required_name}</p>
                              <p className="text-xs text-gray-500">{doc.original_name}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const token = localStorage.getItem('auth_token');
                              const url = `${import.meta.env.VITE_API_BASE_URL}/requests/document/${doc.id}/download?token=${encodeURIComponent(token || '')}`;
                              window.open(url, '_blank');
                            }}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            <Download className="w-4 h-4" /> Unduh
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">Tidak ada dokumen.</p>
                  )}
              </div>

            </div>

            <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button type="button" onClick={() => setShowRequestModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100">
                Tutup
              </button>
              
              {selectedRequest.status === 'pending' && (
                <>
                  <button type="button" onClick={() => handleUpdateStatus('rejected')} disabled={loadingRequests} className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                    {loadingRequests ? <Loader2 className="animate-spin w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    Tolak
                  </button>
                  <button type="button" onClick={() => handleUpdateStatus('approved')} disabled={loadingRequests} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50">
                    {loadingRequests ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    Setujui
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KadesDashboard;
