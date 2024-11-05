import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { AppFont, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";

const iconSize = wp(5);

interface DropDownI<T> {
  open: boolean;
  value: T | null;
  items: ItemType<T>[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<T | null>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const Dropdown = <T extends ValueType>({
  items,
  open,
  setOpen,
  setValue,
  value,
  setFieldValue,
}: DropDownI<T>) => {
  const handleSelectItem = (item: ItemType<T>) => {
    setValue(item?.value ?? null);
    setFieldValue("type", item.value);
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
      ArrowUpIconComponent={() => (
        <Ionicons name="chevron-up" size={iconSize} color={colorPalette.primaryBg.secondayGrey} />
      )}
      ArrowDownIconComponent={() => (
        <Ionicons name="chevron-down" size={iconSize} color={colorPalette.primaryBg.secondayGrey} />
      )}
      TickIconComponent={() => (
        <MaterialIcons name="check" size={iconSize} color={colorPalette.primaryBg.secondaryLightGreen} />
      )}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.primaryBg,
    borderRadius: wp(4),
  },
  textStyle: {
    color: colorPalette.primaryBg.secondayGrey,
    fontFamily: AppFont.medium,
  },
  dropDownContainerStyle: {
    backgroundColor: colorPalette.primaryBg.borderColor1,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
  },
  placeholderStyle: {
    color: colorPalette.primaryBg.primaryGrey,
  },
  labelStyle: {
    fontFamily: AppFont.medium,
    color: colorPalette.primaryBg.primaryWhite,
  },
  selectedLabel: {
    fontFamily: AppFont.medium,
    color: colorPalette.primaryBg.primaryWhite,
  },
});
