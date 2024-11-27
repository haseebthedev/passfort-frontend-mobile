import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { polar2Canvas } from "react-native-redash";
import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { hp, wp } from "@/utils";
import { colorPalette } from "@/styles";

const { width } = Dimensions.get("window");

interface ArcSliderI {
  count: number;
}

export const ArcSlider = ({ count }: ArcSliderI) => {
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
  const percentComplete = useSharedValue(0);

  useEffect(() => {
    const normalizedCount = count / 8;
    let newTheta;
    if (count >= 7) {
      newTheta = (3 * Math.PI) / 2 - Math.PI * normalizedCount * (-r / 8) + 0.15;
    } else {
      newTheta = (3 * Math.PI) / 2 - Math.PI * normalizedCount * (-r / 8) + 0.07;
    }

    const percent = normalizedCount * 100;
    percentComplete.value = withTiming(percent / 100, {
      duration: 500,
    });

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

    movableCx.value = withTiming(newCoords.x, {
      duration: 500,
    });
    movableCy.value = withTiming(newCoords.y, {
      duration: 500,
    });
  }, [count]);

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return <View />;
  }

  return (
    <View style={styles.container}>
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
    </View>
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
