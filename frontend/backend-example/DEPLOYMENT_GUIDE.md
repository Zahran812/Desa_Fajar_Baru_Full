# 🚀 Panduan Deployment Backend PHP

## 📋 Langkah-langkah Upload ke Hosting

### Step 1: Persiapkan File PHP

File yang perlu diupload dari folder `backend-example`:
- `login.php`
- `logout.php`
- `me.php`
- `register.php`

### Step 2: Upload via File Manager / FTP

**Menggunakan cPanel File Manager:**

1. Login ke cPanel hosting Anda
2. Buka **File Manager**
3. Navigasi ke folder: `/public_html/desa-api/api/auth/`
4. Upload keempat file PHP di atas
5. Set permission masing-masing file ke **644**

**Menggunakan FTP Client (FileZilla):**

1. Connect ke FTP server hosting
2. Upload file ke: `/public_html/desa-api/api/auth/`
3. Struktur akhir:
   ```
   /public_html/
   └── desa-api/
       └── api/
           └── auth/
               ├── login.php
               ├── logout.php
               ├── me.php
               └── register.php
   ```

### Step 3: Edit Database Credentials

Edit **SETIAP** file PHP yang diupload, ubah bagian ini:

```php
// ==================== DATABASE CONNECTION ====================
$host = 'localhost';                    // Biasanya 'localhost'
$dbname = 'nama_database_anda';        // ← GANTI INI
$username = 'username_database_anda';  // ← GANTI INI
$password = 'password_database_anda';  // ← GANTI INI
```

**Cara mendapatkan info database:**
- Login cPanel
- Buka **MySQL Databases** atau **phpMyAdmin**
- Lihat nama database, username, dan password

### Step 4: Update CORS Headers

Di setiap file PHP, ubah CORS origin:

**Development (saat test di localhost):**
```php
header('Access-Control-Allow-Origin: http://localhost:5173');
```

**Production (setelah deploy frontend):**
```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

Atau untuk allow semua origin (TIDAK DISARANKAN untuk production):
```php
header('Access-Control-Allow-Origin: *');
```

### Step 5: Test Endpoints

**Test dengan browser:**
```
https://desafajarbaru.co/desa-api/api/auth/login.php
```

Jika muncul error atau blank page, itu normal (karena perlu POST request).

**Test dengan cURL/Postman:**

```bash
# Test Login
curl -X POST https://desafajarbaru.co/desa-api/api/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"phone":"08123456789","password":"test123"}'
```

Expected response jika gagal login:
```json
{"error":"Nomor telepon atau kata sandi tidak valid"}
```

Expected response jika berhasil:
```json
{
  "user": {
    "id": 1,
    "username": "user_12345678",
    "email": "08123456789@desafajarbaru.id",
    "full_name": "Test User",
    "role": "citizen",
    "rt_number": "01"
  }
}
```

---

## 🗄️ Setup Database

### Buat Tabel Users

Login ke **phpMyAdmin** di cPanel, jalankan SQL ini:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Data Pribadi
    nik VARCHAR(16) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    birth_place VARCHAR(100),
    birth_date DATE,
    gender ENUM('LAKI-LAKI', 'PEREMPUAN'),
    blood_type VARCHAR(5),
    
    -- Alamat
    address TEXT,
    rt_number VARCHAR(5),
    rw_number VARCHAR(5),
    dusun VARCHAR(100),
    village VARCHAR(100),
    district VARCHAR(100),
    regency VARCHAR(100),
    province VARCHAR(100),
    
    -- Informasi Lain
    religion VARCHAR(50),
    marital_status VARCHAR(50),
    occupation VARCHAR(100),
    
    -- System
    role ENUM('operator', 'dusun_head', 'citizen') DEFAULT 'citizen',
    status ENUM('active', 'pending', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_phone (phone),
    INDEX idx_nik (nik),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Insert Test User

```sql
-- Password: "test123"
INSERT INTO users (
    username, email, phone, password_hash, 
    full_name, role, status
) VALUES (
    'testuser',
    'test@example.com',
    '08123456789',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
    'Test User',
    'citizen',
    'active'
);
```

**Note:** Hash di atas adalah untuk password "test123"

### Generate Password Hash Baru

Jika ingin buat user dengan password lain, gunakan script ini:

```php
<?php
// Buat file temporary: generate_hash.php
$password = "password_anda";
$hash = password_hash($password, PASSWORD_BCRYPT);
echo "Password Hash: " . $hash;
?>
```

Upload ke server, akses via browser, copy hash-nya.

---

## ✅ Verification Checklist

### Backend (Server)

- [ ] File PHP sudah diupload ke `/desa-api/api/auth/`
- [ ] Database credentials sudah diubah di semua file
- [ ] CORS headers sudah disesuaikan
- [ ] Tabel `users` sudah dibuat
- [ ] Test user sudah diinsert
- [ ] Test endpoint dengan Postman berhasil

### Frontend (React)

- [ ] `.env` sudah diupdate:
      ```
      VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
      VITE_DEMO_AUTH=false
      ```
- [ ] Dev server sudah restart (`npm run dev`)
- [ ] Buka http://localhost:5173/login
- [ ] Login dengan test user berhasil
- [ ] Redirect ke dashboard sesuai role

---

## 🐛 Troubleshooting

### Error: "Database connection failed"
- Cek database credentials di file PHP
- Pastikan database sudah dibuat di cPanel
- Cek apakah user database punya akses ke database

### Error: "CORS policy"
- Update CORS header di file PHP
- Pastikan origin sesuai dengan domain frontend
- Restart server jika perlu

### Error: "User not found"
- Pastikan tabel `users` sudah ada
- Insert test user terlebih dahulu
- Cek apakah phone number cocok

### Login berhasil tapi tidak redirect
- Periksa response JSON di Network tab
- Pastikan field `role` terisi dengan benar
- Check console browser untuk error

### Session tidak persist
- Pastikan PHP session enabled di server
- Cek cookie settings di browser
- Pastikan `credentials: 'include'` di fetch

---

## 📞 Production Deployment

Setelah testing berhasil di localhost, deploy frontend:

1. Build frontend: `npm run build`
2. Upload folder `dist` ke hosting
3. Update CORS di backend PHP ke domain production
4. Update `.env.production` di frontend
5. Test login dari domain production

---

**PENTING**: Jangan lupa backup database sebelum testing!
