import { StyleProp, Text, type TextProps, TextStyle, TouchableOpacity } from "react-native";
import { Typography } from "@/styles/styles";

export type AppTextI = TextProps & {
  text: string;
  type?: "lgTitle" | "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "lightSubTitle";
  style?: StyleProp<TextStyle>;
};

export const AppText = ({ text, style, type = "default", ...rest }: AppTextI) => {
  return (
    <>
      {type === "link" ? (
        <TouchableOpacity>
          <Text style={[type === "link" ? Typography.link : undefined, style]} {...rest}>
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={[
            type === "default" ? Typography.default : undefined,
            type === "title" ? Typography.title : undefined,
            type === "lgTitle" ? Typography.lgTitle : undefined,
            type === "defaultSemiBold" ? Typography.defaultSemiBold : undefined,
            type === "subtitle" ? Typography.subtitle : undefined,
            type === "lightSubTitle" ? Typography.lightSubTitle : undefined,

            style,
          ]}
          {...rest}
        >
          {text}
        </Text>
      )}
    </>
  );
};
