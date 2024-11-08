import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { wp } from "@/utils";
import { colorPalette, iconSize, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";

interface RoundButtonI {
  onPress?: () => void;
}

export const RoundButton = ({ onPress }: RoundButtonI) => {
  return (
    <RippleWrapper
      onPress={onPress}
      style={styles.buttonContainer}
      containerStyle={styles.containerStyle}
      rippleColor={colorPalette.primaryBg.secondaryLightGreen}
    >
      <AntDesign name="plus" size={iconSize} />
    </RippleWrapper>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colorPalette.primaryBg.primaryLightGreen,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
  },
  containerStyle: {
    borderRadius: Spacing.lg,
  },
});
