import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Screens } from "@/enums";
import { useFormikHook } from "@/hooks";
import { PasswordI, itemI } from "@/interfaces";
import { colorPalette, iconSize, LayoutStyles, Spacing } from "@/styles";
import { useAuthStore, usePasswordCategoryStore, usePasswordStore } from "@/store";
import { AppFont, createPasswordValidationSchema, hp, wp } from "@/utils";
import {
  AppButton,
  AppHeader,
  AppText,
  Dropdown,
  ErrorMessage,
  GradientWrapper,
  KeyboardResponsiveHOC,
  LoadingIndicator,
  PasswordItem,
  RippleWrapper,
  TextInput,
} from "@/components";

const CreatePassword = () => {
  const { passwordId } = useLocalSearchParams<{ passwordId: string }>() || {};

  const { user } = useAuthStore();
  const { createPassword, isLoading, updatePassword, getPasswordById } = usePasswordStore();
  const { getPasswordCategories, isLoading: loadingPasswordCategories } = usePasswordCategoryStore();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [passwordData, setPasswordData] = useState<PasswordI | null>(null);
  const [dropdownItems, setDropdownItems] = useState<itemI[]>([]);

  const validationSchema = createPasswordValidationSchema;
  const initialValues: PasswordI = {
    type: "",
    platform: "",
    siteAddress: "",
    email: "",
    password: "",
  };

  const submit = async ({ type, platform, siteAddress, email, password }: PasswordI) => {
    Keyboard.dismiss();

    try {
      if (value && siteAddress && password) {
        await createPassword({
          type: value,
          platform,
          password,
          email: email || user?.name,
          siteAddress,
        });

        resetForm();
        setValue("");
      }
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue, resetForm } =
    useFormikHook(submit, validationSchema, initialValues);

  const onGeneratePasswordPress = () => router.push(Screens.GeneratedPassword);

  const getAllPasswordCategories = async () => {
    try {
      const response = await getPasswordCategories();
      if (response) {
        const passwordCardTitles = response.map((item) => ({
          label: item.title,
          value: item.id,
        }));

        setDropdownItems(passwordCardTitles);
      }
    } catch (err) {
      console.log("Error while getting password categories: ", err);
    }
  };

  useEffect(() => {
    getAllPasswordCategories();
  }, []);

  useEffect(() => {
    if (passwordId) {
      const fetchPassword = async () => {
        try {
          const passwordItem = await getPasswordById(passwordId);
          console.log(passwordItem);
          // setPasswordData(passwordItem);
          // setValue(passwordItem?.type);
          // setFieldValue("type", passwordItem?.type);
          // setFieldValue("platform", passwordItem?.platform);
          // setFieldValue("siteAddress", passwordItem?.siteAddress);
          // setFieldValue("email", passwordItem?.email);
          // setFieldValue("password", passwordItem?.password);
        } catch (error) {
          console.error("Error fetching password:", error);
        }
      };

      fetchPassword();
    }
  }, [passwordId]);

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
              setFieldValue={setFieldValue}
              setValue={(selectedValue) => {
                setValue(selectedValue as any);
                setFieldValue("type", selectedValue as any);
              }}
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

          <AppButton
            text={isLoading ? "" : "Save"}
            onPress={handleSubmit}
            RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
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
