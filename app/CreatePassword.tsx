import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { AppFont, hp, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, TextInput } from "@/components";

const CreatePassword = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
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

            <AppButton text="Save" style={styles.saveButton} onPress={() => router.push("/GeneratedPassword")} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontFamily: AppFont.semi_bold,
    marginBottom: Spacing.smd,
  },
  infoHeading: {
    color: colorPalette.primaryBg.secondayGrey,
    marginBottom: Spacing.xs,
  },
  saveButton: {
    width: wp(82),
  },
});
