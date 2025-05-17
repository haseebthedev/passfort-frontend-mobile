import React, { ComponentType } from "react";
import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { AppText } from "./AppText";
import { AppFont, hp } from "@/utils";
import { colorPalette, Fonts, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";
import { useTheme } from "@/hooks";
import { Theme } from "@/interfaces";

type Presets = keyof typeof viewPresets;

interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
}

interface ButtonProps extends PressableProps {
  text: string;
  preset?: Presets;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  onPress: () => void;
  disabled?: boolean;
}

export function AppButton(props: ButtonProps) {
  const {
    text,
    style,
    pressedStyle,
    textStyle,
    pressedTextStyle,
    RightAccessory,
    LeftAccessory,
    onPress,
    preset = "default",
    disabled,
    ...rest
  } = props;

  const { theme } = useTheme();

  const getContainerStyle = () => containerPresets[preset];

  const getViewStyle = () => {
    const presetStyle = viewPresets[preset](theme);
    return [presetStyle, style, disabled && { opacity: 0.5 }];
  };

  const getTextStyle = () => [textPresets[preset](theme), textStyle];

  return (
    <RippleWrapper
      onPress={disabled ? undefined : onPress}
      style={getViewStyle()}
      rippleColor={
        preset === "default" || preset === "filled"
          ? colorPalette.primaryBg.primaryLightGreen
          : colorPalette.primaryBg.transparent
      }
      containerStyle={getContainerStyle()}
    >
      <>
        {LeftAccessory && <LeftAccessory style={leftAccessoryStyle} />}
        <AppText text={text} style={getTextStyle()} type="buttonTitle" />
        {RightAccessory && <RightAccessory style={rightAccessoryStyle} />}
      </>
    </RippleWrapper>
  );
}

const baseViewStyle: ViewStyle = {
  flexDirection: "row",
  alignSelf: "stretch",
  borderRadius: hp(2.5),
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: Spacing.md,
  overflow: "hidden",
};

const baseTextStyle: TextStyle = {
  color: colorPalette.primaryBg.primaryDarkGreen,
  textAlign: "center",
  fontFamily: AppFont.bold,
};

const rightAccessoryStyle: ViewStyle = { marginStart: Spacing.xs, zIndex: 1 };
const leftAccessoryStyle: ViewStyle = { marginEnd: Spacing.xs, zIndex: 1 };

const containerPresets = {
  default: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  filled: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  primaryLink: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  secondaryLink: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  noUnderline: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
};

const viewPresets = {
  default: (theme: Theme) =>
    [
      baseViewStyle,
      {
        borderWidth: 1,
        borderColor: theme.button.default.border,
        backgroundColor: theme.button.default.background,
      },
    ] as StyleProp<ViewStyle>,
  filled: (theme: Theme) =>
    [
      baseViewStyle,
      { backgroundColor: theme.button.filled.background },
    ] as StyleProp<ViewStyle>,
  primaryLink: (theme: Theme) =>
    [
      { marginHorizontal: Spacing.xs, marginVertical: Spacing.xs },
    ] as StyleProp<ViewStyle>,
  secondaryLink: (theme: Theme) =>
    [
      { marginHorizontal: Spacing.xs, marginVertical: Spacing.xs },
    ] as StyleProp<ViewStyle>,
  noUnderline: (theme: Theme) =>
    [
      {
        marginHorizontal: Spacing.xs,
        marginVertical: Spacing.xs,
        alignSelf: "center",
      },
    ] as StyleProp<ViewStyle>,
};

const textPresets: Record<Presets, (theme: Theme) => StyleProp<TextStyle>> = {
  default: (theme) => [
    baseTextStyle,
    { color: theme.button.default.text, fontFamily: AppFont.bold },
  ],
  filled: (theme) => [
    baseTextStyle,
    { color: theme.button.filled.text, fontFamily: AppFont.bold },
  ],
  primaryLink: (theme) => [
    baseTextStyle,
    {
      fontFamily: AppFont.regular,
      textDecorationLine: "underline",
      color: theme.button.primaryLink.text,
      fontSize: Fonts.size.sm,
    },
  ],
  secondaryLink: (theme) => [
    baseTextStyle,
    {
      fontFamily: AppFont.regular,
      textDecorationLine: "underline",
      color: theme.button.secondaryLink.text,
      fontSize: Fonts.size.sm,
    },
  ],
  noUnderline: (theme) => ({
    textDecorationLine: "none",
    color: theme.button.noUnderline.text,
  }),
};
