import * as ImagePicker from "expo-image-picker";

export const requestImagePickerPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    alert("Sorry, we need media library permissions to make this work!");
    return false;
  }

  return true;
};
