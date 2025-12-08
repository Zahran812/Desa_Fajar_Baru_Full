import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import jsPDF from 'jspdf';

interface CheckoutProductState {
  unitName?: string;
  product?: {
    name: string;
    price: string;
    description: string;
  };
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as CheckoutProductState;

  const product = state.product || {
    name: 'Produk UMKM',
    price: 'Rp0',
    description: 'Detail produk tidak tersedia.',
  };

  const unitName = state.unitName || 'Unit Usaha';

  // Helper to parse price string like "Rp3.500.000" to number
  const unitPrice = useMemo(() => {
    const digits = product.price.replace(/[^0-9]/g, '');
    const value = digits ? parseInt(digits, 10) : 0;
    return Number.isNaN(value) ? 0 : value;
  }, [product.price]);

  const [quantity, setQuantity] = useState<number>(1);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [note, setNote] = useState('');

  const totalPrice = useMemo(() => {
    return unitPrice * (quantity > 0 ? quantity : 0);
  }, [unitPrice, quantity]);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handlePlaceOrder = () => {
    // Generate styled invoice PDF (A4 portrait)
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;

    // Header background (blue-green gradient style approximation)
    doc.setFillColor(7, 94, 133); // blue
    doc.rect(0, 0, pageWidth, 30, 'F');

    // Header text: UMKM + title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('Desa Fajar Baru - UMKM', margin, 12);
    doc.setFontSize(11);
    doc.text(`Unit Usaha: ${unitName}`, margin, 18);
    doc.text('Website: desafajarbaru.co', margin, 24);

    // Header right box for "INVOICE"
    const boxWidth = 60;
    const boxX = pageWidth - margin - boxWidth;
    doc.setFillColor(16, 185, 129); // green
    doc.roundedRect(boxX, 8, boxWidth, 18, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text('INVOICE', boxX + boxWidth / 2, 16, { align: 'center' });
    doc.setFontSize(9);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, boxX + boxWidth / 2, 22, { align: 'center' });

    // Reset text color for body
    doc.setTextColor(0, 0, 0);

    let currentY = 40;

    // Section: Informasi Pelanggan & Invoice ringkas
    doc.setFontSize(11);
    doc.text('Invoice Untuk:', margin, currentY);

    const displayName = fullName || 'Pelanggan Marketplace Desa Fajar Baru';
    const displayPhone = phoneNumber || '-';
    const displayCity = city || '-';
    const displayPostalCode = postalCode || '-';
    const displayAddress = fullAddress || '-';
    const displayNote = note || '-';

    currentY += 7;
    doc.setFontSize(10);
    doc.text(displayName, margin, currentY);

    currentY += 5;
    doc.text(`No. HP: ${displayPhone}`, margin, currentY);

    currentY += 5;
    doc.text(`Kota/Kabupaten: ${displayCity}`, margin, currentY);

    currentY += 5;
    doc.text(`Kode Pos: ${displayPostalCode}`, margin, currentY);

    currentY += 5;
    doc.text('Alamat:', margin, currentY);

    currentY += 5;
    const splitAddress = doc.splitTextToSize(displayAddress, pageWidth - margin * 2);
    doc.text(splitAddress, margin, currentY);

    currentY += splitAddress.length * 5;
    doc.text(`Catatan: ${displayNote}`, margin, currentY);

    // Ringkasan total di sisi kanan
    const summaryBoxWidth = 60;
    const summaryX = pageWidth - margin - summaryBoxWidth;
    const summaryY = 38;
    doc.setFillColor(243, 244, 246); // gray-100
    doc.roundedRect(summaryX, summaryY, summaryBoxWidth, 26, 3, 3, 'F');
    doc.setFontSize(10);
    doc.text('Total Pembayaran', summaryX + 4, summaryY + 8);
    doc.setFontSize(13);
    doc.setTextColor(16, 185, 129);
    doc.text(formatRupiah(totalPrice), summaryX + 4, summaryY + 18);
    doc.setTextColor(0, 0, 0);

    // Posisikan awal tabel beberapa jarak di bawah blok alamat agar tidak tabrakan
    currentY += 15;

    // Tabel produk
    doc.setFontSize(11);
    doc.text('Rincian Produk', margin, currentY);

    currentY += 4;
    const tableTop = currentY;
    const colNo = margin;
    const colDesc = margin + 10;
    const colPrice = pageWidth - margin - 60;
    const colQty = pageWidth - margin - 35;
    const colTotal = pageWidth - margin - 10;

    const tableWidth = pageWidth - margin * 2;
    const headerHeight = 8;
    const rowHeight = 18;

    // Header row background + border
    doc.setFillColor(7, 94, 133);
    doc.rect(margin, tableTop, tableWidth, headerHeight, 'F');
    doc.setDrawColor(7, 94, 133);
    doc.rect(margin, tableTop, tableWidth, headerHeight); // border stroke
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('NO.', colNo + 2, tableTop + 5);
    doc.text('DESKRIPSI', colDesc, tableTop + 5);
    doc.text('HARGA', colPrice, tableTop + 5);
    doc.text('QTY', colQty, tableTop + 5);
    doc.text('TOTAL', colTotal, tableTop + 5, { align: 'right' });

    // Row data
    const rowTop = tableTop + headerHeight;
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, rowTop, tableWidth, rowHeight, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(margin, rowTop, tableWidth, rowHeight); // border kotak baris
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text('1.', colNo + 2, rowTop + 6);
    doc.text(product.name, colDesc, rowTop + 6);
    doc.text(`UMKM: ${unitName}`, colDesc, rowTop + 11);
    doc.text(formatRupiah(unitPrice), colPrice, rowTop + 6);
    doc.text(String(quantity), colQty, rowTop + 6);
    doc.text(formatRupiah(totalPrice), colTotal, rowTop + 6, { align: 'right' });

    // Garis pemisah vertikal kolom tabel (header + isi)
    const tableBottom = rowTop + rowHeight;
    doc.line(margin, tableTop, margin, tableBottom); // kiri
    doc.line(colDesc - 2, tableTop, colDesc - 2, tableBottom);
    doc.line(colPrice - 2, tableTop, colPrice - 2, tableBottom);
    doc.line(colQty - 2, tableTop, colQty - 2, tableBottom);
    doc.line(pageWidth - margin, tableTop, pageWidth - margin, tableBottom); // kanan

    // Garis horizontal pemisah antara header dan isi sudah tercakup oleh border rect

    // Subtotal, etc.
    let summaryY2 = tableBottom + 10;
    doc.setFontSize(10);
    doc.text('Sub Total:', colPrice, summaryY2);
    doc.text(formatRupiah(totalPrice), colTotal, summaryY2, { align: 'right' });

    summaryY2 += 5;
    doc.text('Pajak (0%):', colPrice, summaryY2);
    doc.text(formatRupiah(0), colTotal, summaryY2, { align: 'right' });

    summaryY2 += 5;
    doc.text('Grand Total:', colPrice, summaryY2);
    doc.setTextColor(16, 185, 129);
    doc.text(formatRupiah(totalPrice), colTotal, summaryY2, { align: 'right' });
    doc.setTextColor(0, 0, 0);

    // Metode pembayaran & catatan di bawah
    let footerY = summaryY2 + 15;
    doc.setFontSize(11);
    doc.text('Metode Pembayaran', margin, footerY);

    footerY += 6;
    doc.setFontSize(9);
    const paymentLines = [
      '- Transfer Bank ke rekening berikut:',
      '  Bank BCA - 1234 567 898 a.n. Desa Fajar Baru / UMKM',
      '',
      'Syarat & Ketentuan:',
      '- Pembayaran harus dilakukan sesuai total pada invoice ini.',
      '- Simpan bukti pembayaran dan kirimkan ke admin melalui WhatsApp.',
    ];
    paymentLines.forEach((line) => {
      doc.text(line, margin, footerY);
      footerY += 5;
    });

    // Footer bar
    doc.setFillColor(7, 94, 133);
    doc.rect(0, 285, pageWidth, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('Terima kasih atas kepercayaan Anda kepada UMKM Desa Fajar Baru', pageWidth / 2, 292, {
      align: 'center',
    });
    doc.setTextColor(0, 0, 0);

    const fileName = `invoice-${unitName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    doc.save(fileName);

    // Build WhatsApp message
    const waNumber = '6285768514691';
    const messageLines = [
      'Assalamualaikum, saya ingin mengkonfirmasi pemesanan.',
      '',
      'Data sesuai invoice:',
      `Nama: ${displayName}`,
      `No. HP: ${displayPhone}`,
      `Kota/Kabupaten: ${displayCity}`,
      `Kode Pos: ${displayPostalCode}`,
      `Alamat: ${displayAddress}`,
      `Catatan: ${displayNote}`,
      '',
      `UMKM: ${unitName}`,
      `Produk: ${product.name}`,
      `Harga per unit: ${formatRupiah(unitPrice)}`,
      `Jumlah: ${quantity}`,
      `Total: ${formatRupiah(totalPrice)}`,
      '',
      'Saya akan melampirkan bukti pembayaran berdasarkan invoice yang sudah saya unduh.',
    ];

    const waText = encodeURIComponent(messageLines.join('\n'));
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 md:pt-28 pb-12">
        <div className="container mx-auto px-4">
          {/* Back breadcrumb */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center text-sm md:text-base text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Detail Unit
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Shipping address */}
            <div className="lg:col-span-2">
              <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">Alamat Pengiriman</h2>
                </div>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 text-sm md:text-base px-3 py-2.5 focus:ring-village-green focus:border-village-green"
                        placeholder="Nama penerima sesuai alamat"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1.5">
                        No. Handphone
                      </label>
                      <input
                        type="tel"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 text-sm md:text-base px-3 py-2.5 focus:ring-village-green focus:border-village-green"
                        placeholder="08xxxxxxxxxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1.5">
                        Kota / Kabupaten
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 text-sm md:text-base px-3 py-2.5 focus:ring-village-green focus:border-village-green"
                        placeholder="Contoh: Lampung Selatan"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1.5">
                      Alamat Lengkap
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 text-sm md:text-base px-3 py-2.5 focus:ring-village-green focus:border-village-green"
                      rows={3}
                      placeholder="Nama jalan, nomor rumah, RT/RW, desa/kelurahan, kecamatan"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1.5">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 text-sm md:text-base px-3 py-2.5 focus:ring-village-green focus:border-village-green"
                        placeholder="Kode pos daerah Anda"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1.5">
                        Catatan untuk Penjual (Opsional)
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 text-sm md:text-base px-3 py-2.5 focus:ring-village-green focus:border-village-green"
                        placeholder="Contoh: Titip ke satpam bila tidak di rumah"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: Order summary */}
            <aside className="space-y-4">
              <section className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Detail Pembayaran</h2>
                <div className="text-sm md:text-base text-gray-700 space-y-1">
                  <p className="font-medium">Transfer Bank</p>
                  <p className="text-xs md:text-sm text-gray-500">Nomor Rekening</p>
                  <p className="font-mono font-semibold">1234 567 898</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-2">Nama Penerima</p>
                  <p className="font-medium">Desa Fajar Baru / UMKM</p>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Informasi Produk</h2>

                <div className="rounded-xl bg-gray-50 p-4 md:p-5 text-sm md:text-base space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">UMKM:</span>
                    <span className="font-medium text-gray-900 text-right ml-4">{unitName}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">Produk:</span>
                    <span className="font-medium text-gray-900 text-right ml-4">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Harga per unit:</span>
                    <span className="font-medium text-gray-900 ml-4">{formatRupiah(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jumlah:</span>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setQuantity(Number.isNaN(val) || val <= 0 ? 1 : val);
                      }}
                      className="w-20 text-center rounded-lg border border-gray-300 bg-white text-sm md:text-base px-2 py-1 ml-4"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-1">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-semibold text-emerald-600 text-base md:text-lg ml-4">
                      {formatRupiah(totalPrice)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="mt-5 w-full bg-gradient-to-r from-village-green to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl text-sm md:text-base shadow-md"
                >
                  Pesan Sekarang
                </button>

                <p className="mt-3 text-xs md:text-sm text-gray-500">
                  Dengan menekan "Pesan Sekarang", Anda menyetujui ketentuan pemesanan dan akan menghubungi penjual untuk konfirmasi pembayaran.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default CheckoutPage;
