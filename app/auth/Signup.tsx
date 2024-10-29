import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { SignupI } from "@/interfaces";
import { useFormikHook } from "@/hooks";
import { signupValidationSchema } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, GradientWrapper, KeyboardResponsiveHOC, TextInput } from "@/components";

const Signup = () => {
  const validationSchema = signupValidationSchema;
  const initialValues: SignupI = { name: "", email: "", password: "" };

  const submit = async ({ name, email, password }: SignupI) => {
    try {
      Keyboard.dismiss();
      console.log(name, email, password);
      router.push(Screens.Home);
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container} scrollViewStyle={styles.scrollViewStyle}>
        <AppLogo />

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.title}>
              <AppText text="Sign Up" type="title" />
            </View>

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
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              error={typeof errors.email === "string" ? errors.email : undefined}
              visible={typeof touched.email === "boolean" ? touched.email : undefined}
            />
            <TextInput
              label="Password"
              placeholder="Enter Your Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              error={typeof errors.password === "string" ? errors.password : undefined}
              visible={typeof touched.password === "boolean" ? touched.password : undefined}
              secureInput={true}
            />

            <AppButton text="Sign Up" onPress={handleSubmit} />

            <View style={styles.linkRow}>
              <AppText text="Already have an account?" type="label" />
              <AppButton text="Sign In" onPress={() => router.push(Screens.Signin)} preset="link" />
            </View>
          </View>

          <View style={styles.termsAndConditions}>
            <AppText text="Terms & Conditions" style={styles.conditions} type="subHeading" />
            <AppText text=" and " style={styles.defaultText} type="subHeading" />
            <AppText text="Privacy policy" style={styles.policy} type="subHeading" />
          </View>
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
    paddingTop: Spacing.sm,
  },
  title: {
    paddingVertical: Spacing.md,
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {},
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsAndConditions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: colorPalette.primaryBg.primaryWhite,
    marginBottom: Spacing.sm,
  },
  conditions: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
  defaultText: { fontWeight: "400" },
  policy: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
});
