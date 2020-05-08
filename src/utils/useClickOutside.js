import { useEffect, useCallback } from 'react';

export default function (elmMain, elmSub, callback) {
  const handleClick = useCallback(
    ({ target }) => {
      if (elmMain.current && !elmSub.current.contains(target)) {
        callback();
      }
    },
    [callback, elmMain, elmSub]
  );
  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
}
