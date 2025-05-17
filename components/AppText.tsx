import { StyleProp, Text, type TextProps, TextStyle } from "react-native";
import { AppFont } from "@/utils";
import { Typography } from "@/styles";
import { useTheme } from "@/hooks"; // <-- Import useTheme
import { Theme } from "@/interfaces";

export type AppTextI = TextProps & {
  text: string;
  type?:
    | "default"
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
    | "detail";
  style?: StyleProp<TextStyle>;
};

const getTypeStyles = (theme: Theme) =>
  ({
    default: { ...Typography(theme).default, color: theme.text },
    title: { ...Typography(theme).title, color: theme.text },
    heading: { ...Typography(theme).heading, color: theme.text },
    subHeading: { ...Typography(theme).subHeading, color: theme.text },
    regularSubHeading: {
      ...Typography(theme).regularSubHeading,
      color: theme.text,
    },
    primaryHeading: { ...Typography(theme).primaryHeading, color: theme.text },
    buttonTitle: { ...Typography(theme).buttonTitle, color: theme.text },
    primaryTitle: { ...Typography(theme).primaryTitle, color: theme.text },
    label: { ...Typography(theme).label, color: theme.label },
    description: { ...Typography(theme).description, color: theme.text },
    astericPasswordText: {
      ...Typography(theme).astericPasswordText,
      color: theme.text,
    },
    passwordText: { ...Typography(theme).passwordText, color: theme.text },
    errorText: { ...Typography(theme).errorText, color: theme.error },
    detail: { ...Typography(theme).detail, color: theme.text },
    passwordLength: { ...Typography(theme).passwordLength, color: theme.text },
  } as Record<NonNullable<AppTextI["type"]>, TextStyle>);

export const AppText = ({
  text,
  style,
  type = "default",
  ...rest
}: AppTextI) => {
  const { theme } = useTheme();
  const typeStyles = getTypeStyles(theme);

  const textStyle = [{ fontFamily: AppFont.regular }, typeStyles[type], style];

  return (
    <Text style={textStyle} {...rest}>
      {text}
    </Text>
  );
};
