import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreatePasswordI, PasswordItemType, updatePasswordI } from "@/interfaces";
import AxiosInstance from "@/services/api";

type PasswordPagination = {
  docs: PasswordItemType[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type Store = {
  isLoading: boolean;
  passwords: PasswordItemType[];
  error: string | null;
  pagination: Omit<PasswordPagination, "docs"> | null;
};

type Action = {
  getPasswords: (page: number) => void;
  setPasswords: (passwords: PasswordItemType[] | []) => void;
  createPassword: (passwordData: CreatePasswordI) => Promise<void>;
  updatePassword: (id: string, passwordData: updatePasswordI) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  getPasswordById: (id: string) => Promise<PasswordItemType>;
};

const usePasswordStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        passwords: [],
        error: null,
        pagination: null,

        getPasswords: async (page = 1) => {
          set({ isLoading: true });

          try {
            const response = await AxiosInstance.get(`/password/passwords?page=${page}`);

            if (response.data?.result?.docs) {
              set((state) => ({
                passwords: page === 1 ? response.data.result.docs : [...state.passwords, ...response.data.result.docs],

                pagination: {
                  totalDocs: response.data.result.totalDocs,
                  limit: response.data.result.limit,
                  page: response.data.result.page,
                  totalPages: response.data.result.totalPages,
                  hasNextPage: response.data.result.hasNextPage,
                  hasPrevPage: response.data.result.hasPrevPage,
                },

                isLoading: false,
              }));
            } else {
              console.warn("No passwords found in response");
              set({ error: "No passwords found", isLoading: false });
            }
          } catch (error) {
            console.error("Error fetching passwords:", error);
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
                pwd._id === id ? ({ ...pwd, ...passwordData } as PasswordItemType) : pwd
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
              passwords: state.passwords.filter((pwd) => pwd._id !== id),
            }));
          } catch (error) {
            set({ error: "Failed to delete password" });
          }
        },

        getPasswordById: async (id: string) => {
          try {
            set({ isLoading: true });

            const response = await AxiosInstance.get(`/password/${id}`);
            set({ isLoading: false });
            return response.data.result;
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
