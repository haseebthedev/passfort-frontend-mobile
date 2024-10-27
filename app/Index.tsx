import { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Href, useRouter } from "expo-router";
import { useFonts } from "expo-font";

import { wp } from "@/utils";
import { GradientWrapper } from "@/components";
import passfortIcon from "../assets/Icons/passfortIcon.png";

export default function Index() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Mulish-Regular.ttf"),
  });

  const redirectUser = async () => {
    if (true) {
      setTimeout(() => {
        router.push("/auth/Signin" as Href<string>);
      }, 3000);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
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
