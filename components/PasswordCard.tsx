import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { wp } from "@/utils";
import { AppText } from "./AppText";
import { PasswordCardType } from "@/interfaces";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";

interface PasswordCardI {
  item: PasswordCardType;
}

export const PasswordCard = ({ item }: PasswordCardI) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={item.icon} style={LayoutStyles.cardIcon} />
      <AppText text={item.title} type="subHeading" numberOfLines={1} />
      <AppText text={item.subtitle} type="description" style={styles.subTitle} numberOfLines={1} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
    alignItems: "center",
    borderWidth: wp(0.1),
    backgroundColor: "rgba(126, 244, 150, 0.05)",
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: Spacing.md,
    width: wp(90) / 3.25,
    paddingHorizontal: Spacing.sm,
  },
  subTitle: { color: colorPalette.primaryBg.secondayGrey },
});
