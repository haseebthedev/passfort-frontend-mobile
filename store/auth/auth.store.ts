import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EditProfileI, ForgetPasswordI, ResetPasswordI, SigninI, SignupI, UserI } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "@/services/api";
import { AxiosError } from "axios";

type Store = {
  isLoading: boolean;
  user: UserI | null;
  error: string | null;
};

type Action = {
  setUser: (user: UserI | null) => void;
  signin: (body: SigninI) => Promise<void>;
  signup: (body: SignupI) => Promise<void>;
  editProfile: (body: EditProfileI) => Promise<void>;
  forgetPassword: (body: ForgetPasswordI) => Promise<void>;
  resetPassword: (body: ResetPasswordI) => Promise<void>;
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
        signin: async (body: SigninI) => {
          try {
            set({ isLoading: true });
            const response = await AxiosInstance.post("/auth/signin", body);

            const { user, token } = response.data.result;

            await AsyncStorage.setItem("UserToken", token);

            set({ user, isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },

        signup: async (body: SignupI) => {
          try {
            set({ isLoading: true });
            const response = await AxiosInstance.post("/auth/signup", body);
            set({ isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },

        editProfile: async (body: EditProfileI) => {
          try {
            set({ isLoading: true });
            const response = await AxiosInstance.patch("/user/me", body);
            set({ user: response.data.result, isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },

        forgetPassword: async (body: ForgetPasswordI) => {
          try {
            set({ isLoading: true });
            await AxiosInstance.post("/auth/forget-password", body);
            set({ isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
          }
        },

        resetPassword: async (body: ResetPasswordI) => {
          try {
            set({ isLoading: true });
            await AxiosInstance.post("/auth/reset-password", body);
            set({ isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw new Error(errorMessage);
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
