import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface DashboardSidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  title: string;
}

const DashboardSidebar = ({ 
  menuItems, 
  activeTab, 
  onTabChange
}: DashboardSidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileMenuOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        const target = event.target as Node;
        if (sidebar && !sidebar.contains(target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  // Handle menu item click
  const handleMenuClick = (itemId: string) => {
    onTabChange(itemId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-20">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8">
            <img 
              src="https://mocha-cdn.com/0199a189-1854-7cf0-9e0e-736ba7bf1f93/LrSjPPUnIW.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Desa Digital</h2>
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              
              {item.badge && item.badge > 0 && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  activeTab === item.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile Sidebar Overlay
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <img 
                src="https://mocha-cdn.com/0199a189-1854-7cf0-9e0e-736ba7bf1f93/LrSjPPUnIW.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Desa Digital</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                
                {item.badge && item.badge > 0 && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activeTab === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md lg:hidden border border-gray-200"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Render appropriate sidebar */}
      {isMobile ? <MobileSidebar /> : <DesktopSidebar />}
    </>
  );
};

export default DashboardSidebar;
