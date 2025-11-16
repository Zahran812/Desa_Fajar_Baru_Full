export type MessageCategory = 'chat' | 'administrasi' | 'ppid' | 'pengaduan' | 'aspirasi';
export type MessageStatus = 'baru' | 'dibaca' | 'diproses' | 'selesai' | 'ditutup';

export interface MessageHistoryEntry {
  at: string; // ISO timestamp
  status: MessageStatus;
  note?: string;
}

export interface MessageReply {
  id: string;
  user_id: number; // who replied
  content: string;
  at: string; // ISO timestamp
}

export interface AppMessage {
  id: string;
  from_user_id: number;
  to_user_id: number; // operator id for incoming to operator
  subject: string;
  content: string;
  category: MessageCategory;
  status: MessageStatus;
  is_read: boolean;
  created_at: string;
  history: MessageHistoryEntry[];
  replies: MessageReply[];
}

const STORAGE_KEY = 'demo_messages_v1';

function loadAll(): AppMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AppMessage[];
  } catch {
    return [];
  }
}

function saveAll(messages: AppMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}

export function forceSeed(operatorUserId: number) {
  clearAll();
  seedIfEmpty(operatorUserId);
}

export function seedIfEmpty(operatorUserId: number) {
  const existing = loadAll();
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();
  const twoDaysAgo = new Date(Date.now() - 172800000).toISOString();
  const threeDaysAgo = new Date(Date.now() - 259200000).toISOString();
  const fourDaysAgo = new Date(Date.now() - 345600000).toISOString();
  
  const samples: AppMessage[] = [
    // Chat Messages
    {
      id: genId(),
      from_user_id: 3,
      to_user_id: operatorUserId,
      subject: 'Pertanyaan Jam Operasional',
      content: 'Selamat pagi Bapak/Ibu, saya ingin menanyakan jam operasional kantor desa untuk pelayanan administrasi. Apakah hari Sabtu buka? Terima kasih.',
      category: 'chat',
      status: 'baru',
      is_read: false,
      created_at: now,
      history: [{ at: now, status: 'baru' }],
      replies: [],
    },
    {
      id: genId(),
      from_user_id: 4,
      to_user_id: operatorUserId,
      subject: 'Informasi Posyandu',
      content: 'Mohon informasi jadwal posyandu bulan ini untuk wilayah RT 03. Terima kasih.',
      category: 'chat',
      status: 'dibaca',
      is_read: true,
      created_at: yesterday,
      history: [
        { at: yesterday, status: 'baru' },
        { at: yesterday, status: 'dibaca' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Posyandu RT 03 dijadwalkan tanggal 15 bulan ini pukul 08.00 di Balai RT. Silakan datang tepat waktu.',
          at: yesterday
        }
      ],
    },
    {
      id: genId(),
      from_user_id: 5,
      to_user_id: operatorUserId,
      subject: 'Tanya Persyaratan KTP',
      content: 'Selamat siang, saya mau tanya persyaratan untuk membuat KTP baru. Dokumen apa saja yang perlu disiapkan?',
      category: 'chat',
      status: 'selesai',
      is_read: true,
      created_at: twoDaysAgo,
      history: [
        { at: twoDaysAgo, status: 'baru' },
        { at: twoDaysAgo, status: 'dibaca' },
        { at: twoDaysAgo, status: 'selesai', note: 'Pertanyaan telah dijawab' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Untuk membuat KTP baru, Anda perlu membawa: 1) Kartu Keluarga, 2) Akta Kelahiran, 3) Surat Pengantar RT/RW. Terima kasih.',
          at: twoDaysAgo
        }
      ],
    },

    // Administrasi Messages
    {
      id: genId(),
      from_user_id: 6,
      to_user_id: operatorUserId,
      subject: 'Pengajuan Surat Keterangan Domisili',
      content: 'Kepada Yth. Petugas Administrasi,\n\nSaya mengajukan permohonan surat keterangan domisili untuk keperluan pendaftaran sekolah anak saya. Saya sudah melampirkan fotocopy KK dan KTP. Mohon segera diproses. Terima kasih.',
      category: 'administrasi',
      status: 'diproses',
      is_read: true,
      created_at: yesterday,
      history: [
        { at: yesterday, status: 'baru' },
        { at: yesterday, status: 'dibaca' },
        { at: yesterday, status: 'diproses', note: 'Berkas sedang diperiksa' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Permohonan Anda sedang kami proses. Mohon tunggu 1-2 hari kerja.',
          at: yesterday
        }
      ],
    },
    {
      id: genId(),
      from_user_id: 7,
      to_user_id: operatorUserId,
      subject: 'Permohonan Surat Keterangan Usaha',
      content: 'Assalamualaikum, saya ingin mengajukan Surat Keterangan Usaha untuk usaha warung kelontong saya. Dokumen persyaratan sudah saya siapkan. Mohon informasi proses selanjutnya.',
      category: 'administrasi',
      status: 'baru',
      is_read: false,
      created_at: now,
      history: [{ at: now, status: 'baru' }],
      replies: [],
    },
    {
      id: genId(),
      from_user_id: 8,
      to_user_id: operatorUserId,
      subject: 'Pengajuan Surat Pengantar Nikah',
      content: 'Yth. Bapak/Ibu Operator,\n\nSaya dan calon istri saya ingin mengajukan surat pengantar nikah. Kami sudah mempersiapkan berkas KTP, KK, dan surat keterangan belum menikah. Kapan kami bisa datang untuk mengurus?',
      category: 'administrasi',
      status: 'selesai',
      is_read: true,
      created_at: threeDaysAgo,
      history: [
        { at: threeDaysAgo, status: 'baru' },
        { at: threeDaysAgo, status: 'dibaca' },
        { at: threeDaysAgo, status: 'diproses', note: 'Berkas lengkap, sedang dibuat' },
        { at: twoDaysAgo, status: 'selesai', note: 'Surat sudah siap diambil' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Silakan datang hari Senin-Jumat jam 08.00-14.00. Surat pengantar sudah siap diambil.',
          at: twoDaysAgo
        }
      ],
    },

    // PPID Messages
    {
      id: genId(),
      from_user_id: 9,
      to_user_id: operatorUserId,
      subject: 'Permintaan Informasi APBDes 2024',
      content: 'Kepada Yth. PPID Desa Fajar Baru,\n\nDengan hormat, saya meminta informasi publik berupa dokumen APBDes tahun 2024 dan realisasi anggaran semester 1. Mohon dapat diberikan dalam bentuk softcopy. Terima kasih.',
      category: 'ppid',
      status: 'diproses',
      is_read: true,
      created_at: yesterday,
      history: [
        { at: yesterday, status: 'baru' },
        { at: yesterday, status: 'dibaca' },
        { at: yesterday, status: 'diproses', note: 'Permintaan informasi sedang diproses' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Permohonan informasi Anda sedang kami proses. Dokumen akan kami kirimkan via email dalam 3 hari kerja.',
          at: yesterday
        }
      ],
    },
    {
      id: genId(),
      from_user_id: 10,
      to_user_id: operatorUserId,
      subject: 'Permohonan Data Penerima Bansos',
      content: 'Yth. Petugas PPID,\n\nSaya memohon informasi mengenai daftar penerima bantuan sosial (BLT Dana Desa) di Desa Fajar Baru tahun 2024. Untuk keperluan penelitian akademis.',
      category: 'ppid',
      status: 'baru',
      is_read: false,
      created_at: now,
      history: [{ at: now, status: 'baru' }],
      replies: [],
    },
    {
      id: genId(),
      from_user_id: 11,
      to_user_id: operatorUserId,
      subject: 'Akses Dokumen Peraturan Desa',
      content: 'Mohon dapat diberikan akses untuk melihat dokumen Peraturan Desa (Perdes) terbaru mengenai pengelolaan sampah. Terima kasih.',
      category: 'ppid',
      status: 'selesai',
      is_read: true,
      created_at: fourDaysAgo,
      history: [
        { at: fourDaysAgo, status: 'baru' },
        { at: fourDaysAgo, status: 'dibaca' },
        { at: threeDaysAgo, status: 'selesai', note: 'Dokumen telah dikirim' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Dokumen Perdes tentang pengelolaan sampah dapat diakses di website desa pada menu Transparansi > Peraturan. Link: https://desafajarbaru.id/peraturan',
          at: threeDaysAgo
        }
      ],
    },

    // Pengaduan Messages
    {
      id: genId(),
      from_user_id: 12,
      to_user_id: operatorUserId,
      subject: 'Pengaduan Jalan Rusak RT 05',
      content: 'Kepada Yth. Pemerintah Desa,\n\nSaya ingin melaporkan kondisi jalan di RT 05 yang sudah rusak parah dengan banyak lubang. Mohon segera diperbaiki karena sangat mengganggu akses warga terutama saat musim hujan. Terima kasih atas perhatiannya.',
      category: 'pengaduan',
      status: 'diproses',
      is_read: true,
      created_at: twoDaysAgo,
      history: [
        { at: twoDaysAgo, status: 'baru' },
        { at: twoDaysAgo, status: 'dibaca' },
        { at: yesterday, status: 'diproses', note: 'Telah dilakukan survey lapangan' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Terima kasih atas laporannya. Tim kami sudah melakukan survey dan perbaikan akan dilakukan minggu depan.',
          at: yesterday
        }
      ],
    },
    {
      id: genId(),
      from_user_id: 13,
      to_user_id: operatorUserId,
      subject: 'Keluhan Saluran Air Tersumbat',
      content: 'Yth. Bapak Kepala Desa,\n\nSaya warga RT 02 ingin melaporkan saluran air di depan rumah saya tersumbat sampah sehingga saat hujan air meluap ke jalan. Mohon dibersihkan. Terima kasih.',
      category: 'pengaduan',
      status: 'baru',
      is_read: false,
      created_at: now,
      history: [{ at: now, status: 'baru' }],
      replies: [],
    },
    {
      id: genId(),
      from_user_id: 14,
      to_user_id: operatorUserId,
      subject: 'Laporan Lampu Jalan Mati',
      content: 'Laporan: Lampu jalan di area Posyandu RT 04 sudah mati sejak 3 hari yang lalu. Mohon segera diperbaiki karena jalanan menjadi gelap dan rawan kecelakaan di malam hari.',
      category: 'pengaduan',
      status: 'selesai',
      is_read: true,
      created_at: fourDaysAgo,
      history: [
        { at: fourDaysAgo, status: 'baru' },
        { at: fourDaysAgo, status: 'dibaca' },
        { at: threeDaysAgo, status: 'diproses', note: 'Teknisi sudah ditugaskan' },
        { at: threeDaysAgo, status: 'selesai', note: 'Lampu sudah diperbaiki' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Lampu jalan sudah kami perbaiki kemarin sore. Terima kasih atas laporannya.',
          at: threeDaysAgo
        }
      ],
    },

    // Aspirasi Messages
    {
      id: genId(),
      from_user_id: 15,
      to_user_id: operatorUserId,
      subject: 'Usulan Pembangunan Taman Desa',
      content: 'Kepada Yth. Pemerintah Desa Fajar Baru,\n\nKami warga RT 01 mengusulkan pembangunan taman desa sebagai ruang terbuka hijau untuk warga. Lokasi yang kami usulkan adalah lahan kosong di dekat balai desa. Kami berharap usulan ini dapat dipertimbangkan dalam program desa tahun depan.',
      category: 'aspirasi',
      status: 'dibaca',
      is_read: true,
      created_at: yesterday,
      history: [
        { at: yesterday, status: 'baru' },
        { at: yesterday, status: 'dibaca' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Terima kasih atas usulannya. Akan kami bahas dalam rapat perencanaan pembangunan desa.',
          at: yesterday
        }
      ],
    },
    {
      id: genId(),
      from_user_id: 16,
      to_user_id: operatorUserId,
      subject: 'Saran Pelatihan Keterampilan untuk Pemuda',
      content: 'Assalamualaikum,\n\nSaya sebagai pemuda desa ingin menyampaikan aspirasi agar diadakan pelatihan keterampilan seperti desain grafis, fotografi, atau digital marketing untuk pemuda desa. Ini bisa membantu kami meningkatkan kemampuan dan membuka peluang kerja. Terima kasih.',
      category: 'aspirasi',
      status: 'baru',
      is_read: false,
      created_at: now,
      history: [{ at: now, status: 'baru' }],
      replies: [],
    },
    {
      id: genId(),
      from_user_id: 17,
      to_user_id: operatorUserId,
      subject: 'Usulan Program Bantuan Modal Usaha',
      content: 'Yth. Bapak Kepala Desa,\n\nKami pelaku UMKM di desa mengusulkan adanya program bantuan modal usaha atau kredit mikro dengan bunga rendah melalui BUMDes. Hal ini sangat membantu kami untuk mengembangkan usaha. Mohon dapat dipertimbangkan.',
      category: 'aspirasi',
      status: 'diproses',
      is_read: true,
      created_at: threeDaysAgo,
      history: [
        { at: threeDaysAgo, status: 'baru' },
        { at: threeDaysAgo, status: 'dibaca' },
        { at: twoDaysAgo, status: 'diproses', note: 'Sedang dibahas dengan pengurus BUMDes' }
      ],
      replies: [
        {
          id: genId(),
          user_id: operatorUserId,
          content: 'Usulan Anda sangat baik. Saat ini sedang kami koordinasikan dengan pengurus BUMDes untuk program ini.',
          at: twoDaysAgo
        }
      ],
    },
  ];
  saveAll(samples);
}

