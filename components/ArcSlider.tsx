import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { hp, wp } from "@/utils";
import { colorPalette } from "@/theme";
import { Spacing } from "@/styles";
import { useTheme } from "@/hooks";

const { width } = Dimensions.get("window");

interface ArcSliderI {
  count: number;
  children?: React.ReactNode;
}

export const ArcSlider = ({ count, children }: ArcSliderI) => {
  const { mode } = useTheme();

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

  // const movableCx = useSharedValue(x2);
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
          color={mode === "dark" ? colorPalette.primaryBg.primaryText : colorPalette.primaryBg.secondayGrey02}
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
      </Canvas>

      {/* 👇 Overlay Content */}
      <View style={styles.centerContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(92),
    height: wp(75),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
  },
  canvas: {
    height: hp(45),
    width: hp(45),
    transform: [{ rotate: "45.5deg" }],
  },
  centerContent: {
    position: "absolute",
    top: -hp(18),
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
