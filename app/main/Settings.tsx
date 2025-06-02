import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screens } from "@/enums";
import { useSettings, useTheme } from "@/hooks";
import { useAuthStore } from "@/store";
import { AppButton, AppHeader, AppSwitch, GradientWrapper, SettingItem, SettingsSection } from "@/components";

const Settings = () => {
  const { theme } = useTheme();
  const { onBiometricToggle, notifications, setNotifications } = useSettings();
  const { reset, biometricAuth, isDarkModeEnabled, setDarkModeEnabled } = useAuthStore();

  const onLogoutPress = async () => {
    await reset();
    router.push(Screens.Signin);
  };

  return (
    <GradientWrapper>
      <AppHeader title="Settings" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <SettingsSection title="Appearance">
        <SettingItem
          icon="moon"
          title="Dark Mode"
          rightComponent={<AppSwitch value={isDarkModeEnabled} onValueChange={setDarkModeEnabled} />}
        />
      </SettingsSection>

      <SettingsSection title="Security">
        <SettingItem
          icon="finger-print"
          title="Biometric Authentication"
          rightComponent={<AppSwitch value={biometricAuth} onValueChange={onBiometricToggle} />}
        />
      </SettingsSection>

      <SettingsSection title="Notifications">
        <SettingItem
          icon="notifications"
          title="Push Notifications"
          rightComponent={<AppSwitch value={notifications} onValueChange={setNotifications} />}
        />
      </SettingsSection>

      <SettingsSection title="Account">
        <SettingItem
          icon="person"
          title="Account Information"
          rightComponent={<Ionicons name="chevron-forward" size={24} color={theme.icon} />}
          onPress={() => router.push(Screens.Profile)}
        />
        <SettingItem
          icon="shield-checkmark"
          title="Privacy Policy"
          rightComponent={<Ionicons name="chevron-forward" size={24} color={theme.icon} />}
          onPress={() => router.push(Screens.PrivacyPolicy)}
        />
      </SettingsSection>

      <AppButton text="Logout" onPress={onLogoutPress} />
    </GradientWrapper>
  );
};

export default Settings;
