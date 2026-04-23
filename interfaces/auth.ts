import { TranslationLanguageCodeMap } from "react-native-country-picker-modal";

export type UserI = {
  id?: string;
  email: string;
  name: string;
  profilePicture?: string | null;
  location?: string | null;
  isFirstSignIn?: boolean;
  isEmailVerified?: boolean;
  dateOfBirth?: string | null;
  city?: string | null;
  country?: string | null;
  number?: string;
};

export interface SignupI {
  name: string;
  email: string;
  password: string;
}

export type SigninI = Pick<SignupI, "email" | "password">;

export type ForgetPasswordI = Pick<SignupI, "email">;

export type ResetPasswordI = {
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordParamI = {
  email?: string;
  authCode?: string;
  newPassword: string;
  isVerified?: boolean;
};

export interface EditProfileI {
  profilePicture?: string;
  name?: string;
  dateOfBirth?: string | Date;
  country?: string | TranslationLanguageCodeMap;
  biometricEnabled?: boolean;
}

export interface VerifyOtpI {
  email: string;
  authCode: string;
}

export type ChangeMasterPasswordI = {
  oldPassword: string;
  newPassword: string;
};
