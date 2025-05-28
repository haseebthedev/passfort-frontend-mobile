import { useEffect, useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as LocalAuthentication from "expo-local-authentication";
import { Screens } from "@/enums";
import { useAuthStore } from "@/store";
import { passfortIcon } from "@/assets";
import { GradientWrapper, LoadingIndicator } from "@/components";
import { loadFonts, requestImagePickerPermission, wp } from "@/utils";

export default function Index() {
  const router = useRouter();
  const { user, firstTimeUser, biometricAuth: biometricEnabled } = useAuthStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [imagePickerLoaded, setImagePickerLoaded] = useState(false);

  const redirectUser = async () => {
    if (!fontsLoaded) return;

    // Not signed in
    if (!user) {
      if (firstTimeUser) {
        router.push(Screens.Onboarding);
      } else {
        console.log("ok", biometricEnabled);
        router.push(Screens.Signin);
      }
      return;
    }

    if (biometricEnabled) {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (compatible && enrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate to unlock Passfort",
          fallbackLabel: "Use Passcode",
          cancelLabel: "Cancel",
        });

        if (result.success) {
          router.push(Screens.Home);
        } else {
          Alert.alert("Authentication Failed", "Please try again or sign in again.");
          router.push(Screens.Signin);
        }
      } else {
        Alert.alert("Biometric not available", "Fallback to password login.");
        router.push(Screens.Signin);
      }
    } else {
      // Signed in but biometric not enabled
      router.push(Screens.Home);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    const handlePermissions = async () => {
      const granted = await requestImagePickerPermission();
      if (granted) {
        setImagePickerLoaded(true);
      }
    };

    handlePermissions();
  }, []);

  useEffect(() => {
    if (fontsLoaded && imagePickerLoaded) {
      redirectUser();
    }
  }, [fontsLoaded, imagePickerLoaded]);

  if (!fontsLoaded && !imagePickerLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <GradientWrapper style={styles.container}>
      <Image source={passfortIcon} style={styles.icon} />
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: wp(65),
    height: wp(65),
  },
});
