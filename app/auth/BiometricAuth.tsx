import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { hp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppLogo, AppText, BiometricAuthModal, GradientWrapper, RoundButton } from "@/components";

const BiometricAuth = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  const snapPoints = ["48%", "75%"];

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <GestureHandlerRootView>
      <GradientWrapper style={LayoutStyles.horizontalSpacing}>
        <AppLogo style={styles.appLogo} />

        <View style={styles.innerContainer}>
          <RoundButton
            iconName="arrowup"
            onPress={() => handleOpenBottomSheet()}
            viewStyle={styles.viewStyle}
            iconStyle={styles.iconStyle}
          />
          <AppText text="Swipe up to sign in" />
        </View>

        <BiometricAuthModal
          bottomSheetRef={bottomSheetRef}
          isVisible={isBottomSheetOpen}
          renderBackdrop={renderBackdrop}
          snapPoints={snapPoints}
        />
      </GradientWrapper>
    </GestureHandlerRootView>
  );
};

export default BiometricAuth;

const styles = StyleSheet.create({
  appLogo: {
    height: hp(21),
    width: hp(21),
    marginTop: hp(7),
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewStyle: {
    backgroundColor: colorPalette.primaryBg.swipeButtonBg,
    marginVertical: Spacing.sm,
  },
  iconStyle: { color: colorPalette.primaryBg.primaryLightGreen },
});
