import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { hp, wp } from "@/utils";
import { useBiometricAuth, useTheme } from "@/hooks";
import { AppLogo, AppText, BiometricAuthModal, GradientWrapper } from "@/components";
import { colorPalette } from "@/theme";
import { iconSize, Spacing } from "@/styles";

const { height } = Dimensions.get("window");

const BiometricAuth = () => {
  const { handleBiometricAuth, isBiometricDone } = useBiometricAuth();
  const translateY = useSharedValue<number>(0);
  const hasTriggered = useSharedValue<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const openModal = () => {
    setIsModalVisible(true);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    [],
  );

  const swipeUp = Gesture.Pan()
    .onBegin(() => {
      translateY.value = withTiming(0);
      hasTriggered.value = false;
    })
    .onChange((event) => {
      if (event.translationY > 0) {
        translateY.value = withTiming(0);
      } else if (event.translationY > -height / 4) {
        translateY.value = event.translationY;
        if (!hasTriggered.value) {
          hasTriggered.value = true;
          runOnJS(openModal)();
        }
      }
    })
    .onFinalize(() => {
      translateY.value = withTiming(0);
      hasTriggered.value = false;
    });

  const animatedSwipeupStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, -height / 4], [1, 0]);
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity,
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <GradientWrapper>
        <AppLogo style={styles.appLogo} />

        <GestureDetector gesture={swipeUp}>
          <Animated.View style={[styles.innerContainer, animatedSwipeupStyle]}>
            <View style={styles.circleContainer}>
              <AntDesign name="arrowup" size={iconSize} style={styles.iconStyle} />
            </View>
            <AppText text="Swipe up to sign in" />
          </Animated.View>
        </GestureDetector>

        <BiometricAuthModal
          isVisible={isModalVisible}
          isBiometricDone={isBiometricDone}
          snapPoints={snapPoints}
          bottomSheetRef={bottomSheetRef}
          renderBackdrop={renderBackdrop}
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
  iconStyle: {
    color: colorPalette.primaryBg.primaryLightGreen,
  },
  circleContainer: {
    backgroundColor: colorPalette.primaryBg.swipeButtonBg,
    marginVertical: Spacing.sm,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
  },
});
