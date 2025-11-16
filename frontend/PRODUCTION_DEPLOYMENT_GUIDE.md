# 🚀 PANDUAN DEPLOYMENT PRODUCTION - DEMO MODE

## ✅ STATUS KONFIGURASI

**DEMO MODE**: ✅ **HARDCODED - SELALU AKTIF**
```typescript
// File: src/react-app/contexts/AuthContext.tsx (Line 67)
const DEMO_ENABLED = true; // FORCE ENABLED untuk production
```

**Artinya**: Website akan SELALU berjalan dalam demo mode, bahkan di production build!

---

## 📋 CHECKLIST PRE-DEPLOYMENT

### ✅ Verifikasi Konfigurasi
- [x] `DEMO_ENABLED = true` di AuthContext.tsx
- [x] Protected Routes aktif di App.tsx
- [x] ProtectedRoute component exists
- [x] Demo users tersedia (3 role)
- [x] Login form dengan quick demo buttons

### ✅ Test di Local
```bash
# 1. Build production
npm run build

# 2. Preview production build
npm run preview

# 3. Test di browser (biasanya http://localhost:4173)
# - Akses: http://localhost:4173/login
# - Test login operator
# - Test login dusun
# - Test login citizen
# - Verifikasi semua dashboard berfungsi
```

---

## 🔨 BUILD UNTUK PRODUCTION

### **Step 1: Build Project**
```bash
# Pastikan dependencies ter-install
npm install

# Build untuk production
npm run build
```

**Output**: Folder `dist/` berisi file production-ready

### **Step 2: Verifikasi Build**
```bash
# Preview build locally
npm run preview

# Test di browser
# URL biasanya: http://localhost:4173
```

### **Step 3: Verifikasi File Build**
Pastikan folder `dist/` berisi:
```
dist/
├── index.html          ✅ Entry point
├── assets/
│   ├── *.js           ✅ JavaScript bundles
│   ├── *.css          ✅ Stylesheets
│   └── ...
├── logo/              ✅ Logo Lampung Selatan
│   └── Logo Kabupaten Lampung Selatan.png
├── Gambar Artikel/    ✅ Article images
│   └── Bupati Lampung Selatan...jpg
├── site.webmanifest   ✅ PWA manifest
└── ... (other assets)
```

---

## ☁️ UPLOAD KE CLOUD HOSTING

### **Metode 1: Hosting Statis (Netlify/Vercel)**

#### **NETLIFY**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### **VERCEL**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**IMPORTANT**: Kedua platform ini akan otomatis mendeteksi build settings dari:
- `netlify.toml` (untuk Netlify)
- `vercel.json` (untuk Vercel)

---

### **Metode 2: cPanel / File Manager Hosting**

#### **Step-by-Step:**

1. **Compress folder dist**
   ```bash
   # Windows PowerShell
   Compress-Archive -Path dist\* -DestinationPath dist.zip
   
   # Atau manual: Zip semua isi folder dist (bukan folder dist-nya)
   ```

2. **Upload ke cPanel**
   - Login ke cPanel hosting Anda
   - Buka **File Manager**
   - Navigate ke folder `public_html` atau `www`
   - Upload `dist.zip`
   - Extract di hosting

3. **Penting: Extract Structure**
   ```
   public_html/  (atau www/)
   ├── index.html        ← Langsung di root
   ├── assets/
   ├── logo/
   ├── Gambar Artikel/
   └── ...
   
   ❌ JANGAN SEPERTI INI:
   public_html/
   └── dist/
       ├── index.html
       └── ...
   ```

4. **Konfigurasi .htaccess** (Untuk SPA routing)
   
   Buat file `.htaccess` di root folder `public_html`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     
     # Serve existing files/directories
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     
     # Route everything to index.html
     RewriteRule ^ /index.html [L]
   </IfModule>
   
   # Compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
   </IfModule>
   
   # Browser caching
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/gif "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/webp "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

---

### **Metode 3: VPS/Dedicated Server (Nginx)**

