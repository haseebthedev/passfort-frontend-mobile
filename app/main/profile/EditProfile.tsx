import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, ImageSourcePropType, Keyboard, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TranslationLanguageCodeMap } from "react-native-country-picker-modal";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useAuthStore } from "@/store";
import { EditProfileI } from "@/interfaces";
import { useFormikHook } from "@/hooks";
import { profilePicture } from "@/assets";
import { colorPalette, FormsStyle, LayoutStyles, Spacing } from "@/styles";
import { editProfileValidationSchema, formatDate, uploadImageToBackend, wp } from "@/utils";
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

const EditProfile = () => {
  const { user, editProfile, isLoading } = useAuthStore();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>();
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType>();
  const [selectedCountry, setSelectedCountry] = useState<TranslationLanguageCodeMap | string>("");
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [imagePickerVisible, setImagePickerVisible] = useState<boolean>(false);
  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);

  const snapPoints = ["30%"];

  const handleOpenBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const validationSchema = editProfileValidationSchema;
  const initialValues: EditProfileI = {
    name: user?.name ?? "",
    dateOfBirth: user?.dateOfBirth ?? "",
    phoneNumber: "",
  };

  const submit = async ({ name, phoneNumber }: EditProfileI) => {
    Keyboard.dismiss();

    try {
      let updatedPicture = null;
      if (selectedImage) {
        updatedPicture = await uploadImageToBackend(selectedImage);
      }

      const dataToBeUpdate: EditProfileI = {
        name,
        country: selectedCountry,
        phoneNumber,
      };

      if (dateOfBirth !== new Date()) {
        dataToBeUpdate.dateOfBirth = dateOfBirth;
      }

      if (updatedPicture) {
        dataToBeUpdate.profilePicture = updatedPicture;
      }

      await editProfile(dataToBeUpdate);
      router.back();
    } catch (err) {
      console.log("Error while updating user data: ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  const onCancelPress = () => router.back();

  useEffect(() => {
    if (user?.dateOfBirth) {
      setDateOfBirth(new Date(user.dateOfBirth));
    }
  }, []);

  useEffect(() => {
    if (user?.country) {
      setSelectedCountry(user?.country);
    }
  }, [user]);

  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImage({ uri: user.profilePicture });
    } else {
      setProfileImage(profilePicture);
    }
  }, [user]);

  return (
    <GestureHandlerRootView>
      <GradientWrapper style={LayoutStyles.horizontalSpacing}>
        <AppHeader title="Edit Profile" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}>
          <View style={styles.alignCenter}>
            <Image source={profileImage} style={styles.profilePicture} />
            <View style={styles.editButton}>
              <RippleWrapper
                onPress={handleOpenBottomSheet}
                style={styles.changePicture}
                containerStyle={styles.rippleContainer}
              >
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

            <AppText text="Date of Birth" type="label" style={FormsStyle.formLabel} />
            <TouchableOpacity
              onPress={() => setDateModalVisible(true)}
              style={[FormsStyle.formControl, styles.datePicker]}
              activeOpacity={1}
            >
              <AppText
                text={dateOfBirth ? formatDate(dateOfBirth.toString()) : "Select Date"}
                type="default"
                style={dateOfBirth ? styles.selectedDate : styles.placeholder}
              />
            </TouchableOpacity>

            <AppText text="Country" type="label" style={FormsStyle.formLabel} />

            <TouchableOpacity
              onPress={() => setCountryModalVisible((prev) => !prev)}
              style={[FormsStyle.formControl, styles.datePicker]}
            >
              <AppText
                text={selectedCountry ? String(selectedCountry) : "Select Country"}
                type={"default"}
                style={selectedCountry ? styles.selectedDate : styles.placeholder}
              />
            </TouchableOpacity>

            <AppButton
              text={isLoading ? "" : "Save"}
              onPress={handleSubmit}
              preset="filled"
              RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
            />
            <AppButton text="Cancel" preset="noUnderline" onPress={onCancelPress} />
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
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setDateModalVisible(false);
            if (selectedDate) {
              setDateOfBirth(selectedDate);
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
  profilePicture: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(19),
  },
  form: {
    flex: 1,
    marginBottom: Spacing.lg,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
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
