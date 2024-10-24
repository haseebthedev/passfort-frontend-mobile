export type UserI = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
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
