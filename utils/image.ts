import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { ImageSourcePropType } from "react-native";

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

      console.log(result.assets[0]);
    } else {
      console.log("No image selected.");
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

      console.log(result.assets[0]);
    } else {
      console.log("No image captured.");
    }
  } catch (error) {
    console.error("Error capturing image:", error);
  }
};
