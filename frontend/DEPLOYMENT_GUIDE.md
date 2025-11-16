# 📦 Panduan Deployment Website Desa Fajar Baru

## 🚀 Persiapan Build Production

### 1. Install Dependencies (Jika Belum)
```bash
npm install terser vite-plugin-compression --save-dev
```

### 2. Build untuk Production
```bash
npm run build
```

File hasil build akan ada di folder `dist/`

---

## 🌐 Deployment ke Berbagai Platform

### ✅ **Apache Hosting (Shared Hosting, cPanel)**

#### Langkah-langkah:
1. **Build website**:
   ```bash
   npm run build
   ```

2. **Upload ke hosting**:
   - Upload semua isi folder `dist/` ke folder `public_html/` atau `www/`
   - File `.htaccess` sudah otomatis termasuk dalam folder `public/`

3. **Pastikan file `.htaccess` aktif**:
   - File ini sudah dibuat otomatis di `public/.htaccess`
   - Akan tercopy ke `dist/.htaccess` saat build
   - Berfungsi untuk routing multipage React

#### File penting untuk Apache:
- ✅ `.htaccess` - Routing & caching
- ✅ `index.html` - Entry point

---

### ✅ **Netlify**

#### Option 1: Deploy via Git
1. Push code ke GitHub/GitLab
2. Import project di Netlify
3. Settings sudah otomatis dari `netlify.toml`

#### Option 2: Deploy Manual
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

#### File penting untuk Netlify:
- ✅ `netlify.toml` - Configuration
- ✅ `public/_redirects` - Routing rules

---

### ✅ **Vercel**

#### Deploy via CLI:
```bash
npm install -g vercel
npm run build
vercel --prod
```

#### File penting untuk Vercel:
- ✅ `vercel.json` - Configuration

---

### ✅ **Nginx Server**

1. **Build website**:
   ```bash
   npm run build
   ```

2. **Copy build ke server**:
   ```bash
   scp -r dist/* user@your-server:/var/www/your-site/
   ```

3. **Setup Nginx**:
   - Copy konfigurasi dari `nginx.conf.example`
   - Edit sesuai domain Anda
   - Simpan di `/etc/nginx/sites-available/your-site`
   - Enable site:
     ```bash
     sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
     sudo nginx -t
     sudo systemctl reload nginx
     ```

---

## 📊 Optimasi yang Sudah Diterapkan

### ✅ **Build Optimization**
- ✅ Minifikasi JavaScript dengan Terser
- ✅ Minifikasi CSS dengan Lightning CSS
- ✅ Remove console.log di production
- ✅ Code splitting & lazy loading
- ✅ Tree shaking untuk bundle size kecil
- ✅ Asset optimization & hashing

### ✅ **Caching Strategy**
- ✅ Static assets: 1 year cache
- ✅ HTML: No cache (always fresh)
- ✅ GZIP compression
- ✅ Browser caching headers

### ✅ **Security Headers**
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy

### ✅ **Performance**
- ✅ Code splitting by route
- ✅ Lazy loading components
- ✅ Image optimization
- ✅ Font optimization
- ✅ Prefetch critical resources

---

## 🔍 Verifikasi Setelah Deploy

### Cek Routing
Pastikan semua route bekerja:
- `/` - Homepage
- `/profil/pejabat-struktural`
- `/layanan`
- `/berita`
- dll.

### Cek Performance
Gunakan tools berikut:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### Target Performance:
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Time to Interactive: < 3.5s
- ✅ Bundle size: < 500KB (gzipped)

---

## 🛠️ Troubleshooting

### Masalah: 404 Error di Sub-routes
**Solusi**: Pastikan file `.htaccess` atau routing config sudah aktif

### Masalah: Blank Page
**Solusi**: 
1. Cek console browser untuk error
2. Pastikan base URL benar di build
3. Cek apakah assets ter-load dengan benar

### Masalah: Slow Loading
**Solusi**:
1. Enable GZIP di hosting
2. Pastikan browser caching aktif
3. Gunakan CDN untuk assets (optional)

---

## 📝 Checklist Deploy

- [ ] Run `npm run build` tanpa error
- [ ] Test di local dengan `npm run preview`
- [ ] Upload folder `dist/` ke hosting
- [ ] Pastikan `.htaccess` ada (untuk Apache)
- [ ] Test semua route berfungsi
- [ ] Test di berbagai browser
- [ ] Test di mobile
- [ ] Cek performance score
- [ ] Setup SSL/HTTPS
- [ ] Setup custom domain (optional)

---

## 📞 Support

Jika ada masalah saat deployment, cek:
1. Error di browser console (F12)
2. Error di hosting control panel
3. Log server (jika akses tersedia)

**Good luck! 🚀**
