import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { ImageSourcePropType } from "react-native";
import { showToast } from "./toastService";

export const pickImageFromLibrary = async (
  bottomSheetRef: React.RefObject<BottomSheet>,
  setProfileImage: (uri: ImageSourcePropType) => void,
  setSelectedImage: (image: ImagePicker.ImagePickerAsset) => void
) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    bottomSheetRef.current?.close();

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage({ uri: result.assets[0].uri });
      setSelectedImage(result.assets[0]);
    } else {
      showToast({
        type: "error",
        text1: `No image selected.`,
      });
    }
  } catch (error) {
    console.error("Error picking image:", error);
  }
};

export const pickImageFromCamera = async (
  bottomSheetRef: React.RefObject<BottomSheet>,
  setProfileImage: (uri: ImageSourcePropType) => void,
  setSelectedImage: (image: ImagePicker.ImagePickerAsset) => void
) => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    bottomSheetRef.current?.close();

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage({ uri: result.assets[0].uri });
      setSelectedImage(result.assets[0]);
    } else {
      showToast({
        type: "error",
        text1: `"No image captured.`,
      });
    }
  } catch (error) {
    console.error("Error capturing image:", error);
  }
};
