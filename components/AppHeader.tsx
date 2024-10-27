import React from "react";
import { StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { iconSize, LayoutStyles, Spacing } from "@/styles";

interface AppHeaderI {
  title?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export const AppHeader = ({
  title,
  leftIconName,
  rightIconName,
  onLeftIconPress,
  onRightIconPress,
  containerStyle,
  titleStyle,
}: AppHeaderI) => {
  return (
    <View style={[LayoutStyles.headerNavContainer, containerStyle]}>
      <View style={styles.leftContainer}>
        {leftIconName && (
          <TouchableWithoutFeedback onPress={onLeftIconPress}>
            <Ionicons name={leftIconName} style={LayoutStyles.headerIcon} size={iconSize} />
          </TouchableWithoutFeedback>
        )}

        <AppText text={title ? title : ""} style={titleStyle} type="heading" />
      </View>

      {rightIconName && (
        <TouchableWithoutFeedback onPress={onRightIconPress}>
          <Ionicons name={rightIconName} style={LayoutStyles.headerIcon} size={iconSize} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
});
