import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EditProfileI, ForgetPasswordI, ResetPasswordParamI, SigninI, SignupI, UserI, VerifyOtpI } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "@/services/api";
import { showToast } from "@/utils";

type Store = {
  isLoading: boolean;
  user: UserI | null;
  error: string | null;
  firstTimeUser: boolean;
  biometricAuth: boolean;
};

type Action = {
  setUser: (user: UserI | null) => void;
  setFirstTimeUser: (value: boolean) => void;
  setBiometricAuth: (value: boolean) => void;
  signin: (body: SigninI) => Promise<void>;
  signup: (body: SignupI) => Promise<void>;
  editProfile: (body: EditProfileI) => Promise<void>;
  forgetPassword: (body: ForgetPasswordI) => Promise<void>;
  resetPassword: (body: ResetPasswordParamI) => Promise<void>;
  reset: () => void;
  verifyAuthCode: (body: VerifyOtpI) => Promise<void>; 
};

const useAuthStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        user: null,
        error: null,
        firstTimeUser: true,
        biometricAuth: false,

        setUser: (user: UserI | null) => set({ user }),
        setFirstTimeUser: (value: boolean) => set({ firstTimeUser: value }),
        setBiometricAuth: (value: boolean) => set({ biometricAuth: value }),

        // Actions
        signin: async (body: SigninI) => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.post("/auth/signin", body);
            const { user, token } = response.data.result;

            await AsyncStorage.setItem("UserToken", token);

            set({ user, isLoading: false });
            showToast({ type: "success", text1: "Signin Successfully!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        signup: async (body: SignupI) => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.post("/auth/signup", body);
            set({ isLoading: false });
            showToast({ type: "success", text1: "Successfully Signup Now Sign In!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        editProfile: async (body: EditProfileI) => {
          set({ isLoading: true });
          try {
            const response = await AxiosInstance.patch("/user/me", body);
            set({ user: response.data.result, isLoading: false });
            showToast({ type: "success", text1: "Profile updated successfully!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        forgetPassword: async (body: ForgetPasswordI) => {
          set({ isLoading: true });
          try {
            await AxiosInstance.post("/auth/forget-password", body);
            set({ isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        verifyAuthCode: async (body: VerifyOtpI) => {
          set({ isLoading: true });
          try {
            await AxiosInstance.post("/auth/verify-otp", body);
            set({ isLoading: false });
            showToast({ type: "success", text1: "OTP verified successfully!" });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Invalid or expired OTP";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

            throw new Error(errorMessage);
          }
        },

        resetPassword: async (body: ResetPasswordParamI) => {
          set({ isLoading: true });
          try {
            await AxiosInstance.post("/auth/reset-password", body);
            set({ isLoading: false });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            set({
              isLoading: false,
              error: errorMessage,
            });
            showToast({ type: "error", text1: errorMessage });

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
