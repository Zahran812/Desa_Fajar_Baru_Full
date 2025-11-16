
CREATE TABLE rt_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dusun_name TEXT NOT NULL,
  rt_number TEXT NOT NULL,
  rt_head_name TEXT NOT NULL,
  rt_head_phone TEXT,
  status TEXT DEFAULT 'active',
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rt_data_dusun ON rt_data(dusun_name);
CREATE INDEX idx_rt_data_rt_number ON rt_data(rt_number);
