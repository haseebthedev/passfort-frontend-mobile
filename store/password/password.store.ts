import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "@/services/api";
import { PasswordI, ListPagination, PasswordItemType, updatePasswordI, PasswordsResponse } from "@/interfaces";
import { showToast } from "@/utils";

type Store = {
  isLoading: boolean;
  error: string | null;
};

type Action = {
  getPasswords: ({ page, limit }: { page: number; limit: number }) => Promise<ListPagination<PasswordItemType>>;
  createPassword: (passwordData: Partial<PasswordI>) => Promise<void>;
  updatePassword: (id: string, passwordData: updatePasswordI) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  getPasswordById: (id: string) => Promise<PasswordItemType>;
  getGroupedPasswords: () => Promise<PasswordsResponse>;
  searchPasswords: ({ page, limit, searchTerm }: { page: number; limit: number; searchTerm: string }) => Promise<ListPagination<PasswordItemType>>;
};

const usePasswordStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        error: null,
        pagination: null,

        getPasswords: async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
          set({ isLoading: true });

          try {
            const response = await AxiosInstance.get(`/password/passwords?page=${page}&limit=${limit}`);
            set({ isLoading: false });
            return response.data?.result;
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to fetch passwords";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },

        createPassword: async (passwordData: Partial<PasswordI>) => {
          set({ isLoading: true });
          const formattedPasswordData = {
            ...passwordData,
            type: passwordData.type?.id.toString(),
            username: passwordData.email,
          };
          delete formattedPasswordData.email;

          try {
            const response = await AxiosInstance.post("/password/create-password", formattedPasswordData);
            set({ isLoading: false });
            showToast({ type: "success", text1: "Successfully Created Password!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to create password";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        updatePassword: async (id: string, passwordData: updatePasswordI) => {
          set({ isLoading: true });
          try {
            const res = await AxiosInstance.patch(`/password/${id}`, passwordData);

            set({ isLoading: false });
            showToast({ type: "success", text1: "Successfully Updated Password!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to update password";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });
            throw new Error(errorMessage);
          }
        },

        deletePassword: async (id: string) => {
          set({ isLoading: true });
          try {
            await AxiosInstance.delete(`/password/${id}`);
            set({ isLoading: false });
            showToast({ type: "success", text1: "Successfully Deleted Password!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to delete password";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        getPasswordById: async (id: string) => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.get(`/password/${id}`);
            set({ isLoading: false });
            return response.data.result;
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to get password";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        getGroupedPasswords: async () => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.get(`/password/grouped-by-category`);
            set({ isLoading: false });

            return response.data;
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to get password";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        searchPasswords: async ({ page = 1, limit = 10, searchTerm }: { page: number; limit: number; searchTerm: string }) => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.get(`/password/search?q=${searchTerm}&page=${page}&limit=${limit}`);
            set({ isLoading: false });
            return response.data?.result;
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to search passwords";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });
            throw new Error(errorMessage);
          }
        },
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
