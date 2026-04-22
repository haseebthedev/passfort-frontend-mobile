import { StyleSheet } from "react-native";
import { FontsType, Theme } from "@/interfaces";
import { AppFont, hp, wp } from "@/utils";
import { colorPalette } from "@/theme";

export { colorPalette } from "@/theme";
export { theme } from "@/theme";

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
    xxs: hp(1.5),
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
    xxs: "200",
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

export const Typography = (theme: Theme) =>
  StyleSheet.create({
    small: {
      fontSize: Fonts.size.xs,
      color: theme.text,
      fontFamily: AppFont.regular,
    },
    default: {
      fontSize: Fonts.size.sm,
      color: theme.text,
      fontFamily: AppFont.regular,
    },
    title: {
      fontSize: Fonts.size.display,
      color: theme.text,
      fontFamily: AppFont.bold,
    },
    primaryTitle: {
      fontSize: Fonts.size.heading,
      color: theme.text,
      fontFamily: AppFont.bold,
    },
    label: {
      fontSize: Fonts.size.md,
      fontWeight: Fonts.weight.lg,
      letterSpacing: 0.1,
      color: theme.text,
    },
    formLabel: {
      fontSize: Fonts.size.sm,
      fontWeight: Fonts.weight.lg,
      letterSpacing: 0.1,
      color: theme.text,
    },
    heading: {
      fontSize: Fonts.size.xl,
      letterSpacing: 0.1,
      color: theme.text,
      fontFamily: AppFont.semiBold,
    },
    primaryHeading: {
      fontSize: Fonts.size.md,
      fontFamily: AppFont.regular,
      color: theme.text,
    },
    regularSubHeading: {
      fontSize: Fonts.size.sm,
      fontFamily: AppFont.regular,
      color: theme.text,
    },
    subHeading: {
      fontSize: Fonts.size.sm,
      color: theme.text,
      fontFamily: AppFont.semiBold,
    },
    description: {
      fontSize: Fonts.size.xxs,
      fontFamily: AppFont.regular,
      color: theme.text,
    },
    detail: {
      fontSize: Fonts.size.lg,
      fontFamily: AppFont.regular,
      color: theme.text,
    },
    buttonTitle: {
      fontSize: Fonts.size.lg,
      color: colorPalette.primaryBg.primaryDarkGreen,
      fontFamily: AppFont.bold,
    },
    astericPasswordText: {
      fontSize: Fonts.size.xxl,
      color: theme.text,
      fontFamily: AppFont.semiBold,
    },
    passwordText: {
      fontSize: hp(3.3),
      fontFamily: AppFont.regular,
      color: theme.text,
    },
    passwordLength: {
      fontSize: hp(8.6),
      fontFamily: AppFont.bold,
      color: theme.text,
    },
    errorText: {
      fontSize: Fonts.size.sm,
      fontFamily: AppFont.regular,
      color: theme.error,
    },
    placeholderText: {
      fontSize: Fonts.size.sm,
      fontFamily: AppFont.regular,
      color: theme.placeholderText,
    },
  });

export const iconSize = wp(6);

export const FormsStyle = (theme: Theme) =>
  StyleSheet.create({
    formControl: {
      flex: 1,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      gap: Spacing.md,
      borderRadius: wp(4),
      borderWidth: wp(0.1),
      color: theme.text,
      borderColor: theme.cardsBorder,
      backgroundColor: theme.itemBg,
      fontFamily: AppFont.regular,
      elevation: theme.elevation,
      fontSize: Fonts.size.xs + hp(0.2),
    },
    formLabel: {
      marginVertical: Spacing.xxs + hp(0.2),
    },
  });

export const LayoutStyles = (theme: Theme) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      paddingTop: wp(2),
    },
    headerNavContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: Spacing.sm,
    },
    headerIcon: {
      color: theme.icon,
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
