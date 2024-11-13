import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { RippleWrapper } from "./RippleWrapper";
import { AppFont, hp, wp } from "@/utils";
import { PasswordStatType } from "@/interfaces";
import { colorPalette, Fonts, Spacing } from "@/styles";

interface PasswordStatCardProps {
  item: PasswordStatType;
  isSelected: boolean;
  onPress: () => void;
}

export const PasswordStatCard = ({ item, isSelected, onPress }: PasswordStatCardProps) => {
  return (
    <View style={{ alignItems: "center" }}>
      <RippleWrapper style={[styles.card]} onPress={onPress}>
        <AppText text={item.label} style={styles.label} />
        <AppText text={item.number} style={styles.length} type="detail" />
      </RippleWrapper>

      <View style={isSelected && styles.selectedCard}></View>
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
  selectedCard: {
    // borderBottomWidth: hp(0.2),
    // borderBottomColor: colorPalette.primaryBg.secondaryLightGreen,
    width: wp(12),
    height: hp(0.2),
    backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
    position: "absolute",
    bottom: 0,
  },
  label: {
    color: colorPalette.primaryBg.secondayGrey,
    fontSize: Fonts.size.sm,
  },
  length: {
    fontFamily: AppFont.semiBold,
  },
});
