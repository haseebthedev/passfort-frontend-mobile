import Toast from "react-native-toast-message";

interface ShowToastProps {
  type: "success" | "error" | "info";
  text1: string;
  text2?: string;
}

export const showToast = ({ type, text1, text2 }: ShowToastProps) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "bottom",
    visibilityTime: 3000,
    autoHide: true,
  });
};
