import PageLayout from '@/react-app/components/PageLayout';
import {
  FileText, Clock, CheckCircle, ChevronDown,
  Phone, Mail, Download
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { apiGet } from '@/react-app/lib/api';
import { getCategoryIcon } from '@/react-app/components/dashboard/ServiceEditor';


// Interface for individual service documents/templates from backend
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

// Interface for a single service from backend
interface ServiceData {
  id: number;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fee: number;
  status: 'active' | 'inactive';
  category_id: number;
  category: Category; // Now a full Category object
  templates?: ServiceTemplate[];
}

// Interface for a category that holds multiple services/documents
interface SuratCategory extends Category {
  documents: ServiceData[];
}


const AdministrasiPage = () => {
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // Default to 0 for 'Semua Surat'
  const [activeDoc, setActiveDoc] = useState<ServiceData | null>(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [categories, setCategories] = useState<SuratCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await apiGet('/pubservices');

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch services. Status:", response.status);
          console.error("Response:", errorText);
          throw new Error('Failed to fetch services');
        }

        const data: ServiceData[] = await response.json();
        console.log('Fetched services:', data);

        // Validasi data
        if (!Array.isArray(data)) {
          console.error('Data bukan array:', data);
          throw new Error('Invalid data format');
        }

        setAllServices(data);

        // Filter only services with category
        const validServices = data.filter(service => service.category && service.category.id);

        const grouped: { [key: number]: ServiceData[] } = validServices.reduce((acc, service) => {
          const categoryId = service.category.id;
          if (!acc[categoryId]) {
            acc[categoryId] = [];
          }
          acc[categoryId].push(service);
          return acc;
        }, {} as { [key: number]: ServiceData[] });

        const suratCategories: SuratCategory[] = Object.keys(grouped).map(key => {
          const categoryId = Number(key);
          const categoryData = validServices.find(s => s.category.id === categoryId)?.category;
          return {
            id: categoryId,
            name: categoryData?.name || 'Unknown',
            description: categoryData?.description || 'Deskripsi kategori tidak tersedia.',
            icon: categoryData?.icon,
            documents: grouped[categoryId],
          };
        });

        // Add 'Semua Surat' category
        suratCategories.unshift({
          id: 0,
          name: 'SEMUA SURAT',
          description: 'Tampilkan seluruh dokumen administrasi dari semua kategori.',
          documents: validServices,
        });

        console.log('Categories:', suratCategories);
        setCategories(suratCategories);

        // Set initial selected category after fetching
        if (suratCategories.length > 0) {
          setSelectedCategory(suratCategories[0].id);
        }

      } catch (error) {
        console.error('Error fetching services:', error);
        setCategories([]);
        setAllServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const scrollToDetails = (categoryId: number) => {
    setSelectedCategory(categoryId);
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);
  const totalDocuments = allServices.length;

  const faqItems = [
    { question: 'Berapa biaya untuk setiap layanan administrasi?', answer: 'Sebagian besar layanan administrasi desa tidak dikenakan biaya. Hanya ada biaya materai untuk dokumen tertentu.' },
    { question: 'Apakah bisa mengajukan permohonan secara online?', answer: 'Ya, sebagian besar layanan sudah tersedia secara online. Anda bisa mengajukan dan melacak status permohonan melalui website ini.' },
    { question: 'Bagaimana cara melacak status permohonan saya?', answer: 'Setelah mengajukan permohonan, Anda akan mendapat nomor referensi yang bisa digunakan untuk melacak status di menu "Lacak Permohonan".' },
    { question: 'Berapa lama waktu proses setiap layanan?', answer: 'Waktu proses bervariasi tergantung jenis layanan, mulai dari 2-3 hari hingga 2 minggu untuk dokumen yang memerlukan verifikasi khusus.' }
  ];

  return (
    <PageLayout
      title="Layanan Administrasi Penduduk"
      subtitle="Kemudahan mengurus dokumen administrasi secara online dan offline"
      breadcrumb={[{ name: 'Beranda', href: '/' }, { name: 'Layanan' }, { name: 'Administrasi Penduduk' }]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">

          <section className="mb-12">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><FileText className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-2xl font-bold text-gray-800">{loading ? '...' : categories.filter(cat => cat.id !== 0).length}</h3>
                <p className="text-gray-600 text-sm">Kategori Surat</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                <h3 className="text-2xl font-bold text-gray-800">{loading ? '...' : totalDocuments}</h3>
                <p className="text-gray-600 text-sm">Surat Tersedia</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3"><Clock className="w-6 h-6 text-orange-600" /></div>
                <h3 className="text-2xl font-bold text-gray-800">2-5</h3>
                <p className="text-gray-600 text-sm">Hari Proses Standar</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"><Phone className="w-6 h-6 text-purple-600" /></div>
                <h3 className="text-2xl font-bold text-gray-800">(0721) 123-456</h3>
                <p className="text-gray-600 text-sm">Bantuan Administrasi</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Kategori Surat</p>
                  <h2 className="text-3xl font-bold text-gray-800">Pilih kategori untuk melihat detail dokumen</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      className="appearance-none border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
                      value={selectedCategory}
                      onChange={(event) => setSelectedCategory(Number(event.target.value))}
                      disabled={loading}
                    >
                      {loading ? <option>Memuat...</option> : categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  <button
                    onClick={() => scrollToDetails(selectedCategory)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
                    disabled={loading}
                  >
                    Tampilkan Kartu Dokumen
                  </button>
                </div>
              </div>
            </div>
          </section>

          {loading ? (
            <div className="text-center py-12"><p className="text-gray-600">Memuat layanan...</p></div>
          ) : categories.length > 0 && currentCategory ? (
            <section ref={detailRef} className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 space-y-6 shadow-lg border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {currentCategory.icon && (() => {
                      const IconComponent = getCategoryIcon(currentCategory.icon);
                      return <IconComponent className="w-8 h-8 text-emerald-600" />;
                    })()}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500">{currentCategory.name}</p>
                      <h3 className="text-2xl font-bold text-gray-800">{currentCategory.description}</h3>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{currentCategory.documents.length} dokumen</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {currentCategory.documents.map((document, index) => (
                    <div key={document.id} className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 hover:border-emerald-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-700">Dokumen #{index + 1}</p>
                        <div className="flex items-center gap-1.5">
                          {document.category.icon && (() => {
                            const IconComponent = getCategoryIcon(document.category.icon);
                            return <IconComponent className="w-3.5 h-3.5 text-emerald-600" />;
                          })()}
                          <span className="text-xs uppercase text-emerald-600 font-semibold">{document.category.name}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{document.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">{document.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <button
                          onClick={() => {
                            setActiveDoc(document);
                            setShowDocModal(true);
                          }}
                          className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-full text-sm font-semibold hover:bg-emerald-50 transition"
                        >
                          Informasi Dokumen
                        </button>
                        <button
                          onClick={() => window.location.assign('/login')}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700"
                        >
                          Ajukan Minta Surat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="text-center py-12"><p className="text-gray-600">Belum ada layanan yang tersedia.</p></div>
          )}
          
          {showDocModal && activeDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-100">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Informasi Dokumen</p>
                    <h3 className="text-xl font-semibold text-gray-800">{activeDoc.name}</h3>
                  </div>
                  <button onClick={() => setShowDocModal(false)} className="text-gray-500 hover:text-gray-700" aria-label="Tutup">✕</button>
                </div>
                <div className="grid gap-6 px-6 py-6 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Persyaratan</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {activeDoc.requirements && activeDoc.requirements.length > 0 ? activeDoc.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      )) : (<li>Tidak ada persyaratan khusus.</li>)}
                    </ul>
                    {activeDoc.templates && activeDoc.templates.length > 0 && (
                      <div className="mt-6">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Dokumen Template</p>
                        <div className="flex flex-col gap-2 text-sm text-emerald-600">
                          {activeDoc.templates.map((template) => (
                             <a
                              key={template.id}
                              href={template.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 underline hover:text-emerald-700"
                            >
                              <Download size={14}/>
                              {template.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs uppercase text-gray-500">Estimasi Waktu</p>
                      <p className="text-lg font-semibold text-gray-800">{activeDoc.processing_time}</p>
                    </div>
                     <div className="mt-4 bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs uppercase text-gray-500">Biaya</p>
                      <p className="text-lg font-semibold text-gray-800">{activeDoc.fee > 0 ? `Rp ${activeDoc.fee.toLocaleString('id-ID')}` : 'Gratis'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-6 pb-6 lg:flex-row lg:justify-end">
                  <button
                    onClick={() => setShowDocModal(false)}
                    className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => { setShowDocModal(false); window.location.assign('/login'); }}
                    className="px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                  >
                    Ajukan Sekarang
                  </button>
                </div>
              </div>
            </div>
          )}

          <section className="mb-16">
            <div className="bg-gradient-to-r from-village-green to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold text-center mb-8">Butuh Bantuan?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center"><Phone className="w-8 h-8 mx-auto mb-3" /><h3 className="font-semibold mb-2">Telepon</h3><p className="text-emerald-100">(0721) 123-456</p></div>
                <div className="text-center"><Mail className="w-8 h-8 mx-auto mb-3" /><h3 className="font-semibold mb-2">Email</h3><p className="text-emerald-100">admin@desafajarbaru.id</p></div>
              </div>
            </div>
          </section>

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
                    <div className="px-6 pb-6"><p className="text-gray-600">{faq.answer}</p></div>
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