# 🚀 Quick Start - Demo Login

## ✅ Status: Siap Digunakan!

Demo mode sudah **aktif dan siap digunakan** baik di localhost maupun production (setelah deploy).

---

## 🎯 Akun Demo yang Tersedia

### 1. Operator Desa
```
📱 Nomor: 08123456789
🔑 Password: operator123
```

### 2. Kepala Dusun
```
📱 Nomor: 081234560000
🔑 Password: dusun123
```

### 3. Pengguna Masyarakat
```
📱 Nomor: 081234560011
🔑 Password: pengguna123
```

---

## 🌐 Cara Login

### Di Website (Setelah Deploy)

1. Buka `https://your-website.com/login`
2. Lihat banner **"🎭 Mode Demo Aktif"**
3. Klik salah satu tombol akun demo
4. Klik **"Masuk"**

### Di Localhost

1. Jalankan: `npm run dev`
2. Buka: `http://localhost:5173/login`
3. Gunakan akun demo di atas
4. Login dan akses dashboard

---

## 📦 Deploy ke Netlify

```bash
# 1. Build project
npm run build

# 2. Deploy (atau gunakan Netlify CLI)
netlify deploy --prod

# Demo mode otomatis aktif! 🎉
```

Demo mode sudah dikonfigurasi di `netlify.toml` dengan `VITE_DEMO_AUTH=true`.

---

## 🔍 Cek Demo Mode Aktif

Buka console browser (F12), lihat:
```
🎭 DEMO MODE AKTIF
✅ Login tersedia tanpa backend
📱 Gunakan akun demo yang tersedia di halaman login
```

---

## 📚 Dokumentasi Lengkap

Baca file berikut untuk informasi detail:

- **`DEMO_MODE_PRODUCTION.md`** - Panduan lengkap demo mode
- **`DEMO_ACCOUNTS.md`** - Detail akun demo & akses
- **`DEPLOYMENT_GUIDE.md`** - Panduan deployment

---

## ⚠️ Penting!

- ✅ Demo mode **HANYA untuk testing & showcase**
- ❌ **JANGAN** gunakan untuk data sensitif
- ✅ Untuk production nyata, setup backend dan set `VITE_DEMO_AUTH=false`

---

**Selamat mencoba! 🎉**
