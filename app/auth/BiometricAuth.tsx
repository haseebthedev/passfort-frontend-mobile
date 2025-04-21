import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { hp, wp } from "@/utils";
import { useBiometricAuth } from "@/hooks";
import { AppLogo, AppText, GradientWrapper } from "@/components";
import { colorPalette, iconSize, LayoutStyles, Spacing } from "@/styles";

const { height } = Dimensions.get("window");

const BiometricAuth = () => {
  const { handleBiometricAuth } = useBiometricAuth();
  const translateY = useSharedValue<number>(0);

  const swipeUp = Gesture.Pan()
    .onBegin(() => {
      translateY.value = withTiming(0);
    })
    .onChange((event) => {
      if (event.translationY > 0) {
        translateY.value = withTiming(0);
      } else if (event.translationY > -height / 4) {
        translateY.value = event.translationY;
        runOnJS(handleBiometricAuth)();
      }
    })
    .onFinalize(() => {
      translateY.value = 0;
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
      <GradientWrapper style={LayoutStyles.horizontalSpacing}>
        <AppLogo style={styles.appLogo} />

        <GestureDetector gesture={swipeUp}>
          <Animated.View style={[styles.innerContainer, animatedSwipeupStyle]}>
            <View style={styles.circleContainer}>
              <AntDesign
                name="arrowup"
                size={iconSize}
                style={styles.iconStyle}
              />
            </View>
            <AppText text="Swipe up to sign in" />
          </Animated.View>
        </GestureDetector>
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
