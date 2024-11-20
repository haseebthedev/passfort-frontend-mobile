import { colorPalette, Spacing } from "@/styles";
import React from "react";
import { StyleProp, StyleSheet, TouchableNativeFeedback, View, ViewStyle } from "react-native";

interface RippleWrapperProps {
  onPress?: () => void;
  rippleColor?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
}

export const RippleWrapper = ({
  onPress,
  rippleColor = colorPalette.primaryBg.primaryLightGreenBg,
  style,
  containerStyle,
  children,
  disabled = false,
}: RippleWrapperProps) => {
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}
        disabled={disabled}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: Spacing.md,
    overflow: "hidden",
  },
});
