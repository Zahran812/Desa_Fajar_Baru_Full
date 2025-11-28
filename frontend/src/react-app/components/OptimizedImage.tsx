import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  onLoad
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-50'
      } ${className}`}
      loading="eager"
      decoding="async"
      onLoad={() => {
        setIsLoaded(true);
        onLoad?.();
      }}
      onError={() => {
        console.error('Failed to load image:', src);
        setHasError(true);
      }}
    />
  );
};

export default OptimizedImage;