#### **Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/html/desa-fajar-baru;
    index index.html;
    
    # SPA routing - semua request ke index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Static assets caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Images caching
    location ~* \.(jpg|jpeg|png|gif|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public";
    }
    
    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

**Deploy Steps:**
```bash
# 1. Upload dist ke server
scp -r dist/* user@yourserver:/var/www/html/desa-fajar-baru/

# 2. Set permissions
ssh user@yourserver
cd /var/www/html/desa-fajar-baru
chmod -R 755 .
chown -R www-data:www-data .

# 3. Restart Nginx
sudo systemctl restart nginx
```

---

## 🧪 POST-DEPLOYMENT TESTING

### **✅ Checklist Verification**

1. **Akses Website**
   ```
   https://yourdomain.com
   ```

2. **Test Homepage**
   - [ ] Homepage loads correctly
   - [ ] Navigation menu works
   - [ ] Links berfungsi

3. **Test Login Page**
   ```
   https://yourdomain.com/login
   ```
   
   Verifikasi:
   - [ ] Halaman login terbuka
   - [ ] Banner "🎭 Mode Demo Aktif" terlihat
   - [ ] 3 tombol akun demo tersedia:
     - Operator Desa
     - Kepala Dusun
     - Pengguna Masyarakat

4. **Test Login - Operator**
   - [ ] Klik "Operator Desa" button
   - [ ] Kredensial terisi: 08123456789 / operator123
   - [ ] Klik "Masuk"
   - [ ] ✅ Redirect ke `/dashboard/operator`
   - [ ] Dashboard operator tampil lengkap
   - [ ] Tidak ada error di Console (F12)

5. **Test Login - Kepala Dusun**
   - [ ] Logout dari operator
   - [ ] Login dengan "Kepala Dusun"
   - [ ] ✅ Redirect ke `/dashboard/dusun`
   - [ ] Dashboard dusun tampil lengkap

6. **Test Login - Citizen**
   - [ ] Logout
   - [ ] Login dengan "Pengguna Masyarakat"
   - [ ] ✅ Redirect ke `/dashboard/citizen`
   - [ ] Dashboard citizen tampil lengkap

7. **Test Protected Routes**
   - [ ] Logout
   - [ ] Coba akses langsung: `https://yourdomain.com/dashboard/operator`
   - [ ] ❌ Harus redirect ke `/login` (tidak bisa akses tanpa login)

8. **Test Role-Based Access**
   - [ ] Login sebagai citizen
   - [ ] Coba akses: `/dashboard/operator`
   - [ ] ❌ Harus redirect ke `/dashboard/citizen` (tidak bisa akses dashboard role lain)

9. **Browser Console Check (F12)**
   ```javascript
   // Harus terlihat:
   🎭 DEMO MODE AKTIF
   ✅ Login tersedia tanpa backend
   📱 Gunakan akun demo yang tersedia di halaman login
   ```

10. **localStorage Check**
    ```javascript
    // Setelah login, cek di Console:
    JSON.parse(localStorage.getItem('demo_user'))
    
    // Output harus ada user data:
    {
      id: 1,
      username: "operator",
      role: "operator",
      ...
    }
    ```

---

## 🐛 TROUBLESHOOTING PRODUCTION

### **Problem 1: 404 Error saat refresh halaman**
**Penyebab**: Server tidak dikonfigurasi untuk SPA routing

**Solusi:**
- **cPanel**: Pastikan ada `.htaccess` dengan RewriteRule
- **Nginx**: Tambahkan `try_files $uri $uri/ /index.html;`
- **Netlify/Vercel**: Otomatis handled (ada `_redirects`/`vercel.json`)

---

### **Problem 2: "Cannot GET /dashboard/operator"**
**Penyebab**: Sama dengan Problem 1

**Solusi**: Sama dengan Problem 1

---

### **Problem 3: Demo mode tidak aktif di production**
**Cek:**
```javascript
// Di Console browser (F12):
// Harus ada log ini:
🎭 DEMO MODE AKTIF
```

