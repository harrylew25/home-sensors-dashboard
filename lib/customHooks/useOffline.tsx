import { useState, useEffect } from "react";

export function useOffline(): boolean {
  const getIsOffline = () =>
    typeof navigator !== "undefined" ? !navigator.onLine : false;

  const [isOffline, setIsOffline] = useState(getIsOffline);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOffline;
}
