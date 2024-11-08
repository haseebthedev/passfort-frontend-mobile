import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "@/utils";
import { PasswordItemType } from "@/interfaces";
import { PasswordItem_Data } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, RippleWrapper, SmallAppButton } from "@/components";

const iconSize = wp(5.5);

const PasswordDetail = () => {
  const { id } = useLocalSearchParams();
  const [passwordDetails, setPasswordDetails] = useState<PasswordItemType | null>(null);

  useEffect(() => {
    const password = PasswordItem_Data.find((item) => item.id === id);
    setPasswordDetails(password ?? null);
  }, [id]);

  const handleBackPress = useCallback(() => router.back(), []);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Password Details" leftIconName="chevron-back" onLeftIconPress={handleBackPress} />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <AppText text="Type" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails?.type ?? ""} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Platform" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails?.platform ?? ""} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Site Address" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails?.address ?? ""} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Usermame" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails?.username ?? ""} type="default" />
          </View>
          <View style={styles.infoContainer}>
            <AppText text="Email" type="subHeading" style={styles.infoHeading} />
            <AppText text={passwordDetails?.email ?? ""} type="default" />
          </View>
        </View>

        <View style={styles.passwordActionContainer}>
          <AppText text={passwordDetails?.passwordText ?? ""} type="passwordText" />
          <SmallAppButton text="Copy" onPress={() => {}} />

          <View style={styles.buttonsContainer}>
            <RippleWrapper
              onPress={() => console.log("Trash icon pressed")}
              style={styles.buttonContainer}
              containerStyle={styles.containerStyle}
            >
              <Feather name="trash-2" size={iconSize} color={colorPalette.primaryBg.primaryWhite} />
            </RippleWrapper>
            <RippleWrapper
              onPress={() => console.log("Edit icon pressed")}
              style={styles.buttonContainer}
              containerStyle={styles.containerStyle}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={iconSize}
                color={colorPalette.primaryBg.primaryWhite}
              />
            </RippleWrapper>
            <RippleWrapper
              onPress={() => console.log("Share icon pressed")}
              style={styles.buttonContainer}
              containerStyle={styles.containerStyle}
            >
              <Fontisto name="share-a" size={iconSize - wp(1)} color={colorPalette.primaryBg.primaryWhite} />
            </RippleWrapper>
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
    color: colorPalette.primaryBg.secondayGrey,
  },
  passwordActionContainer: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  buttonContainer: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.secondaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
  },
  containerStyle: {
    borderRadius: Spacing.xl,
  },
});
