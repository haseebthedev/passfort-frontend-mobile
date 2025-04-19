import { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Screens } from "@/enums";
import { useAuthStore } from "@/store";
import { passfortIcon } from "@/assets";
import { GradientWrapper, LoadingIndicator } from "@/components";
import { loadFonts, requestImagePickerPermission, wp } from "@/utils";

export default function Index() {
  const router = useRouter();
  const { user, firstTimeUser } = useAuthStore();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [imagePickerLoaded, setImagePickerLoaded] = useState<boolean>(false);

  const redirectUser = async () => {
    if (fontsLoaded) {
      setTimeout(() => {
        if (!user) {
          if (firstTimeUser) {
            router.push(Screens.Onboarding);
          } else {
            router.push(Screens.Signin);
          }
        } else {
          router.push(Screens.Home);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        setFontsLoaded(true);
        await SplashScreen.preventAutoHideAsync();
        if (fontsLoaded) {
          redirectUser();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [router, fontsLoaded]);

  useEffect(() => {
    const handlePermissions = async () => {
      const granted = await requestImagePickerPermission();
      if (granted) {
        setImagePickerLoaded(true);
      }
    };

    handlePermissions();
  }, []);

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
