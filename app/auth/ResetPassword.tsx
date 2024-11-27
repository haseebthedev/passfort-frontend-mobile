import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useFormikHook } from "@/hooks";
import { ResetPasswordI } from "@/interfaces";
import { hp, newPasswordValidation, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, TextInput } from "@/components";

const ResetPassword = () => {
  const validationSchema = newPasswordValidation;
  const initialValues: ResetPasswordI = { newPassword: "", confirmPassword: "" };

  const submit = ({ newPassword, confirmPassword }: ResetPasswordI) => {
    Keyboard.dismiss();
    console.log("passwords: ", newPassword, confirmPassword);
    router.push(Screens.Signin);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Reset Password" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

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
        <AppButton preset="filled" text="Continue" onPress={handleSubmit} />
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
