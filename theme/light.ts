import { Theme } from "@/interfaces";
import { colorPalette } from "@/styles";

export const lightTheme: { light: Theme } = {
  light: {
    elevation: 1,
    loadingIndicator: colorPalette.primaryBg.borderColor2,
    GradientColors: [
      colorPalette.primaryBg.primaryWhite,
      colorPalette.primaryBg.primaryWhite,
      colorPalette.primaryBg.primaryWhite,
      colorPalette.primaryBg.primaryWhite,
    ],
    background: colorPalette.primaryBg.primaryWhite,
    text: colorPalette.primaryBg.primaryText,
    subHeading: colorPalette.primaryBg.secondayGrey,
    primaryBorder: colorPalette.primaryBg.secondayGrey02,
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
    appSwitch: {
      activeThumbColor: colorPalette.primaryBg.primaryLightGreen,
      inactiveThumbColor: colorPalette.primaryBg.secondaryLightGreen,
      activeTrackColor: colorPalette.primaryBg.borderColor2,
      inactiveTrackColor: colorPalette.primaryBg.secondayGrey02,
    },
  },
};
