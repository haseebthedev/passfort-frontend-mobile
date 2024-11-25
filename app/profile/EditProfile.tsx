import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, ImageSourcePropType, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useAuthStore } from "@/store";
import { EditProfileI } from "@/interfaces";
import { useFormikHook } from "@/hooks";
import { profilePicture } from "@/assets";
import { editProfileValidationSchema, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, GradientWrapper, ImagePickerModal, RippleWrapper, TextInput } from "@/components";

const EditProfile = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { user } = useAuthStore();
  const [imagePickerVisible, setImagePickerVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>();
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType>();

  const snapPoints = ["30%", "75%"];

  const handleOpenBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const validationSchema = editProfileValidationSchema;
  const initialValues: EditProfileI = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phoneNumber: "",
  };

  const submit = async ({ email, name, phoneNumber }: EditProfileI) => {
    try {
      console.log(email, name, phoneNumber);
      Keyboard.dismiss();
      router.back();
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  const onCancelPress = () => router.back();

  useEffect(() => {
    setProfileImage(profilePicture);
  }, []);

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
              value={user?.email ?? values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              editable={false}
            />
            <TextInput
              label="Phone Number"
              placeholder="Enter Your Phone Number"
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              onBlur={() => setFieldTouched("phoneNumber")}
              error={typeof errors.phoneNumber === "string" ? errors.phoneNumber : undefined}
              visible={typeof touched.phoneNumber === "boolean" ? touched.phoneNumber : undefined}
            />

            <AppButton text="Save" onPress={handleSubmit} preset="filled" />
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
});
