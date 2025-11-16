
-- Update demo accounts with new phone numbers
UPDATE users SET phone = '08123456789' WHERE username = 'operatordesa';
UPDATE users SET phone = '081234560011' WHERE username = 'dusun1';
UPDATE users SET phone = '081234560000' WHERE username = 'pengguna1';

-- Add NIK field to users table for new registration system
ALTER TABLE users ADD COLUMN nik TEXT;

-- Update existing demo accounts with sample NIKs
UPDATE users SET nik = '3304010101800001' WHERE username = 'operatordesa';
UPDATE users SET nik = '3304010101800002' WHERE username = 'dusun1';
UPDATE users SET nik = '3304010101800003' WHERE username = 'pengguna1';
