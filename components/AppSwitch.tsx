import { colorPalette } from "@/styles";
import React from "react";
import { Switch, StyleProp, ViewStyle } from "react-native";

interface AppSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  activeThumbColor?: string;
  inactiveThumbColor?: string;
  activeTrackColor?: string;
  inactiveTrackColor?: string;
}

export const AppSwitch: React.FC<AppSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  containerStyle,
  activeThumbColor = colorPalette.primaryBg.primaryLightGreen,
  inactiveThumbColor = colorPalette.primaryBg.secondaryLightGreen,
  activeTrackColor = colorPalette.primaryBg.borderColor2,
  inactiveTrackColor = colorPalette.primaryBg.primaryWhite,
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      thumbColor={value ? activeThumbColor : inactiveThumbColor}
      trackColor={{
        false: inactiveTrackColor,
        true: activeTrackColor,
      }}
      style={containerStyle}
    />
  );
};
