import React from "react";
import AuthLayout from "./auth/_layout";
import { Stack } from "expo-router";
import { useAuthStore } from "@/store";
import { useFonts } from "expo-font";

const RootLayout = () => {
  const { user } = useAuthStore();
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Mulish-Regular.ttf"),
  });

  if (fontsLoaded) {
    if (user?.isLogin) {
      return (
        <Stack initialRouteName="(tab)" screenOptions={{ headerShown: false, animation: "ios" }}>
          <Stack.Screen name="(tab)" />
          <Stack.Screen name="profile/EditProfile" />
          <Stack.Screen name="Settings" />
          <Stack.Screen name="PasswordDetail" />
        </Stack>
      );
    } else {
      return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
          <Stack.Screen name="auth" />
        </Stack>
      );
    }
  }
};

export default RootLayout;
