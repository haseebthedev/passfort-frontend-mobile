import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { SigninI } from "@/interfaces";
import { useAuthStore } from "@/store";
import { useFormikHook } from "@/hooks";
import { signinValidationSchema } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import {
  AppButton,
  AppLogo,
  AppText,
  Checkbox,
  GradientWrapper,
  KeyboardResponsiveHOC,
  LoadingIndicator,
  TextInput,
} from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
  const { user, signin, isLoading } = useAuthStore();

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    Keyboard.dismiss();
    try {
      await signin({ email, password });
      router.push(Screens.Home);

      if (rememberMe) {
        await AsyncStorage.setItem("savedEmail", email);
        await AsyncStorage.setItem("savedPassword", password);
        await AsyncStorage.setItem("rememberMe", "true");
      } else {
        await AsyncStorage.removeItem("savedEmail");
        await AsyncStorage.removeItem("savedPassword");
        await AsyncStorage.setItem("rememberMe", "false");
      }

      // if (user?.isFirstSignIn) {
      //   router.push(Screens.Onboarding);
      // } else if (!user?.isFirstSignIn) {
      //   router.push(Screens.BiometricAuth);
      // } else {
      //   router.push(Screens.BiometricAuth);
      // }
    } catch (err) {
      console.log("Signin Error: ", err);
    }
  };

  useEffect(() => {
    const loadSavedCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem("savedEmail");
      const savedPassword = await AsyncStorage.getItem("savedPassword");
      const savedRememberMe = await AsyncStorage.getItem("rememberMe");

      if (savedEmail && savedPassword && savedRememberMe === "true") {
        setFieldValue("email", savedEmail);
        setFieldValue("password", savedPassword);
        setRememberMe(true);
      }
    };
    loadSavedCredentials();
  }, []);
  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container} scrollViewStyle={styles.scrollViewStyle}>
        <AppLogo />
        <View style={styles.form}>
          <View style={styles.title}>
            <AppText text="Sign In" type="title" />
          </View>

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
            <Checkbox
              label="Remember me"
              labelStyle={styles.labelStyle}
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <AppButton
              text="Forget Password?"
              onPress={() => router.push(Screens.ForgetPassword)}
              preset="primaryLink"
            />
          </View>

          <AppButton
            text={isLoading ? "" : "Sign In"}
            onPress={handleSubmit}
            RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
          />

          <View style={styles.linkRow}>
            <AppText text="Don’t have an account?" type="label" />
            <AppButton text="Sign Up" onPress={() => router.push(Screens.Signup)} preset="primaryLink" />
          </View>
        </View>
      </KeyboardResponsiveHOC>
      <View style={styles.termsAndConditions}>
        <AppText text="Terms & Conditions" style={styles.conditions} type="default" />
        <AppText text=" and " type="default" />
        <AppText text="Privacy policy" style={styles.policy} type="default" />
      </View>
    </GradientWrapper>
  );
};

export default Signin;

const styles = StyleSheet.create({
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
  form: {
    justifyContent: "space-between",
  },
  labelStyle: {
    color: colorPalette.primaryBg.primaryGrey,
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsAndConditions: {
    flexDirection: "row",
    justifyContent: "center",
    color: colorPalette.primaryBg.primaryWhite,
    marginBottom: Spacing.sm,
  },
  conditions: {
    textDecorationLine: "underline",
  },
  policy: {
    textDecorationLine: "underline",
  },
});
