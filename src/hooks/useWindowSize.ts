import { useCallback, useEffect, useState } from 'react';

export default function useWindowSize(): {
  windowWidth: number | undefined;
  windowHeight: number | undefined;
} {
  const isClient = typeof window === 'object';

  const getSize = useCallback(
    () => ({
      windowWidth: isClient ? window.innerWidth : undefined,
      windowHeight: isClient ? window.innerHeight : undefined,
    }),
    [isClient],
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [getSize]);

  return windowSize;
}
