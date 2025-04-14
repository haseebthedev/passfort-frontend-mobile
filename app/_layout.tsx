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
      {user ? (
        <Stack initialRouteName="(tab)" screenOptions={{ headerShown: false, animation: "ios" }}>
          <Stack.Screen name="(tab)" />
          <Stack.Screen name="profile/EditProfile" />
          <Stack.Screen name="Settings" />
          <Stack.Screen name="PasswordDetail" />
          <Stack.Screen name="CreatePassword" />
          <Stack.Screen name="GeneratedPassword" />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
          <Stack.Screen name="auth" />
        </Stack>
      )}

      <Toast position="bottom" />
    </>
  );
};

export default RootLayout;
