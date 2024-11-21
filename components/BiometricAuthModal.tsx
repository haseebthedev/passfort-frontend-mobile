import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { AppFont, hp } from "@/utils";
import { AppText } from "./AppText";
import { Screens } from "@/enums";
import { AppButton } from "./AppButton";
import { BottomSheetHOC } from "./BottomSheetHOC";
import { colorPalette, Spacing } from "@/styles";

interface BiometricAuthModalI {
  isVisible: boolean;
  snapPoints: string[];
  bottomSheetRef: React.RefObject<BottomSheet>;
  renderBackdrop: (props: BottomSheetBackdropProps) => JSX.Element;
}

export const BiometricAuthModal = ({ isVisible, bottomSheetRef, snapPoints, renderBackdrop }: BiometricAuthModalI) => {
  return (
    <BottomSheetHOC
      isVisible={isVisible}
      onBackdropPress={renderBackdrop}
      snapPoints={snapPoints}
      bottomSheetRef={bottomSheetRef}
    >
      <AppText text="Finger Authentication" type="default" style={styles.heading} />
      <AppText text="Please login to get access" type="default" style={styles.textStyle} />

      <View style={styles.roundContainer}></View>

      <AppText text="Touch the finger print sensor" type="default" style={styles.textStyle} />
      <AppButton
        text="Cancel"
        preset="primaryLink"
        onPress={() => router.push(Screens.Home)}
        textStyle={styles.textStyle}
      />
    </BottomSheetHOC>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    width: hp(13),
    height: hp(13),
    backgroundColor: colorPalette.primaryBg.lighterGreen,
    borderRadius: hp(15),
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  heading: {
    fontFamily: AppFont.bold,
    color: colorPalette.primaryBg.black,
    fontSize: hp(2.8),
    marginBottom: Spacing.xs,
  },
  textStyle: {
    color: colorPalette.primaryBg.black,
  },
});
