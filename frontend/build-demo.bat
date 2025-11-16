@echo off
REM ========================================
REM BUILD SCRIPT UNTUK DEMO MODE
REM ========================================
REM Script ini akan build project dengan demo mode AKTIF
REM Tanpa perlu edit file .env manual

echo.
echo ========================================
echo  BUILD PROJECT - DEMO MODE AKTIF
echo ========================================
echo.

REM Hapus folder dist lama
echo [1/3] Menghapus build lama...
if exist dist rmdir /s /q dist
echo OK - Folder dist dihapus
echo.

REM Build dengan VITE_DEMO_AUTH=true
echo [2/3] Building project dengan demo mode...
set VITE_DEMO_AUTH=true
call npm run build
echo.

REM Informasi
echo ========================================
echo  BUILD SELESAI!
echo ========================================
echo.
echo Folder 'dist' sudah siap di-upload ke hosting
echo.
echo DEMO ACCOUNTS:
echo   Operator: 08123456789 / operator123
echo   Kepala Dusun: 081234560000 / dusun123  
echo   Citizen: 081234560011 / pengguna123
echo.
echo Setelah upload, demo mode akan aktif otomatis
echo Banner "Mode Demo Aktif" akan muncul
echo ========================================
pause
