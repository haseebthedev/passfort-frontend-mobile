import React, { ComponentType } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { AppText } from "./AppText";
import { AppFont, hp, wp } from "@/utils";
import { colorPalette, Fonts, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper"; // Import RippleWrapper

type Presets = keyof typeof viewPresets;

interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
}

interface ButtonProps {
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

export function SmallAppButton(props: ButtonProps) {
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
      rippleColor={colorPalette.primaryBg.primaryLightGreen}
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
  width: wp(41.5),
  height: hp(5.8),
  borderRadius: hp(2),
  flexDirection: "row",
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  // marginVertical: Spacing.md,
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
  default: { marginVertical: Spacing.md, borderRadius: Spacing.md },
  filled: { marginVertical: Spacing.md, borderRadius: Spacing.lg },
  link: { marginVertical: Spacing.md, borderRadius: Spacing.lg },
};

const viewPresets = {
  default: [
    baseViewStyle,
    {
      backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
    },
  ] as StyleProp<ViewStyle>,
  filled: [baseViewStyle, { backgroundColor: colorPalette.primaryBg.secondaryLightGreen }] as StyleProp<ViewStyle>,
  link: [{ marginHorizontal: Spacing.xxs }] as StyleProp<ViewStyle>,
};

const textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [baseTextStyle, { color: colorPalette.primaryBg.borderColor1, fontFamily: AppFont.bold }],
  filled: [baseTextStyle, { color: colorPalette.primaryBg.borderColor1, fontFamily: AppFont.bold }],
  link: [
    baseTextStyle,
    {
      fontFamily: AppFont.regular,
      textDecorationLine: "underline",
      color: colorPalette.primaryBg.secondaryLightGreen,
      fontWeight: Fonts.weight.md,
      fontSize: Fonts.size.sm,
    },
  ],
};
