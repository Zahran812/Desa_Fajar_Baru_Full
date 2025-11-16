#!/usr/bin/env pwsh
# Script untuk standardisasi warna di semua dashboard
# Emerald-Blue Theme

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "🎨 ============================================" -ForegroundColor Cyan
Write-Host "   DASHBOARD COLOR STANDARDIZATION" -ForegroundColor Cyan
Write-Host "   Theme: Emerald-Blue (Biru-Hijau)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$dashboards = @(
    "src\react-app\pages\dashboard\CitizenDashboard.tsx",
    "src\react-app\pages\dashboard\DusunDashboard.tsx",
    "src\react-app\pages\dashboard\OperatorDashboard.tsx"
)

foreach ($dashboard in $dashboards) {
    $fullPath = "c:\Users\j\Documents\Website\Desa Fajar Baru\$dashboard"
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "❌ File not found: $dashboard" -ForegroundColor Red
        continue
    }
    
    $fileName = Split-Path $dashboard -Leaf
    Write-Host "📝 Processing: $fileName" -ForegroundColor Yellow
    
    # Backup
    $backupPath = "$fullPath.backup"
    Copy-Item $fullPath $backupPath -Force
    Write-Host "   ✓ Backup created" -ForegroundColor Gray
    
    $content = Get-Content $fullPath -Raw
    $originalContent = $content
    
    # Count occurrences
    $purpleCount = ([regex]::Matches($content, "purple-")).Count
    $orangeCount = ([regex]::Matches($content, "orange-")).Count  
    $indigoCount = ([regex]::Matches($content, "indigo-")).Count
    $pinkCount = ([regex]::Matches($content, "pink-")).Count
    
    Write-Host "   Found: Purple=$purpleCount, Orange=$orangeCount, Indigo=$indigoCount, Pink=$pinkCount" -ForegroundColor Gray
    
    # ===== PURPLE → EMERALD (Primary) =====
    $content = $content -replace '\bpurple-50\b', 'emerald-50'
    $content = $content -replace '\bpurple-100\b', 'emerald-100'
    $content = $content -replace '\bpurple-200\b', 'emerald-200'
    $content = $content -replace '\bpurple-300\b', 'emerald-300'
    $content = $content -replace '\bpurple-400\b', 'emerald-400'
    $content = $content -replace '\bpurple-500\b', 'emerald-500'
    $content = $content -replace '\bpurple-600\b', 'emerald-600'
    $content = $content -replace '\bpurple-700\b', 'emerald-700'
    $content = $content -replace '\bpurple-800\b', 'emerald-800'
    $content = $content -replace '\bpurple-900\b', 'emerald-900'
    
    # ===== ORANGE → AMBER (Warning) =====
    $content = $content -replace '\borange-50\b', 'amber-50'
    $content = $content -replace '\borange-100\b', 'amber-100'
    $content = $content -replace '\borange-200\b', 'amber-200'
    $content = $content -replace '\borange-300\b', 'amber-300'
    $content = $content -replace '\borange-400\b', 'amber-400'
    $content = $content -replace '\borange-500\b', 'amber-500'
    $content = $content -replace '\borange-600\b', 'amber-600'
    $content = $content -replace '\borange-700\b', 'amber-700'
    $content = $content -replace '\borange-800\b', 'amber-800'
    $content = $content -replace '\borange-900\b', 'amber-900'
    
    # ===== INDIGO → BLUE (Secondary) =====
    $content = $content -replace '\bindigo-50\b', 'blue-50'
    $content = $content -replace '\bindigo-100\b', 'blue-100'
    $content = $content -replace '\bindigo-200\b', 'blue-200'
    $content = $content -replace '\bindigo-300\b', 'blue-300'
    $content = $content -replace '\bindigo-400\b', 'blue-400'
    $content = $content -replace '\bindigo-500\b', 'blue-500'
    $content = $content -replace '\bindigo-600\b', 'blue-600'
    $content = $content -replace '\bindigo-700\b', 'blue-700'
    $content = $content -replace '\bindigo-800\b', 'blue-800'
    $content = $content -replace '\bindigo-900\b', 'blue-900'
    
    # ===== PINK → EMERALD (Convert to primary) =====
    $content = $content -replace '\bpink-50\b', 'emerald-50'
    $content = $content -replace '\bpink-100\b', 'emerald-100'
    $content = $content -replace '\bpink-200\b', 'emerald-200'
    $content = $content -replace '\bpink-300\b', 'emerald-300'
    $content = $content -replace '\bpink-400\b', 'emerald-400'
    $content = $content -replace '\bpink-500\b', 'emerald-500'
    $content = $content -replace '\bpink-600\b', 'emerald-600'
    $content = $content -replace '\bpink-700\b', 'emerald-700'
    $content = $content -replace '\bpink-800\b', 'emerald-800'
    $content = $content -replace '\bpink-900\b', 'emerald-900'
    
    # Save if changed
    if ($content -ne $originalContent) {
        $content | Set-Content $fullPath -NoNewline
        Write-Host "   ✅ Updated successfully!" -ForegroundColor Green
        
        # Count after
        $newPurpleCount = ([regex]::Matches($content, "purple-")).Count
        $newOrangeCount = ([regex]::Matches($content, "orange-")).Count
        $newIndigoCount = ([regex]::Matches($content, "indigo-")).Count
        $newPinkCount = ([regex]::Matches($content, "pink-")).Count
        
        Write-Host "   After: Purple=$newPurpleCount, Orange=$newOrangeCount, Indigo=$newIndigoCount, Pink=$newPinkCount" -ForegroundColor Green
    } else {
        Write-Host "   ℹ️  No changes needed" -ForegroundColor Cyan
    }
    
    Write-Host ""
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ COLOR STANDARDIZATION COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Color Mapping:" -ForegroundColor White
Write-Host "  Purple → Emerald (Primary actions)" -ForegroundColor Magenta
Write-Host "  Orange → Amber   (Warning states)" -ForegroundColor Yellow
Write-Host "  Indigo → Blue    (Secondary actions)" -ForegroundColor Blue
Write-Host "  Pink   → Emerald (Primary actions)" -ForegroundColor Magenta
Write-Host ""
Write-Host "Backup files created with .backup extension" -ForegroundColor Gray
Write-Host ""
