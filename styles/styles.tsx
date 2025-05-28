import { StyleSheet } from "react-native";
import { FontsType, Theme } from "@/interfaces";
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
    secondayGrey02: "#E1E0E0FF",

    borderColor1: "#1A291D",
    borderColor2: "#2C5235",
    swipeButtonBg: "#274C2F",
    lightGreen: "#B8EAC5FF",
    lighterGreen: "#D2F0D9",
    lighterGreen02: "#FFFFFFFF",

    primaryLightGreenBg: "rgba(126, 244, 150, 0.05)",
    primaryLighterGreenBg: "rgba(126, 244, 150, .3)",
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

export const theme: { light: Theme; dark: Theme } = {
  light: {
    GradientColors: [
      // colorPalette.primaryBg.lighterGreen,
      // colorPalette.primaryBg.lighterGreen,
      colorPalette.primaryBg.primaryWhite,
      colorPalette.primaryBg.primaryWhite,
      colorPalette.primaryBg.primaryWhite,
      colorPalette.primaryBg.primaryWhite,
    ],
    background: colorPalette.primaryBg.primaryWhite,
    text: colorPalette.primaryBg.primaryText,
    subHeading: colorPalette.primaryBg.secondayGrey,
    primaryBorder: colorPalette.primaryBg.primaryLightGreen,
    cardsBorder: colorPalette.primaryBg.secondayGrey02,
    cardBg: colorPalette.primaryBg.lighterGreen02,
    stickyHeaderBg: colorPalette.primaryBg.primaryWhite,
    label: colorPalette.primaryBg.borderColor2,
    itemBg: colorPalette.primaryBg.lighterGreen02,
    card: colorPalette.primaryBg.primaryWhite,
    error: colorPalette.primaryBg.primaryRed,
    secondary: colorPalette.primaryBg.secondaryLightGreen,
    description: colorPalette.primaryBg.secondayGrey,
    icon: colorPalette.primaryBg.primaryText,
    checkedIcon: colorPalette.primaryBg.borderColor2,
    notCheckedIcon: colorPalette.primaryBg.secondayGrey,
    searchBg: colorPalette.primaryBg.lighterGreen02,
    tabBar: {
      tabBarActiveTintColor: colorPalette.gradientBg.lightGreen,
      tabBarInactiveTintColor: colorPalette.primaryBg.secondayGrey02,
    },
    blockInput: {
      textColor: colorPalette.primaryBg.borderColor2,
      bg: colorPalette.primaryBg.lightGreen,
    },
    button: {
      default: {
        background: colorPalette.primaryBg.secondaryLightGreen,
        text: colorPalette.primaryBg.primaryDarkGreen,
        border: colorPalette.primaryBg.secondaryLightGreen,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      filled: {
        background: colorPalette.primaryBg.secondaryLightGreen,
        text: colorPalette.primaryBg.primaryDarkGreen,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      primaryLink: {
        text: colorPalette.gradientBg.lightGreen,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      secondaryLink: {
        text: colorPalette.primaryBg.primaryWhite,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      noUnderline: {
        text: colorPalette.primaryBg.primaryWhite,
        ripple: colorPalette.primaryBg.transparent,
      },
    },
  },
  dark: {
    GradientColors: [colorPalette.primaryBg.primaryDarkGreen, colorPalette.primaryBg.primaryDarkGreen, "#132617FF", "#1D3D24FF"],
    background: colorPalette.primaryBg.primaryDarkGreen,
    text: colorPalette.primaryBg.primaryWhite,
    subHeading: colorPalette.primaryBg.primaryGrey,
    primaryBorder: colorPalette.primaryBg.borderColor2,
    cardsBorder: colorPalette.primaryBg.borderColor2,
    cardBg: colorPalette.primaryBg.primaryLightGreenBg,
    stickyHeaderBg: colorPalette.primaryBg.primaryDarkGreen,
    label: colorPalette.primaryBg.primaryGrey,
    itemBg: colorPalette.primaryBg.secondaryDarkGreen,
    card: colorPalette.primaryBg.secondaryDarkGreen,
    error: colorPalette.primaryBg.primaryRed,
    secondary: colorPalette.primaryBg.primaryLightGreen,
    description: colorPalette.primaryBg.primaryGrey,
    icon: colorPalette.primaryBg.primaryWhite,
    checkedIcon: colorPalette.primaryBg.secondaryLightGreen,
    notCheckedIcon: colorPalette.primaryBg.primaryGrey,
    searchBg: colorPalette.primaryBg.primaryBg,
    tabBar: {
      tabBarActiveTintColor: colorPalette.primaryBg.secondaryLightGreen,
      tabBarInactiveTintColor: colorPalette.primaryBg.primaryGrey,
    },
    blockInput: {
      textColor: colorPalette.primaryBg.primaryLightGreen,
      bg: colorPalette.primaryBg.borderColor2,
    },
    button: {
      default: {
        background: colorPalette.primaryBg.secondaryLightGreen,
        text: colorPalette.primaryBg.primaryDarkGreen,
        border: colorPalette.primaryBg.secondaryLightGreen,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      filled: {
        background: colorPalette.primaryBg.secondaryLightGreen,
        text: colorPalette.primaryBg.primaryDarkGreen,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      primaryLink: {
        text: colorPalette.primaryBg.secondaryLightGreen,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      secondaryLink: {
        text: colorPalette.primaryBg.primaryWhite,
        ripple: colorPalette.primaryBg.primaryLightGreen,
      },
      noUnderline: {
        text: colorPalette.primaryBg.primaryWhite,
        ripple: colorPalette.primaryBg.transparent,
      },
      transparent: {
        ripple: colorPalette.primaryBg.transparent,
      },
    },
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

export const Typography = (theme: Theme) =>
  StyleSheet.create({
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
      fontSize: Fonts.size.xs,
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
  });

export const iconSize = wp(6);

export const FormsStyle = (theme: Theme) =>
  StyleSheet.create({
    formControl: {
      flex: 1,
      padding: Spacing.sm,
      gap: Spacing.md,
      borderRadius: wp(4),
      borderWidth: wp(0.1),
      color: theme.text,
      borderColor: theme.cardsBorder,
      backgroundColor: theme.itemBg,
      fontFamily: AppFont.regular,
    },
    formLabel: {
      marginVertical: Spacing.xs,
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
