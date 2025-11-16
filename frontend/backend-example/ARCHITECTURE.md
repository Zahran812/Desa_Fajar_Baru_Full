# 🏗️ Arsitektur Frontend-Backend

## 📊 Diagram Komunikasi

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (Client Side)                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  React Application (Login.tsx)                           │ │
│  │                                                          │ │
│  │  ┌────────────────────────────────────────┐            │ │
│  │  │  User Input:                           │            │ │
│  │  │  • Phone: 08123456789                  │            │ │
│  │  │  • Password: ********                  │            │ │
│  │  │                                        │            │ │
│  │  │  [Button: Masuk]                       │            │ │
│  │  └────────────────────────────────────────┘            │ │
│  │                        │                                │ │
│  │                        ▼                                │ │
│  │  ┌────────────────────────────────────────┐            │ │
│  │  │  AuthContext.tsx                       │            │ │
│  │  │  login(phone, password)                │            │ │
│  │  └────────────────────────────────────────┘            │ │
│  └──────────────────────┬───────────────────────────────────┘ │
│                         │                                     │
│                         │ HTTP POST Request                   │
│                         │ JSON: {phone, password}             │
└─────────────────────────┼─────────────────────────────────────┘
                          │
                          │ INTERNET
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER (Hosting)                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  https://desafajarbaru.co/desa-api/api/auth/login.php   │ │
│  │                                                          │ │
│  │  1. Terima Request JSON                                 │ │
│  │  2. Extract phone & password                            │ │
│  │  3. Query ke Database                                   │ │
│  │  4. Verify password                                     │ │
│  │  5. Create Session                                      │ │
│  │  6. Return JSON Response                                │ │
│  └──────────────────────┬───────────────────────────────────┘ │
│                         │                                     │
│                         ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  MySQL Database                                          │ │
│  │                                                          │ │
│  │  SELECT * FROM users WHERE phone = '08123456789'        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ HTTP Response
                          │ JSON: {user: {...}}
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (Client Side)                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  AuthContext.tsx                                         │ │
│  │                                                          │ │
│  │  if (response.ok) {                                     │ │
│  │    setUser(data.user)                                   │ │
│  │    return true                                          │ │
│  │  }                                                      │ │
│  └──────────────────────┬───────────────────────────────────┘ │
│                         │                                     │
│                         ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Login.tsx                                               │ │
│  │                                                          │ │
│  │  const success = await login(phone, password)           │ │
│  │  if (success) {                                         │ │
│  │    // Redirect based on role                           │ │
│  │    window.location.href = '/dashboard/...'             │ │
│  │  }                                                      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flow Detail: Login Process

### 1️⃣ User Action (Frontend)

