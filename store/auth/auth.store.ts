import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserI } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  isLoading: boolean;
  user: UserI | null;
  error: string | null;
};

type Action = {
  setUser: (user: UserI | null) => void;
  login: (body: UserI) => Promise<void>;
  reset: () => void;
};

const useAuthStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        user: null,
        error: null,

        setUser: (user: UserI | null) => set({ user }),

        // Actions
        login: async (body: UserI) => {
          try {
            set({ isLoading: true });
            await new Promise((resolve) => setTimeout(resolve, 1000));

            set({ user: body, isLoading: false });
            set({ isLoading: false });
          } catch (error: any) {
            set({ isLoading: false, error: error.message });

            console.error("Error:", error);
          }
        },

        reset: () => set({ user: null, error: null }),
      }),

      {
        name: "authStore",
        storage: {
          getItem: (name) => AsyncStorage.getItem(name).then((value) => value && JSON.parse(value)),
          setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
          removeItem: (name) => AsyncStorage.removeItem(name),
        },
      }
    )
  )
);

export { useAuthStore };
