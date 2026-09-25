import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage.js';

/** State that survives a refresh. Falls back silently if storage is blocked. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readJSON(key, initialValue));

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset];
}
