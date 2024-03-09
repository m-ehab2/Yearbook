import { useEffect, useState } from "react";

interface AuthPersistenceHook {
  sessionToken: string | null;
  setAuthCookie: (token: string) => void;
  clearAuthCookie: () => void;
}

const useAuthPersistence = (): AuthPersistenceHook => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  useEffect(() => {
    const checkAuthCookie = (): string | null => {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "sessionToken") {
          return value;
        }
      }
      return null;
    };

    const token = checkAuthCookie();
    setSessionToken(token);

    return () => {
      setSessionToken(null);
    };
  }, []);

  const setAuthCookie = (token: string): void => {
    document.cookie = `sessionToken=${token}; expires=${new Date(
      new Date().getTime() + 3600 * 1000
    ).toUTCString()}; path=/`;
    setSessionToken(token);
  };

  const clearAuthCookie = (): void => {
    document.cookie =
      "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setSessionToken(null);
  };

  return { sessionToken, setAuthCookie, clearAuthCookie };
};

export default useAuthPersistence;
