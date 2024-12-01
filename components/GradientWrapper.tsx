import React, { ReactNode } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colorPalette, GradientColors, LayoutStyles } from "@/styles";
import { StatusBar } from "expo-status-bar";

interface GradientWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = ({ children, style }: GradientWrapperI) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={colorPalette.primaryBg.primaryDarkGreen} />
      <LinearGradient
        colors={GradientColors}
        style={[LayoutStyles.pageContainer, style]}
        locations={[0.53, 0.653, 0.8, 1]}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
});
