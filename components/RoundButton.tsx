import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { wp } from "@/utils";
import { RippleWrapper } from "./RippleWrapper";
import { colorPalette, iconSize, Spacing } from "@/styles";

interface RoundButtonI {
  onPress: () => void;
  iconName?: keyof typeof AntDesign.glyphMap;
  viewStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
}

export const RoundButton = ({ onPress, iconName = "plus", viewStyle, iconStyle }: RoundButtonI) => {
  return (
    <RippleWrapper
      onPress={onPress}
      style={[styles.buttonContainer, viewStyle]}
      containerStyle={styles.containerStyle}
      rippleColor={colorPalette.primaryBg.secondaryLightGreen}
    >
      <AntDesign name={iconName} size={iconSize} style={iconStyle} />
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
