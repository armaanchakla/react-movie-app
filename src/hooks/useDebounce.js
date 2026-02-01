import { useEffect } from "react";

export default function useDebounce(callback, delay, deps) {
  useEffect(() => {
    const id = setTimeout(callback, delay);
    return () => clearTimeout(id);
  }, deps);
}