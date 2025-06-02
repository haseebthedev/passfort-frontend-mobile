import React, { useCallback, useRef } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useAuthStore } from "@/store";
import { useEditProfile, useTheme } from "@/hooks";
import { formatDate, hp, wp } from "@/utils";
import { colorPalette, FormsStyle, Spacing } from "@/styles";
import {
  AppButton,
  AppHeader,
  AppText,
  CountryPickerModal,
  GradientWrapper,
  ImagePickerModal,
  LoadingIndicator,
  RippleWrapper,
  TextInput,
} from "@/components";

const PROFILE_IMAGE_SIZE = wp(35);

const EditProfile = () => {
  const { theme, mode } = useTheme();
  const { user } = useAuthStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["30%"];

  const {
    dateOfBirth,
    profileImage,
    selectedImage,
    disableSaveButton,
    selectedCountry,
    dateModalVisible,
    imagePickerVisible,
    countryModalVisible,
    isLoading,
    errors,
    touched,
    values,
    setProfileImage,
    setSelectedImage,
    setDateModalVisible,
    setImagePickerVisible,
    setCountryModalVisible,
    setSelectedCountry,
    handleChange,
    handleSubmit,
    setFieldTouched,
    handleDateChange,
    handleCancel,
  } = useEditProfile();

  const handleOpenBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const renderDatePicker = () => (
    <TouchableOpacity
      onPress={() => setDateModalVisible(true)}
      style={[FormsStyle(theme, mode).formControl, styles.datePicker]}
      activeOpacity={1}
    >
      <AppText
        text={dateOfBirth ? formatDate(dateOfBirth.toString()) : "Select Date of Birth"}
        type="default"
        style={dateOfBirth ? null : styles.placeholder}
      />
    </TouchableOpacity>
  );

  const renderCountryPicker = () => (
    <TouchableOpacity
      onPress={() => setCountryModalVisible((prev: boolean) => !prev)}
      style={[FormsStyle(theme, mode).formControl, styles.datePicker]}
    >
      <AppText
        text={selectedCountry ? String(selectedCountry) : "Select Country"}
        type={"default"}
        style={selectedCountry ? null : styles.placeholder}
      />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView>
      <GradientWrapper>
        <AppHeader title="Edit Profile" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}>
          <View style={styles.alignCenter}>
            <View style={styles.profilePictureContainer}>
              <Image source={profileImage} style={styles.profilePicture} />
            </View>
            <View style={styles.editButton}>
              <RippleWrapper onPress={handleOpenBottomSheet} style={styles.changePicture} containerStyle={styles.rippleContainer}>
                <Feather name="edit-3" size={wp(5)} color={colorPalette.primaryBg.secondaryLightGreen} />
              </RippleWrapper>
            </View>
          </View>
          <View style={styles.form}>
            <TextInput
              label="Name"
              placeholder="Enter Your Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              error={typeof errors.name === "string" ? errors.name : undefined}
              visible={typeof touched.name === "boolean" ? touched.name : undefined}
            />
            <TextInput
              label="Email Address"
              placeholder="Enter Your Email Address"
              value={user?.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              editable={false}
            />

            <AppText text="Date of Birth" type="formLabel" />
            {renderDatePicker()}

            <AppText text="Country" type="formLabel" />
            {renderCountryPicker()}

            <AppButton
              text={disableSaveButton ? "" : "Save"}
              onPress={handleSubmit}
              preset="filled"
              disabled={isLoading || disableSaveButton}
              RightAccessory={() => (isLoading || disableSaveButton) && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
            />
            <AppButton text="Cancel" preset="noUnderline" onPress={handleCancel} />
          </View>
        </ScrollView>
      </GradientWrapper>

      <ImagePickerModal
        bottomSheetRef={bottomSheetRef}
        isVisible={imagePickerVisible}
        renderBackdrop={renderBackdrop}
        snapPoints={snapPoints}
        setProfileImage={setProfileImage}
        setSelectedImage={setSelectedImage}
      />

      {dateModalVisible && (
        <DateTimePicker
          value={dateOfBirth || new Date()}
          mode="date"
          display="default"
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            if (event.type === "set") {
              handleDateChange(selectedDate);
            } else {
              setDateModalVisible(false);
            }
          }}
        />
      )}

      <CountryPickerModal
        visible={countryModalVisible}
        setSelectedCountry={setSelectedCountry}
        setCountryModalVisible={setCountryModalVisible}
      />
    </GestureHandlerRootView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
  },
  alignCenter: { alignItems: "center" },
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
    borderRadius: PROFILE_IMAGE_SIZE / 2,
  },
  form: {
    flex: 1,
    marginBottom: Spacing.lg,
  },
  editButton: {
    position: "absolute",
    bottom: hp(2),
    right: wp(28),
  },
  changePicture: {
    width: wp(10),
    height: wp(10),
    backgroundColor: colorPalette.primaryBg.borderColor1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(5),
  },
  rippleContainer: {
    borderRadius: Spacing.lg,
  },
  datePicker: {
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  placeholder: {
    color: colorPalette.primaryBg.primaryGrey,
  },
  selectedDate: {
    color: colorPalette.primaryBg.primaryWhite,
  },
});
