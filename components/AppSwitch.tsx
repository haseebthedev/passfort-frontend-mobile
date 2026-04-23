import { useTheme } from "@/hooks";
import React from "react";
import { Switch, StyleProp, ViewStyle } from "react-native";

interface AppSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AppSwitch: React.FC<AppSwitchProps> = ({ value, onValueChange, disabled = false, containerStyle }) => {
  const { theme } = useTheme();

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      thumbColor={value ? theme.appSwitch.activeThumbColor : theme.appSwitch.inactiveThumbColor}
      trackColor={{
        false: theme.appSwitch.inactiveTrackColor,
        true: theme.appSwitch.activeTrackColor,
      }}
      style={containerStyle}
    />
  );
};
