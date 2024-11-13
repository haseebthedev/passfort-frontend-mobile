import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import { colorPalette } from "@/styles";
import { hp, wp } from "@/utils";

const { width } = Dimensions.get("window");

export const ArcSlider = () => {
  const strokeWidth = 9;
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - 60;
  const startAngle = Math.PI;
  const endAngle = (3 * Math.PI) / 2;
  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;
  const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const rawForegroundPath = `M ${x2} ${y2} A ${r} ${r} 0 1 1 ${x1} ${y1}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(rawForegroundPath);

  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);
  const previousPositionX = useSharedValue(x2);
  const previousPositionY = useSharedValue(y2);
  const percentComplete = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY, absoluteX, x, y }) => {
      console.log(x, y);
      const oldCanvasX = translationX + previousPositionX.value;
      const oldCanvasY = translationY + previousPositionY.value;

      const xPrime = oldCanvasX - center;
      const yPrime = -(oldCanvasY - center);
      const rawTheta = Math.atan2(yPrime, xPrime);

      let newTheta = rawTheta;

      if (absoluteX < width / 2 && rawTheta < 0) {
        newTheta = rawTheta < 0 ? rawTheta + 2 * Math.PI : rawTheta;
      } else if (absoluteX > width / 2 && rawTheta <= -1) {
        newTheta = (3 * Math.PI) / 2;
      } else if (absoluteX > width / 2 && rawTheta <= 0) {
        newTheta = 0;
      } else {
        newTheta = rawTheta;
      }

      const percent = 1 - newTheta / ((3 * Math.PI) / 2);
      percentComplete.value = percent;

      const newCoords = polar2Canvas(
        {
          theta: newTheta,
          radius: r,
        },
        {
          x: center,
          y: center,
        }
      );

      movableCx.value = newCoords.x;
      movableCy.value = newCoords.y;
    })
    .onEnd(() => {
      previousPositionX.value = movableCx.value;
      previousPositionY.value = movableCy.value;
    });

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return <View />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas style={styles.canvas}>
          <Path
            path={skiaBackgroundPath}
            style="stroke"
            strokeWidth={strokeWidth}
            strokeCap="round"
            color={colorPalette.primaryBg.primaryText}
          />
          <Path
            path={skiaForegroundPath}
            style="stroke"
            strokeWidth={strokeWidth}
            strokeCap="round"
            color={colorPalette.primaryBg.secondaryLightGreen}
            start={0}
            end={percentComplete}
          />
          <Circle cx={movableCx} cy={movableCy} r={10} color={colorPalette.primaryBg.primaryWhite} style="fill" />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -hp(6),
    marginRight: hp(20),
    width: wp(92),
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    height: hp(45),
    width: hp(45),
    transform: [{ rotate: "46deg" }],
  },
});
