
-- Insert demo accounts for simulation
INSERT OR REPLACE INTO users (id, username, email, password_hash, full_name, role, status, rt_number, phone, address, created_at, updated_at) VALUES
(1, 'operatordesa', 'operator@desa-fajar-baru.id', '$2a$12$dummy.hash.for.demo.account', 'Operator Desa Fajar Baru', 'operator', 'active', NULL, '081234567890', 'Kantor Desa Fajar Baru', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(2, 'dusun1', 'dusun1@desa-fajar-baru.id', '$2a$12$dummy.hash.for.demo.account', 'Kepala Dusun 1', 'dusun_head', 'active', 'RT 01', '081234567891', 'Dusun 1, Desa Fajar Baru', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(3, 'pengguna1', 'pengguna1@desa-fajar-baru.id', '$2a$12$dummy.hash.for.demo.account', 'Ahmad Warga Desa', 'citizen', 'active', 'RT 01', '081234567892', 'Jl. Merdeka No. 123, RT 01', '2024-01-01 00:00:00', '2024-01-01 00:00:00');

-- Add some sample data for better simulation
INSERT OR IGNORE INTO articles (id, title, slug, content, excerpt, image_url, category, author_id, status, featured, views) VALUES
(1, 'Pembangunan Jalan Desa Tahap 2 Dimulai', 'pembangunan-jalan-desa-tahap-2', 'Pembangunan infrastruktur jalan desa tahap 2 telah dimulai dengan anggaran dari dana desa...', 'Pembangunan jalan desa tahap 2 untuk meningkatkan akses transportasi warga', 'https://mocha-cdn.com/0199a189-1854-7cf0-9e0e-736ba7bf1f93/Desain-tanpa-judul-(2).jpg', 'pembangunan', 1, 'published', 1, 150),
(2, 'Program Kesehatan Posyandu Bulan Ini', 'program-kesehatan-posyandu', 'Program kesehatan posyandu akan dilaksanakan setiap minggu kedua di balai desa...', 'Jadwal dan kegiatan posyandu untuk kesehatan masyarakat desa', 'https://mocha-cdn.com/0199a189-1854-7cf0-9e0e-736ba7bf1f93/image.png_4256.png', 'kesehatan', 1, 'published', 0, 89);

INSERT OR IGNORE INTO citizen_requests (id, user_id, request_type, subject, description, status, created_at) VALUES
(1, 3, 'surat_keterangan', 'Permohonan Surat Keterangan Domisili', 'Mohon dibuatkan surat keterangan domisili untuk keperluan administrasi', 'pending', '2024-10-01 10:00:00'),
(2, 3, 'surat_pengantar', 'Surat Pengantar SKCK', 'Permohonan surat pengantar untuk membuat SKCK', 'approved', '2024-09-28 14:30:00');

INSERT OR IGNORE INTO population_data (id, submitted_by, rt_number, citizen_name, id_number, birth_date, gender, address, phone, status, change_type, notes) VALUES
(1, 2, 'RT 01', 'Bayi Ahmad Susanto', '1234567890123456', '2024-09-15', 'L', 'Jl. Merdeka No. 45, RT 01', '081234567893', 'pending', 'Kelahiran', 'Data kelahiran anak pertama'),
(2, 2, 'RT 01', 'Siti Aminah', '1234567890123457', '1988-08-22', 'P', 'Jl. Mawar No. 12, RT 01', '081234567894', 'approved', 'Pindah Masuk', 'Pindah dari luar desa');

INSERT OR IGNORE INTO messages (id, from_user_id, to_user_id, subject, content, is_read, message_type) VALUES
(1, 2, 1, 'Konfirmasi Data Kelahiran', 'Mohon konfirmasi untuk data kelahiran yang telah saya ajukan', 0, 'request'),
(2, 1, 2, 'Re: Konfirmasi Data Kelahiran', 'Data kelahiran telah diverifikasi dan disetujui', 1, 'response'),
(3, 3, 1, 'Permohonan Surat Domisili', 'Saya memerlukan surat keterangan domisili untuk keperluan administrasi', 0, 'request');
