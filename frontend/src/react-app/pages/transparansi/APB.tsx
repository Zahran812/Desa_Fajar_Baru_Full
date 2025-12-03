import { useMemo, useState } from 'react';
import PageLayout from '@/react-app/components/PageLayout';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calculator,
  Target,
  Download
} from 'lucide-react';

interface DocumentEntry {
  title: string;
  description: string;
  thumbnail: string;
  downloadUrl: string;
  size?: string;
  date: string;
}

const APBPage = () => {
  const summary2025 = {
    year: 2025,
    income: 2010413837,
    expense: 2181957289.34,
    previousSurplus: 171543452.34
  };

  const fiveYearTrend = [
    { year: 2020, income: 1952595281.24, expense: 2000244778, surplus: 80408226.79 },
    { year: 2021, income: 1854437419.38, expense: 1829884136, surplus: 104981510.17 },
    { year: 2022, income: 1931301159.34, expense: 1923029807, surplus: 113898682.51 },
    { year: 2023, income: 1850339589.19, expense: 1862357181, surplus: 101152270.7 },
    { year: 2024, income: 2105777723.64, expense: 2035386542, surplus: 171543452.34 }
  ];

  const [selectedYear, setSelectedYear] = useState<number>(fiveYearTrend[0].year);
  const selectedTrend = useMemo(
    () => fiveYearTrend.find((trend) => trend.year === selectedYear) ?? fiveYearTrend[0],
    [selectedYear]
  );

  const revenueSources = [
    { label: 'Dana Desa', amount: 1480147000, share: 64.5, description: 'Dana transfer pusat untuk pembangunan prioritas dan pemberdayaan.' },
    { label: 'Alokasi Dana Desa (ADD)', amount: 509253828, share: 22.2, description: 'Dana perimbangan dari pemerintah kabupaten khusus untuk perangkat desa.' },
    { label: 'Bagi Hasil Pajak & Retribusi', amount: 15000000, share: 0.6, description: 'Bagian hasil pajak daerah yang dialokasikan untuk desa.' },
    { label: 'Pendapatan Asli Desa', amount: 68013000, share: 3.2, description: 'Pendapatan dari usaha BUMDes, sewa aset, dan layanan publik.' }
  ];

  const expenditureAllocations = [
    { label: 'Penyelenggaraan Pemerintahan Desa', amount: 981850928, share: 44, detail: 'Honor perangkat, operasional kantor, dan pengadaan administrasi.' },
    { label: 'Pelaksanaan Pembangunan Desa', amount: 562741000, share: 25, detail: 'Investasi jalan, drainase, dan infrastruktur pelayanan dasar.' },
    { label: 'Pembinaan Kemasyarakatan', amount: 161710000, share: 8, detail: 'Program kesehatan, UMKM, dan kegiatan sosial.' },
    { label: 'Pemberdayaan Masyarakat', amount: 42294000, share: 2, detail: 'Pelatihan BUMDes, koperasi, dan akses modal mikro.' },
    { label: 'Penanggulangan Bencana & Darurat', amount: 67310301.34, share: 3, detail: 'Cadangan darurat, bantuan bencana, dan kesiapsiagaan.' }
  ];

  const programHighlights = [
    {
      title: 'Pembangunan Infrastruktur Jalan',
      description: 'Membangun dan memperbaiki 893 meter jalan desa agar konektivitas dan mobilitas masyarakat meningkat.',
      budget: 323451300,
      beneficiaries: '1.214 jiwa',
      duration: '3 bulan'
    },
    {
      title: 'Program Kesehatan Masyarakat',
      description: 'Pemberian makanan tambahan balita, ibu hamil, dan anak stunting, serta pelayanan imunisasi dan posyandu.',
      budget: 333689000,
      beneficiaries: '600 masyarakat',
      duration: '12 bulan'
    },
    {
      title: 'Pengembangan BUMDes',
      description: 'Lumbung Padi dan hidroponik sebagai usaha desa untuk mendukung ketahanan pangan dan ekonomi warga.',
      budget: 296030000,
      beneficiaries: '3.000 jiwa',
      duration: '1 tahun'
    }
  ];

  const documents: DocumentEntry[] = [
    {
      title: 'APBDes 2024 - Dokumen Utama',
      description: 'Rincian anggaran pendapatan dan belanja desa yang disahkan untuk tahun 2024.',
      thumbnail: '/transparansi/apbdes/APBDes2024.jpeg',
      downloadUrl: '/transparansi/apbdes/APBDes2024.jpeg',
      date: '13 Februari 2024'
    },
    {
      title: 'Laporan Realisasi Pelaksanaan I 2024',
      description: 'Laporan capaian realisasi anggaran semester pertama tahun 2024.',
      thumbnail: '/transparansi/apbdes/Realisasi2024.jpeg',
      downloadUrl: '/transparansi/apbdes/Realisasi2024.jpeg',
      date: '01 Juli 2024'
    }
  ];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const formatShare = (value: number) => `${value.toFixed(1)}%`;
  const [activeDocument, setActiveDocument] = useState<DocumentEntry | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const clampZoom = useMemo(() => (value: number) => Math.min(Math.max(value, 1), 3), []);

  return (
    <PageLayout
      title="Anggaran Pendapatan dan Belanja Desa (APBDes)"
      subtitle="Menghadirkan angka resmi untuk transparansi keuangan 2025"
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: 'Transparansi' },
        { name: 'APB Desa' }
      ]}
    >
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-3 md:px-4">
          <section className="grid gap-4 md:gap-6 md:grid-cols-3 mb-10">
            <article className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider">Pendapatan</span>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold leading-snug">{formatCurrency(summary2025.income)}</h3>
              <p className="text-sm text-blue-100 mt-1">Sumber utama 2025</p>
            </article>
            <article className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider">Belanja</span>
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold leading-snug">{formatCurrency(summary2025.expense)}</h3>
              <p className="text-sm text-red-100 mt-1">Rencana alokasi tahun {summary2025.year}</p>
            </article>
            <article className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider">Sisa Tahun Sebelumnya</span>
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold leading-snug">{formatCurrency(summary2025.previousSurplus)}</h3>
              <p className="text-sm text-emerald-100 mt-1">Dipelihara untuk prioritas strategis</p>
            </article>
          </section>

          <section className="mb-12">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-lg md:text-2xl font-semibold">Tren Anggaran 5 Tahun Terakhir</h2>
              <div className="w-full md:w-40">
                <label htmlFor="year-trend" className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">
                  Pilih Tahun
                </label>
                <select
                  id="year-trend"
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(Number(event.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-village-green focus:ring focus:ring-village-green/40"
                >
                  {fiveYearTrend.map((year) => (
                    <option key={year.year} value={year.year}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">{selectedTrend.year}</span>
                <span className="text-xs text-gray-500">Surplus {formatShare((selectedTrend.surplus / selectedTrend.income) * 100)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                <div>
                  <p className="text-gray-400">Pendapatan</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(selectedTrend.income)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Belanja</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(selectedTrend.expense)}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mt-4">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                  style={{ width: `${Math.min((selectedTrend.surplus / selectedTrend.expense) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2 mb-12">
            <article className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Sumber Pendapatan 2025</h2>
                <PieChart className="w-5 h-5 text-village-green" />
              </div>
              <div className="space-y-4">
                {revenueSources.map((source) => (
                  <div key={source.label} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{source.label}</h3>
                        <p className="text-xs text-gray-500">{source.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-village-green">{formatShare(source.share)}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-2">{formatCurrency(source.amount)}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Alokasi Belanja 2025</h2>
                <Calculator className="w-5 h-5 text-village-green" />
              </div>
              <div className="space-y-4">
                {expenditureAllocations.map((allocation) => (
                  <div key={allocation.label} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{allocation.label}</h3>
                        <p className="text-xs text-gray-500">{allocation.detail}</p>
                      </div>
                      <span className="text-sm font-semibold text-village-green">{formatShare(allocation.share)}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-2">{formatCurrency(allocation.amount)}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-2xl font-semibold">Alokasi Anggaran Utama</h2>
              <span className="text-xs uppercase tracking-wider text-gray-500">Detail prioritas</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {programHighlights.map((program) => (
                <article key={program.title} className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">{program.title}</h3>
                    <Target className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{program.description}</p>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><span className="font-semibold">Anggaran:</span> {formatCurrency(program.budget)}</p>
                    <p><span className="font-semibold">Manfaat:</span> {program.beneficiaries}</p>
                    <p><span className="font-semibold">Durasi:</span> {program.duration}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-2xl font-semibold">Dokumen dan Laporan</h2>
              <span className="text-xs uppercase tracking-wider text-gray-500">PDF siap unduh</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {documents.map((doc) => (
                <article key={doc.title} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDocument(doc);
                      setZoomLevel(1);
                    }}
                    className="block w-full"
                  >
                    <img
                      src={doc.thumbnail}
                      alt={`${doc.title} thumbnail`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800">{doc.title}</h3>
                    <p className="text-xs text-gray-500">{doc.description}</p>
                    <div className="text-xs text-gray-500 flex items-center justify-end">
                      <span>{doc.date}</span>
                    </div>
                    <a
                      href={doc.downloadUrl}
                      download
                      className="inline-flex items-center justify-center space-x-1 w-full border border-village-green text-village-green rounded-full py-2 text-xs font-semibold hover:bg-village-green hover:text-white transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Dokumen</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
          {activeDocument && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setActiveDocument(null)}
            >
              <div className="relative max-w-[94vw] max-h-[94vh] w-full">
                <img
                  src={activeDocument.thumbnail}
                  alt={activeDocument.title}
                  className="w-full h-full object-contain rounded-2xl shadow-2xl cursor-zoom-in"
                  style={{ transform: `scale(${zoomLevel})` }}
                  onWheel={(event) => {
                    event.preventDefault();
                    setZoomLevel((prev) => clampZoom(prev - event.deltaY / 300));
                  }}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    setZoomLevel(1);
                  }}
                />
                <button
                  type="button"
                  className="absolute top-4 right-4 rounded-full bg-white/80 text-gray-900 p-2 text-xs font-semibold"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveDocument(null);
                  }}
                >
                  Tutup
                </button>
                <p className="absolute bottom-4 left-4 right-4 text-center text-xs text-white">
                  Pinch, scroll, atau double-tap untuk zoom. Klik area luar gambar untuk menutup overlay.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default APBPage;
