<?php
/**
 * Check Current Session API
 * File: desa-api/api/auth/me.php
 * 
 * Endpoint untuk mengecek user yang sedang login
 */

// ==================== CORS HEADERS ====================
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ==================== START SESSION ====================
session_start();

// ==================== CHECK IF USER IS LOGGED IN ====================
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

// ==================== DATABASE CONNECTION ====================
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

// ==================== GET USER DATA ====================
try {
    $stmt = $pdo->prepare("
        SELECT 
            id, 
            username, 
            email, 
            full_name, 
            role,
            rt_number
        FROM users 
        WHERE id = :user_id
        LIMIT 1
    ");
    
    $stmt->bindParam(':user_id', $_SESSION['user_id']);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // User tidak ditemukan, clear session
        session_destroy();
        http_response_code(401);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    // ==================== RETURN USER DATA ====================
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
    echo json_encode(['error' => 'Server error']);
    exit;
}
?>
