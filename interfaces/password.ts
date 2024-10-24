import { ImageSourcePropType } from "react-native";

export type PasswordCardType = {
  id: string;
  icon?: ImageSourcePropType;
  title: string;
  subtitle: string;
};

export type PasswordItemType = {
  id: string;
  icon?: ImageSourcePropType;
  title: string;
  passwordText: string;
};
