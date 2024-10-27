export enum AppFont {
  regular = "regular",
  bold = "bold",
  semi_bold = "semi_bold",
}

export const loadFonts = () => {
  return {
    [AppFont.regular]: require("../assets/fonts/Mulish-Regular.ttf"),
    [AppFont.bold]: require("../assets/fonts/Mulish-Bold.ttf"),
    [AppFont.semi_bold]: require("../assets/fonts/Mulish-SemiBold.ttf"),
  };
};
