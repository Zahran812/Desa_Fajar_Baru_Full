# Letter Template Debug Checklist

## Langkah-langkah untuk Fix Error Upload

### 1. Cek Migration Status
```bash
php artisan migrate:status
```

Pastikan migration `create_letter_templates_table` sudah "Ran".

Jika belum, jalankan:
```bash
php artisan migrate
```

### 2. Cek Tabel di Database
```bash
php artisan tinker
>>> DB::table('letter_templates')->count()
```

Seharusnya return 0 jika baru dibuat.

### 3. Cek Storage Configuration
```bash
php artisan tinker
>>> Storage::disk('private')->exists('test.txt')
```

Jika error, pastikan `config/filesystems.php` sudah dikonfigurasi dengan disk 'private'.

### 4. Cek Folder Permissions
```bash
ls -la storage/app/
```

Pastikan folder `private` ada dan writable (755 atau 775).

### 5. Test Upload via Tinker
```bash
php artisan tinker
>>> $service = App\Models\Service::first()
>>> $template = App\Models\LetterTemplate::create([
...     'service_id' => $service->id,
...     'name' => 'Test Template',
...     'file_path' => 'test/path.pdf',
...     'file_name' => 'test.pdf',
...     'mime_type' => 'application/pdf',
...     'file_size' => 1024,
...     'status' => 'active'
... ])
>>> $template->id
```

### 6. Cek API Response
Buka browser console dan jalankan:
```javascript
fetch('/api/letter-templates', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    service_id: 1,
    name: 'Test',
    description: 'Test',
    file: 'dummy'
  })
})
.then(r => r.text())
.then(console.log)
```

### 7. Cek Laravel Logs
```bash
tail -f storage/logs/laravel.log
```

Lakukan upload dan lihat error message di log.

### 8. Cek Routes
```bash
php artisan route:list | grep letter
```

Pastikan routes untuk letter-templates sudah terdaftar.

## Common Issues & Solutions

### Issue: "Gagal menyimpan template surat"
**Solusi:**
1. Jalankan migration: `php artisan migrate`
2. Cek folder permissions: `chmod -R 775 storage/app/private`
3. Cek Laravel logs untuk detail error

### Issue: "Service not found"
**Solusi:**
1. Pastikan service_id yang dikirim valid
2. Cek di database: `SELECT * FROM services WHERE id = {service_id}`

### Issue: "File validation failed"
**Solusi:**
1. Pastikan file size < 10MB
2. Pastikan file format: doc, docx, pdf, odt
3. Cek MIME type: `file -i filename`

### Issue: "Storage disk not found"
**Solusi:**
1. Edit `config/filesystems.php`
2. Tambahkan disk 'private' jika belum ada
3. Jalankan: `php artisan config:cache`

## Verification Commands

```bash
# 1. Check migration
php artisan migrate:status

# 2. Check table exists
php artisan tinker
>>> Schema::hasTable('letter_templates')

# 3. Check storage disk
>>> Storage::disk('private')->exists('.')

# 4. Check routes
php artisan route:list | grep letter

# 5. Check logs
tail -f storage/logs/laravel.log
```

## Expected Response

Jika upload berhasil, response seharusnya:
```json
{
  "message": "Template surat berhasil disimpan",
  "data": {
    "id": 1,
    "service_id": 1,
    "name": "Template Surat Keterangan",
    "file_path": "letter-templates/service_1/abc123.pdf",
    "file_name": "template.pdf",
    "mime_type": "application/pdf",
    "file_size": 102400,
    "status": "active",
    "description": "Deskripsi template",
    "created_at": "2025-12-04T...",
    "updated_at": "2025-12-04T..."
  }
}
```

Status code: 201 Created
