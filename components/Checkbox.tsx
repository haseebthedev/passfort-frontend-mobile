import React, { useState } from "react";
import { TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { colorPalette, Spacing } from "@/styles/styles";

interface CheckboxI {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Checkbox = ({ label, checked = false, onChange, containerStyle, labelStyle }: CheckboxI) => {
  const [isChecked, setChecked] = useState<boolean>(checked);

  const handlePress = () => {
    const newValue = !isChecked;
    setChecked(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={handlePress} style={styles.spacing}>
        <MaterialIcons
          name={isChecked ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={colorPalette.primaryBg.secondaryLightGreen}
          style={styles.spacing}
        />
      </TouchableWithoutFeedback>
      {label && <AppText text={label} style={labelStyle} type="label" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacing: {
    marginRight: Spacing.xs,
  },
});
