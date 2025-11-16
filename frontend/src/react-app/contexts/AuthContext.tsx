import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  rt_number?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface RegisterData {
  phone: string;
  password: string;
  province?: string;
  regency?: string;
  nik: string;
  full_name: string;
  birth_place?: string;
  birth_date?: string;
  gender?: string;
  blood_type?: string;
  address?: string;
  rt_number?: string;
  rw_number?: string;
  dusun?: string;
  village?: string;
  district?: string;
  religion?: string;
  marital_status?: string;
  occupation?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE_URL as string;
  const DEMO_USERS: Record<string, { password: string; user: User }> = {
    '08123456789': { password: 'operator123', user: { id: 1, username: 'operator', email: 'operator@example.com', full_name: 'Operator Desa', role: 'operator', rt_number: '01' } },
    '081234560000': { password: 'dusun123', user: { id: 2, username: 'dusun_head', email: 'dusun@example.com', full_name: 'Kepala Dusun', role: 'dusun_head', rt_number: '01' } },
    '081234560011': { password: 'pengguna123', user: { id: 3, username: 'citizen', email: 'user@example.com', full_name: 'Pengguna Masyarakat', role: 'citizen', rt_number: '01' } },
  };
  // Demo mode aktif jika: explicit true, dev mode, atau tidak ada API URL
  // FORCE DEMO MODE untuk production build - selalu aktif
  const DEMO_ENABLED = true;

  // Log demo mode status
  useEffect(() => {
    if (DEMO_ENABLED) {
      console.log('%c🎭 DEMO MODE AKTIF', 'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
      console.log('✅ Login tersedia tanpa backend');
      console.log('📱 Gunakan akun demo yang tersedia di halaman login');
      if (!API) {
        console.log('ℹ️ Backend URL tidak dikonfigurasi - menggunakan demo mode');
      }
    } else {
      console.log('🔗 Backend mode aktif:', API);
      console.log('💡 Demo users juga tersedia sebagai fallback');
    }
  }, [DEMO_ENABLED, API]);

  const checkAuth = async () => {
    console.log('🔍 checkAuth called - DEMO_ENABLED:', DEMO_ENABLED);
    try {
      if (DEMO_ENABLED) {
        const stored = localStorage.getItem('demo_user');
        console.log('📦 localStorage demo_user:', stored ? 'Found' : 'Not found');
        if (stored) {
          const userData = JSON.parse(stored);
          console.log('✅ Setting user from localStorage:', userData.role);
          setUser(userData);
        } else {
          console.log('❌ No stored user - setting null');
          setUser(null);
        }
        setLoading(false); // FIX: Set loading false sebelum return
        console.log('⏳ Loading set to FALSE (demo mode)');
        return;
      }
      const response = await fetch(`${API}/api/auth/me.php`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone: string, password: string): Promise<boolean> => {
    console.log('🔐 Login attempt - phone:', phone);
    try {
      // Cek demo users terlebih dahulu (selalu tersedia sebagai fallback)
      const demo = DEMO_USERS[phone];
      console.log('🎭 Demo user check:', demo ? 'Found' : 'Not found');
      if (demo && demo.password === password) {
        console.log('✅ Demo credentials valid - role:', demo.user.role);
        setUser(demo.user);
        localStorage.setItem('demo_user', JSON.stringify(demo.user));
        console.log('💾 User saved to localStorage');
        console.log('👤 User state updated:', demo.user);
        return true;
      }
      
      // Jika bukan demo user dan backend tersedia, coba login ke backend
      if (!DEMO_ENABLED && API) {
        const response = await fetch(`${API}/api/auth/login.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ phone, password }),
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          return true;
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }
      }
      
      // Jika sampai sini, login gagal
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      if (DEMO_ENABLED) {
        return { success: false, message: 'Demo mode: pendaftaran dinonaktifkan. Gunakan akun demo yang tersedia.' };
      }
      const response = await fetch(`${API}/api/auth/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const logout = async () => {
    try {
      if (DEMO_ENABLED) {
        localStorage.removeItem('demo_user');
      } else {
        await fetch(`${API}/api/auth/logout.php`, {
          method: 'POST',
          credentials: 'include',
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      window.location.href = '/';
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    isDemoMode: DEMO_ENABLED,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
