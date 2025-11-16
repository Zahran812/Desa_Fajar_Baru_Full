# 🔐 Login Setup - Backend Integration

## Status: ✅ CONFIGURED

Aplikasi telah dikonfigurasi untuk terhubung ke backend API Anda di:
```
https://desafajarbaru.co/desa-api/api/auth/login.php
```

---

## 📋 Konfigurasi Saat Ini

### File `.env`
```env
VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
VITE_DEMO_AUTH=false
```

**Mode Demo: DISABLED** - Aplikasi akan menggunakan backend API yang sebenarnya.

---

## 🚀 Testing Login

### 1. Akses Halaman Login
Buka aplikasi di browser dan navigasi ke:
```
http://localhost:5173/login
```

### 2. Masukkan Kredensial
- **Nomor Telepon**: Nomor yang terdaftar di database Anda
- **Password**: Password yang sesuai di database

### 3. Klik "Masuk"

---

## 🔧 Struktur API yang Diharapkan

### Request ke Backend
```http
POST https://desafajarbaru.co/desa-api/api/auth/login.php
Content-Type: application/json

{
  "phone": "08123456789",
  "password": "password123"
}
```

### Response dari Backend

#### ✅ Login Berhasil (HTTP 200)
```json
{
  "user": {
    "id": 1,
    "username": "operator",
    "email": "operator@example.com",
    "full_name": "Nama Lengkap User",
    "role": "operator",
    "rt_number": "01"
  }
}
```

#### ❌ Login Gagal (HTTP 401/400)
```json
{
  "error": "Nomor telepon atau kata sandi tidak valid"
}
```

---

## 🎯 Role-Based Redirect

Setelah login berhasil, user akan otomatis diredirect berdasarkan role:

| Role | Redirect URL |
|------|--------------|
| `operator` | `/dashboard/operator` |
| `dusun_head` | `/dashboard/dusun` |
| `citizen` | `/dashboard/citizen` |

---

## 🛠️ Troubleshooting

### Login Gagal - Periksa Hal Berikut:

#### 1. **CORS Error**
Jika muncul CORS error di console browser, backend harus menambahkan headers:
```php
<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
?>
```

#### 2. **Network Error**
- Pastikan URL backend dapat diakses: `https://desafajarbaru.co/desa-api/api/auth/login.php`
- Test di browser atau Postman terlebih dahulu
- Periksa console browser (F12 → Network tab)

#### 3. **Response Format**
Backend HARUS mengembalikan JSON dengan struktur:
```json
{
  "user": {
    "id": <number>,
    "role": "operator|dusun_head|citizen",
    "username": <string>,
    "full_name": <string>,
    "email": <string>
  }
}
```

#### 4. **Cookie/Session Issues**
- Backend harus set cookies dengan `SameSite=None; Secure` jika menggunakan HTTPS
- Atau gunakan JWT token di response

---

## 📝 Debugging Steps

### Cek Request/Response di Browser:

1. Buka **Developer Tools** (F12)
2. Buka tab **Network**
3. Filter by **XHR** atau **Fetch**
4. Login di aplikasi
5. Lihat request ke `login.php`:
   - **Request Payload**: Pastikan phone & password terkirim
   - **Response**: Lihat apa yang dikembalikan backend
   - **Status Code**: 200 = sukses, 4xx = error client, 5xx = error server

### Console Logs:
Periksa console browser untuk error messages:
```
- "Login error:" = Ada error saat proses login
- "Auth check failed:" = Error saat check session
- CORS error = Backend belum configure CORS
```

---

## 🔄 Switching Mode

### Kembali ke Demo Mode (Tanpa Backend):
Edit `.env`:
```env
VITE_DEMO_AUTH=true
```

Demo accounts:
- Operator: `08123456789` / `operator123`
- Kepala Dusun: `081234560000` / `dusun123`
- Masyarakat: `081234560011` / `pengguna123`

### Production Mode (Dengan Backend):
Edit `.env`:
```env
VITE_DEMO_AUTH=false
VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
```

**Note**: Setelah edit `.env`, restart dev server:
```bash
npm run dev
```

---

## 📞 API Endpoints Terintegrasi

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/auth/login.php` | POST | User login |
| `/api/auth/register.php` | POST | User registration |
| `/api/auth/me.php` | GET | Check current session |
| `/api/auth/logout.php` | POST | User logout |

---

## ✅ Checklist Testing

- [ ] Server development berjalan (`npm run dev`)
- [ ] Buka http://localhost:5173/login
- [ ] Masukkan kredensial dari database
- [ ] Klik "Masuk"
- [ ] Periksa Network tab di DevTools
- [ ] Verifikasi response dari backend
- [ ] Pastikan redirect ke dashboard sesuai role

---

**Terakhir Diupdate**: 1 November 2024  
**Backend URL**: https://desafajarbaru.co/desa-api  
**Status**: Production Backend Integrated
