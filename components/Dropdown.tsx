import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { AppFont, wp } from "@/utils";
import { colorPalette, Typography } from "@/styles";
import { useTheme } from "@/hooks";
import { Theme } from "@/interfaces";

const iconSize = wp(5);

interface DropDownI<T> {
  open: boolean;
  value: T | null;
  items: ItemType<T>[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<T | null>>;
  setFieldValue: (field: string, value: T | null, shouldValidate?: boolean) => void;
}

export const Dropdown = <T extends ValueType>({ items, open, setOpen, setValue, value, setFieldValue }: DropDownI<T>) => {
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);
  const handleSelectItem = (item: ItemType<T>) => {
    setValue(item?.value ?? null);
    setFieldValue("type", item?.value ?? null);
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      autoScroll={true}
      style={styles.container}
      onSelectItem={handleSelectItem}
      textStyle={styles.textStyle}
      placeholder="Select"
      placeholderStyle={styles.placeholderStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      labelStyle={styles.labelStyle}
      selectedItemLabelStyle={styles.selectedLabel}
      ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={iconSize} color={colorPalette.primaryBg.secondayGrey} />}
      ArrowDownIconComponent={() => <Ionicons name="chevron-down" size={iconSize} color={colorPalette.primaryBg.secondayGrey} />}
      TickIconComponent={() => <MaterialIcons name="check" size={iconSize} color={colorPalette.primaryBg.secondaryLightGreen} />}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
        showsVerticalScrollIndicator: false,
      }}
    />
  );
};

const createStyles = (theme: Theme, mode: string) =>
  StyleSheet.create({
    container: {
      borderWidth: wp(0.1),
      borderColor: theme.cardsBorder,
      backgroundColor: mode === "dark" ? colorPalette.primaryBg.primaryBg : colorPalette.primaryBg.primaryWhite,
      borderRadius: wp(4),
      elevation: theme.elevation,
    },
    textStyle: {
      color: mode === "dark" ? colorPalette.primaryBg.secondayGrey : colorPalette.primaryBg.borderColor2,
      fontFamily: AppFont.medium,
    },
    dropDownContainerStyle: {
      backgroundColor: mode === "dark" ? colorPalette.primaryBg.borderColor1 : colorPalette.primaryBg.primaryWhite,
      borderWidth: wp(0.1),
      borderColor: theme.cardsBorder,
      elevation: theme.elevation,
    },
    placeholderStyle: {
      ...Typography(theme).placeholderText,
    },
    labelStyle: {
      fontFamily: AppFont.medium,
      color: mode === "dark" ? colorPalette.primaryBg.primaryWhite : colorPalette.primaryBg.primaryDarkGreen,
    },
    selectedLabel: {
      fontFamily: AppFont.medium,
      color: mode === "dark" ? colorPalette.primaryBg.primaryWhite : colorPalette.primaryBg.primaryDarkGreen,
    },
  });
