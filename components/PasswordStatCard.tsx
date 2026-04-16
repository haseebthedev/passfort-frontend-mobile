import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { RippleWrapper } from "./RippleWrapper";
import { AppFont, hp, wp } from "@/utils";
import { PasswordStatType, Theme } from "@/interfaces";
import { colorPalette, Fonts, Spacing } from "@/styles";
import { useTheme } from "@/hooks";

interface PasswordStatCardProps {
  item: PasswordStatType;
  isSelected: boolean;
  onPress: () => void;
}

export const PasswordStatCard = ({ item, isSelected, onPress }: PasswordStatCardProps) => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);
  return (
    <View style={styles.container}>
      <RippleWrapper style={[styles.card]} onPress={onPress}>
        <AppText text={item.label} style={styles.label} type="default" />
        <AppText text={item.number} style={styles.length} type="detail" />
      </RippleWrapper>

      <View style={isSelected && styles.selectedCard}></View>
    </View>
  );
};

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      borderRadius: hp(2.5),
      elevation: theme.elevation,
    },
    card: {
      borderWidth: wp(0.2),
      backgroundColor: mode === "dark" ? colorPalette.primaryBg.primaryText : colorPalette.primaryBg.primaryWhite,
      borderColor: theme.cardsBorder,
      padding: Spacing.sm,
      borderRadius: hp(2.5),
      width: wp(100) / 3 - Spacing.md,
      alignItems: "center",
      gap: wp(1),
    },
    selectedCard: {
      width: wp(12),
      height: hp(0.2),
      backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
      position: "absolute",
      bottom: 0,
    },
    label: {
      color: colorPalette.primaryBg.secondayGrey,
    },
    length: {
      fontFamily: AppFont.semiBold,
    },
  });
