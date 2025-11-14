import { create } from "zustand";
import { api } from "../api/axios";
import Cookies from "js-cookie";
import { AuthResponse } from "../types/auth";

interface AuthStore {
  user: AuthResponse["user"] | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    try {
    set({ loading: true });
    const res = await api.post<AuthResponse>("/auth/login", { email, password });
    Cookies.set("token", res.data.token);
    set({ user: res.data.user });
  } catch (err) {
    console.error(err);
    throw err; 
  } finally {
    set({ loading: false });
  }
  },

  register: async (name, email, password) => {
     try {
    set({ loading: true });
    const res = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });
    Cookies.set("token", res.data.token);
    set({ user: res.data.user });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    set({ loading: false });
  }
  },

  logout: () => {
    Cookies.remove("token");
    set({ user: null });
  },
}));
