import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { profilePicture } from "@/assets";
import { PasswordGroup, UserI } from "@/interfaces";
import { colorPalette, Spacing } from "@/styles";
import { capitalize, hp, showToast, wp } from "@/utils";
import { useAuthStore, usePasswordStore } from "@/store";
import {
  AppButton,
  AppHeader,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  PasswordCard,
} from "@/components";

const PROFILE_IMAGE_SIZE = wp(26);

const Profile = () => {
  const { user } = useAuthStore();
  const { getGroupedPasswords, isLoading } = usePasswordStore();
  const [groupedPassword, setGroupedPassword] = useState<PasswordGroup[]>([]);

  const userInfo: UserI = {
    name: user?.name ?? "N/A",
    email: user?.email ?? "N/A",
    country: user?.country ?? "N/A",
  };

  const profileImage: ImageSourcePropType = user?.profilePicture
    ? { uri: user?.profilePicture }
    : profilePicture;

  const onEditProfilePress = () => router.push(Screens.EditProfile);

  const getAllGroupedPasswords = async () => {
    try {
      const response = await getGroupedPasswords();

      if (response.result) {
        setGroupedPassword(response.result);
      }
    } catch (error) {
      showToast({
        type: "error",
        text1: `Error: , ${error}`,
      });
    }
  };

  useEffect(() => {
    getAllGroupedPasswords();
  }, []);

  return (
    <GradientWrapper style={styles.mainContainer}>
      <AppHeader
        title="Profile"
        rightIconName="settings"
        onRightIconPress={() => router.push(Screens.Settings)}
      />

      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <Image source={profileImage} style={styles.profilePicture} />
        </View>
        <AppText text={`${user?.name ?? "User Name"}`} type="heading" />
        <AppButton
          text="Edit profile"
          preset="primaryLink"
          onPress={onEditProfilePress}
        />
        {isLoading || groupedPassword.length === 0 ? (
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={groupedPassword ?? []}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <PasswordCard item={item} />}
            contentContainerStyle={styles.passwordCardsContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <AppText
                  text="No password categories found"
                  type="subHeading"
                  style={styles.emptyText}
                />
              </View>
            }
          />
        )}
      </View>
      <View style={styles.personalInfoContainer}>
        {Object.entries(userInfo).map(([key, value]) => (
          <View key={key}>
            <AppText
              text={capitalize(key)}
              type="subHeading"
              style={styles.infoHeading}
            />
            <AppText
              text={String(value) ?? ""}
              type="detail"
              numberOfLines={1}
            />
          </View>
        ))}
      </View>
    </GradientWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: Spacing.md,
  },
  container: {
    alignItems: "center",
  },
  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: PROFILE_IMAGE_SIZE + wp(2) * 2,
    height: PROFILE_IMAGE_SIZE + wp(2) * 2,
    borderRadius: (PROFILE_IMAGE_SIZE + wp(2) * 2) / 2,
    borderColor: colorPalette.primaryBg.primaryLightGreen,
    borderWidth: wp(0.5),
    marginBottom: Spacing.sm,
  },
  profilePicture: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
    position: "absolute",
    top: hp(-2.3),
  },
  passwordCardsContainer: {
    marginVertical: Spacing.md,
    gap: Spacing.md,
  },
  personalInfoContainer: {
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    padding: Spacing.md,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: Spacing.xs,
    marginVertical: Spacing.xs,
    gap: Spacing.md,
  },
  infoHeading: {
    color: colorPalette.primaryBg.primaryGrey,
    marginBottom: Spacing.xxs,
    fontWeight: "500",
  },
  loadingContainer: {
    height: wp(30),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.md,
  },
  emptyContainer: {
    width: wp(80),
    height: wp(30),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colorPalette.primaryBg.primaryGrey,
    textAlign: "center",
  },
});
