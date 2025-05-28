import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AppText } from "./AppText";
import { Screens } from "@/enums";
import { RippleWrapper } from "./RippleWrapper";
import { PasswordItemType, Theme } from "@/interfaces";
import { getInitials, hp, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";
import { useTheme } from "@/hooks";

interface PasswordItemI {
  item: PasswordItemType;
}

export const PasswordItem = ({ item }: PasswordItemI) => {
  const { theme, mode } = useTheme();

  const styles = createStyles(theme, mode);

  const onPressItem = () => {
    router.push({
      pathname: Screens.PasswordDetail,
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <RippleWrapper onPress={onPressItem} style={styles.passwordItemCard}>
      <View style={styles.passwordInfoContainer}>
        <View style={styles.imageContainer}>
          <AppText
            text={getInitials(item.username ?? "User Name")}
            type="heading"
            style={mode === "dark" ? { color: colorPalette.primaryBg.primaryWhite } : { color: colorPalette.primaryBg.secondaryLightGreen }}
          />
        </View>
        <AppText text={item.username ?? "Username"} type="subHeading" style={styles.subHeading} numberOfLines={1} />
      </View>
    </RippleWrapper>
  );
};

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
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
      borderColor: theme.cardsBorder,
      backgroundColor: theme.cardBg,
      paddingVertical: Spacing.xxs,
      paddingHorizontal: Spacing.sm,
      height: hp(8.42),
      elevation: mode === "light" ? 1 : 0,
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
      width: wp(65),
    },
  });
