import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

  // -------------------------------
  // CHECK AUTH WITH TOKEN ( /api/me )
  // -------------------------------
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // LOGIN → SIMPAN TOKEN SANCTUM
  // -------------------------------
  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("auth_token", data.token);

        setUser(data.user);
        return true;
      }

      console.error("Login failed:", data);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // -------------------------------
  // REGISTER (opsional)
  // -------------------------------
  const register = async (userData: RegisterData) => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        return { success: true, message: data.message };
      }

      return { success: false, message: data.message || "Registration failed" };
    } catch (err) {
      console.error("Registration error:", err);
      return { success: false, message: "Network error" };
    }
  };
  // -------------------------------
  // LOGOUT
  // -------------------------------
  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await fetch(`${API_BASE}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
      window.location.href = "/";
    }
  };

  // -------------------------------
  // RUN CHECK AUTH AT FIRST LOAD
  // -------------------------------
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
