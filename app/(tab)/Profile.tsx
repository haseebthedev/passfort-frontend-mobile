import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { router } from "expo-router";
import { hp, wp } from "@/utils";
import { UserInfo_Data } from "@/constants/auth";
import { PasswordCard_Data } from "@/constants";
import { colorPalette, Fonts, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, PasswordCard } from "@/components";
import profilePicture from "../../assets/images/Profile10.png";

const Profile = () => {
  const onEditProfilePress = () => router.push("/profile/EditProfile");

  return (
    <GradientWrapper>
      <AppHeader
        title="Profile"
        rightIconName="settings"
        onRightIconPress={() => router.push("/Settings")}
        containerStyle={LayoutStyles.horizontalSpacing}
      />

      <View style={styles.container}>
        <Image source={profilePicture} style={styles.profilePicture} />
        <AppText text="User Name" type="defaultSemiBold" />
        <AppButton text="Edit profile" preset="link" style={styles.editButton} onPress={onEditProfilePress} />
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
            <AppText text={key} type="subtitle" style={styles.infoHeading} />
            <AppText text={value} type="defaultSemiBold" style={styles.infoText} />
          </View>
        ))}
      </View>

      {/* 
        <View style={styles.personalInfoContainer}>
        <View>
          <AppText text={"Name"} type="subtitle" style={styles.infoHeading} />
          <AppText text={UserInfo_Data.name} type="defaultSemiBold" style={styles.infoText} />
        </View>

        <View>
          <AppText text={"Email"} type="subtitle" style={styles.infoHeading} />
          <AppText text={UserInfo_Data.email} type="defaultSemiBold" style={styles.infoText} />
        </View>

        <View>
          <AppText text={"Phone Number"} type="subtitle" style={styles.infoHeading} />
          <AppText text={UserInfo_Data.number} type="defaultSemiBold" style={styles.infoText} />
        </View> 
        </View>
        */}
    </GradientWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  profilePicture: {
    width: wp(35),
    height: wp(35),
    marginVertical: Spacing.lg,
  },
  editButton: {
    marginVertical: Spacing.xs,
  },
  passwordCardsContainer: {
    marginVertical: Spacing.md,
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  personalInfoContainer: {
    backgroundColor: colorPalette.primaryBg.shade03,
    padding: Spacing.md,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.shade01,
    borderRadius: Spacing.xs,
    marginVertical: Spacing.xs,
    marginHorizontal: wp(5),
    gap: Spacing.md,
  },
  infoHeading: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.md,
    marginBottom: hp(0.5),
  },
  infoText: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.md,
  },
});
