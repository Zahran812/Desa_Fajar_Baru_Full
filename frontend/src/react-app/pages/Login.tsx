import { useState, useEffect, memo, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { useAuth } from '@/react-app/contexts/AuthContext';
import PageLayout from '@/react-app/components/PageLayout';
import { Eye, EyeOff, Phone, Lock, User, CreditCard, MapPin, Home, UserCog, Users as UsersIcon, UserCheck, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type RegionItem = { id: string | number; name: string };

type KtpParsed = {
  province: string;
  regency: string;
  nik: string;
  full_name: string;
  birth_place: string;
  birth_date: string;
  gender: string;
  blood_type: string;
  address: string;
  rt_number: string;
  rw_number: string;
  village: string;
  dusun: string;
  district: string;
  religion: string;
  marital_status: string;
  occupation: string;
};

// Memoized heavy illustration to avoid re-rendering on every keystroke
const IllustrationSection = memo(({ side, isLogin }: { side: 'left' | 'right'; isLogin: boolean }) => (
  <div className={`flex-1 bg-gradient-to-br from-emerald-600 via-village-green to-blue-600 ${side === 'left' ? 'rounded-l-3xl' : 'rounded-r-3xl'} p-6 lg:p-10 flex flex-col justify-center items-center relative overflow-hidden`}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-white/70 rounded-full"></div>
      <div className="absolute bottom-20 left-16 w-12 h-12 bg-white/50 rounded-full"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-white/30 rounded-full"></div>
      <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-white/40 rounded-full"></div>
    </div>

    <div className="relative z-10 mb-8">
      <div className="w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-sm p-4 shadow-xl">
        <img 
          src="https://mocha-cdn.com/0199c995-2403-790f-8dc0-fb7603ef3221/LrSjPPUnIW.png" 
          alt="Logo Desa" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>

    <div className="text-center text-white relative z-10 max-w-md">
      <h1 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
        {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan Kami'}
      </h1>
      <p className="text-emerald-100 text-base lg:text-lg mb-6 leading-relaxed">
        {isLogin 
          ? 'Sistem Informasi Digital Desa Fajar Baru - Akses mudah untuk semua layanan desa'
          : 'Daftarkan diri Anda untuk mengakses layanan digital desa yang terintegrasi'
        }
      </p>

      <div className="relative">
        <div className="w-48 lg:w-56 h-36 lg:h-44 mx-auto bg-white/10 rounded-2xl backdrop-blur-sm p-4 lg:p-6 shadow-xl">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m5 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-5 0v-6a1 1 0 011-1h2a1 1 0 011 1v6" />
                </svg>
              </div>
              <p className="text-white/90 text-xs lg:text-sm font-medium">Smart Village System</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="absolute bottom-6 left-6 right-6 text-center">
      <p className="text-emerald-100 text-xs lg:text-sm">
        © 2025 Desa Fajar Baru - Jati Agung, Lampung Selatan
      </p>
    </div>
  </div>
));

const Login = () => {
  const { user, login, register, loading } = useAuth();
  const isDemoMode = false; // Backend is now functional
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState<'phone' | 'method' | 'otp' | 'reset'>('phone');
  const [forgotMethod, setForgotMethod] = useState<'sms'>('sms');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    province: '',
    regency: '',
    nik: '',
    full_name: '',
    birth_place: '',
    birth_date: '',
    gender: '',
    blood_type: '',
    address: '',
    rt_number: '',
    rw_number: '',
    dusun: '',
    village: '',
    district: '',
    religion: '',
    marital_status: '',
    occupation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [provinces, setProvinces] = useState<RegionItem[]>([]);
  const [regencies, setRegencies] = useState<RegionItem[]>([]);
  const [districts, setDistricts] = useState<RegionItem[]>([]);
  const [villages, setVillages] = useState<RegionItem[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedRegencyId, setSelectedRegencyId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedVillageId, setSelectedVillageId] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    console.log('🚦 Login redirect check - user:', user?.role, 'loading:', loading);
    if (user && !loading) {
      console.log('✅ Redirecting to dashboard for role:', user.role);
      switch (user.role) {
        case 'operator':
          console.log('➡️ Redirecting to /dashboard/operator');
          window.location.href = '/dashboard/operator';
          break;
        case 'dusun_head':
          console.log('➡️ Redirecting to /dashboard/dusun');
          window.location.href = '/dashboard/dusun';
          break;
        case 'kades':
          console.log('➡️ Redirecting to /dashboard/kades');
          window.location.href = '/dashboard/kades';
          break;
        case 'citizen':
          console.log('➡️ Redirecting to /dashboard/citizen');
          window.location.href = '/dashboard/citizen';
          break;
        default:
          console.log('➡️ Redirecting to /');
          window.location.href = '/';
      }
    }
  }, [user, loading]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const res = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
        const data = await res.json();
        setProvinces(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    const loadRegencies = async () => {
      if (!selectedProvinceId) {
        setRegencies([]); setSelectedRegencyId(''); setDistricts([]); setVillages([]);
        return;
      }
      try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`);
        const data = await res.json();
        setRegencies(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadRegencies();
  }, [selectedProvinceId]);

  useEffect(() => {
    const loadDistricts = async () => {
      if (!selectedRegencyId) {
        setDistricts([]); setSelectedDistrictId(''); setVillages([]);
        return;
      }
      try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegencyId}.json`);
        const data = await res.json();
        setDistricts(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadDistricts();
  }, [selectedRegencyId]);

  useEffect(() => {
    const loadVillages = async () => {
      if (!selectedDistrictId) {
        setVillages([]); setSelectedVillageId('');
        return;
      }
      try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrictId}.json`);
        const data = await res.json();
        setVillages(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadVillages();
  }, [selectedDistrictId]);

  // Normalize helper
  const norm = (s: string) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

  // When provinces list or formData.province changes, map name -> id
  useEffect(() => {
    if (!provinces.length || !formData.province) return;
    const p = provinces.find((x) => norm(x.name) === norm(formData.province));
    if (p && String(p.id) !== selectedProvinceId) {
      setSelectedProvinceId(String(p.id));
    }
  }, [provinces, formData.province, selectedProvinceId]);

  // When regencies list or formData.regency changes
  useEffect(() => {
    if (!regencies.length || !formData.regency) return;
    const r = regencies.find((x) => norm(x.name) === norm(formData.regency));
    if (r && String(r.id) !== selectedRegencyId) {
      setSelectedRegencyId(String(r.id));
    }
  }, [regencies, formData.regency, selectedRegencyId]);

  // When districts list or formData.district changes
  useEffect(() => {
    if (!districts.length || !formData.district) return;
    const d = districts.find((x) => norm(x.name) === norm(formData.district));
    if (d && String(d.id) !== selectedDistrictId) {
      setSelectedDistrictId(String(d.id));
    }
  }, [districts, formData.district, selectedDistrictId]);

  // When villages list or formData.village changes
  useEffect(() => {
    if (!villages.length || !formData.village) return;
    const v = villages.find((x) => norm(x.name) === norm(formData.village));
    if (v && String(v.id) !== selectedVillageId) {
      setSelectedVillageId(String(v.id));
    }
  }, [villages, formData.village, selectedVillageId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedProvinceId(id);
    const name = provinces.find((p) => String(p.id) === id)?.name || '';
    setFormData((prev) => ({ ...prev, province: name, regency: '', district: '', village: '' }));
    setSelectedRegencyId(''); setSelectedDistrictId(''); setSelectedVillageId('');
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedRegencyId(id);
    const name = regencies.find((r) => String(r.id) === id)?.name || '';
    setFormData((prev) => ({ ...prev, regency: name, district: '', village: '' }));
    setSelectedDistrictId(''); setSelectedVillageId('');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedDistrictId(id);
    const name = districts.find((d) => String(d.id) === id)?.name || '';
    setFormData((prev) => ({ ...prev, district: name, village: '' }));
    setSelectedVillageId('');
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedVillageId(id);
    const name = villages.find((v) => String(v.id) === id)?.name || '';
    setFormData((prev) => ({ ...prev, village: name, dusun: name }));
  };

  const handleOtpDigitChange = (index: number, rawValue: string) => {
    const digit = String(rawValue || '').replace(/\D/g, '').slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text') || '';
    const digits = pasted.replace(/\D/g, '').slice(0, 4).split('');
    if (digits.length === 0) return;
    e.preventDefault();
    setOtpDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < 4; i += 1) {
        next[i] = digits[i] || '';
      }
      return next;
    });
    const lastIdx = Math.min(digits.length, 4) - 1;
    if (lastIdx >= 0) {
      otpInputRefs.current[lastIdx]?.focus();
    }
  };

  const forgotSubtitle = () => {
    if (!isForgotPassword) return '';
    if (forgotStep === 'phone') return 'Masukkan nomor telepon untuk reset kata sandi';
    if (forgotStep === 'method') return 'Pilih metode pemulihan akun';
    if (forgotStep === 'otp') return 'Masukkan kode OTP 4 digit yang dikirim via SMS';
    return 'Buat kata sandi baru untuk akun Anda';
  };

  const forgotSubmitLabel = () => {
    if (!isForgotPassword) return '';
    if (forgotStep === 'phone') return 'Lanjutkan';
    if (forgotStep === 'method') return 'Kirim OTP';
    if (forgotStep === 'otp') return 'Verifikasi OTP';
    return 'Simpan Kata Sandi';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });

    if (isForgotPassword) {
      const phone = String(formData.phone || '').trim();
      if (!phone) {
        setMessage({ type: 'error', content: 'Nomor telepon wajib diisi.' });
        setIsSubmitting(false);
        return;
      }

      const otpValue = otpDigits.join('');

      if (forgotStep === 'phone') {
        setForgotStep('method');
        setIsSubmitting(false);
        return;
      }

      if (forgotStep === 'method') {
        if (forgotMethod !== 'sms') {
          setMessage({ type: 'error', content: 'Pilih metode pemulihan akun.' });
          setIsSubmitting(false);
          return;
        }
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        setGeneratedOtp(otp);
        setOtpDigits(['', '', '', '']);
        setForgotStep('otp');
        setMessage({
          type: 'success',
          content: `Kode OTP telah dikirim melalui SMS di nomor ${phone}.`,
        });
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 0);
        setIsSubmitting(false);
        return;
      }

      if (forgotStep === 'otp') {
        if (otpValue.length !== 4) {
          setMessage({ type: 'error', content: 'Masukkan OTP 4 digit.' });
          setIsSubmitting(false);
          return;
        }
        if (!generatedOtp || otpValue !== generatedOtp) {
          setMessage({ type: 'error', content: 'OTP salah. Silakan coba lagi.' });
          setIsSubmitting(false);
          return;
        }
        setForgotStep('reset');
        setMessage({ type: 'success', content: 'Verifikasi OTP berhasil. Silakan buat kata sandi baru.' });
        setIsSubmitting(false);
        return;
      }

      if (forgotStep === 'reset') {
        const p1 = newPassword;
        const p2 = confirmNewPassword;
        if (!p1 || p1.length < 6) {
          setMessage({ type: 'error', content: 'Kata sandi baru minimal 6 karakter.' });
          setIsSubmitting(false);
          return;
        }
        if (p1 !== p2) {
          setMessage({ type: 'error', content: 'Konfirmasi kata sandi tidak cocok.' });
          setIsSubmitting(false);
          return;
        }

        setFormData((prev) => ({ ...prev, password: p1 }));
        setIsForgotPassword(false);
        setIsLogin(true);
        setShowPassword(false);
        setForgotStep('phone');
        setForgotMethod('sms');
        setOtpDigits(['', '', '', '']);
        setGeneratedOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setMessage({ type: 'success', content: 'Kata sandi berhasil diperbarui. Silakan login.' });
        setIsSubmitting(false);
        return;
      }
    } else if (isLogin) {
      const success = await login(formData.phone, formData.password);
      if (!success) {
        setMessage({ type: 'error', content: 'Nomor telepon atau kata sandi tidak valid' });
      }
    } else {
      const result = await register(formData);
      if (result.success) {
        setMessage({ 
          type: 'success', 
          content: result.message || 'Pendaftaran berhasil! Menunggu persetujuan operator desa.' 
        });
        setFormData({
          phone: '',
          password: '',
          province: '',
          regency: '',
          nik: '',
          full_name: '',
          birth_place: '',
          birth_date: '',
          gender: '',
          blood_type: '',
          address: '',
          rt_number: '',
          rw_number: '',
          dusun: '',
          village: '',
          district: '',
          religion: '',
          marital_status: '',
          occupation: '',
        });
        setTimeout(() => {
          setIsLogin(true);
          setMessage({ type: '', content: '' });
        }, 3000);
      } else {
        setMessage({ type: 'error', content: result.message || 'Pendaftaran gagal' });
      }
    }

    setIsSubmitting(false);
  };

  const fillDemoCredentials = (phone: string, password: string) => {
    setFormData(prev => ({ ...prev, phone, password }));
    setMessage({ type: '', content: '' });
  };

  const resetForm = () => {
    setFormData({
      phone: '',
      password: '',
      province: '',
      regency: '',
      nik: '',
      full_name: '',
      birth_place: '',
      birth_date: '',
      gender: '',
      blood_type: '',
      address: '',
      rt_number: '',
      rw_number: '',
      dusun: '',
      village: '',
      district: '',
      religion: '',
      marital_status: '',
      occupation: '',
    });
    setMessage({ type: '', content: '' });
    setSelectedProvinceId('');
    setSelectedRegencyId('');
    setSelectedDistrictId('');
    setSelectedVillageId('');
  };

  const parseKtpText = (text: string): KtpParsed => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.replace(/\s{2,}/g, ' ').trim())
      .filter((l) => l.length > 0);

    let province = '';
    let regency = '';
    let nik = '';
    let full_name = '';
    let birth_place = '';
    let birth_date = '';
    let gender = '';
    let blood_type = '';
    let address = '';
    let rt_number = '';
    let rw_number = '';
    let village = '';
    let dusun = '';
    let district = '';
    let religion = '';
    let marital_status = '';
    let occupation = '';

    for (const line of lines) {
      if (!province) {
        const m0 = line.match(/PROVINSI\s+(.+)/i);
        if (m0) province = m0[1].trim();
      }
      if (!regency) {
        const m00 = line.match(/KAB\.?\/?KOTA\s+(.+)/i) || line.match(/KABUPATEN\s+(.+)/i) || line.match(/KOTA\s+(.+)/i);
        if (m00) regency = m00[1].trim();
      }
      if (!nik) {
        const m1 = line.match(/NIK[^0-9]*([0-9]{16})/i) || line.match(/([0-9]{16})/);
        if (m1) nik = m1[1];
      }
      if (!full_name) {
        const m2 = line.match(/^\s*(Nama|NAMA)\s*[:-]?\s*(.+)$/i);
        if (m2) full_name = m2[2].replace(/[^A-Za-z\s'.-]/g, ' ').trim();
      }
      if (!birth_place || !birth_date) {
        const m2b = line.match(/Tempat\s*[/]?\s*Tgl\.?\s*Lahir\s*[:-]?\s*(.+)/i);
        if (m2b) {
          const val = m2b[1];
          const parts = val.split(/[,;]|\s{2,}/).map((p) => p.trim()).filter(Boolean);
          if (parts.length >= 1) birth_place = parts[0];
          const dateMatch = val.match(/(\d{2}[-/]\d{2}[-/]\d{4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})/);
          if (dateMatch) birth_date = dateMatch[1];
        }
      }
      if (!gender) {
        const m2c = line.match(/Jenis\s*Kelamin\s*[:-]?\s*([A-Za-z-]+)/i);
        if (m2c) gender = m2c[1].toUpperCase();
      }
      if (!blood_type) {
        const m2d = line.match(/Gol\.?\s*Darah\s*[:-]?\s*([ABO]{1,2}|AB)/i);
        if (m2d) blood_type = m2d[1].toUpperCase();
      }
      if (!address) {
        const m3 = line.match(/^\s*(Alamat|ALAMAT)\s*[:-]?\s*(.+)$/i);
        if (m3) address = m3[2].trim();
      }
      if (!rt_number || !rw_number) {
        const m4 = line.match(/RT\s*[/]?\s*([0-9]{1,3})\s*[,/]?\s*RW\s*[/]?\s*([0-9]{1,3})/i);
        if (m4) {
          rt_number = m4[1].padStart(2, '0');
          rw_number = m4[2].padStart(2, '0');
        } else {
          const rtOnly = line.match(/RT\s*[/]?\s*([0-9]{1,3})/i);
          const rwOnly = line.match(/RW\s*[/]?\s*([0-9]{1,3})/i);
          if (rtOnly) rt_number = rtOnly[1].padStart(2, '0');
          if (rwOnly) rw_number = rwOnly[1].padStart(2, '0');
        }
      }
      if (!dusun || !village) {
        const m5 = line.match(/(Desa|Kel[/]?Desa|Kelurahan)\s*[:-]?\s*([A-Za-z\s'.-]+)/i);
        if (m5) {
          dusun = m5[2].trim();
          village = m5[2].trim();
        }
      }
      if (!district) {
        const m6 = line.match(/Kecamatan\s*[:-]?\s*([A-Za-z\s'.-]+)/i);
        if (m6) district = m6[1].trim();
      }
      if (!religion) {
        const m7 = line.match(/Agama\s*[:-]?\s*([A-Za-z\s'.-]+)/i);
        if (m7) religion = m7[1].trim();
      }
      if (!marital_status) {
        const m8 = line.match(/Status\s*Perkawinan\s*[:-]?\s*([A-Za-z\s'.-]+)/i);
        if (m8) marital_status = m8[1].trim();
      }
      if (!occupation) {
        const m9 = line.match(/Pekerjaan\s*[:-]?\s*([A-Za-z\s'.-]+)/i);
        if (m9) occupation = m9[1].trim();
      }
    }

    if (!full_name) {
      const nameIdx = lines.findIndex((l) => /Nama|NAMA/.test(l));
      if (nameIdx >= 0 && nameIdx + 1 < lines.length) {
        full_name = lines[nameIdx + 1].replace(/[^A-Za-z\s'.-]/g, ' ').trim();
      }
    }

    return {
      province,
      regency,
      nik,
      full_name,
      birth_place,
      birth_date,
      gender,
      blood_type,
      address,
      rt_number,
      rw_number,
      village,
      dusun,
      district,
      religion,
      marital_status,
      occupation,
    };
  };

  const processKtpImage = async (file: File) => {
    setIsOcrProcessing(true);
    try {
      const result = await Tesseract.recognize(file, 'ind+eng');
      const text = result.data.text || '';
      const parsed = parseKtpText(text);
      const updates: Partial<typeof formData> = {};
      for (const key of Object.keys(parsed) as Array<keyof KtpParsed>) {
        const val = parsed[key];
        if (val) {
          updates[key as keyof typeof formData] = val;
        }
      }
      if (Object.keys(updates).length > 0) {
        setFormData((prev) => ({ ...prev, ...updates }));
        setMessage({ type: 'success', content: 'Data KTP terdeteksi. Mohon periksa kembali sebelum mendaftar.' });
      } else {
        setMessage({ type: 'error', content: 'Gagal mengekstrak data. Pastikan foto KTP jelas dan rata.' });
      }
    } catch {
      setMessage({ type: 'error', content: 'Terjadi kesalahan saat memindai KTP.' });
    } finally {
      setIsOcrProcessing(false);
    }
  };

  const handleKtpInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      await processKtpImage(file);
      e.currentTarget.value = '';
    }
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </PageLayout>
    );
  }

  

  const renderFormSection = (side: 'left' | 'right') => (
    <div className={`flex-1 bg-white ${side === 'left' ? 'rounded-l-3xl' : 'rounded-r-3xl'} p-6 lg:p-10 flex flex-col justify-center`}>

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {isForgotPassword ? 'Lupa Kata Sandi' : isLogin ? 'Masuk' : 'Daftar'}
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          {isForgotPassword 
            ? forgotSubtitle()
            : isLogin 
              ? 'Masuk ke akun Anda untuk mengakses layanan desa' 
              : 'Buat akun baru untuk mengakses layanan digital desa'
          }
        </p>
      </div>

      {/* Demo Mode Banner */}
      {isDemoMode && isLogin && !isForgotPassword && (
        <div className="mb-4 lg:mb-6 bg-gradient-to-r from-blue-500 to-emerald-500 text-white p-3 lg:p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🎭</span>
            <h3 className="font-bold text-sm lg:text-base">Mode Demo Aktif</h3>
          </div>
          <p className="text-xs lg:text-sm opacity-90">
            Website berjalan tanpa backend. Gunakan akun demo di bawah untuk login dan mengakses dashboard.
          </p>
        </div>
      )}

      {/* Message */}
      {message.content && (
        <div className={`mb-4 lg:mb-6 p-3 lg:p-4 rounded-xl border-l-4 text-sm lg:text-base ${
          message.type === 'error' 
            ? 'bg-red-50 border-red-500 text-red-700' 
            : 'bg-emerald-50 border-emerald-500 text-emerald-700'
        }`}>
          {message.content}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
        {/* Phone Number */}
        <div>
          <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
            Nomor Telepon
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              autoComplete="tel"
              disabled={isForgotPassword && forgotStep !== 'phone'}
              className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-600"
              placeholder="08123456789"
            />
          </div>
          {isForgotPassword && forgotStep !== 'phone' && (
            <button
              type="button"
              onClick={() => {
                setForgotStep('phone');
                setOtpDigits(['', '', '', '']);
                setGeneratedOtp('');
                setNewPassword('');
                setConfirmNewPassword('');
                setMessage({ type: '', content: '' });
              }}
              className="mt-2 text-xs text-emerald-600 hover:text-emerald-800 font-medium"
            >
              Ubah nomor telepon
            </button>
          )}
        </div>

        {/* Forgot Password: Method Selection */}
        {isForgotPassword && forgotStep === 'method' && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-800">Pilih metode pemulihan akun</div>
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
              <input
                type="radio"
                name="forgot-method"
                checked={forgotMethod === 'sms'}
                onChange={() => setForgotMethod('sms')}
                className="w-4 h-4 text-emerald-600"
              />
              <div className="ml-3 flex-1">
                <div className="font-semibold text-gray-900">Verifikasi via SMS</div>
                <div className="text-xs text-gray-600 mt-1">Kode OTP akan dikirim ke nomor HP Anda</div>
              </div>
            </label>
          </div>
        )}

        {/* Forgot Password: OTP */}
        {isForgotPassword && forgotStep === 'otp' && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-800">Masukkan OTP</div>
            <div className="flex items-center justify-between gap-3">
              {otpDigits.map((d, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputRefs.current[idx] = el;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={idx === 0 ? handleOtpPaste : undefined}
                  className="w-12 h-12 lg:w-14 lg:h-14 text-center text-xl font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setForgotStep('method');
                  setOtpDigits(['', '', '', '']);
                  setGeneratedOtp('');
                  setMessage({ type: '', content: '' });
                }}
                className="text-xs text-gray-600 hover:text-gray-800 font-medium"
              >
                Kirim ulang OTP
              </button>
              {generatedOtp && (
                <div className="text-[11px] text-gray-400">
                  (Demo) OTP: {generatedOtp}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Forgot Password: Reset Password */}
        {isForgotPassword && forgotStep === 'reset' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Minimal 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Ulangi kata sandi"
                />
              </div>
            </div>
          </div>
        )}

        {/* Password (immediately after phone) */}
        {!isForgotPassword && (
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!isForgotPassword}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Masukkan kata sandi"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* KTP Scan/Upload controls */}
        {!isLogin && !isForgotPassword && (
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Pindai / Upload KTP</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openCamera}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm lg:text-base"
              >
                Buka Kamera & Pindai
              </button>
              <button
                type="button"
                onClick={openFilePicker}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm lg:text-base"
              >
                Upload Foto KTP
              </button>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleKtpInputChange}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleKtpInputChange}
              className="hidden"
            />
            {isOcrProcessing && <div className="mt-2 text-sm text-gray-600">Memindai KTP...</div>}
          </div>
        )}

        {/* Data Pribadi */}
        {!isLogin && !isForgotPassword && (
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required={!isLogin && !isForgotPassword}
                autoComplete="name"
                className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          </div>
        )}
        {!isLogin && !isForgotPassword && (
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
              NIK
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                required={!isLogin && !isForgotPassword}
                autoComplete="off"
                className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="3304xxxxxxxxxxxx"
                maxLength={16}
              />
            </div>
          </div>
        )}
        {!isLogin && !isForgotPassword && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Tempat Lahir</label>
              <input type="text" name="birth_place" value={formData.birth_place} onChange={handleInputChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4" />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir</label>
              <div className="relative">
                <DatePicker
                  selected={formData.birth_date ? new Date(formData.birth_date.split('-').reverse().join('-')) : null}
                  onChange={(date) => {
                    if (date) {
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      const formattedDate = `${day}-${month}-${year}`;
                      setFormData(prev => ({
                        ...prev,
                        birth_date: formattedDate
                      }));
                    }
                  }}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
                  className="w-full pl-10 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  maxDate={new Date()}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
          </div>
        )}
        {!isLogin && !isForgotPassword && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
              <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4" />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Golongan Darah</label>
              <input type="text" name="blood_type" value={formData.blood_type} onChange={handleInputChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4" />
            </div>
          </div>
        )}
        {!isLogin && !isForgotPassword && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Agama</label>
              <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4" />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Status Perkawinan</label>
              <input type="text" name="marital_status" value={formData.marital_status} onChange={handleInputChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4" />
            </div>
          </div>
        )}
        {!isLogin && !isForgotPassword && (
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4" />
          </div>
        )}
        {/* Registration fields */}
        {!isLogin && !isForgotPassword && (
          <>
            {/* Wilayah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Provinsi</label>
                <select value={selectedProvinceId} onChange={handleProvinceChange} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4 bg-white">
                  <option value="">Pilih Provinsi</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Kabupaten / Kota</label>
                <select value={selectedRegencyId} onChange={handleRegencyChange} disabled={!selectedProvinceId} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4 bg-white disabled:bg-gray-100 disabled:text-gray-400">
                  <option value="">Pilih Kabupaten/Kota</option>
                  {regencies.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Kecamatan & Kelurahan/Desa directly under Kabupaten/Kota */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Kecamatan</label>
                <select value={selectedDistrictId} onChange={handleDistrictChange} disabled={!selectedRegencyId} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4 bg-white disabled:bg-gray-100 disabled:text-gray-400">
                  <option value="">Pilih Kecamatan</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">Kelurahan / Desa</label>
                <select value={selectedVillageId} onChange={handleVillageChange} disabled={!selectedDistrictId} className="w-full pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500 px-4 bg-white disabled:bg-gray-100 disabled:text-gray-400">
                  <option value="">Pilih Kelurahan/Desa</option>
                  {villages.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
          </div>

            

            

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
                  RT
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                  <input
                    type="text"
                    name="rt_number"
                    value={formData.rt_number}
                    onChange={handleInputChange}
                    autoComplete="address-line3"
                    className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="RT 01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
                  RW
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                  <input
                    type="text"
                    name="rw_number"
                    value={formData.rw_number}
                    onChange={handleInputChange}
                    autoComplete="address-level3"
                    className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="RW 01"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
                Alamat Lengkap
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  autoComplete="street-address"
                  className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 text-sm lg:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Jl. Contoh No. 123"
                />
              </div>
            </div>

            
          </>
        )}

        {/* Forgot Password Link */}
        {isLogin && !isForgotPassword && (
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(true);
                setForgotStep('phone');
                setForgotMethod('sms');
                setOtpDigits(['', '', '', '']);
                setGeneratedOtp('');
                setNewPassword('');
                setConfirmNewPassword('');
                resetForm();
              }}
              className="text-xs lg:text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
            >
              Lupa kata sandi?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 lg:py-4 px-4 lg:px-6 text-sm lg:text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Memproses...</span>
            </div>
          ) : (
            isForgotPassword ? forgotSubmitLabel() : isLogin ? 'Masuk' : 'Daftar Sekarang'
          )}
        </button>
      </form>

      {/* Demo Accounts Section */}
      {isDemoMode && isLogin && !isForgotPassword && (
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center justify-center mb-3">
            <div className="h-px bg-emerald-200 flex-1"></div>
            <h3 className="text-sm font-semibold text-emerald-700 mx-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              🎭 Akun Demo - Tanpa Backend
            </h3>
            <div className="h-px bg-emerald-200 flex-1"></div>
          </div>
          <p className="text-xs text-gray-600 text-center mb-4">
            Klik untuk mengisi kredensial otomatis dan login tanpa server
          </p>
          <div className="space-y-2">
            {/* Operator */}
            <button
              type="button"
              onClick={() => fillDemoCredentials('08123456789', 'operator123')}
              className="w-full flex items-center gap-3 p-3 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCog className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-gray-900">Operator Desa</div>
                <div className="text-xs text-gray-500">08123456789 • operator123</div>
              </div>
              <div className="text-xs text-emerald-600 group-hover:text-emerald-700 font-medium">
                Gunakan →
              </div>
            </button>

            {/* Kepala Dusun */}
            <button
              type="button"
              onClick={() => fillDemoCredentials('081234560000', 'dusun123')}
              className="w-full flex items-center gap-3 p-3 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-gray-900">Kepala Dusun</div>
                <div className="text-xs text-gray-500">081234560000 • dusun123</div>
              </div>
              <div className="text-xs text-emerald-600 group-hover:text-emerald-700 font-medium">
                Gunakan →
              </div>
            </button>

            {/* Masyarakat */}
            <button
              type="button"
              onClick={() => fillDemoCredentials('081234560011', 'pengguna123')}
              className="w-full flex items-center gap-3 p-3 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-gray-900">Pengguna Masyarakat</div>
                <div className="text-xs text-gray-500">081234560011 • pengguna123</div>
              </div>
              <div className="text-xs text-emerald-600 group-hover:text-emerald-700 font-medium">
                Gunakan →
              </div>
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-emerald-200">
            <p className="text-xs text-gray-500 text-center">
              💡 Mode demo aktif - Login tanpa backend
            </p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="mt-6 lg:mt-8 space-y-3 lg:space-y-4">
        {/* Toggle Login/Register */}
        {!isForgotPassword && (
          <div className="text-center">
            <span className="text-gray-600">
              {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
              className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors text-sm lg:text-base"
            >
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </div>
        )}

        {/* Back to Login from Forgot Password */}
        {isForgotPassword && (
          <div className="text-center">
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setIsLogin(true);
                setForgotStep('phone');
                setForgotMethod('sms');
                setOtpDigits(['', '', '', '']);
                setGeneratedOtp('');
                setNewPassword('');
                setConfirmNewPassword('');
                resetForm();
              }}
              className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors text-sm lg:text-base"
            >
              ← Kembali ke halaman masuk
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <PageLayout 
      title={isForgotPassword ? 'Lupa Kata Sandi' : isLogin ? 'Masuk' : 'Daftar'}
      subtitle={isForgotPassword 
        ? 'Reset kata sandi akun Anda'
        : isLogin 
          ? 'Akses layanan digital desa'
          : 'Bergabung dengan sistem digital desa'
      }
      breadcrumb={[
        { name: 'Beranda', href: '/' },
        { name: isForgotPassword ? 'Lupa Kata Sandi' : isLogin ? 'Masuk' : 'Daftar' }
      ]}
    >
      <div className="py-12 bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:flex bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[650px]">
              {isLogin ? (
                <>
                  <IllustrationSection side="left" isLogin={isLogin} />
                  {renderFormSection('right')}
                </>
              ) : (
                <>
                  {renderFormSection('left')}
                  <IllustrationSection side="right" isLogin={isLogin} />
                </>
              )}
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-emerald-600 via-village-green to-blue-600 p-6 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full"></div>
                    <div className="absolute top-8 right-8 w-8 h-8 bg-white/70 rounded-full"></div>
                    <div className="absolute bottom-4 left-8 w-6 h-6 bg-white/50 rounded-full"></div>
                    <div className="absolute bottom-8 right-4 w-10 h-10 bg-white/30 rounded-full"></div>
                  </div>

                  {/* Village Logo */}
                  <div className="relative z-10 mb-3">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm p-2.5 mx-auto shadow-xl">
                      <img 
                        src="https://mocha-cdn.com/0199c995-2403-790f-8dc0-fb7603ef3221/LrSjPPUnIW.png" 
                        alt="Logo Desa" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="text-white relative z-10">
                    <h1 className="text-xl font-bold mb-2">
                      {isLogin ? 'Selamat Datang' : 'Bergabung dengan Kami'}
                    </h1>
                    <p className="text-emerald-100 text-sm">
                      Sistem Informasi Digital Desa Fajar Baru
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  {renderFormSection('left')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
