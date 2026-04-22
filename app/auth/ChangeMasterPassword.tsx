import React from "react";
import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useChangeMasterPassword } from "@/hooks";
import { colorPalette, Spacing } from "@/styles";
import { AppButton, AppHeader, GradientWrapper, LoadingIndicator, TextInput } from "@/components";

const ChangeMasterPassword = () => {
  const { isOldPasswordVerified } = useLocalSearchParams<{
    isOldPasswordVerified: string;
  }>();

  if (!isOldPasswordVerified) {
  }

  const { isLoading, handleChange, handleSubmit, setFieldTouched, errors, touched } = useChangeMasterPassword({
    isOldPasswordVerified: isOldPasswordVerified === "true",
  });

  return (
    <GradientWrapper>
      <AppHeader title="Change Master Password" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.form}>
        <TextInput
          label="Current Password"
          placeholder="Enter Current Master Password"
          onBlur={() => setFieldTouched("currentPassword")}
          onChangeText={handleChange("currentPassword")}
          error={errors.currentPassword}
          visible={touched.currentPassword}
          secureTextEntry={true}
        />
        <TextInput
          label="New Master Password"
          placeholder="Enter New Master Password"
          onBlur={() => setFieldTouched("newPassword")}
          onChangeText={handleChange("newPassword")}
          error={errors.newPassword}
          visible={touched.newPassword}
          secureTextEntry={true}
        />
        <TextInput
          label="Confirm New Master Password"
          placeholder="Re-enter New Master Password"
          onBlur={() => setFieldTouched("confirmPassword")}
          onChangeText={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          visible={touched.confirmPassword}
          secureTextEntry={true}
        />

        <AppButton
          text={isLoading ? "" : "Change Master Password"}
          onPress={handleSubmit}
          RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
        />
      </View>
    </GradientWrapper>
  );
};

export default ChangeMasterPassword;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: Spacing.md,
  },
});
