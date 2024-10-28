export type UserI = {
  id: string;
  email: string;
  name: string;
  picture: string | null;
  location: string | null;
  isFirstSignIn: boolean;
  isLogin?: boolean;
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

export interface EditProfileI {
  name: string;
  email: string;
  phoneNumber?: string;
}
