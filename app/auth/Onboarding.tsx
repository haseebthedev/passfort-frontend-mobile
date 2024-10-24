import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";

import { wp } from "@/utils";
import { OnboardingData } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppText, GradientWrapper } from "@/components";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/(tab)/");
    }
  };

  const handleSkip = () => {
    router.push("/(tab)/");
  };

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <Image source={OnboardingData[currentIndex].image} style={styles.image} />

      <AppText text={OnboardingData[currentIndex].title} type="lgTitle" />
      <AppText text={OnboardingData[currentIndex].subtitle} type="default" style={styles.textStyle} />

      <View style={styles.buttonContainer}>
        <AppButton text={currentIndex < OnboardingData.length - 1 ? "Next" : "Get Started"} onPress={handleNext} />
        <AppButton
          text="Skip"
          onPress={handleSkip}
          preset="link"
          style={styles.skipButton}
          textStyle={styles.skipButtonText}
        />
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp(80),
    height: wp(80),
    resizeMode: "contain",
    marginVertical: Spacing.xl,
    alignSelf: "center",
  },
  textStyle: {
    textAlign: "center",
    marginTop: Spacing.md,
  },
  buttonContainer: {
    marginVertical: Spacing.xl,
  },
  skipButton: {
    marginTop: Spacing.lg,
  },
  skipButtonText: {
    color: colorPalette.primaryBg.shade00,
  },
  buttonText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colorPalette.primaryBg.shade00,
  },
});

export default Onboarding;
