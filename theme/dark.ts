import { Theme } from "@/interfaces";
import { colorPalette } from "@/styles";

export const darkTheme: { dark: Theme } = {
  dark: {
    elevation: 0,
    loadingIndicator: colorPalette.primaryBg.primaryWhite,
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

    appSwitch: {
      activeThumbColor: colorPalette.primaryBg.primaryLightGreen,
      inactiveThumbColor: colorPalette.primaryBg.secondaryLightGreen,
      activeTrackColor: colorPalette.primaryBg.borderColor2,
      inactiveTrackColor: colorPalette.primaryBg.primaryWhite,
    },
  },
};
