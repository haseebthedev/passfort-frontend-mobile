import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppHeader, GradientWrapper } from "@/components";
import { router } from "expo-router";
import { LayoutStyles } from "@/styles";

const Settings = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Settings" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
    </GradientWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
