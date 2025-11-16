# Standardisasi warna dashboard - Emerald Blue Theme

$ErrorActionPreference = "Stop"

Write-Host "===========================================  " -ForegroundColor Cyan
Write-Host "DASHBOARD COLOR STANDARDIZATION" -ForegroundColor Cyan
Write-Host "Theme: Emerald-Blue" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "src\react-app\pages\dashboard\CitizenDashboard.tsx",
    "src\react-app\pages\dashboard\DusunDashboard.tsx",
    "src\react-app\pages\dashboard\OperatorDashboard.tsx"
)

foreach ($file in $files) {
    $path = Join-Path "c:\Users\j\Documents\Website\Desa Fajar Baru" $file
    
    if (-not (Test-Path $path)) {
        Write-Host "File not found: $file" -ForegroundColor Red
        continue
    }
    
    $name = Split-Path $file -Leaf
    Write-Host "Processing: $name" -ForegroundColor Yellow
    
    $content = Get-Content $path -Raw
    $original = $content
    
    # Purple to Emerald
    $content = $content -replace 'purple-50', 'emerald-50'
    $content = $content -replace 'purple-100', 'emerald-100'
    $content = $content -replace 'purple-200', 'emerald-200'
    $content = $content -replace 'purple-300', 'emerald-300'
    $content = $content -replace 'purple-400', 'emerald-400'
    $content = $content -replace 'purple-500', 'emerald-500'
    $content = $content -replace 'purple-600', 'emerald-600'
    $content = $content -replace 'purple-700', 'emerald-700'
    $content = $content -replace 'purple-800', 'emerald-800'
    $content = $content -replace 'purple-900', 'emerald-900'
    
    # Orange to Amber
    $content = $content -replace 'orange-50', 'amber-50'
    $content = $content -replace 'orange-100', 'amber-100'
    $content = $content -replace 'orange-200', 'amber-200'
    $content = $content -replace 'orange-300', 'amber-300'
    $content = $content -replace 'orange-400', 'amber-400'
    $content = $content -replace 'orange-500', 'amber-500'
    $content = $content -replace 'orange-600', 'amber-600'
    $content = $content -replace 'orange-700', 'amber-700'
    $content = $content -replace 'orange-800', 'amber-800'
    $content = $content -replace 'orange-900', 'amber-900'
    
    # Indigo to Blue
    $content = $content -replace 'indigo-50', 'blue-50'
    $content = $content -replace 'indigo-100', 'blue-100'
    $content = $content -replace 'indigo-200', 'blue-200'
    $content = $content -replace 'indigo-300', 'blue-300'
    $content = $content -replace 'indigo-400', 'blue-400'
    $content = $content -replace 'indigo-500', 'blue-500'
    $content = $content -replace 'indigo-600', 'blue-600'
    $content = $content -replace 'indigo-700', 'blue-700'
    $content = $content -replace 'indigo-800', 'blue-800'
    $content = $content -replace 'indigo-900', 'blue-900'
    
    # Pink to Emerald
    $content = $content -replace 'pink-50', 'emerald-50'
    $content = $content -replace 'pink-100', 'emerald-100'
    $content = $content -replace 'pink-200', 'emerald-200'
    $content = $content -replace 'pink-300', 'emerald-300'
    $content = $content -replace 'pink-400', 'emerald-400'
    $content = $content -replace 'pink-500', 'emerald-500'
    $content = $content -replace 'pink-600', 'emerald-600'
    $content = $content -replace 'pink-700', 'emerald-700'
    $content = $content -replace 'pink-800', 'emerald-800'
    $content = $content -replace 'pink-900', 'emerald-900'
    
    if ($content -ne $original) {
        $content | Set-Content $path -NoNewline
        Write-Host "  Updated!" -ForegroundColor Green
    } else {
        Write-Host "  No changes" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "DONE! All dashboards updated" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Color mapping:"
Write-Host "  Purple -> Emerald (primary)"
Write-Host "  Orange -> Amber (warning)"
Write-Host "  Indigo -> Blue (secondary)"
Write-Host "  Pink -> Emerald (primary)"
Write-Host ""
