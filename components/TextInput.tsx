import React, { useState } from "react";
import {
  StyleSheet,
  TextInput as InputText,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import { wp } from "@/utils";
import { colorPalette, FormsStyle, iconSize, Spacing, Typography } from "@/styles";
import { AppText } from "./AppText";

interface TextInputI extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: string;
  icon?: string;
  onIconPress?: () => void;
  secureInput?: boolean;
}

export const TextInput: React.FC<TextInputI> = ({
  label,
  containerStyle,
  inputStyle,
  error,
  icon = "eye",
  onIconPress,
  secureInput = false,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(!secureInput);

  const handleIconPress = () => {
    setPasswordVisible((prev) => !prev);
    if (onIconPress) onIconPress();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText text={label} style={[FormsStyle.formLabel, Typography.label]} />}
      <View style={styles.inputWrapper}>
        <InputText
          style={[FormsStyle.formControl, inputStyle]}
          placeholderTextColor={colorPalette.primaryBg.primaryGrey}
          secureTextEntry={secureInput && !isPasswordVisible}
          {...props}
        />
        {secureInput && (
          <TouchableOpacity onPress={handleIconPress} style={styles.iconWrapper}>
            <Entypo
              name={isPasswordVisible ? "eye" : "eye-with-line"}
              size={iconSize}
              color={colorPalette.primaryBg.primaryGrey}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    position: "absolute",
    right: wp(3),
    paddingHorizontal: 8,
  },
  error: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});

export default TextInput;
