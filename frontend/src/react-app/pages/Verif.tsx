import { CheckCircle, MapPin, Shield } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';

const VERIF_DETAILS = {
  signedBy: 'Agus Budiantoro, S.HI - Kepala Desa Fajar Baru',
  signedAt: '12 Desember 2025, 10:15 WIB (Lokal)',
  location: 'Balai Desa Fajar Baru, Kec. Jati Agung, Kab. Lampung Selatan',
  subject: 'Surat Pernyataan Pelayanan UMKM Desa Fajar Baru [021/SK-DESA/FJB/2025]',
  status: 'Dokumen Valid',
};

const VerifPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                <Shield className="w-4 h-4" />
                Verifikasi Dokumen Desa
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Bukti Tanda Tangan Resmi Kepala Desa Fajar Baru
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Halaman ini menjelaskan bahwa surat resmi Desa Fajar Baru telah ditandatangani dan
                disahkan langsung oleh Kepala Desa. Nomor surat, waktu validasi, serta lokasi dapat
                dipertanggungjawabkan sebagai bukti otentikasi.
              </p>
            </div>

            <section className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Detail</h2>
                <div className="flex items-center gap-1 text-sm text-emerald-600 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  {VERIF_DETAILS.status}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-emerald-500">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-gray-500">Status</p>
                    <p className="text-md font-semibold text-gray-800">{VERIF_DETAILS.status}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Dokumen telah ditandatangani oleh aparat terkait dan terdaftar dalam sistem
                      administrasi Desa Fajar Baru.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-[0.15em]">Ditandatangani oleh</p>
                  <p className="text-sm font-semibold text-gray-700 mt-2">{VERIF_DETAILS.signedBy}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Lokasi</p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <p className="text-sm font-semibold">{VERIF_DETAILS.location}</p>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default VerifPage;
