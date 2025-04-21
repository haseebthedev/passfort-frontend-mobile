import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Screens } from "@/enums";
import { useFormikHook } from "./useFormik";
import { PasswordI, itemI } from "@/interfaces";
import { createPasswordValidationSchema, editPasswordValidationSchema } from "@/utils";
import {
  useAuthStore,
  usePasswordCategoryStore,
  usePasswordStore,
} from "@/store";

interface ParsedPasswordItem extends PasswordI {
  id?: string;
}

export const useCreatePassword = () => {
  const { passwordItem } = useLocalSearchParams<{ passwordItem: string }>();
  const parsedPasswordItem: ParsedPasswordItem | null = passwordItem
    ? JSON.parse(passwordItem)
    : null;

  const { user } = useAuthStore();
  const { createPassword, isLoading, updatePassword } = usePasswordStore();
  const { getPasswordCategories, isLoading: loadingPasswordCategories } =
    usePasswordCategoryStore();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(parsedPasswordItem?.type?._id ?? "");
  const [fieldVal, setFieldVal] = useState<any>(
    {
      _id: parsedPasswordItem?.type._id ?? "",
      title: parsedPasswordItem?.type.title ?? "",
      icon: parsedPasswordItem?.type.icon ?? "",
      updatedAt: parsedPasswordItem?.type.updatedAt ?? ""
    }
  );

  const [dropdownItems, setDropdownItems] = useState<itemI[]>([]);
  const [error, setError] = useState<string>("");

  const initialValues: PasswordI = {
    type: {
      icon: parsedPasswordItem?.type?.icon ?? "",
      _id: parsedPasswordItem?.type?._id ?? "",
      title: parsedPasswordItem?.type?.title ?? "",
      updatedAt: parsedPasswordItem?.type?.updatedAt ?? "",
    },
    platform: parsedPasswordItem?.platform ?? "",
    siteAddress: parsedPasswordItem?.siteAddress ?? "",
    email: (parsedPasswordItem?.email || parsedPasswordItem?.username) ?? "",
    passwordText: parsedPasswordItem?.passwordText ?? "",
    createdAt: parsedPasswordItem?.createdAt ?? "",
    updatedAt: parsedPasswordItem?.updatedAt ?? "",
  };

  const submit = async ({
    platform,
    siteAddress,
    email,
    passwordText,
  }: PasswordI) => {
    Keyboard.dismiss();
    setError("");

    try {
      if (!value || !passwordText) {
        setError("Please fill in all required fields");
        return;
      }

      if (parsedPasswordItem?.id) {
        await updatePassword(parsedPasswordItem.id, {
          type: value,
          platform,
          siteAddress,
          username: email,
          passwordText,
        });
        router.back();
      } else {
        const filteredItem = dropdownItems.find((item) => item.value === value);
        if (!filteredItem) {
          setError("Please select a valid password type");
          return;
        }

        await createPassword({
          type: {
            _id: filteredItem.value,
            title: filteredItem.label ?? "",
          },
          platform,
          passwordText,
          email: email || user?.name,
          siteAddress,
        });
        resetForm();
        setValue("");
        router.back();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while saving the password"
      );
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
    resetForm,
  } = useFormikHook(submit, parsedPasswordItem ? editPasswordValidationSchema : createPasswordValidationSchema, initialValues);

  const onGeneratePasswordPress = () => router.push(Screens.GeneratedPassword);

  const getAllPasswordCategories = async () => {
    try {
      const response = await getPasswordCategories();
      if (response) {
        const passwordCardTitles = response.map((item) => ({
          label: item.title,
          value: item.id,
        }));

        setDropdownItems(passwordCardTitles);
      }
    } catch (err) {
      setError("Failed to load password categories");
    }
  };

  useEffect(() => {
    getAllPasswordCategories();
  }, []);

  return {
    open,
    setOpen,
    value,
    setValue,
    dropdownItems,
    error,
    isLoading,
    loadingPasswordCategories,
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue,
    onGeneratePasswordPress,
    parsedPasswordItem,
  };
};
