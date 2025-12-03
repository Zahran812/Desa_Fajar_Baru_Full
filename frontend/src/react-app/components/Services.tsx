import { useState, useEffect } from 'react';
import {
  FileText,
  Users,
  Home,
  GraduationCap,
  Baby,
  UserPlus,
  Briefcase,
  Send,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { apiFetch } from '@/react-app/lib/api';

interface ServiceTemplate {
  id: number;
  name: string;
  file_url: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

interface ServiceData {
  id: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: string;
  category_id: number;
  category: Category;
  templates?: ServiceTemplate[];
}

interface ServiceDisplay extends ServiceData {
  icon: any;
  color: string;
}

const Services = () => {
  const { user } = useAuth();

  const [services, setServices] = useState<ServiceDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Helper function to get icon based on service name or category
  const getServiceIcon = (name: string, category: string) => {
    const nameLower = name.toLowerCase();
    const categoryLower = category.toLowerCase();

    if (nameLower.includes('domisili') || nameLower.includes('tinggal')) return Home;
    if (nameLower.includes('keluarga') || nameLower.includes('kk')) return Users;
    if (nameLower.includes('kelahiran') || nameLower.includes('bayi') || nameLower.includes('lahir')) return Baby;
    if (nameLower.includes('pindah') || nameLower.includes('datang')) return UserPlus;
    if (nameLower.includes('usaha') || nameLower.includes('bisnis')) return Briefcase;
    if (nameLower.includes('sekolah') || nameLower.includes('pendidikan') || nameLower.includes('siswa')) return GraduationCap;

    // Default icon based on category
    if (categoryLower.includes('kependudukan')) return Users;
    if (categoryLower.includes('usaha')) return Briefcase;
    if (categoryLower.includes('pendidikan')) return GraduationCap;

    return FileText; // Default icon
  };

  // Helper function to get color gradient
  const getServiceColor = (index: number) => {
    const colors = [
      'from-emerald-500 to-blue-500',
      'from-blue-500 to-emerald-500',
      'from-emerald-500 to-teal-500',
      'from-blue-500 to-cyan-500',
      'from-teal-500 to-emerald-500',
      'from-cyan-500 to-blue-500'
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching services from /pubservices...');
        const response = await apiFetch('/pubservices');

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch services. Status:', response.status);
          console.error('Response:', errorText);
          setError(`Failed to fetch services. Status: ${response.status}`);
          return;
        }

        const data: ServiceData[] = await response.json();
        console.log('Services data received:', data);

        // Validasi data
        if (!Array.isArray(data)) {
          console.error('Data bukan array:', data);
          setError('Invalid data format');
          return;
        }

        // Filter only active services with category
        const validServices = data.filter(service =>
          service.category && service.category.id && service.status === 'active'
        );

        // Map API data to display format with icons and colors
        const mappedServices: ServiceDisplay[] = validServices.map((service, index) => ({
          ...service,
          icon: getServiceIcon(service.name, service.category.name),
          color: getServiceColor(index)
        }));

        console.log('Mapped services:', mappedServices);
        setServices(mappedServices);

        // Set first service as selected by default
        if (mappedServices.length > 0) {
          setSelectedService(mappedServices[0].id);
        }
      } catch (err: any) {
        const errorMsg = err?.message || 'Error fetching services';
        console.error('Error fetching services:', err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const currentService = services.find(service => service.id === selectedService);

  const handleApplyService = () => {
    if (user) {
      // Redirect to citizen dashboard layanan tab
      const dashboardUrl = user.role === 'operator' ? '/dashboard/operator' :
                          user.role === 'dusun_head' ? '/dashboard/dusun' :
                          '/dashboard/citizen';
      window.location.href = dashboardUrl;
    } else {
      // Redirect to login/register page
      window.location.href = '/login';
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section id="pelayanan" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Layanan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Akses mudah dan cepat untuk berbagai layanan administrasi desa secara online
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="pelayanan" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Layanan</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-red-600 mb-2">Gagal memuat layanan</p>
              <p className="text-sm text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Muat Ulang
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no services
  if (services.length === 0) {
    return (
      <section id="pelayanan" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Layanan</h2>
            <p className="text-xl text-gray-600">Belum ada layanan yang tersedia saat ini.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pelayanan" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Layanan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Akses mudah dan cepat untuk berbagai layanan administrasi desa secara online
          </p>
        </div>

        {/* Main Content */}
        <div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Service Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>Pilih Layanan</span>
              </h3>

              {/* Service Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Layanan
                </label>
                <select
                  value={selectedService || ''}
                  onChange={(e) => setSelectedService(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Details */}
              {currentService && (
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${currentService.color}`}>
                      <currentService.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {currentService.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {currentService.description}
                      </p>
                    </div>
                  </div>

                  {/* Processing Time & Fee */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Waktu Proses: {currentService.processing_time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">
                        Biaya: {currentService.fee === 0 ? 'Gratis' : `Rp ${currentService.fee.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Requirements & Action */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Syarat & Ketentuan</span>
              </h3>

              {/* Requirements */}
              {currentService && (
                <>
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {currentService.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 leading-relaxed">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Document Templates */}
                  {currentService.templates && currentService.templates.length > 0 && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Template Dokumen:</h4>
                      <div className="space-y-2">
                        {currentService.templates.map((template) => (
                          <a
                            key={template.id}
                            href={template.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{template.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={handleApplyService}
                      className="w-full btn-primary py-4 text-lg font-semibold hover:scale-105"
                    >
                      <Send className="w-5 h-5" />
                      <span>Ajukan Sekarang</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    {!user && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        * Anda akan diarahkan untuk mendaftar terlebih dahulu
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
