import React from "react";
import { Image, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { EditProfileI } from "@/interfaces";
import { useAuthStore } from "@/store";
import { editProfileValidationSchema, wp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, GradientWrapper, TextInput } from "@/components";
import profilePicture from "../../assets/images/Profile10.png";
import { useFormikHook } from "@/hooks";

const EditProfile = () => {
  const { reset, user } = useAuthStore();

  const validationSchema = editProfileValidationSchema;
  const initialValues: EditProfileI = {
    name: user?.first_name || user?.last_name ? `${user.first_name} ${user.last_name}` : "",
    email: user?.email ?? "",
    phoneNumber: "",
  };

  const submit = async ({ email, name, phoneNumber }: EditProfileI) => {
    try {
      console.log(email, name, phoneNumber);
      Keyboard.dismiss();
      reset();
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

  const onCancelPress = () => {
    reset();
    router.push("/auth/Signin");
  };

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Edit Profile" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.alignCenter}>
          <Image source={profilePicture} style={styles.profilePicture} />
          <TouchableWithoutFeedback>
            <View style={styles.changePicture}>
              <Feather name="edit-3" size={wp(5)} color={colorPalette.primaryBg.secondaryLightGreen} />
            </View>
          </TouchableWithoutFeedback>
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
