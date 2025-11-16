import PageLayout from '@/react-app/components/PageLayout';
import {
  FileText, Clock, CheckCircle, ChevronDown, Phone, Mail,
  AlertCircle, MessageSquare, Shield, Info, Send, Star
} from 'lucide-react';
import { useContentAnimation, useStaggeredAnimation } from '@/react-app/hooks/useContentAnimation';
import { Link } from 'react-router-dom';

const LayananPage = () => {
  const { isVisible: tabsVisible, elementRef: tabsRef } = useContentAnimation();
  const { visibleItems: statsVisible, containerRef: statsRef } = useStaggeredAnimation(4, 100);
  const { visibleItems: serviceItems, containerRef: servicesRef } = useStaggeredAnimation(6, 120);
  const { visibleItems: pengaduanItems, containerRef: pengaduanRef } = useStaggeredAnimation(4, 150);

  // (Konten Administrasi & PPID dipindahkan ke halaman khusus)

  // Data Pengaduan Warga
  const pengaduanCategories = [
    {
      kategori: 'Infrastruktur',
      icon: AlertCircle,
      color: 'bg-red-500',
      contoh: ['Jalan rusak', 'Drainase tersumbat', 'Lampu jalan mati']
    },
    {
      kategori: 'Pelayanan',
      icon: FileText,
      color: 'bg-blue-500',
      contoh: ['Pelayanan administrasi', 'Waktu pelayanan', 'Kualitas layanan']
    },
    {
      kategori: 'Kebersihan',
      icon: Shield,
      color: 'bg-green-500',
      contoh: ['Sampah tidak diangkut', 'Lingkungan kotor', 'Tempat sampah rusak']
    },
    {
      kategori: 'Lainnya',
      icon: MessageSquare,
      color: 'bg-purple-500',
      contoh: ['Saran pembangunan', 'Kritik pemerintahan', 'Usulan program']
    }
  ];

  const statistikLayanan = [
    {
      judul: 'Permohonan Bulan Ini',
      nilai: '247',
      icon: FileText,
      warna: 'bg-blue-500'
    },
    {
      judul: 'Layanan Online',
      nilai: '5',
      icon: CheckCircle,
      warna: 'bg-green-500'
    },
    {
      judul: 'Waktu Rata-rata',
      nilai: '4 Hari',
      icon: Clock,
      warna: 'bg-orange-500'
    },
    {
      judul: 'Tingkat Kepuasan',
      nilai: '94%',
      icon: Star,
      warna: 'bg-purple-500'
    }
  ];

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
    }
  ];

  return (
    <PageLayout
      title="Layanan Desa Fajar Baru"
      subtitle="Kemudahan mengurus administrasi, akses informasi publik, dan menyampaikan pengaduan"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Layanan' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Navigation Tabs */}
          <section 
            ref={tabsRef as any}
            className={`mb-12 ${tabsVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="#administrasi" className="btn-primary px-6 py-3 text-sm">
                Administrasi
              </a>
              <a href="#ppid" className="btn-outline px-6 py-3 text-sm">
                PPID
              </a>
              <a href="#pengaduan" className="btn-outline px-6 py-3 text-sm">
                Pengaduan
              </a>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="mb-16">
            <div ref={statsRef as any} className="grid md:grid-cols-4 gap-6">
              {statistikLayanan.map((stat, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg p-6 text-center hover-lift hover-glow ${
                  statsVisible[index] ? 'animate-zoom-in' : 'opacity-0'
                }`}>
                  <div className={`w-12 h-12 ${stat.warna} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.nilai}</h3>
                  <p className="text-gray-600 text-sm">{stat.judul}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ringkasan Layanan Tersedia */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Jelajahi Layanan</h2>
            <div ref={servicesRef as any} className="grid md:grid-cols-2 gap-6">
              <Link to="/layanan/administrasi" className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow hover-lift ${serviceItems[0] ? 'animate-bounce-in' : 'opacity-0'}`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Layanan Administrasi</h3>
                </div>
                <p className="text-gray-600">Pengurusan berbagai dokumen administrasi kependudukan dan keterangan.</p>
              </Link>
              <Link to="/layanan/ppid" className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow hover-lift ${serviceItems[1] ? 'animate-bounce-in' : 'opacity-0'}`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Info className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Layanan PPID</h3>
                </div>
                <p className="text-gray-600">Akses informasi publik, prosedur permohonan informasi, dan ketentuan layanan.</p>
              </Link>
            </div>
          </section>

          {/* Pengaduan Warga */}
          <section id="pengaduan" className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Pengaduan Warga</h2>
            
            <div ref={pengaduanRef as any} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {pengaduanCategories.map((category, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow hover-lift ${
                  pengaduanItems[index] ? 'animate-rotate-in' : 'opacity-0'
                }`}>
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.kategori}</h3>
                  <div className="space-y-1">
                    {category.contoh.map((contoh, contohIndex) => (
                      <p key={contohIndex} className="text-sm text-gray-600">{contoh}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Form Pengaduan Online</h3>
              <form className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor HP</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent"
                    placeholder="08123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Pengaduan</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent">
                    <option>Pilih kategori</option>
                    <option>Infrastruktur</option>
                    <option>Pelayanan</option>
                    <option>Kebersihan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detail Pengaduan</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-village-green focus:border-transparent"
                    placeholder="Jelaskan pengaduan Anda secara detail..."
                  ></textarea>
                </div>
                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3"
                  >
                    <Send className="w-5 h-5" />
                    <span>Kirim Pengaduan</span>
                  </button>
                </div>
              </form>
            </div>
          </section>

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

export default LayananPage;
