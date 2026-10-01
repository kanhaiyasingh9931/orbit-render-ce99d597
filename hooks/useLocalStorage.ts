'use client';

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.map((item: any, idx: number) => {
            if (typeof item === 'string') {
              return {
                id: `legacy-${idx}-${Date.now()}`,
                text: item,
                completed: false,
                createdAt: Date.now(),
              };
            }
            return {
              id: item && item.id ? String(item.id) : `legacy-${idx}-${Date.now()}`,
              text: item && typeof item.text === 'string' ? item.text : '',
              completed: item ? Boolean(item.completed) : false,
              createdAt: item && item.createdAt ? Number(item.createdAt) : Date.now(),
            };
          });
          setStoredValue(sanitized as T);
        } else {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value: SetStateAction<T>) => {
      setStoredValue((prevValue) => {
        const nextValue = value instanceof Function ? value(prevValue) : value;

        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          }
        } catch (error) {
          console.warn(`Error setting localStorage key "${key}":`, error);
        }

        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue, isHydrated];
}
