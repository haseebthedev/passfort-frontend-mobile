import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "@/utils";
import { usePasswordStore } from "@/store";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, LoadingIndicator, RippleWrapper, SmallAppButton } from "@/components";
import { PasswordItemType } from "@/interfaces";

const iconSize = wp(5.5);

const PasswordDetail = () => {
  const { isLoading, deletePassword, getPasswordById } = usePasswordStore();
  const { item } = useLocalSearchParams<{ item?: string }>();
  const [passwordDetail, setPasswordDetail] = useState<PasswordItemType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const passwordItem = typeof item === "string" ? JSON.parse(item) : null;

  const onBackPress = useCallback(() => router.back(), []);

  const onDeletePasswordPress = async () => {
    try {
      if (passwordDetail) {
        await deletePassword(passwordDetail.id);
        router.back();
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const copyToClipboard = () => {
    if (passwordDetail?.password) {
      Clipboard.setStringAsync(passwordDetail.password);
    }
  };

  const onEditPasswordPress = async () => {
    router.push({
      pathname: "/CreatePassword",
      params: { passwordItem: JSON.stringify(passwordDetail) },
    });
  };

  const refreshPasswordData = async () => {
    if (!passwordItem?.id) return;
    
    try {
      setIsRefreshing(true);
      const updatedData = await getPasswordById(passwordItem.id);
      if (updatedData) {
        setPasswordDetail(updatedData);
      }
    } catch (err) {
      console.log("Error refreshing password data: ", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getPasswordItemById = async () => {
    if (passwordItem?.id) {
      await getPasswordById(passwordItem.id).then((res) => setPasswordDetail(res));
    } else if (passwordItem) {
      setPasswordDetail(passwordItem);
    }
  };

  const onSharePress = async () => {
    if (!passwordDetail) return;

    const shareContent = {
      title: 'Password Details',
      message: 
`Platform: ${passwordDetail.platform || 'N/A'}
${passwordDetail.siteAddress ? `Site: ${passwordDetail.siteAddress}` : ''}
${passwordDetail.username ? `Username: ${passwordDetail.username}` : ''}
Password: ${passwordDetail.password || 'N/A'}`
    };

    try {
      await Share.share(shareContent);
    } catch (error) {
      console.log('Error sharing password details:', error);
    }
  };

  useEffect(() => {
    getPasswordItemById();
  }, []);

  useEffect(() => {
    if (item) {
      refreshPasswordData();
    }
  }, [item]);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
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
            <Feather 
              name="refresh-cw" 
              size={iconSize} 
              color={colorPalette.primaryBg.primaryWhite} 
            />
          </RippleWrapper>
        }
      />

      {isLoading || isRefreshing ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {passwordDetail?.type.title && (
              <View style={styles.infoContainer}>
                <AppText text="Type" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordDetail?.type.title} type="default" />
              </View>
            )}

            {passwordDetail?.platform && (
              <View style={styles.infoContainer}>
                <AppText text="Platform" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordDetail?.platform} type="default" />
              </View>
            )}

            {passwordDetail?.siteAddress && (
              <View style={styles.infoContainer}>
                <AppText text="Site Address" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordDetail.siteAddress} type="default" />
              </View>
            )}

            {passwordDetail?.username && (
              <View style={styles.infoContainer}>
                <AppText text="Username" type="subHeading" style={styles.infoHeading} />
                <AppText text={passwordDetail.username} type="default" />
              </View>
            )}
          </View>

          <View style={styles.passwordActionContainer}>
            <AppText text={passwordDetail?.password ?? ""} type="passwordText" numberOfLines={1} />
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
                onPress={onSharePress}
                style={styles.buttonContainer}
                containerStyle={styles.containerStyle}
              >
                <Fontisto 
                  name="share-a" 
                  size={iconSize - wp(1)} 
                  color={colorPalette.primaryBg.primaryWhite} 
                />
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
