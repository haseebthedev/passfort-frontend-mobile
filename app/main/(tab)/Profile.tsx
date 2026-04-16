import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { router } from "expo-router";
import { Theme } from "@/interfaces";
import { Screens } from "@/enums";
import { capitalize, hp, wp } from "@/utils";
import { useProfile, useTheme } from "@/hooks";
import { colorPalette, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, LoadingIndicator, PasswordCategory } from "@/components";

const PROFILE_IMAGE_SIZE = wp(26);

const Profile = () => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);
  const { userInfo, profileImage, groupedPassword, isLoading, handleEditProfile } = useProfile();

  return (
    <GradientWrapper>
      <AppHeader title="Profile" rightIconName="settings" onRightIconPress={() => router.push(Screens.Settings)} />

      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <Image source={profileImage} style={styles.profilePicture} />
        </View>
        <AppText text={`${userInfo.name}`} type="heading" />
        <AppButton text="Edit profile" preset="primaryLink" onPress={handleEditProfile} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={groupedPassword ?? []}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <PasswordCategory item={item} />}
          contentContainerStyle={styles.passwordCardsContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <AppText text="No password categories found" type="subHeading" style={styles.emptyText} />
              )}
            </View>
          }
        />
      </View>
      <View style={styles.personalInfoContainer}>
        {Object.entries(userInfo).map(([key, value]) => (
          <View key={key}>
            <AppText text={capitalize(key)} type="subHeading" style={styles.infoHeading} />
            <AppText text={String(value) ?? "N/A"} type="detail" numberOfLines={1} />
          </View>
        ))}
      </View>
    </GradientWrapper>
  );
};

export default Profile;

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
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
      gap: Spacing.sm,
    },
    personalInfoContainer: {
      padding: Spacing.md,
      borderWidth: wp(0.1),
      backgroundColor: theme.cardBg,
      borderColor: theme.cardsBorder,
      borderRadius: Spacing.xs,
      marginVertical: Spacing.xs,
      gap: Spacing.md,
      elevation: theme.elevation,
    },
    infoHeading: {
      color: theme.subHeading,
      marginBottom: Spacing.xxs,
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
      textAlign: "center",
    },
  });
