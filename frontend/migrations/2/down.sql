
-- Remove demo data
DELETE FROM messages WHERE id IN (1, 2, 3);
DELETE FROM population_data WHERE id IN (1, 2);
DELETE FROM citizen_requests WHERE id IN (1, 2);
DELETE FROM articles WHERE id IN (1, 2);
DELETE FROM users WHERE id IN (1, 2, 3);
