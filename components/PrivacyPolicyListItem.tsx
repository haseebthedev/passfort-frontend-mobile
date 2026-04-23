import React from "react";
import { View, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { colorPalette, Spacing } from "@/styles";
import { hp } from "@/utils";

interface PrivacyPolicyListItemProps {
  text: string;
}

export const PrivacyPolicyListItem: React.FC<PrivacyPolicyListItemProps> = ({ text }) => (
  <View style={styles.listItem}>
    <AppText text="•" style={styles.bullet} />
    <AppText text={text} type="default" />
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: Spacing.sm,
    marginVertical: hp(0.2),
  },
  bullet: {
    marginRight: Spacing.sm,
    color: colorPalette.primaryBg.primaryWhite,
  },
}); 