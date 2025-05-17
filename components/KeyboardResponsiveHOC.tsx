import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface KeyboardResponsiveHocI {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  scrollViewStyle?: StyleProp<ViewStyle>;
}

export const KeyboardResponsiveHOC = ({ children, containerStyle, scrollViewStyle }: KeyboardResponsiveHocI) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, containerStyle]}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    minHeight: '100%',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === "ios" ? 100 : 20,
  },
});
