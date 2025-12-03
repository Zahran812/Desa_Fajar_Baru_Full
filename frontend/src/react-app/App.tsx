import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AuthProvider } from "@/react-app/contexts/AuthContext";
import { MusicProvider } from "@/react-app/contexts/MusicContext";
import ErrorBoundary from "@/react-app/components/ErrorBoundary";
import ScrollToTop from "@/react-app/components/ScrollToTop";
import ProtectedRoute from "@/react-app/components/ProtectedRoute";

// Lazy pages
const HomePage = lazy(() => import("@/react-app/pages/Home"));

// Main Pages
const LayananPage = lazy(() => import("@/react-app/pages/Layanan"));
const BeritaPage = lazy(() => import("@/react-app/pages/Berita"));
const BeritaDetail = lazy(() => import("@/react-app/pages/BeritaDetail"));

// Auth Pages
const LoginPage = lazy(() => import("@/react-app/pages/Login"));

// Dashboard Pages
const OperatorDashboard = lazy(() => import("@/react-app/pages/dashboard/OperatorDashboard"));
const DusunDashboard = lazy(() => import("@/react-app/pages/dashboard/DusunDashboard"));
const CitizenDashboard = lazy(() => import("@/react-app/pages/dashboard/CitizenDashboard"));
const KadesDashboard = lazy(() => import("@/react-app/pages/dashboard/KadesDashboard"));

// Transparansi Pages
const APBPage = lazy(() => import("@/react-app/pages/transparansi/APB"));
const IDMPage = lazy(() => import("@/react-app/pages/transparansi/IDM"));
const BansosPage = lazy(() => import("@/react-app/pages/transparansi/Bansos"));
const PembangunanPage = lazy(() => import("@/react-app/pages/transparansi/Pembangunan"));
const StatistikPage = lazy(() => import("@/react-app/pages/transparansi/Statistik"));

// Program Pages
const BUMDesEkonomiPage = lazy(() => import("@/react-app/pages/program/BUMDesEkonomi"));
const KesehatanSosialPage = lazy(() => import("@/react-app/pages/program/KesehatanSosial"));
const PendidikanBudayaPage = lazy(() => import("@/react-app/pages/program/PendidikanBudaya"));

// Profil Pages
const PejabatStruktural = lazy(() => import("@/react-app/pages/profil/PejabatStruktural"));
const ProfilSejarah = lazy(() => import("@/react-app/pages/profil/ProfilSejarah"));
const DemografiWilayah = lazy(() => import("@/react-app/pages/profil/DemografiWilayah"));

// Layanan Subpages
const AdministrasiPage = lazy(() => import("@/react-app/pages/layanan/Administrasi"));
const PPIDPage = lazy(() => import("@/react-app/pages/layanan/PPID"));

// Informasi Pages
const AgendaPage = lazy(() => import("@/react-app/pages/informasi/Agenda"));
const GaleriPage = lazy(() => import("@/react-app/pages/informasi/Galeri"));

export default function App() {
  // Preload critical resources for instant loading
  useEffect(() => {
    // Prefetch hero images to avoid "preload not used" warnings while still warming cache
    const criticalImages = [
      'https://mocha-cdn.com/0199a0ab-e05b-7337-b3a1-2db426100c05/Desain-tanpa-judul-(2).jpg',
      'https://mocha-cdn.com/01998bf8-465d-7ec6-a55e-1c243b53c352/LrSjPPUnIW.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload hero video for instant playback
    const video = document.createElement('video');
    video.src = 'https://ia601000.us.archive.org/32/items/desa_20251002/desa.mp4';
    video.preload = 'auto';
    video.load();
  }, []);

  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Dashboard Routes - Protected */}
                <Route 
                  path="/dashboard/operator" 
                  element={
                    <ProtectedRoute allowedRoles={['operator']}>
                      <OperatorDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/dusun" 
                  element={
                    <ProtectedRoute allowedRoles={['dusun_head']}>
                      <DusunDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/citizen" 
                  element={
                    <ProtectedRoute allowedRoles={['citizen']}>
                      <CitizenDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/kades" 
                  element={
                    <ProtectedRoute allowedRoles={['kades']}>
                      <KadesDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Profil Routes */}
                <Route path="/profil/pejabat-struktural" element={<PejabatStruktural />} />
                <Route path="/profil/profil-sejarah" element={<ProfilSejarah />} />
                <Route path="/profil/demografi-wilayah" element={<DemografiWilayah />} />
                
                {/* Main Routes */}
                <Route path="/layanan" element={<LayananPage />} />
                <Route path="/berita" element={<BeritaPage />} />
                <Route path="/berita/:slug" element={<BeritaDetail />} />
                
                {/* Transparansi Routes */}
                <Route path="/transparansi/apb" element={<APBPage />} />
                <Route path="/transparansi/idm" element={<IDMPage />} />
                <Route path="/transparansi/bansos" element={<BansosPage />} />
                <Route path="/transparansi/pembangunan" element={<PembangunanPage />} />
                <Route path="/transparansi/statistik" element={<StatistikPage />} />
                
                {/* Program Routes */}
                <Route path="/program/bumdes-ekonomi" element={<BUMDesEkonomiPage />} />
                <Route path="/program/kesehatan-sosial" element={<KesehatanSosialPage />} />
                <Route path="/program/pendidikan-budaya" element={<PendidikanBudayaPage />} />
                
                {/* Layanan Sub Routes */}
                <Route path="/layanan/administrasi" element={<AdministrasiPage />} />
                <Route path="/layanan/ppid" element={<PPIDPage />} />
                
                {/* Informasi Routes */}
                <Route path="/informasi/agenda" element={<AgendaPage />} />
                <Route path="/informasi/galeri" element={<GaleriPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}
