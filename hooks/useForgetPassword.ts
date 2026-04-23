import { Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useAuthStore } from "@/store";
import { useFormikHook } from "./useFormik";
import { ForgetPasswordI } from "@/interfaces";
import { forgotPasswordValidation, showToast } from "@/utils";

export const useForgetPassword = () => {
  const { isLoading, forgetPassword } = useAuthStore();
  const validationSchema = forgotPasswordValidation;
  const initialValues: ForgetPasswordI = { email: "" };

  const submit = async ({ email }: ForgetPasswordI) => {
    Keyboard.dismiss();
    try {
      await forgetPassword({ email });
      router.push({
        pathname: Screens.OtpVerification,
        params: {
          email,
        },
      });
    } catch (err) {
      showToast({
        type: "error",
        text1: `${err}!`,
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
