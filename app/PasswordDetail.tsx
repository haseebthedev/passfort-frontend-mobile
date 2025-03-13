import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "@/utils";
import { usePasswordStore } from "@/store";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, LoadingIndicator, RippleWrapper, SmallAppButton } from "@/components";

const iconSize = wp(5.5);

const PasswordDetail = () => {
  const { isLoading, deletePassword } = usePasswordStore();
  const { item } = useLocalSearchParams<{ item?: string }>();

  const passwordItem = typeof item === "string" ? JSON.parse(item) : null;

  const onBackPress = useCallback(() => router.back(), []);

  const onDeletePasswordPress = useCallback(async () => {
    try {
      await deletePassword(passwordItem?.id);
      router.back();
    } catch (err) {
      console.log("Error: ", err);
    }
  }, []);

  const copyToClipboard = () => {
    if (passwordItem) {
      Clipboard.setStringAsync(passwordItem?.password);
    }
  };

  const onEditPasswordPress = async () => {
    console.log("Edit icon pressed");
    router.push({
      pathname: "/CreatePassword",
      params: { passwordId: JSON.stringify(passwordItem.id) },
    });
  };

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Password Details" leftIconName="chevron-back" onLeftIconPress={onBackPress} />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {passwordItem?.type?.title && (
              <View style={styles.infoContainer}>
                <AppText text="Type" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordItem.type.title} type="default" />
              </View>
            )}

            {passwordItem?.platform && (
              <View style={styles.infoContainer}>
                <AppText text="Platform" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordItem.platform} type="default" />
              </View>
            )}

            {passwordItem?.siteAddress && (
              <View style={styles.infoContainer}>
                <AppText text="Site Address" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordItem.siteAddress} type="default" />
              </View>
            )}

            {passwordItem?.username && (
              <View style={styles.infoContainer}>
                <AppText text="Username" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordItem.username} type="default" />
              </View>
            )}

            {passwordItem?.email && (
              <View style={styles.infoContainer}>
                <AppText text="Email" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordItem.email} type="default" />
              </View>
            )}
          </View>

          <View style={styles.passwordActionContainer}>
            <AppText text={passwordItem?.password ?? ""} type="passwordText" numberOfLines={1} />
            <SmallAppButton text="Copy" onPress={copyToClipboard} />

            <View style={styles.buttonsContainer}>
              <RippleWrapper
                onPress={onDeletePasswordPress}
                style={styles.buttonContainer}
                containerStyle={styles.containerStyle}
              >
                <Feather name="trash-2" size={iconSize} color={colorPalette.primaryBg.primaryWhite} />
              </RippleWrapper>
              <RippleWrapper
                onPress={onEditPasswordPress}
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
      )}
    </GradientWrapper>
  );
};

export default PasswordDetail;

const styles = StyleSheet.create({
  container: {
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(2),
    padding: Spacing.xs,
    marginTop: Spacing.xs,
  },
  innerContainer: {
    borderWidth: wp(0.2),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.secondaryLightGreenBg,
    borderRadius: hp(2.1),
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
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
