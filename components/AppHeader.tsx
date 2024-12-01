import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { iconSize, LayoutStyles, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";
import { wp } from "@/utils";

interface AppHeaderI {
  title?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  rightAccessory?: ReactNode;
  leftAccessory?: ReactNode;
}

export const AppHeader = ({
  title,
  leftIconName,
  rightIconName,
  onLeftIconPress,
  onRightIconPress,
  containerStyle,
  titleStyle,
  rightAccessory,
  leftAccessory,
}: AppHeaderI) => {
  return (
    <View style={[LayoutStyles.headerNavContainer, containerStyle]}>
      <View style={styles.leftContainer}>
        {leftIconName && (
          <RippleWrapper onPress={onLeftIconPress} style={styles.buttonStyle} containerStyle={styles.buttonContainer}>
            <Ionicons name={leftIconName} style={LayoutStyles.headerIcon} size={iconSize} />
          </RippleWrapper>
        )}

        <AppText text={title ? title : ""} style={titleStyle} type="heading" />
      </View>

      {rightIconName && (
        <RippleWrapper onPress={onRightIconPress} style={styles.buttonStyle} containerStyle={styles.buttonContainer}>
          <Ionicons name={rightIconName} style={LayoutStyles.headerIcon} size={iconSize} />
        </RippleWrapper>
      )}

      {rightAccessory && <>{rightAccessory}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  buttonContainer: {
    borderRadius: Spacing.lg,
  },
  buttonStyle: {
    width: wp(12),
    height: wp(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
