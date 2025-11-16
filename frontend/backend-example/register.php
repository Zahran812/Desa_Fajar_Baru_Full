<?php
/**
 * Registration API
 * File: desa-api/api/auth/register.php
 * 
 * Endpoint untuk registrasi user baru
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

// ==================== GET INPUT DATA ====================
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Required fields
$phone = $data['phone'] ?? '';
$password = $data['password'] ?? '';
$nik = $data['nik'] ?? '';
$full_name = $data['full_name'] ?? '';

// Optional fields
$province = $data['province'] ?? '';
$regency = $data['regency'] ?? '';
$birth_place = $data['birth_place'] ?? '';
$birth_date = $data['birth_date'] ?? '';
$gender = $data['gender'] ?? '';
$blood_type = $data['blood_type'] ?? '';
$address = $data['address'] ?? '';
$rt_number = $data['rt_number'] ?? '';
$rw_number = $data['rw_number'] ?? '';
$dusun = $data['dusun'] ?? '';
$village = $data['village'] ?? '';
$district = $data['district'] ?? '';
$religion = $data['religion'] ?? '';
$marital_status = $data['marital_status'] ?? '';
$occupation = $data['occupation'] ?? '';

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

if (empty($nik)) {
    http_response_code(400);
    echo json_encode(['error' => 'NIK harus diisi']);
    exit;
}

if (empty($full_name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nama lengkap harus diisi']);
    exit;
}

// Validate phone format
if (!preg_match('/^08[0-9]{8,12}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Format nomor telepon tidak valid']);
    exit;
}

// Validate NIK (16 digits)
if (!preg_match('/^[0-9]{16}$/', $nik)) {
    http_response_code(400);
    echo json_encode(['error' => 'NIK harus 16 digit angka']);
    exit;
}

// ==================== CHECK DUPLICATE ====================
try {
    // Check phone
    $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = :phone LIMIT 1");
    $stmt->bindParam(':phone', $phone);
    $stmt->execute();
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'Nomor telepon sudah terdaftar']);
        exit;
    }

    // Check NIK
    $stmt = $pdo->prepare("SELECT id FROM users WHERE nik = :nik LIMIT 1");
    $stmt->bindParam(':nik', $nik);
    $stmt->execute();
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'NIK sudah terdaftar']);
        exit;
    }

    // ==================== INSERT NEW USER ====================
    // Hash password
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    
    // Generate username from phone
    $username = 'user_' . substr($phone, -8);
    
    // Generate email
    $email = $phone . '@desafajarbaru.id';

    $stmt = $pdo->prepare("
        INSERT INTO users (
            username, email, phone, password_hash, 
            nik, full_name, birth_place, birth_date, 
            gender, blood_type, address, 
            rt_number, rw_number, dusun, village, district,
            province, regency, religion, marital_status, occupation,
            role, status, created_at
        ) VALUES (
            :username, :email, :phone, :password_hash,
            :nik, :full_name, :birth_place, :birth_date,
            :gender, :blood_type, :address,
            :rt_number, :rw_number, :dusun, :village, :district,
            :province, :regency, :religion, :marital_status, :occupation,
            'citizen', 'pending', NOW()
        )
    ");

    $stmt->execute([
        ':username' => $username,
        ':email' => $email,
        ':phone' => $phone,
        ':password_hash' => $password_hash,
        ':nik' => $nik,
        ':full_name' => $full_name,
        ':birth_place' => $birth_place,
        ':birth_date' => $birth_date,
        ':gender' => $gender,
        ':blood_type' => $blood_type,
        ':address' => $address,
        ':rt_number' => $rt_number,
        ':rw_number' => $rw_number,
        ':dusun' => $dusun,
        ':village' => $village,
        ':district' => $district,
        ':province' => $province,
        ':regency' => $regency,
        ':religion' => $religion,
        ':marital_status' => $marital_status,
        ':occupation' => $occupation
    ]);

    // ==================== RETURN SUCCESS ====================
    http_response_code(201);
    echo json_encode([
        'message' => 'Pendaftaran berhasil! Menunggu persetujuan operator desa.',
        'user_id' => (int)$pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Pendaftaran gagal: ' . $e->getMessage()]);
    exit;
}
?>
