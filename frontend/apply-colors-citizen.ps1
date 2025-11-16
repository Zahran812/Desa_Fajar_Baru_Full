# PowerShell script untuk update colors di CitizenDashboard.tsx
# Ganti purple, orange, indigo ke emerald-blue scheme

$file = "c:\Users\j\Documents\Website\Desa Fajar Baru\src\react-app\pages\dashboard\CitizenDashboard.tsx"
$content = Get-Content $file -Raw

Write-Host "🎨 Updating CitizenDashboard colors..." -ForegroundColor Cyan

# Count replacements
$purpleCount = ([regex]::Matches($content, "purple-")).Count
$orangeCount = ([regex]::Matches($content, "orange-")).Count
$indigoCount = ([regex]::Matches($content, "indigo-")).Count

Write-Host "Found:" -ForegroundColor Yellow
Write-Host "  - Purple: $purpleCount occurrences" -ForegroundColor Magenta
Write-Host "  - Orange: $orangeCount occurrences" -ForegroundColor DarkYellow
Write-Host "  - Indigo: $indigoCount occurrences" -ForegroundColor Blue

# Purple → Emerald (Primary)
$content = $content -replace 'bg-purple-50', 'bg-emerald-50'
$content = $content -replace 'bg-purple-100', 'bg-emerald-100'
$content = $content -replace 'bg-purple-200', 'bg-emerald-200'
$content = $content -replace 'bg-purple-500', 'bg-emerald-500'
$content = $content -replace 'bg-purple-600', 'bg-emerald-600'
$content = $content -replace 'bg-purple-700', 'bg-emerald-700'

$content = $content -replace 'text-purple-50', 'text-emerald-50'
$content = $content -replace 'text-purple-100', 'text-emerald-100'
$content = $content -replace 'text-purple-200', 'text-emerald-200'
$content = $content -replace 'text-purple-500', 'text-emerald-500'
$content = $content -replace 'text-purple-600', 'text-emerald-600'
$content = $content -replace 'text-purple-700', 'text-emerald-700'
$content = $content -replace 'text-purple-900', 'text-emerald-900'

$content = $content -replace 'border-purple-200', 'border-emerald-200'
$content = $content -replace 'border-purple-300', 'border-emerald-300'
$content = $content -replace 'border-purple-500', 'border-emerald-500'

$content = $content -replace 'ring-purple-300', 'ring-emerald-300'
$content = $content -replace 'hover:bg-purple-700', 'hover:bg-emerald-700'

# Orange → Amber (Warning)
$content = $content -replace 'bg-orange-50', 'bg-amber-50'
$content = $content -replace 'bg-orange-100', 'bg-amber-100'
$content = $content -replace 'bg-orange-200', 'bg-amber-200'
$content = $content -replace 'bg-orange-500', 'bg-amber-500'
$content = $content -replace 'bg-orange-600', 'bg-amber-600'

$content = $content -replace 'text-orange-50', 'text-amber-50'
$content = $content -replace 'text-orange-600', 'text-amber-600'
$content = $content -replace 'text-orange-700', 'text-amber-700'
$content = $content -replace 'text-orange-900', 'text-amber-900'

$content = $content -replace 'border-orange-200', 'border-amber-200'
$content = $content -replace 'border-orange-500', 'border-amber-500'

# Indigo → Blue (Secondary)
$content = $content -replace 'bg-indigo-50', 'bg-blue-50'
$content = $content -replace 'bg-indigo-600', 'bg-blue-600'
$content = $content -replace 'bg-indigo-700', 'bg-blue-700'

$content = $content -replace 'text-indigo-600', 'text-blue-600'
$content = $content -replace 'text-indigo-700', 'text-blue-700'

$content = $content -replace 'hover:bg-indigo-700', 'hover:bg-blue-700'

# Save file
$content | Set-Content $file -NoNewline

Write-Host ""
Write-Host "✅ Colors updated successfully!" -ForegroundColor Green
Write-Host "   Purple → Emerald (Primary)"
Write-Host "   Orange → Amber (Warning)"
Write-Host "   Indigo → Blue (Secondary)"
Write-Host ""
Write-Host "File updated: CitizenDashboard.tsx" -ForegroundColor Cyan
