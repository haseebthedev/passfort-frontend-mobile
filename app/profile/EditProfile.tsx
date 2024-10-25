import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { wp } from "@/utils";
import { useAuthStore } from "@/store";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, GradientWrapper, TextInput } from "@/components";
import profilePicture from "../../assets/images/Profile10.png";

const EditProfile = () => {
  const { reset } = useAuthStore();

  const onCancelPress = () => router.back();

  const onSavePress = () => {
    reset();
    router.push("/auth/Signin");
  };

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Edit Profile" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.alignCenter}>
          <Image source={profilePicture} style={styles.profilePicture} />
          <TouchableOpacity style={styles.changePicture}>
            <Feather name="edit-3" size={wp(5)} color={colorPalette.primaryBg.secondaryLightGreen} />
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <TextInput label="Name" placeholder="Enter Your Name" />
          <TextInput label="Email Address" placeholder="Enter Your Email Address" />
          <TextInput label="Phone Number" placeholder="Enter Your Phone Number" />
          <AppButton text="Save" onPress={onSavePress} />
          <AppButton
            text="Cancel"
            preset="link"
            onPress={onCancelPress}
            textStyle={styles.cancelButtonText}
            style={styles.spacing}
          />
        </View>
      </ScrollView>
    </GradientWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
  },
  alignCenter: { alignItems: "center" },
  profilePicture: {
    width: wp(35),
    height: wp(35),
  },
  form: {
    flex: 1,
  },
  cancelButtonText: {
    color: colorPalette.primaryBg.primaryWhite,
    textDecorationLine: "none",
  },
  spacing: {
    marginVertical: Spacing.sm,
  },
  changePicture: {
    width: wp(10),
    height: wp(10),
    backgroundColor: colorPalette.primaryBg.borderColor1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(5),
    position: "absolute",
    bottom: 0,
    right: wp(28),
  },
});
