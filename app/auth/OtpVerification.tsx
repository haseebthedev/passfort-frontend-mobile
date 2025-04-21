import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { hp, wp } from "@/utils";
import { useOtpVerification } from "@/hooks";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper } from "@/components";

const OtpVerification = () => {
  const { email } = useLocalSearchParams<{ email: string }>();

  const {
    timer,
    otp,
    setOtp,
    disableVerifyBtn,
    disableResetBtn,
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
    onPressVerifyHandler,
    onPressResendCodeHandler,
  } = useOtpVerification(email);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title="OTP Verification"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <View style={styles.form}>
        <View style={styles.head}>
          <AppText text="Get Your Code" type="heading" />
          <AppText
            text="Please enter the 6 digit code that send to your email address."
            type="subHeading"
            style={styles.subHeading}
          />
        </View>

        <View style={styles.inputFields}>
          <TextInput
            ref={input1}
            value={otp["1"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input1.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 1: text });
              text && input2.current?.focus();
            }}
          />
          <TextInput
            ref={input2}
            value={otp["2"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input2.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 2: text });
              text ? input3.current?.focus() : input1.current?.focus();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input1.current?.clear();
                input1.current?.focus();
              }
            }}
          />
          <TextInput
            ref={input3}
            value={otp["3"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input3.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 3: text });
              text ? input4.current?.focus() : input2.current?.focus();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input2.current?.clear();
                input2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={input4}
            value={otp["4"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input4.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 4: text });
              text ? input5.current?.focus() : input3.current?.focus();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input3.current?.clear();
                input3.current?.focus();
              }
            }}
          />
          <TextInput
            ref={input5}
            value={otp["5"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input5.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 5: text });
              text ? input6.current?.focus() : input4.current?.focus();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input4.current?.clear();
                input4.current?.focus();
              }
            }}
          />
          <TextInput
            ref={input6}
            value={otp["6"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input6.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 6: text });
              !text ? input5.current?.focus() : input6.current?.blur();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input5.current?.clear();
                input5.current?.focus();
              }
            }}
          />
        </View>

        <View style={styles.codeExpireText}>
          <AppText text="Code expires in " />
          <AppText text={"00 : " + timer} style={styles.timerText} />
        </View>

        <AppButton
          preset="filled"
          text="Verify"
          onPress={onPressVerifyHandler}
          disabled={disableVerifyBtn}
        />

        <View style={styles.dontRecieveCodeContainer}>
          <AppText text="If you don't receive code!" type="default" />
          <AppButton
            preset="primaryLink"
            text="Resend"
            onPress={onPressResendCodeHandler}
            disabled={disableResetBtn}
          />
        </View>
      </View>
    </GradientWrapper>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginVertical: Spacing.xxl,
  },
  head: {
    alignItems: "center",
  },
  subHeading: {
    width: wp(80),
    textAlign: "center",
    color: colorPalette.primaryBg.secondayGrey,
    marginTop: Spacing.sm,
  },
  dontRecieveCodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  codeExpireText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: colorPalette.primaryBg.primaryLightGreen,
  },
  inputFields: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    width: wp(90),
  },
  codeVerifyBlock: {
    backgroundColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(0.6),
    width: hp(6),
    height: hp(6),
    textAlign: "center",
    fontSize: hp(2.5),
    color: colorPalette.primaryBg.primaryLightGreen,
  },
});