export function getMessagesForUser(userId: number) {
  const all = loadAll();
  return all.filter(m => m.to_user_id === userId || m.from_user_id === userId).sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
}

export function getReceivedFor(userId: number) {
  const all = loadAll();
  return all.filter(m => m.to_user_id === userId);
}

export function getByCategoryFor(userId: number, category?: MessageCategory) {
  const list = getReceivedFor(userId);
  if (!category) return list;
  return list.filter(m => m.category === category);
}

export function sendMessage(from_user_id: number, to_user_id: number, subject: string, content: string, category: MessageCategory): AppMessage {
  const now = new Date().toISOString();
  const msg: AppMessage = {
    id: genId(),
    from_user_id,
    to_user_id,
    subject,
    content,
    category,
    status: 'baru',
    is_read: false,
    created_at: now,
    history: [{ at: now, status: 'baru' }],
    replies: [],
  };
  const all = loadAll();
  all.unshift(msg);
  saveAll(all);
  return msg;
}

export function markRead(messageId: string) {
  const all = loadAll();
  const idx = all.findIndex(m => m.id === messageId);
  if (idx >= 0) {
    all[idx].is_read = true;
    saveAll(all);
  }
}

export function updateStatus(messageId: string, status: MessageStatus, note?: string) {
  const all = loadAll();
  const idx = all.findIndex(m => m.id === messageId);
  if (idx >= 0) {
    all[idx].status = status;
    all[idx].history.push({ at: new Date().toISOString(), status, note });
    saveAll(all);
    return all[idx];
  }
}

export function addReply(messageId: string, user_id: number, content: string) {
  const all = loadAll();
  const idx = all.findIndex(m => m.id === messageId);
  if (idx >= 0) {
    all[idx].replies.push({ id: genId(), user_id, content, at: new Date().toISOString() });
    all[idx].is_read = false; // mark as unread for the other party
    saveAll(all);
    return all[idx];
  }
}
