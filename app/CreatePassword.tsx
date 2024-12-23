import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Screens } from "@/enums";
import { useFormikHook } from "@/hooks";
import { CreatePasswordI, itemI } from "@/interfaces";
import { PasswordCard_Data } from "@/constants";
import { colorPalette, iconSize, LayoutStyles, Spacing } from "@/styles";
import { AppFont, createPasswordValidationSchema, hp, wp } from "@/utils";
import {
  AppButton,
  AppHeader,
  AppText,
  Dropdown,
  ErrorMessage,
  GradientWrapper,
  KeyboardResponsiveHOC,
  RippleWrapper,
  TextInput,
} from "@/components";

const CreatePassword = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [dropdownItems, setDropdownItems] = useState<itemI[]>([]);

  const validationSchema = createPasswordValidationSchema;
  const initialValues: CreatePasswordI = {
    type: value ?? "",
    platform: "",
    siteAddress: "",
    email: "",
    password: "",
  };

  const submit = async ({ type, platform, siteAddress, email, password }: CreatePasswordI) => {
    try {
      Keyboard.dismiss();
      console.log(type, platform, siteAddress, email, password);
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  const onGeneratePasswordPress = () => router.push(Screens.GeneratedPassword);

  useEffect(() => {
    const passwordCardTitles = PasswordCard_Data.map((item) => ({
      label: item.title,
      value: item.id,
    }));

    setDropdownItems(passwordCardTitles);
  }, []);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title="New Password"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
        rightAccessory={
          <RippleWrapper
            onPress={onGeneratePasswordPress}
            style={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
          >
            <FontAwesome name="magic" size={iconSize} color={colorPalette.primaryBg.secondaryLightGreen} />
          </RippleWrapper>
        }
      />
      <KeyboardResponsiveHOC containerStyle={styles.mainContainer} scrollViewStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          <AppText text="Credentials" type="label" style={styles.heading} />

          <View style={styles.infoContainer}>
            <AppText text="Type" type="subHeading" style={styles.infoHeading} />
            <Dropdown
              open={open}
              value={value}
              items={dropdownItems}
              setOpen={setOpen}
              setValue={setValue}
              setFieldValue={setFieldValue}
            />
            {typeof errors.type === "string" && (
              <ErrorMessage
                error="Please select a type."
                visible={typeof touched.type === "boolean" ? touched.type : undefined}
              />
            )}
          </View>

          <AppText text="Platform" type="subHeading" style={styles.infoHeading} />
          <TextInput
            placeholder="Enter Your Platform"
            value={values.platform}
            onChangeText={handleChange("platform")}
            onBlur={() => setFieldTouched("platform")}
            error={typeof errors.platform === "string" ? errors.platform : undefined}
            visible={typeof touched.platform === "boolean" ? touched.platform : undefined}
            inputStyle={styles.inputStyle}
          />

          <AppText text="Site Address" type="subHeading" style={styles.infoHeading} />
          <TextInput
            placeholder="http://"
            value={values.siteAddress}
            onChangeText={handleChange("siteAddress")}
            onBlur={() => setFieldTouched("siteAddress")}
            error={typeof errors.siteAddress === "string" ? errors.siteAddress : undefined}
            visible={typeof touched.siteAddress === "boolean" ? touched.siteAddress : undefined}
            inputStyle={styles.inputStyle}
          />

          <AppText text="Email / Username" type="subHeading" style={styles.infoHeading} />
          <TextInput
            placeholder="Enter Your email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            error={typeof errors.email === "string" ? errors.email : undefined}
            visible={typeof touched.email === "boolean" ? touched.email : undefined}
            inputStyle={styles.inputStyle}
          />

          <AppText text="Password" type="subHeading" style={styles.infoHeading} />
          <TextInput
            placeholder="******"
            icon="cycle"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            error={typeof errors.password === "string" ? errors.password : undefined}
            visible={typeof touched.password === "boolean" ? touched.password : undefined}
            inputStyle={styles.inputStyle}
          />

          <AppButton text="Save" onPress={handleSubmit} />
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
    // paddingTop: Spacing.sm,
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
