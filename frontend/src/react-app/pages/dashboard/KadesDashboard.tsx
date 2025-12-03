import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';
import { useAuth } from '@/react-app/contexts/AuthContext';
import DashboardLayout from '@/react-app/components/DashboardLayout';
import { 
  FileText, CheckCircle, XCircle, Loader2,
  FileSignature, FileCheck, FileX, FileClock, FileSearch,
  Home, Users, UserCheck, Clock, AlertCircle, BarChart2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

interface Request {
  id: number;
  request_type: string;
  subject: string;
  description: string;
  status: 'pending' | 'processed' | 'approved' | 'rejected' | 'completed';
  documents?: string;
  response?: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    full_name: string;
    nik: string;
    address: string;
  };
  service?: {
    id: number;
    name: string;
  };
}

const KadesDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 0,
    inProcessRequests: 0
  });
  const [recentRequests, setRecentRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const requestsRes = await apiFetch('/api/requests');
      const requests = Array.isArray(requestsRes) ? requestsRes : [];
      
      setStats({
        totalRequests: requests.length,
        pendingRequests: requests.filter((r: Request) => r.status === 'pending').length,
        approvedRequests: requests.filter((r: Request) => r.status === 'approved').length,
        rejectedRequests: requests.filter((r: Request) => r.status === 'rejected').length,
        completedRequests: requests.filter((r: Request) => r.status === 'completed').length,
        inProcessRequests: requests.filter((r: Request) => r.status === 'processed').length
      });

      // Sort by most recent and get top 5
      const sortedRequests = [...requests]
        .sort((a: Request, b: Request) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 5);
      
      setRecentRequests(sortedRequests);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    const baseStyle = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'pending':
        return `${baseStyle} bg-yellow-100 text-yellow-800`;
      case 'processed':
        return `${baseStyle} bg-blue-100 text-blue-800`;
      case 'approved':
        return `${baseStyle} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseStyle} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseStyle} bg-purple-100 text-purple-800`;
      default:
        return `${baseStyle} bg-gray-100 text-gray-800`;
    }
  };

  // View request details
  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  // Handle status update
  const handleUpdateStatus = async (status: string) => {
    if (!selectedRequest) return;
    
    try {
      setLoadingRequests(true);
      await apiFetch(`/api/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      
      // Refresh data
      await fetchDashboardStats();
      setShowRequestModal(false);
    } catch (error) {
      console.error('Error updating request status:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Menu items for the dashboard sidebar
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pengajuan', label: 'Kelola Pengajuan', icon: FileText },
    { id: 'penduduk', label: 'Data Penduduk', icon: Users },
    { id: 'laporan', label: 'Laporan', icon: BarChart2 },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings }
  ];

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // You can add navigation logic here if needed
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <DashboardLayout 
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      title="Dashboard Kepala Desa"
      userInfo={{
        name: user?.full_name || 'Kepala Desa',
        role: 'Kepala Desa',
        email: user?.email || ''
      }}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Kepala Desa</h1>
          <p className="text-gray-600 mt-1">
            Selamat datang, {user?.full_name || 'Kepala Desa'}. Berikut adalah ringkasan aktivitas terbaru.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Pengajuan */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pengajuan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Total seluruh pengajuan</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Menunggu Tandatangan */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Menunggu Tandatangan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Menunggu persetujuan</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <FileSignature className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Sudah Ditandatangani */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sudah Ditandatangani</p>
                <p className="text-3xl font-bold text-gray-900">{stats.approvedRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Total dokumen yang sudah ditandatangani</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Ditolak */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ditolak</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rejectedRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Total pengajuan ditolak</p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <FileX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Dalam Proses */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Dalam Proses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inProcessRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Sedang diproses oleh operator</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FileClock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Selesai */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Selesai</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Total pengajuan selesai</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Pengajuan Terbaru</h2>
              <Link 
                to="/dashboard/kades/pengajuan" 
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Lihat Semua
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Surat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pemohon
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                      </div>
                    </td>
                  </tr>
                ) : recentRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada data pengajuan
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.request_type}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.service?.name || 'Layanan Lainnya'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.user?.full_name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.user?.nik || 'NIK: -'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(request.status)}>
                          {request.status === 'pending' && 'Menunggu'}
                          {request.status === 'processed' && 'Diproses'}
                          {request.status === 'approved' && 'Disetujui'}
                          {request.status === 'rejected' && 'Ditolak'}
                          {request.status === 'completed' && 'Selesai'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewRequest(request)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Request Detail Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Detail Pengajuan</h3>
                  <p className="text-sm text-gray-500">ID: {selectedRequest.id}</p>
                </div>
                <button 
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Tutup</span>
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Jenis Surat</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.request_type}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Layanan</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.service?.name || 'Layanan Lainnya'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Pemohon</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.user?.full_name || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    NIK: {selectedRequest.user?.nik || '-'}
                  </p>
                  {selectedRequest.user?.address && (
                    <p className="text-xs text-gray-500 mt-1">
                      Alamat: {selectedRequest.user.address}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Deskripsi</h4>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {selectedRequest.description || 'Tidak ada deskripsi'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <div className="mt-1">
                    <span className={getStatusBadge(selectedRequest.status)}>
                      {selectedRequest.status === 'pending' && 'Menunggu'}
                      {selectedRequest.status === 'processed' && 'Diproses'}
                      {selectedRequest.status === 'approved' && 'Disetujui'}
                      {selectedRequest.status === 'rejected' && 'Ditolak'}
                      {selectedRequest.status === 'completed' && 'Selesai'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Dokumen Pendukung</h4>
                  {selectedRequest.documents ? (
                    <div className="mt-2">
                      <a 
                        href={selectedRequest.documents} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <FileSearch className="w-4 h-4 mr-1" />
                        Lihat Dokumen
                      </a>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">Tidak ada dokumen</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tanggal Pengajuan</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(selectedRequest.created_at)}
                  </p>
                </div>

                {selectedRequest.updated_at && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Diperbarui</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedRequest.updated_at)}
                    </p>
                  </div>
                )}

                {selectedRequest.response && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Catatan</h4>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                      {selectedRequest.response}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Tutup
                </button>
                
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus('rejected')}
                      disabled={loadingRequests}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      {loadingRequests ? (
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      ) : (
                        <XCircle className="-ml-1 mr-2 h-4 w-4" />
                      )}
                      Tolak
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus('approved')}
                      disabled={loadingRequests}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {loadingRequests ? (
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      ) : (
                        <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
                      )}
                      Setujui
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default KadesDashboard;
