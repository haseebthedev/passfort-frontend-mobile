import React, { useMemo } from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { AppFont } from "@/utils";
import { FormsStyle, Typography } from "@/styles";
import { useTheme } from "@/hooks";
import { Theme } from "@/interfaces";

export type AppTextType =
  | "default"
  | "small"
  | "title"
  | "heading"
  | "subHeading"
  | "regularSubHeading"
  | "primaryHeading"
  | "buttonTitle"
  | "primaryTitle"
  | "label"
  | "description"
  | "astericPasswordText"
  | "passwordText"
  | "passwordLength"
  | "errorText"
  | "detail"
  | "formLabel"
  | "placeholderText";

export interface AppTextProps extends TextProps {
  text: string;
  type?: AppTextType;
  style?: StyleProp<TextStyle>;
}

const createTypeStyles = (theme: Theme): Record<AppTextType, TextStyle> => {
  const typography = Typography(theme);
  const forms = FormsStyle(theme);

  return {
    default: { ...typography.default, color: theme.text },
    small: { ...typography.small, color: theme.text },
    title: { ...typography.title, color: theme.text },
    heading: { ...typography.heading, color: theme.text },
    subHeading: { ...typography.subHeading, color: theme.text },
    regularSubHeading: { ...typography.regularSubHeading, color: theme.text },
    primaryHeading: { ...typography.primaryHeading, color: theme.text },
    buttonTitle: { ...typography.buttonTitle, color: theme.text },
    primaryTitle: { ...typography.primaryTitle, color: theme.text },
    label: { ...typography.label, color: theme.label },
    description: { ...typography.description, color: theme.text },
    astericPasswordText: {
      ...typography.astericPasswordText,
      color: theme.text,
    },
    passwordText: { ...typography.passwordText, color: theme.text },
    errorText: { ...typography.errorText, color: theme.error },
    detail: { ...typography.detail, color: theme.text },
    passwordLength: { ...typography.passwordLength, color: theme.text },
    formLabel: {
      ...forms.formLabel,
      ...typography.formLabel,
    },
    placeholderText: {
      ...typography.placeholderText,
      color: theme.placeholderText,
    },
  };
};

export const AppText = ({ text, style, type = "default", ...rest }: AppTextProps) => {
  const { theme } = useTheme();

  const typeStyles = useMemo(() => createTypeStyles(theme), [theme]);

  const combinedStyle: StyleProp<TextStyle> = [{ fontFamily: AppFont.regular }, typeStyles[type], style];

  return (
    <Text style={combinedStyle} {...rest}>
      {text}
    </Text>
  );
};
