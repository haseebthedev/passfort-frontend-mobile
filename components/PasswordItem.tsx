import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { maskPassword, wp } from "@/utils";
import { PasswordItemType } from "@/interfaces";
import { colorPalette, Fonts, LayoutStyles, Spacing } from "@/styles";

interface PasswordItemI {
  item: PasswordItemType;
}

export const PasswordItem = ({ item }: PasswordItemI) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const onCopyPasswordPress = () => {};
  const onVisiblityPress = () => setPasswordVisible((prev) => !prev);

  return (
    <TouchableOpacity style={styles.passwordItemCard} onPress={() => router.push(`/PasswordDetail?id=${item.id}`)}>
      <View style={styles.passwordInfoContainer}>
        <Image source={item.icon} style={LayoutStyles.cardIcon} />
        <View style={styles.spacing}>
          <AppText text={item.type} type="subHeading" style={styles.subHeading} numberOfLines={1} />
          <AppText
            text={passwordVisible ? item.passwordText : maskPassword(item.passwordText)}
            style={styles.passwordText}
            type="passwordText"
            numberOfLines={1}
          />
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onCopyPasswordPress}>
          <Ionicons name="copy-outline" size={wp(5)} color={colorPalette.primaryBg.primaryWhite} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVisiblityPress}>
          <Entypo
            name={passwordVisible ? "eye-with-line" : "eye"}
            size={wp(5)}
            color={colorPalette.primaryBg.primaryWhite}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  passwordItemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    padding: Spacing.xxs,
  },
  passwordInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.xxs,
  },
  passwordText: {
    fontSize: Fonts.size.md,
    width: wp(50),
  },
  spacing: { marginTop: Spacing.xxs, gap: wp(1) },
  subHeading: {
    color: colorPalette.primaryBg.primaryGrey,
    fontSize: Fonts.size.sm,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: Spacing.sm,
    gap: Spacing.sm,
  },
});
