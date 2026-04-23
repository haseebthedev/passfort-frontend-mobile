import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePasswordDetail, useTheme } from "@/hooks";
import { hp, wp } from "@/utils";
import { colorPalette } from "@/theme";
import { Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, LoadingIndicator, RippleWrapper } from "@/components";
import { IconButtonPropsI, InfoItemPropsI, PasswordActionsPropsI, PasswordInfoPropsI, Theme } from "@/interfaces";

const iconSize = wp(5.5);

const InfoItem = ({ label, value, theme, style }: InfoItemPropsI) => {
  if (!value) return null;

  return (
    <View style={style}>
      <AppText text={label} type="subHeading" />
      <AppText text={value} type="default" />
    </View>
  );
};

const IconButton = ({ iconName, IconComponent, onPress, sizeOverride, theme, mode, buttonStyle, containerStyle }: IconButtonPropsI) => {
  const iconProps = {
    name: iconName as any,
    size: sizeOverride ?? iconSize,
    color: theme.icon,
  };

  return (
    <RippleWrapper onPress={onPress} style={buttonStyle} containerStyle={containerStyle}>
      <IconComponent {...iconProps} />
    </RippleWrapper>
  );
};

const PasswordInfo = ({ passwordDetail, theme, styles }: PasswordInfoPropsI) => (
  <View style={styles.innerContainer}>
    <InfoItem label="Type" value={passwordDetail?.type?.title} theme={theme} style={styles.infoContainer} />
    <InfoItem label="Platform" value={passwordDetail?.platform} theme={theme} style={styles.infoContainer} />
    <InfoItem label="Site Address" value={passwordDetail?.siteAddress} theme={theme} style={styles.infoContainer} />
    <InfoItem label="Username" value={passwordDetail?.username} theme={theme} style={styles.infoContainer} />
  </View>
);

const PasswordActions = ({ passwordDetail, onCopy, onDelete, onEdit, onShare, theme, mode, styles }: PasswordActionsPropsI) => (
  <View style={styles.passwordActionContainer}>
    {passwordDetail?.passwordText && <AppText text={passwordDetail.passwordText} type="passwordText" numberOfLines={1} />}
    <AppButton text="Copy" preset="filled" onPress={onCopy} style={styles.actionButton} />
    <View style={styles.buttonsContainer}>
      <IconButton
        iconName="trash-2"
        IconComponent={Feather}
        onPress={onDelete}
        theme={theme}
        mode={mode}
        buttonStyle={styles.buttonContainer}
        containerStyle={styles.containerStyle}
      />
      <IconButton
        iconName="square-edit-outline"
        IconComponent={MaterialCommunityIcons}
        onPress={onEdit}
        theme={theme}
        mode={mode}
        buttonStyle={styles.buttonContainer}
        containerStyle={styles.containerStyle}
      />
      <IconButton
        iconName="share-a"
        IconComponent={Fontisto}
        onPress={onShare}
        sizeOverride={iconSize - wp(1)}
        theme={theme}
        mode={mode}
        buttonStyle={styles.buttonContainer}
        containerStyle={styles.containerStyle}
      />
    </View>
  </View>
);

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

  console.log("detail === ", passwordDetail);

  const onBackPress = useCallback(() => router.back(), []);

  return (
    <GradientWrapper>
      <AppHeader
        title="Password Details"
        leftIconName="chevron-back"
        onLeftIconPress={onBackPress}
        rightAccessory={
          <RippleWrapper onPress={refreshPasswordData} style={styles.refreshButton} containerStyle={styles.refreshButtonContainer}>
            <Feather name="refresh-cw" size={iconSize} color={theme.icon} />
          </RippleWrapper>
        }
      />

      {isLoading || isRefreshing ? (
        <LoadingIndicator />
      ) : passwordDetail ? (
        <View style={styles.container}>
          <PasswordInfo passwordDetail={passwordDetail} theme={theme} styles={styles} />
          <PasswordActions
            passwordDetail={passwordDetail}
            onCopy={handleCopyToClipboard}
            onDelete={handleDeletePassword}
            onEdit={handleEditPassword}
            onShare={handleSharePassword}
            theme={theme}
            mode={mode}
            styles={styles}
          />
        </View>
      ) : null}
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
      elevation: theme.elevation,
    },
    innerContainer: {
      borderWidth: wp(0.2),
      borderColor: theme.cardsBorder,
      backgroundColor: mode === "dark" ? colorPalette.primaryBg.secondaryLightGreenBg : colorPalette.primaryBg.primaryWhite,
      borderRadius: hp(2.1),
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.md,

      elevation: theme.elevation,
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
    actionButton: {
      width: wp(40),
    },
    buttonsContainer: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
    buttonContainer: {
      width: wp(12),
      height: wp(12),
      borderRadius: wp(7),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: wp(0.2),
      backgroundColor: mode === "dark" ? colorPalette.primaryBg.secondaryLightGreenBg : colorPalette.primaryBg.secondaryLightGreen,
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
