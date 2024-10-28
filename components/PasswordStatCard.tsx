import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { AppFont, hp, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";

interface PasswordStatCardProps {
  label: string;
  number: number;
}

export const PasswordStatCard = ({ label, number }: PasswordStatCardProps) => {
  return (
    <View style={styles.card}>
      <AppText text={label} style={styles.label} type="subHeading" />
      <AppText text={number.toString()} style={styles.length} type="detail" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.buttonText,
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
    fontFamily: AppFont.semi_bold,
  },
});
