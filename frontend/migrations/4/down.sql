
-- Remove NIK column
ALTER TABLE users DROP COLUMN nik;

-- Remove phone numbers from demo accounts
UPDATE users SET phone = NULL WHERE username = 'operatordesa';
UPDATE users SET phone = NULL WHERE username = 'dusun1';
UPDATE users SET phone = NULL WHERE username = 'pengguna1';
