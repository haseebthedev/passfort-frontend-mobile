import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useAuthStore } from "@/store";
import { useFormikHook } from "@/hooks";
import { ForgetPasswordI } from "@/interfaces";
import { forgotPasswordValidation, hp, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, LoadingIndicator, TextInput } from "@/components";

const ForgetPassword = () => {
  const { isLoading, forgetPassword } = useAuthStore();
  const validationSchema = forgotPasswordValidation;
  const initialValues: ForgetPasswordI = { email: "" };

  const submit = async ({ email }: ForgetPasswordI) => {
    Keyboard.dismiss();
    try {
      await forgetPassword({ email });
      router.push(Screens.OtpVerification);
    } catch (err) {
      console.log("Error while recovering password: ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Forget Password" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.form}>
        <View style={styles.centerContent}>
          <AppText text="Recover Your Account" type="heading" />
          <AppText
            text="Enter the email address associated with your account."
            type="subHeading"
            style={[styles.subHeading]}
          />
        </View>

        <TextInput
          label="Email"
          placeholder="Enter Email"
          onBlur={() => setFieldTouched("email")}
          onChangeText={handleChange("email")}
          error={errors.email}
          visible={touched.email}
        />
        <AppButton
          text={isLoading ? "" : "Recover Password"}
          preset="filled"
          onPress={handleSubmit}
          RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
        />
      </View>
    </GradientWrapper>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginVertical: hp(6),
  },
  subHeading: {
    width: wp(80),
    textAlign: "center",
    color: colorPalette.primaryBg.primaryGrey,
    marginBottom: Spacing.md,
  },
  centerContent: {
    alignItems: "center",
  },
});
