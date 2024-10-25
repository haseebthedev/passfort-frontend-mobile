import React from "react";
import { ActivityIndicator } from "react-native";

import { colorPalette } from "@/styles";

interface LoadingIndicatorI {
  size?: number;
  color?: string;
}

export const LoadingIndicator = ({ size = 24, color = colorPalette.primaryBg.primaryWhite }: LoadingIndicatorI) => {
  return <ActivityIndicator color={color} size={size} />;
};
