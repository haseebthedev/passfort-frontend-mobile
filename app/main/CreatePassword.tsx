import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { AppFont, hp, wp } from "@/utils";
import { useCreatePassword } from "@/hooks";
import { colorPalette, iconSize, LayoutStyles, Spacing } from "@/styles";
import {
  AppButton,
  AppHeader,
  AppText,
  Dropdown,
  ErrorMessage,
  GradientWrapper,
  KeyboardResponsiveHOC,
  LoadingIndicator,
  RippleWrapper,
  TextInput,
} from "@/components";

const CreatePassword = () => {
  const {
    open,
    setOpen,
    value,
    setValue,
    dropdownItems,
    error,
    isLoading,
    loadingPasswordCategories,
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue,
    onGeneratePasswordPress,
    parsedPasswordItem,
  } = useCreatePassword();

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title={parsedPasswordItem ? "Edit Password" : "New Password"}
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
        rightAccessory={
          <RippleWrapper
            onPress={onGeneratePasswordPress}
            style={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
          >
            <FontAwesome
              name="magic"
              size={iconSize}
              color={colorPalette.primaryBg.secondaryLightGreen}
            />
          </RippleWrapper>
        }
      />
      <KeyboardResponsiveHOC
        containerStyle={styles.mainContainer}
        scrollViewStyle={styles.scrollViewStyle}
      >
        <View style={styles.container}>
          <AppText text="Credentials" type="label" style={styles.heading} />

          <View style={styles.infoContainer}>
            <AppText text="Type" type="subHeading" style={styles.infoHeading} />
            <Dropdown
              open={open}
              value={value}
              items={dropdownItems}
              setOpen={setOpen}
              setFieldValue={setFieldValue}
              setValue={(selectedValue) => {
                setValue(selectedValue as string);
                const selectedItem = dropdownItems.find(
                  (item) => item.value === selectedValue
                );
                setFieldValue("type", {
                  _id: selectedValue as string,
                  title: selectedItem?.label ?? "",
                  icon: "",
                  updatedAt: new Date().toISOString(),
                });
              }}
            />
            {touched.type?._id && errors.type?._id && (
              <ErrorMessage
                error={errors.type._id}
                visible={touched.type._id}
              />
            )}
          </View>

          <AppText
            text="Platform"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="Enter Your Platform"
            value={values.platform}
            onChangeText={handleChange("platform")}
            onBlur={() => setFieldTouched("platform")}
            error={
              typeof errors.platform === "string" ? errors.platform : undefined
            }
            visible={
              typeof touched.platform === "boolean"
                ? touched.platform
                : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppText
            text="Site Address"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="http://"
            value={values.siteAddress}
            onChangeText={handleChange("siteAddress")}
            onBlur={() => setFieldTouched("siteAddress")}
            error={
              typeof errors.siteAddress === "string"
                ? errors.siteAddress
                : undefined
            }
            visible={
              typeof touched.siteAddress === "boolean"
                ? touched.siteAddress
                : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppText
            text="Email / Username"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="Enter Your email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            error={typeof errors.email === "string" ? errors.email : undefined}
            visible={
              typeof touched.email === "boolean" ? touched.email : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppText
            text="Password"
            type="subHeading"
            style={styles.infoHeading}
          />
          <TextInput
            placeholder="******"
            icon="cycle"
            value={values.passwordText}
            onChangeText={handleChange("passwordText")}
            onBlur={() => setFieldTouched("passwordText")}
            error={
              typeof errors.passwordText === "string"
                ? errors.passwordText
                : undefined
            }
            visible={
              typeof touched.passwordText === "boolean"
                ? touched.passwordText
                : undefined
            }
            inputStyle={styles.inputStyle}
          />

          <AppButton
            text={isLoading ? "" : parsedPasswordItem ? "Update" : "Save"}
            onPress={handleSubmit}
            disabled={isLoading || loadingPasswordCategories}
            RightAccessory={() =>
              isLoading && (
                <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />
              )
            }
          />
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  container: {
    borderWidth: wp(0.2),
    backgroundColor: colorPalette.primaryBg.primaryLightGreenBg,
    borderColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(2),
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  heading: {
    fontFamily: AppFont.semiBold,
    marginBottom: Spacing.smd,
  },
  infoHeading: {
    color: colorPalette.primaryBg.secondayGrey,
    marginBottom: Spacing.xs,
  },
  infoContainer: {
    marginBottom: Spacing.md,
  },
  infoContainerWithError: {
    marginBottom: Spacing.xs,
  },
  inputStyle: {
    backgroundColor: colorPalette.primaryBg.primaryBg,
  },
  buttonContainer: {
    borderRadius: Spacing.lg,
  },
  buttonStyle: {
    width: wp(12),
    height: wp(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
