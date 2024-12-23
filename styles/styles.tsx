import { StyleSheet } from "react-native";
import { FontsType } from "@/interfaces";
import { AppFont, hp, wp } from "@/utils";

export const colorPalette = {
  primaryBg: {
    primaryDarkGreen: "#0A140C",
    secondaryDarkGreen: "rgba(16, 31, 18, .5)",
    primaryLightGreen: "#48FF6D",
    secondaryLightGreen: "#7EF496",
    primaryWhite: "#ffffff",
    primaryGrey: "rgba(255, 255, 255, 0.3)",
    secondayGrey: "#949494",

    borderColor1: "#1A291D",
    borderColor2: "#2C5235",
    swipeButtonBg: "#274C2F",
    lighterGreen: "#D2F0D9",

    primaryLightGreenBg: "rgba(126, 244, 150, 0.05)",
    secondaryLightGreenBg: "rgba(218, 255, 225, 0.05)",

    primaryText: "#101F12",

    primaryRed: "#FD2828FF",

    primaryBg: "#1A2A1D",
    transparent: "rgba(0,0,0,0)",

    moderateBorder: "#FFCC00", // Dark yellow border for moderate
    moderateText: "#FF8C00", // Orange text for moderate

    black: "#000000",
  },

  gradientBg: {
    darkGreen01: "#0A140C",
    darkGreen02: "#0A140CFF",
    lightGreen: "#396E44F0",
  },
};

export const Spacing = {
  xxs: hp(0.5),
  xs: hp(1),
  sm: hp(1.5),
  md: hp(2),
  smd: hp(2.5),
  lg: hp(3),
  xl: hp(5),
  xxl: hp(6),
};

export const Fonts: FontsType = {
  size: {
    xs: hp(1.65),
    sm: hp(1.93),
    md: hp(2.2),
    lg: hp(2.28),
    xl: hp(2.5),
    xxl: hp(3.03),
    heading: hp(4),
    display: hp(3.4),
  },
  weight: {
    xs: "200",
    sm: "300",
    md: "400",
    lg: "600",
    xl: "700",
    xxl: "bold",
    heading: "bold",
    display: "bold",
  },
};

export const Typography = StyleSheet.create({
  default: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.regular,
  },
  title: {
    fontSize: Fonts.size.display,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.bold,
  },
  primaryTitle: {
    fontSize: Fonts.size.heading,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.bold,
  },
  label: {
    fontSize: Fonts.size.md,
    fontWeight: Fonts.weight.lg,
    letterSpacing: 0.1,
    color: colorPalette.primaryBg.primaryWhite,
  },
  heading: {
    fontSize: Fonts.size.xl,
    letterSpacing: 0.1,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.semiBold,
  },
  primaryHeading: {
    fontSize: Fonts.size.md,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryWhite,
  },
  regularSubHeading: {
    fontSize: Fonts.size.sm,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryWhite,
  },
  subHeading: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.semiBold,
  },
  description: {
    fontSize: Fonts.size.xs,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryWhite,
  },
  detail: {
    fontSize: Fonts.size.lg,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryWhite,
  },
  buttonTitle: {
    fontSize: Fonts.size.lg,
    color: colorPalette.primaryBg.primaryDarkGreen,
    fontFamily: AppFont.bold,
  },
  astericPasswordText: {
    fontSize: Fonts.size.xxl,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.semiBold,
  },
  passwordText: {
    fontSize: hp(3.3),
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryWhite,
  },
  passwordLength: {
    fontSize: hp(8.6),
    fontFamily: AppFont.bold,
    color: colorPalette.primaryBg.primaryWhite,
  },
  errorText: {
    fontSize: Fonts.size.sm,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryRed,
  },
});

export const iconSize = wp(6);

export const FormsStyle = StyleSheet.create({
  formControl: {
    flex: 1,
    padding: Spacing.sm,
    gap: Spacing.md,
    borderRadius: wp(4),
    borderWidth: wp(0.1),
    color: colorPalette.primaryBg.primaryWhite,
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.secondaryDarkGreen,
    fontFamily: AppFont.regular,
  },
  formLabel: {
    marginVertical: Spacing.xs,
  },
});

export const GradientColors = [
  colorPalette.primaryBg.primaryDarkGreen,
  colorPalette.primaryBg.primaryDarkGreen,
  "#132617FF",
  "#1D3D24FF",
];

export const LayoutStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: wp(10),
  },
  headerNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.sm,
  },
  headerIcon: {
    color: colorPalette.primaryBg.primaryWhite,
    resizeMode: "contain",
  },
  cardIcon: {
    width: wp(6.5),
    height: wp(6.5),
  },
  horizontalSpacing: {
    paddingHorizontal: Spacing.md,
  },
  positionCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const getPasswordTypeContainerStyle = (type: string) => {
  switch (type) {
    case "STRONG":
      return { borderColor: colorPalette.primaryBg.borderColor2 };
    case "MODERATE":
      return { borderColor: colorPalette.primaryBg.moderateBorder };
    case "WEAK":
    default:
      return { borderColor: colorPalette.primaryBg.primaryRed };
  }
};

export const getPasswordTypeTextStyle = (type: string) => {
  switch (type) {
    case "STRONG":
      return { color: colorPalette.primaryBg.secondaryLightGreen };
    case "MODERATE":
      return { color: colorPalette.primaryBg.moderateBorder };
    case "WEAK":
    default:
      return { color: colorPalette.primaryBg.primaryRed };
  }
};
