# 🎭 Mode Demo - Login Tanpa Backend

## 📌 Ringkasan

Website Desa Fajar Baru kini dilengkapi dengan **sistem demo mode** yang memungkinkan login dan akses dashboard **tanpa memerlukan backend server**. Ini sangat berguna untuk:

- ✅ Demo website di hosting (Netlify, Vercel, dll) tanpa setup backend
- ✅ Testing dan development lokal
- ✅ Presentasi dan showcase fitur website
- ✅ Prototyping sebelum backend siap

---

## 🚀 Cara Mengaktifkan Demo Mode di Production

### Netlify

Demo mode **sudah otomatis aktif** di Netlify karena konfigurasi `netlify.toml`:

```toml
[build.environment]
  VITE_DEMO_AUTH = "true"
```

**Tidak perlu konfigurasi tambahan!** Setelah deploy, demo mode akan langsung aktif.

### Vercel

Tambahkan environment variable di dashboard Vercel:

1. Buka **Settings** → **Environment Variables**
2. Tambahkan variabel baru:
   - **Name:** `VITE_DEMO_AUTH`
   - **Value:** `true`
   - **Environments:** Production, Preview, Development
3. Redeploy website Anda

### Hosting Lainnya

Pastikan environment variable `VITE_DEMO_AUTH=true` di-set saat build:

```bash
VITE_DEMO_AUTH=true npm run build
```

---

## 🔐 Daftar Akun Demo

### 1. 👨‍💼 Operator Desa (Administrator)

```
📱 Nomor: 08123456789
🔑 Password: operator123
📊 Dashboard: /dashboard/operator
```

**Akses:**
- Kelola pengguna & registrasi
- Kelola data penduduk
- Kelola layanan administrasi
- Kelola berita & informasi
- Kelola transparansi (APBDes, IDM, Bansos)
- Kelola program desa
- Full admin access

---

### 2. 👥 Kepala Dusun

```
📱 Nomor: 081234560000
🔑 Password: dusun123
📊 Dashboard: /dashboard/dusun
```

**Akses:**
- Input data penduduk RT/RW
- Approve permohonan layanan warga
- Lihat statistik dusun
- Kelola data RT dalam dusun

---

### 3. 🙋 Pengguna Masyarakat (Warga)

```
📱 Nomor: 081234560011
🔑 Password: pengguna123
📊 Dashboard: /dashboard/citizen
```

**Akses:**
- Ajukan permohonan layanan administrasi
- Lacak status permohonan
- Lihat informasi program desa
- Akses informasi transparansi
- Komunikasi dengan operator/kepala dusun

---

## 🎯 Cara Menggunakan

### Metode 1: Quick Fill (Tercepat)

1. Buka halaman Login: `https://your-website.com/login`
2. Lihat banner **"Mode Demo Aktif"** berwarna biru di bagian atas form
3. Scroll ke bawah, lihat section **"Akun Demo - Tanpa Backend"**
4. Klik salah satu tombol akun demo (Operator, Kepala Dusun, atau Pengguna)
5. Kredensial akan otomatis terisi
6. Klik tombol **"Masuk"**

### Metode 2: Manual Input

1. Buka halaman Login
2. Masukkan nomor telepon dan password secara manual
3. Klik tombol **"Masuk"**

---

## 🔍 Identifikasi Demo Mode Aktif

Website akan menampilkan beberapa indikator bahwa demo mode aktif:

### 1. Console Browser
Buka Developer Tools (F12), lihat console:
```
🎭 DEMO MODE AKTIF
✅ Login tersedia tanpa backend
📱 Gunakan akun demo yang tersedia di halaman login
```

### 2. Banner di Login Page
Banner biru gradient di bagian atas form dengan text:
```
🎭 Mode Demo Aktif
Website berjalan tanpa backend. Gunakan akun demo di bawah untuk login dan mengakses dashboard.
```

### 3. Section Akun Demo
Section dengan background hijau-biru dengan judul:
```
🎭 Akun Demo - Tanpa Backend
```

---

## 💾 Persistensi Data

### Penyimpanan
- Data login disimpan di **localStorage** browser
- Key storage: `demo_user`
- Data akan tetap tersimpan meskipun halaman di-refresh

### Logout
- Logout akan menghapus data dari localStorage
- User akan diredirect ke homepage

### Clear Data
Untuk menghapus data demo secara manual:
```javascript
localStorage.removeItem('demo_user');
```

---

## ⚠️ Batasan Demo Mode

### ❌ Tidak Tersedia:
- **Pendaftaran user baru** - Gunakan akun demo yang sudah disediakan
- **Reset password** - Gunakan password default
- **Forgot password** - Fitur dinonaktifkan
- **API calls** - Semua data simulasi di frontend
- **Persistensi database** - Data hilang saat refresh (kecuali login)

