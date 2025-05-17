import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useSignup } from "@/hooks";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, GradientWrapper, KeyboardResponsiveHOC, LoadingIndicator, TextInput } from "@/components";

const Signup = () => {
  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, isLoading } = useSignup();

  return (
    <GradientWrapper>
      <KeyboardResponsiveHOC>
        <View style={styles.form}>
          <View>
            <AppLogo />
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

            <AppButton
              text={isLoading ? "" : "Sign Up"}
              onPress={handleSubmit}
              RightAccessory={() => isLoading && <LoadingIndicator color={colorPalette.gradientBg.darkGreen02} />}
            />
          </View>
          <View style={styles.linkRow}>
            <AppText text="Already have an account?" type="label" />
            <AppButton text="Sign In" onPress={() => router.push(Screens.Signin)} preset="primaryLink" />
          </View>
          <View>
            <View style={styles.termsAndConditions}>
              <AppText text="Terms & Conditions" style={styles.conditions} type="default" />
              <AppText text=" and " type="default" />
              <AppText text="Privacy policy" style={styles.policy} type="default" />
            </View>
          </View>
        </View>
      </KeyboardResponsiveHOC>
    </GradientWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  title: {
    paddingVertical: Spacing.md,
    alignSelf: "center",
  },
  form: {
    paddingTop: Spacing.sm,
    flex: 1,
    justifyContent: "space-between",
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  termsAndConditions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: colorPalette.primaryBg.primaryWhite,
  },
  conditions: {
    textDecorationLine: "underline",
  },
  policy: {
    textDecorationLine: "underline",
  },
});
