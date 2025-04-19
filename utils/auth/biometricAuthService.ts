import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { showToast } from "@/utils/toastService";
import { useAuthStore } from "@/store/auth/auth.store";

export const handleBiometricToggle = async (value: boolean) => {
  const setBiometricAuth = useAuthStore.getState().setBiometricAuth;
  
  if (value) {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert(
        "Not Supported",
        "Your device doesn't support biometric authentication",
        [{ text: "OK", onPress: () => setBiometricAuth(false) }]
      );
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert(
        "Not Set Up",
        "Please set up biometric authentication in your device settings first",
        [{ text: "OK", onPress: () => setBiometricAuth(false) }]
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to enable biometric login",
      cancelLabel: "Cancel",
    });

    if (result.success) {
      setBiometricAuth(true);
      showToast({
        type: "success",
        text1: "Biometric authentication has been enabled",
      });
    } else {
      setBiometricAuth(false);
      showToast({ type: "error", text1: "Biometric authentication failed" });
    }
  } else {
    setBiometricAuth(false);
  }
};

export const authenticateWithBiometrics = async (onSuccess: () => void) => {
  const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

  if (!isBiometricAvailable) {
    Alert.alert("Biometric support is not available.");
    return false;
  }

  const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
  if (!savedBiometrics) {
    Alert.alert("Biometric record not found.");
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Login to Passfort with biometric.",
    cancelLabel: "Cancel",
    disableDeviceFallback: true,
  });

  if (result.success) {
    onSuccess();
    return true;
  }

  return false;
};
