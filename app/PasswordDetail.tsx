import React from "react";
import { StyleSheet, Text } from "react-native";
import { AppHeader, GradientWrapper } from "@/components";
import { router } from "expo-router";
import { LayoutStyles } from "@/styles";

const PasswordDetail = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Password Details" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
    </GradientWrapper>
  );
};

export default PasswordDetail;

const styles = StyleSheet.create({});
