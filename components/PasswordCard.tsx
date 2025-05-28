import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { hp, wp } from "@/utils";
import { AppText } from "./AppText";
import { RippleWrapper } from "./RippleWrapper";
import { PasswordGroup, Theme } from "@/interfaces";
import { colorPalette, LayoutStyles, Spacing, theme } from "@/styles";
import { useTheme } from "@/hooks";

interface PasswordCardI {
  item: PasswordGroup;
}

export const PasswordCard = ({ item }: PasswordCardI) => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);
  return (
    <RippleWrapper onPress={() => {}}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          {item?.type.icon && <Image source={{ uri: item?.type.icon }} style={LayoutStyles(theme).cardIcon} />}
        </View>
        <AppText text={item.type.title} type="subHeading" numberOfLines={1} />
        <AppText text={`${item.passwords.length} Passwords`} type="description" style={styles.subTitle} numberOfLines={1} />
      </View>
    </RippleWrapper>
  );
};

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
    card: {
      paddingTop: Spacing.md,
      paddingBottom: Spacing.md,
      alignItems: "center",
      borderWidth: wp(0.1),
      backgroundColor: theme.cardBg,
      borderColor: theme.cardsBorder,
      borderRadius: Spacing.md,
      width: wp(90) / 3.25,
      paddingHorizontal: Spacing.xs,
      // elevation: mode === "light" ? 1 : 0,
    },
    iconContainer: {
      width: wp(11),
      height: wp(11),
      backgroundColor: colorPalette.gradientBg.lightGreen,
      borderRadius: wp(7),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: Spacing.xs,
      elevation: 1,
    },
    subTitle: {
      color: colorPalette.primaryBg.secondayGrey,
      paddingTop: Spacing.xxs,
    },
  });
