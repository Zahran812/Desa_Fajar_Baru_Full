# ============================================
# PRODUCTION READINESS VERIFICATION SCRIPT
# Desa Fajar Baru - Demo Mode
# ============================================

Write-Host "🔍 Verifying Production Readiness..." -ForegroundColor Cyan
Write-Host ""

$allChecks = @()

# Check 1: Node modules
Write-Host "📦 Checking node_modules..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " ✅" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ❌ Missing - Run 'npm install'" -ForegroundColor Red
    $allChecks += $false
}

# Check 2: AuthContext DEMO_ENABLED
Write-Host "🎭 Checking DEMO_ENABLED in AuthContext..." -NoNewline
$authContext = Get-Content "src\react-app\contexts\AuthContext.tsx" -Raw
if ($authContext -match "const DEMO_ENABLED = true") {
    Write-Host " ✅" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ❌ Not set to true" -ForegroundColor Red
    $allChecks += $false
}

# Check 3: ProtectedRoute component
Write-Host "🛡️  Checking ProtectedRoute component..." -NoNewline
if (Test-Path "src\react-app\components\ProtectedRoute.tsx") {
    Write-Host " ✅" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ❌ Missing" -ForegroundColor Red
    $allChecks += $false
}

# Check 4: .htaccess file
Write-Host "🌐 Checking .htaccess file..." -NoNewline
if (Test-Path "public\.htaccess") {
    Write-Host " ✅" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ❌ Missing" -ForegroundColor Red
    $allChecks += $false
}

# Check 5: Logo files
Write-Host "🖼️  Checking logo files..." -NoNewline
if (Test-Path "public\logo\Logo Kabupaten Lampung Selatan.png") {
    Write-Host " ✅" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ❌ Logo missing" -ForegroundColor Red
    $allChecks += $false
}

# Check 6: Article images
Write-Host "📸 Checking article images..." -NoNewline
if (Test-Path "public\Gambar Artikel\Bupati Lampung Selatan Tinjau Pengembangan Agroeduwisata Desa Fajar Baru.jpg") {
    Write-Host " ✅" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ⚠️  Missing (optional)" -ForegroundColor Yellow
    $allChecks += $true  # Not critical
}

# Check 7: Demo accounts in AuthContext
Write-Host "👥 Checking demo accounts..." -NoNewline
$demoCount = ([regex]::Matches($authContext, "08123456789|081234560000|081234560011")).Count
if ($demoCount -ge 3) {
    Write-Host " ✅ (3 accounts found)" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host " ❌ (Expected 3, found $demoCount)" -ForegroundColor Red
    $allChecks += $false
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan

# Summary
$passed = ($allChecks | Where-Object { $_ -eq $true }).Count
$total = $allChecks.Count

if ($passed -eq $total) {
    Write-Host "✅ ALL CHECKS PASSED ($passed/$total)" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Ready for production build!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. npm run build" -ForegroundColor White
    Write-Host "2. Upload contents of dist folder to your hosting" -ForegroundColor White
    Write-Host "3. Test login at yourdomain.com/login" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Demo Accounts:" -ForegroundColor Cyan
    Write-Host "   Operator: 08123456789 / operator123" -ForegroundColor White
    Write-Host "   Dusun:    081234560000 / dusun123" -ForegroundColor White
    Write-Host "   Citizen:  081234560011 / pengguna123" -ForegroundColor White
} else {
    Write-Host "⚠️  SOME CHECKS FAILED ($passed/$total passed)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please fix the issues marked with ❌ above" -ForegroundColor Red
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
