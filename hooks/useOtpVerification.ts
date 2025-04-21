import { useRef, useState, useEffect } from "react";
import { Keyboard, TextInput } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { showToast } from "@/utils";
import { useAuthStore } from "@/store";

const TIMER: number = 50;

export const useOtpVerification = (email: string) => {
  const { verifyAuthCode } = useAuthStore();
  
  const [timer, setTimer] = useState<number>(TIMER);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState<boolean>(false);
  const [disableResetBtn, setDisableResetBtn] = useState<boolean>(true);
  
  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);
  const input5 = useRef<TextInput>(null);
  const input6 = useRef<TextInput>(null);

  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const isOtpComplete = Object.values(otp).every((digit) => digit !== "");

  const onPressVerifyHandler = async () => {
    Keyboard.dismiss();
    let verificationCode = Object.values(otp).join("");

    try {
      await verifyAuthCode({ email, authCode: verificationCode });

      if (isOtpComplete) {
        router.push({
          pathname: Screens.ResetPassword,
          params: {
            email,
            authCode: verificationCode,
          },
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        text1: `${err}!`,
      });
    }
  };

  const onPressResendCodeHandler = () => {
    if (timer === 0) {
      setTimer(TIMER);
    }
  };

  useEffect(() => {
    let counter: NodeJS.Timeout | undefined;
    if (timer === 0) {
      clearInterval(counter);
      setDisableResetBtn(false);
    } else {
      counter = setInterval(() => setTimer((prev) => prev - 1), 1000);
      setDisableResetBtn(true);
    }
    setDisableVerifyBtn(!isOtpComplete);
    return () => clearInterval(counter);
  }, [timer]);

  return {
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
  };
};
