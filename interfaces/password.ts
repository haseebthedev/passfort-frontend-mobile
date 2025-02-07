import { ImageSourcePropType } from "react-native";

export interface CreatePasswordI {
  type?: "Social" | "App" | "Wallet" | "Shopping" | "Streaming" | "Banking" | null;
  platform: string;
  siteAddress?: string;
  email?: string;
  password: string;
}

export interface updatePasswordI {
  type?: "Social" | "App" | "Wallet" | "Shopping" | "Streaming" | "Banking";
  platform?: string;
  siteAddress?: string;
  email?: string;
  password?: string;
}

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
  passwordText?: string;
  icon?: ImageSourcePropType;
  date: string | Date;
  createdAt?: string | Date;
};

export type PasswordStatType = {
  id: string;
  label: "Characters" | "Numbers" | "Symbols";
  number: string;
};

export type PasswordType = "WEAK" | "MODERATE" | "STRONG";
