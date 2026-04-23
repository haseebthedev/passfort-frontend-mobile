import { handleBiometricToggle } from "@/utils";
import { useState } from "react";

export const useSettings = () => {
  const [notifications, setNotifications] = useState<boolean>(true);

  const onBiometricToggle = async (value: boolean) => {
    await handleBiometricToggle(value);
  };

  return {
    notifications,

    setNotifications,
    onBiometricToggle,
  };
};
