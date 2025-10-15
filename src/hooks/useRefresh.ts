import { useEffect, useState } from 'react';

const useRefresh = () => {
  const [fastRefresh, setFastRefresh] = useState(0);
  const [slowRefresh, setSlowRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFastRefresh((prev) => prev + 1);
    }, 10000); // Fast refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlowRefresh((prev) => prev + 1);
    }, 60000); // Slow refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  return { fastRefresh, slowRefresh };
};

export default useRefresh;