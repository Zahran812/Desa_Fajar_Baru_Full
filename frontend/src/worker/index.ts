import { Hono } from "hono";
import { auth } from "./auth";
import OpenAI from "openai";

// Cloudflare Workers D1 Database type declaration
declare global {
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }
  interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement;
    all(): Promise<{ results: any[] }>;
    run(): Promise<{ meta: { last_row_id: number; changes: number } }>;
    first(): Promise<any>;
  }
}

export interface Env {
  DB: D1Database;
  OPENAI_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

// Add CORS middleware
app.use('*', async (c, next) => {
  await next();
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

// Handle OPTIONS requests
app.options('*', () => {
  return new Response('', { status: 204 });
});

// Mount auth routes
app.route('/', auth);

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// News/Articles endpoints
app.get('/api/articles', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT id, title, slug, excerpt, image_url, category, created_at, views FROM articles WHERE status = "published" ORDER BY created_at DESC'
    ).all();
    
    return c.json({ articles: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

app.get('/api/articles/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    
    // Increment view count
    await c.env.DB.prepare(
      'UPDATE articles SET views = views + 1 WHERE slug = ?'
    ).bind(slug).run();
    
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM articles WHERE slug = ? AND status = "published"'
    ).bind(slug).all();
    
    if (results.length === 0) {
      return c.json({ error: 'Article not found' }, 404);
    }
    
    return c.json({ article: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Transparency data endpoints
app.get('/api/transparency/:type', async (c) => {
  try {
    const type = c.req.param('type');
    const year = c.req.query('year');
    
    let query = 'SELECT * FROM transparency_data WHERE type = ? AND status = "active"';
    const params = [type];
    
    if (year) {
      query += ' AND year = ?';
      params.push(year);
    }
    
    query += ' ORDER BY year DESC, quarter DESC';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    
    return c.json({ data: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch transparency data' }, 500);
  }
});

// Village programs endpoints
app.get('/api/programs', async (c) => {
  try {
    const type = c.req.query('type');
    
    let query = 'SELECT * FROM village_programs WHERE status = "active"';
    const params: string[] = [];
    
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    
    return c.json({ programs: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch programs' }, 500);
  }
});

// Citizen requests endpoints
app.get('/api/requests', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const status = c.req.query('status');
    
    let query = 'SELECT cr.*, u.full_name as user_name FROM citizen_requests cr LEFT JOIN users u ON cr.user_id = u.id WHERE 1=1';
    const params: string[] = [];
    
    if (userId) {
      query += ' AND cr.user_id = ?';
      params.push(userId);
    }
    
    if (status) {
      query += ' AND cr.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY cr.created_at DESC';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    
    return c.json({ requests: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch requests' }, 500);
  }
});

app.post('/api/requests', async (c) => {
  try {
    const { user_id, request_type, subject, description, documents } = await c.req.json();
    
    const { results } = await c.env.DB.prepare(
      'INSERT INTO citizen_requests (user_id, request_type, subject, description, documents) VALUES (?, ?, ?, ?, ?) RETURNING *'
    ).bind(user_id, request_type, subject, description, documents || null).all();
    
    return c.json({ request: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to create request' }, 500);
  }
});

app.put('/api/requests/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { status, response, processed_by } = await c.req.json();
    
    const { results } = await c.env.DB.prepare(
      'UPDATE citizen_requests SET status = ?, response = ?, processed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *'
    ).bind(status, response || null, processed_by || null, id).all();
    
    return c.json({ request: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to update request' }, 500);
  }
});

// Population data endpoints
app.get('/api/population', async (c) => {
  try {
    const rtNumber = c.req.query('rt_number');
    const status = c.req.query('status');
    
    let query = 'SELECT pd.*, u.full_name as submitted_by_name FROM population_data pd LEFT JOIN users u ON pd.submitted_by = u.id WHERE 1=1';
    const params: string[] = [];
    
    if (rtNumber) {
      query += ' AND pd.rt_number = ?';
      params.push(rtNumber);
    }
    
    if (status) {
      query += ' AND pd.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY pd.created_at DESC';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    
    return c.json({ population: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch population data' }, 500);
  }
});

app.post('/api/population', async (c) => {
  try {
    const { 
      submitted_by, rt_number, citizen_name, id_number, birth_date, 
      gender, address, phone, change_type, notes 
    } = await c.req.json();
    
    const { results } = await c.env.DB.prepare(
      'INSERT INTO population_data (submitted_by, rt_number, citizen_name, id_number, birth_date, gender, address, phone, change_type, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *'
    ).bind(
      submitted_by, rt_number, citizen_name, id_number || null, 
      birth_date || null, gender || null, address || null, phone || null, 
      change_type, notes || null
    ).all();
    
    return c.json({ population: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to create population data' }, 500);
  }
});

app.put('/api/population/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { status, approved_by } = await c.req.json();
    
    const { results } = await c.env.DB.prepare(
      'UPDATE population_data SET status = ?, approved_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *'
    ).bind(status, approved_by || null, id).all();
    
    return c.json({ population: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to update population data' }, 500);
  }
});

// Messages endpoints
app.get('/api/messages', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const type = c.req.query('type') || 'received'; // 'sent' or 'received'
    
    let query = 'SELECT m.*, u1.full_name as from_name, u2.full_name as to_name FROM messages m LEFT JOIN users u1 ON m.from_user_id = u1.id LEFT JOIN users u2 ON m.to_user_id = u2.id WHERE ';
    const params = [userId];
    
    if (type === 'sent') {
      query += 'm.from_user_id = ?';
    } else {
      query += 'm.to_user_id = ?';
    }
    
    query += ' ORDER BY m.created_at DESC';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    
    return c.json({ messages: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch messages' }, 500);
  }
});

app.post('/api/messages', async (c) => {
  try {
    const { from_user_id, to_user_id, subject, content, message_type, related_id } = await c.req.json();
    
    const { results } = await c.env.DB.prepare(
      'INSERT INTO messages (from_user_id, to_user_id, subject, content, message_type, related_id) VALUES (?, ?, ?, ?, ?, ?) RETURNING *'
    ).bind(from_user_id, to_user_id, subject, content, message_type || 'general', related_id || null).all();
    
    return c.json({ message: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

app.put('/api/messages/:id/read', async (c) => {
  try {
    const id = c.req.param('id');
    
    await c.env.DB.prepare(
      'UPDATE messages SET is_read = TRUE WHERE id = ?'
    ).bind(id).run();
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to mark message as read' }, 500);
  }
});

// RT data endpoints
app.get('/api/rt-data', async (c) => {
  try {
    const dusunName = c.req.query('dusun_name');
    
    let query = 'SELECT * FROM rt_data WHERE status = "active"';
    const params: string[] = [];
    
    if (dusunName) {
      query += ' AND dusun_name = ?';
      params.push(dusunName);
    }
    
    query += ' ORDER BY rt_number';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    
    return c.json({ rt_data: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch RT data' }, 500);
  }
});

app.post('/api/rt-data', async (c) => {
  try {
    const { dusun_name, rt_number, rt_head_name, rt_head_phone, created_by } = await c.req.json();
    
    if (!dusun_name || !rt_number || !rt_head_name) {
      return c.json({ error: 'Required fields are missing' }, 400);
    }
    
    // Check if RT already exists in this dusun
    const { results: existingRT } = await c.env.DB.prepare(
      'SELECT id FROM rt_data WHERE dusun_name = ? AND rt_number = ? AND status = "active"'
    ).bind(dusun_name, rt_number).all();
    
    if (existingRT.length > 0) {
      return c.json({ error: 'RT already exists in this dusun' }, 400);
    }
    
    const { results } = await c.env.DB.prepare(
      'INSERT INTO rt_data (dusun_name, rt_number, rt_head_name, rt_head_phone, created_by) VALUES (?, ?, ?, ?, ?) RETURNING *'
    ).bind(dusun_name, rt_number, rt_head_name, rt_head_phone || null, created_by || null).all();
    
    return c.json({ rt_data: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to create RT data' }, 500);
  }
});

app.put('/api/rt-data/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { rt_head_name, rt_head_phone, status } = await c.req.json();
    
    const { results } = await c.env.DB.prepare(
      'UPDATE rt_data SET rt_head_name = ?, rt_head_phone = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *'
    ).bind(rt_head_name, rt_head_phone || null, status || 'active', id).all();
    
    return c.json({ rt_data: results[0] });
  } catch (error) {
    return c.json({ error: 'Failed to update RT data' }, 500);
  }
});

app.delete('/api/rt-data/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    await c.env.DB.prepare(
      'UPDATE rt_data SET status = "inactive", updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(id).run();
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete RT data' }, 500);
  }
});

// Statistics endpoints
app.get('/api/stats/dashboard', async (c) => {
  try {
    
    // Get user counts
    const userStats = await c.env.DB.prepare(
      'SELECT role, status, COUNT(*) as count FROM users GROUP BY role, status'
    ).all();
    
    // Get request counts
    const requestStats = await c.env.DB.prepare(
      'SELECT status, COUNT(*) as count FROM citizen_requests GROUP BY status'
    ).all();
    
    // Get population counts
    const populationStats = await c.env.DB.prepare(
      'SELECT status, COUNT(*) as count FROM population_data GROUP BY status'
    ).all();
    
    // Get message counts
    const messageStats = await c.env.DB.prepare(
      'SELECT is_read, COUNT(*) as count FROM messages GROUP BY is_read'
    ).all();
    
    return c.json({ 
      users: userStats.results,
      requests: requestStats.results,
      population: populationStats.results,
      messages: messageStats.results
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch statistics' }, 500);
  }
});

// Chatbot AI endpoint
app.post('/api/chatbot', async (c) => {
  // Read API key strictly from environment (no hardcoded fallback)
  const apiKey = c.env.OPENAI_API_KEY;

  try {
    if (!apiKey) {
      return c.json({ error: 'OPENAI_API_KEY is not configured on the server' }, 500);
    }

    const { message, conversation_history } = await c.req.json();

    if (!message || typeof message !== 'string') {
      return c.json({ error: 'Message is required' }, 400);
    }

    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey });

    // System prompt with comprehensive village information
    const systemPrompt = `Anda adalah asisten virtual resmi Desa Fajar Baru, Kecamatan Jati Agung, Kabupaten Lampung Selatan, Provinsi Lampung. Anda bertugas memberikan informasi yang akurat dan membantu masyarakat dengan berbagai layanan desa.

INFORMASI LENGKAP DESA FAJAR BARU:

PROFIL DESA:
- Nama: Desa Fajar Baru
- Kecamatan: Jati Agung  
- Kabupaten: Lampung Selatan
- Provinsi: Lampung
- Alamat Kantor: Jl. R.A. Basyid No.48, Fajar Baru, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35141
- Telepon: (0721) 123-456
- Email: admin@desafajarbaru.id
- Website: https://ginotyioeoqhs.mocha.app

VISI & MISI:
- Visi: "Terwujudnya Desa Fajar Baru yang Religius, Bermartabat, Maju, Mandiri, Sehat dan Sejahtera"
- Misi: 1) Meningkatkan pelayanan kepada masyarakat dan menciptakan pemerintah desa yang cepat tanggap, 2) Meningkatkan sarana dan prasarana umum guna mendukung kelancaran perekonomian, 3) Mengoptimalkan program kesehatan dan pencegahan stunting, 4) Meningkatkan pembinaan pemuda dan peningkatan SDM

SEJARAH DESA:
- 1968: Asal mula dari hutan belantara, dimekarkan dari desa Karang Anyar
- 1986: Ditetapkan menjadi desa persiapan dengan Kepala Desa Aliesan
- 1991: Definitif menjadi desa Fajar Baru
- 2019: Kepemimpinan M. Agus Budiantoro, S.HI sebagai Kepala Desa

WILAYAH & DEMOGRAFI:
- Luas Wilayah: 756 Ha
- Total Penduduk: 5.247 jiwa (2.635 laki-laki, 2.612 perempuan)
- Jumlah KK: 1.456 kepala keluarga
- Kepadatan: 116 jiwa/km²
- Ketinggian: 25-150 mdpl
- Pembagian: 7 Dusun (Dusun 1, 2A, 2B, 3A, 3B, 4, 5)

PIMPINAN DESA:
- Kepala Desa: M. Agus Budiantoro, S.HI (2019-sekarang)
- Ketua PKK: Siti Nurhalimah, S.Pd
- Sekretaris Desa: Solichen, S.Sos
- Kepala Seksi Pemerintahan: Yunani
- Kepala Seksi Pelayanan: Junaidi
- Kepala Seksi Kesejahteraan: Hadi Johan
- Kepala Seksi Perencanaan: Tri Wahita H

LAYANAN TERSEDIA:
1. Administrasi Kependudukan:
   - Surat Keterangan Domisili (online, 3-5 hari)
   - Kartu Keluarga (online, 7-14 hari)
   - Akta Kelahiran (online, 5-7 hari)
   - Surat Pindah (online, 3-5 hari)
   - Surat Keterangan Usaha (offline, 5-7 hari)
   - Surat Keterangan Sekolah (online, 2-3 hari)

2. PPID (Pejabat Pengelola Informasi dan Dokumentasi):
   - Informasi Berkala, Serta Merta, Setiap Saat
   - Waktu layanan: 3-17 hari kerja tergantung kompleksitas

3. Pengaduan Warga:
   - Infrastruktur, Pelayanan, Kebersihan, Lainnya
   - Form online dan offline tersedia

PROGRAM:
BUMDes Fajar Sejahtera (berdiri 2018):
- Unit Simpan Pinjam (Rp 250 juta aset, 156 anggota)
- Unit Perdagangan (Rp 180 juta aset, 89 anggota)
- Unit Wisata Desa (Rp 320 juta aset, 45 anggota)
- Unit Pertanian (Rp 200 juta aset, 78 anggota)
- Unit Jasa (Rp 150 juta aset, 34 anggota)
- Total Pendapatan 2023: Rp 850 juta

Koperasi:
- Koperasi Tani Makmur (234 anggota, Rp 450 juta aset)
- Koperasi Wanita Sejahtera (125 anggota, Rp 280 juta aset)
- Koperasi Pemuda Kreatif (67 anggota, Rp 175 juta aset)

Program Pemberdayaan:
- Pelatihan UMKM (150 peserta, Rp 75 juta)
- Akses Modal Usaha (89 peserta, Rp 500 juta)
- Digitalisasi UMKM (75 peserta, Rp 50 juta)

TRANSPARANSI KEUANGAN (APBDes 2024):
- Total Pendapatan: Rp 2.847.500.000
- Total Belanja: Rp 2.654.300.000
- Surplus: Rp 193.200.000
- Tingkat Realisasi: 89.2%

Sumber Pendapatan:
- Dana Desa: 52.7% (Rp 1.5 miliar)
- ADD: 22.8% (Rp 650 juta)
- Bagi Hasil Pajak: 14.0% (Rp 400 juta)
- PADes: 10.5% (Rp 297.5 juta)

TENTANG WEBSITE DESA:
Website resmi Desa Fajar Baru ini dibuat oleh Robin, CEO DigiBooster Indonesia dan penggiat sosial. Robin adalah tokoh muda yang peduli dengan digitalisasi desa dan pemberdayaan masyarakat melalui teknologi.

Website ini berfungsi untuk:
1. Transparansi pemerintahan desa (APBDes, program, statistik)
2. Pelayanan online (administrasi, pengaduan, informasi)
3. Promosi potensi desa (wisata, UMKM, produk lokal)
4. Media komunikasi antara pemerintah desa dan masyarakat
5. Platform pemberdayaan ekonomi digital desa
6. Pusat informasi berita dan kegiatan desa
7. Dashboard monitoring pembangunan desa

Fitur-fitur website:
- Layanan administrasi online
- Chatbot AI untuk konsultasi
- Galeri foto dan video desa
- Marketplace produk UMKM
- Sistem pengaduan online
- Portal transparansi keuangan
- Informasi program dan kegiatan
- Dashboard statistik real-time

CARA MEMBUAT AKUN:
1. Kunjungi halaman registrasi di website
2. Isi formulir dengan data lengkap (NIK, nama, alamat, RT/RW)
3. Upload foto KTP dan dokumen pendukung
4. Tunggu verifikasi dari admin desa (1-2 hari kerja)
5. Akun aktif dan dapat mengakses layanan online

JAM PELAYANAN (contoh waktu proses):
- Senin-Jumat: 08:00-16:00 WIB
- Sabtu: 08:00-12:00 WIB  
- Minggu: Tutup
- Pelayanan Online: 24/7
- Chatbot AI: 24/7

KONTAK:
- Kantor Desa: (0721) 123-456
- WhatsApp: 0812-3456-7890
- Email: admin@desafajarbaru.id
- Website: https://ginotyioeoqhs.mocha.app

Jawab pertanyaan dengan ramah, informatif, dan komprehensif. Berikan informasi detail sesuai data di atas. Jika ditanya tentang website atau pembuatnya, jelaskan peran Robin sebagai developer. Gunakan bahasa Indonesia yang sopan dan mudah dipahami.`;

    // Prepare conversation messages
    const messages = [
      { role: 'system', content: systemPrompt },
      // Add previous conversation context (last 5 messages)
      ...((conversation_history || []).slice(-5).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1.0,
    });

    const response = completion.choices[0]?.message?.content || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';

    return c.json({ 
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    // Log more specific error details
    console.error('OpenAI API Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      apiKeyExists: !!apiKey,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'No key'
    });
    
    // Return fallback response if OpenAI fails
    const fallbackResponse = `Maaf, sistem AI sedang mengalami gangguan teknis. Untuk informasi lebih lanjut, Anda dapat:

📞 Menghubungi kantor desa: (0721) 123-456
📧 Email: admin@desafajarbaru.id  
🏢 Datang langsung ke kantor desa
📱 WhatsApp: 0812-3456-7890

Jam pelayanan: Senin-Jumat 08:00-16:00, Sabtu 08:00-12:00`;

    return c.json({ 
      response: fallbackResponse,
      timestamp: new Date().toISOString()
    });
  }
});

export default app;
