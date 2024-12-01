import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppFont, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search here", value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={wp(5)} color={colorPalette.primaryBg.primaryGrey} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colorPalette.primaryBg.primaryGrey}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorPalette.primaryBg.primaryBg,
    borderRadius: wp(10),
    paddingHorizontal: Spacing.sm,
    elevation: 2,
    marginBottom: Spacing.md,
  },
  input: {
    flex: 1,
    height: wp(12),
    marginLeft: Spacing.sm,
    color: colorPalette.primaryBg.primaryWhite,
    fontFamily: AppFont.regular,
  },
});
