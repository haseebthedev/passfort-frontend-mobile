import { StyleProp, Text, type TextProps, TextStyle } from "react-native";
import { AppFont } from "@/utils";
import { Typography } from "@/styles";

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
    | "errorText"
    | "detail";
  style?: StyleProp<TextStyle>;
};

const typeStyles: Record<NonNullable<AppTextI["type"]>, TextStyle | undefined> = {
  default: Typography.default,
  title: Typography.title,
  heading: Typography.heading,
  subHeading: Typography.subHeading,
  regularSubHeading: Typography.regularSubHeading,
  primaryHeading: Typography.primaryHeading,
  buttonTitle: Typography.buttonTitle,
  primaryTitle: Typography.primaryTitle,
  label: Typography.label,
  description: Typography.description,
  astericPasswordText: Typography.astericPasswordText,
  passwordText: Typography.passwordText,
  errorText: Typography.errorText,
  detail: Typography.detail,
};

export const AppText = ({ text, style, type = "default", ...rest }: AppTextI) => {
  const textStyle = [{ fontFamily: AppFont.regular }, typeStyles[type], style];

  return (
    <Text style={textStyle} {...rest}>
      {text}
    </Text>
  );
};
