import { ImageSourcePropType } from "react-native";

export type ListPagination<T> = {
  docs: T[];
  totalDocs?: number;
  limit?: number;
  page: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  listRefreshing?: boolean;
};

export type PasswordCategoryType = {
  icon?: string;
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export interface PasswordI {
  type: {
    _id: string;
    icon?: string;
    title: string;
    updatedAt?: string;
  };
  platform?: string;
  siteAddress?: string;
  email?: string;
  username?: string;
  passwordText: string;
  updatedAt: string;
  createdAt: string;
}

export interface PasswordGroup {
  _id: string;
  passwords: PasswordI[];
  type: PasswordCategoryType;
}

export interface PasswordsResponse {
  result: PasswordGroup[];
}

export interface updatePasswordI {
  type?: string;
  platform?: string;
  siteAddress?: string;
  username?: string;
  passwordText?: string;
}

export type PasswordItemType = {
  _id: string;
  type: PasswordCategoryType;
  username?: string;
  email?: string;
  siteAddress?: string;
  platform?: string;
  passwordText?: string;
  icon?: ImageSourcePropType;
  date?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type PasswordStatType = {
  id: string;
  label: "Characters" | "Numbers" | "Symbols";
  number: string;
};

export type PasswordType = "WEAK" | "MODERATE" | "STRONG";
