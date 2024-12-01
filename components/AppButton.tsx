import React, { ComponentType } from "react";
import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { AppText } from "./AppText";
import { AppFont, hp } from "@/utils";
import { colorPalette, Fonts, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";

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
    ...rest
  } = props;

  const getContainerStyle = () => containerPresets[preset];

  const getViewStyle = () => [viewPresets[preset], style];

  const getTextStyle = () => [textPresets[preset], textStyle];

  return (
    <RippleWrapper
      onPress={onPress}
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
  default: [
    baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colorPalette.primaryBg.secondaryLightGreen,
      backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
    },
  ] as StyleProp<ViewStyle>,
  filled: [baseViewStyle, { backgroundColor: colorPalette.primaryBg.secondaryLightGreen }] as StyleProp<ViewStyle>,
  primaryLink: [{ marginHorizontal: Spacing.xs, marginVertical: Spacing.xs }] as StyleProp<ViewStyle>,
  secondaryLink: [{ marginHorizontal: Spacing.xs, marginVertical: Spacing.xs }] as StyleProp<ViewStyle>,
  noUnderline: [
    { marginHorizontal: Spacing.xs, marginVertical: Spacing.xs, alignSelf: "center" },
  ] as StyleProp<ViewStyle>,
};

const textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [baseTextStyle, { color: colorPalette.primaryBg.borderColor1, fontFamily: AppFont.bold }],
  filled: [baseTextStyle, { color: colorPalette.primaryBg.borderColor1, fontFamily: AppFont.bold }],
  primaryLink: [
    baseTextStyle,
    {
      fontFamily: AppFont.regular,
      textDecorationLine: "underline",
      color: colorPalette.primaryBg.secondaryLightGreen,
      fontSize: Fonts.size.sm,
    },
  ],
  secondaryLink: [
    baseTextStyle,
    {
      fontFamily: AppFont.regular,
      textDecorationLine: "underline",
      color: colorPalette.primaryBg.primaryWhite,
      fontSize: Fonts.size.sm,
    },
  ],
  noUnderline: { textDecorationLine: "none", color: colorPalette.primaryBg.primaryWhite },
};
