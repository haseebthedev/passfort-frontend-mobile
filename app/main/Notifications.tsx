import React from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { LayoutStyles } from "@/styles";
import { AppHeader, GradientWrapper } from "@/components";

const Notifications = () => {
  return (
    <GradientWrapper>
      <AppHeader
        title="Notifications"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({});

export default Notifications;
