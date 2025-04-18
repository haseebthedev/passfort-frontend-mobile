import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Screens } from "@/enums";
import { useAuthStore } from "@/store";
import { useFormikHook } from "@/hooks";
import { ResetPasswordI } from "@/interfaces";
import { hp, newPasswordValidation, showToast, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import {
  AppButton,
  AppHeader,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  TextInput,
} from "@/components";

const ResetPassword = () => {
  const { email, authCode } = useLocalSearchParams<{
    email: string;
    authCode: string;
  }>();

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
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title="Reset Password"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <View style={styles.form}>
        <View style={styles.centerContent}>
          <AppText text="Enter New Password" type="heading" />
          <AppText
            text="Your new password must be different from previous password."
            type="subHeading"
            style={styles.subHeading}
          />
        </View>

        <TextInput
          label="Password"
          placeholder="Enter Password"
          secureInput={true}
          onBlur={() => setFieldTouched("newPassword")}
          onChangeText={handleChange("newPassword")}
          error={errors.newPassword}
          visible={touched.newPassword}
        />
        <TextInput
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          secureInput={true}
          onBlur={() => setFieldTouched("confirmPassword")}
          onChangeText={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          visible={touched.confirmPassword}
        />
        <AppButton
          preset="filled"
          text={isLoading ? "" : "Continue"}
          onPress={handleSubmit}
          RightAccessory={() =>
            isLoading && (
              <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />
            )
          }
        />
      </View>
    </GradientWrapper>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: Spacing.xxl,
  },
  subHeading: {
    width: wp(80),
    textAlign: "center",
    color: colorPalette.primaryBg.secondayGrey,
    marginBottom: hp(2),
  },
  centerContent: {
    alignItems: "center",
  },
});
