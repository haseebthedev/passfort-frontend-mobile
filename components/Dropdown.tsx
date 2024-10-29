import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";

interface DropDownI<T> {
  open: boolean;
  value: T | null;
  items: ItemType<T>[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<T | null>>;
}

export const Dropdown = <T extends ValueType>({ items, open, setOpen, setValue, value }: DropDownI<T>) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      autoScroll={true}
      style={styles.container}
      onSelectItem={(item) => setValue(item?.value ?? null)}
      textStyle={styles.textStyle}
      ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={20} color={colorPalette.primaryBg.primaryGrey} />}
      ArrowDownIconComponent={() => (
        <Ionicons name="chevron-down" size={20} color={colorPalette.primaryBg.primaryGrey} />
      )}
      TickIconComponent={() => (
        <MaterialIcons name="check" size={20} color={colorPalette.primaryBg.secondaryLightGreen} />
      )}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.secondaryDarkGreen,
  },
  textStyle: {
    color: colorPalette.primaryBg.primaryGrey,
  },
  dropDownContainerStyle: {
    backgroundColor: colorPalette.primaryBg.borderColor1,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
  },
  tickIconStyle: {},
});
