import { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as SplashScreen from "expo-splash-screen";
import { Screens } from "@/enums";
import { passfortIcon } from "@/assets";
import { loadFonts, wp } from "@/utils";
import { GradientWrapper, LoadingIndicator } from "@/components";
import { useAuthStore } from "@/store";

export default function Index() {
  const router = useRouter();
  const { user, firstTimeUser } = useAuthStore();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [imagePickerLoaded, setImagePickerLoaded] = useState<boolean>(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
    } else {
      setImagePickerLoaded(true);
    }
  };

  // const redirectUser = async () => {
  //   if (fontsLoaded) {
  //     if (!user) {
  //       if (firstTimeUser) {
  //         router.push(Screens.Onboarding);
  //       } else {
  //         router.push(Screens.Signin);
  //       }
  //     } else {
  //       router.push(Screens.Home);
  //     }
  //   }
  // };

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
        }, 2000); // 2 second delay
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
    requestPermissions();
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
