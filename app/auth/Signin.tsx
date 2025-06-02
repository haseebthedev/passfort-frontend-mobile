import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useSignin, useTheme } from "@/hooks";
import { colorPalette, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, Checkbox, GradientWrapper, KeyboardResponsiveHOC, LoadingIndicator, TextInput } from "@/components";
import { Theme } from "@/interfaces";

const Signin = () => {
  const {
    rememberMe,
    setRememberMe,
    isLoadingCredentials,
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
    isLoading,
  } = useSignin();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (isLoadingCredentials) {
    return <LoadingIndicator />;
  }

  return (
    <GradientWrapper>
      <KeyboardResponsiveHOC containerStyle={styles.container} scrollViewStyle={styles.scrollViewStyle}>
        <AppLogo />
        <View>
          <AppText text="Sign In" type="title" style={styles.title} />

          <TextInput
            label="Email Address"
            value={values.email}
            onChangeText={handleChange("email")}
            placeholder="Enter Your Email Address"
            onBlur={() => setFieldTouched("email")}
            error={typeof errors.email === "string" ? errors.email : undefined}
            visible={typeof touched.email === "boolean" ? touched.email : undefined}
          />
          <TextInput
            label="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            placeholder="Enter Your Password"
            secureInput={true}
            onBlur={() => setFieldTouched("password")}
            error={typeof errors.password === "string" ? errors.password : undefined}
            visible={typeof touched.password === "boolean" ? touched.password : undefined}
          />

          <View style={styles.actionGroup}>
            <Checkbox label="Remember me" labelStyle={styles.labelStyle} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <AppButton text="Forget Password?" onPress={() => router.push(Screens.ForgetPassword)} preset="primaryLink" />
          </View>

          <AppButton
            text={isLoading ? "" : "Sign In"}
            onPress={handleSubmit}
            RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
          />
          <View style={styles.linkRow}>
            <AppText text="Don't have an account?" type="label" />
            <AppButton text="Sign Up" onPress={() => router.push(Screens.Signup)} preset="primaryLink" />
          </View>
        </View>

        <View style={styles.termsAndConditions}>
          <AppText text="Terms & Conditions" style={styles.conditions} type="default" />
          <AppText text=" and " type="default" />
          <AppText text="Privacy policy" style={styles.policy} type="default" />
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default Signin;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewStyle: {
      flexGrow: 1,
      paddingTop: Spacing.sm,
    },
    title: {
      paddingVertical: Spacing.md,
      alignSelf: "center",
      marginBottom: Spacing.lg,
    },
    labelStyle: {
      color: theme.label,
    },
    actionGroup: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    linkRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    termsAndConditions: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: Spacing.sm,
    },
    conditions: {
      textDecorationLine: "underline",
    },
    policy: {
      textDecorationLine: "underline",
    },
  });
