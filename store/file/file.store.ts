import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "@/services/api";

type Store = {
  isLoading: boolean;
  error: string | null;
};

type Action = {
    createFile: (formData: any) => Promise<any>;
  };

const useFileStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        error: null,
        pagination: null,

        createFile: async (formData: any) => {
          set({ isLoading: true });

          try {
            const uploadResponse = await AxiosInstance.post("/file/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            // const response = await AxiosInstance.get(`/password/passwords?page=${page}&limit=${limit}`);
            set({ isLoading: false });
            return uploadResponse;
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to fetch passwords";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },

      }),

      {
        name: "fileStore",
        storage: {
          getItem: (name) => AsyncStorage.getItem(name).then((value) => value && JSON.parse(value)),
          setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
          removeItem: (name) => AsyncStorage.removeItem(name),
        },
      }
    )
  )
);

export { useFileStore };
