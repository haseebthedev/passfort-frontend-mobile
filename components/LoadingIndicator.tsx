import React from "react";
import { ActivityIndicator } from "react-native";

import { colorPalette } from "@/theme";
import { useTheme } from "@/hooks";

interface LoadingIndicatorI {
  size?: number;
  color?: string;
}

export const LoadingIndicator = ({ size = 24, color }: LoadingIndicatorI) => {
  const { theme } = useTheme();
  return <ActivityIndicator color={color ? color : theme.loadingIndicator} size={size} />;
};
