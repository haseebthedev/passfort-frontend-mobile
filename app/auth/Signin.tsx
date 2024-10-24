import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { colorPalette, Fonts, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, Checkbox, GradientWrapper, TextInput } from "@/components";

const Signin = () => {
  const { login } = useAuthStore();
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  const onSigninPress = () => {
    login({
      id: "123",
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      picture: "https://via.placeholder.com/150",
      location: "New York, USA",
      isFirstSignIn,
      isLogin: true,
    });

    if (isFirstSignIn) {
      setIsFirstSignIn(!isFirstSignIn);
      router.push("/auth/Onboarding");
    } else {
      router.push("/(tab)/");
    }
  };

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
                <AppText text="Sign In" type="title" />
              </View>

              <TextInput label="Email Address" placeholder="Enter Your Email Address" />
              <TextInput label="Password" placeholder="Enter Your Password" secureInput={true} />

              <View style={styles.actionGroup}>
                <Checkbox label="Remember me" />
                <AppButton text="Forget Password?" onPress={() => {}} preset="link" />
              </View>

              <AppButton text="Sign In" onPress={onSigninPress} style={styles.buttonContainer} />

              <View style={styles.linkRow}>
                <AppText text="Don’t have an account?" type="default" />
                <AppButton text="Sign Up" onPress={() => router.push("/auth/Signup")} preset="link" />
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

export default Signin;

const styles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    paddingTop: Spacing.sm,
  },
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
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
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
