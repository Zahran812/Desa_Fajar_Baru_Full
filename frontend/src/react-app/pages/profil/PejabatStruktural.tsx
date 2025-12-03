import PageLayout from '@/react-app/components/PageLayout';
import { Award, Heart, Building2, Users, Briefcase, UsersRound, Shield, Baby, Home } from 'lucide-react';

const formatUrl = (folder: string, file: string) => {
  // URLs should be relative to the public folder
  return `${import.meta.env.BASE_URL}pejabat-dan-struktural/${folder}/${file}`;
};
const kepalaDusunList = [
  { name: 'Suryadi', dusun: 'Dusun 1' },
  { name: 'Junaidi, S.H', dusun: 'Dusun 2A' },
  { name: 'Ahmad Isnadi', dusun: 'Dusun 2B' },
  { name: 'Suroso Waris', dusun: 'Dusun 3A' },
  { name: 'Paino', dusun: 'Dusun 3B' },
  { name: 'Mujiyo', dusun: 'Dusun 4' },
  { name: 'Apriyanto', dusun: 'Dusun 5' },
  { name: 'Sumber Hidayat', dusun: 'Dusun 6' }
];

const kepalaSeksiList = [
  { name: 'Yunani', role: 'Kasi Pemerintahan', photo: 'yunani-kasi-pemerintahan.jpeg' },
  { name: 'Ponisih', role: 'Kasi Pelayanan', photo: 'ponisih-kasi-pelayanan.jpg' },
  { name: 'Hadi Johan', role: 'Kasi Kesejahteraan', photo: 'hadi-johan-kasi-kesejahteraan.jpeg' },
  { name: 'Tri Wahita Hanuji', role: 'Kaur Perencanaan', photo: 'tri-wahita-hanuji-kaur-perencanaan.jpeg' },
  { name: 'Vivi Atika Pertiwi, A.Md.Kom.', role: 'Kaur Keuangan', photo: 'rahmani-diah-permatasari-operator-desa.jpeg' },
  { name: 'Bintari Mayasari, A.Md', role: 'Kasi TU dan Umum', photo: 'bintari-mayasari-kaur-tu-dan-umum.jpeg' },
  { name: 'Hermin Susiloningsih', role: 'Staff Perpustakaan', photo: 'hermin-susiloninsih-pengurus-perpustakaan.jpeg' },
  { name: 'Rahmani Diah Permatasari, S.Pd', role: 'Operator Desa', photo: 'rahmani-diah-permatasari-operator-desa.jpeg' }
];

