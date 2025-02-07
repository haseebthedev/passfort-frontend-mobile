export type UserI = {
  id: string;
  email: string;
  name: string;
  profilePicture: string | null;
  location: string | null;
  isFirstSignIn: boolean;
  isEmailVerified: boolean;
  dateOfBirth: string | null;
  city: string | null;
  country: string | null;
};

export type UserInfoI = {
  name: string;
  email: string;
  number: string;
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

export interface EditProfileI {
  profilePicture?: string;
  name?: string;
  DOB?: string;
  country?: string;
  phoneNumber?: string;
}
