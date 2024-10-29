import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { AppFont, hp, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, KeyboardResponsiveHOC, TextInput } from "@/components";

const CreatePassword = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC>
        <AppHeader title="New Password" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
        <View style={styles.container}>
          <AppText text="Credentials" type="label" style={styles.heading} />
          <AppText text="Type" type="subHeading" style={styles.infoHeading} />
          <TextInput placeholder="Select" />

          <AppText text="Platform" type="subHeading" style={styles.infoHeading} />
          <TextInput placeholder="Enter Your Platform" />

          <AppText text="Site Address" type="subHeading" style={styles.infoHeading} />
          <TextInput placeholder="http://" />

          <AppText text="Email / Username" type="subHeading" style={styles.infoHeading} />
          <TextInput placeholder="Enter Your email" />

          <AppText text="Password" type="subHeading" style={styles.infoHeading} />
          <TextInput placeholder="******" icon="cycle" />

          <AppButton text="Save" onPress={() => router.push(Screens.GeneratedPassword)} />
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    height: hp(85),
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(2),
    padding: Spacing.md,
    marginTop: Spacing.xs,
  },
  heading: {
    fontFamily: AppFont.semiBold,
    marginBottom: Spacing.smd,
  },
  infoHeading: {
    color: colorPalette.primaryBg.secondayGrey,
    marginBottom: Spacing.xs,
  },
});
