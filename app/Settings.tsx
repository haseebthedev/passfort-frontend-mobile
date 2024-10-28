import React from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { LayoutStyles } from "@/styles";
import { useAuthStore } from "@/store";
import { AppButton, AppHeader, GradientWrapper } from "@/components";

const Settings = () => {
  const { reset } = useAuthStore();

  const onLogoutPress = () => {
    reset();
    router.push("/auth/Signin");
  };

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Settings" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
      <AppButton text="Logout" onPress={onLogoutPress} />
    </GradientWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
