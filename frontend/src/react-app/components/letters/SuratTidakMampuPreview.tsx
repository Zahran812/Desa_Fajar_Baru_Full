import React from 'react';

interface LetterData {
  nama: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  pekerjaan: string;
  alamat: string;
}

interface SuratTidakMampuPreviewProps {
  letterNumber?: string;
  letterData?: LetterData;
  requestDescription?: string;
  // Flag or value indicating QR should be shown (dummy PNG)
  qrCode?: string | null;
}

const SuratTidakMampuPreview: React.FC<SuratTidakMampuPreviewProps> = ({
  letterNumber,
  letterData,
  requestDescription,
  qrCode,
}) => {
  const data = letterData || {
    nama: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    agama: '',
    pekerjaan: '',
    alamat: '',
  };

  return (
    <div className="bg-white p-8 border border-gray-300 shadow-lg rounded-lg max-w-full">
      <div className="mb-4 border-b-[3px] border-black pb-2">
        <div className="flex items-start">
          <div className="w-24 flex justify-center mr-3 mt-1">
            <img
              src={`${import.meta.env.BASE_URL}Logo/Logo Kabupaten Lampung Selatan.png`}
              alt="Logo Kabupaten Lampung Selatan"
              className="w-20 h-auto object-contain"
            />
          </div>
          <div className="flex-1 text-center leading-tight">
            <h2 className="text-xl font-bold uppercase tracking-[0.04em]">PEMERINTAH KABUPATEN LAMPUNG SELATAN</h2>
            <h2 className="text-xl font-bold uppercase tracking-[0.04em]">KECAMATAN JATI AGUNG</h2>
            <h1 className="text-2xl font-bold uppercase tracking-[0.08em] mt-0.5 mb-0.5">DESA FAJAR BARU</h1>
            <p className="text-xs italic tracking-[0.03em] ml-1">JL. RA. BASYID No. 1 FAJAR BARU 35564</p>
          </div>
        </div>
      </div>
      <div className="text-center mb-6">
        <p className="font-bold underline text-lg">SURAT KETERANGAN TIDAK MAMPU</p>
        <p>Nomor: <span className="font-mono">{letterNumber || '...'}</span></p>
      </div>
      <div className="text-left space-y-4 text-sm">
        <p>Yang bertanda tangan di bawah ini Kepala Desa Fajar Baru, Kecamatan Jati Agung, Kabupaten Lampung Selatan, dengan ini menerangkan bahwa:</p>
        <table className="w-full">
          <tbody>
            <tr><td className="w-1/3 pl-8">Nama</td><td>: <span className="font-semibold">{data.nama || '...'}</span></td></tr>
            <tr><td className="pl-8">NIK</td><td>: {data.nik || '...'}</td></tr>
            <tr><td className="pl-8">Tempat/Tgl. Lahir</td><td>: {data.tempat_lahir || '...'}, {data.tanggal_lahir || '...'}</td></tr>
            <tr><td className="pl-8">Jenis Kelamin</td><td>: {data.jenis_kelamin || '...'}</td></tr>
            <tr><td className="pl-8">Agama</td><td>: {data.agama || '...'}</td></tr>
            <tr><td className="pl-8">Pekerjaan</td><td>: {data.pekerjaan || '...'}</td></tr>
            <tr><td className="pl-8">Alamat</td><td>: {data.alamat || '...'}</td></tr>
          </tbody>
        </table>
        <p>Berdasarkan pengamatan kami dan data yang ada, yang bersangkutan adalah benar warga Desa Fajar Baru dan tergolong dalam keluarga yang tidak mampu (ekonomi lemah).</p>
        <p>Surat keterangan ini dibuat untuk keperluan <span className="font-semibold">{requestDescription || '...'}</span>.</p>
        <p>Demikian Surat Keterangan Tidak Mampu ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>
      <div className="flex justify-end mt-12">
        <div className="text-center">
          <p>Fajar Baru, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>Kepala Desa Fajar Baru</p>
          
          <div className="h-28 flex items-center justify-center">
            {qrCode ? (
              <img
                src={`${import.meta.env.BASE_URL}qr/QR.png`}
                alt="QR Code"
                className="w-24 h-24"
              />
            ) : (
              <div className="h-24 w-24"></div>
            )}
          </div>

          <p className="font-bold underline">(M. Agus Budiantoro, S.HI)</p>
        </div>
      </div>
    </div>
  );
};

export default SuratTidakMampuPreview;
