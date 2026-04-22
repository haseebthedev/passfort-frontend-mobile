import React from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store";
import { colorPalette } from "@/theme";

export const AppStatusBar = () => {
  const { isDarkModeEnabled } = useAuthStore();

  return (
    <StatusBar
      translucent
      animated
      backgroundColor={
        isDarkModeEnabled
          ? colorPalette.primaryBg.primaryDarkGreen
          : colorPalette.primaryBg.primaryWhite
      }
      style={isDarkModeEnabled ? "light" : "dark"}
    />
  );
};
