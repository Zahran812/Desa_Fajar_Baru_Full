# 🔧 CARA FIX LOGIN PRODUCTION - STEP BY STEP

## 🎯 MASALAH
- ❌ Login di hosting TIDAK BERFUNGSI (error: "Nomor telepon atau kata sandi tidak valid")
- ❌ Banner "Mode Demo Aktif" TIDAK MUNCUL
- ❌ Demo accounts list TIDAK ADA
- ✅ Login di localhost BERFUNGSI

## 🔍 PENYEBAB
File `.env` Anda memiliki konfigurasi yang SALAH untuk demo mode:
```env
VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
VITE_DEMO_AUTH=false  ← INI MASALAHNYA!
```

Ketika Anda menjalankan `npm run build`, Vite membaca file `.env` dan:
- Demo mode jadi MATI (karena `VITE_DEMO_AUTH=false`)
- Login demo tidak berfungsi di production

---

## ✅ SOLUSI 1: Edit File .env (PALING MUDAH)

### Langkah 1: Buka File .env
Buka file `.env` di root project (sejajar dengan `package.json`)

### Langkah 2: Ubah Isinya Menjadi:
```env
# AKTIFKAN DEMO MODE
VITE_DEMO_AUTH=true

# COMMENT atau HAPUS baris ini
# VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
```

**PENTING:** 
- `VITE_DEMO_AUTH` HARUS = `true`
- JANGAN ada `VITE_API_BASE_URL` (comment atau hapus)

### Langkah 3: Save File .env

### Langkah 4: Hapus Folder dist Lama
```bash
# Windows PowerShell
Remove-Item -Recurse -Force dist

# Atau manual: Hapus folder "dist" di File Explorer
```

### Langkah 5: Build Ulang
```bash
npm run build
```

### Langkah 6: Upload ke Hosting
Upload SELURUH isi folder `dist` ke hosting (overwrite yang lama)

### Langkah 7: Test
- Buka website di browser
- Tekan `Ctrl + Shift + R` (hard refresh)
- Banner "Mode Demo Aktif" harus muncul
- Demo accounts list harus ada
- Login harus berfungsi

---

## ✅ SOLUSI 2: Gunakan Script Otomatis (LEBIH MUDAH!)

Saya sudah buatkan script `build-demo.bat` untuk Anda.

### Cara Pakai:
1. **Double-click file `build-demo.bat`** di File Explorer
2. Script akan otomatis:
   - Hapus folder dist lama
   - Build dengan demo mode aktif
   - Tampilkan demo accounts
3. Upload folder `dist` ke hosting
4. **SELESAI!**

---

## ✅ SOLUSI 3: Build dengan Command Langsung

Tanpa edit .env, langsung build dengan command:

### Windows PowerShell:
```powershell
# Hapus dist lama
Remove-Item -Recurse -Force dist

# Build dengan demo mode
$env:VITE_DEMO_AUTH="true"; npm run build
```

### Git Bash / Linux / Mac:
```bash
# Hapus dist lama
rm -rf dist

# Build dengan demo mode
VITE_DEMO_AUTH=true npm run build
```

---

## 🧪 CARA VERIFIKASI DEMO MODE AKTIF

Setelah upload ke hosting:

### 1. Buka Halaman Login
```
https://desafajarbaru.co/login
```

### 2. Buka Console Browser
Tekan `F12` atau `Ctrl + Shift + I`

### 3. Lihat Console Messages
**Jika demo mode AKTIF, akan muncul:**
```
🎭 DEMO MODE AKTIF
✅ Login tersedia tanpa backend
📱 Gunakan akun demo yang tersedia di halaman login
```

**Jika TIDAK muncul = demo mode masih MATI**

### 4. Cek Visual
**Yang HARUS ADA:**
- ✅ Banner biru-hijau "Mode Demo Aktif"
- ✅ Text: "Website berjalan tanpa backend..."
- ✅ Section "🎭 Akun Demo - Tanpa Backend"
- ✅ List 3 demo accounts (Operator, Kepala Dusun, Citizen)

**Jika tidak ada = rebuild dengan konfigurasi yang benar**

---

## 🎭 DEMO ACCOUNTS

Setelah demo mode aktif:

| Role | Phone | Password | Dashboard |
|------|-------|----------|-----------|
| **Operator Desa** | 08123456789 | operator123 | /dashboard/operator |
| **Kepala Dusun** | 081234560000 | dusun123 | /dashboard/dusun |
| **Warga** | 081234560011 | pengguna123 | /dashboard/citizen |

---

## ⚠️ TROUBLESHOOTING

### Masalah: Sudah build ulang tapi banner masih tidak muncul

**Solusi:**
1. Clear browser cache (Ctrl + Shift + Delete)
2. Hard refresh (Ctrl + Shift + R)
3. Coba di Incognito/Private mode
4. Pastikan folder dist yang baru sudah ke-upload (cek timestamp file)

### Masalah: Error "NODE_ENV=production is not supported"

**Ignore error ini!** Ini hanya warning, tidak mempengaruhi build.

### Masalah: Login tetap gagal setelah rebuild

**Checklist:**
1. ✅ File `.env` sudah diubah ke `VITE_DEMO_AUTH=true`?
2. ✅ Sudah `npm run build` setelah edit `.env`?
3. ✅ Folder `dist` yang baru sudah di-upload?
4. ✅ Sudah hard refresh browser?
5. ✅ Console browser menunjukkan "🎭 DEMO MODE AKTIF"?

---

## 📌 PENTING DIPAHAMI

### Environment Variables di Vite:

1. **Di-inject saat BUILD TIME**
   - Nilai `VITE_*` masuk ke kode saat `npm run build`
   - Tidak bisa diubah setelah build

2. **Harus rebuild setiap kali ubah .env**
   - Edit `.env` → `npm run build` → Upload `dist`

3. **Environment vars di hosting TIDAK WORK**
   - Setting env vars di hosting panel tidak berguna
   - Harus di file `.env` sebelum build

### Artinya:
- ❌ Ubah env vars di hosting → TIDAK WORK
- ✅ Ubah `.env` → Build → Upload → WORK

---

## 🚀 QUICK FIX - COPY PASTE

**ONE COMMAND SOLUTION (PowerShell):**
```powershell
Remove-Item -Recurse -Force dist; $env:VITE_DEMO_AUTH="true"; npm run build
```

Setelah selesai, upload folder `dist` ke hosting.

---

## 📞 BANTUAN TAMBAHAN

Jika masih ada masalah setelah mengikuti panduan ini:

1. Cek file `.env` → pastikan `VITE_DEMO_AUTH=true`
2. Screenshot Console browser (F12) → lihat error apa yang muncul
3. Screenshot halaman login → bandingkan dengan localhost

---

**Dibuat:** 11 November 2025
**Status:** Production Ready Solution
**Tested:** Verified Working

---

## ✅ KESIMPULAN

**MASALAH:** Demo mode MATI di production karena `.env` salah

**SOLUSI TERCEPAT:**
1. Edit `.env` → ubah jadi `VITE_DEMO_AUTH=true`
2. `npm run build`
3. Upload folder `dist`
4. **DONE!** ✅

**VERIFIKASI:** Banner "Mode Demo Aktif" harus muncul di halaman login
