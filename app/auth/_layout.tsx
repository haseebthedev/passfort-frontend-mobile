import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack initialRouteName="Signin" screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="Onboarding" />
      <Stack.Screen name="Signin" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="BiometricAuth" />
      <Stack.Screen name="ForgetPassword" />
      <Stack.Screen name="OtpVerification" />
      <Stack.Screen name="ResetPassword" />
    </Stack>
  );
};

export default AuthLayout;
