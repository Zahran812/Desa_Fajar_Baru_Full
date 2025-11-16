<?php
/**
 * Login API Endpoint
 * File: desa-api/api/auth/login.php
 * 
 * PASTIKAN FILE INI ADA DI SERVER ANDA DI:
 * https://desafajarbaru.co/desa-api/api/auth/login.php
 */

// ==================== CORS HEADERS ====================
// PENTING: Ini memungkinkan frontend mengakses API
header('Access-Control-Allow-Origin: http://localhost:5173'); // Development
// header('Access-Control-Allow-Origin: https://yourdomain.com'); // Production - uncomment saat deploy
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ==================== DATABASE CONNECTION ====================
// Sesuaikan dengan konfigurasi database Anda
$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_db_username';
$password = 'your_db_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// ==================== GET INPUT DATA ====================
// Ambil data JSON dari request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

$phone = $data['phone'] ?? '';
$password = $data['password'] ?? '';

// ==================== VALIDATION ====================
if (empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nomor telepon harus diisi']);
    exit;
}

if (empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Password harus diisi']);
    exit;
}

// ==================== CHECK USER IN DATABASE ====================
try {
    // Query untuk mencari user berdasarkan phone
    $stmt = $pdo->prepare("
        SELECT 
            id, 
            username, 
            email, 
            full_name, 
            password_hash,
            role,
            rt_number,
            status
        FROM users 
        WHERE phone = :phone
        LIMIT 1
    ");
    
    $stmt->bindParam(':phone', $phone);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // User tidak ditemukan
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Nomor telepon atau kata sandi tidak valid']);
        exit;
    }

    // Cek status user (jika ada kolom status)
    if (isset($user['status']) && $user['status'] !== 'active') {
        http_response_code(403);
        echo json_encode(['error' => 'Akun Anda belum diaktifkan atau ditangguhkan']);
        exit;
    }

    // ==================== VERIFY PASSWORD ====================
    // Gunakan password_verify untuk password yang di-hash dengan password_hash()
    if (!password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Nomor telepon atau kata sandi tidak valid']);
        exit;
    }

    // ==================== CREATE SESSION ====================
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['phone'] = $phone;

    // ==================== RETURN SUCCESS RESPONSE ====================
    http_response_code(200);
    echo json_encode([
        'user' => [
            'id' => (int)$user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'full_name' => $user['full_name'],
            'role' => $user['role'],
            'rt_number' => $user['rt_number'] ?? null
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    exit;
}
?>
