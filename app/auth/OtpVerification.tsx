import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Keyboard, TextInput } from "react-native";
import { router } from "expo-router";
import { hp, wp } from "@/utils";
import { Screens } from "@/enums";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper, TextInput as TextInputField } from "@/components";

const OtpVerification = () => {
  const TIMER: number = 30;
  const [timer, setTimer] = useState<number>(TIMER);
  const [otpDisableBtn, setOptDisableBtn] = useState<boolean>(false);
  const [disableResetBtn, setDisableResetBtn] = useState<boolean>(true);
  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const onPressVerifyHandler = () => {
    Keyboard.dismiss();
    let verificationCode = Object.values(otp).join("");
    console.log("verification code: ", verificationCode);
    router.push(Screens.ResetPassword);
  };

  const onPressResendCodeHandler = () => {
    setTimer(TIMER);
  };

  useEffect(() => {
    let counter: NodeJS.Timer | undefined;
    if (timer === 0) {
      clearInterval(counter);
      setOptDisableBtn(true);
    } else {
      counter = setInterval(() => setTimer((prev) => prev - 1), 1000);
      setOptDisableBtn(false);
    }
    return () => clearInterval(counter);
  }, [timer]);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="OTP Verification" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.form}>
        <View style={styles.head}>
          <AppText text="Get Your Code" type="heading" />
          <AppText
            text="Please enter the 4 digit code that send to your email address."
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
              !text ? input3.current?.focus() : input4.current?.blur();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input3.current?.clear();
                input3.current?.focus();
              }
            }}
          />
        </View>

        <View style={styles.codeExpireText}>
          <AppText text="Code expires in " />
          <AppText text={"00 : " + timer} style={styles.timerText} />
        </View>

        <AppButton preset="filled" text="Verify" onPress={onPressVerifyHandler} />

        <View style={styles.dontRecieveCodeContainer}>
          <AppText text="If you don't receive code!" type="default" />
          <AppButton preset="primaryLink" text="Resend" onPress={onPressResendCodeHandler} disabled={disableResetBtn} />
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
    justifyContent: "space-around",
    marginVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  codeVerifyBlock: {
    backgroundColor: colorPalette.primaryBg.borderColor2,
    borderRadius: hp(0.6),
    width: hp(7),
    height: hp(7),
    textAlign: "center",
    fontSize: hp(3),
    color: colorPalette.primaryBg.primaryLightGreen,
  },
});
