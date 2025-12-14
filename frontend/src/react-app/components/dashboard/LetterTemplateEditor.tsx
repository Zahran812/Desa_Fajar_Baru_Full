import { useState, useEffect, useCallback, useRef } from 'react';

import {
 Upload,
 FileText, 
 AlertCircle,
 Loader2,
 CheckCircle,
 Eye,
 Bold,
 Italic,
 Underline,
 Strikethrough,
 List,
 ListOrdered,
 AlignLeft,
 AlignCenter,
 AlignRight,
 AlignJustify,
 Link2,
 Unlink,
 Table,
 Highlighter,
 Eraser,
 Palette,
 Braces,
} from 'lucide-react';

// Pastikan path ke apiFetch sudah benar
import { apiFetch } from '@/react-app/lib/api'; 

// Set PDF.js worker (optional, tidak diubah)
if (typeof window !== 'undefined' && 'Worker' in window) {
 // Worker setup for PDF preview (optional, can be added later if needed)
}

interface LetterTemplate {
 id?: number;
 service_id: number;
 name: string;
 status: 'active' | 'inactive'; 
 description?: string;
 kop_html?: string | null;
 body_html?: string | null;
 created_at?: string;
}

interface LetterTemplateEditorProps {
 serviceId: number;
 onClose?: () => void; 
}

interface HeaderTexts {
 pemerintah: string;
 kecamatan: string;
 desa: string;
 alamat: string;
}

const defaultHeaderTexts: HeaderTexts = {
 pemerintah: 'PEMERINTAH KABUPATEN LAMPUNG SELATAN',
 kecamatan: 'KECAMATAN JATI AGUNG',
 desa: 'DESA FAJAR BARU',
 alamat: 'JL. RA. BASYID No. 1 FAJAR BARU 35564',
};

// ==========================================================
// KOP STYLE DEFINITION
// DEFINISI BARU: Menyimpan style Kop Surat dalam konstanta
// ==========================================================

const KOP_STYLE_INTERNAL = `
<style>
 .letterhead { 
    position: relative; 
    margin-bottom: 10px; 
    padding-bottom: 10px; 
    border-bottom: 3px solid #000; 
    overflow: hidden; 
  }
 .letterhead-logo { float: left; width: 90px; text-align: center; margin-top: 5px; }
 .letterhead-logo img { width: 80px; height: auto; }
 .letterhead-text { margin-left: 5px; text-align: center; padding-top: 0; }
 .letterhead-text .lh1, .letterhead-text .lh2, .letterhead-text .lh3, .letterhead-text .addr { margin: 0; padding: 0; line-height: 1.3; }
 .lh1 { font-size: 16pt; font-weight: bold; letter-spacing: 1px; }
 .lh2 { font-size: 16pt; font-weight: bold; letter-spacing: 1px; }
 .lh3 { font-size: 19pt; font-weight: bold; letter-spacing: 2px; margin-top: 3px; margin-bottom: 3px; }
 .addr { margin-left: 5px; font-size: 10pt; font-style: italic; letter-spacing: 0.8px; }
</style>
`;


// ==========================================================
// UTILITY: NORMALISASI ASSET URLS
// ==========================================================
const normalizeAssetUrls = (html: string) => {
 const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
 const baseUrl = (import.meta.env.BASE_URL || '').replace(/\/$/, '');
 const toApi = (path: string) => `${apiBase}/${path.replace(/^\//, '')}`;
 const toBase = (path: string) => `${baseUrl}/${path.replace(/^\//, '')}`;
 return html
  // handle Blade-style {{ asset('path') }} (general, kecuali kop/)
  .replace(/{{\s*asset\(['"](?!kop\/)([^'"]+)['"]\)\s*}}/g, (_m, p1) => toApi(p1))
  // handle Blade-style asset('path') (general, kecuali kop/)
  .replace(/asset\(['"](?!kop\/)([^'"]+)['"]\)/g, (_m, p1) => toApi(p1))
  // kop assets  BASE_URL (frontend public)
  .replace(/asset\(['"]kop\/([^'"]+)['"]\)/g, (_m, p1) => toBase(`kop/${p1}`))
  .replace(/{{\s*asset\(['"]kop\/([^'"]+)['"]\)\s*}}/g, (_m, p1) => toBase(`kop/${p1}`))
  // handle relative src paths for kop/* via BASE_URL
  .replace(/src=["'](?!https?:\/\/)(\/?)(kop\/[^"']+)["']/g, (_m, _slash, path) => `src="${toBase(path)}"`)
  // handle relative src paths for Logo/* via BASE_URL (public assets)
  .replace(/src=["'](?!https?:\/\/)(\/?)(Logo\/[^"']+)["']/g, (_m, _slash, path) => `src="${toBase(path)}"`)
  // fallback: if masih tersisa {{ /kop/... }} bungkus, hilangkan braces
  .replace(/{{\s*\/?(kop\/[^}]+)\s*}}/g, (_m, p1) => toBase(p1));
};

