import React from "react";
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { wp } from "@/utils";
import { AppText } from "./AppText";
import { iconSize, LayoutStyles } from "@/styles/styles";

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
          <TouchableOpacity onPress={onLeftIconPress}>
            <Ionicons name={leftIconName} style={LayoutStyles.headerIcon} size={iconSize} />
          </TouchableOpacity>
        )}

        <AppText text={title ? title : ""} style={titleStyle} type="heading" />
      </View>

      {rightIconName && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Ionicons name={rightIconName} style={LayoutStyles.headerIcon} size={iconSize} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: { flexDirection: "row", alignItems: "center", gap: wp(2) },
});
