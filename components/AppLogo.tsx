import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { wp } from "@/utils";
import logo from "../assets/Icons/passfortIcon.png";

interface AppLogoI {
  style?: StyleProp<ImageStyle>;
}

export const AppLogo = ({ style }: AppLogoI) => {
  return <Image source={logo} style={[styles.logo, style]} />;
};

const styles = StyleSheet.create({
  logo: {
    width: wp(30),
    height: wp(30),
    alignSelf: "center",
  },
});
