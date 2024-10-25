import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { wp } from "@/utils";
import { colorPalette, iconSize } from "@/styles";
import { AntDesign } from "@expo/vector-icons";

interface RoundButtonI {
  onPress?: () => void;
}

export const RoundButton = ({ onPress }: RoundButtonI) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress} activeOpacity={0.7}>
      <AntDesign name="plus" size={iconSize} />
    </TouchableOpacity>
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
});
