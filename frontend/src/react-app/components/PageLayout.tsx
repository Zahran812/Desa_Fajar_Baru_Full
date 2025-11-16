import { ReactNode } from 'react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumb?: Array<{ name: string; href?: string }>;
}

const PageLayout = ({ children, title, subtitle, breadcrumb }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-village-green to-blue-600">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          {breadcrumb && (
            <nav className="flex items-center space-x-2 text-sm text-emerald-100 mb-4">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {item.href ? (
                    <Link to={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-white">{item.name}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
          
          <div className="text-center text-white">
            {title && (
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default PageLayout;
