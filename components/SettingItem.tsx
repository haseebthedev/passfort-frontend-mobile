import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { wp } from "@/utils";
import { Spacing, iconSize } from "@/styles";
import { Theme } from "@/interfaces";
import { useTheme } from "@/hooks";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  rightComponent: React.ReactNode;
  onPress?: () => void;
}

export const SettingItem = ({ icon, title, rightComponent, onPress }: SettingItemProps) => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={iconSize} color={theme.icon} />
        <AppText text={title} />
      </View>
      {rightComponent}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme, mode?: string) =>
  StyleSheet.create({
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: Spacing.sm,
      borderRadius: wp(4),
      borderWidth: wp(0.1),
      color: theme.text,
      borderColor: theme.cardsBorder,
      backgroundColor: theme.itemBg,
      elevation: theme.elevation,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
  });
