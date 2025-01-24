import { writable } from "svelte/store";

interface User {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  return {
    subscribe,
    login: async (code: string) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/auth/github", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        localStorage.setItem("auth_token", data.token);

        update((state) => ({
          ...state,
          user: data.user,
          loading: false,
        }));
      } catch (error) {
        update((state) => ({
          ...state,
          error:
            error instanceof Error ? error.message : "Authentication failed",
          loading: false,
        }));
      }
    },
    logout: () => {
      localStorage.removeItem("auth_token");
      set({ user: null, loading: false, error: null });
    },
    checkAuth: async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        set({ user: null, loading: false, error: null });
        return;
      }

      update((state) => ({ ...state, loading: true }));
      try {
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        const user = await response.json();
        update((state) => ({ ...state, user, loading: false }));
      } catch (error) {
        localStorage.removeItem("auth_token");
        set({ user: null, loading: false, error: null });
      }
    },
  };
}

export const auth = createAuthStore();