const PejabatStruktural = () => {
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
                          M. Agus Budiantoro, S.HI., M.H
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
          </section>

          {/* Tim Perangkat Desa */}
          <section id="tim-perangkat-desa" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="bg-gradient-to-br from-white via-emerald-50/50 to-blue-50/30 rounded-2xl md:rounded-3xl lg:rounded-[2rem] p-4 md:p-6 lg:p-8 shadow-xl border border-emerald-100 mt-12 md:mt-16">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Tim Perangkat Desa</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full mb-3 md:mb-4"></div>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg px-2">Struktur organisasi pemerintahan desa yang profesional</p>
              </div>

              <div className="space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 hover-lift hover-glow border border-emerald-100/50">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-24 sm:w-22 sm:h-26 md:w-24 md:h-30 lg:w-26 lg:h-32 rounded-lg md:rounded-xl overflow-hidden shadow-lg border-2 border-white bg-gray-100">
                          <img
                            src={formatUrl('tim-perangkat-desa', 'solichen-sekretaris-desa.jpg')}
                            alt="Solichen, S.Sos - Sekretaris Desa"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-2 py-1 rounded-md md:rounded-lg shadow-lg">
                            <span className="font-bold text-xs">Sekretaris</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1 truncate">Solichen, S.Sos</h4>
                        <p className="text-emerald-600 font-semibold text-sm md:text-base mb-1">Sekretaris Desa</p>
                        <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">
                          "Mengorganisir administrasi dengan teliti untuk pelayanan yang efektif dan transparan"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {kepalaSeksiList.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-emerald-100 bg-gray-50">
                          <img
                            src={member.photo ? formatUrl('tim-perangkat-desa', member.photo) : undefined}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm md:text-base">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 hover-lift hover-glow border border-emerald-100/50">
                  <div className="text-center mb-3 md:mb-4">
                    <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1">Kepala Dusun</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Pemimpin wilayah dusun</p>
                  </div>
                  <div className="space-y-3">
                    {kepalaDusunList.map((member, idx) => (
                      <div
                        key={`${member.name}-${idx}`}
                        className="flex items-center justify-between rounded-2xl p-3 md:p-4 text-left shadow-inner bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{member.name}</p>
                          <p className="text-xs md:text-sm text-gray-600">{member.dusun}</p>
                        </div>
                        <div className="text-emerald-600 text-sm font-bold">RT</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BPD */}
          <section id="bpd" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">BPD</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Badan Permusyawaratan Desa</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Lembaga perwakilan dan pengawasan pemerintahan desa</p>
            </div>

            {/* Struktur BPD */}
            <div className="bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/30 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-blue-100 mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Struktur BPD</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-3"></div>
                <p className="text-gray-600 text-lg">Pengurus Badan Permusyawaratan Desa</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Ketua BPD - Kolom Kiri */}
                <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-blue-100/50 hover-lift hover-glow relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-20 translate-x-20"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="w-32 h-36 md:w-40 md:h-44 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 backdrop-blur-sm relative bg-gradient-to-br from-blue-100 to-cyan-100">
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="w-16 h-16 md:w-20 md:h-20 text-blue-400" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg mb-3">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span className="font-bold text-sm">Ketua BPD</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                          Yahya Amto
                        </h3>
                        <p className="text-lg md:text-xl text-blue-600 font-semibold mb-1">Ketua Badan Permusyawaratan Desa</p>
                        <p className="text-sm text-gray-600">Lembaga Perwakilan & Pengawasan Desa</p>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <blockquote className="text-sm md:text-base text-gray-700 italic font-medium leading-relaxed">
                          "Menjembatani aspirasi masyarakat dan mengawal kebijakan desa untuk terwujudnya pemerintahan yang demokratis dan bertanggung jawab"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wakil Ketua & Sekretaris - Kolom Kanan */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center border-4 border-white shadow-md">
                        <Award className="w-10 h-10 text-blue-600" />
                      </div>
                      <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full mb-3 text-sm font-bold">Wakil Ketua</div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">Agus Sutrisno</h4>
                      <p className="text-sm text-gray-600">Wakil Ketua BPD</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center border-4 border-white shadow-md">
                        <Building2 className="w-10 h-10 text-blue-600" />
                      </div>
                      <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full mb-3 text-sm font-bold">Sekretaris</div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">Supriyatno</h4>
                      <p className="text-sm text-gray-600">Sekretaris BPD</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-gray-800">Anggota BPD</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {['Warish', 'Sahrowi', 'Ahmad Sanuri', 'Dewi Safitri', 'Diah Ayu Wulandari', 'Widya Wati'].map((name, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-3 border-l-3 border-blue-500 hover:bg-blue-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 text-sm">{name}</h5>
                        <p className="text-blue-600 text-xs font-medium">Anggota BPD</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PKK */}
          <section id="pkk" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6" />
                  <span className="font-bold text-lg">PKK</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Pemberdayaan Kesejahteraan Keluarga</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Gerakan pemberdayaan masyarakat untuk kesejahteraan keluarga</p>
            </div>

            {/* Ketua PKK - Hero Card */}
            <div className="mb-12 md:mb-16">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-2xl border border-emerald-100/50 hover-lift hover-glow relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-full translate-y-24 -translate-x-24"></div>
                
                <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  {/* Photo Section */}
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <div className="relative inline-block">
                      <div className="w-72 h-80 md:w-80 md:h-96 lg:w-72 lg:h-80 xl:w-80 xl:h-96 mx-auto lg:mx-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-6 border-white/80 backdrop-blur-sm relative bg-gradient-to-br from-emerald-100 to-teal-100">
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="w-32 h-32 text-emerald-400" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute -bottom-4 left-1/2 lg:left-4 transform -translate-x-1/2 lg:translate-x-0">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-2xl shadow-xl border-2 border-white">
                          <div className="flex items-center space-x-2">
                            <Heart className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base">Ketua PKK</span>
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
                          Eni Triyani, S.Pd
                        </h3>
                        <p className="text-base text-gray-600 mb-2">Sekretaris: Suryani | Bendahara: Herliana</p>
                        <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-2">Ketua PKK Desa Fajar Baru</p>
                        <p className="text-lg text-gray-600">Pemberdayaan Kesejahteraan Keluarga</p>
                      </div>

                      {/* Quote */}
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                        <blockquote className="text-lg md:text-xl text-gray-700 italic font-medium leading-relaxed">
                          "Memberdayakan keluarga untuk hidup lebih sejahtera, berkualitas, dan bermartabat melalui program-program pembinaan yang berkesinambungan"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PKK Pokja */}
            <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-emerald-100 mt-8">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Kelompok Kerja (Pokja) PKK</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-emerald-500">
                  <h5 className="font-bold text-gray-800 mb-2">Ketua Pokja I: Nurmi</h5>
                  <p className="text-sm text-gray-600">Anggota: Tri Wahita Hanuji, Fera Hernani, Salbiyah</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-teal-500">
                  <h5 className="font-bold text-gray-800 mb-2">Ketua Pokja II: Dewi Apriyani</h5>
                  <p className="text-sm text-gray-600">Anggota: Sukilah, Siti Aisyah, Yolan Yusnia</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-emerald-500">
                  <h5 className="font-bold text-gray-800 mb-2">Ketua Pokja III: Illa Nurohmah, S.Ag</h5>
                  <p className="text-sm text-gray-600">Anggota: Hermin Susiloningsih, Tumiyem, Rosita Rahmawati</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-teal-500">
                  <h5 className="font-bold text-gray-800 mb-2">Ketua Pokja IV: Hayati</h5>
                  <p className="text-sm text-gray-600">Anggota: Ponisih, Jamsah, Suhamah</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border-2 border-emerald-200">
                  <div className="text-center">
                    <p className="text-sm font-bold text-emerald-700 mb-1">UP2K</p>
                    <h5 className="font-bold text-gray-800 text-sm">Ketua: Fitri Yani</h5>
                    <p className="text-xs text-gray-600">Anggota: Nurwailah</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-4 border-2 border-teal-200">
                  <div className="text-center">
                    <p className="text-sm font-bold text-teal-700 mb-1">Dasa Wisma</p>
                    <h5 className="font-bold text-gray-800 text-sm">Siti Munawaroh</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Kader Posyandu */}
          <section id="posyandu" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <Baby className="w-6 h-6" />
                  <span className="font-bold text-lg">Kader Posyandu</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Kader Posyandu</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-rose-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Tenaga kesehatan sukarela untuk pelayanan ibu dan anak</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-pink-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Baby className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Melati 1</h4>
                    <p className="text-xs text-gray-600">Dusun 1</p>
                  </div>
                </div>
                <div className="bg-pink-50 rounded p-2 mb-2">
                  <p className="text-sm font-bold text-gray-800">Ketua: Suhamah</p>
                </div>
                <p className="text-xs text-gray-600">Anggota: Ita Yunita, Sanah, Novi Anggraeni, Fitri Akvaleni</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-pink-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Baby className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Melati 2</h4>
                    <p className="text-xs text-gray-600">Dusun 2A dan 2B</p>
                  </div>
                </div>
                <div className="bg-rose-50 rounded p-2 mb-2">
                  <p className="text-sm font-bold text-gray-800">Ketua: Sutiyah</p>
                </div>
                <p className="text-xs text-gray-600">Anggota: Suci Dwi Lestari, Pepri Sri Wahyuni, Karyati, Siti Aisyah</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-pink-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Baby className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Dahlia</h4>
                    <p className="text-xs text-gray-600">Dusun 3B</p>
                  </div>
                </div>
                <div className="bg-pink-50 rounded p-2 mb-2">
                  <p className="text-sm font-bold text-gray-800">Ketua: Herliana</p>
                </div>
                <p className="text-xs text-gray-600">Anggota: Jariah, Iin Sumarni, Suryani, Nurlaila</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-pink-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Baby className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Melati 3</h4>
                    <p className="text-xs text-gray-600">Dusun 3A</p>
                  </div>
                </div>
                <div className="bg-rose-50 rounded p-2 mb-2">
                  <p className="text-sm font-bold text-gray-800">Ketua: Upami</p>
                </div>
                <p className="text-xs text-gray-600">Anggota: Sutati, Agustini, Sugiarti, Sukarmi</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-pink-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Baby className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Melati 4</h4>
                    <p className="text-xs text-gray-600">Dusun 5</p>
                  </div>
                </div>
                <div className="bg-pink-50 rounded p-2 mb-2">
                  <p className="text-sm font-bold text-gray-800">Ketua: Indra Susanti</p>
                </div>
                <p className="text-xs text-gray-600">Anggota: Sugi Astuti, Suprapti, Suratmi, Yuliani</p>
              </div>
            </div>
          </section>

          {/* LINMAS */}
          <section id="linmas" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6" />
                  <span className="font-bold text-lg">LINMAS</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Perlindungan Masyarakat</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Tim keamanan dan ketertiban desa</p>
            </div>

            <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-orange-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full mb-3">
                  <span className="font-bold">Ketua: Risdawati</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {['Rito Edi Prabowo', 'Andri', 'Tarhim', 'Supiah', 'Hendrik', 'Riduan', 'Adi Kurniawan', 'Suparno', 'Rio Aprianto', 'Musilawati', 'Asep Hidayat', 'Ahmad Zanni', 'Samin', 'Warsidi', 'Aep', 'Hendi', 'Rojali', 'Suryanto', 'Bagas', 'Nuraini', 'Suparjo', 'Sakimin', 'Purwanto'].map((name, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                        <Shield className="w-3 h-3 text-orange-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LPM */}
          <section id="lpm" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <UsersRound className="w-6 h-6" />
                  <span className="font-bold text-lg">LPM</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Lembaga Pemberdayaan Masyarakat</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Lembaga yang menggerakkan partisipasi masyarakat dalam pembangunan</p>
            </div>

            <div className="bg-gradient-to-br from-white via-cyan-50/50 to-blue-50/30 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-cyan-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Struktur LPM</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full mb-3"></div>
                <p className="text-gray-600 text-lg">Penggerak partisipasi masyarakat dalam pembangunan desa</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-200">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                      <UsersRound className="w-10 h-10 text-cyan-600" />
                    </div>
                    <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full mb-2 text-sm font-bold">Ketua</div>
                    <h4 className="text-lg font-bold text-gray-800">Jauhari</h4>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-200">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                      <Briefcase className="w-10 h-10 text-cyan-600" />
                    </div>
                    <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full mb-2 text-sm font-bold">Bendahara</div>
                    <h4 className="text-lg font-bold text-gray-800">Sindi Ardyanti</h4>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-200">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-cyan-600" />
                    </div>
                    <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full mb-2 text-sm font-bold">Sekretaris</div>
                    <h4 className="text-lg font-bold text-gray-800">Disko Akademi</h4>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-gray-800">Anggota LPM</h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {['Edi Nugroho', 'Septo', 'Imam Beri', 'Asep', 'Darsida', 'Irwan'].map((name, idx) => (
                  <div key={idx} className="bg-cyan-50 rounded-lg p-3 border border-cyan-200 hover:bg-cyan-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-cyan-100 rounded flex items-center justify-center flex-shrink-0">
                        <Users className="w-3 h-3 text-cyan-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* KETUA RT */}
          <section id="ketua-rt" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <Home className="w-6 h-6" />
                  <span className="font-bold text-lg">Ketua RT</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Ketua RT Se-Desa Fajar Baru</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Pemimpin rukun tetangga di seluruh dusun</p>
            </div>

            <div className="space-y-8">
              {/* DUSUN 1 */}
              <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-indigo-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 1</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {name: 'HARYONO', rt: '001'},
                    {name: 'HANAFIT', rt: '002'},
                    {name: 'MULYADI YUSUF', rt: '003'},
                    {name: 'CDI PERMANTO', rt: '004'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-indigo-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUSUN 2B */}
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-blue-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 2B</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {name: 'AHMAD', rt: '001'},
                    {name: 'SUHARIYADI', rt: '002'},
                    {name: 'WAHID', rt: '003'},
                    {name: 'NADIRSYAH', rt: '004'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-blue-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUSUN 2A */}
              <div className="bg-gradient-to-br from-white to-cyan-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-cyan-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 2A</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {name: 'SISWANTI', rt: '001'},
                    {name: 'SITI AISYAH', rt: '002'},
                    {name: 'ARIS PURWANTO', rt: '003'},
                    {name: 'SITI MUNAWAROH', rt: '005'},
                    {name: 'JOKO SANTOSO', rt: '006'},
                    {name: 'HAMZAH', rt: '007'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-cyan-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-cyan-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUSUN 3A */}
              <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-emerald-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 3A</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {name: 'SUDARMAN', rt: '001'},
                    {name: 'ARISMANSYAH', rt: '002'},
                    {name: 'SUYANTO', rt: '003'},
                    {name: 'SUMARDI', rt: '004'},
                    {name: 'SAHRONI', rt: '005'},
                    {name: 'AGUS MUJIYANTO', rt: '006'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-emerald-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-emerald-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUSUN 3B */}
              <div className="bg-gradient-to-br from-white to-teal-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-teal-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 3B</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {name: 'ARIEYANTO WERTHA', rt: '002'},
                    {name: 'NURMANSYAH', rt: '003'},
                    {name: 'ROSSA INDRIANI, SE', rt: '004'},
                    {name: 'ANGGI MARALANTI', rt: '005A'},
                    {name: 'SURYANI', rt: '005B'},
                    {name: 'MUN\'IM IHSAN', rt: '007A'},
                    {name: 'PRATIWI', rt: '007B'},
                    {name: 'RUSLAN AZIZ', rt: '006'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-teal-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-teal-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUSUN 4 */}
              <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 4</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    {name: 'HERDIYANSYAH', rt: '001'},
                    {name: 'WARSONO', rt: '002'},
                    {name: 'WAKIDI', rt: '003'},
                    {name: 'SUGIMAN', rt: '004'},
                    {name: 'SUHARNO', rt: '005'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-purple-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUSUN 5 */}
              <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-rose-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Dusun 5</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {name: 'MULYADI', rt: '001'},
                    {name: 'SURANTO', rt: '002'},
                    {name: 'JUMALI', rt: '003'},
                    {name: 'ADE HERMAWAN', rt: '004'}
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-rose-100 hover:shadow-lg transition-shadow">
                      <div className="text-center">
                        <div className="inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold mb-2">RT {item.rt}</div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
                        <p className="text-xs text-rose-600 mt-1">Ketua RT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Fungsi Pemerintahan Desa */}
          <section id="fungsi-pemerintahan" className="mb-16 md:mb-20 scroll-mt-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full mb-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-6 h-6" />
                  <span className="font-bold text-lg">Fungsi Pemerintahan</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Fungsi Pemerintahan Desa</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Tugas dan kewenangan pemerintahan desa dalam melayani masyarakat</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fungsiPemerintahan.map((fungsi, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${fungsi.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Building2 className={`w-8 h-8 md:w-10 md:h-10 ${fungsi.textColor}`} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 ${fungsi.textColor}`}>
                      {fungsi.nama}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {fungsi.deskripsi}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className={`mt-6 h-1 w-20 ${fungsi.color} mx-auto rounded-full`}></div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border-l-4 border-emerald-500">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Komitmen Pelayanan</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Pemerintah Desa Fajar Baru berkomitmen untuk menjalankan seluruh fungsi pemerintahan dengan baik, 
                    transparan, dan akuntabel demi terwujudnya masyarakat yang sejahtera, maju, dan bermartabat.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PageLayout>
  );
};

export default PejabatStruktural;
