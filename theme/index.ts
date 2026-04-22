import { Theme } from "@/interfaces";

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

    lightBg: "#F3F3F3",

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

    moderateBorder: "#FFCC00",
    moderateText: "#FF8C00",

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
    elevation: 1,
    loadingIndicator: colorPalette.primaryBg.borderColor2,
    GradientColors: [
      colorPalette.primaryBg.lightBg,
      colorPalette.primaryBg.lightBg,
      colorPalette.primaryBg.lightBg,
      colorPalette.primaryBg.lightBg,
    ],
    placeholderText: colorPalette.primaryBg.secondayGrey,
    background: colorPalette.primaryBg.primaryWhite,
    text: colorPalette.primaryBg.primaryText,
    subHeading: colorPalette.primaryBg.secondayGrey,
    primaryBorder: colorPalette.primaryBg.secondayGrey02,
    cardsBorder: colorPalette.primaryBg.secondayGrey02,
    cardBg: colorPalette.primaryBg.lighterGreen02,
    stickyHeaderBg: colorPalette.primaryBg.lightBg,
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
    appSwitch: {
      activeThumbColor: colorPalette.primaryBg.primaryLightGreen,
      inactiveThumbColor: colorPalette.primaryBg.secondaryLightGreen,
      activeTrackColor: colorPalette.primaryBg.borderColor2,
      inactiveTrackColor: colorPalette.primaryBg.secondayGrey02,
    },
  },
  dark: {
    elevation: 0,
    loadingIndicator: colorPalette.primaryBg.primaryWhite,
    GradientColors: [colorPalette.primaryBg.primaryDarkGreen, colorPalette.primaryBg.primaryDarkGreen, "#132617FF", "#1D3D24FF"],
    placeholderText: colorPalette.primaryBg.secondayGrey,
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
    appSwitch: {
      activeThumbColor: colorPalette.primaryBg.primaryLightGreen,
      inactiveThumbColor: colorPalette.primaryBg.secondaryLightGreen,
      activeTrackColor: colorPalette.primaryBg.borderColor2,
      inactiveTrackColor: colorPalette.primaryBg.primaryWhite,
    },
  },
};
