import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppStatusBar } from "./AppStatusBar";
import { LayoutStyles } from "@/styles";
import { useTheme } from "@/hooks";

interface GradientWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = ({ children, style }: GradientWrapperI) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={[styles.safeAreaContainer, { paddingTop: insets.top }]}>
      <AppStatusBar />
      <LinearGradient
        colors={theme.GradientColors}
        style={[
          LayoutStyles(theme).pageContainer,
          LayoutStyles(theme).horizontalSpacing,
          ,
          style,
        ]}
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
  },
});
