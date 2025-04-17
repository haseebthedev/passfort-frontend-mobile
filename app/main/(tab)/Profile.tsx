import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, FlatList, ImageSourcePropType } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { profilePicture } from "@/assets";
import { capitalize, wp } from "@/utils";
import { PasswordGroup, UserI } from "@/interfaces";
import { colorPalette, Spacing } from "@/styles";
import { useAuthStore, usePasswordStore } from "@/store";
import { AppButton, AppHeader, AppText, GradientWrapper, PasswordCard } from "@/components";

const Profile = () => {
  const { user } = useAuthStore();
  const { getGroupedPasswords, isLoading } = usePasswordStore();
  const [groupedPassword, setGroupedPassword] = useState<PasswordGroup[]>([]);

  const userInfo: UserI = {
    name: user?.name ?? "N/A",
    email: user?.email ?? "N/A",
    country: user?.country ?? "N/A",
  };

  const profileImage: ImageSourcePropType = user?.profilePicture ? { uri: user?.profilePicture } : profilePicture;

  const onEditProfilePress = () => router.push(Screens.EditProfile);

  const getAllGroupedPasswords = async () => {
    try {
      const response = await getGroupedPasswords();

      if (response.result) {
        setGroupedPassword(response.result);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAllGroupedPasswords();
  }, []);

  return (
    <GradientWrapper style={styles.mainContainer}>
      <AppHeader title="Profile" rightIconName="settings" onRightIconPress={() => router.push(Screens.Settings)} />

      <View style={styles.container}>
        <Image source={profileImage} style={styles.profilePicture} />
        <AppText text={`${user?.name ?? "User Name"}`} type="heading" />
        <AppButton text="Edit profile" preset="primaryLink" onPress={onEditProfilePress} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={groupedPassword ?? []}
          renderItem={({ item }) => <PasswordCard item={item} />}
          // keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.passwordCardsContainer}
        />
      </View>
      <View style={styles.personalInfoContainer}>
        {Object.entries(userInfo).map(([key, value]) => (
          <View key={key}>
            <AppText text={capitalize(key)} type="subHeading" style={styles.infoHeading} />
            <AppText text={String(value) ?? ""} type="detail" numberOfLines={1} />
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
  profilePicture: {
    width: wp(26),
    height: wp(26),
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: wp(26),
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
});
