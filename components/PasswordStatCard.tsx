import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { AppFont, hp, wp } from "@/utils";
import { PasswordStatType } from "@/interfaces";
import { colorPalette, Spacing } from "@/styles";

interface PasswordStatCardProps {
  item: PasswordStatType;
}

export const PasswordStatCard = ({ item }: PasswordStatCardProps) => {
  return (
    <View style={styles.card}>
      <AppText text={item.label} style={styles.label} type="subHeading" />
      <AppText text={item.number.toString()} style={styles.length} type="detail" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.primaryText,
    borderColor: colorPalette.primaryBg.borderColor2,
    padding: Spacing.sm,
    borderRadius: hp(2.5),
    height: hp(10),
    width: wp(100) / 3.6,
    alignItems: "center",
    gap: wp(1),
  },
  label: {
    color: colorPalette.primaryBg.secondayGrey,
  },
  length: {
    fontFamily: AppFont.semiBold,
  },
});
