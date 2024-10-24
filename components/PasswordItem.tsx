import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { hp, maskPassword, wp } from "@/utils";
import { PasswordItemType } from "@/interfaces";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { router } from "expo-router";

interface PasswordItemI {
  item: PasswordItemType;
}

export const PasswordItem = ({ item }: PasswordItemI) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const onCopyPasswordPress = () => {};
  const onVisiblityPress = () => setPasswordVisible((prev) => !prev);

  return (
    <TouchableOpacity style={styles.passwordItemCard} onPress={() => router.push("/PasswordDetail")}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.icon} style={LayoutStyles.cardIcon} />
        <View>
          <AppText text={item.title} type="lightSubTitle" />
          <AppText
            text={passwordVisible ? item.passwordText : maskPassword(item.passwordText)}
            style={styles.passwordText}
            type="default"
          />
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onCopyPasswordPress}>
          <Ionicons name="copy-outline" size={wp(5)} color={colorPalette.primaryBg.shade00} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVisiblityPress}>
          <Entypo
            name={passwordVisible ? "eye-with-line" : "eye"}
            size={wp(5)}
            color={colorPalette.primaryBg.shade00}
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
    backgroundColor: colorPalette.primaryBg.shade03,
    borderRadius: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.shade01,
  },
  passwordText: {
    letterSpacing: wp(0.5),
    // height: hp(2.5),
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: Spacing.sm,
    gap: Spacing.sm,
  },
});
