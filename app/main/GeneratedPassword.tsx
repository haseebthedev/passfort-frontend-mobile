import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { PasswordStats_Data } from "@/constants";
import { useGeneratePassword, useTheme } from "@/hooks";
import { AppFont, handleCharacterChange, hp, wp } from "@/utils";
import { colorPalette, getPasswordTypeContainerStyle, getPasswordTypeTextStyle, iconSize, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, ArcSlider, GradientWrapper, PasswordStatCard, RippleWrapper, SmallAppButton } from "@/components";
import { Theme } from "@/interfaces";

const GeneratedPassword = () => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);

  const { count, selectedCard, passwordStats, randomPassword, passwordType, setPasswordStats, handleCardPress, generatePassword } =
    useGeneratePassword();

  const copyToClipboard = () => {
    if (randomPassword) {
      Clipboard.setStringAsync(randomPassword);
      router.back();
    }
  };

  return (
    <GradientWrapper>
      <AppHeader title="Generate" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.headingContainer}>
        <AppText text="New Password" type="label" style={styles.heading} />
      </View>

      <View style={[styles.passwordTypeContainer, getPasswordTypeContainerStyle(passwordType)]}>
        <AppText text={passwordType} style={getPasswordTypeTextStyle(passwordType)} type="regularSubHeading" />
      </View>

      <ArcSlider count={count} />

      <View style={styles.passwordDetails}>
        <AppText
          text={selectedCard ? passwordStats.find((stat) => stat.id === selectedCard.id)?.label || "Select" : "Select"}
          style={styles.passwordDetailLabel}
          type="label"
        />
        <AppText
          text={selectedCard ? passwordStats.find((stat) => stat.id === selectedCard.id)?.number || "00" : "00"}
          type="passwordLength"
        />

        <View style={styles.arrowButtons}>
          <RippleWrapper
            containerStyle={styles.arrowButtonContainer}
            style={styles.actionButton}
            disabled={selectedCard ? false : true}
            onPress={() => handleCharacterChange("decrement", selectedCard?.label || "Characters", setPasswordStats)}
          >
            <Ionicons name="chevron-back" style={LayoutStyles(theme).headerIcon} size={iconSize} />
          </RippleWrapper>
          <RippleWrapper
            containerStyle={styles.arrowButtonContainer}
            style={styles.actionButton}
            disabled={selectedCard ? false : true}
            onPress={() => handleCharacterChange("increment", selectedCard?.label || "Characters", setPasswordStats)}
          >
            <Ionicons name="chevron-forward" style={LayoutStyles(theme).headerIcon} size={iconSize} />
          </RippleWrapper>
        </View>
      </View>

      <View style={styles.passwordInfo}>
        <View style={styles.passwordStatCards}>
          {PasswordStats_Data.map((_, index) => (
            <PasswordStatCard
              item={passwordStats[index]}
              key={passwordStats[index].id}
              isSelected={passwordStats[index].id === selectedCard?.id}
              onPress={() => handleCardPress(passwordStats[index])}
            />
          ))}
        </View>

        <AppText text={randomPassword} type="passwordText" style={styles.passwordText} />
        <View style={styles.buttonContainer}>
          <SmallAppButton text="Copy" onPress={copyToClipboard} />
          <SmallAppButton text="Generate" onPress={generatePassword} />
        </View>
      </View>
    </GradientWrapper>
  );
};

export default GeneratedPassword;

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
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
      // backgroundColor: mode === "dark" ? colorPalette.primaryBg.primaryText : colorPalette.primaryBg.lightGreen,
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
      borderColor: theme.cardsBorder,
    },
    passwordDetails: {
      alignItems: "center",
      justifyContent: "center",
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
      borderColor: theme.cardsBorder,
      backgroundColor: mode === "dark" ? colorPalette.primaryBg.primaryText : colorPalette.primaryBg.primaryWhite,
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
    buttonContainer: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
  });
