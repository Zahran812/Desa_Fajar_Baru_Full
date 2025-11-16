import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to scroll to top on route change
 * Ensures every page loads from the top position
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use instant to avoid smooth scroll
    });
  }, [pathname]);

  return null;
}
