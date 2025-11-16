<?php
/**
 * Logout API
 * File: desa-api/api/auth/logout.php
 * 
 * Endpoint untuk logout user
 */

// ==================== CORS HEADERS ====================
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ==================== START AND DESTROY SESSION ====================
session_start();
session_unset();
session_destroy();

// Clear session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// ==================== RETURN SUCCESS ====================
http_response_code(200);
echo json_encode(['message' => 'Logged out successfully']);
?>
