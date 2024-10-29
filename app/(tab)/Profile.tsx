import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { profilePicture } from "@/assets";
import { capitalize, hp, wp } from "@/utils";
import { PasswordCard_Data, UserInfo_Data } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, PasswordCard } from "@/components";
import { Screens } from "@/enums";

const Profile = () => {
  const { user } = useAuthStore();
  const onEditProfilePress = () => router.push(Screens.EditProfile);

  return (
    <GradientWrapper style={styles.mainContainer}>
      <AppHeader
        title="Profile"
        rightIconName="settings"
        onRightIconPress={() => router.push(Screens.Settings)}
        containerStyle={LayoutStyles.horizontalSpacing}
      />

      <View style={styles.container}>
        <Image source={profilePicture} style={styles.profilePicture} />
        <AppText text={`${user?.name ?? "User Name"}`} type="heading" />
        <AppButton
          text="Edit profile"
          preset="link"
          style={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={onEditProfilePress}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={PasswordCard_Data}
          renderItem={({ item }) => <PasswordCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.passwordCardsContainer}
        />
      </View>
      <View style={styles.personalInfoContainer}>
        {Object.entries(UserInfo_Data).map(([key, value]) => (
          <View key={key}>
            <AppText text={capitalize(key)} type="subHeading" style={styles.infoHeading} />
            <AppText text={value} type="detail" numberOfLines={1} />
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
  },
  editButton: {
    marginVertical: Spacing.xs,
  },
  editButtonText: {
    fontSize: hp(1.8),
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
    marginBottom: hp(0.5),
    fontWeight: "500",
  },
});
