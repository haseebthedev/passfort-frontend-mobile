import Toast from "react-native-toast-message";

export const showToast = ({
  type = 'success',
  text1,
  text2,
  position = 'top',
  autoHide = true,
  visibilityTime = 4000,
}: {
  type?: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  autoHide?: boolean;
  visibilityTime?: number;
}) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "bottom",
    autoHide,
    visibilityTime,
  });
};
