"use client";

import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export function useDebouncedValue<T>(value: T, delay = 250): T {
  /** Returns a debounced version of the input value. */
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
