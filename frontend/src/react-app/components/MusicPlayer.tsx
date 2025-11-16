import { AudioLines, Pause } from 'lucide-react';
import { useMusic } from '@/react-app/contexts/MusicContext';

const MusicPlayer = () => {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <button 
      onClick={toggleMusic}
      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105"
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      title={isPlaying ? "Jeda musik" : "Putar musik"}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5" />
      ) : (
        <AudioLines className="w-5 h-5" />
      )}
    </button>
  );
};

export default MusicPlayer;
