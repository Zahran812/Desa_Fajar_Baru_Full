import PageLayout from '@/react-app/components/PageLayout';
import { apiFetch } from '@/react-app/lib/api';
import { Calendar, Clock, MapPin, Filter, Search } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

const AgendaPage = () => {
  const [query, setQuery] = useState('');
  const [month, setMonth] = useState<string>('all');
  const [agenda, setAgenda] = useState<any[]>([]);
  // Pertahankan state loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAgenda = async () => {
      // Tidak perlu setLoading(true) di sini karena sudah true saat inisialisasi
      try {
        // Ganti fetch lokal menjadi fetch yang seharusnya digunakan di lingkungan client/Next.js
        const res = await apiFetch("/agenda", { credentials: "include" })

        if (!res.ok) throw new Error("Gagal mengambil data agenda");

        const data = await res.json();

        // Convert data API ke format tampilan
        const mapped = data.agendas.map((item: any) => {
          const d = new Date(item.date);

          return {
            judul: item.title,
            lokasi: item.location,
            tema: item.category,
            tanggal: d.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            // Format bulan untuk filter
            bulan: String(d.getMonth() + 1).padStart(2, '0'),
            waktu: item.time,
          };
        });

        setAgenda(mapped);
        setError(''); // Clear error jika sukses
      } catch (err: any) {
        // Tangkap dan set pesan error
        setError(err.message || 'Terjadi kesalahan saat memuat agenda.');
        setAgenda([]); // Pastikan data kosong saat error
      } finally {
        // PENTING: set loading false setelah fetch (baik sukses/gagal)
        setLoading(false);
      }
    };

    getAgenda();
  }, []);

  const filtered = useMemo(() => {
    return agenda.filter((a: any) =>
      (month === 'all' || a.bulan === month) &&
      (
        a.judul.toLowerCase().includes(query.toLowerCase()) ||
        a.lokasi.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [agenda, month, query]);

  return (
    <PageLayout
      title="Agenda Kegiatan Desa"
      subtitle="Jadwal kegiatan dan acara resmi Desa Fajar Baru"
      breadcrumb={[{ name: 'Beranda', href: '/' }, { name: 'Informasi' }, { name: 'Agenda Kegiatan' }]}
    >
      <div className="py-16">
        <div className="container mx-auto px-4">

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex items-center space-x-2 text-emerald-700">
                <Filter className="w-5 h-5" />
                <span className="font-semibold">Filter Agenda</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="flex items-center bg-gray-100 rounded-xl px-3">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    className="bg-transparent px-2 py-2 text-sm w-full focus:outline-none"
                    placeholder="Cari judul/lokasi..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>

                <select
                  className="bg-gray-100 rounded-xl px-3 py-2 text-sm"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                >
                  <option value="all">Semua Bulan</option>
                  {/* Pilihan bulan disesuaikan dengan kebutuhan statis/dinamis */}
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-10">
                <p className="text-gray-600">Memuat...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a: any, i: any) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all"
                >
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    {a.tema}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                          {a.judul}
                        </h3>
                        <div className="text-xs text-gray-500">{a.tanggal}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{a.waktu}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                      <span>{a.lokasi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
                <p className="text-gray-600">Tidak ada agenda yang ditemukan sesuai filter.</p>
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  );
};

export default AgendaPage;