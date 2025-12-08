import { MapPin, Phone, Mail, Clock, ArrowLeft, ShoppingCart, Star, Globe, Download, ExternalLink } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { useNavigate } from 'react-router-dom';

const dummyProducts = [
  {
    name: 'Kain Tapis Motif Gajah',
    price: 3500000,
    description: 'Kain tapis dengan motif gajah khas lampung, benang emas asli',
    image: '',
  },
  {
    name: 'Kain Tapis Motif Kapal',
    price: 3000000,
    description: 'Kain tapis dengan motif kapal tradisional Lampung',
    image: '',
  },
  {
    name: 'Tas Tapis Modern',
    price: 550000,
    description: 'Tas dengan bahan kain tapis untuk gaya modern',
    image: '',
  },
];

const unitData = {
  id: 'lampung-ethnica',
  name: 'Lampung Ethnica - Kain Tapis Lampung',
  address: 'Jl. Raya Sukadana No. 45, Sukadana, Lampung Timur',
  phone: '+62 812-7300-0001',
  email: 'lampungethnica@example.com',
  established: '2015',
  description: 'Produsen dan penjual kain tapis khas Lampung dengan motif tradisional yang telah terstandarisasi. Setiap kain dibuat dengan teknik tenun tradisional dan pewarna berkualitas.',
  instagram: '@lampungethnica',
  facebook: 'Lampung Ethnica',
  website: 'www.lampungethnica.com',
  category: 'Kerajinan',
  rating: 5,
  reviews: 2,
  image: '',
};

const BusinessUnitUMKMDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-700 mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar UMKM
        </button>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
              <img
                src={unitData.image}
                alt={unitData.name}
                className="object-cover w-full h-full"
                onError={e => {
                  e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20400%20200%22%3E%3Crect%20width%3D%22400%22%20height%3D%22200%22%20fill%3D%22%23E5E7EB%22/%3E%3Ctext%20x%3D%22200%22%20y%3D%22110%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%239CA3AF%22%3EKerajinan%3C/text%3E%3C/svg%3E';
                }}
              />
              <span className="absolute top-2 right-2 bg-white/80 text-gray-700 px-3 py-1 rounded text-xs font-semibold">{unitData.category}</span>
            </div>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              Hubungi UMKM
            </button>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">{unitData.name}</h1>
            <div className="flex items-center mb-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold text-yellow-600 mr-1">{unitData.rating}</span>
              <span className="text-gray-500 text-sm">({unitData.reviews} ulasan)</span>
            </div>
            <ul className="space-y-1 mb-4 text-sm">
              <li className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-400" /> <span>Alamat</span>: {unitData.address}</li>
              <li className="flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-400" /> <span>Telepon</span>: {unitData.phone}</li>
              <li className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400" /> <span>Email</span>: {unitData.email}</li>
              <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> <span>Tahun Berdiri</span>: {unitData.established}</li>
            </ul>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Deskripsi</h2>
              <p className="text-gray-700 text-sm">{unitData.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">instagram: {unitData.instagram}</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">facebook: {unitData.facebook}</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">website: {unitData.website}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="border border-gray-300 rounded p-2 hover:bg-gray-100"><ExternalLink className="w-4 h-4" /></button>
              <button className="border border-gray-300 rounded p-2 hover:bg-gray-100"><Download className="w-4 h-4" /></button>
              <button className="border border-gray-300 rounded p-2 hover:bg-gray-100"><Globe className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="border-b border-gray-200 flex">
            <button className="px-4 py-2 text-green-700 border-b-2 border-green-700 font-semibold">Produk</button>
            <button className="px-4 py-2 text-gray-400">Ulasan</button>
            <button className="px-4 py-2 text-gray-400">Tentang UMKM</button>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-4">Produk dari {unitData.name}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {dummyProducts.map((product, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col">
                  <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      onError={e => {
                        e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20200%20100%22%3E%3Crect%20width%3D%22200%22%20height%3D%22100%22%20fill%3D%22%23F3F4F6%22/%3E%3Ctext%20x%3D%22100%22%20y%3D%2255%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%20fill%3D%22%239CA3AF%22%3EProduk%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm truncate">{product.name}</span>
                      <span className="font-bold text-green-700 text-sm">Rp{product.price.toLocaleString('id-ID')}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center text-sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Pesan Produk
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default BusinessUnitUMKMDetail;
