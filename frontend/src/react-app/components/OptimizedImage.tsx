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

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      loading="eager"
      decoding="async"
      onLoad={() => {
        setIsLoaded(true);
        onLoad?.();
      }}
    />
  );
};

export default OptimizedImage;
