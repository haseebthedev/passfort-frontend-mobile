import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, GradientWrapper, TextInput } from "@/components";

const Signup = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
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

              <AppButton text="Sign Up" onPress={() => {}} style={styles.buttonContainer} />

              <View style={styles.linkRow}>
                <AppText text="Already have an account?" type="label" />
                <AppButton text="Sign In" onPress={() => router.push("/auth/Signin")} preset="link" />
              </View>
            </View>

            <View style={styles.termsAndConditions}>
              <AppText text="Terms & Conditions" style={styles.conditions} type="subHeading" />
              <AppText text=" and " style={styles.defaultText} type="subHeading" />
              <AppText text="Privacy policy" style={styles.policy} type="subHeading" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewStyle: { flexGrow: 1, paddingTop: Spacing.sm },
  title: {
    paddingVertical: Spacing.md,
    alignSelf: "center",
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
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsAndConditions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: colorPalette.primaryBg.primaryWhite,
    marginBottom: Spacing.sm,
  },
  conditions: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
  defaultText: { fontWeight: "400" },
  policy: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
});
