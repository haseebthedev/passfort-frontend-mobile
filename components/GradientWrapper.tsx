import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colorPalette, GradientColors, LayoutStyles } from "@/styles";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface GradientWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = ({ children, style }: GradientWrapperI) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeAreaContainer, { paddingTop: insets.top }]}>
      <StatusBar
        translucent={true}
        backgroundColor={colorPalette.primaryBg.primaryDarkGreen}
      />
      <LinearGradient
        colors={GradientColors}
        style={[LayoutStyles.pageContainer, style]}
        locations={[0.53, 0.653, 0.8, 1]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryDarkGreen,
  },
});
