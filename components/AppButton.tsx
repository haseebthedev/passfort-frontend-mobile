import React, { ComponentType } from "react";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { hp, wp } from "@/utils";
import { AppText } from "./AppText";
import { colorPalette, Fonts, Spacing } from "@/styles";

type Presets = keyof typeof viewPresets;

interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
  pressableState: PressableStateCallbackType;
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
  onPress?: () => void;
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

  const getViewStyle = ({ pressed }: PressableStateCallbackType) => [
    viewPresets[preset],
    style,
    pressed && pressedViewPresets[preset],
  ];

  const getTextStyle = ({ pressed }: PressableStateCallbackType) => [
    textPresets[preset],
    textStyle,
    pressed && pressedTextPresets[preset],
  ];

  return (
    <Pressable style={getViewStyle} accessibilityRole="button" onPress={onPress} {...rest}>
      {(state) => (
        <>
          {LeftAccessory && <LeftAccessory style={leftAccessoryStyle} pressableState={state} />}
          <AppText text={text} style={getTextStyle(state)} type="buttonTitle" />
          {RightAccessory && <RightAccessory style={rightAccessoryStyle} pressableState={state} />}
        </>
      )}
    </Pressable>
  );
}

const baseViewStyle: ViewStyle = {
  width: wp(91),
  flexDirection: "row",
  alignSelf: "center",
  borderRadius: hp(2.5),
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: Spacing.md,
  marginVertical: Spacing.md,
  overflow: "hidden",
};

const baseTextStyle: TextStyle = {
  color: colorPalette.primaryBg.primaryDarkGreen,
  textAlign: "center",
};

const rightAccessoryStyle: ViewStyle = { marginStart: Spacing.xs, zIndex: 1 };
const leftAccessoryStyle: ViewStyle = { marginEnd: Spacing.xs, zIndex: 1 };

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
  link: [{ marginHorizontal: Spacing.xxs }] as StyleProp<ViewStyle>,
};

const textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [baseTextStyle, { color: colorPalette.primaryBg.borderColor1 }],
  filled: [baseTextStyle, { color: colorPalette.primaryBg.borderColor1 }],
  link: [
    baseTextStyle,
    {
      textDecorationLine: "underline",
      color: colorPalette.primaryBg.secondaryLightGreen,
      fontWeight: Fonts.weight.md,
      fontSize: 16,
    },
  ],
};

const pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  link: { opacity: 0.7 },
};

const pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.8 },
  filled: { opacity: 0.9 },
  link: { opacity: 0.7 },
};
