import { theme } from "@/theme";
import { useAuthStore } from "@/store";

export const useTheme = () => {
  const { isDarkModeEnabled } = useAuthStore();

  const currentTheme = isDarkModeEnabled ? theme.dark : theme.light;
  const mode = isDarkModeEnabled ? "dark" : "light";

  return { theme: currentTheme, mode, isDarkModeEnabled };
};
