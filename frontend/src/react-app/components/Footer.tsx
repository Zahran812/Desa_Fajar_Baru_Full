import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  // Website statistics data structure for future implementation
  const websiteStats = {
    todayVisitors: 256,
    monthlyVisitors: 12834,
    totalVisitors: 145672,
    onlineUsers: 18,
    lastUpdated: new Date().toLocaleTimeString('id-ID')
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:text-red-500' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://mocha-cdn.com/01998bf8-465d-7ec6-a55e-1c243b53c352/LrSjPPUnIW.png" 
                alt="Logo Desa Fajar Baru" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-village-green">Desa Fajar Baru</h3>
                <p className="text-sm text-gray-400">Smart Village</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Portal digital resmi Desa Fajar Baru yang menyediakan informasi dan layanan administrasi untuk kemudahan masyarakat.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 bg-gray-800 rounded-lg transition-colors duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Website Traffic Statistics */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-village-green">Statistik Pengunjung</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Hari Ini</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">{websiteStats.todayVisitors.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Bulan Ini</span>
                <span className="text-white font-semibold">{websiteStats.monthlyVisitors.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Total Kunjungan</span>
                <span className="text-white font-semibold">{websiteStats.totalVisitors.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Online Sekarang</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">{websiteStats.onlineUsers}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Update terakhir: {websiteStats.lastUpdated}
                </p>
              </div>
            </div>
          </div>

          {/* Website Performance Stats */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-village-green">Performa Website</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Kecepatan Loading</span>
                  <span className="text-green-400 font-medium">2.3s</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Uptime</span>
                  <span className="text-green-400 font-medium">99.8%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '99.8%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Kepuasan User</span>
                  <span className="text-blue-400 font-medium">4.7/5</span>
                </div>
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <div 
                      key={star}
                      className={`w-3 h-3 rounded-sm ${star <= 4 ? 'bg-yellow-400' : 'bg-gray-600'}`}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-xs text-gray-400">
                  Status: <span className="text-green-400 font-medium">Semua sistem normal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-village-green">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-village-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Jl. Raya Fajar Baru No. 123<br />
                    Kec. Way Sulan, Lampung Selatan<br />
                    Lampung 35365
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-village-green" />
                <a href="tel:+62721123456" className="text-gray-300 hover:text-village-green text-sm">
                  (0721) 123-456
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-village-green" />
                <a href="mailto:admin@desafajarbaru.id" className="text-gray-300 hover:text-village-green text-sm">
                  admin@desafajarbaru.id
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-village-green mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p>Senin - Jumat: 08:00 - 16:00</p>
                  <p>Sabtu: 08:00 - 12:00</p>
                  <p>Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Desa Fajar Baru. Seluruh hak cipta dilindungi.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-village-green transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-village-green transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-gray-400 hover:text-village-green transition-colors flex items-center space-x-1">
                <span>Sitemap</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
