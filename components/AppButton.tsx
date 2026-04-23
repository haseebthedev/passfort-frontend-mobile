import React, { ComponentType, useMemo } from "react";
import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { AppText } from "./AppText";
import { AppFont, hp } from "@/utils";
import { colorPalette } from "@/theme";
import { Fonts, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";
import { useTheme } from "@/hooks";
import { Theme } from "@/interfaces";

/* ================= Types ================= */

type Presets = "default" | "filled" | "primaryLink" | "secondaryLink" | "noUnderline";
interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
}

interface ButtonProps extends PressableProps {
  text: string;
  preset?: Presets;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  onPress: () => void;
  disabled?: boolean;
}

/* ================= Component ================= */

export function AppButton({
  text,
  style,
  textStyle,
  RightAccessory,
  LeftAccessory,
  onPress,
  preset = "default",
  disabled,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();

  const containerStyle = containerPresets[preset];

  const viewStyle = useMemo(() => {
    return [viewPresets[preset](theme), style, disabled && disabledStyle];
  }, [preset, theme, style, disabled]);

  const computedTextStyle = useMemo(() => {
    return [textPresets[preset](theme), textStyle];
  }, [preset, theme, textStyle]);

  const rippleColor = getRippleColor(preset);

  return (
    <RippleWrapper
      onPress={disabled ? undefined : onPress}
      style={viewStyle}
      rippleColor={rippleColor}
      containerStyle={containerStyle}
      {...rest}
    >
      <>
        {LeftAccessory && <LeftAccessory style={leftAccessoryStyle} />}
        <AppText text={text} style={computedTextStyle} type="buttonTitle" />
        {RightAccessory && <RightAccessory style={rightAccessoryStyle} />}
      </>
    </RippleWrapper>
  );
}

/* ================= Helpers ================= */

const getRippleColor = (preset: Presets) => {
  const isFilled = preset === "default" || preset === "filled";

  return isFilled ? colorPalette.primaryBg.primaryLightGreen : colorPalette.primaryBg.transparent;
};

/* ================= Base Styles ================= */

const baseViewStyle: ViewStyle = {
  flexDirection: "row",
  borderRadius: hp(2.5),
  justifyContent: "center",
  alignItems: "center",
  padding: Spacing.sm + hp(0.2),
  overflow: "hidden",
};

const baseTextStyle: TextStyle = {
  textAlign: "center",
  fontFamily: AppFont.bold,
};

const disabledStyle: ViewStyle = {
  opacity: 0.5,
};

const rightAccessoryStyle: ViewStyle = {
  marginStart: Spacing.xs,
  zIndex: 1,
};

const leftAccessoryStyle: ViewStyle = {
  marginEnd: Spacing.xs,
  zIndex: 1,
};

/* ================= Container Presets ================= */

const containerPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { marginVertical: Spacing.md },
  filled: { marginVertical: Spacing.md },
  primaryLink: { marginVertical: Spacing.xxs },
  secondaryLink: { marginVertical: Spacing.md },
  noUnderline: { marginVertical: Spacing.md },
};

/* ================= View Presets ================= */

const viewPresets: Record<Presets, (theme: Theme) => StyleProp<ViewStyle>> = {
  default: (theme) => ({
    ...baseViewStyle,
    borderWidth: 1,
    borderColor: theme.button.default.border,
    backgroundColor: theme.button.default.background,
  }),

  filled: (theme) => ({
    ...baseViewStyle,
    backgroundColor: theme.button.filled.background,
  }),

  primaryLink: () => ({
    marginHorizontal: Spacing.xs,
  }),

  secondaryLink: () => ({
    marginHorizontal: Spacing.xs,
    marginVertical: Spacing.xs,
  }),

  noUnderline: () => ({
    marginHorizontal: Spacing.xs,
    marginVertical: Spacing.xs,
    alignSelf: "center",
  }),
};

/* ================= Text Presets ================= */

const textPresets: Record<Presets, (theme: Theme) => StyleProp<TextStyle>> = {
  default: (theme) => ({
    ...baseTextStyle,
    color: theme.button.default.text,
  }),

  filled: (theme) => ({
    ...baseTextStyle,
    color: theme.button.filled.text,
  }),

  primaryLink: (theme) => ({
    ...baseTextStyle,
    fontFamily: AppFont.regular,
    textDecorationLine: "underline",
    color: theme.button.primaryLink.text,
    fontSize: Fonts.size.sm,
  }),

  secondaryLink: (theme) => ({
    ...baseTextStyle,
    fontFamily: AppFont.regular,
    textDecorationLine: "underline",
    color: theme.button.secondaryLink.text,
    fontSize: Fonts.size.sm,
  }),

  noUnderline: (theme) => ({
    ...baseTextStyle,
    textDecorationLine: "none",
    color: theme.button.noUnderline.text,
  }),
};
