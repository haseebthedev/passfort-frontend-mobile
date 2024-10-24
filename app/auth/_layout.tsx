import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack initialRouteName="Signin" screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="Onboarding" />
      <Stack.Screen name="Signin" />
      <Stack.Screen name="Signup" />
    </Stack>
  );
};

export default AuthLayout;
