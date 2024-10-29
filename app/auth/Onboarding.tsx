import React from "react";
import { Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { hp, wp } from "@/utils";
import { Screens } from "@/enums";
import { OnboardingData } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppText, GradientWrapper } from "@/components";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push(Screens.Home);
    }
  };

  const handleSkip = () => {
    router.push(Screens.Home);
  };

  return (
    <GradientWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
      <Image source={OnboardingData[currentIndex].image} style={styles.image} />
      <AppText text={OnboardingData[currentIndex].title} type="primaryTitle" />
      <AppText text={OnboardingData[currentIndex].subtitle} type="label" style={styles.textStyle} />

      <AppButton text={currentIndex < OnboardingData.length - 1 ? "Next" : "Get Started"} onPress={handleNext} />
      <AppButton
        text="Skip"
        onPress={handleSkip}
        preset="link"
        style={styles.skipButton}
        textStyle={styles.skipButtonText}
      />
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: wp(80),
    height: wp(80),
    resizeMode: "contain",
    marginVertical: Spacing.xl,
    alignSelf: "center",
  },
  textStyle: {
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: hp(3.6),
  },
  skipButton: {
    marginTop: Spacing.xl,
  },
  skipButtonText: {
    color: colorPalette.primaryBg.primaryWhite,
  },
  buttonText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colorPalette.primaryBg.primaryWhite,
  },
});

export default Onboarding;
