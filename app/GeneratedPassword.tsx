import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { PasswordStats_Data } from "@/constants";
import { PasswordStatType, PasswordType } from "@/interfaces";
import {
  colorPalette,
  getPasswordTypeContainerStyle,
  getPasswordTypeTextStyle,
  iconSize,
  LayoutStyles,
  Spacing,
} from "@/styles";
import {
  AppHeader,
  AppText,
  ArcSlider,
  GradientWrapper,
  PasswordStatCard,
  RippleWrapper,
  SmallAppButton,
} from "@/components";
import { AppFont, handleDecrement, handleIncrement, hp, updatePasswordType, wp } from "@/utils";

const GeneratedPassword = () => {
  const [passwordStats, setPasswordStats] = useState<PasswordStatType[]>(PasswordStats_Data);
  const [passwordType, setPasswordType] = useState<PasswordType>("WEAK");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardPress = (item: PasswordStatType) => setSelectedCard(item.id);

  const updatePasswordTypeCallback = useCallback(() => {
    const type = updatePasswordType(passwordStats);
    setPasswordType(type);
  }, [passwordStats]);

  useEffect(() => {
    updatePasswordTypeCallback();
  }, [passwordStats, updatePasswordTypeCallback]);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Generate" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.headingContainer}>
        <AppText text="New Password" type="label" style={styles.heading} />
        <RippleWrapper
          onPress={() => {}}
          containerStyle={styles.rippleContainer}
          rippleColor={colorPalette.primaryBg.primaryLightGreen}
          style={styles.reGenerateIcon}
        >
          <Entypo name="cycle" size={iconSize} />
        </RippleWrapper>
      </View>

      <View style={[styles.passwordTypeContainer, getPasswordTypeContainerStyle(passwordType)]}>
        <AppText text={passwordType} style={getPasswordTypeTextStyle(passwordType)} type="regularSubHeading" />
      </View>

      <ArcSlider />

      <View style={styles.passwordDetails}>
        <AppText
          text={selectedCard ? passwordStats.find((stat) => stat.id === selectedCard)?.label || "Select" : "Select"}
          style={styles.passwordDetailLabel}
          type="label"
        />
        <AppText
          text={selectedCard ? passwordStats.find((stat) => stat.id === selectedCard)?.number || "00" : "00"}
          type="passwordLength"
        />

        <View style={styles.arrowButtons}>
          <RippleWrapper
            containerStyle={styles.arrowButtonContainer}
            style={styles.actionButton}
            onPress={() => handleDecrement(selectedCard, passwordStats, setPasswordStats)}
          >
            <Ionicons name="chevron-back" style={LayoutStyles.headerIcon} size={iconSize} />
          </RippleWrapper>
          <RippleWrapper
            containerStyle={styles.arrowButtonContainer}
            style={styles.actionButton}
            onPress={() => handleIncrement(selectedCard, passwordStats, setPasswordStats)}
          >
            <Ionicons name="chevron-forward" style={LayoutStyles.headerIcon} size={iconSize} />
          </RippleWrapper>
        </View>
      </View>

      <View style={styles.passwordInfo}>
        <View style={styles.passwordStatCards}>
          {PasswordStats_Data.map((_, index) => (
            <PasswordStatCard
              item={passwordStats[index]}
              key={passwordStats[index].id}
              isSelected={passwordStats[index].id === selectedCard}
              onPress={() => handleCardPress(passwordStats[index])}
            />
          ))}
        </View>

        <AppText text={"S2fh4ngj4@"} type="passwordText" style={styles.passwordText} />
        <SmallAppButton text="Copy" onPress={() => {}} />
      </View>
    </GradientWrapper>
  );
};

export default GeneratedPassword;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  rippleContainer: { borderRadius: Spacing.lg },
  reGenerateIcon: {
    backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
    width: wp(11),
    height: wp(11),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "90deg" }],
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: colorPalette.primaryBg.secondayGrey,
  },
  passwordTypeContainer: {
    borderWidth: wp(0.2),
    borderRadius: wp(10),
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    backgroundColor: colorPalette.primaryBg.primaryText,
    alignSelf: "center",
  },
  sliderContainer: {
    marginTop: Spacing.smd,
    marginBottom: Spacing.lg,
  },
  slider: {
    height: wp(58),
    width: wp(58),
    borderRadius: wp(35),
    borderWidth: wp(0.2),
    borderColor: colorPalette.primaryBg.borderColor2,
  },
  passwordDetails: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: hp(32),
  },
  passwordDetailLabel: {
    fontFamily: AppFont.semiBold,
  },
  arrowButtons: {
    flexDirection: "row",
    gap: Spacing.smd,
  },
  arrowButtonContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(0.2),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.primaryText,
  },
  passwordInfo: {
    flex: 1,
    alignItems: "center",
    marginTop: -Spacing.sm,
  },
  passwordStatCards: {
    flexDirection: "row",
    gap: wp(2.5),
    marginVertical: Spacing.md,
    marginBottom: hp(8),
  },
  passwordText: {
    marginBottom: Spacing.smd,
  },
  actionButton: {
    width: wp(12),
    height: wp(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
