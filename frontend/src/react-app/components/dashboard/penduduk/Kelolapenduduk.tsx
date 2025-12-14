import React from 'react';
import {
  LayoutGrid,
  List,
  HelpCircle,
  Upload,
  Download,
  Plus,
  Search,
  X,
  Users,
  Eye,
  Edit3,
  Trash2,
  Phone,
  User,
} from 'lucide-react';

interface CitizenData {
  id?: number;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  umur?: number;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  no_kk: string;
  status_dalam_keluarga: string;
  pendidikan_terakhir: string;
  nama_ibu?: string;
  nama_ayah?: string;
  golongan_darah?: string;
  status_hubungan_dalam_keluarga?: string;
}

interface DusunSummary {
  id: string;
  name: string;
  head_name: string;
  head_phone?: string;
  rt_count: number;
  kk_count?: number;
  population_count: number;
  male_count?: number;
  female_count?: number;
}

interface KelolaPendudukProps {
  citizensData: CitizenData[];
  dusuns: DusunSummary[];
  viewMode: 'cards' | 'table';
  setViewMode: (mode: 'cards' | 'table') => void;
  filterDusun: string;
  setFilterDusun: (value: string) => void;
  filterRT: string;
  setFilterRT: (value: string) => void;
  filterGender: string;
  setFilterGender: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setShowGuideModal: (v: boolean) => void;
  setShowImportModal: (v: boolean) => void;
  setShowExportModal: (v: boolean) => void;
  setShowAddDusun: (v: boolean) => void;
  selectedDusun: string;
  setSelectedDusun: (id: string) => void;
  sortCitizensForDisplay: (data: CitizenData[]) => CitizenData[];
  setSelectedCitizens: (value: Set<number>) => void;
}

