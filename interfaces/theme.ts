export interface ButtonColors {
  background?: string;
  text?: string;
  border?: string;
  ripple?: string;
}

export interface Theme {
  elevation: number;
  loadingIndicator: string;
  GradientColors: string[];
  background: string;
  text: string;
  subHeading: string;

  primaryBorder: string;
  cardsBorder: string;
  cardBg: string;
  stickyHeaderBg: string;

  label: string;
  card: string;
  error: string;
  secondary: string;
  description: string;
  itemBg: string;
  icon: string;
  checkedIcon: string;
  notCheckedIcon: string;
  searchBg: string;
  tabBar: {
    tabBarActiveTintColor: string;
    tabBarInactiveTintColor: string;
  };
  blockInput: {
    textColor: string;
    bg: string;
  };
  button: {
    default: ButtonColors;
    filled: ButtonColors;
    primaryLink: ButtonColors;
    secondaryLink: ButtonColors;
    noUnderline: ButtonColors;
    transparent?: ButtonColors; // optional in dark theme
  };

  appSwitch: {
    activeThumbColor: string;
    inactiveThumbColor: string;
    activeTrackColor: string;
    inactiveTrackColor: string;
  };
}
