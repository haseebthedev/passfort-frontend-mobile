import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePasswordDetail, useTheme } from "@/hooks";
import { hp, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";
import {
  AppHeader,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  RippleWrapper,
  SmallAppButton,
} from "@/components";
import { Theme } from "@/interfaces";

const iconSize = wp(5.5);

const PasswordDetail = () => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);
  const {
    passwordDetail,
    isLoading,
    isRefreshing,
    refreshPasswordData,
    handleDeletePassword,
    handleSharePassword,
    handleEditPassword,
    handleCopyToClipboard,
  } = usePasswordDetail();
  const onBackPress = useCallback(() => router.back(), []);

  const renderInfo = (label: string, value?: string) => {
    if (!value) return null;
    return (
      <View style={styles.infoContainer}>
        <AppText text={label} type="subHeading" />
        <AppText text={value} type="default" />
      </View>
    );
  };

  const renderIconButton = (
    iconName: string,
    IconComponent:
      | typeof Feather
      | typeof Fontisto
      | typeof MaterialCommunityIcons,
    onPress: () => void,
    sizeOverride?: number
  ) => {
    const iconProps = {
      name: iconName as any,
      size: sizeOverride ?? iconSize,
      color: theme.icon,
    };

    return (
      <RippleWrapper
        onPress={onPress}
        style={styles.buttonContainer}
        containerStyle={styles.containerStyle}
      >
        <IconComponent {...iconProps} />
      </RippleWrapper>
    );
  };

  return (
    <GradientWrapper>
      <AppHeader
        title="Password Details"
        leftIconName="chevron-back"
        onLeftIconPress={onBackPress}
        rightAccessory={
          <RippleWrapper
            onPress={refreshPasswordData}
            style={styles.refreshButton}
            containerStyle={styles.refreshButtonContainer}
          >
            <Feather name="refresh-cw" size={iconSize} color={theme.icon} />
          </RippleWrapper>
        }
      />

      {isLoading || isRefreshing ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {renderInfo("Type", passwordDetail?.type?.title)}
            {renderInfo("Platform", passwordDetail?.platform)}
            {renderInfo("Site Address", passwordDetail?.siteAddress)}
            {renderInfo("Username", passwordDetail?.username)}
          </View>

          <View style={styles.passwordActionContainer}>
            {passwordDetail?.passwordText && (
              <AppText
                text={passwordDetail.passwordText}
                type="passwordText"
                numberOfLines={1}
              />
            )}

            <SmallAppButton text="Copy" onPress={handleCopyToClipboard} />

            <View style={styles.buttonsContainer}>
              {renderIconButton("trash-2", Feather, handleDeletePassword)}
              {renderIconButton(
                "square-edit-outline",
                MaterialCommunityIcons,
                handleEditPassword
              )}
              {renderIconButton(
                "share-a",
                Fontisto,
                handleSharePassword,
                iconSize - wp(1)
              )}
            </View>
          </View>
        </View>
      )}
    </GradientWrapper>
  );
};

export default PasswordDetail;

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
    container: {
      borderWidth: wp(0.2),
      backgroundColor: theme.cardBg,
      borderColor: theme.cardsBorder,
      borderRadius: hp(2),
      padding: Spacing.xs,
      marginTop: Spacing.xs,
    },
    innerContainer: {
      borderWidth: wp(0.2),
      borderColor: theme.cardsBorder,
      backgroundColor:
        mode === "dark"
          ? colorPalette.primaryBg.secondaryLightGreenBg
          : colorPalette.primaryBg.primaryLighterGreenBg,
      borderRadius: hp(2.1),
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.md,
    },
    infoContainer: {
      marginTop: Spacing.lg,
      gap: Spacing.sm,
      borderBottomWidth: hp(0.1),
      borderBlockColor: theme.cardsBorder,
      paddingBottom: hp(0.7),
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
      backgroundColor:
        mode === "dark"
          ? colorPalette.primaryBg.secondaryLightGreenBg
          : colorPalette.primaryBg.secondaryLightGreen,
      borderColor: theme.cardsBorder,
    },
    containerStyle: {
      borderRadius: Spacing.xl,
    },
    refreshButton: {
      width: wp(10),
      height: wp(10),
      alignItems: "center",
      justifyContent: "center",
    },
    refreshButtonContainer: {
      borderRadius: wp(5),
    },
  });
