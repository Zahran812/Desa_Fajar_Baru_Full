
-- Drop indexes first
DROP INDEX idx_messages_to_user;
DROP INDEX idx_population_data_rt;
DROP INDEX idx_citizen_requests_user;
DROP INDEX idx_articles_category;
DROP INDEX idx_articles_slug;
DROP INDEX idx_sessions_user;
DROP INDEX idx_sessions_token;
DROP INDEX idx_users_role;
DROP INDEX idx_users_username;

-- Drop tables in reverse order
DROP TABLE messages;
DROP TABLE population_data;
DROP TABLE citizen_requests;
DROP TABLE village_programs;
DROP TABLE transparency_data;
DROP TABLE articles;
DROP TABLE user_sessions;
DROP TABLE users;
