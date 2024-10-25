import { FontsType } from "@/interfaces";
import { hp, wp } from "@/utils";
import { StyleSheet } from "react-native";

export const colorPalette = {
  primaryBg: {
    primaryDarkGreen: "#0A140C",
    secondaryDarkGreen: "rgba(16, 31, 18, .5)",
    primaryLightGreen: "#48FF6D",
    secondaryLightGreen: "#7EF496",
    primaryWhite: "#ffffff",
    primaryGrey: "rgba(255, 255, 255, 0.3)",
    secondayGrey: "#949494",

    // gradient
    borderColor1: "#1A291D",
    LightGreenBg: "rgba(126, 244, 150, 0.05)",
    borderColor2: "#2C5235",
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
  lg: hp(3),
  xl: hp(5),
  xxl: hp(6),
};

export const Fonts: FontsType = {
  size: {
    xs: hp(1.65),
    sm: hp(1.93),
    md: hp(2.2),
    lg: hp(2.48),
    xl: hp(2.75),
    xxl: hp(3.03),
    heading: hp(4.45),
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
  },
  title: {
    fontSize: Fonts.size.display,
    fontWeight: Fonts.weight.xl,
    letterSpacing: -0.02,
    color: colorPalette.primaryBg.primaryWhite,
  },
  primaryTitle: {
    fontSize: Fonts.size.heading,
    fontWeight: Fonts.weight.xl,
    color: colorPalette.primaryBg.primaryWhite,
  },
  label: {
    fontSize: Fonts.size.md,
    fontWeight: Fonts.weight.md,
    letterSpacing: 0.1,
    color: colorPalette.primaryBg.primaryWhite,
  },
  heading: {
    fontSize: Fonts.size.xl,
    fontWeight: Fonts.weight.md,
    letterSpacing: 0.1,
    color: colorPalette.primaryBg.primaryWhite,
  },
  primaryHeading: {
    fontSize: Fonts.size.md,
    fontWeight: Fonts.weight.md,
    color: colorPalette.primaryBg.primaryWhite,
  },
  regularSubHeading: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.md,
    color: colorPalette.primaryBg.primaryWhite,
  },
  subHeading: {
    fontSize: Fonts.size.sm,
    fontWeight: "500",
    color: colorPalette.primaryBg.primaryWhite,
  },
  description: {
    fontSize: Fonts.size.xs,
    fontWeight: Fonts.weight.md,
    color: colorPalette.primaryBg.primaryWhite,
  },
  detail: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.md,
    color: colorPalette.primaryBg.primaryWhite,
  },
  buttonTitle: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.xl,
    color: colorPalette.primaryBg.primaryDarkGreen,
  },
  passwordText: {
    fontSize: Fonts.size.xxl,
    fontWeight: Fonts.weight.lg,
    color: colorPalette.primaryBg.primaryWhite,
  },
});

export const iconSize = wp(6);

export const FormsStyle = StyleSheet.create({
  formControl: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.md,
    borderRadius: wp(5),
    borderWidth: wp(0.1),
    color: colorPalette.primaryBg.primaryWhite,
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.secondaryDarkGreen,
  },
  formLabel: {
    marginVertical: hp(1),
  },
});

export const GradientColors = [colorPalette.primaryBg.primaryDarkGreen, colorPalette.primaryBg.borderColor2];

export const LayoutStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: wp(10),
  },
  headerNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerIcon: {
    color: colorPalette.primaryBg.primaryWhite,
    resizeMode: "contain",
  },
  cardIcon: {
    width: wp(14.5),
    height: wp(14.5),
  },
  horizontalSpacing: {
    paddingHorizontal: Spacing.md,
  },
});
