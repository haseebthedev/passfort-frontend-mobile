import { useFormikHook } from "./useFormik";
import { useAuthStore } from "@/store";
import {} from "@/interfaces";
import { newPasswordValidation, showToast } from "@/utils";
import { Keyboard } from "react-native";

type MasterPasswordChangeI = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type UseChangeMasterPasswordParams = {
  isOldPasswordVerified: boolean;
};

export const useChangeMasterPassword = ({ isOldPasswordVerified }: UseChangeMasterPasswordParams) => {
  const { isLoading, changeMasterPassword } = useAuthStore();

  const validationSchema = newPasswordValidation;
  const initialValues: MasterPasswordChangeI = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const submit = async ({ currentPassword, newPassword }: MasterPasswordChangeI) => {
    Keyboard.dismiss();

    if (!isOldPasswordVerified) {
    }

    try {
      await changeMasterPassword({ oldPassword: currentPassword, newPassword });
    } catch (err) {
      showToast({
        type: "error",
        text1: `${err}`,
      });
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(submit, validationSchema, initialValues);

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
