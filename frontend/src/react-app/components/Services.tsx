import { useState } from 'react';
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
import { useContentAnimation } from '@/react-app/hooks/useContentAnimation';

const Services = () => {
  const { user } = useAuth();
  const { isVisible: headerVisible, elementRef: headerRef } = useContentAnimation();
  const { isVisible: contentVisible, elementRef: contentRef } = useContentAnimation({ delay: 200 });
  
  const [selectedService, setSelectedService] = useState('domisili');

  const services = [
    {
      id: 'domisili',
      title: 'Surat Keterangan Domisili',
      description: 'Surat yang menyatakan tempat tinggal/domisili seseorang untuk berbagai keperluan administrasi.',
      icon: Home,
      color: 'from-emerald-500 to-blue-500',
      requirements: [
        'Fotocopy KTP yang masih berlaku',
        'Fotocopy Kartu Keluarga',
        'Surat pengantar dari RT/RW',
        'Pas foto 3x4 sebanyak 2 lembar'
      ],
      processing_time: '3 hari kerja',
      status: 'online'
    },
    {
      id: 'kk',
      title: 'Kartu Keluarga',
      description: 'Pembuatan, perubahan, atau penambahan anggota keluarga dalam Kartu Keluarga.',
      icon: Users,
      color: 'from-blue-500 to-emerald-500',
      requirements: [
        'Fotocopy KTP kepala keluarga',
        'Fotocopy akta nikah (jika ada)',
        'Fotocopy akta kelahiran anak',
        'Surat pengantar dari RT/RW',
        'Formulir perubahan KK'
      ],
      processing_time: '5 hari kerja',
      status: 'online'
    },
    {
      id: 'kelahiran',
      title: 'Akta Kelahiran',
      description: 'Pengurusan akta kelahiran untuk bayi yang baru lahir atau penggantian akta yang hilang.',
      icon: Baby,
      color: 'from-emerald-500 to-blue-500',
      requirements: [
        'Surat keterangan lahir dari bidan/dokter',
        'Fotocopy KTP kedua orang tua',
        'Fotocopy akta nikah orang tua',
        'Fotocopy Kartu Keluarga',
        'Surat keterangan dari kelurahan'
      ],
      processing_time: '7 hari kerja',
      status: 'online'
    },
    {
      id: 'pindah',
      title: 'Surat Pindah',
      description: 'Surat keterangan pindah domisili untuk perpindahan dalam atau luar kota/kabupaten.',
      icon: UserPlus,
      color: 'from-blue-500 to-emerald-500',
      requirements: [
        'Fotocopy KTP yang akan pindah',
        'Fotocopy Kartu Keluarga',
        'Surat pengantar dari RT/RW',
        'Surat keterangan dari tempat tujuan',
        'Alasan kepindahan'
      ],
      processing_time: '3 hari kerja',
      status: 'online'
    },
    {
      id: 'usaha',
      title: 'Surat Keterangan Usaha',
      description: 'Surat yang menyatakan bahwa seseorang memiliki usaha untuk keperluan kredit atau perizinan.',
      icon: Briefcase,
      color: 'from-emerald-500 to-blue-500',
      requirements: [
        'Fotocopy KTP pemilik usaha',
        'Fotocopy Kartu Keluarga',
        'Foto tempat usaha',
        'Surat pengantar dari RT/RW',
        'Keterangan jenis usaha'
      ],
      processing_time: '5 hari kerja',
      status: 'online'
    },
    {
      id: 'sekolah',
      title: 'Surat Keterangan Sekolah',
      description: 'Surat keterangan untuk keperluan pendidikan, beasiswa, atau administrasi sekolah.',
      icon: GraduationCap,
      color: 'from-blue-500 to-emerald-500',
      requirements: [
        'Fotocopy KTP orang tua/wali',
        'Fotocopy Kartu Keluarga',
        'Fotocopy rapor atau ijazah terakhir',
        'Surat pengantar dari sekolah',
        'Surat pengantar dari RT/RW'
      ],
      processing_time: '3 hari kerja',
      status: 'online'
    }
  ];

  const currentService = services.find(service => service.id === selectedService) || services[0];

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

  return (
    <section id="pelayanan" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef as any}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Layanan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Akses mudah dan cepat untuk berbagai layanan administrasi desa secara online
          </p>
        </div>

        {/* Main Content */}
        <div 
          ref={contentRef as any}
          className={`${contentVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
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
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Details */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${currentService.color}`}>
                    <currentService.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {currentService.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentService.description}
                    </p>
                  </div>
                </div>

                {/* Processing Time */}
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Waktu Proses: {currentService.processing_time}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Requirements & Action */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Syarat & Ketentuan</span>
              </h3>

              {/* Requirements */}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
