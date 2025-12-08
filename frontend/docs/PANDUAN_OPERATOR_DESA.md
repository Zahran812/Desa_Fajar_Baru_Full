# Panduan Operator Desa

Panduan ini ditujukan untuk **Operator Desa Fajar Baru** yang mengelola dashboard admin, data penduduk, layanan, informasi, transparansi, program, pesan, dan website.

> Operator bertanggung jawab memastikan data selalu **akurat, rapi, dan aman**, serta membantu Kepala Desa dalam proses verifikasi.

---

## 1. Akses Dashboard Operator

1. Buka **https://desafajarbaru.co**.
2. Klik tombol **Login / Masuk**.
3. Masukkan **username/NIK/email** dan **password** operator.
4. Setelah berhasil login, pilih **Dashboard Operator** jika sistem menyediakan beberapa peran.

Di sisi kiri akan tampil **menu utama** seperti:
- Dashboard
- Kelola Pengguna
- Kelola Penduduk
- Kelola Layanan
- Kelola Informasi
- Kelola Transparansi
- Kelola Program
- Pesan
- Kelola Website

---

## 2. Dashboard Utama

Di halaman awal dashboard operator biasanya terdapat:

- Ringkasan **jumlah pengguna**, **permohonan layanan**, **pesan masuk**, dan **data kependudukan pending**.
- Notifikasi pintar (smart notification) seperti:
  - Registrasi warga yang menunggu disetujui
  - Permohonan layanan yang masih *pending*
  - Data kependudukan yang belum diverifikasi

Gunakan ringkasan ini untuk menentukan prioritas pekerjaan harian.

---

## 3. Kelola Pengguna

Menu **Kelola Pengguna** digunakan untuk mengelola akun:

### 3.1. Melihat Daftar Pengguna

- Buka **Kelola Pengguna**.
- Lihat daftar warga terdaftar, lengkap dengan status (aktif/pending/diblokir).

### 3.2. Menyetujui Registrasi Baru

1. Buka tab **Registrasi Pending / Pending Users**.
2. Periksa data pendaftar (nama, NIK, alamat, dll.) dan cocokkan dengan dokumen jika diperlukan.
3. Klik **Setujui / Approve** untuk mengaktifkan akun, atau **Tolak** jika data tidak valid.

### 3.3. Mengatur Hak Akses

- Untuk akun tertentu (mis. perangkat desa), operator dapat mengubah **role** menjadi:
  - Warga (citizen)
  - Operator desa
  - Kepala dusun
  - Kepala desa (hanya jika diberi kewenangan)
- Gunakan menu **Edit Pengguna** untuk mengubah peran atau menonaktifkan akun.

---

## 4. Kelola Penduduk

Menu **Kelola Penduduk** digunakan untuk data kependudukan berbasis dusun dan RT.

### 4.1. Tampilan Daftar Dusun (Cards)

1. Buka **Kelola Penduduk → Cards**.
2. Anda akan melihat **Daftar Dusun** dengan ringkasan:
   - Nama dusun: Dusun I, Dusun II A, Dusun II B, Dusun III A, Dusun III B, Dusun IV, Dusun V.
   - Jumlah KK dan penduduk per dusun.
3. Data ini membantu memantau komposisi penduduk setiap dusun.

### 4.2. Tampilan Tabel (Data Penduduk)

1. Pindah ke mode **Tabel**.
2. Di sini akan tampil daftar penduduk per baris, misalnya:
   - No, RT, RW, Alamat, Nama Lengkap, NIK, dsb.
3. Secara default, setelah perbaikan, tabel ini **kosong** dan hanya akan terisi setelah proses **import data Excel**.

### 4.3. Import Data Penduduk dari Excel

1. Siapkan file Excel sesuai **template** yang disediakan desa (kolom NIK, Nama, Alamat, RT, RW, Dusun, dll.).
2. Di halaman **Kelola Penduduk → Tabel**, klik tombol **Import Data**.
3. Pilih file Excel dari komputer/flashdisk.
4. Sistem akan:
   - Membaca sheet pertama.
   - Mencari baris header (kolom NIK / Nama).
   - Menampilkan **preview data**.
5. Periksa preview:
   - Pastikan NIK dan nama terisi dengan benar.
   - Baris dengan NIK/nama kosong akan dianggap tidak valid.
6. Klik **Import** jika data sudah benar.
7. Data valid akan disimpan ke database dan tampil di tabel.

> Jangan mengimpor file yang belum dibersihkan; jika ada kesalahan, sebaiknya perbaiki di Excel lalu import ulang.

### 4.4. Export Data Penduduk

1. Klik tombol **Export Data**.
2. Pilih apakah ingin mengekspor **semua data** atau hanya **data terpilih**.
3. Sistem akan menghasilkan file Excel yang dapat diunduh dan digunakan untuk laporan atau backup.

---

## 5. Kelola Layanan

