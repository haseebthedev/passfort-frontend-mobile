import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { wp } from "@/utils";
import { colorPalette } from "@/styles";

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
      ArrowUpIconComponent={() => (
        <Ionicons name="chevron-up" size={iconSize} color={colorPalette.primaryBg.secondayGrey} />
      )}
      ArrowDownIconComponent={() => (
        <Ionicons name="chevron-down" size={iconSize} color={colorPalette.primaryBg.secondayGrey} />
      )}
      TickIconComponent={() => (
        <MaterialIcons name="check" size={iconSize} color={colorPalette.primaryBg.secondaryLightGreen} />
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
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
    backgroundColor: colorPalette.primaryBg.primaryBg,
  },
  textStyle: {
    color: colorPalette.primaryBg.secondayGrey,
  },
  dropDownContainerStyle: {
    backgroundColor: colorPalette.primaryBg.borderColor1,
    borderWidth: wp(0.1),
    borderColor: colorPalette.primaryBg.borderColor2,
  },
});
