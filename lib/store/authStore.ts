import { create } from "zustand";
import { User } from "@/types/user";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticate: () => void;
}
export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticate: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
