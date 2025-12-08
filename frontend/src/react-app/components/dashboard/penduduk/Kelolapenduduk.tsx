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
  Building2,
  Phone,
  User,
} from 'lucide-react';

interface CitizenData {
  id?: number;
  no?: number;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  umur?: number;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan?: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  kelurahan?: string;
  kecamatan?: string;
  kabupaten_kota?: string;
  provinsi?: string;
  kode_pos?: string;
  no_kk: string;
  nama_kepala_keluarga?: string;
  status_dalam_keluarga: string;
  pendidikan_terakhir: string;
  nama_ibu?: string;
  nama_ayah?: string;
  golongan_darah?: string;
  status_perkawinan_dalam_kk?: string;
  tanggal_perkawinan?: string;
  status_hubungan_dalam_keluarga?: string;
  kelainan_fisik_mental?: string;
  no_telepon?: string;
  no_paspor?: string;
  no_akta_lahir?: string;
  no_akta_kawin?: string;
  tanggal_akhir_paspor?: string;
  created_at?: string;
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
  selectedRT: string;
  setSelectedRT: (id: string) => void;

  sortCitizensForDisplay: (data: CitizenData[]) => CitizenData[];
  setSelectedCitizens: (value: Set<number>) => void;

  handleEditDusun: (dusun: DusunSummary, e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditRT: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
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
  selectedRT,
  setSelectedRT,
  sortCitizensForDisplay,
  setSelectedCitizens,
  handleEditDusun,
  handleEditRT,
}) => {
  // urutkan dan filter data penduduk (sesuai renderPopulation lama)
  const baseCitizens = sortCitizensForDisplay(citizensData);
  const filteredCitizens = baseCitizens.filter((citizen) => {
    const matchDusun = filterDusun === 'all' || citizen.dusun === filterDusun;
    const matchRT = filterRT === 'all' || citizen.rt === filterRT;
    const matchGender =
      filterGender === 'all' || citizen.jenis_kelamin === filterGender;
    const matchSearch =
      searchQuery === '' ||
      citizen.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.nik.includes(searchQuery) ||
      citizen.alamat.toLowerCase().includes(searchQuery.toLowerCase());

    return matchDusun && matchRT && matchGender && matchSearch;
  });

  const uniqueDusuns = dusuns.map((d) => d.name);
  const uniqueRTs = Array.from(new Set(citizensData.map((c) => c.rt))).sort();

  // view detail per RT (bagian paling bawah renderPopulation)
  const renderRTCitizens = () => {
    const rtNumber = selectedRT.replace('rt-', '');
    const selectedDusunName = dusuns.find((d) => d.id === selectedDusun)?.name;
    const rtCitizens = sortCitizensForDisplay(
      citizensData.filter((citizen) => {
        const matchRT = citizen.rt === rtNumber;
        const matchDusun = selectedDusunName
          ? citizen.dusun === selectedDusunName
          : true;
        return matchRT && matchDusun;
      }),
    );

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedRT('')}
                className="text-gray-400 hover:text-gray-600"
              >
                ← Kembali ke RT
              </button>
              <h3 className="text-lg font-semibold">
                Data Penduduk RT {rtNumber} -{' '}
                {dusuns.find((d) => d.id === selectedDusun)?.name}
              </h3>
            </div>
            <button className="btn-primary px-4 py-2">
              <Plus className="w-4 h-4" />
              Tambah Penduduk
            </button>
          </div>

          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-emerald-700 font-medium">
                    Total Penduduk di RT {rtNumber}
                  </p>
                  <p className="text-2xl font-bold text-emerald-900">
                    {rtCitizens.length} Orang
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-emerald-700">Laki-laki</p>
                  <p className="text-xl font-bold text-emerald-900">
                    {
                      rtCitizens.filter(
                        (c) => c.jenis_kelamin === 'Laki-laki',
                      ).length
                    }
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-emerald-700">Perempuan</p>
                  <p className="text-xl font-bold text-emerald-900">
                    {
                      rtCitizens.filter(
                        (c) => c.jenis_kelamin === 'Perempuan',
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                      No
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RT
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RW
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                      Alamat
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      Kelurahan/Desa
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kecamatan
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[170px]">
                      Nomor Kartu Keluarga
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                      Nama Lengkap
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIK
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Kelamin
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      Tempat Lahir
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Lahir
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Umur
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agama
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pendidikan
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      Jenis Pekerjaan
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Golongan Darah
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      Status Perkawinan
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                      Status Hubungan Dalam Keluarga
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      Nama Ayah
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      Nama Ibu
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rtCitizens.length === 0 ? (
                    <tr>
                      <td
                        colSpan={27}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <Users className="w-12 h-12 text-gray-300 mb-2" />
                          <p>Belum ada data penduduk di RT {rtNumber}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Klik &quot;Tambah Penduduk&quot; untuk menambahkan
                            data
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    rtCitizens.map((citizen, index) => (
                      <tr key={citizen.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 text-sm text-gray-900 sticky left-0 bg-white">
                          {index + 1}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.rt}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.rw}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.alamat}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.kelurahan}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.kecamatan}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.kabupaten_kota}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.provinsi}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.kode_pos}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900 font-mono">
                          {citizen.no_kk}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900 font-medium">
                          {citizen.nama_lengkap}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900 font-mono">
                          {citizen.nik}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.jenis_kelamin}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.tempat_lahir}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.tanggal_lahir}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.umur || '-'}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.agama}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.pendidikan_terakhir}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.pekerjaan}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.golongan_darah}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.status_perkawinan}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.tanggal_perkawinan}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.status_hubungan_dalam_keluarga}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.nama_ayah}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-900">
                          {citizen.nama_ibu}
                        </td>
                        <td className="px-3 py-3 text-sm sticky right-0 bg-white">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              title="Lihat Detail"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="text-emerald-600 hover:text-emerald-900"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              title="Hapus"
                            >
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
    );
  };

  // view utama: table / daftar dusun / daftar RT / detail RT
  return (
    <div className="space-y-6">
      {/* Header + tombol aksi */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kelola Penduduk</h2>
          <p className="text-sm text-gray-600 mt-1">
            Kelola data penduduk berdasarkan dusun dan RT
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          {/* View mode toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 text-sm">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                Cards
              </span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                Tabel
              </span>
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

      {/* Table view penuh data penduduk */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            {/* Filter & search */}
            <div className="mb-6 space-y-4">
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

                <div className="flex gap-2">
                  <select
                    value={filterDusun}
                    onChange={(e) => setFilterDusun(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">Semua Dusun</option>
                    {uniqueDusuns.map((dusun) => (
                      <option key={dusun} value={dusun}>
                        {dusun}
                      </option>
                    ))}
                  </select>

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

                  {(filterDusun !== 'all' ||
                    filterRT !== 'all' ||
                    filterGender !== 'all' ||
                    searchQuery !== '') && (
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
                  <span className="font-semibold text-gray-900">
                    {filteredCitizens.length}
                  </span>{' '}
                  dari{' '}
                  <span className="font-semibold text-gray-900">
                    {citizensData.length}
                  </span>{' '}
                  data penduduk
                </p>
                <button
                  onClick={() => {
                    const newSelected = new Set(
                      filteredCitizens
                        .filter((c) => c.id)
                        .map((c) => c.id as number),
                    );
                    setSelectedCitizens(newSelected);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Pilih semua hasil filter
                </button>
              </div>
            </div>

            {/* Table (versi ringkas, sama struktur pentingnya dengan aslinya) */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                        No
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RT
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RW
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                        Alamat
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Kelurahan/Desa
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kecamatan
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[170px]">
                        Nomor Kartu Keluarga
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                        Nama Lengkap
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        NIK
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jenis Kelamin
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Tempat Lahir
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Lahir
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Umur
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agama
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pendidikan
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Jenis Pekerjaan
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Golongan Darah
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Status Perkawinan
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                        Status Hubungan Dalam Keluarga
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Nama Ayah
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Nama Ibu
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCitizens.length === 0 ? (
                      <tr>
                        <td
                          colSpan={27}
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <Users className="w-12 h-12 text-gray-300 mb-2" />
                            <p>
                              Tidak ada data penduduk yang sesuai dengan filter
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredCitizens.map((citizen, index) => (
                        <tr key={citizen.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 sticky left-0 bg-white">
                            {index + 1}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.rt}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.rw}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.alamat}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.kelurahan}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.kecamatan}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-mono">
                            {citizen.no_kk}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-medium">
                            {citizen.nama_lengkap}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-mono">
                            {citizen.nik}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.jenis_kelamin}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.tempat_lahir}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.tanggal_lahir}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.umur || '-'}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.agama}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.pendidikan_terakhir}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.pekerjaan}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.golongan_darah}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.status_perkawinan}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.status_hubungan_dalam_keluarga}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.nama_ayah}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900">
                            {citizen.nama_ibu}
                          </td>
                          <td className="px-3 py-3 text-sm sticky right-0 bg-white">
                            <div className="flex items-center space-x-2">
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                title="Lihat Detail"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-emerald-600 hover:text-emerald-900"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                title="Hapus"
                              >
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
      ) : !selectedDusun ? (
        // daftar dusun
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Daftar Dusun
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Rekapitulasi tercatat sesuai dokumen terakhir
              </p>
            </div>
            <div className="space-y-4">
              {dusuns.map((dusun) => (
                <div
                  key={dusun.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer bg-gradient-to-r from-white to-gray-50"
                  onClick={() => setSelectedDusun(dusun.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {dusun.name}
                        </h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Kepala: {dusun.head_name}
                        </p>
                        {dusun.head_phone && (
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Phone className="w-3.5 h-3.5 mr-1" />
                            {dusun.head_phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs md:text-sm">
                        <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center justify-center">
                          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                            RT
                          </span>
                          <span className="text-base md:text-lg font-semibold text-blue-600">
                            {dusun.rt_count}
                          </span>
                        </div>
                        <div className="bg-emerald-50 rounded-lg px-3 py-2 flex flex-col items-center justify-center">
                          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                            KK
                          </span>
                          <span className="text-base md:text-lg font-semibold text-emerald-600">
                            {dusun.kk_count?.toLocaleString() ?? '-'}
                          </span>
                        </div>
                        <div className="bg-emerald-50 rounded-lg px-3 py-2 flex flex-col items-center justify-center">
                          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                            Penduduk
                          </span>
                          <span className="text-base md:text-lg font-semibold text-emerald-600">
                            {dusun.population_count.toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center justify-center">
                          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                            Laki-laki
                          </span>
                          <span className="text-base md:text-lg font-semibold text-blue-600">
                            {dusun.male_count?.toLocaleString() ?? '-'}
                          </span>
                        </div>
                        <div className="bg-emerald-50 rounded-lg px-3 py-2 flex flex-col items-center justify-center">
                          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                            Perempuan
                          </span>
                          <span className="text-base md:text-lg font-semibold text-emerald-600">
                            {dusun.female_count?.toLocaleString() ?? '-'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={(e) => handleEditDusun(dusun, e)}
                        title="Edit Dusun"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <div className="text-gray-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : !selectedRT ? (
        // daftar RT dalam dusun terpilih
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDusun('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ← Kembali
                </button>
                <h3 className="text-lg font-semibold">
                  RT di {dusuns.find((d) => d.id === selectedDusun)?.name}
                </h3>
              </div>
              <button
                onClick={() => alert('Fitur dalam pengembangan')}
                className="btn-primary px-4 py-2"
              >
                <Plus className="w-4 h-4" />
                Tambah RT
              </button>
            </div>

            <div className="space-y-4">
              {Array.from(
                {
                  length:
                    dusuns.find((d) => d.id === selectedDusun)?.rt_count || 0,
                },
                (_, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer bg-gradient-to-r from-white to-emerald-50/30"
                    onClick={() => setSelectedRT(`rt-${i + 1}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                          <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            RT {String(i + 1).padStart(2, '0')}
                          </h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Ketua: Bapak RT {i + 1}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center space-x-6 px-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="text-left">
                              <div className="text-2xl font-bold text-emerald-600">
                                {Math.floor(Math.random() * 50) + 20}
                              </div>
                              <div className="text-xs text-gray-600 uppercase tracking-wide">
                                Kepala Keluarga
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex md:hidden items-center ml-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-emerald-600">
                            {Math.floor(Math.random() * 50) + 20}
                          </div>
                          <div className="text-xs text-gray-600">KK</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <button
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={(e) => handleEditRT(i + 1, e)}
                          title="Edit RT"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <div className="text-gray-300">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      ) : (
        // detail penduduk di RT terpilih
        renderRTCitizens()
      )}
    </div>
  );
};

export default Kelolapenduduk;