import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { router } from "expo-router";
import { SigninI } from "@/interfaces";
import { Screens } from "@/enums";
import { useFormikHook } from "./useFormik";
import { useAuthStore } from "@/store";
import { clearCredentials, loadSavedCredentials, saveCredentials, showToast, signinValidationSchema } from "@/utils";

export const useSignin = () => {
  const { signin, isLoading, biometricAuth } = useAuthStore();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState<boolean>(true);

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const loadSavedCredentialsHandler = async () => {
    try {
      const { savedRememberMe } = await loadSavedCredentials();
      if (savedRememberMe === "true") {
        setRememberMe(true);
        setFieldValue("email", "");
        setFieldValue("password", "");
      }
    } catch (error) {
      console.error("Error loading credentials:", error);
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  useEffect(() => {
    loadSavedCredentialsHandler();
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

      if (biometricAuth) {
        router.push(Screens.BiometricAuth);
      } else {
        router.push(Screens.Home);
      }
    } catch (err) {
      showToast({
        type: "error",
        text1: `${err}`,
      });
    }
  };

  const {
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormikHook(submit, validationSchema, initialValues);

  return {
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
  };
}; 