// ==========================================================
// KOP HTML BUILDER (Raw & Normalized)
// ==========================================================

// 1. Fungsi untuk menghasilkan HTML MENTAH (yang disimpan ke backend)
const buildRawKopHtmlContent = (headers: HeaderTexts = defaultHeaderTexts) => `
<div class="letterhead-logo">
 <img src="{{ asset('kop/kabupaten.png') }}" alt="Logo Kabupaten">
</div>
<div class="letterhead-text">
 <div class="lh1">${headers.pemerintah}</div>
 <div class="lh1">${headers.kecamatan}</div>
 <div class="lh3">${headers.desa}</div>
 <div class="addr">${headers.alamat}</div>
</div>
`;
// Fungsi yang mengembalikan seluruh HTML Kop Surat (termasuk DIV Kop)
const buildRawKopHtml = (headers: HeaderTexts = defaultHeaderTexts) => {
    return buildRawKopHtmlContent(headers);
}

// 2. Fungsi untuk menghasilkan HTML YANG DINORMALISASI (untuk tampilan frontend)
const buildNormalizedKopHtml = (headers: HeaderTexts = defaultHeaderTexts) => {
 const rawHtmlContent = buildRawKopHtmlContent(headers);
 const normalizedContent = normalizeAssetUrls(rawHtmlContent);
 // PERBAIKAN: Selalu tambahkan style internal di depan konten yang dinormalisasi untuk DOM editor
 return `${KOP_STYLE_INTERNAL}<div class="letterhead">${normalizedContent}</div>`; 
};

const defaultKopHtml = buildNormalizedKopHtml();

