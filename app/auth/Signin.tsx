import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard, Alert } from "react-native";
import { router } from "expo-router";
import * as Crypto from 'expo-crypto';
import AsyncStorage from "@react-native-async-storage/async-storage";
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


const CREDENTIALS_KEY = 'encrypted_credentials';
const REMEMBER_ME_KEY = 'remember_me';

const Signin = () => {
  const { user, signin, isLoading } = useAuthStore();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState<boolean>(true);

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const encryptCredentials = async (email: string, password: string) => {
    try {
      const combined = `${email}:${password}`;
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        combined
      );
      return digest;
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  };

  const saveCredentials = async (email: string, password: string) => {
    try {
      const encrypted = await encryptCredentials(email, password);
      await AsyncStorage.setItem(CREDENTIALS_KEY, encrypted);
      await AsyncStorage.setItem(REMEMBER_ME_KEY, 'true');
    } catch (error) {
      console.error('Error saving credentials:', error);
      Alert.alert('Error', 'Failed to save credentials');
    }
  };

  const clearCredentials = async () => {
    try {
      await AsyncStorage.removeItem(CREDENTIALS_KEY);
      await AsyncStorage.setItem(REMEMBER_ME_KEY, 'false');
    } catch (error) {
      console.error('Error clearing credentials:', error);
    }
  };

  const loadSavedCredentials = async () => {
    try {
      const savedRememberMe = await AsyncStorage.getItem(REMEMBER_ME_KEY);
      const savedCredentials = await AsyncStorage.getItem(CREDENTIALS_KEY);
      
      if (savedRememberMe === 'true' && savedCredentials) {
        setRememberMe(true);
        setFieldValue('email', '');
        setFieldValue('password', '');
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const submit = async ({ email, password }: SigninI) => {
    Keyboard.dismiss();
    try {
      await signin({ email, password });
      
      if (rememberMe) {
        await saveCredentials(email, password);
      } else {
        await clearCredentials();
      }

      router.push(Screens.BiometricAuth);
    } catch (err) {
      console.log("Signin Error: ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  if (isLoadingCredentials) {
    return <LoadingIndicator />;
  }

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
            <AppText text="Don't have an account?" type="label" />
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
