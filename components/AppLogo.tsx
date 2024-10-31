import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { wp } from "@/utils";
import { passfortIcon } from "@/assets";

interface AppLogoI {
  style?: StyleProp<ImageStyle>;
}

export const AppLogo = ({ style }: AppLogoI) => {
  return <Image source={passfortIcon} style={[styles.logo, style]} />;
};

const styles = StyleSheet.create({
  logo: {
    width: wp(30),
    height: wp(30),
    alignSelf: "center",
  },
});
