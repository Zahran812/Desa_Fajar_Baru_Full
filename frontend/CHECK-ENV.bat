@echo off
echo.
echo ============================================================
echo   CEK KONFIGURASI FILE .env
echo ============================================================
echo.
if exist .env (
    echo File .env DITEMUKAN
    echo.
    echo Isi file .env:
    echo ------------------------------------------------------------
    type .env
    echo ------------------------------------------------------------
    echo.
    findstr /C:"VITE_DEMO_AUTH=true" .env >nul
    if %errorlevel%==0 (
        echo [✓] DEMO MODE AKTIF - VITE_DEMO_AUTH=true ditemukan
    ) else (
        echo [X] DEMO MODE MATI - VITE_DEMO_AUTH=true TIDAK ditemukan!
        echo.
        echo MASALAH: File .env tidak mengandung VITE_DEMO_AUTH=true
        echo SOLUSI: Jalankan FINAL-FIX-LOGIN.bat
    )
) else (
    echo [X] ERROR - File .env TIDAK DITEMUKAN!
    echo.
    echo SOLUSI: Jalankan FINAL-FIX-LOGIN.bat
)
echo.
echo ============================================================
pause
