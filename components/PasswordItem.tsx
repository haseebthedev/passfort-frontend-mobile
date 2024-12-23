import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { PasswordItemType } from "@/interfaces";
import { getInitials, hp, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";

interface PasswordItemI {
  item: PasswordItemType;
}

export const PasswordItem = ({ item }: PasswordItemI) => {
  const onCopyPasswordPress = () => {};

  return (
    <>
      <RippleWrapper onPress={() => router.push(`/PasswordDetail?id=${item.id}`)} style={styles.passwordItemCard}>
        <View style={styles.passwordInfoContainer}>
          <View style={styles.imageContainer}>
            <AppText text={getInitials(item.username ?? "User Name")} type="heading" />
          </View>
          <AppText text={item.username ?? "Username"} type="subHeading" style={styles.subHeading} numberOfLines={1} />
        </View>
      </RippleWrapper>

      <View style={styles.copyButtonContainer}>
        <RippleWrapper onPress={onCopyPasswordPress} style={styles.copyButton} containerStyle={styles.buttonContainer}>
          <Feather name="copy" size={wp(5)} color={colorPalette.primaryBg.primaryWhite} style={styles.copyIcon} />
        </RippleWrapper>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: Spacing.lg,
  },
  passwordItemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    height: hp(8.42),
  },
  passwordInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    width: wp(11),
    height: wp(10),
    backgroundColor: colorPalette.gradientBg.lightGreen,
    marginRight: Spacing.sm,
    borderRadius: wp(2),
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  subHeading: {
    textTransform: "capitalize",
    width: wp(63),
  },
  copyButtonContainer: {
    position: "absolute",
    right: wp(3),
    top: hp(1.2),
  },
  copyButton: {
    width: wp(12),
    height: wp(12),
    alignItems: "center",
    justifyContent: "center",
  },
  copyIcon: {
    transform: [{ rotate: "90deg" }],
  },
});
