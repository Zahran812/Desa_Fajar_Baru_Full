## Clone of Desa Fajar Baru: Smart Village

This app was created using https://getmocha.com.
Need help or want to join the community? Join our [Discord](https://discord.gg/shDEGBSe2d).

## 🚀 Quick Start

To run the devserver:
```bash
npm install
npm run dev
```

## 🔐 Demo Accounts (Login Tanpa Backend)

Website ini sudah dilengkapi dengan **sistem demo akun** yang memungkinkan testing dashboard tanpa backend server.

### Akun Demo Tersedia:

| Role | Nomor Telepon | Password | Dashboard |
|------|---------------|----------|-----------|
| **Operator Desa** | `08123456789` | `operator123` | `/dashboard/operator` |
| **Kepala Dusun** | `081234560000` | `dusun123` | `/dashboard/dusun` |
| **Pengguna Masyarakat** | `081234560011` | `pengguna123` | `/dashboard/citizen` |

### Cara Login:
1. Buka `/login`
2. Klik salah satu tombol akun demo (kredensial otomatis terisi)
3. Klik "Masuk"

📖 **Dokumentasi Lengkap:** Lihat [DEMO_ACCOUNTS.md](./DEMO_ACCOUNTS.md)

### Mode Demo
- ✅ Otomatis aktif di development (`npm run dev`)
- ⚙️ Aktifkan di production: Set `VITE_DEMO_AUTH=true` di `.env`
- 💾 Data disimpan di localStorage browser

## 🏗️ Build Production

```bash
npm run build
```
