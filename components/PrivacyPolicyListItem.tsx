import React from "react";
import { View, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { colorPalette } from "@/theme";
import { Spacing } from "@/styles";
import { hp, wp } from "@/utils";

interface PrivacyPolicyListItemProps {
  text: string;
}

export const PrivacyPolicyListItem: React.FC<PrivacyPolicyListItemProps> = ({ text }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.dot} />
      <AppText text={text} type="regularSubHeading" style={styles.listItemText} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  dot: {
    width: wp(1.5),
    height: wp(1.5),
    borderRadius: wp(1),
    backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
    marginTop: hp(0.8),
  },
  listItemText: { flex: 1, lineHeight: Spacing.lg },
});
