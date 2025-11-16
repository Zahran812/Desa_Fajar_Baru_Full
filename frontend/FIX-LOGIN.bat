@echo off
echo.
echo ========================================
echo   FIX LOGIN PRODUCTION - AUTO SCRIPT
echo ========================================
echo.
echo Script ini akan:
echo 1. Backup .env lama
echo 2. Buat .env baru dengan demo mode aktif
echo 3. Hapus folder dist
echo 4. Build dengan demo mode
echo.
pause
echo.

REM Backup .env lama
if exist .env (
    echo [STEP 1] Backup file .env lama...
    copy .env .env.backup
    echo OK - Backup tersimpan di .env.backup
) else (
    echo [STEP 1] File .env tidak ada, skip backup
)
echo.

REM Buat .env baru
echo [STEP 2] Membuat file .env baru dengan demo mode...
(
echo # KONFIGURASI DEMO MODE - AUTO GENERATED
echo VITE_DEMO_AUTH=true
) > .env
echo OK - File .env baru dibuat
echo.

REM Hapus dist lama
echo [STEP 3] Menghapus folder dist lama...
if exist dist (
    rmdir /s /q dist
    echo OK - Folder dist dihapus
) else (
    echo OK - Folder dist tidak ada, skip
)
echo.

REM Build dengan demo mode
echo [STEP 4] Building project dengan demo mode AKTIF...
echo.
call npm run build
echo.

REM Selesai
echo.
echo ========================================
echo   BUILD SELESAI - SIAP UPLOAD!
echo ========================================
echo.
echo Folder 'dist' sudah siap di-upload ke hosting
echo.
echo FILE .env SEKARANG:
type .env
echo.
echo.
echo DEMO ACCOUNTS YANG BISA DIGUNAKAN:
echo   Operator Desa: 08123456789 / operator123
echo   Kepala Dusun: 081234560000 / dusun123
echo   Warga: 081234560011 / pengguna123
echo.
echo VERIFIKASI SETELAH UPLOAD:
echo   1. Banner "Mode Demo Aktif" HARUS muncul
echo   2. Demo accounts list HARUS ada
echo   3. Login HARUS berfungsi
echo.
echo ========================================
pause
