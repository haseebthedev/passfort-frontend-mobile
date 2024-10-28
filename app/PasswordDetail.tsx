import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "@/utils";
import { PasswordItemType } from "@/interfaces";
import { PasswordItem_Data } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper } from "@/components";

const iconSize = wp(5.5);

const PasswordDetail = () => {
  const { id } = useLocalSearchParams();
  const [passwordDetails, setPasswordDetails] = useState<PasswordItemType>({
    icon: undefined,
    username: "",
    email: "",
    id: "",
    passwordText: "",
    type: "App",
    platform: "",
    address: "",
  });

  useEffect(() => {
    const password = PasswordItem_Data.find((item) => item.id === id);
    if (password) {
      setPasswordDetails(password);
    }
  }, []);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Password Details" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <AppText text="Type" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails.type} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Platform" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails.platform} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Site Address" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails.address} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Usermame" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails.username} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Email" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails.email} type="default" />
          </View>
        </View>

        <View style={styles.passwordActionContainer}>
          <AppText text={passwordDetails.passwordText} type="passwordText" />
          <AppButton text="Copy" style={styles.copyButton} />

          <View style={styles.buttonsContainer}>
            <TouchableWithoutFeedback onPress={() => console.log("Trash icon pressed")}>
              <View style={styles.buttonContainer}>
                <Feather name="trash-2" size={iconSize} color={colorPalette.primaryBg.primaryWhite} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log("Edit icon pressed")}>
              <View style={styles.buttonContainer}>
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={iconSize}
                  color={colorPalette.primaryBg.primaryWhite}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log("Share icon pressed")}>
              <View style={styles.buttonContainer}>
                <Fontisto name="share-a" size={iconSize - wp(1)} color={colorPalette.primaryBg.primaryWhite} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </GradientWrapper>
  );
};

export default PasswordDetail;

const styles = StyleSheet.create({
  container: {
    height: hp(85),
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(2),
    padding: Spacing.xs,
    marginTop: Spacing.xs,
  },
  innerContainer: {
    height: hp(57),
    borderWidth: wp(0.2),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.secondaryLightGreenBg,
    borderRadius: hp(2.1),
    paddingHorizontal: Spacing.md,
  },
  infoContainer: {
    marginTop: Spacing.lg,
    gap: Spacing.sm,
    borderBottomWidth: hp(0.1),
    borderBlockColor: colorPalette.primaryBg.borderColor2,
    paddingBottom: hp(0.7),
  },
  infoHeading: {
    color: colorPalette.primaryBg.primaryGrey,
  },
  passwordActionContainer: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  buttonContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.secondaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
  },
  copyButton: {
    paddingVertical: 0,
    width: wp(40),
    height: hp(5.8),
    borderRadius: hp(2),
  },
});
