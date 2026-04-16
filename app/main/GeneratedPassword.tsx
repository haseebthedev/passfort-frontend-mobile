import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useGeneratePassword, useTheme } from "@/hooks";
import { AppFont, handleCharacterChange, hp, wp } from "@/utils";
import { colorPalette, getPasswordTypeContainerStyle, getPasswordTypeTextStyle, iconSize, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, ArcSlider, GradientWrapper, PasswordStatCard, RippleWrapper } from "@/components";
import { Theme } from "@/interfaces";

const GeneratedPassword = () => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);

  const { count, selectedCard, passwordStats, randomPassword, passwordType, setPasswordStats, handleCardPress, generatePassword } =
    useGeneratePassword();

  const selectedStat = useMemo(() => {
    return selectedCard ? passwordStats.find((stat) => stat.id === selectedCard.id) : null;
  }, [selectedCard, passwordStats]);

  const handleCopy = async () => {
    if (!randomPassword) return;
    await Clipboard.setStringAsync(randomPassword);
    router.back();
  };

  const handleChange = (type: "increment" | "decrement") => {
    if (!selectedStat) return;

    handleCharacterChange(type, selectedStat.label || "Characters", setPasswordStats);
  };

  return (
    <GradientWrapper>
      <AppHeader title="Generate" leftIconName="chevron-back" onLeftIconPress={router.back} />

      {/* Heading */}
      <View style={styles.headingContainer}>
        <AppText text="New Password" type="default" style={styles.heading} />
      </View>

      {/* Password Type */}
      <View style={[styles.passwordTypeContainer, getPasswordTypeContainerStyle(passwordType)]}>
        <AppText text={passwordType} style={getPasswordTypeTextStyle(passwordType)} type="default" />
      </View>

      {/* Slider */}
      <ArcSlider count={count}>
        <View style={styles.passwordDetails}>
          <AppText text={selectedStat?.label || "Select"} style={styles.passwordDetailLabel} type="default" />
          <AppText text={selectedStat?.number || "00"} type="passwordLength" />

          <View style={styles.arrowButtons}>
            {["decrement", "increment"].map((type) => (
              <RippleWrapper
                key={type}
                containerStyle={styles.arrowButtonContainer}
                disabled={!selectedStat}
                onPress={() => handleChange(type as "increment" | "decrement")}
              >
                <Ionicons
                  name={type === "increment" ? "chevron-forward" : "chevron-back"}
                  style={LayoutStyles(theme).headerIcon}
                  size={iconSize}
                />
              </RippleWrapper>
            ))}
          </View>
        </View>
      </ArcSlider>

      {/* Stats Section */}
      <View style={styles.passwordInfo}>
        <View style={styles.passwordStatCards}>
          {passwordStats.map((item) => (
            <PasswordStatCard key={item.id} item={item} isSelected={item.id === selectedCard?.id} onPress={() => handleCardPress(item)} />
          ))}
        </View>
      </View>

      <AppText text={randomPassword} type="passwordText" style={styles.passwordText} />

      {/* Action Buttons */}

      <View style={styles.buttonContainer}>
        <View style={styles.actionButtonContainer}>
          <AppButton text="Copy" preset="filled" onPress={handleCopy} />
        </View>
        <View style={styles.actionButtonContainer}>
          <AppButton text="Generate" preset="filled" onPress={generatePassword} />
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
      margin: Spacing.sm,
      borderWidth: wp(0.2),
      borderRadius: wp(10),
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.md,
      // backgroundColor: mode === "dark" ? colorPalette.primaryBg.primaryText : colorPalette.primaryBg.lightGreen,
      alignSelf: "center",
    },
    passwordDetails: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: 0,
      right: 0,
      top: hp(26),
    },
    passwordDetailLabel: {
      fontFamily: AppFont.semiBold,
    },
    arrowButtons: {
      flexDirection: "row",
      gap: Spacing.smd,
    },
    arrowButtonContainer: {
      width: wp(10),
      height: wp(10),
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
      height: hp(10),
    },
    passwordStatCards: {
      flexDirection: "row",
      gap: wp(2.5),
    },
    passwordText: {
      marginBottom: Spacing.smd,
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
    actionButtonContainer: { flex: 1 },
  });
