import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface KeyboardResponsiveHocI {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  scrollViewStyle?: StyleProp<ViewStyle>;
}

export const KeyboardResponsiveHOC = ({ children, containerStyle, scrollViewStyle }: KeyboardResponsiveHocI) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={containerStyle}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={scrollViewStyle}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
