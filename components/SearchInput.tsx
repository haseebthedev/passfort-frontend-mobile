import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppFont, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";
import { Theme } from "@/interfaces";
import { useTheme } from "@/hooks";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search here",
  value,
  onChangeText,
}) => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme);

  const Icon_Placeholder_Color =
    mode === "dark"
      ? colorPalette.primaryBg.primaryGrey
      : colorPalette.primaryBg.secondayGrey;

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={wp(5)} color={Icon_Placeholder_Color} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Icon_Placeholder_Color}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.searchBg,
      borderRadius: wp(10),
      paddingHorizontal: Spacing.sm,
      elevation: 2,
      marginBottom: Spacing.md,
    },
    input: {
      flex: 1,
      height: wp(12),
      marginLeft: Spacing.sm,
      color: theme.text,
      fontFamily: AppFont.regular,
    },
  });
