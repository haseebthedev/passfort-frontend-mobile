import React from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { AppText } from "./AppText";
import { AppButton } from "./AppButton";
import { AppFont, hp, wp } from "@/utils";
import { BottomSheetHOC } from "./BottomSheetHOC";
import { colorPalette, iconSize, Spacing } from "@/styles";
import { RippleWrapper } from "./RippleWrapper";
import { MaterialIcons } from "@expo/vector-icons";

interface BiometricAuthModalI {
  isVisible: boolean;
  isBiometricDone: boolean;
  snapPoints: string[];
  bottomSheetRef: React.RefObject<BottomSheet>;
  renderBackdrop: (props: BottomSheetBackdropProps) => JSX.Element;
  handleBiometricAuth: () => void;
}

export const BiometricAuthModal = ({
  isVisible,
  bottomSheetRef,
  isBiometricDone,
  snapPoints,
  renderBackdrop,
  handleBiometricAuth,
}: BiometricAuthModalI) => {
  return (
    <BottomSheetHOC
      isVisible={isVisible}
      onBackdropPress={renderBackdrop}
      snapPoints={snapPoints}
      bottomSheetRef={bottomSheetRef}
    >
      <AppText text="Finger Authentication" type="default" style={styles.heading} />
      <AppText text="Please login to get access" type="default" style={styles.textStyle} />

      <RippleWrapper onPress={handleBiometricAuth} style={styles.roundContainer}>
        <MaterialIcons
          name="fingerprint"
          color={isBiometricDone ? colorPalette.primaryBg.primaryLightGreen : colorPalette.primaryBg.black}
          size={wp(15)}
        />
      </RippleWrapper>

      <AppText text="Touch the finger print sensor" type="default" style={styles.textStyle} />
      <AppButton
        text="Cancel"
        preset="primaryLink"
        onPress={() => bottomSheetRef.current?.close()}
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
    alignItems: "center",
    justifyContent: "center",
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
