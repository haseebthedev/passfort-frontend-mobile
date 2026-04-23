import { useState, useEffect, useRef } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { authenticateWithBiometrics } from "@/utils";

export const useBiometricAuth = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const [isBiometricDone, setIsBiometricDone] = useState<boolean>(false);
  const isAuthInProgress = useRef(false);

  const handleBiometricAuth = async () => {
    if (isAuthInProgress.current) return;
    isAuthInProgress.current = true;

    const success = await authenticateWithBiometrics(() => {
      setIsBiometricDone(true);
      router.push(Screens.Home);
    });

    if (!success) {
      setIsBiometricDone(false);
    }

    isAuthInProgress.current = false;
  };

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
    checkBiometricSupport();
  }, []);

  return {
    isBiometricSupported,
    isBiometricDone,
    handleBiometricAuth,
  };
}; 