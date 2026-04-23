import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { hp, wp } from "@/utils";
import { Screens } from "@/enums";
import { useAuthStore } from "@/store";
import { OnboardingData } from "@/constants";
import { Spacing } from "@/styles";
import { AppButton, AppText, GradientWrapper } from "@/components";

const Onboarding = () => {
  const { setFirstTimeUser } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFirstTimeUser(false);
      router.push(Screens.Signin);
    }
  };

  const handleSkip = () => {
    setFirstTimeUser(false);
    router.push(Screens.Signin);
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Image source={OnboardingData[currentIndex].image} style={styles.image} />
        <AppText text={OnboardingData[currentIndex].title} type="title" />
        <AppText text={OnboardingData[currentIndex].subtitle} type="default" style={styles.textStyle} />
      </View>

      <AppButton text={currentIndex < OnboardingData.length - 1 ? "Next" : "Get Started"} onPress={handleNext} />
      <AppButton text="Skip" onPress={handleSkip} preset="secondaryLink" />
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
});

export default Onboarding;
