<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use PhpOffice\PhpWord\Settings;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Konfigurasi PHPWord untuk menggunakan DomPDF sebagai PDF renderer
        if (class_exists(Settings::class)) {
            // Cek apakah DomPDF terinstall
            $dompdfPath = base_path('vendor/dompdf/dompdf');
            if (is_dir($dompdfPath)) {
                Settings::setPdfRendererPath($dompdfPath);
                Settings::setPdfRendererName(Settings::PDF_RENDERER_DOMPDF);
            } 
            // Fallback ke TCPDF jika DomPDF tidak ada, tapi TCPDF ada
            else {
                $tcpdfPath = base_path('vendor/tecnickcom/tcpdf');
                if (is_dir($tcpdfPath)) {
                    Settings::setPdfRendererPath($tcpdfPath);
                    Settings::setPdfRendererName(Settings::PDF_RENDERER_TCPDF);
                }
            }
        }
    }
}
