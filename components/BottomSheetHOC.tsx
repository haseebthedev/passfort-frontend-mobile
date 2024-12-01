import React, { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";

interface BottomSheetHOCProps {
  isVisible: boolean;
  children: React.ReactNode;
  snapPoints?: string[];
  containerStyle?: ViewStyle;
  bottomSheetRef: React.RefObject<BottomSheet>;
  onBackdropPress: (props: BottomSheetBackdropProps) => JSX.Element;
}

export const BottomSheetHOC: React.FC<BottomSheetHOCProps> = ({
  isVisible,
  children,
  containerStyle,
  onBackdropPress,
  snapPoints = ["25%", "50%", "75%"],
  bottomSheetRef,
}) => {
  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={onBackdropPress}
      handleIndicatorStyle={styles.hiddenHandle}
    >
      <BottomSheetView style={[styles.contentContainer, containerStyle]}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },
  hiddenHandle: {
    height: 0,
    opacity: 0,
  },
});
