import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { hp, maskPassword, wp } from "@/utils";
import { PasswordItemType } from "@/interfaces";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { colorPalette, Fonts, LayoutStyles, Spacing } from "@/styles";
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
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: Spacing.xxs }}>
        <Image source={item.icon} style={LayoutStyles.cardIcon} />
        <View style={{ marginTop: Spacing.xxs }}>
          <AppText
            text={item.title}
            type="subHeading"
            style={{ color: colorPalette.primaryBg.primaryGrey, fontSize: Fonts.size.sm }}
            numberOfLines={1}
          />
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
    backgroundColor: colorPalette.primaryBg.LightGreenBg,
    padding: Spacing.xxs,
  },
  passwordText: {
    fontSize: Fonts.size.md,
    width: wp(50),
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: Spacing.sm,
    gap: Spacing.sm,
  },
});
