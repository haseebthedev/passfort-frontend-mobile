import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { hp, wp } from "@/utils";
import { Screens } from "@/enums";
import { OnboardingData } from "@/constants";
import { LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppText, GradientWrapper } from "@/components";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push(Screens.Home);
    }
  };

  const handleSkip = () => router.push(Screens.Home);

  return (
    <GradientWrapper style={[LayoutStyles.horizontalSpacing]}>
      <View style={styles.container}>
        <Image source={OnboardingData[currentIndex].image} style={styles.image} />
        <AppText text={OnboardingData[currentIndex].title} type="primaryTitle" />
        <AppText text={OnboardingData[currentIndex].subtitle} type="label" style={styles.textStyle} />
      </View>

      <View style={styles.actionButtons}>
        <AppButton text={currentIndex < OnboardingData.length - 1 ? "Next" : "Get Started"} onPress={handleNext} />
        <AppButton text="Skip" onPress={handleSkip} preset="secondaryLink" />
      </View>
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
  actionButtons: {
    gap: Spacing.xl,
  },
});

export default Onboarding;
