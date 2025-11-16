import { SkipBack, SkipForward, Play, Pause } from 'lucide-react';
import { useMusic } from '@/react-app/contexts/MusicContext';

const MusicControls = () => {
  const { isPlaying, toggleMusic, nextTrack, prevTrack } = useMusic();

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={prevTrack}
        className="p-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Lagu sebelumnya"
        title="Lagu sebelumnya"
      >
        <SkipBack className="w-4 h-4" />
      </button>

      <button
        onClick={toggleMusic}
        className={`p-2 rounded-full text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${
          isPlaying 
            ? 'bg-emerald-600 hover:bg-emerald-700 animate-pulse' 
            : 'bg-gray-800 hover:bg-emerald-600'
        }`}
        aria-label={isPlaying ? 'Jeda' : 'Putar'}
        title={isPlaying ? 'Jeda' : 'Putar'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </button>

      <button
        onClick={nextTrack}
        className="p-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Lagu selanjutnya"
        title="Lagu selanjutnya"
      >
        <SkipForward className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MusicControls;
