import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { wp } from "@/utils";
import { colorPalette, Spacing, iconSize } from "@/styles";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  rightComponent: React.ReactNode;
  onPress?: () => void;
}

export const SettingItem = ({
  icon,
  title,
  rightComponent,
  onPress,
}: SettingItemProps) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingLeft}>
      <Ionicons
        name={icon}
        size={iconSize}
        color={colorPalette.primaryBg.primaryWhite}
      />
      <AppText text={title} />
    </View>
    {rightComponent}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.sm,
    borderRadius: wp(4),
    borderWidth: wp(0.1),
    color: colorPalette.primaryBg.primaryWhite,
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.secondaryDarkGreen,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
