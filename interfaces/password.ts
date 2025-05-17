import { Theme } from "./theme";
import { ImageSourcePropType, ViewStyle } from "react-native";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

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
  id: string;
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

// password detail screen's related types

export interface InfoItemPropsI {
  label: string;
  value?: string;
  theme: Theme;
  style: ViewStyle;
}

export interface IconButtonPropsI {
  iconName: string;
  IconComponent: typeof Feather | typeof Fontisto | typeof MaterialCommunityIcons;
  onPress: () => void;
  sizeOverride?: number;
  theme: Theme;
  mode: string;
  buttonStyle: ViewStyle;
  containerStyle: ViewStyle;
}

export interface PasswordInfoPropsI {
  passwordDetail: any;
  theme: Theme;
  styles: any;
}

export interface PasswordActionsPropsI {
  passwordDetail: any;
  onCopy: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onShare: () => void;
  theme: Theme;
  mode: string;
  styles: any;
}
