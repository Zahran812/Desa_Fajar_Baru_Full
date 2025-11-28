import { useState, useEffect } from 'react';
import { apiFetch } from '@/react-app/lib/api';

interface User {
  id: number;
  full_name: string;
  email: string;
  // Add other user properties as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await apiFetch('/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          // The backend returns { success: true, user: { ... } }
          setUser(data.user);
        } else {
          setUser(null);
          // Optional: remove token if it's invalid
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return { user, loading };
};
