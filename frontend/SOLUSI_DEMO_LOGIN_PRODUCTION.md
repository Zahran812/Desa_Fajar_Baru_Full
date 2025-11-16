# 🔧 SOLUSI: Demo Login Tidak Berfungsi di Production

## 🎯 ROOT CAUSE
File `.env` Anda memiliki konfigurasi yang MEMATIKAN demo mode di production:
```env
VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
VITE_DEMO_AUTH=false  ← MASALAH!
```

Ketika `npm run build`, Vite membaca file `.env` dan:
- `VITE_DEMO_AUTH=false` → Demo mode MATI
- `import.meta.env.DEV=false` → Bukan development mode
- Demo users tidak bisa login ❌

---

## ✅ SOLUSI 1: Full Demo Mode (RECOMMENDED untuk showcase)

### Langkah 1: Edit File `.env`
Buka file `.env` di root project dan ubah menjadi:
```env
# AKTIFKAN DEMO MODE
VITE_DEMO_AUTH=true

# COMMENT atau HAPUS baris ini
# VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
```

### Langkah 2: Rebuild Project
```bash
# Hapus folder dist lama
rm -rf dist

# Build ulang dengan env vars baru
npm run build
```

### Langkah 3: Upload ke Hosting
Upload seluruh isi folder `dist` ke hosting Anda.

### ✅ Hasil
- Demo mode aktif
- Login dengan akun demo berfungsi
- Tidak perlu backend

---

## ✅ SOLUSI 2: Demo Mode dengan Backend Fallback

Jika Anda ingin tetap connect ke backend tetapi demo users tetap bisa login:

### Edit File `.env`:
```env
# AKTIFKAN DEMO MODE
VITE_DEMO_AUTH=true

# Backend sebagai fallback (opsional)
VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
```

### Rebuild:
```bash
npm run build
```

### ✅ Hasil
- Demo users bisa login
- Jika ada user non-demo, akan coba connect ke backend
- Best of both worlds

---

## ✅ SOLUSI 3: Build dengan Environment Variable Langsung

Tanpa edit `.env`, build langsung dengan command:

### Windows (PowerShell):
```powershell
$env:VITE_DEMO_AUTH="true"; npm run build
```

### Linux/Mac:
```bash
VITE_DEMO_AUTH=true npm run build
```

### ✅ Hasil
- Demo mode aktif untuk build ini saja
- File `.env` tidak berubah

---

## 🧪 TESTING SETELAH SOLUSI

### 1. Test di Localhost
Setelah rebuild, test dulu di localhost:
```bash
npm run preview
```
Buka http://localhost:4173/login dan coba login dengan:
- Phone: `08123456789`
- Password: `operator123`

### 2. Upload ke Hosting
Jika berhasil di preview, upload folder `dist` ke hosting.

### 3. Clear Cache Browser
Di hosting, tekan `Ctrl + Shift + R` untuk hard refresh.

---

## 🔍 VERIFIKASI DEMO MODE AKTIF

Setelah upload ke hosting, buka Console browser (F12) di halaman login.

**Jika demo mode aktif, akan muncul:**
```
🎭 DEMO MODE AKTIF
✅ Login tersedia tanpa backend
📱 Gunakan akun demo yang tersedia di halaman login
```

**Jika tidak muncul = demo mode masih MATI**

---

## 📝 CATATAN PENTING

### Environment Variables di Vite:
1. ✅ Harus prefix dengan `VITE_`
2. ✅ Di-inject saat BUILD TIME (bukan runtime)
3. ✅ Harus defined SEBELUM `npm run build`
4. ❌ Tidak bisa diubah setelah build

### Artinya:
- Environment variables dari hosting **TIDAK AKAN WORK**
- Harus rebuild setiap kali ubah env vars
- File `.env` di folder `dist` tidak ada gunanya

---

## 🎭 DEMO ACCOUNTS (Reminder)

Setelah demo mode aktif, gunakan akun ini:

### Operator Desa (Admin)
- Phone: `08123456789`
- Password: `operator123`
- Dashboard: `/dashboard/operator`

### Kepala Dusun
- Phone: `081234560000`
- Password: `dusun123`
- Dashboard: `/dashboard/dusun`

### Warga (Citizen)
- Phone: `081234560011`
- Password: `pengguna123`
- Dashboard: `/dashboard/citizen`

---

## ⚠️ TROUBLESHOOTING

### Masalah: Banner demo tidak muncul di production
**Solusi:** 
- Pastikan `VITE_DEMO_AUTH=true` di `.env`
- Rebuild: `npm run build`
- Upload ulang folder `dist`

### Masalah: Login gagal dengan "Invalid credentials"
**Solusi:**
- Buka Console (F12) → cek apakah ada error
- Cek apakah demo mode aktif
- Clear localStorage: `localStorage.clear()` di Console

### Masalah: Perubahan UI tidak muncul
**Solusi:**
- Pastikan sudah rebuild (`npm run build`)
- Upload SELURUH isi folder `dist` (overwrite semua)
- Hard refresh di browser: `Ctrl + Shift + R`
- Clear cache hosting (jika ada)

---

## 🚀 QUICK FIX COMMANDS

**Full rebuild dari awal:**
```bash
# 1. Hapus build lama
rm -rf dist

# 2. Build dengan demo mode
npm run build

# 3. Preview local (opsional)
npm run preview

# 4. Upload dist/ ke hosting
```

---

## 📌 KESIMPULAN

**ROOT CAUSE:**
- `.env` memiliki `VITE_DEMO_AUTH=false`
- Production build membaca `.env` saat build
- Demo mode jadi MATI di production

**SOLUSI TERCEPAT:**
1. Edit `.env` → ubah jadi `VITE_DEMO_AUTH=true`
2. `npm run build`
3. Upload folder `dist` ke hosting
4. Done! ✅

---

**Created:** November 11, 2025
**Status:** Production Ready
**Author:** AI Assistant - Comprehensive Root Cause Analysis
