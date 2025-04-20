import React from "react";
import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack
      initialRouteName="(tab)"
      screenOptions={{ headerShown: false, animation: "ios" }}
    >
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="profile/EditProfile" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="PasswordDetail" />
      <Stack.Screen name="CreatePassword" />
      <Stack.Screen name="GeneratedPassword" />
      <Stack.Screen name="Notifications" />
    </Stack>
  );
};

export default MainLayout;
