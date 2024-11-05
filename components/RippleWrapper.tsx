import { colorPalette } from "@/styles";
import React from "react";
import { TouchableNativeFeedback, View, ViewStyle } from "react-native";

interface RippleWrapperProps {
  onPress: () => void;
  rippleColor?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

export const RippleWrapper = ({
  onPress,
  rippleColor = colorPalette.primaryBg.primaryLightGreenBg,
  style,
  children,
}: RippleWrapperProps) => {
  return (
    <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(rippleColor, false)}>
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  );
};