const LetterTemplateEditor = ({ serviceId }: LetterTemplateEditorProps) => {
 const [template, setTemplate] = useState<LetterTemplate | null>(null);

 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [success, setSuccess] = useState<string | null>(null);
 const [isOpen, setIsOpen] = useState(false);
 const kopRef = useRef<HTMLDivElement | null>(null);
 const bodyRef = useRef<HTMLDivElement | null>(null);
 
 const lastTemplateIdRef = useRef<number | null>(null);
 const defaultKadesName = 'M. Agus Budiantoro, S.HI';
 const activeEditorRef = useRef<'kop' | 'body' | null>(null);
 const [placeholderMode, setPlaceholderMode] = useState(false);
 const [tableBorderMode, setTableBorderMode] = useState<'border' | 'none'>('border');

 // Form state, inisialisasi dengan defaultKopHtml (yang sudah dinormalisasi + style)
 const [formData, setFormData] = useState({
  name: '',
  description: '',
  kop_html: defaultKopHtml,
  body_html: '',
  status: 'active' as 'active' | 'inactive',
 });
 const [headerTexts, setHeaderTexts] = useState<HeaderTexts>(defaultHeaderTexts);

 const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  // Hapus pesan error/sukses saat user mulai mengetik
  setError(null);
  setSuccess(null);
 }, []);

 const insertPlaceholder = useCallback((target: 'kop' | 'body') => {
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();
  const name = selectedText || prompt('Nama placeholder (contoh: nama, alamat):', '') || '';
  const normalized = name.replace(/[^a-zA-Z0-9_]/g, '_').trim();
  if (!normalized) return;
  const placeholder = `{{${normalized}}}`;
  const html = `<span style="background: #e0f2fe; padding: 1px 3px; border-radius: 3px;">${placeholder}</span>`;
  const targetNode =
   target === 'kop'
    ? kopRef.current
    : target === 'body'
     ? bodyRef.current
     : null;
  if (targetNode) {
   targetNode.focus();
   document.execCommand('insertHTML', false, html);
  } else {
   document.execCommand('insertHTML', false, html);
  }
 }, []);

 const applyCommand = useCallback((command: string, value?: string) => {
  const target =
   activeEditorRef.current === 'kop'
    ? kopRef.current
    : activeEditorRef.current === 'body'
     ? bodyRef.current
     : null;
  if (target) {
   target.focus();
   document.execCommand(command, false, value);
  }
 }, []);

 const applyInlineStyle = useCallback((style: string) => {
  const selection = window.getSelection();
  const selectedText = selection?.toString() || '';
  const html = selectedText
   ? `<span style="${style}">${selectedText}</span>`
   : `<span style="${style}">&nbsp;</span>`;
  document.execCommand('insertHTML', false, html);
 }, []);

 const insertTable = useCallback(() => {
   const rows = parseInt(prompt('Jumlah baris?', '2') || '0', 10);
   const cols = parseInt(prompt('Jumlah kolom?', '2') || '0', 10);
   if (!rows || !cols || rows < 1 || cols < 1) return;
   
   // Style untuk sel yang dapat diubah ukurannya
   const cellStyle = 'padding:6px; overflow: auto; resize: horizontal;';

   const cells = new Array(rows)
     .fill(null)
     .map(
       () =>
         `<tr>${new Array(cols)
           .fill(`<td style="${cellStyle}">Cell</td>`)
           .join('')}</tr>`
     )
     .join('');

   const tableStyle = 'width:100%; border-collapse: collapse;';
   const tableHtml = `<table style="${tableStyle}" border="1">${cells}</table><br/>`;

   document.execCommand('insertHTML', false, tableHtml);
 }, []);

 // Bekukan lebar kolom dan border sebelum simpan/preview agar PDF mengikuti
 const normalizeTables = useCallback((root: HTMLElement, mode: 'border' | 'none') => {
  root.querySelectorAll('table').forEach((table) => {
   const firstRow = table.querySelector('tr');
   if (!firstRow) return;
   const cells = Array.from(firstRow.children) as HTMLElement[];
   const tableWidth = (table as HTMLElement).getBoundingClientRect().width || (table as HTMLElement).offsetWidth || 1;

   // Hapus colgroup lama (DomPDF sering mengabaikan/merusak)
   table.querySelectorAll('colgroup').forEach((cg) => cg.remove());

   // Border on/off
   const borderStyle = mode === 'border' ? '1px solid #555' : 'none';
   (table as HTMLElement).style.borderCollapse = 'collapse';
   (table as HTMLElement).style.borderSpacing = '0';
   (table as HTMLElement).style.border = borderStyle;
   const rows = Array.from(table.querySelectorAll('tr'));
   rows.forEach((row) => {
    Array.from(row.children).forEach((cell, idx) => {
     const el = cell as HTMLElement;
     const source = cells[idx] || el;
     const widthPx = source.getBoundingClientRect().width || source.offsetWidth;
     const pct = widthPx ? Math.max(1, Math.round((widthPx / tableWidth) * 1000) / 10) : null;

     el.style.border = borderStyle;
     el.style.padding = el.style.padding || '6px';
     el.style.verticalAlign = 'top';
     el.style.removeProperty('resize');
     el.style.removeProperty('min-width');
     el.style.overflow = 'visible';
     if (pct) el.style.width = `${pct}%`;
    });
   });
  });
 }, []);

 const renderToolbar = useCallback((target: 'kop' | 'body') => (
  <div className="flex flex-wrap items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-2 rounded-md">
   <span className="text-xs font-medium text-gray-700 mr-2 capitalize">{target}</span>

   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('bold'); }} title="Bold"><Bold className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('italic'); }} title="Italic"><Italic className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('underline'); }} title="Underline"><Underline className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('strikeThrough'); }} title="Strikethrough"><Strikethrough className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('insertUnorderedList'); }} title="Bullet List"><List className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('insertOrderedList'); }} title="Numbered List"><ListOrdered className="w-4 h-4" /></button>

   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('justifyLeft'); }} title="Align Left"><AlignLeft className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('justifyCenter'); }} title="Align Center"><AlignCenter className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('justifyRight'); }} title="Align Right"><AlignRight className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('justifyFull'); }} title="Justify"><AlignJustify className="w-4 h-4" /></button>

   <select
    className="px-2 py-1 text-sm border rounded"
    onChange={(e) => { activeEditorRef.current = target; applyCommand('fontSize', e.target.value); e.target.value = ''; }}
    defaultValue=""
   >
    <option value="" disabled>Size</option>
    <option value="2">12px</option>
    <option value="3">14px</option>
    <option value="4">16px</option>
    <option value="5">18px</option>
   </select>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyInlineStyle('color:#1f2937'); }} title="Text Color"><Palette className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyInlineStyle('background-color:#fff3cd'); }} title="Highlight"><Highlighter className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('createLink', prompt('Masukkan URL:', 'https://') || ''); }} title="Link"><Link2 className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('unlink'); }} title="Unlink"><Unlink className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; insertTable(); }} title="Table"><Table className="w-4 h-4" /></button>
   <button type="button" className="p-1.5 border rounded hover:bg-white" onClick={() => { activeEditorRef.current = target; applyCommand('removeFormat'); }} title="Clear Formatting"><Eraser className="w-4 h-4" /></button>
   <button
    type="button"
    className={`p-1.5 border rounded hover:bg-white ${placeholderMode ? 'bg-blue-100 border-blue-300' : ''}`}
    onClick={() => {
     setPlaceholderMode((prev) => !prev);
     activeEditorRef.current = target;
    }}
    title="Mode Placeholder"
   >
    <Braces className="w-4 h-4" />
   </button>
   <button
    type="button"
    className="p-1.5 border rounded hover:bg-white"
    onClick={() => {
     activeEditorRef.current = target;
     insertPlaceholder(target);
    }}
    title="Sisipkan Placeholder"
   >
    <Braces className="w-4 h-4 text-blue-600" />
   </button>

  </div>
 ), [applyCommand, applyInlineStyle, insertTable, placeholderMode, insertPlaceholder]);

 // MODIFIKASI: Perbaikan No. 2
 // Pastikan DOM diisi ulang saat modal dibuka/tutup, atau data template berubah.
 useEffect(() => {
  if (isOpen) {
    // Ketika modal dibuka, isi konten editor dari formData
    if (kopRef.current) kopRef.current.innerHTML = formData.kop_html;
    if (bodyRef.current) bodyRef.current.innerHTML = formData.body_html;
  }

  // Logika reload template saat template ID berubah (hanya terjadi saat fetch/save)
  if (template && template.id !== lastTemplateIdRef.current) {
    if (kopRef.current) kopRef.current.innerHTML = formData.kop_html;
    if (bodyRef.current) bodyRef.current.innerHTML = formData.body_html;
    lastTemplateIdRef.current = template.id ?? null;
  }

 }, [isOpen, template, formData.kop_html, formData.body_html]);
 
 // Fetch template aktif untuk layanan ini
 useEffect(() => {
  const fetchTemplate = async () => {
   setLoading(true);
   setError(null);
   try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
     setError('Otentikasi gagal: Token tidak ditemukan.');
     return;
    }

    const response = await apiFetch(`/letter-templates/service/${serviceId}`, {
     method: 'GET',
     headers: {
      'Authorization': `Bearer ${token}`
     },
     credentials: 'include',
    });

    const data = await response.json();
    let tmpl: LetterTemplate | null = null;
    
    if (response.ok && data) {
      if (Array.isArray(data) && data.length > 0) {
        tmpl = data[0] as LetterTemplate;
      } else if (data && typeof data === 'object' && 'service_id' in data) {
        tmpl = data as LetterTemplate;
      } else if (data && data.data && typeof data.data === 'object' && 'service_id' in data.data) {
        tmpl = data.data as LetterTemplate;
      }
    }

    if (!tmpl) {
     setTemplate(null);
     lastTemplateIdRef.current = null; 
     setFormData(prev => ({
      ...prev,
      name: '',
      description: '',
      kop_html: defaultKopHtml,
      body_html: '',
      status: 'active',
     }));
     setHeaderTexts(defaultHeaderTexts);
    } else {
     // Derive header texts
     const deriveHeaders = (html?: string | null): HeaderTexts => {
      if (!html) return defaultHeaderTexts;
      try {
       // Untuk derive headers, kita hanya butuh kontennya, bukan style internal
       const cleanHtml = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/i, '');
       const container = document.createElement('div');
       container.innerHTML = cleanHtml;
       const findText = (selector: string, fallback: string) => {
        const el = container.querySelector(selector);
        return el?.textContent?.trim() || fallback;
       };
       return {
        pemerintah: findText('.lh1', defaultHeaderTexts.pemerintah),
        kecamatan: findText('.lh1:nth-of-type(2)', defaultHeaderTexts.kecamatan),
        desa: findText('.lh3', defaultHeaderTexts.desa),
        alamat: findText('.addr', defaultHeaderTexts.alamat),
       };
      } catch {
       return defaultHeaderTexts;
      }
     };
     const parsedHeaders = deriveHeaders(tmpl.kop_html);
     setHeaderTexts(parsedHeaders);
     
     // Gunakan fungsi normalisasi untuk tampilan editor (sudah termasuk style)
     const kopHtml = buildNormalizedKopHtml(parsedHeaders); 
     setTemplate(tmpl);
     setFormData({
      name: tmpl.name || '',
      description: tmpl.description || '',
      kop_html: kopHtml,
      body_html: tmpl.body_html || '',
      status: tmpl.status || 'active',
     });
    }
   } catch (err) {
    console.error('Error fetching template:', err);
    setError('Terjadi kesalahan saat memuat template');
    setTemplate(null);
    lastTemplateIdRef.current = null;
    setFormData(prev => ({
      ...prev,
      name: '',
      description: '',
      kop_html: defaultKopHtml,
      body_html: '',
    }));
    setHeaderTexts(defaultHeaderTexts);
   } finally {
    setLoading(false);
   }
  };

  fetchTemplate();
 }, [serviceId]);

 // Handle Submit (Create/Update)
 const handleSubmit = useCallback(async () => {
  // Ambil versi MENTAH konten Kop Surat (tanpa tag <style> dan <div class="letterhead"> di luar)
  const rawKopHtmlContent = buildRawKopHtml(headerTexts); 

  if (bodyRef.current) {
   normalizeTables(bodyRef.current, tableBorderMode);
  }
  const currentBodyHtml = bodyRef.current?.innerHTML || '';

  if (!formData.name.trim() || !rawKopHtmlContent.trim() || !currentBodyHtml.trim()) {
   setError('Nama template, kop surat, dan isi surat wajib diisi.');
   return;
  }

  setSaving(true);
  setError(null);
  setSuccess(null);

  try {
   const token = localStorage.getItem('auth_token');
   if (!token) {
    setError('Otentikasi gagal: Token tidak ditemukan.');
    setSaving(false);
    return;
   }

   const payload: LetterTemplate = {
    service_id: serviceId,
    name: formData.name,
    description: formData.description || '',
    // Saat menyimpan, simpan kembali template Kop HTML MENTAH
    kop_html: buildRawKopHtml(headerTexts) || '', // KIRIM VERSI MENTAH (BLADE SYNTAX)
    body_html: currentBodyHtml || '',
    status: formData.status,
   };

   let url = '/letter-templates';
   let method: 'POST' | 'PUT' = 'POST';
   if (template && template.id) {
    url = `/letter-templates/${template.id}`;
    method = 'PUT';
   }

   const response = await apiFetch(url, {
    method,
    headers: {
     'Authorization': `Bearer ${token}`,
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
   });

   if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const msg = errorData?.message || errorData?.error || 'Gagal menyimpan template surat';
    throw new Error(msg);
   }

   const result = await response.json();
   const saved: LetterTemplate = result.data || result;
   
   // Buat versi NORMALISASI untuk update state tampilan
   const normalizedKopHtml = buildNormalizedKopHtml(headerTexts); 

   setTemplate(saved);
   setFormData(prev => ({
    ...prev,
    name: saved.name || prev.name,
    description: saved.description || prev.description || '',
    kop_html: normalizedKopHtml, // Simpan yang dinormalisasi untuk tampilan
    body_html: payload.body_html || '',
    status: saved.status || prev.status,
   }));

   lastTemplateIdRef.current = null;
   setSuccess('Template surat berhasil disimpan');
   setTimeout(() => setSuccess(null), 3000);
  } catch (err) {
   console.error('Error saving template:', err);
   setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan template');
  } finally {
   setSaving(false);
  }
 }, [formData.name, formData.description, formData.status, headerTexts, serviceId, template, tableBorderMode, normalizeTables]);

 const handleToggleStatus = useCallback(() => {
  const newStatus = formData.status === 'active' ? 'inactive' : 'active';
  setFormData(prev => ({ ...prev, status: newStatus }));
 }, [formData.status]);

 const handlePreview = () => {
  if (bodyRef.current) {
   normalizeTables(bodyRef.current, tableBorderMode);
   const html = bodyRef.current.innerHTML;
   handleInputChange('body_html', html);
  }
 };

 return (
  <>
   {/* BARIS JUDUL & Tombol Buka Editor */}
   <div className="flex justify-between items-center mb-3">
    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
     <FileText className="w-6 h-6 text-purple-600" />
     Template Editor
    </h2>
    <button
     type="button"
     onClick={() => setIsOpen(true)}
     className="px-4 py-2 text-sm font-medium rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors"
    >
     Buka Editor Template
    </button>
   </div>

   {isOpen && (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4">
     <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-6">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
       <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
         <FileText className="w-6 h-6 text-purple-700" />
        </div>
        <div>
         <h2 className="text-lg font-bold text-gray-900">Template Surat Layanan</h2>
         <p className="text-xs text-gray-500">Atur tampilan surat yang akan digenerate otomatis.</p>
        </div>
       </div>
       <div className="flex items-center gap-2">
        <button
         type="button"
         onClick={() => setIsOpen(false)}
         className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
         Tutup
        </button>
       </div>
      </div>

      <div className="p-5 space-y-5 max-h-[90vh] overflow-y-auto">
       {/* Alert Messages */}
       {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{error}</span>
       </div>
       )}
       {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
         <CheckCircle className="w-5 h-5 flex-shrink-0" />
         <span className="text-sm">{success}</span>
        </div>
       )}

       {/* Nama Template */}
       <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-2 shadow-sm">
        <label className="block text-sm font-semibold text-gray-900" htmlFor="template-name">
         Nama Template <span className="text-red-500">*</span>
        </label>
        <input
         id="template-name"
         type="text"
         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
         placeholder="Contoh: Surat Keterangan Tidak Mampu"
         value={formData.name}
         onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <p className="text-xs text-gray-500">Nama ini wajib diisi sebelum menyimpan.</p>
       </div>

       {/* Header text inputs (kop fixed style) */}
       <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
         <h3 className="text-sm font-semibold text-gray-900">Kop Surat (teks saja)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
         {([
          { key: 'pemerintah', label: 'Baris 1 (Pemerintah)' },
          { key: 'kecamatan', label: 'Baris 2 (Kecamatan)' },
          { key: 'desa', label: 'Baris 3 (Desa)' },
          { key: 'alamat', label: 'Alamat' },
         ] as { key: keyof HeaderTexts; label: string }[]).map(item => (
          <div key={item.key}>
           <label className="text-xs font-semibold text-gray-700">{item.label}</label>
           <input
            type="text"
            value={headerTexts[item.key]}
            onChange={(e) => {
             const next = { ...headerTexts, [item.key]: e.target.value };
             setHeaderTexts(next);
             // Update state dan DOM dengan Kop HTML yang dinormalisasi
             const kopHtml = buildNormalizedKopHtml(next); 
             setFormData(prev => ({ ...prev, kop_html: kopHtml }));
             if (kopRef.current) kopRef.current.innerHTML = kopHtml;
            }}
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
            placeholder={defaultHeaderTexts[item.key]}
           />
          </div>
         ))}
        </div>
       </div>

       {/* Kop Preview (read-only, matches operator style) */}
       <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Kop Surat</h3>
        <p className="text-xs text-gray-600">
         Kop otomatis mengikuti teks di atas. Logo sudah dinormalisasi.
        </p>
        <div className="flex justify-center">
         <div
          id="kop-html"
          ref={kopRef}
          className="border border-gray-200 rounded-lg bg-white text-sm"
          suppressContentEditableWarning
          contentEditable={false}
          style={{
           width: '210mm',
           padding: '16mm',
           boxSizing: 'border-box',
           fontFamily: 'Times New Roman, serif',
          }}
          // Konten KopRef sudah berisi <style> dan <div class="letterhead">
          dangerouslySetInnerHTML={{
           __html: formData.kop_html,
          }}
         />
        </div>
       </div>

       {/* Body Surat Editor */}
       <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Isi Surat</h3>
        <div className="flex items-center gap-2">
         <span className="text-xs text-gray-600">Border Tabel:</span>

         <button
          type="button"
          onClick={() => setTableBorderMode('border')}
          className={`px-2 py-1 text-xs rounded border ${tableBorderMode === 'border' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
         >
          On
         </button>
         <button
          type="button"
          onClick={() => setTableBorderMode('none')}
          className={`px-2 py-1 text-xs rounded border ${tableBorderMode === 'none' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
         >
          Off
         </button>
        </div>
        <p className="text-xs text-gray-600">
         Susun isi surat sesuai kebutuhan. Placeholder data akan diisi oleh input operator saat generate.
        </p>
        {renderToolbar('body')}
        <div className="flex justify-center">
         <div
          id="body-html"
          ref={bodyRef}
          className="px-4 py-3 border border-gray-200 rounded-lg bg-white min-h-[240px] text-sm leading-relaxed"
          style={{ width: '210mm' }}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => { activeEditorRef.current = 'body'; }}
          onKeyDown={(e) => {
           if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
            return;
           }
           if (placeholderMode && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            insertPlaceholder('body');
            setPlaceholderMode(false);
           }
          }}

          onInput={(e) => {
           const html = (e.currentTarget as HTMLDivElement).innerHTML;
           handleInputChange('body_html', html);
          }}
         />
        </div>

       </div>

       {/* Status & Actions */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
         <span className="text-sm font-medium text-gray-700">Status:</span>
         <button
          type="button"
          onClick={handleToggleStatus}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
           formData.status === 'active'
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
         >
          {formData.status === 'active' ? 'Aktif' : 'Nonaktif'}
         </button>
        </div>

        <div className="flex items-center gap-2">
         <button
          type="button"
          onClick={handlePreview}
          className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
         >
          <Eye className="w-4 h-4" />
          Refresh Preview
         </button>

         <button
          type="button"
          disabled={saving}
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
         >
          {saving ? (
           <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Menyimpan...
           </>
          ) : (
           <>
            <Upload className="w-4 h-4" />
            Simpan Template
           </>
          )}
         </button>
        </div>
       </div>

       {/* Info Template Aktif */}
       <div className="space-y-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Informasi Template Aktif</h3>
        {loading ? (
         <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
         </div>
        ) : !template ? (
         <div className="text-center py-4 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Belum ada template surat untuk layanan ini. Silakan isi editor di atas lalu simpan.</p>
         </div>
        ) : (
         <>
          <p className="text-sm font-medium text-gray-900">{template.name}</p>
          {template.description && (
           <p className="text-xs text-gray-600">{template.description}</p>
          )}
          <p className="text-xs text-gray-500">
           Status:{' '}
           <span className={template.status === 'active' ? 'text-green-600 font-semibold' : 'text-gray-600 font-semibold'}>
            {template.status === 'active' ? 'Aktif' : 'Nonaktif'}
           </span>
          </p>
          <p className="text-xs text-gray-500">
           Terakhir diperbarui: {template.created_at ? new Date(template.created_at).toLocaleDateString() : '-'}
          </p>
         </>
        )}
       </div>

       {/* Preview A4 */}
       <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
         <Eye className="w-4 h-4 text-blue-600" />
         Preview Surat (A4)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg flex justify-center overflow-auto max-h-[700px] min-h-[320px]">
         <div
          className="bg-white shadow-md"
          style={{
           width: '210mm',
           minHeight: '297mm',
           padding: '20mm',
           boxSizing: 'border-box',
           fontFamily: 'Times New Roman, serif',
           fontSize: '11pt',
           lineHeight: 1.5,
          }}
         >
          {/* Perbaikan 1: Pindahkan style Kop ke sini juga, dan hapus <style> dari formData.kop_html */}
          {<div   dangerouslySetInnerHTML={{
              __html: KOP_STYLE_INTERNAL + formData.kop_html.replace(KOP_STYLE_INTERNAL, '')
            }} /> /* Menggunakan KOP_STYLE_INTERNAL dan konten Kop tanpa style */
                    }
          <div dangerouslySetInnerHTML={{ __html: formData.body_html }} />

          {/* Signature preview (fixed block) */}
          <div style={{ marginTop: '30px', width: '100%' }}>
           <div style={{ width: '50%', textAlign: 'center', float: 'right' }}>
            <p>Fajar Baru, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>Kepala Desa Fajar Baru</p>
            <div style={{ height: '100px', width: '100px', margin: '10px auto' }}>
             <div style={{ width: '100px', height: '100px', border: '1px dashed #ccc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px' }}>
              QR diisi saat tanda tangan
             </div>
            </div>
            <p style={{ marginTop: '10px', fontWeight: 'bold', textDecoration: 'underline' }}>({defaultKadesName})</p>
           </div>
           <div style={{ clear: 'both' }} />
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
};

export default LetterTemplateEditor;