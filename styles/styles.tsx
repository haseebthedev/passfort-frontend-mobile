import { FontsType } from "@/interfaces";
import { hp, wp } from "@/utils";
import { StyleSheet } from "react-native";

export const colorPalette = {
  primaryBg: {
    shade00: "#ffffff",
    shade01: "#7EF496",
    shade02: "#1A291D", // bg
    shade03: "#2C523583", //border
    shade04: "#FFFFFF4D",
    shade05: "#232428FF",
    primaryLight: "#7EF4960D",

    primaryDarkGreen: "#0A140C", // bd fill + btn Text
    primaryLightGreen: "#48FF6D", // round btn
    secondaryLightGreen: "#7EF496",
    white: "#ffffff",
    grey: "#D7D7D7",
    strokeColor: "#1A291D",

    // gradient
    borderColor1: "#1A291D",
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
    xs: hp(1.6),
    sm: hp(2.1),
    md: hp(2.5),
    lg: hp(3.5),
    xl: hp(4),
    xxl: hp(4.5),
  },
  weight: {
    xs: "200",
    sm: "300",
    md: "400",
    lg: "600",
    xl: "700",
    xxl: "bold",
  },
};

export const iconSize = wp(7);

export const FormsStyle = StyleSheet.create({
  formControl: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.md,
    borderRadius: wp(5),
    borderWidth: wp(0.1),
    color: colorPalette.primaryBg.shade00,
    borderColor: colorPalette.primaryBg.shade03,
    backgroundColor: colorPalette.primaryBg.shade02,
    opacity: 0.5,
    // fontFamily: AppFont.regular,
  },
  formLabel: {
    color: colorPalette.primaryBg.shade00,
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.sm,
    marginVertical: hp(1),
    // fontFamily: AppFont.medium,
  },
});

export const Typography = StyleSheet.create({
  default: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.shade00,
  },
  defaultSemiBold: {
    fontSize: Fonts.size.md,
    fontWeight: Fonts.weight.lg,
    color: colorPalette.primaryBg.shade00,
  },
  title: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.xxl,
    textAlign: "center",
    color: colorPalette.primaryBg.shade00,
  },
  lgTitle: {
    fontSize: Fonts.size.xxl,
    fontWeight: Fonts.weight.xxl,
    textAlign: "center",
    color: colorPalette.primaryBg.shade00,
  },
  subtitle: {
    fontSize: Fonts.size.md,
    fontWeight: Fonts.weight.xxl,
    color: colorPalette.primaryBg.shade04,
  },
  link: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.shade01,
    textDecorationLine: "underline",
    fontWeight: Fonts.weight.md,
  },
  lightSubTitle: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.shade04,
  },
});

// border-image-source: linear-gradient(268.8deg, #1A291D -23.49%, #2C5235 98.98%);

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
    color: colorPalette.primaryBg.shade00,
    resizeMode: "contain",
  },
  cardIcon: {
    width: wp(20),
    height: wp(20),
  },
  horizontalSpacing: {
    paddingHorizontal: Spacing.md,
  },
});
