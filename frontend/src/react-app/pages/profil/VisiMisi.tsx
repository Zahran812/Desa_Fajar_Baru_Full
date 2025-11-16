import PageLayout from '@/react-app/components/PageLayout';
import { Target, Eye, Heart, Users, Zap, Leaf } from 'lucide-react';

const VisiMisiPage = () => {
  const misiList = [
    {
      icon: Users,
      title: 'Meningkatkan Kesejahteraan Masyarakat',
      description: 'Mengembangkan program-program pemberdayaan ekonomi dan sosial untuk meningkatkan taraf hidup warga desa.'
    },
    {
      icon: Zap,
      title: 'Membangun Infrastruktur Digital',
      description: 'Mengintegrasikan teknologi digital dalam pelayanan untuk kemudahan akses informasi dan layanan.'
    },
    {
      icon: Heart,
      title: 'Memperkuat Nilai-nilai Gotong Royong',
      description: 'Melestarikan budaya gotong royong dan kerja sama dalam pembangunan desa yang berkelanjutan.'
    },
    {
      icon: Leaf,
      title: 'Menjaga Kelestarian Lingkungan',
      description: 'Menerapkan pembangunan ramah lingkungan dan sustainable development untuk generasi mendatang.'
    }
  ];

  const strategicGoals = [
    {
      category: 'Ekonomi Desa',
      goals: [
        'Mengembangkan BUMDes sebagai motor penggerak ekonomi desa',
        'Memberdayakan UMKM lokal melalui pelatihan dan akses modal',
        'Meningkatkan produktivitas pertanian dengan teknologi modern',
        'Mengembangkan potensi wisata desa sebagai sumber pendapatan'
      ]
    },
    {
      category: 'Pelayanan',
      goals: [
        'Digitalisasi seluruh layanan administrasi desa',
        'Meningkatkan transparansi dan akuntabilitas pemerintahan desa',
        'Mempercepat proses pelayanan dengan sistem online',
        'Meningkatkan kualitas infrastruktur dasar desa'
      ]
    },
    {
      category: 'Sosial dan Budaya',
      goals: [
        'Melestarikan budaya dan tradisi lokal',
        'Meningkatkan kualitas pendidikan dan kesehatan',
        'Mengembangkan potensi pemuda melalui program kreatif',
        'Memperkuat kohesi sosial masyarakat'
      ]
    },
    {
      category: 'Lingkungan',
      goals: [
        'Menerapkan program bank sampah dan daur ulang',
        'Meningkatkan area hijau dan konservasi alam',
        'Menggunakan energi terbarukan untuk fasilitas publik',
        'Edukasi masyarakat tentang kelestarian lingkungan'
      ]
    }
  ];

  const values = [
    {
      name: 'Transparansi',
      description: 'Keterbukaan dalam pengelolaan pemerintahan dan pembangunan desa',
      color: 'bg-blue-500'
    },
    {
      name: 'Partisipatif',
      description: 'Melibatkan seluruh elemen masyarakat dalam proses pembangunan',
      color: 'bg-green-500'
    },
    {
      name: 'Inovatif',
      description: 'Mengadopsi teknologi dan metode terbaru untuk kemajuan desa',
      color: 'bg-purple-500'
    },
    {
      name: 'Berkelanjutan',
      description: 'Pembangunan yang mempertimbangkan aspek ekonomi, sosial, dan lingkungan',
      color: 'bg-orange-500'
    },
    {
      name: 'Akuntabel',
      description: 'Bertanggung jawab dalam setiap kebijakan dan penggunaan sumber daya',
      color: 'bg-red-500'
    },
    {
      name: 'Inklusif',
      description: 'Memastikan tidak ada yang tertinggal dalam pembangunan desa',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <PageLayout
      title="Visi & Misi Desa"
      subtitle="Arah pembangunan dan cita-cita bersama menuju masa depan yang lebih baik"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa' },
        { name: 'Visi & Misi' }
      ]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Visi */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-village-green to-blue-600 rounded-3xl p-12 text-white">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">VISI DESA FAJAR BARU</h2>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <blockquote className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold leading-relaxed italic">
                    "Menjadi Desa Mandiri, Modern, dan Berkelanjutan yang Berlandaskan Teknologi Digital 
                    dengan Tetap Melestarikan Nilai-nilai Budaya Lokal untuk Kesejahteraan Bersama"
                  </p>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Misi */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-village-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">MISI DESA FAJAR BARU</h2>
              <p className="text-xl text-gray-600">Langkah konkret untuk mewujudkan visi desa</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {misiList.map((misi, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-village-green to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <misi.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{misi.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{misi.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nilai-nilai Dasar */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Nilai-nilai Dasar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.name}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tujuan Strategis */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Tujuan Strategis Pembangunan</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {strategicGoals.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-village-green mb-6">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.goals.map((goal, goalIndex) => (
                      <li key={goalIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-village-green rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default VisiMisiPage;
