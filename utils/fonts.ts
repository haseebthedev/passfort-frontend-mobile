import * as Font from "expo-font";

export enum AppFont {
  regular = "regular",
  medium = "medium",
  bold = "bold",
  semiBold = "semiBold",
}

export const loadFonts = async () => {
  await Font.loadAsync({
    [AppFont.regular]: require("../assets/fonts/Mulish-Regular.ttf"),
    [AppFont.medium]: require("../assets/fonts/Mulish-Medium.ttf"),
    [AppFont.bold]: require("../assets/fonts/Mulish-Bold.ttf"),
    [AppFont.semiBold]: require("../assets/fonts/Mulish-SemiBold.ttf"),
  });
};
