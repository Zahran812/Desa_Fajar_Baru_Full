import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import Services from '@/react-app/components/Services';
import Statistics from '@/react-app/components/Statistics';
import News from '@/react-app/components/News';
import AgendaGallery from '@/react-app/components/AgendaGallery';
import ContactCTA from '@/react-app/components/ContactCTA';
import Footer from '@/react-app/components/Footer';
import ChatBot from '@/react-app/components/ChatBot';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-6">
        <Hero />
      </div>
      <Services />
      <Statistics />
      <News />
      <AgendaGallery />
      <ContactCTA />
      <Footer />
      <ChatBot />
    </div>
  );
}
