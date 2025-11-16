# Dashboard Color Scheme - Emerald Blue Theme

## 🎨 Color Palette Standardization

Semua dashboard menggunakan **Emerald-Blue color scheme** yang konsisten dan profesional.

---

## 📋 Color Usage Guide

### Primary Colors (Main Actions)
- **Emerald-600**: `bg-emerald-600 hover:bg-emerald-700`
- Usage: Primary buttons, main CTAs, active states
- Example: "Simpan", "Kirim", "Tambah Data"

### Secondary Colors (Supporting Actions)
- **Blue-600**: `bg-blue-600 hover:bg-blue-700`
- Usage: Secondary buttons, info badges
- Example: "Edit", "Lihat Detail", "Download"

### Success States
- **Green-600**: `bg-green-600` / `text-green-600`
- Usage: Success messages, approved status, completed
- Example: Badge "Disetujui", Status "Selesai"

### Warning States
- **Amber-600**: `bg-amber-600` / `text-amber-600`
- Usage: Warning messages, pending status
- Example: Badge "Menunggu", Status "Pending"

### Danger States
- **Red-600**: `bg-red-600` / `text-red-600`
- Usage: Delete actions, rejected status, errors
- Example: Button "Hapus", Badge "Ditolak"

### Neutral/Info
- **Gray-600**: `bg-gray-600` / `text-gray-600`
- **Slate-600**: `bg-slate-600`
- Usage: Disabled states, secondary text

---

## 🔧 Component Color Mapping

### Buttons

#### Primary Button (Main Action)
```tsx
className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
```

#### Secondary Button
```tsx
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
```

#### Danger Button
```tsx
className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
```

#### Outline Button
```tsx
className="px-4 py-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
```

---

### Badges/Status

#### Status: Approved/Active
```tsx
className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
```

#### Status: Pending/Waiting
```tsx
className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
```

#### Status: Rejected/Inactive
```tsx
className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
```

#### Status: In Progress
```tsx
className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
```

---

### Cards/Panels

#### Primary Card (Highlights)
```tsx
className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-xl p-6 shadow-lg"
```

#### Secondary Card
```tsx
className="bg-white border-l-4 border-emerald-500 rounded-lg p-6 shadow"
```

#### Info Card
```tsx
className="bg-blue-50 border border-blue-200 rounded-lg p-4"
```

---

### Icons/Indicators

#### Success Icon Background
```tsx
className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
```

#### Warning Icon Background
```tsx
className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"
```

#### Error Icon Background
```tsx
className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center"
```

#### Info Icon Background
```tsx
className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"
```

---

### Alerts/Notifications

#### Success Alert
```tsx
className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded"
```

#### Warning Alert
```tsx
className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded"
```

#### Error Alert
```tsx
className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded"
```

#### Info Alert
```tsx
className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded"
```

---

## 🎯 Dashboard-Specific Guidelines

### CitizenDashboard
- **Primary**: Emerald-600 (request submissions, main actions)
- **Secondary**: Blue-600 (view details, info)
- **Accent**: Gradient emerald-to-blue for stat cards

### DusunDashboard
- **Primary**: Emerald-600 (approve actions, add data)
- **Secondary**: Blue-600 (view reports, export)
- **Accent**: Emerald for active tabs

### OperatorDashboard
- **Primary**: Emerald-600 (admin actions, publish)
- **Secondary**: Blue-600 (edit, manage)
- **Accent**: Emerald-blue gradient for metrics

---

## ❌ Colors to AVOID

Jangan gunakan warna-warna ini untuk menghindari tabrakan:
- ❌ Purple, Pink, Indigo (tidak konsisten dengan tema)
- ❌ Orange yang terlalu terang (gunakan Amber untuk warning)
- ❌ Lime, Cyan (gunakan Emerald dan Blue saja)

---

## ✅ Color Consistency Checklist

- [ ] Semua primary buttons menggunakan `bg-emerald-600`
- [ ] Semua secondary buttons menggunakan `bg-blue-600`
- [ ] Status badges konsisten: green=success, amber=warning, red=danger
- [ ] Gradient hanya emerald-to-blue
- [ ] Tidak ada purple, pink, orange di komponen utama

---

## 🔄 Migration Guide

### Before (Inconsistent):
```tsx
// ❌ Random colors
<button className="bg-purple-600">Action</button>
<button className="bg-indigo-600">Edit</button>
<span className="bg-orange-500">Warning</span>
```

### After (Consistent):
```tsx
// ✅ Standard colors
<button className="bg-emerald-600 hover:bg-emerald-700">Action</button>
<button className="bg-blue-600 hover:bg-blue-700">Edit</button>
<span className="bg-amber-600">Warning</span>
```

---

**Generated:** Nov 12, 2025  
**Version:** 1.0  
**Status:** Production Ready
