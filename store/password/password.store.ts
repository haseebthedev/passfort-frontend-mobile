import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreatePasswordI, PasswordItemType, updatePasswordI } from "@/interfaces";
import AxiosInstance from "@/services/api";

type Store = {
  isLoading: boolean;
  passwords: PasswordItemType[] | [];
  error: string | null;
};

type Action = {
  getPasswords: () => void;
  setPasswords: (passwords: PasswordItemType[] | []) => void;
  createPassword: (passwordData: CreatePasswordI) => Promise<void>;
  updatePassword: (id: string, passwordData: updatePasswordI) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
};

const usePasswordStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        passwords: [],
        error: null,

        getPasswords: async () => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.get("/password/passwords");
            set({ passwords: response.data.result, isLoading: false });
          } catch (error) {
            set({ error: "Failed to fetch passwords", isLoading: false });
          }
        },

        createPassword: async (passwordData: CreatePasswordI) => {
          try {
            const response = await AxiosInstance.post("/password/create-password", passwordData);
            set((state) => ({ passwords: [...state.passwords, response.data.result] }));
          } catch (error) {
            set({ error: "Failed to create password" });
          }
        },

        updatePassword: async (id: string, passwordData: updatePasswordI) => {
          try {
            await AxiosInstance.patch(`/password/${id}`, passwordData);
            set((state) => ({
              passwords: state.passwords.map((pwd) =>
                pwd.id === id ? ({ ...pwd, ...passwordData } as PasswordItemType) : pwd
              ),
            }));
          } catch (error) {
            set({ error: "Failed to update password" });
          }
        },

        deletePassword: async (id: string) => {
          try {
            await AxiosInstance.delete(`/password/${id}`);
            set((state) => ({
              passwords: state.passwords.filter((pwd) => pwd.id !== id),
            }));
          } catch (error) {
            set({ error: "Failed to delete password" });
          }
        },

        setPasswords: (passwords: PasswordItemType[] | []) => set({ passwords }),
      }),

      {
        name: "passwordStore",
        storage: {
          getItem: (name) => AsyncStorage.getItem(name).then((value) => value && JSON.parse(value)),
          setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
          removeItem: (name) => AsyncStorage.removeItem(name),
        },
      }
    )
  )
);

export { usePasswordStore };
