import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  const apiKey =
    key === "copyit-items" ? "items" : key === "copyit-todos" ? "todos" : key;

  // Load data only on the client to avoid hydration mismatch.
  useEffect(() => {
    let cancelled = false;

    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!cancelled) setValue(parsed);
      }
    } catch {
      // ignore invalid local storage data
    }

    (async () => {
      try {
        const res = await fetch(`/api/items?key=${encodeURIComponent(apiKey)}`);
        if (!res.ok) throw new Error("no server");
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) {
          setValue(data);
          try {
            localStorage.setItem(key, JSON.stringify(data));
          } catch {}
        }
      } catch {
        // server not available — keep localStorage value
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key, apiKey]);

  // Persist to localStorage and try to persist to server
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }

    (async () => {
      try {
        await fetch(`/api/items?key=${encodeURIComponent(apiKey)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
      } catch {
        // server not available — silent fallback
      }
    })();
  }, [key, apiKey, value]);

  return [value, setValue];
}