Menu **Kelola Layanan** mengatur:
- Jenis layanan administrasi
- Permohonan yang diajukan warga
- Dokumen hasil (surat)

### 5.1. Sub-Tab Layanan Administrasi

1. Pilih menu **Kelola Layanan**.
2. Pastikan sub-tab **Layanan Administrasi** aktif.
3. Di sini operator dapat:
   - Menambah / mengedit jenis layanan (nama, persyaratan, waktu proses, template surat)
   - Mengatur apakah layanan bisa diajukan online atau offline

### 5.2. Mengelola Permohonan Layanan

1. Buka daftar permohonan yang masuk.
2. Untuk setiap permohonan:
   - Periksa **data warga** dan **dokumen lampiran**.
   - Ubah status menjadi **diproses**, **lengkapi berkas**, **disetujui**, atau **ditolak** sesuai hasil verifikasi.
3. Tambahkan **catatan** jika ada kekurangan berkas supaya warga bisa memperbaiki.
4. Jika layanan membutuhkan tanda tangan kepala desa:
   - Pastikan data sudah benar,
   - Lanjutkan ke alur verifikasi kepala desa (lihat panduan Kades).

### 5.3. Template Surat & Preview

- Operator dapat membuka **preview surat** (misalnya SKTM) untuk memastikan logo, kop surat, dan data warga sudah benar.
- Untuk surat yang memakai QR code:
  - Pastikan QR tampil dan bisa discan untuk verifikasi.

---

## 6. Kelola Informasi & Transparansi

### 6.1. Kelola Informasi

1. Buka menu **Kelola Informasi**.
2. Di sini operator dapat mengelola:
   - Berita desa
   - Agenda kegiatan
   - Galeri foto
3. Saat menambah berita/agenda:
   - Isi judul, isi, tanggal, dan kategori.
   - Unggah gambar pendukung bila perlu.
   - Gunakan bahasa yang jelas dan sopan.

### 6.2. Kelola Transparansi (APBDes & Laporan)

1. Buka menu **Kelola Transparansi**.
2. Isi atau perbarui data:
   - APBDes (anggaran dan realisasi)
   - Laporan keuangan singkat
3. Pastikan angka yang ditampilkan **sesuai dokumen resmi** dan sudah mendapat persetujuan pimpinan.

---

## 7. Kelola Program & BUMDes

1. Buka menu **Kelola Program**.
2. Tambah atau edit data program, misalnya:
   - Program kesehatan
   - Program sosial
   - Program ekonomi & BUMDes
3. Untuk **unit usaha BUMDes/UMKM**:
   - Isi nama unit, deskripsi, alamat, kontak, dan gambar.
   - Data ini akan tampil di halaman publik seperti **BUMDes & Ekonomi** dan halaman unit usaha.

---

## 8. Mengelola Pesan & Aspirasi

1. Pilih menu **Pesan**.
2. Lihat daftar pesan/aspirasi dari warga.
3. Untuk setiap pesan:
   - Tandai sebagai **dibaca** agar notifikasi berkurang.
   - Tambahkan **balasan** jika diperlukan.
   - Kategorikan pesan (mis. infrastruktur, pelayanan, sosial) untuk memudahkan tindak lanjut.

> Disarankan menjawab pesan dengan bahasa ramah dan memberikan estimasi tindak lanjut bila memungkinkan.

---

## 9. Kelola Website (Konten Publik)

Jika fitur ini diaktifkan, operator dapat:

- Mengubah teks di beberapa halaman statis (profil desa, visi misi, kontak, dsb.).
- Mengatur link media sosial resmi.
- Memastikan gambar-gambar penting (logo, foto kepala desa, dsb.) tampil dengan benar.

Pastikan setiap perubahan konten sudah dikomunikasikan dan disetujui oleh pimpinan.

---

## 10. Bekerja Sama dengan Kepala Dusun & Kepala Desa

- Data dusun dan penduduk biasanya dikoordinasikan dengan **Kepala Dusun** (Kadus).
- Permohonan surat penting akan diverifikasi atau ditandatangani oleh **Kepala Desa**.
- Operator memastikan:
  - Semua data yang muncul di tampilan Kepala Desa (Kades Dashboard) sudah rapi.
  - Status layanan diperbarui setelah kades mengambil keputusan.

---

## 11. Keamanan & Backup

- Jangan membagikan akun operator kepada orang lain.
- Gunakan password yang kuat dan ganti secara berkala.
- Lakukan **export data** penduduk/laporan secara periodik sebagai backup offline (sesuai kebijakan desa).
- Jika menemukan bug atau error, catat langkah kejadiannya dan laporkan ke pengembang/penanggung jawab IT.

---

## 12. Bantuan Teknis

Jika mengalami kendala teknis:

- Dokumentasikan dengan **screenshot** dan catatan.
- Sampaikan kepada pengembang sistem atau konsultan IT yang menangani website desa.
- Untuk masalah konten/data, koordinasikan dengan Kepala Desa atau Sekretaris Desa.