**Jika tidak ada:**
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Hard refresh: `Ctrl + Shift + R`
3. Cek file source di browser DevTools:
   - Cari file `AuthContext` di Sources tab
   - Verifikasi `DEMO_ENABLED = true`

**Jika masih error:**
```bash
# Re-build dari scratch
rm -rf dist node_modules
npm install
npm run build
# Upload ulang ke hosting
```

---

### **Problem 4: Images tidak muncul**
**Cek:**
- Pastikan folder `Gambar Artikel/` dan `logo/` ada di hosting
- Cek path di browser Console untuk error 404
- Verifikasi case-sensitive filenames (Linux hosting case-sensitive)

**Solusi:**
```bash
# Pastikan struktur folder benar:
public_html/
├── Gambar Artikel/    ← Huruf besar
│   └── Bupati...jpg
└── logo/              ← Huruf kecil
    └── Logo Kabupaten...png
```

---

### **Problem 5: Favicon tidak berubah**
**Solusi:**
1. Clear browser cache completely
2. Hard refresh: `Ctrl + Shift + R`
3. Cek di Incognito/Private window
4. Tunggu beberapa menit (browser cache CDN)

---

## 📊 MONITORING PRODUCTION

### **Tools untuk Monitor:**

1. **Browser DevTools (F12)**
   - Console: Cek error JavaScript
   - Network: Cek failed requests
   - Application > localStorage: Cek demo_user data

2. **Google Search Console**
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Monitor indexing status

3. **Google Analytics** (Optional)
   - Track page views
   - Monitor user flow

---

## 📝 SUMMARY DEPLOYMENT

### **✅ Apa yang Sudah Dikonfigurasi:**

1. **Demo Mode**: HARDCODED sebagai `true` di AuthContext.tsx
2. **Protected Routes**: Dashboard routes dilindungi dengan ProtectedRoute component
3. **Role-Based Access**: Setiap role hanya bisa akses dashboard-nya sendiri
4. **Auto-Redirect**: Login otomatis redirect ke dashboard sesuai role
5. **Quick Login**: 3 tombol demo account di halaman login
6. **localStorage**: Data user disimpan di browser
7. **Logout**: Clear localStorage dan redirect ke homepage

### **✅ Akun Demo yang Tersedia di Production:**

```
🔐 OPERATOR DESA
📱 Phone: 08123456789
🔑 Password: operator123
📊 Dashboard: /dashboard/operator

🔐 KEPALA DUSUN
📱 Phone: 081234560000
🔑 Password: dusun123
📊 Dashboard: /dashboard/dusun

🔐 WARGA/PENGGUNA
📱 Phone: 081234560011
🔑 Password: pengguna123
📊 Dashboard: /dashboard/citizen
```

### **✅ Cara Pakai di Production:**

1. Buka `https://yourdomain.com/login`
2. Klik salah satu tombol akun demo
3. Klik "Masuk"
4. ✅ Dashboard terbuka sesuai role!

---

## 🎯 KESIMPULAN

**Website Anda SUDAH SIAP untuk production deployment dengan demo mode!**

- ✅ Tidak perlu backend/database
- ✅ Tidak perlu konfigurasi tambahan
- ✅ Semua akun demo berfungsi
- ✅ Role-based access sudah diterapkan
- ✅ Protected routes aktif
- ✅ Auto-redirect sudah bekerja

**Langkah selanjutnya:**
1. `npm run build`
2. Upload folder `dist/` ke hosting
3. Pastikan ada `.htaccess` (untuk Apache) atau konfigurasi Nginx
4. Akses `yourdomain.com/login`
5. ✅ **SELESAI!**

---

## 📞 SUPPORT

Jika ada masalah setelah deployment:

1. **Check Console Logs** (F12)
   - Harus ada: "🎭 DEMO MODE AKTIF"
   
2. **Check localStorage**
   ```javascript
   localStorage.getItem('demo_user')
   ```

3. **Test di Incognito Mode**
   - Untuk memastikan bukan cache issue

4. **Check Network Tab**
   - Lihat jika ada file yang 404

---

**🎉 GOOD LUCK WITH YOUR DEPLOYMENT! 🎉**
