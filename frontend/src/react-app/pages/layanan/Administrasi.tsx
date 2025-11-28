import PageLayout from '@/react-app/components/PageLayout';
import {
  FileText, Clock, CheckCircle, Download, ChevronDown,
  Home, Users, Baby, UserPlus, Briefcase, GraduationCap,
  Phone, Mail, Upload, LucideIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiGet } from '@/react-app/lib/api';

interface ServiceTemplate {
  id: number;
  name: string;
  file_url: string;
}

interface ServiceData {
  id: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: 'active' | 'inactive';
  category: string;
  templates?: ServiceTemplate[];
}

interface ServiceDisplay {
  id: number | string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: string;
  estimatedTime: string;
  requirements: string[];
  documents: ServiceTemplate[];
}

const AdministrasiPage = () => {
  const [selectedService, setSelectedService] = useState<number | string | null>(null);
  const [services, setServices] = useState<ServiceDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get icon based on category or name
  const getServiceIcon = (name: string, _category: string): LucideIcon => {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('domisili')) return Home;
    if (nameLower.includes('keluarga') || nameLower.includes('kk')) return Users;
    if (nameLower.includes('kelahiran') || nameLower.includes('akta')) return Baby;
    if (nameLower.includes('pindah')) return UserPlus;
    if (nameLower.includes('usaha')) return Briefcase;
    if (nameLower.includes('sekolah') || nameLower.includes('pendidikan')) return GraduationCap;

    return FileText; // Default icon
  };

  // Helper function to get color based on index
  const getServiceColor = (index: number): string => {
    const colors = [
      'bg-blue-500',
      'bg-emerald-500',
      'bg-pink-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-rose-500'
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await apiGet('/pubservices');

        if (response.ok) {
          const data: ServiceData[] = await response.json();

          // Map backend data to display format
          const mappedServices: ServiceDisplay[] = data.map((service, index) => ({
            id: service.id,
            title: service.name,
            description: service.description,
            icon: getServiceIcon(service.name, service.category),
            color: getServiceColor(index),
            status: service.status === 'active' ? 'online' : 'offline',
            estimatedTime: service.processing_time,
            requirements: service.requirements || [],
            documents: service.templates || []
          }));

          setServices(mappedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const faqItems = [
    {
      question: 'Berapa biaya untuk setiap layanan administrasi?',
      answer: 'Sebagian besar layanan administrasi desa tidak dikenakan biaya. Hanya ada biaya materai untuk dokumen tertentu.'
    },
    {
      question: 'Apakah bisa mengajukan permohonan secara online?',
      answer: 'Ya, sebagian besar layanan sudah tersedia secara online. Anda bisa mengajukan dan melacak status permohonan melalui website ini.'
    },
    {
      question: 'Bagaimana cara melacak status permohonan saya?',
      answer: 'Setelah mengajukan permohonan, Anda akan mendapat nomor referensi yang bisa digunakan untuk melacak status di menu "Lacak Permohonan".'
    },
    {
      question: 'Berapa lama waktu proses setiap layanan?',
      answer: 'Waktu proses bervariasi tergantung jenis layanan, mulai dari 2-3 hari hingga 2 minggu untuk dokumen yang memerlukan verifikasi khusus.'
    }
  ];

  return (
    <PageLayout
      title="Layanan Administrasi Penduduk"
      subtitle="Kemudahan mengurus dokumen administrasi secara online dan offline"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Layanan' },
        { name: 'Administrasi Penduduk' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">

          {/* Quick Stats */}
          <section className="mb-12">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{loading ? '...' : services.length}</h3>
                <p className="text-gray-600 text-sm">Layanan Tersedia</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? '...' : services.filter(s => s.status === 'online').length}
                </h3>
                <p className="text-gray-600 text-sm">Layanan Online</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">2-14</h3>
                <p className="text-gray-600 text-sm">Hari Proses</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">847</h3>
                <p className="text-gray-600 text-sm">Permohonan Bulan Ini</p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Daftar Layanan Administrasi</h2>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Memuat layanan...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Belum ada layanan tersedia</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${service.color} p-3 rounded-lg`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        service.status === 'online'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{service.estimatedTime}</span>
                      </div>
                      <button className="text-village-green font-medium text-sm hover:text-emerald-700">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Service Detail Modal */}
          {selectedService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-90vh overflow-y-auto">
                {(() => {
                  const service = services.find(s => s.id === selectedService);
                  if (!service) return null;

                  return (
                    <>
                      {/* Modal Header */}
                      <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center space-x-3">
                          <div className={`${service.color} p-2 rounded-lg`}>
                            <service.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                        </div>
                        <button
                          onClick={() => setSelectedService(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="p-6">
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Left Column */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Persyaratan</h4>
                            <ul className="space-y-2 mb-6">
                              {service.requirements.length > 0 ? (
                                service.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{req}</span>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-600 text-sm">Tidak ada persyaratan khusus</li>
                              )}
                            </ul>

                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Dokumen Template</h4>
                            <div className="space-y-2 mb-6">
                              {service.documents.length > 0 ? (
                                service.documents.map((doc) => (
                                  <a
                                    key={doc.id}
                                    href={doc.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-village-green hover:text-emerald-700 text-sm"
                                  >
                                    <Download className="w-4 h-4" />
                                    <span>{doc.name}</span>
                                  </a>
                                ))
                              ) : (
                                <p className="text-gray-600 text-sm">Tidak ada template tersedia</p>
                              )}
                            </div>
                          </div>

                          {/* Right Column */}
                          <div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Estimasi Waktu</span>
                              </div>
                              <p className="text-gray-600 text-sm">{service.estimatedTime}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                          <button
                            onClick={() => setSelectedService(null)}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Tutup
                          </button>
                          {service.status === 'online' ? (
                            <button className="px-6 py-2 bg-village-green text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2">
                              <Upload className="w-4 h-4" />
                              <span>Ajukan Sekarang</span>
                            </button>
                          ) : (
                            <button className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                              Layanan Offline
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold text-center mb-8">Butuh Bantuan?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Telepon</h3>
                  <p className="text-emerald-100">(0721) 123-456</p>
                </div>
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-emerald-100">admin@desafajarbaru.id</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Pertanyaan Umum</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdministrasiPage;
