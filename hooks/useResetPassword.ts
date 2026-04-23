import { useFormikHook } from "./useFormik";
import { useAuthStore } from "@/store";
import { ResetPasswordI } from "@/interfaces";
import { newPasswordValidation, showToast } from "@/utils";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { Keyboard } from "react-native";

export const useResetPassword = (email: string, authCode: string) => {
  const { isLoading, resetPassword } = useAuthStore();

  const validationSchema = newPasswordValidation;
  const initialValues: ResetPasswordI = {
    newPassword: "",
    confirmPassword: "",
  };

  const submit = async ({ newPassword, confirmPassword }: ResetPasswordI) => {
    Keyboard.dismiss();
    try {
      await resetPassword({ email, authCode, newPassword });
      router.push(Screens.Signin);
    } catch (err) {
      showToast({
        type: "error",
        text1: `Signin Error: , ${err}`,
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
    isLoading,
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
  };
};
