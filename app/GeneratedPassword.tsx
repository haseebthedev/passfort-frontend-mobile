import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { AppFont, hp, wp } from "@/utils";
import { colorPalette, Fonts, iconSize, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, PasswordStatCard } from "@/components";

const GeneratedPassword = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Generate" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
      <View style={styles.headingContainer}>
        <AppText text="New Password" type="label" style={styles.heading} />

        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.reGenerateIcon}>
            <Entypo name="cycle" size={iconSize} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.container}>
        <View style={styles.passwordTypeContainer}>
          <AppText text="STRONG" style={styles.passwordTypeText} type="regularSubHeading" />
        </View>

        {/* Graph */}
        <View style={styles.graphContainer}>
          <View style={styles.graph}></View>

          <View style={styles.passwordDetails}>
            <AppText text="Characters" style={{ fontFamily: AppFont.semi_bold }} type="label" />
            <AppText text="20" style={styles.lengthOfPassword} />

            <View style={styles.arrowButtons}>
              <TouchableWithoutFeedback>
                <View style={styles.arrowButtonContainer}>
                  <Ionicons name="chevron-back" style={LayoutStyles.headerIcon} size={iconSize} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.arrowButtonContainer}>
                  <Ionicons name="chevron-forward" style={LayoutStyles.headerIcon} size={iconSize} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        <View style={styles.passwordStatCards}>
          <PasswordStatCard label="Characters" number={10} />
          <PasswordStatCard label="Numbers" number={5} />
          <PasswordStatCard label="Symbols" number={4} />
        </View>

        <AppText text={"S2fh4ngj4@"} type="passwordText" style={styles.passwordText} />
        <AppButton text="Copy" style={styles.copyButton} />
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
  reGenerateIcon: {
    backgroundColor: colorPalette.primaryBg.secondaryLightGreen,
    width: wp(11),
    height: wp(11),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: colorPalette.primaryBg.secondayGrey,
  },
  copyButton: {
    paddingVertical: 0,
    width: wp(40),
    height: hp(5.8),
    borderRadius: hp(2),
  },
  passwordTypeContainer: {
    borderWidth: wp(0.2),
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: wp(10),
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    backgroundColor: colorPalette.primaryBg.buttonText,
  },
  passwordTypeText: {
    color: colorPalette.primaryBg.secondaryLightGreen,
  },
  graphContainer: {
    marginTop: Spacing.smd,
    marginBottom: Spacing.lg,
  },
  graph: {
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
    top: 30,
  },
  lengthOfPassword: {
    fontSize: hp(8.6),
    fontFamily: AppFont.bold,
  },
  arrowButtons: {
    flexDirection: "row",
    gap: Spacing.smd,
  },
  arrowButtonContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(0.2),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.buttonText,
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
});