### ✅ Tersedia:
- **Login & logout** - Full functional
- **Navigation antar halaman** - Full functional
- **Dashboard access** - Sesuai role
- **UI/UX testing** - Full functional
- **Showcase fitur** - Full functional

---

## 🔒 Keamanan

### ⚠️ PENTING - Hanya untuk Demo!

```
🚨 JANGAN gunakan demo mode untuk production dengan data sensitif!
```

**Alasan:**
- Password di-hardcode di client-side (tidak aman)
- Tidak ada enkripsi atau hashing password
- Tidak ada validasi server-side
- Semua data tersimpan di localStorage (mudah diakses)

**Untuk Production dengan Data Nyata:**
- Gunakan backend authentication yang proper
- Set `VITE_DEMO_AUTH=false`
- Konfigurasi `VITE_API_BASE_URL` ke backend Anda

---

## 🛠️ Konfigurasi Lanjutan

### Menambah Akun Demo Baru

Edit file `src/react-app/contexts/AuthContext.tsx`:

```typescript
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  '08123456789': { 
    password: 'operator123', 
    user: { 
      id: 1, 
      username: 'operator', 
      email: 'operator@example.com', 
      full_name: 'Operator Desa', 
      role: 'operator', 
      rt_number: '01' 
    } 
  },
  // Tambahkan akun baru di sini
  '08199999999': { 
    password: 'custom123', 
    user: { 
      id: 4, 
      username: 'custom', 
      email: 'custom@example.com', 
      full_name: 'Custom User', 
      role: 'custom_role', 
      rt_number: '02' 
    } 
  },
};
```

Kemudian update `Login.tsx` untuk menampilkan akun baru di UI.

---

## 🔄 Migrasi ke Backend

Saat backend sudah siap, ikuti langkah ini:

### 1. Update Environment Variable

**Netlify:**
```toml
# netlify.toml
[build.environment]
  VITE_DEMO_AUTH = "false"
  VITE_API_BASE_URL = "https://your-backend-api.com"
```

**Vercel/Lainnya:**
```env
VITE_DEMO_AUTH=false
VITE_API_BASE_URL=https://your-backend-api.com
```

### 2. Redeploy Website

```bash
# Build dengan backend mode
npm run build

# Deploy
# (gunakan command deployment sesuai hosting Anda)
```

### 3. Verifikasi

- Demo mode banner tidak muncul
- Login menggunakan backend API
- Pendaftaran user baru aktif

---

## 🧪 Testing

### Checklist Testing Demo Mode

#### Login & Authentication
- [x] Demo mode banner muncul di login page
- [x] Console log "DEMO MODE AKTIF" muncul
- [x] Section "Akun Demo" ditampilkan
- [x] Klik tombol demo mengisi kredensial otomatis
- [x] Login berhasil dengan akun demo
- [x] Redirect ke dashboard sesuai role
- [x] User data tersimpan di localStorage
- [x] Logout berhasil dan clear localStorage

#### Dashboard Access per Role
- [x] Operator → `/dashboard/operator`
- [x] Kepala Dusun → `/dashboard/dusun`
- [x] Pengguna → `/dashboard/citizen`

#### Restrictions
- [x] Pendaftaran user baru disabled
- [x] Forgot password tidak berfungsi
- [x] Message error untuk fitur disabled jelas

---

## 📞 Dukungan & Troubleshooting

### Masalah Umum

**1. Demo mode tidak aktif di production**
- ✅ Cek environment variable `VITE_DEMO_AUTH=true`
- ✅ Rebuild dan redeploy website

**2. Banner demo tidak muncul**
- ✅ Hard refresh (Ctrl + Shift + R)
- ✅ Clear browser cache
- ✅ Cek console untuk error

**3. Login tidak berhasil**
- ✅ Pastikan nomor telepon dan password benar (case-sensitive)
- ✅ Clear localStorage: `localStorage.clear()`
- ✅ Coba akun demo lain

**4. Data hilang setelah refresh**
- ✅ Normal behavior untuk data selain login
- ✅ Hanya user session yang persist
- ✅ Untuk persist data, butuh backend

---

## 📚 Resources

### File Terkait
- `netlify.toml` - Konfigurasi Netlify
- `src/react-app/contexts/AuthContext.tsx` - Auth logic & demo users
- `src/react-app/pages/Login.tsx` - Login UI & demo section
- `DEMO_ACCOUNTS.md` - Dokumentasi akun demo detail

### Links
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Dibuat untuk:** Website Desa Fajar Baru  
**Versi:** 1.0.0  
**Terakhir Diperbarui:** November 2024  
**Mode:** Production-Ready Demo Authentication
