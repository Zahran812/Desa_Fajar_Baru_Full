import PageLayout from '@/react-app/components/PageLayout';
import { ClipboardList, DollarSign, Map, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

type DokumentasiItem = {
  namaJalan: string;
  slug: string;
  sebelum: string[];
  sesudah: string[];
};

const dokumentasiData: DokumentasiItem[] = [
  {
    namaJalan: 'Jalan Abu Kahar',
    slug: 'FOTO-JALAN-ABU-KAHAR',
    sebelum: [
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-ABU-KAHAR-SEBELUM/WhatsApp Image 2025-11-24 at 10.28.45 (1).jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-ABU-KAHAR-SEBELUM/WhatsApp Image 2025-11-24 at 10.28.45.jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-ABU-KAHAR-SEBELUM/WhatsApp Image 2025-11-24 at 10.28.47.jpeg`,
    ],
    sesudah: [
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sesudah/FOTO-JALAN-ABU-KAHAR-SESUDAH/WhatsApp Image 2025-11-24 at 10.28.47 (1).jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sesudah/FOTO-JALAN-ABU-KAHAR-SESUDAH/WhatsApp Image 2025-11-24 at 10.28.47 (2).jpeg`,
    ],
  },
  {
    namaJalan: 'Jalan Gemilang',
    slug: 'FOTO-JALAN-GEMILANG',
    sebelum: [
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-GEMILANG-SEBELUM/WhatsApp Image 2025-11-24 at 10.34.29 (1).jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-GEMILANG-SEBELUM/WhatsApp Image 2025-11-24 at 10.34.29.jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-GEMILANG-SEBELUM/WhatsApp Image 2025-11-24 at 10.34.34.jpeg`,
    ],
    sesudah: [
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sesudah/FOTO-JALAN-GEMILANG-SESUDAH/WhatsApp Image 2025-11-24 at 10.34.30.jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sesudah/FOTO-JALAN-GEMILANG-SESUDAH/WhatsApp Image 2025-11-24 at 10.34.34 (1).jpeg`,
    ],
  },
  {
    namaJalan: 'Jalan Malaya',
    slug: 'FOTO-JALAN-MALAYA',
    sebelum: [
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-MALAYA-SEBELUM/WhatsApp Image 2025-11-24 at 10.45.46.jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sebelum/FOTO-JALAN-MALAYA-SEBELUM/WhatsApp Image 2025-11-24 at 10.45.48.jpeg`,
    ],
    sesudah: [
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sesudah/FOTO-JALAN-MALAYA-SESUDAH/WhatsApp Image 2025-11-24 at 10.45.49 (1).jpeg`,
      `${import.meta.env.BASE_URL}transparansi/laporan-pembangunan/dokumentasi-pembangunan-sesudah/FOTO-JALAN-MALAYA-SESUDAH/WhatsApp Image 2025-11-24 at 10.45.49.jpeg`,
    ],
  },
];

const useAutoSlider = (length: number, delay = 4000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(id);
  }, [length, delay]);

  return [index, setIndex] as const;
};

type SliderProps = {
  title: string;
  images: string[];
  posisi: 'sebelum' | 'sesudah';
};

const DokumentasiSlider = ({ title, images, posisi }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useAutoSlider(images.length);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 overflow-hidden h-full flex flex-col">
        <div className="flex-1 h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-xs text-gray-400">
          Area foto {posisi}
        </div>
        <div className="px-4 py-3 bg-white">
          <p className="text-xs text-gray-500 mb-1">Foto {posisi} jalan dibangun</p>
          <p className="text-sm text-gray-600">Dokumentasi belum tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden bg-white flex flex-col h-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${title} - ${posisi} - Foto ${idx + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-4 bg-emerald-500' : 'w-2 bg-white/60'
                }`}
                aria-label={`Pilih foto ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-0.5">
          Foto {posisi} jalan dibangun
        </p>
        <p className="text-sm font-medium text-gray-800 line-clamp-1">{title}</p>
      </div>
    </div>
  );
};

const PembangunanPage = () => {

  return (
    <PageLayout
      title="Laporan Pembangunan Desa"
      subtitle="Transparansi progres dan realisasi pembangunan infrastruktur dan fasilitas desa"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'Laporan Pembangunan' }
      ]}
    >
      <div className="py-12 lg:py-16">
        <div className="container mx-auto px-4 space-y-10 lg:space-y-12">

          {/* Ringkasan Proyek 2024–2025 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Laporan Pembangunan Desa</h2>
                <p className="text-sm lg:text-base text-gray-600">Ringkasan Proyek 2024–2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="rounded-xl bg-emerald-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Total Proyek 2024–2025</p>
                <p className="text-xl font-bold text-emerald-700">19 proyek</p>
              </div>
              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Proyek Selesai</p>
                <p className="text-xl font-bold text-blue-700">18 proyek</p>
              </div>
              <div className="rounded-xl bg-yellow-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Proyek Berjalan</p>
                <p className="text-xl font-bold text-yellow-700">1 proyek</p>
              </div>
            </div>
          </section>

          {/* Anggaran 2025–2026 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Anggaran Pembangunan</h2>
                <p className="text-sm lg:text-base text-gray-600">Periode 2025–2026</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Total pagu anggaran yang diajukan</p>
                <p className="text-lg font-semibold text-gray-900">Rp 370.000.000</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Total pagu anggaran yang sudah direalisasikan</p>
                <p className="text-lg font-semibold text-gray-900">Rp 0</p>
              </div>
            </div>
          </section>

          {/* Infrastruktur Jalan */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Map className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Kategori Pembangunan: Infrastruktur Jalan</h2>
                <p className="text-sm lg:text-base text-gray-600">Ringkasan capaian pembangunan infrastruktur jalan desa.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Total proyek infrastruktur jalan</p>
                <p className="text-lg font-semibold text-gray-900">5 proyek</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Total anggaran proyek infrastruktur jalan</p>
                <p className="text-lg font-semibold text-gray-900">Rp 5.000.000.000</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Total panjang pembangunan jalan</p>
                <p className="text-lg font-semibold text-gray-900">894 km</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Persentase progres pembangunan jalan</p>
                <p className="text-lg font-semibold text-gray-900">80%</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Progress keseluruhan infrastruktur jalan</p>
                <p className="text-sm font-semibold text-emerald-700">80%</p>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: '80%' }} />
              </div>
            </div>
          </section>

          {/* Dokumentasi */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Dokumentasi Pembangunan</h2>
                <p className="text-sm lg:text-base text-gray-600">Dokumentasi kondisi sebelum dan sesudah pembangunan infrastruktur jalan.</p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              {dokumentasiData.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 lg:p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">Dokumentasi Jalan</p>
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900">{item.namaJalan}</h3>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Foto akan berganti secara otomatis untuk menampilkan seluruh dokumentasi.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <DokumentasiSlider
                      title={item.namaJalan}
                      images={item.sebelum}
                      posisi="sebelum"
                    />
                    <DokumentasiSlider
                      title={item.namaJalan}
                      images={item.sesudah}
                      posisi="sesudah"
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs text-gray-500">Catatan: Dokumentasi foto disimpan di arsip Desa Fajar Baru dan dapat ditampilkan atau diperbarui sesuai kebutuhan.</p>
          </section>

        </div>
      </div>
    </PageLayout>
  );
};

export default PembangunanPage;
