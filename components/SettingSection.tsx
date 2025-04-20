import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { Spacing } from "@/styles";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <View style={styles.section}>
    <AppText type="primaryHeading" text={title} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
});
