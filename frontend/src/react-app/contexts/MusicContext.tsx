import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  currentTrackTitle: string;
  player: any;
  setPlayer: (player: any) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<any>(null);
  const [currentTrackTitle, setCurrentTrackTitle] = useState<string>('Desa Fajar Baru');
  const [originalTitle] = useState<string>(document.title);
  const isMutedRef = useRef(true);
  // User-provided playlist order
  const playlist = ['A2Uccg2OMtc', 'A316KgAZruQ', 'XEwSPbXoev4'];

  const updateTrackTitle = useCallback(() => {
    try {
      if (playerRef.current && playerRef.current.getVideoData) {
        const videoData = playerRef.current.getVideoData();
        const title = videoData?.title || 'Sedang memutar musik';
        setCurrentTrackTitle(title);
        document.title = `🎵 ${title} - ${originalTitle}`;
      }
    } catch {
      setCurrentTrackTitle('Sedang memutar musik');
    }
  }, [originalTitle]);

  const toggleMusic = useCallback(() => {
    if (!playerRef.current) {
      console.warn('Player not ready yet');
      return;
    }
    try {
      const ps = (window as any).YT?.PlayerState;
      const state = playerRef.current.getPlayerState ? playerRef.current.getPlayerState() : undefined;
      console.log('Player state:', state, 'PS values:', ps);
      
      // If paused, ended, or cued, start playback; otherwise pause
      if (state === ps?.PAUSED || state === ps?.ENDED || state === ps?.CUED || state === -1) {
        // Unmute when user clicks to play
        if (isMutedRef.current) {
          playerRef.current.unMute();
          isMutedRef.current = false;
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
        updateTrackTitle();
      } else if (state === ps?.PLAYING) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        document.title = originalTitle;
      }
    } catch (e) {
      console.error('Toggle music error:', e);
    }
  }, [originalTitle, updateTrackTitle]);

  const nextTrack = useCallback(() => {
    try {
      if (playerRef.current && playerRef.current.nextVideo) {
        playerRef.current.nextVideo();
        // Reduced delay for faster track title update
        setTimeout(updateTrackTitle, 200);
      }
    } catch (e) {
      console.error('Next track error:', e);
    }
  }, [updateTrackTitle]);

  const prevTrack = useCallback(() => {
    try {
      if (playerRef.current && playerRef.current.previousVideo) {
        playerRef.current.previousVideo();
        // Reduced delay for faster track title update
        setTimeout(updateTrackTitle, 200);
      }
    } catch (e) {
      console.error('Previous track error:', e);
    }
  }, [updateTrackTitle]);

  

  useEffect(() => {
    // Ensure a detached container exists in document.body (not managed by React)
    let created = false;
    let container = document.getElementById('youtube-player-container') as HTMLDivElement;
    if (!container) {
      container = document.createElement('div');
      container.style.display = 'none';
      container.id = 'youtube-player-container';
      document.body.appendChild(container);
      created = true;
    }

    const initializePlayer = () => {
      if ((window as any).YT && (window as any).YT.Player && !playerRef.current && container) {
        new (window as any).YT.Player(container, {
          height: '0',
          width: '0',
          videoId: playlist[0] || undefined,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            loop: 1,
            playlist: playlist.join(','),
            mute: 1, // Start muted by default
            origin: window.location.origin, // Cross-browser compatibility
            enablejsapi: 1 // Enable JavaScript API
          },
          events: {
            onReady: (event: any) => {
              const playerInstance = event.target;
              try {
                // Set volume and mute state
                playerInstance.setVolume(70); // Increased volume for better sound quality
                playerInstance.mute(); // Ensure muted on start
                playerRef.current = playerInstance; // Set ref immediately
                setPlayer(playerInstance); // Set state for context
                setIsPlaying(false);
                isMutedRef.current = true;
                console.log('YouTube player ready!', playerInstance);
                // Load playlist (not cue) so tracks are ready but don't auto-play
                if (playlist.length > 0) {
                  playerInstance.cuePlaylist({
                    playlist: playlist,
                    index: 0
                  });
                }
              } catch (e) {
                console.error('Player ready error:', e);
              }
            },
            onStateChange: (event: any) => {
              const ps = (window as any).YT?.PlayerState;
              if (!ps) return;
              
              if (event.data === ps.PLAYING) {
                setIsPlaying(true);
                updateTrackTitle();
              } else if (event.data === ps.PAUSED || event.data === ps.ENDED) {
                setIsPlaying(false);
                if (event.data === ps.PAUSED) {
                  document.title = originalTitle;
                }
                // Auto-play next track when current ends (for seamless playlist)
                if (event.data === ps.ENDED && playerRef.current) {
                  try {
                    playerRef.current.nextVideo();
                  } catch {}
                }
              }
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event.data);
              // Try to recover by loading next video on error
              try {
                if (playerRef.current && playerRef.current.nextVideo) {
                  setTimeout(() => playerRef.current.nextVideo(), 1000);
                }
              } catch {}
            }
          }
        });
      }
    };

    // Load YouTube API script once safely
    if (!(window as any).YT || !(window as any).YT.Player) {
      const existing = document.getElementById('youtube-iframe-api');
      if (!existing) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      try { 
        if (playerRef.current?.destroy) {
          playerRef.current.destroy();
        }
      } catch {}
      if (created && container && container.parentNode) {
        try { container.parentNode.removeChild(container); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        nextTrack,
        prevTrack,
        currentTrackTitle,
        player,
        setPlayer
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
