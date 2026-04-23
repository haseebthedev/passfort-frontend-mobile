import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useSignin, useTheme } from "@/hooks";
import { colorPalette } from "@/theme";
import { Spacing } from "@/styles";
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
        <View>
          <AppLogo />
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
            <AppText text="Don't have an account?" type="default" />
            <AppButton text="Sign Up" onPress={() => router.push(Screens.Signup)} preset="primaryLink" />
          </View>
        </View>

        <View style={styles.termsAndConditions}>
          <AppText text="Terms & Conditions" style={styles.link} type="small" />
          <AppText text=" and " type="small" />
          <AppText text="Privacy policy" style={styles.link} type="small" />
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
      color: theme.placeholderText,
    },
    actionGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.md,
    },
    linkRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: Spacing.xs,
    },
    termsAndConditions: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: Spacing.sm,
    },
    link: {
      textDecorationLine: "underline",
    },
  });
