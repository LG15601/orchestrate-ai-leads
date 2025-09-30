import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-gray-100 z-[60]">
      <div 
        className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-100 ease-linear" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
