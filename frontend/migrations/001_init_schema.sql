-- 001_init_schema.sql
-- MySQL 8.0+ recommended. Use utf8mb4 for full Unicode support.
SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(120),
  phone VARCHAR(30) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  role ENUM('operator','dusun_head','citizen') NOT NULL DEFAULT 'citizen',
  status ENUM('pending','active','inactive','rejected') NOT NULL DEFAULT 'pending',
  rt_number VARCHAR(16),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Articles / News
CREATE TABLE IF NOT EXISTS articles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content MEDIUMTEXT,
  excerpt VARCHAR(300),
  image_url VARCHAR(255),
  category VARCHAR(50) DEFAULT 'berita',
  author_id INT UNSIGNED,
  status ENUM('draft','published') DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  views INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_articles_author FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Transparency data (APB, IDM, Bansos, etc)
CREATE TABLE IF NOT EXISTS transparency_data (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_url VARCHAR(255),
  amount DECIMAL(18,2) NULL,
  year INT NOT NULL,
  quarter TINYINT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Village programs
CREATE TABLE IF NOT EXISTS village_programs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  beneficiaries INT UNSIGNED,
  budget DECIMAL(18,2),
  status ENUM('active','inactive','completed') DEFAULT 'active',
  start_date DATE NULL,
  end_date DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Citizen requests (layanan)
CREATE TABLE IF NOT EXISTS citizen_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  request_type VARCHAR(60) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  description TEXT,
  documents TEXT,
  status ENUM('pending','approved','rejected','in_progress') DEFAULT 'pending',
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Population data (penduduk) submitted to operator
CREATE TABLE IF NOT EXISTS population_data (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  submitted_by INT UNSIGNED,
  rt_number VARCHAR(16),
  citizen_name VARCHAR(120) NOT NULL,
  id_number VARCHAR(32),
  birth_date DATE NULL,
  gender ENUM('L','P') NULL,
  address VARCHAR(255),
  phone VARCHAR(30),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  change_type VARCHAR(60) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_population_submitter FOREIGN KEY (submitted_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Messages between users
CREATE TABLE IF NOT EXISTS messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT UNSIGNED NOT NULL,
  to_user_id INT UNSIGNED NOT NULL,
  subject VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  message_type VARCHAR(30) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_messages_from FOREIGN KEY (from_user_id) REFERENCES users(id),
  CONSTRAINT fk_messages_to FOREIGN KEY (to_user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- RT data per dusun
CREATE TABLE IF NOT EXISTS rt_data (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dusun_name VARCHAR(80) NOT NULL,
  rt_number VARCHAR(16) NOT NULL,
  rt_head_name VARCHAR(120) NOT NULL,
  rt_head_phone VARCHAR(30),
  status ENUM('active','inactive') DEFAULT 'active',
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_dusun_rt (dusun_name, rt_number),
  CONSTRAINT fk_rt_created_by FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
