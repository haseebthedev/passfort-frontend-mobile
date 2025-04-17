import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { loadFonts } from "@/utils";
import { useAuthStore } from "@/store";
import { LoadingIndicator } from "@/components";
import Toast from "react-native-toast-message";

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

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="main" />
      </Stack>
      <Toast position="bottom" />
    </>
  );
};

export default RootLayout;
