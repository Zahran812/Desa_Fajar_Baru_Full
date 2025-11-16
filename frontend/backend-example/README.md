# 📁 Backend PHP Files - Contoh Implementasi

Folder ini berisi **contoh file PHP** yang perlu Anda upload ke hosting Anda.

## 🎯 PENTING: Lokasi File di Server

Upload file-file ini ke server Anda dengan struktur:

```
/public_html/desa-api/api/auth/
├── login.php      ← Upload file login.php di sini
├── logout.php     ← Upload file logout.php di sini
├── me.php         ← Upload file me.php di sini
└── register.php   ← Upload file register.php di sini
```

Sehingga dapat diakses di:
- `https://desafajarbaru.co/desa-api/api/auth/login.php`
- `https://desafajarbaru.co/desa-api/api/auth/logout.php`
- `https://desafajarbaru.co/desa-api/api/auth/me.php`
- `https://desafajarbaru.co/desa-api/api/auth/register.php`

---

## ⚙️ Konfigurasi yang Perlu Diubah

### 1. Database Connection (Semua File)

Ubah di setiap file PHP:

```php
$host = 'localhost';
$dbname = 'your_database_name';      // ← Ganti dengan nama database Anda
$username = 'your_db_username';      // ← Ganti dengan username database
$password = 'your_db_password';      // ← Ganti dengan password database
```

### 2. CORS Headers (Development vs Production)

**Saat Development (localhost):**
```php
header('Access-Control-Allow-Origin: http://localhost:5173');
```

**Saat Production (sudah deploy):**
```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
// Atau gunakan domain frontend Anda yang sebenarnya
```

---

## 📊 Schema Database yang Diperlukan

File PHP ini membutuhkan tabel `users` dengan struktur minimal:

```sql
CREATE TABLE users (
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
    status ENUM('active', 'pending', 'suspended') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_phone (phone),
    INDEX idx_nik (nik),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔒 Keamanan

### Password Hashing
File PHP menggunakan `password_hash()` dan `password_verify()`:

```php
// Saat register
$password_hash = password_hash($password, PASSWORD_BCRYPT);

// Saat login
if (!password_verify($password, $user['password_hash'])) {
    // Password salah
}
```

### Session Management
- Session dimulai dengan `session_start()`
- User ID disimpan di `$_SESSION['user_id']`
- Logout menghapus session dengan `session_destroy()`

---

## 🧪 Testing

### Test dengan Postman atau cURL:

**1. Register User:**
```bash
curl -X POST https://desafajarbaru.co/desa-api/api/auth/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "08123456789",
    "password": "password123",
    "nik": "3304123456789012",
    "full_name": "Test User"
  }'
```

**2. Login:**
```bash
curl -X POST https://desafajarbaru.co/desa-api/api/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "08123456789",
    "password": "password123"
  }'
```

**3. Check Session:**
```bash
curl -X GET https://desafajarbaru.co/desa-api/api/auth/me.php \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
```

---

## 📝 Checklist Upload

- [ ] Upload `login.php` ke server
- [ ] Upload `logout.php` ke server
- [ ] Upload `me.php` ke server
- [ ] Upload `register.php` ke server
- [ ] Ubah database credentials di semua file
- [ ] Ubah CORS origin sesuai domain frontend
- [ ] Test endpoint dengan Postman/cURL
- [ ] Verifikasi struktur tabel database
- [ ] Test login dari frontend React

---

## ⚠️ Catatan Penting

1. **JANGAN** commit file dengan password database asli ke Git
2. Gunakan `.env` atau config file terpisah untuk credentials
3. Pastikan PHP session sudah diaktifkan di server
4. Pastikan `php-pdo` extension terinstall
5. Set permission file PHP ke 644 (`chmod 644 *.php`)

---

**File ini adalah CONTOH IMPLEMENTASI**  
Sesuaikan dengan kebutuhan dan struktur database Anda yang sebenarnya.
