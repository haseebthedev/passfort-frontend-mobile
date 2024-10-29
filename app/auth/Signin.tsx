import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { SigninI } from "@/interfaces";
import { useAuthStore } from "@/store";
import { useFormikHook } from "@/hooks";
import { signinValidationSchema } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, Checkbox, GradientWrapper, KeyboardResponsiveHOC, TextInput } from "@/components";

const Signin = () => {
  const { login, user } = useAuthStore();

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    try {
      console.log(email, password);
      Keyboard.dismiss();
      console.log("ok");
      login({
        id: "123",
        email,
        name: "John Doe",
        picture: "https://via.placeholder.com/150",
        location: "New York, USA",
        isFirstSignIn: true,
        isLogin: true,
      });

      if (user?.isFirstSignIn) {
        router.push(Screens.Onboarding);
      } else {
        router.push(Screens.Home);
      }
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
              <AppText text="Sign In" type="title" />
            </View>

            <TextInput
              label="Email Address"
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Enter Your Email Address"
              onBlur={() => setFieldTouched("email")}
              error={typeof errors.email === "string" ? errors.email : undefined}
              visible={typeof touched.email === "boolean" ? touched.email : undefined}
            />
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Enter Your Password"
              secureInput={true}
              onBlur={() => setFieldTouched("password")}
              error={typeof errors.password === "string" ? errors.password : undefined}
              visible={typeof touched.password === "boolean" ? touched.password : undefined}
            />

            <View style={styles.actionGroup}>
              <Checkbox label="Remember me" />
              <AppButton text="Forget Password?" onPress={() => {}} preset="link" />
            </View>

            <AppButton text="Sign In" onPress={handleSubmit} />

            <View style={styles.linkRow}>
              <AppText text="Don’t have an account?" type="label" />
              <AppButton text="Sign Up" onPress={() => router.push(Screens.Signup)} preset="link" />
            </View>
          </View>
        </View>
        <View style={styles.termsAndConditions}>
          <AppText text="Terms & Conditions" style={styles.conditions} type="subHeading" />
          <AppText text=" and " style={styles.defaultText} type="subHeading" />
          <AppText text="Privacy policy" style={styles.policy} type="subHeading" />
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default Signin;

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
    marginBottom: Spacing.lg,
  },
  linkRow: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsAndConditions: {
    flexDirection: "row",
    justifyContent: "center",
    color: colorPalette.primaryBg.primaryWhite,
    marginBottom: Spacing.sm,
  },
  conditions: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
  defaultText: {
    fontWeight: "400",
  },
  policy: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
});
