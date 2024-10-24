import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserI } from "@/interfaces";

type Store = {
  isLoading: boolean;
  user: UserI | null;
};

type Action = {
  setUser: (user: UserI | null) => void;
  login: (body: UserI) => Promise<void>;
  reset: () => void;
};

const useAuthStore = create<Store & Action>()(
  devtools(
    // persist(
    (set) => ({
      isLoading: false,
      user: null,

      setUser: (user: UserI | null) => set({ user }),

      // Actions
      login: async (body: UserI) => {
        try {
          set({ isLoading: true });
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ user: body, isLoading: false });
          set({ isLoading: false });
        } catch (error: any) {
          set({ isLoading: false });

          console.error("Error:", error);
        }
      },

      reset: () => set({ user: null }),
    }),

    { name: "authStore" }
    // )
  )
);

export { useAuthStore };
