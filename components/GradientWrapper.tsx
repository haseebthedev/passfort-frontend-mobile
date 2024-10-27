import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GradientColors, LayoutStyles } from "@/styles";

interface GradientWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = ({ children, style }: GradientWrapperI) => {
  return (
    <LinearGradient
      colors={GradientColors}
      style={[LayoutStyles.pageContainer, style]}
      locations={[0.53, 0.653, 0.8, 1]}
    >
      {children}
    </LinearGradient>
  );
};
