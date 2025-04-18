import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Screens } from "@/enums";
import { useFormikHook } from "@/hooks";
import { PasswordI, itemI } from "@/interfaces";
import { colorPalette, iconSize, LayoutStyles, Spacing } from "@/styles";
import { AppFont, createPasswordValidationSchema, hp, wp } from "@/utils";
import {
  useAuthStore,
  usePasswordCategoryStore,
  usePasswordStore,
} from "@/store";
import {
  AppButton,
  AppHeader,
  AppText,
  Dropdown,
  ErrorMessage,
  GradientWrapper,
  KeyboardResponsiveHOC,
  LoadingIndicator,
  RippleWrapper,
  TextInput,
} from "@/components";

interface ParsedPasswordItem extends PasswordI {
  id?: string;
}

const CreatePassword = () => {
  const { passwordItem } = useLocalSearchParams<{ passwordItem: string }>();
  const parsedPasswordItem: ParsedPasswordItem | null = passwordItem
    ? JSON.parse(passwordItem)
    : null;

  const { user } = useAuthStore();
  const { createPassword, isLoading, updatePassword } = usePasswordStore();
  const { getPasswordCategories, isLoading: loadingPasswordCategories } =
    usePasswordCategoryStore();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [dropdownItems, setDropdownItems] = useState<itemI[]>([]);
  const [error, setError] = useState<string>("");

  const validationSchema = createPasswordValidationSchema;
  const initialValues: PasswordI = {
    type: {
      icon: parsedPasswordItem?.type?.icon ?? "",
      id: parsedPasswordItem?.type?.id ?? "",
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
      if (!value || !siteAddress || !passwordText) {
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
        setError("Password updated successfully");

        router.replace({
          pathname: Screens.PasswordDetail,
          params: {
            item: JSON.stringify({
              ...parsedPasswordItem,
              type: { ...parsedPasswordItem.type, id: value },
              platform,
              siteAddress,
              username: email,
              passwordText,
            }),
          },
        });
      } else {
        const filteredItem = dropdownItems.find((item) => item.value === value);
        if (!filteredItem) {
          setError("Please select a valid password type");
          return;
        }

        await createPassword({
          type: {
            id: filteredItem.value,
            title: filteredItem.label ?? "",
          },
          platform,
          passwordText,
          email: email || user?.name,
          siteAddress,
        });
        setError("Password created successfully");
      }

      if (!parsedPasswordItem?.id) {
        resetForm();
        setValue("");
      }
      router.back();
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
  } = useFormikHook(submit, validationSchema, initialValues);

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

  useEffect(() => {
    if (parsedPasswordItem?.type?.id) {
      setValue(parsedPasswordItem.type.id);
    }
  }, [parsedPasswordItem]);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title={parsedPasswordItem ? "Edit Password" : "New Password"}
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
        rightAccessory={
          <RippleWrapper
            onPress={onGeneratePasswordPress}
            style={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
          >
            <FontAwesome
              name="magic"
              size={iconSize}
              color={colorPalette.primaryBg.secondaryLightGreen}
            />
          </RippleWrapper>
        }
      />
      <KeyboardResponsiveHOC
        containerStyle={styles.mainContainer}
        scrollViewStyle={styles.scrollViewStyle}
      >
        <View style={styles.container}>
          {error ? <ErrorMessage error={error} visible={true} /> : null}

          <AppText text="Credentials" type="label" style={styles.heading} />

          <View style={styles.infoContainer}>
            <AppText text="Type" type="subHeading" style={styles.infoHeading} />
            <Dropdown
              open={open}
              value={value}
              items={dropdownItems}
              setOpen={setOpen}
              setFieldValue={setFieldValue}
              setValue={(selectedValue) => {
                setValue(selectedValue as string);
                setFieldValue("type", selectedValue as string);
              }}
            />
            {touched.type?.id && errors.type?.id && (
              <ErrorMessage error={errors.type.id} visible={touched.type?.id} />
            )}
          </View>

          <AppText
            text="Platform"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="Enter Your Platform"
            value={values.platform}
            onChangeText={handleChange("platform")}
            onBlur={() => setFieldTouched("platform")}
            error={
              typeof errors.platform === "string" ? errors.platform : undefined
            }
            visible={
              typeof touched.platform === "boolean"
                ? touched.platform
                : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppText
            text="Site Address"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="http://"
            value={values.siteAddress}
            onChangeText={handleChange("siteAddress")}
            onBlur={() => setFieldTouched("siteAddress")}
            error={
              typeof errors.siteAddress === "string"
                ? errors.siteAddress
                : undefined
            }
            visible={
              typeof touched.siteAddress === "boolean"
                ? touched.siteAddress
                : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppText
            text="Email / Username"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="Enter Your email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            error={typeof errors.email === "string" ? errors.email : undefined}
            visible={
              typeof touched.email === "boolean" ? touched.email : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppText
            text="Password"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="******"
            icon="cycle"
            value={values.passwordText}
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            error={
              typeof errors.passwordText === "string"
                ? errors.passwordText
                : undefined
            }
            visible={
              typeof touched.passwordText === "boolean"
                ? touched.passwordText
                : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppButton
            text={isLoading ? "" : parsedPasswordItem ? "Update" : "Save"}
            onPress={handleSubmit}
            disabled={isLoading || loadingPasswordCategories}
            RightAccessory={() =>
              isLoading && (
                <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />
              )
            }
          />
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  container: {
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(2),
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  heading: {
    fontFamily: AppFont.semiBold,
    marginBottom: Spacing.smd,
  },
  infoHeading: {
    color: colorPalette.primaryBg.secondayGrey,
    marginBottom: Spacing.xs,
  },
  infoContainer: {
    marginBottom: Spacing.md,
  },
  infoContainerWithError: {
    marginBottom: Spacing.xs,
  },
  inputStyle: {
    backgroundColor: colorPalette.primaryBg.primaryBg,
  },
  buttonContainer: {
    borderRadius: Spacing.lg,
  },
  buttonStyle: {
    width: wp(12),
    height: wp(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
