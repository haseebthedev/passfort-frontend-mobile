export enum AppFont {
  regular = "regular",
  medium = "medium",
  bold = "bold",
  semi_bold = "semi_bold",
}

export const loadFonts = () => {
  return {
    [AppFont.regular]: require("../assets/fonts/Mulish-Regular.ttf"),
    [AppFont.medium]: require("../assets/fonts/Mulish-Medium.ttf"),
    [AppFont.bold]: require("../assets/fonts/Mulish-Bold.ttf"),
    [AppFont.semi_bold]: require("../assets/fonts/Mulish-SemiBold.ttf"),
  };
};
