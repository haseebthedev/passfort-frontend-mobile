import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GradientColors, LayoutStyles } from "@/styles";
import { StyleProp, ViewStyle } from "react-native";

interface GradientWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = ({ children, style }: GradientWrapperI) => {
  return (
    <LinearGradient colors={GradientColors} style={[LayoutStyles.pageContainer, style]} locations={[0.53, 2.98]}>
      {children}
    </LinearGradient>
  );
};