const Kelolapenduduk: React.FC<KelolaPendudukProps> = ({
  citizensData,
  dusuns,
  viewMode,
  setViewMode,
  filterDusun,
  setFilterDusun,
  filterRT,
  setFilterRT,
  filterGender,
  setFilterGender,
  searchQuery,
  setSearchQuery,
  setShowGuideModal,
  setShowImportModal,
  setShowExportModal,
  setShowAddDusun,
  selectedDusun,
  setSelectedDusun,
  sortCitizensForDisplay,
  setSelectedCitizens,
}) => {
  const [tableSortKey, setTableSortKey] = React.useState<'rt' | 'jenis_kelamin'>('rt');
  const [tableSortDir, setTableSortDir] = React.useState<'asc' | 'desc'>('asc');

  const activeDusunName = React.useMemo(
    () => dusuns.find((d) => d.id === selectedDusun)?.name,
    [dusuns, selectedDusun],
  );

  const baseCitizens = sortCitizensForDisplay(citizensData);
  const filteredCitizens = baseCitizens.filter((citizen) => {
    const dusunMatch = activeDusunName
      ? citizen.dusun === activeDusunName
      : filterDusun === 'all' || citizen.dusun === filterDusun;
    const rtMatch = filterRT === 'all' || citizen.rt === filterRT;
    const genderMatch = filterGender === 'all' || citizen.jenis_kelamin === filterGender;
    const searchMatch =
      searchQuery === '' ||
      citizen.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.nik.includes(searchQuery) ||
      citizen.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    return dusunMatch && rtMatch && genderMatch && searchMatch;
  });

  const sortedFilteredCitizens = React.useMemo(() => {
    const dir = tableSortDir === 'asc' ? 1 : -1;
    const data = [...filteredCitizens];
    const getStr = (v: unknown) => String(v ?? '').toLowerCase();
    data.sort((a, b) => {
      if (tableSortKey === 'rt') {
        const aNum = Number.parseInt(String(a.rt || '').replace(/\D/g, ''), 10);
        const bNum = Number.parseInt(String(b.rt || '').replace(/\D/g, ''), 10);
        const aVal = Number.isNaN(aNum) ? 0 : aNum;
        const bVal = Number.isNaN(bNum) ? 0 : bNum;
        return (aVal - bVal) * dir;
      }
      return getStr(a.jenis_kelamin).localeCompare(getStr(b.jenis_kelamin)) * dir;
    });
    return data;
  }, [filteredCitizens, tableSortDir, tableSortKey]);

  const uniqueRTs = Array.from(new Set(citizensData.map((c) => c.rt))).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kelola Penduduk</h2>
          <p className="text-sm text-gray-600 mt-1">Kelola data penduduk per dusun</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          <div className="flex bg-gray-100 rounded-full p-1 text-sm">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
                viewMode === 'cards' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
                viewMode === 'table' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Tabel</span>
            </button>
          </div>
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center space-x-1 px-3 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-sm"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Panduan</span>
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center space-x-1 px-3 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import Data</span>
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-1 px-3 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Data</span>
          </button>
          <button
            onClick={() => setShowAddDusun(true)}
            className="flex items-center space-x-1 px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Dusun</span>
          </button>
        </div>
      </div>

      {/* Body */}
      {!selectedDusun ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dusuns.map((dusun) => (
            <button
              key={dusun.id}
              className="group border border-gray-200 rounded-xl bg-white hover:shadow-lg hover:border-blue-400 transition-all p-6 text-left flex flex-col gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => {
                setSelectedDusun(dusun.id);
                setFilterDusun(dusun.name);
                setFilterRT('all');
                setFilterGender('all');
                setSearchQuery('');
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow">
                  <User className="w-6 h-6" />
                </span>
                <span className="text-lg font-bold text-gray-900 group-hover:text-blue-700">{dusun.name}</span>
              </div>
              <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                <span>Kepala: {dusun.head_name}</span>
                {dusun.head_phone && <span className="ml-2">| {dusun.head_phone}</span>}
              </div>
              <div className="flex gap-4 mt-2 flex-wrap">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 uppercase">Penduduk</span>
                  <span className="font-bold text-emerald-700 text-lg">{dusun.population_count.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 uppercase">Laki-laki</span>
                  <span className="font-bold text-blue-600 text-lg">{dusun.male_count?.toLocaleString() ?? '-'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 uppercase">Perempuan</span>
                  <span className="font-bold text-pink-600 text-lg">{dusun.female_count?.toLocaleString() ?? '-'}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-6">
            {(() => {
              const dusun = dusuns.find((d) => d.id === selectedDusun);
              if (!dusun) return null;
              const dusunName = dusun.name;
              // Note: The original logic for counting was slightly flawed as it filtered citizensData
              // within the render function, using 'sortedFilteredCitizens' which already applies the
              // 'activeDusunName' filter implicitly if 'selectedDusun' is set. 
              // It should just use `sortedFilteredCitizens` if the logic is to show counts based on current filters.
              // For simplicity and matching the existing structure:
              const total = sortedFilteredCitizens.length; 
              const male = sortedFilteredCitizens.filter((c) => c.jenis_kelamin === 'Laki-laki').length;
              const female = sortedFilteredCitizens.filter((c) => c.jenis_kelamin === 'Perempuan').length;
              return (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">{dusunName}</h3>
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setSelectedDusun('');
                          setFilterDusun('all');
                          setFilterRT('all');
                          setFilterGender('all');
                          setSearchQuery('');
                        }}
                      >
                        ← Kembali ke daftar dusun
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <User className="w-4 h-4 mr-1" /> Kepala: {dusun.head_name}
                    </p>
                    {dusun.head_phone && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-1" /> {dusun.head_phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 md:gap-8 items-center">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase">Total Penduduk</div>
                      <div className="text-2xl font-bold text-emerald-700">{total}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase">Laki-laki</div>
                      <div className="text-2xl font-bold text-blue-600">{male}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase">Perempuan</div>
                      <div className="text-2xl font-bold text-pink-600">{female}</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Filter & sort */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Cari nama, NIK, atau alamat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterRT}
                    onChange={(e) => setFilterRT(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">Semua RT</option>
                    {uniqueRTs.map((rt) => (
                      <option key={rt} value={rt}>
                        RT {rt}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">Semua JK</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <select
                    value={tableSortKey}
                    onChange={(e) => setTableSortKey(e.target.value as 'rt' | 'jenis_kelamin')}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    title="Urutkan"
                  >
                    <option value="rt">Urut: RT</option>
                    <option value="jenis_kelamin">Urut: Jenis Kelamin</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setTableSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700"
                    title={tableSortDir === 'asc' ? 'Urut naik' : 'Urut turun'}
                  >
                    {tableSortDir === 'asc' ? '↑' : '↓'}
                  </button>
                  {(filterRT !== 'all' || filterGender !== 'all' || searchQuery !== '') && (
                    <button
                      onClick={() => {
                        setFilterDusun('all');
                        setFilterRT('all');
                        setFilterGender('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Menampilkan{' '}
                  <span className="font-semibold text-gray-900">{sortedFilteredCitizens.length}</span>{' '}
                  dari <span className="font-semibold text-gray-900">{citizensData.length}</span> data penduduk
                </p>
                <button
                  onClick={() => {
                    const newSelected = new Set(
                      sortedFilteredCitizens.filter((c) => c.id).map((c) => c.id as number),
                    );
                    setSelectedCitizens(newSelected);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Pilih semua hasil filter
                </button>
              </div>
            </div>

            {/* Tabel penduduk per dusun (Only renders if selectedDusun is set) */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">No</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RT</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RW</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Alamat</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[170px]">Nomor Kartu Keluarga</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">Nama Lengkap</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Tempat Lahir</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Umur</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agama</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendidikan</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Jenis Pekerjaan</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Golongan Darah</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Status Perkawinan</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Status Hubungan Dalam Keluarga</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Nama Ayah</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Nama Ibu</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedFilteredCitizens.length === 0 ? (
                      <tr>
                        <td colSpan={20} className="px-4 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <Users className="w-12 h-12 text-gray-300 mb-2" />
                            <p>Tidak ada data penduduk yang sesuai dengan filter</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      sortedFilteredCitizens.map((citizen, index) => (
                        <tr key={citizen.id ?? `${citizen.nik}-${index}`} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 sticky left-0 bg-white">{index + 1}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.rt}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.rw}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 whitespace-normal break-words min-w-[200px]">{citizen.alamat}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-mono">{citizen.no_kk}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-medium">{citizen.nama_lengkap}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-mono">{citizen.nik}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.jenis_kelamin}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.tempat_lahir}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.tanggal_lahir}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.umur ?? '-'}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.agama}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.pendidikan_terakhir}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.pekerjaan}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.golongan_darah}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.status_perkawinan}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 whitespace-normal break-words min-w-[200px]">
                            {citizen.status_dalam_keluarga || citizen.status_hubungan_dalam_keluarga || '-'}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.nama_ayah}</td>
                          <td className="px-3 py-3 text-sm text-gray-900">{citizen.nama_ibu}</td>
                          <td className="px-3 py-3 text-sm sticky right-0 bg-white">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900" title="Lihat Detail">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-emerald-600 hover:text-emerald-900" title="Edit">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900" title="Hapus">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kelolapenduduk;