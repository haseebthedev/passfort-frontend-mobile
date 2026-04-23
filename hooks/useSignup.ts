import { Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { SignupI } from "@/interfaces";
import { useAuthStore } from "@/store";
import { showToast, signupValidationSchema } from "@/utils";
import { useFormikHook } from "./useFormik";

export const useSignup = () => {
  const { signup, isLoading } = useAuthStore();

  const validationSchema = signupValidationSchema;
  const initialValues: SignupI = { name: "", email: "", password: "" };

  const submit = async ({ name, email, password }: SignupI) => {
    Keyboard.dismiss();
    try {
      await signup({ name, email, password });
      router.push(Screens.Signin);
    } catch (error) {
      showToast({
        type: "error",
        text1: `${error}`,
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
  } = useFormikHook(submit, validationSchema, initialValues);

  return {
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
    isLoading,
  };
}; 