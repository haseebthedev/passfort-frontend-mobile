import React from "react";
import { Stack } from "expo-router";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppFont, hp } from "@/utils";
import { colorPalette, Fonts, iconSize, Spacing } from "@/styles";

const MainLayout = () => {
  return (
    <Stack initialRouteName="(tab)" screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="profile/EditProfile" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="PasswordDetail" />
      <Stack.Screen name="CreatePassword" />
      <Stack.Screen name="GeneratedPassword" />
    </Stack>
  );
};

export default MainLayout;
