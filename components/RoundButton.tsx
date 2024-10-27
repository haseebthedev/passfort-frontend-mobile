import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { wp } from "@/utils";
import { colorPalette, iconSize } from "@/styles";

interface RoundButtonI {
  onPress?: () => void;
}

export const RoundButton = ({ onPress }: RoundButtonI) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <AntDesign name="plus" size={iconSize} />
      </View>
    </TouchableWithoutFeedback>
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
