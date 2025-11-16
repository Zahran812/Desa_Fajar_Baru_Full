# ========================================
# BUILD SCRIPT - DEMO MODE AKTIF
# ========================================
# PowerShell script untuk build dengan demo mode

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD PROJECT - DEMO MODE AKTIF" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Hapus folder dist
Write-Host "[STEP 1/3] Menghapus folder dist lama..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "OK - Folder dist dihapus" -ForegroundColor Green
} else {
    Write-Host "OK - Folder dist tidak ada, skip" -ForegroundColor Green
}
Write-Host ""

# Step 2: Set environment variable
Write-Host "[STEP 2/3] Set VITE_DEMO_AUTH=true..." -ForegroundColor Yellow
$env:VITE_DEMO_AUTH = "true"
Write-Host "OK - Environment variable set" -ForegroundColor Green
Write-Host ""

# Step 3: Build
Write-Host "[STEP 3/3] Building project..." -ForegroundColor Yellow
Write-Host ""
npm run build
Write-Host ""

# Selesai
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD SELESAI!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Folder 'dist' sudah siap di-upload ke hosting" -ForegroundColor Green
Write-Host ""
Write-Host "DEMO ACCOUNTS:" -ForegroundColor Yellow
Write-Host "  Operator: 08123456789 / operator123"
Write-Host "  Kepala Dusun: 081234560000 / dusun123"
Write-Host "  Warga: 081234560011 / pengguna123"
Write-Host ""
Write-Host "VERIFIKASI SETELAH UPLOAD:" -ForegroundColor Yellow
Write-Host "  1. Banner 'Mode Demo Aktif' HARUS muncul"
Write-Host "  2. Demo accounts list HARUS ada"
Write-Host "  3. Login HARUS berfungsi"
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
