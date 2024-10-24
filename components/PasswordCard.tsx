import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { wp } from "@/utils";
import { AppText } from "./AppText";
import { PasswordCardType } from "@/interfaces";
import { colorPalette, Fonts, LayoutStyles, Spacing } from "@/styles";

interface PasswordCardI {
  item: PasswordCardType;
}

export const PasswordCard = ({ item }: PasswordCardI) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={item.icon} style={LayoutStyles.cardIcon} />
      <AppText text={item.title} type="default" />
      <AppText text={item.subtitle} type="lightSubTitle" style={styles.subTitle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorPalette.primaryBg.shade03,
    padding: Spacing.md,
    alignItems: "center",
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.shade01,
    // marginRight: Spacing.md,
    borderRadius: Spacing.md,
    width: wp(90) / 3,
  },
  subTitle: { fontSize: Fonts.size.xs },
});
