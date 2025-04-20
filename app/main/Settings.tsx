import React from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screens } from "@/enums";
import { useSettings } from "@/hooks";
import { useAuthStore } from "@/store";
import { colorPalette, LayoutStyles } from "@/styles";
import {
  AppButton,
  AppHeader,
  AppSwitch,
  GradientWrapper,
  SettingItem,
  SettingsSection,
} from "@/components";

const Settings = () => {
  const { reset, biometricAuth } = useAuthStore();
  const {
    darkMode,
    setDarkMode,
    onBiometricToggle,
    notifications,
    setNotifications,
  } = useSettings();

  const onLogoutPress = async () => {
    await reset();
    router.push(Screens.Signin);
  };

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title="Settings"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <SettingsSection title="Appearance">
        <SettingItem
          icon="moon"
          title="Dark Mode"
          rightComponent={
            <AppSwitch value={darkMode} onValueChange={setDarkMode} />
          }
        />
      </SettingsSection>

      <SettingsSection title="Security">
        <SettingItem
          icon="finger-print"
          title="Biometric Authentication"
          rightComponent={
            <AppSwitch
              value={biometricAuth}
              onValueChange={onBiometricToggle}
            />
          }
        />
      </SettingsSection>

      <SettingsSection title="Notifications">
        <SettingItem
          icon="notifications"
          title="Push Notifications"
          rightComponent={
            <AppSwitch value={notifications} onValueChange={setNotifications} />
          }
        />
      </SettingsSection>

      <SettingsSection title="Account">
        <SettingItem
          icon="person"
          title="Account Information"
          rightComponent={
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colorPalette.primaryBg.primaryWhite}
            />
          }
          onPress={() => router.push(Screens.Profile)}
        />
        <SettingItem
          icon="shield-checkmark"
          title="Privacy Policy"
          rightComponent={
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colorPalette.primaryBg.primaryWhite}
            />
          }
          onPress={() => router.push(Screens.PrivacyPolicy)}
        />
      </SettingsSection>

      <AppButton text="Logout" onPress={onLogoutPress} />
    </GradientWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
