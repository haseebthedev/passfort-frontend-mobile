import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { AppText } from "./AppText";
import { RippleWrapper } from "./RippleWrapper";
import { BottomSheetHOC } from "./BottomSheetHOC";
import { AppFont, hp, pickImageFromCamera, pickImageFromLibrary, wp } from "@/utils";
import { colorPalette, iconSize, Spacing } from "@/styles";

interface ImagePickerI {
  isVisible: boolean;
  snapPoints: string[];
  bottomSheetRef: React.RefObject<BottomSheet>;
  renderBackdrop: (props: BottomSheetBackdropProps) => JSX.Element;
  setProfileImage: (uri: ImageSourcePropType) => void;
  setSelectedImage: (image: ImagePicker.ImagePickerAsset) => void;
}

export const ImagePickerModal = ({
  isVisible,
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
  setProfileImage,
  setSelectedImage,
}: ImagePickerI) => {
  return (
    <BottomSheetHOC
      isVisible={isVisible}
      onBackdropPress={renderBackdrop}
      snapPoints={snapPoints}
      bottomSheetRef={bottomSheetRef}
      containerStyle={styles.modalContainer}
    >
      <AppText text="Select any option" type="default" style={styles.heading} />
      <View>
        <RippleWrapper
          style={styles.imageOption}
          containerStyle={styles.imageOptionContainer}
          onPress={() => pickImageFromLibrary(bottomSheetRef, setProfileImage, setSelectedImage)}
        >
          <Ionicons name="image-outline" size={iconSize} />
          <AppText text="Gallery" type="default" style={styles.textStyle} />
        </RippleWrapper>
        <RippleWrapper
          style={styles.imageOption}
          containerStyle={styles.imageOptionContainer}
          onPress={() => pickImageFromCamera(bottomSheetRef, setProfileImage, setSelectedImage)}
        >
          <Feather name="camera" size={iconSize} />
          <AppText text="Take Photo" type="default" style={styles.textStyle} />
        </RippleWrapper>
      </View>
    </BottomSheetHOC>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: hp(80),
  },
  heading: {
    fontFamily: AppFont.bold,
    color: colorPalette.primaryBg.black,
    fontSize: hp(2.8),
    marginBottom: Spacing.xs,
  },
  textStyle: {
    color: colorPalette.primaryBg.black,
  },
  imageOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.sm,
  },
  imageOptionContainer: {
    borderRadius: Spacing.xs,
    width: wp(90),
    marginTop: Spacing.sm,
  },
});
