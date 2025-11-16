import PageLayout from '@/react-app/components/PageLayout';
import { Award, Heart, Building2, Users, Briefcase, Home, Church, Sprout, UsersRound } from 'lucide-react';
import { useState, useEffect } from 'react';

const PejabatStruktural = () => {
  // Fungsi pemerintahan carousel state
  const [currentFungsiSlide, setCurrentFungsiSlide] = useState(0);

  // Fungsi Pemerintahan Data
  const fungsiPemerintahan = [
    {
      nama: 'Pelaksanaan Kegiatan Pemerintahan',
      deskripsi: 'Menjalankan urusan pemerintahan di tingkat desa',
      color: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      nama: 'Pemberdayaan Masyarakat',
      deskripsi: 'Meningkatkan kapasitas dan partisipasi masyarakat',
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      nama: 'Pelayanan Masyarakat',
      deskripsi: 'Memberikan layanan administrasi kepada warga',
      color: 'bg-teal-50',
      textColor: 'text-teal-700'
    },
    {
      nama: 'Ketentraman dan Ketertiban',
      deskripsi: 'Menjaga stabilitas keamanan desa',
      color: 'bg-cyan-50',
      textColor: 'text-cyan-700'
    },
    {
      nama: 'Pemeliharaan Prasarana',
      deskripsi: 'Merawat fasilitas pelayanan umum',
      color: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      nama: 'Pembinaan Lembaga',
      deskripsi: 'Mengembangkan organisasi kemasyarakatan',
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ];

  // Auto slide effect for fungsi pemerintahan (1 card per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFungsiSlide((prev) => (prev + 1) % fungsiPemerintahan.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageLayout
      title="Pejabat dan Struktural"
      subtitle="Struktur kepemimpinan dan perangkat desa yang profesional melayani masyarakat"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa' },
        { name: 'Pejabat dan Struktural' }
      ]}
    >
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Navigation Menu */}
          <div className="mb-12 md:mb-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center">Navigasi Struktur Organisasi</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <a href="#pemerintah-desa" className="flex flex-col items-center p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 group">
                  <Building2 className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">Pemerintah Desa</span>
                </a>
                <a href="#bpd" className="flex flex-col items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 group">
                  <Users className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">BPD</span>
                </a>
                <a href="#lpm" className="flex flex-col items-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200 group">
                  <UsersRound className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">LPM</span>
                </a>
                <a href="#pkk" className="flex flex-col items-center p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors border border-pink-200 group">
                  <Heart className="w-8 h-8 text-pink-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">PKK</span>
                </a>
                <a href="#karang-taruna" className="flex flex-col items-center p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-200 group">
                  <Users className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">Karang Taruna</span>
                </a>
                <a href="#bumdes" className="flex flex-col items-center p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-200 group">
                  <Briefcase className="w-8 h-8 text-teal-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">BUMDes</span>
                </a>
                <a href="#rt-rw" className="flex flex-col items-center p-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-colors border border-cyan-200 group">
                  <Home className="w-8 h-8 text-cyan-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">RT/RW</span>
                </a>
                <a href="#keagamaan" className="flex flex-col items-center p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200 group">
                  <Church className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">Lembaga Keagamaan</span>
                </a>
                <a href="#kelompok-tani" className="flex flex-col items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors border border-green-200 group">
                  <Sprout className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">Kelompok Tani</span>
                </a>
              </div>
            </div>
          </div>

          {/* PEMERINTAH DESA */}
          <section id="pemerintah-desa" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Pimpinan Desa Fajar Baru</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Kepemimpinan yang berkualitas untuk kemajuan dan kesejahteraan masyarakat</p>
            </div>
            
            {/* Kepala Desa - Hero Card */}
            <div className="mb-12 md:mb-16">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/50 rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-2xl border border-emerald-100/50 hover-lift hover-glow relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-full translate-y-24 -translate-x-24"></div>
                
                <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  {/* Photo Section */}
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <div className="relative inline-block">
                      <div className="w-72 h-80 md:w-80 md:h-96 lg:w-72 lg:h-80 xl:w-80 xl:h-96 mx-auto lg:mx-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-6 border-white/80 backdrop-blur-sm relative">
                        <img 
                          src="https://mocha-cdn.com/0199a380-4422-7144-b053-fdf82f04e8e4/image.png_4953.png" 
                          alt="M. Agus Budiantoro, S.HI - Kepala Desa Fajar Baru"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute -bottom-4 left-1/2 lg:left-4 transform -translate-x-1/2 lg:translate-x-0">
                        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-white">
                          <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base">Kepala Desa</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information Section */}
                  <div className="lg:col-span-3 text-center lg:text-left mt-8 lg:mt-0">
                    <div className="space-y-6">
                      {/* Name & Title */}
                      <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 leading-tight">
                          M. Agus Budiantoro, S.HI
                        </h3>
                        <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-2">Kepala Desa Fajar Baru</p>
                        <p className="text-lg text-gray-600">Kecamatan Jati Agung, Kabupaten Lampung Selatan</p>
                      </div>

                      {/* Quote */}
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                        <blockquote className="text-lg md:text-xl text-gray-700 italic font-medium leading-relaxed">
                          "Melayani dengan hati untuk kemajuan Desa Fajar Baru yang religius, bermartabat, maju, mandiri, sehat dan sejahtera"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for additional content */}
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <p className="text-gray-600">Informasi struktur organisasi lengkap sedang dalam proses pembaruan.</p>
            </div>

          </section>

        </div>
      </div>
    </PageLayout>
  );
};

export default PejabatStruktural;
