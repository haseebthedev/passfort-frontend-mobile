import { ImageSourcePropType } from "react-native";

export type PasswordCardType = {
  id: string;
  icon?: ImageSourcePropType;
  title: string;
  subtitle: string;
};

export type PasswordItemType = {
  id: string;
  type: "Social" | "App" | "Wallet";
  username?: string;
  email?: string;
  address?: string;
  platform?: string;
  passwordText: string;
  icon?: ImageSourcePropType;
};
