import { useEffect, useCallback } from 'react';

export default function (callback) {
  const escFunction = useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        callback();
      }
    },
    [callback]
  );
  useEffect(() => {
    window.addEventListener('keydown', escFunction);
    return () => {
      window.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);
}
