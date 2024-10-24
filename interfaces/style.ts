export type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type FontWeight = "200" | "300" | "400" | "600" | "700" | "bold";
export interface FontsType {
  size: Record<FontSize, number>;
  weight: Record<FontSize, FontWeight>;
}
