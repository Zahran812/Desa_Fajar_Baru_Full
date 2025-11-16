# 🔐 Demo Akun - Website Desa Fajar Baru

## Mode Demo
Website ini dilengkapi dengan **sistem demo akun** yang memungkinkan Anda untuk mengakses dan mengelola dashboard **tanpa memerlukan backend server**.

Mode demo **otomatis aktif** di:
- Development mode (`npm run dev`)
- Production dengan environment variable `VITE_DEMO_AUTH=true`

## 📋 Daftar Akun Demo

### 1. 👨‍💼 **Operator Desa**
**Role:** Administrator Sistem
- **Nomor Telepon:** `08123456789`
- **Password:** `operator123`
- **Dashboard:** `/dashboard/operator`
- **Akses:**
  - Kelola pengguna (approve/reject registrasi)
  - Kelola data penduduk
  - Kelola layanan administrasi
  - Kelola informasi & berita
  - Kelola transparansi (APBDes, IDM, Bansos)
  - Kelola program desa
  - Kelola pesan sistem
  - Kelola website content

---

### 2. 👥 **Kepala Dusun**
**Role:** Pengelola Dusun/RT
- **Nomor Telepon:** `081234560000`
- **Password:** `dusun123`
- **Dashboard:** `/dashboard/dusun`
- **Akses:**
  - Input data penduduk RT/RW
  - Approve permohonan layanan dari warga
  - Lihat statistik dusun
  - Kelola data RT dalam dusun

---

### 3. 🙋 **Pengguna Masyarakat**
**Role:** Warga Desa
- **Nomor Telepon:** `081234560011`
- **Password:** `pengguna123`
- **Dashboard:** `/dashboard/citizen`
- **Akses:**
  - Ajukan permohonan layanan administrasi
  - Lacak status permohonan
  - Lihat informasi program desa
  - Akses informasi transparansi
  - Komunikasi dengan operator/kepala dusun

---

## 🚀 Cara Menggunakan

### Metode 1: Quick Fill (Rekomendasi)
1. Buka halaman Login: `/login`
2. Lihat section **"Akun Demo"** di bawah form login
3. Klik salah satu tombol akun demo
4. Kredensial akan otomatis terisi
5. Klik tombol **"Masuk"**

### Metode 2: Manual Input
1. Buka halaman Login: `/login`
2. Masukkan nomor telepon dan password secara manual
3. Klik tombol **"Masuk"**

---

## ⚙️ Konfigurasi

### Aktifkan Mode Demo
Buat file `.env` di root project:

```env
VITE_DEMO_AUTH=true
```

### Nonaktifkan Mode Demo (Gunakan Backend)
```env
VITE_DEMO_AUTH=false
VITE_API_BASE_URL=http://localhost:8787
```

---

## 💾 Persistensi Data

Data login demo disimpan di:
- **localStorage** browser dengan key `demo_user`
- Data akan tetap tersimpan meskipun halaman di-refresh
- Logout akan menghapus data dari localStorage

---

## 🔒 Keamanan

⚠️ **PENTING:**
- Mode demo hanya untuk testing dan development
- **JANGAN** gunakan di production dengan data sensitif
- Password di-hardcode di client-side (tidak aman untuk production)
- Untuk production, selalu gunakan backend authentication yang proper

---

## 🛠️ Pengembangan

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
  // Tambahkan akun baru di sini...
};
```

### Menambah Role Baru
1. Update interface `User` dengan role baru
2. Tambah routing di `Login.tsx` pada useEffect redirect
3. Buat dashboard page baru untuk role tersebut
4. Update DEMO_USERS dengan akun role baru

---

## 📞 Dukungan

Jika mengalami masalah:
1. Clear localStorage browser
2. Hard refresh (Ctrl + Shift + R)
3. Cek console browser untuk error
4. Pastikan mode demo aktif (`VITE_DEMO_AUTH=true`)

---

## ✅ Checklist Testing

### Operator Dashboard
- [ ] Login berhasil
- [ ] Approve/reject user registration
- [ ] Input data penduduk
- [ ] Kelola layanan administrasi
- [ ] Kelola berita & informasi
- [ ] Kelola transparansi data
- [ ] Kelola program desa
- [ ] Logout berhasil

### Kepala Dusun Dashboard
- [ ] Login berhasil
- [ ] Input data warga RT/RW
- [ ] Approve permohonan layanan
- [ ] Lihat statistik dusun
- [ ] Logout berhasil

### Citizen Dashboard
- [ ] Login berhasil
- [ ] Ajukan permohonan layanan
- [ ] Lacak status permohonan
- [ ] Lihat informasi program
- [ ] Kirim pesan ke operator
- [ ] Logout berhasil

---

**Dibuat untuk:** Website Desa Fajar Baru - Smart Village System  
**Terakhir Diperbarui:** Oktober 2024  
**Developer:** Robin - DigiBooster Indonesia
