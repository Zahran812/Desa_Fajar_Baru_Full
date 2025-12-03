const administrativeInfo = {
  province: 'Lampung',
  regency: 'Lampung Selatan',
  subdistrict: 'Jati Agung',
  villageCode: '1801132009',
  rt: 147,
  rw: 64,
  dusun: 118,
  iks: 68,
  ike: 45,
  ikl: 62,
  overallScore: 79.37,
  status: 'Maju'
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Mandiri':
      return 'bg-green-500';
    case 'Maju':
      return 'bg-blue-500';
    case 'Berkembang':
      return 'bg-yellow-500';
    case 'Tertinggal':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const metrics = [
  {
    label: 'IKS (Ketahanan Sosial)',
    value: administrativeInfo.iks
  },
  {
    label: 'IKE (Ketahanan Ekonomi)',
    value: administrativeInfo.ike
  },
  {
    label: 'IKL (Ketahanan Ekologi)',
    value: administrativeInfo.ikl
  }
];

const IDMSnapshot = () => {
  return (
    <section className="mb-16">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">Snapshot Administratif</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">Data IDM Berdasarkan Tabel Mutakhir</h2>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl px-5 py-4 text-center shadow-lg flex-1 lg:flex-none">
            <p className="text-[10px] uppercase tracking-widest text-white/80">Skor IDM</p>
            <p className="text-4xl font-bold mt-1">{administrativeInfo.overallScore.toFixed(2)}</p>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mt-3 ${getStatusColor(
                administrativeInfo.status
              )} text-white`}
            >
              Status {administrativeInfo.status}
            </span>
            <p className="text-[11px] text-white/80 mt-1">Berdasarkan dataset IDM Lampung Selatan</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              {[
                { label: 'Provinsi', value: administrativeInfo.province },
                { label: 'Kabupaten', value: administrativeInfo.regency },
                { label: 'Kecamatan', value: administrativeInfo.subdistrict },
                { label: 'Kode Desa', value: administrativeInfo.villageCode }
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">{item.label}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Jumlah RT', value: administrativeInfo.rt },
                { label: 'Jumlah RW', value: administrativeInfo.rw },
                { label: 'Jumlah Dusun', value: administrativeInfo.dusun }
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-900 text-white shadow-lg">
                  <p className="text-[11px] uppercase tracking-widest text-white/80">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">{metric.label}</p>
                  <p className="text-sm font-bold text-gray-900">{metric.value}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IDMSnapshot;
