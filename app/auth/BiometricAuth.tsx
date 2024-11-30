import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { hp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppLogo, AppText, BiometricAuthModal, GradientWrapper, RoundButton } from "@/components";

import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { Screens } from "@/enums";

const BiometricAuth = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const [isBiometricDone, setIsBiometricDone] = useState<boolean>(false);

  const snapPoints = ["48%", "75%"];

  const handleOpenBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvailable) {
      Alert.alert("Biometric support is not available.");
    }

    let biometricsSupported;
    if (isBiometricAvailable) {
      biometricsSupported = await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert("Biometric record not found.");
      return;
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login to Passfort with biometric.",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth) {
      setIsBiometricDone(true);
      router.push(Screens.Home);
    }
  };

  useEffect(() => {
    async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
  }, []);

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
          isBiometricDone={isBiometricDone}
          renderBackdrop={renderBackdrop}
          snapPoints={snapPoints}
          handleBiometricAuth={handleBiometricAuth}
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
