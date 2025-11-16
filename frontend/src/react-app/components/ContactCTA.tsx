import { useContentAnimation } from '@/react-app/hooks/useContentAnimation';

const ContactCTA = () => {
  const { isVisible, elementRef } = useContentAnimation();

  return (
    <section 
      ref={elementRef as any}
      className={`py-12 lg:py-16 bg-gradient-to-r from-emerald-600 to-blue-600 ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4">
            Butuh Bantuan atau Informasi?
          </h2>
          <p className="text-lg lg:text-xl text-emerald-100 max-w-2xl mx-auto">
            Tim kami siap membantu Anda dengan pelayanan terbaik
          </p>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button 
              onClick={() => window.location.href = '/login'}
              className="btn-secondary bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3"
              title="Masuk ke akun untuk menghubungi kami"
            >
              Hubungi Kami
            </button>
            <button 
              onClick={() => window.open('https://www.google.com/maps/place/Gg.+Balai+Desa/@-5.3420085,105.2652679,1288m/data=!3m1!1e3!4m7!3m6!1s0x2e40c4e05391e265:0x19082a5416920514!4b1!8m2!3d-5.3435775!4d105.2684809!16s%2Fg%2F11k3qk06j8!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDkyOC4wIKXMDSoASAFQAw%3D%3D', '_blank')}
              className="btn-outline border-white text-white hover:bg-white hover:text-emerald-600 px-6 py-3"
            >
              Kunjungi Kantor Desa
            </button>
          </div>
          
          {/* Additional info for contact button */}
          <div className="mt-4">
            <p className="text-sm text-emerald-100 opacity-90">
              * Untuk menghubungi kami, silakan masuk ke akun terlebih dahulu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
