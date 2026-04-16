import React, { useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { hp, wp } from "@/utils";
import { useOtpVerification, useTheme } from "@/hooks";
import { colorPalette, Spacing } from "@/styles";
import { AppButton, AppHeader, AppText, GradientWrapper } from "@/components";
import { Theme } from "@/interfaces";

const OTP_LENGTH = 6;

const OtpVerification = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { email } = useLocalSearchParams<{ email: string }>();

  const { timer, otp, setOtp, disableVerifyBtn, disableResetBtn, onPressVerifyHandler, onPressResendCodeHandler } =
    useOtpVerification(email);

  // refs array
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = { ...otp, [index + 1]: text };
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[index + 1] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <GradientWrapper>
      <AppHeader title="OTP Verification" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <View style={styles.form}>
        <View style={styles.head}>
          <AppText text="Get Your Code" type="heading" />
          <AppText text="Please enter the 6 digit code that sent to your email address." type="subHeading" style={styles.subHeading} />
        </View>

        {/* OTP Inputs */}
        <View style={styles.inputFields}>
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              value={otp[String(index + 1)]}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.codeVerifyBlock}
              selectTextOnFocus
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <View style={styles.codeExpireText}>
          <AppText text="Code expires in " />
          <AppText text={`00 : ${timer}`} style={styles.timerText} />
        </View>

        <AppButton text="Verify" onPress={onPressVerifyHandler} disabled={disableVerifyBtn} />

        <View style={styles.dontRecieveCodeContainer}>
          <AppText text="If you don't receive code!" />
          <AppButton preset="primaryLink" text="Resend" onPress={onPressResendCodeHandler} disabled={disableResetBtn} />
        </View>
      </View>
    </GradientWrapper>
  );
};

export default OtpVerification;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      gap: Spacing.sm,
    },
    codeVerifyBlock: {
      borderRadius: hp(0.6),
      width: hp(6),
      height: hp(6),
      textAlign: "center",
      fontSize: hp(2.5),
      color: theme.blockInput.textColor,
      backgroundColor: theme.blockInput.bg,
    },
  });