**File: `Login.tsx` (Line 256-288)**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Call login function from AuthContext
  const success = await login(formData.phone, formData.password);
  
  if (!success) {
    setMessage({ 
      type: 'error', 
      content: 'Nomor telepon atau kata sandi tidak valid' 
    });
  }
  
  setIsSubmitting(false);
};
```

### 2️⃣ HTTP Request (Frontend)

**File: `AuthContext.tsx` (Line 92-123)**

```typescript
const login = async (phone: string, password: string): Promise<boolean> => {
  try {
    // Send POST request to backend
    const response = await fetch(`${API}/api/auth/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ phone, password }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};
```

### 3️⃣ Backend Processing (PHP)

**File: `login.php` (Backend Server)**

```php
<?php
// 1. Receive JSON data
$data = json_decode(file_get_contents('php://input'), true);
$phone = $data['phone'];
$password = $data['password'];

// 2. Query database
$stmt = $pdo->prepare("SELECT * FROM users WHERE phone = :phone");
$stmt->execute([':phone' => $phone]);
$user = $stmt->fetch();

// 3. Verify password
if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// 4. Create session
session_start();
$_SESSION['user_id'] = $user['id'];

// 5. Return user data
http_response_code(200);
echo json_encode([
    'user' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'full_name' => $user['full_name'],
        'role' => $user['role'],
        'rt_number' => $user['rt_number']
    ]
]);
?>
```

### 4️⃣ Redirect (Frontend)

**File: `Login.tsx` (Line 105-121)**

```typescript
useEffect(() => {
  if (user && !loading) {
    switch (user.role) {
      case 'operator':
        window.location.href = '/dashboard/operator';
        break;
      case 'dusun_head':
        window.location.href = '/dashboard/dusun';
        break;
      case 'citizen':
        window.location.href = '/dashboard/citizen';
        break;
      default:
        window.location.href = '/';
    }
  }
}, [user, loading]);
```

---

## 📁 File Structure

```
PROJECT ROOT
│
├── Frontend (React + TypeScript)
│   │
│   ├── src/react-app/
│   │   ├── pages/
│   │   │   └── Login.tsx          ← Form login UI
│   │   │
│   │   └── contexts/
│   │       └── AuthContext.tsx    ← Login logic, HTTP requests
│   │
│   └── .env                       ← Config API URL
│       VITE_API_BASE_URL=https://desafajarbaru.co/desa-api
│       VITE_DEMO_AUTH=false
│
└── Backend (PHP)
    │
    └── desa-api/api/auth/         ← Di server hosting
        ├── login.php              ← Handle login
        ├── logout.php             ← Handle logout
        ├── me.php                 ← Check session
        └── register.php           ← Handle registration
```

---

## 🔐 Data Flow: Request & Response

### Request dari Frontend

```http
POST https://desafajarbaru.co/desa-api/api/auth/login.php
Content-Type: application/json

{
  "phone": "08123456789",
  "password": "password123"
}
```

### Response dari Backend

**✅ Success (200):**
```json
{
  "user": {
    "id": 1,
    "username": "user_12345678",
    "email": "08123456789@desafajarbaru.id",
    "full_name": "John Doe",
    "role": "citizen",
    "rt_number": "01"
  }
}
```

**❌ Error (401):**
```json
{
  "error": "Nomor telepon atau kata sandi tidak valid"
}
```

---

## 🎯 Kenapa TIDAK Perlu PHP di Login.tsx?

### ❌ SALAH: Menaruh PHP di File React

```typescript
// ❌ INI SALAH - PHP tidak bisa jalan di browser
const Login = () => {
  <?php
    // PHP code di sini tidak akan jalan!
    $user = authenticate();
  ?>
  
  return <div>Login Form</div>;
};
```

**Alasan:**
- **Login.tsx** adalah file TypeScript yang di-compile jadi JavaScript
- JavaScript dijalankan di **browser** (client-side)
- PHP dijalankan di **server** (server-side)
- Browser **tidak bisa menjalankan** PHP!

### ✅ BENAR: Pisahkan Frontend dan Backend

**Frontend (Login.tsx):**
```typescript
// ✅ Benar - Kirim HTTP request ke server
const login = async (phone, password) => {
  const response = await fetch('https://.../login.php', {
    method: 'POST',
    body: JSON.stringify({ phone, password })
  });
  
  return await response.json();
};
```

**Backend (login.php):**
```php
<?php
// ✅ Benar - PHP jalan di server
$user = authenticate($phone, $password);
echo json_encode(['user' => $user]);
?>
```

---

## 🌐 Komunikasi Frontend ↔ Backend

### Protokol: HTTP/HTTPS

Frontend dan backend berkomunikasi lewat **HTTP requests**:

- **Frontend**: Kirim data dengan `fetch()` atau `axios`
- **Backend**: Terima data, proses, return JSON response
- **Format**: JSON (JavaScript Object Notation)

### Tidak Ada "Embed" PHP di React

React dan PHP adalah **dua aplikasi terpisah** yang berkomunikasi lewat API.

**Analogi:**
```
Frontend (React)   =  Kasir di restoran
Backend (PHP)      =  Dapur/Chef
HTTP Request       =  Order dari kasir ke dapur
HTTP Response      =  Makanan dari dapur ke kasir
```

Kasir **tidak perlu masuk ke dapur** untuk masak sendiri.
Kasir cukup **kirim order** dan **terima makanan jadi**.

---

## ✅ Summary

| Aspek | Frontend (React) | Backend (PHP) |
|-------|-----------------|---------------|
| **Lokasi** | Browser | Server Hosting |
| **Bahasa** | TypeScript/JavaScript | PHP |
| **File** | Login.tsx, AuthContext.tsx | login.php, me.php, etc |
| **Fungsi** | UI, User Input, HTTP Request | Database, Authentication |
| **Komunikasi** | Kirim request → | ← Terima response |

**Kesimpulan:**
- **TIDAK** perlu tambah PHP di Login.tsx
- Login.tsx cukup kirim HTTP request
- Backend PHP yang handle database dan authentication
- Komunikasi via JSON over HTTP/HTTPS

---

Semoga penjelasan ini memperjelas! 🚀
