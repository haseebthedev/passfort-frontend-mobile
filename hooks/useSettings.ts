import { handleBiometricToggle } from "@/utils";
import { useState } from "react";

export const useSettings = () => {
      const [darkMode, setDarkMode] = useState<boolean>(false);
      const [notifications, setNotifications] = useState<boolean>(true);

      const onBiometricToggle = async (value: boolean) => {
        await handleBiometricToggle(value);
      };

return {
    darkMode,
    notifications,

    setDarkMode,
    setNotifications,
    onBiometricToggle
}

}