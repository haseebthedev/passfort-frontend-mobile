import React, { useEffect, useState } from "react";
import AuthLayout from "./auth/_layout";
import { Stack } from "expo-router";
import { useAuthStore } from "@/store";
import { useFonts } from "expo-font";
import { loadFonts } from "@/utils";
import { LoadingIndicator } from "@/components";

const RootLayout = () => {
  const { user } = useAuthStore();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    load();
  }, []);

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  if (user?.isLogin) {
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
  } else {
    return (
      <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
        <Stack.Screen name="auth" />
      </Stack>
    );
  }
};

export default RootLayout;
