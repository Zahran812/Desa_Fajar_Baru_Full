import { Navigate } from 'react-router-dom';
import { useAuth } from '@/react-app/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log('🚫 ProtectedRoute: No user, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log('🚫 ProtectedRoute: User role not allowed. User:', user.role, 'Allowed:', allowedRoles);
    // Redirect to appropriate dashboard based on user role
    switch (user.role) {
      case 'operator':
        return <Navigate to="/dashboard/operator" replace />;
      case 'dusun_head':
        return <Navigate to="/dashboard/dusun" replace />;
      case 'citizen':
        return <Navigate to="/dashboard/citizen" replace />;
      case 'kades':
        return <Navigate to="/dashboard/kades" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  console.log('✅ ProtectedRoute: Access granted for role:', user.role);
  return <>{children}</>;
};

export default ProtectedRoute;
