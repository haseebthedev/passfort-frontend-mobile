import React, { ReactNode } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GradientColors, LayoutStyles } from "@/styles";

interface GradientWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = ({ children, style }: GradientWrapperI) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
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
