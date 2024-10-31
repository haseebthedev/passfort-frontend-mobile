import React, { useState } from "react";
import {
  StyleSheet,
  TextInput as InputText,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { ErrorMessage } from "./ErrorMessage";
import { colorPalette, FormsStyle, iconSize, Spacing, Typography } from "@/styles";

interface TextInputI extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  icon?: string;
  onIconPress?: () => void;
  secureInput?: boolean;
  error?: string;
  visible?: boolean;
}

export const TextInput: React.FC<TextInputI> = ({
  label,
  containerStyle,
  inputStyle,
  error,
  icon,
  onIconPress,
  secureInput = false,
  visible,
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
          <TouchableWithoutFeedback onPress={handleIconPress}>
            <View style={styles.iconWrapper}>
              <Entypo
                name={isPasswordVisible ? "eye" : "eye-with-line"}
                size={iconSize}
                color={colorPalette.primaryBg.primaryGrey}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {error && visible && <ErrorMessage error={error} visible={visible} />}
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
    right: Spacing.sm,
    padding: Spacing.xs,
  },
});

export default TextInput;
