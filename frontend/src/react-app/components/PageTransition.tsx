import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  // Run transition ONLY on route/pathname change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // On normal re-renders (typing in forms), just swap children without overlay
  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  return (
    <div className="relative">
      {/* Ultra-fast transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-white/90 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-village-green/5 to-blue-600/5" />
        </div>
      )}
      
      {/* Page content with instant entrance */}
      <div className={`transition-all duration-75 ease-out ${
        isTransitioning 
          ? 'opacity-90' 
          : 'opacity-100 animate-fade-in'
      }`}>
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;
