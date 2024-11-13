import { ImageSourcePropType } from "react-native";

export type PasswordCardType = {
  id: string;
  icon?: ImageSourcePropType;
  title: string;
  subtitle: string;
};

export type PasswordItemType = {
  id: string;
  type: "Social" | "App" | "Wallet" | "Shopping" | "Streaming" | "Banking";
  username?: string;
  email?: string;
  address?: string;
  platform?: string;
  passwordText: string;
  icon?: ImageSourcePropType;
  date: string | Date;
};

export type PasswordStatType = {
  id: string;
  label: string;
  number: string;
};

export type PasswordType = "WEAK" | "MODERATE" | "STRONG";
