import React from "react";
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { iconSize, LayoutStyles } from "@/styles/styles";
import { wp } from "@/utils";

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
      <View style={{ flexDirection: "row", alignItems: "center", gap: wp(2) }}>
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