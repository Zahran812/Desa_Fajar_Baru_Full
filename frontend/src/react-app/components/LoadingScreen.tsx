import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 mx-auto">
            <Loader2 className="w-16 h-16 text-emerald-600 animate-spin" />
          </div>
        </div>
        <p className="text-gray-600 font-medium">Memuat halaman...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
