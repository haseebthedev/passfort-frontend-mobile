import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack initialRouteName="Onboarding" screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="Onboarding" />
      <Stack.Screen name="Signin" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="BiometricAuth" />
      <Stack.Screen name="ForgetPassword" />
      <Stack.Screen name="OtpVerification" />
      <Stack.Screen name="ResetPassword" />
      <Stack.Screen name="ChangeMasterPassword" />
    </Stack>
  );
};

export default AuthLayout;
