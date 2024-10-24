import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { colorPalette, Fonts, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, GradientWrapper, TextInput } from "@/components";
import { router } from "expo-router";

const Signup = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AppLogo />

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.title}>
                <AppText text="Sign Up" type="title" />
              </View>

              <TextInput label="Name" placeholder="Enter Your Name" />
              <TextInput label="Email Address" placeholder="Enter Your Email Address" />
              <TextInput label="Password" placeholder="Enter Your Password" secureInput={true} />

              <AppButton text="Sign Up" onPress={() => {}} textStyle={styles.btnText} style={styles.buttonContainer} />

              <View style={styles.linkRow}>
                <AppText text="Already have an account?" type="default" />
                <AppButton text="Sign In" onPress={() => router.push("/auth/Signin")} preset="link" />
              </View>
            </View>

            <View style={styles.termsAndConditions}>
              <AppText text="Terms & Conditions" style={styles.conditions} />
              <AppText text=" and " style={styles.defaultText} />
              <AppText text="Privacy policy" style={styles.policy} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollViewStyle: { flexGrow: 1, paddingTop: Spacing.sm },
  title: {
    paddingVertical: Spacing.md,
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {},
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginVertical: Spacing.md,
  },
  btnText: {
    color: colorPalette.primaryBg.shade05,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsAndConditions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: colorPalette.primaryBg.shade00,
    marginBottom: Spacing.sm,
  },
  conditions: {
    textDecorationLine: "underline",
    fontSize: Fonts.size.xs,
    color: colorPalette.primaryBg.shade00,
  },
  defaultText: {
    fontSize: Fonts.size.xs,
    color: colorPalette.primaryBg.shade00,
  },
  policy: {
    textDecorationLine: "underline",
    fontSize: Fonts.size.xs,
    color: colorPalette.primaryBg.shade00,
  },
});
