# 🎭 QUICK REFERENCE - AKUN DEMO PRODUCTION

## 🚀 READY FOR PRODUCTION!

Website Anda **SUDAH DIKONFIGURASI** untuk berjalan dalam **DEMO MODE** di production.
Tidak perlu backend/database - semua berfungsi di browser!

---

## 🔐 AKUN DEMO (Gunakan di Production)

### 1️⃣ OPERATOR DESA (Administrator)
```
📱 Nomor: 08123456789
🔑 Password: operator123
📊 Role: operator
🎯 Dashboard: /dashboard/operator
```

### 2️⃣ KEPALA DUSUN
```
📱 Nomor: 081234560000
🔑 Password: dusun123
📊 Role: dusun_head
🎯 Dashboard: /dashboard/dusun
```

### 3️⃣ WARGA/PENGGUNA
```
📱 Nomor: 081234560011
🔑 Password: pengguna123
📊 Role: citizen
🎯 Dashboard: /dashboard/citizen
```

---

## 📦 DEPLOYMENT STEPS

### **1. BUILD**
```bash
npm run build
```

### **2. UPLOAD**
Upload **ISI folder `dist/`** ke hosting Anda:
```
public_html/         ← Root hosting
├── index.html      ← LANGSUNG di root
├── assets/
├── logo/
├── Gambar Artikel/
├── .htaccess       ← Sudah included
└── ...
```

❌ **JANGAN**: Upload folder `dist/` itu sendiri
✅ **BENAR**: Upload **ISI** dari folder `dist/`

### **3. TEST**
1. Buka: `https://yourdomain.com/login`
2. Klik tombol "Operator Desa"
3. Klik "Masuk"
4. ✅ Dashboard operator terbuka!

---

## ✅ CHECKLIST POST-DEPLOYMENT

- [ ] Homepage loads: `https://yourdomain.com`
- [ ] Login page works: `https://yourdomain.com/login`
- [ ] Demo mode banner terlihat: "🎭 Mode Demo Aktif"
- [ ] 3 tombol akun demo tersedia
- [ ] Login operator → Dashboard operator terbuka
- [ ] Login dusun → Dashboard dusun terbuka
- [ ] Login citizen → Dashboard citizen terbuka
- [ ] Logout berfungsi → Kembali ke homepage
- [ ] Protected routes bekerja (tidak bisa akses dashboard tanpa login)
- [ ] Console log: "🎭 DEMO MODE AKTIF"

---

## 🎯 CARA PENGGUNAAN DI PRODUCTION

### **Quick Login (Recommended)**
1. Buka `/login`
2. Klik salah satu tombol:
   - **"Operator Desa"**
   - **"Kepala Dusun"**
   - **"Pengguna Masyarakat"**
3. Klik **"Masuk"**
4. ✅ **SELESAI!** Dashboard terbuka otomatis

### **Manual Login**
1. Buka `/login`
2. Ketik nomor telepon: `08123456789`
3. Ketik password: `operator123`
4. Klik **"Masuk"**
5. ✅ Dashboard operator terbuka

---

## 🛡️ KEAMANAN & FITUR

✅ **Protected Routes**: Dashboard tidak bisa diakses tanpa login
✅ **Role-Based Access**: Setiap role hanya bisa akses dashboard-nya
✅ **Auto-Redirect**: Login otomatis ke dashboard sesuai role
✅ **localStorage**: Data user tersimpan di browser
✅ **Logout**: Clear data dan redirect ke homepage

---

## 🐛 TROUBLESHOOTING CEPAT

### **Problem: Demo mode tidak aktif**
```bash
# Solution:
1. Hard refresh: Ctrl + Shift + R
2. Clear browser cache
3. Cek Console (F12) - harus ada: "🎭 DEMO MODE AKTIF"
```

### **Problem: 404 saat refresh halaman dashboard**
```bash
# Solution: Pastikan ada file .htaccess di root hosting
# File .htaccess sudah included di folder public/
```

### **Problem: Tidak bisa login**
```bash
# Solution:
1. Clear localStorage: localStorage.clear() di Console
2. Hard refresh: Ctrl + Shift + R
3. Coba akun demo yang berbeda
```

### **Problem: Redirect loop**
```bash
# Solution:
1. Open Incognito/Private window
2. Clear all browser data
3. Cek Console untuk error messages
```

---

## 📊 VERIFY DEMO MODE AKTIF

Buka Console browser (F12) setelah load website.
Harus terlihat log ini:

```javascript
🎭 DEMO MODE AKTIF
✅ Login tersedia tanpa backend
📱 Gunakan akun demo yang tersedia di halaman login
ℹ️ Backend URL tidak dikonfigurasi - menggunakan demo mode
```

Jika ada → ✅ Demo mode aktif!
Jika tidak ada → ❌ Ada masalah, re-build dan upload ulang

---

## 💾 FILE KONFIGURASI PENTING

Sudah dikonfigurasi, **TIDAK PERLU DIUBAH**:

1. ✅ `src/react-app/contexts/AuthContext.tsx`
   - Line 67: `const DEMO_ENABLED = true;`
   
2. ✅ `src/react-app/components/ProtectedRoute.tsx`
   - Protected route component
   
3. ✅ `src/react-app/App.tsx`
   - Dashboard routes dengan ProtectedRoute
   
4. ✅ `public/.htaccess`
   - SPA routing configuration

---

## 🎉 KESIMPULAN

**Website SIAP PRODUCTION dengan DEMO MODE!**

- ✅ Build: `npm run build`
- ✅ Upload: Isi folder `dist/` ke hosting
- ✅ Test: Akses `/login` dan gunakan akun demo
- ✅ **SELESAI!**

**Semua akun demo akan berfungsi sempurna di production!**

---

## 📞 NEED HELP?

1. Check **PRODUCTION_DEPLOYMENT_GUIDE.md** untuk panduan lengkap
2. Buka Console (F12) untuk lihat error
3. Test di Incognito mode untuk bypass cache

---

**Last Updated**: 14 November 2025
**Demo Mode Status**: ✅ **AKTIF PERMANEN**
