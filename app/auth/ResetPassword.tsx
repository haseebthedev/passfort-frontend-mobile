import React from "react";
import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { hp, wp } from "@/utils";
import { useResetPassword, useTheme } from "@/hooks";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, LoadingIndicator, TextInput } from "@/components";

const ResetPassword = () => {
  const { theme } = useTheme();

  const { email, authCode } = useLocalSearchParams<{
    email: string;
    authCode: string;
  }>();

  const { isLoading, handleChange, handleSubmit, setFieldTouched, errors, touched } = useResetPassword(email, authCode);

  return (
    <GradientWrapper>
      <AppHeader title="Reset Password" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.form}>
        <View style={styles.centerContent}>
          <AppText text="Enter New Password" type="heading" />
          <AppText text="Your new password must be different from previous password." type="subHeading" style={styles.subHeading} />
        </View>

        <TextInput
          label="New Password"
          placeholder="Enter Password"
          secureInput={true}
          onBlur={() => setFieldTouched("newPassword")}
          onChangeText={handleChange("newPassword")}
          error={errors.newPassword}
          visible={touched.newPassword}
        />
        <TextInput
          label="Confirm New Password"
          placeholder="Enter Confirm Password"
          secureInput={true}
          onBlur={() => setFieldTouched("confirmPassword")}
          onChangeText={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          visible={touched.confirmPassword}
        />
        <AppButton
          text={isLoading ? "" : "Continue"}
          onPress={handleSubmit}
          RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
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
    marginBottom: hp(2),
  },
  centerContent: {
    alignItems: "center",
  },
});
