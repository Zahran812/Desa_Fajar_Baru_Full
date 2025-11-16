# Production Readiness Check
Write-Host "Checking Production Readiness..." -ForegroundColor Cyan
Write-Host ""

$checks = @()

# Check node_modules
Write-Host "[1/7] node_modules..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " OK" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " MISSING - Run npm install" -ForegroundColor Red
    $checks += $false
}

# Check AuthContext
Write-Host "[2/7] DEMO_ENABLED..." -NoNewline
$auth = Get-Content "src\react-app\contexts\AuthContext.tsx" -Raw
if ($auth -match "const DEMO_ENABLED = true") {
    Write-Host " OK" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " NOT SET" -ForegroundColor Red
    $checks += $false
}

# Check ProtectedRoute
Write-Host "[3/7] ProtectedRoute..." -NoNewline
if (Test-Path "src\react-app\components\ProtectedRoute.tsx") {
    Write-Host " OK" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " MISSING" -ForegroundColor Red
    $checks += $false
}

# Check .htaccess
Write-Host "[4/7] .htaccess..." -NoNewline
if (Test-Path "public\.htaccess") {
    Write-Host " OK" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " MISSING" -ForegroundColor Red
    $checks += $false
}

# Check logo
Write-Host "[5/7] Logo files..." -NoNewline
if (Test-Path "public\logo") {
    Write-Host " OK" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " MISSING" -ForegroundColor Red
    $checks += $false
}

# Check article images
Write-Host "[6/7] Article images..." -NoNewline
if (Test-Path "public\Gambar Artikel") {
    Write-Host " OK" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " MISSING (optional)" -ForegroundColor Yellow
    $checks += $true
}

# Check demo accounts
Write-Host "[7/7] Demo accounts..." -NoNewline
$count = ([regex]::Matches($auth, "08123456789|081234560000|081234560011")).Count
if ($count -ge 3) {
    Write-Host " OK (3 accounts)" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " INCOMPLETE" -ForegroundColor Red
    $checks += $false
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

$passed = ($checks | Where-Object { $_ -eq $true }).Count
$total = $checks.Count

if ($passed -eq $total) {
    Write-Host "RESULT: ALL CHECKS PASSED ($passed/$total)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ready for production!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next:" -ForegroundColor Yellow
    Write-Host "  1. npm run build"
    Write-Host "  2. Upload dist/ contents to hosting"
    Write-Host "  3. Test at yourdomain.com/login"
    Write-Host ""
    Write-Host "Demo Accounts:" -ForegroundColor Cyan
    Write-Host "  Operator: 08123456789 / operator123"
    Write-Host "  Dusun:    081234560000 / dusun123"
    Write-Host "  Citizen:  081234560011 / pengguna123"
} else {
    Write-Host "RESULT: CHECKS FAILED ($passed/$total)" -ForegroundColor Red
    Write-Host "Please fix the issues above" -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan
