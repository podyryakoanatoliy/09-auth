"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.clearIsAuthenticate);
  useEffect(() => {
    const fetchUser = async () => {
      const IsAuthenticated = await checkSession();
      if (IsAuthenticated) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        logout();
      }
    };
    fetchUser();
  }, [setUser, logout]);
  return children;
}
