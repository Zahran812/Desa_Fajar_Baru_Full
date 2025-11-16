import { ReactNode, useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import DashboardSidebar from '@/react-app/components/DashboardSidebar';
import SearchModal from '@/react-app/components/SearchModal';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface Notification {
  id: number | string;
  type: 'message' | 'request' | 'user' | 'system';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  action?: {
    tab: string;
    subTab?: string;
    data?: any;
  };
}

interface DashboardLayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  title: string;
  userInfo: {
    name: string;
    role: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  onLogout: () => void;
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const DashboardLayout = ({ 
  children, 
  menuItems, 
  activeTab, 
  onTabChange, 
  title, 
  userInfo, 
  onLogout,
  notifications = [],
  onNotificationClick,
  onProfileClick,
  onSettingsClick
}: DashboardLayoutProps) => {
  const [isCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (!target.closest('.profile-dropdown') && profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
      
      if (!target.closest('.notification-dropdown') && notificationDropdownOpen) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen, notificationDropdownOpen]);

  // Calculate content margin based on sidebar state
  const getContentMargin = () => {
    if (isMobile) return 'ml-0';
    return isCollapsed ? 'ml-20' : 'ml-64';
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notification: Notification) => {
    setNotificationDropdownOpen(false);
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
        <div className="h-16 px-6">
          <div className="flex justify-between items-center h-full">
            {/* Left side - Title for mobile/desktop */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            
            {/* Right side - Actions and User */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cari"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative notification-dropdown">
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
                  title="Notifikasi"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {notificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                        {unreadNotifications > 0 && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                            {unreadNotifications} baru
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p>Tidak ada notifikasi</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                              notification.unread ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Lihat Semua Notifikasi
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                    <p className="text-xs text-gray-500">{userInfo.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                      <p className="text-xs text-gray-500">{userInfo.role}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onProfileClick) onProfileClick();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profil Saya</span>
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onSettingsClick) onSettingsClick();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Pengaturan</span>
                      </button>
                    </div>
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <DashboardSidebar
        menuItems={menuItems}
        activeTab={activeTab}
        onTabChange={onTabChange}
        title={title}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ease-in-out ${getContentMargin()}`}>
        <div className="p-6">
          <div className="max-w-full">
            {children}
          </div>
        </div>
      </main>

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardLayout;
