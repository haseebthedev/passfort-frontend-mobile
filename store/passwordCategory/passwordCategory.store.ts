import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "@/services/api";
import { PasswordCategoryType } from "@/interfaces";

type Store = {
  isLoading: boolean;
  error: string | null;
};

type Action = {
  getPasswordCategories: () => Promise<PasswordCategoryType[]>;
};

const usePasswordCategoryStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        error: null,
        pagination: null,

        getPasswordCategories: async () => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.get("/passwordCategory");
            set({ isLoading: false });

            return response?.data?.result;
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to get passwords categories";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },
      }),

      {
        name: "passwordCategoryStore",
        storage: {
          getItem: (name) => AsyncStorage.getItem(name).then((value) => value && JSON.parse(value)),
          setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
          removeItem: (name) => AsyncStorage.removeItem(name),
        },
      }
    )
  )
);

export { usePasswordCategoryStore };
