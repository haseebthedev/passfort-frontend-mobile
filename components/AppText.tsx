import { StyleProp, Text, type TextProps, TextStyle } from "react-native";
import { useFonts } from "expo-font";
import { Typography } from "@/styles";
import { AppFont, loadFonts } from "@/utils";

export type AppTextI = TextProps & {
  text?: string;
  type?:
    | "default"
    | "title"
    | "heading"
    | "subHeading"
    | "regularSubHeading"
    | "secondaryHeading"
    | "primaryHeading"
    | "buttonTitle"
    | "primaryTitle"
    | "label"
    | "description"
    | "astericPasswordText"
    | "passwordText"
    | "detail";
  style?: StyleProp<TextStyle>;
};

export const AppText = ({ text, style, type = "default", ...rest }: AppTextI) => {
  return (
    <>
      <Text
        style={[
          { fontFamily: AppFont.regular },
          type === "default" ? Typography.default : undefined,
          type === "title" ? Typography.title : undefined,
          type === "heading" ? Typography.heading : undefined,
          type === "subHeading" ? Typography.subHeading : undefined,
          type === "regularSubHeading" ? Typography.regularSubHeading : undefined,
          type === "primaryHeading" ? Typography.primaryHeading : undefined,
          type === "label" ? Typography.label : undefined,
          type === "buttonTitle" ? Typography.buttonTitle : undefined,
          type === "primaryTitle" ? Typography.primaryTitle : undefined,
          type === "astericPasswordText" ? Typography.astericPasswordText : undefined,
          type === "passwordText" ? Typography.passwordText : undefined,
          type === "description" ? Typography.description : undefined,
          type === "detail" ? Typography.detail : undefined,
          style,
        ]}
        {...rest}
      >
        {text}
      </Text>
    </>
  );
};
