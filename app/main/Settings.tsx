import React, { ComponentProps, useMemo } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screens } from "@/enums";
import { useSettings, useTheme } from "@/hooks";
import { useAuthStore } from "@/store";
import { AppButton, AppHeader, AppSwitch, GradientWrapper, SettingItem, SettingsSection } from "@/components";
import { ScrollView } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

type SettingItemType = {
  icon: IconName;
  title: string;
  onPress?: () => void;
  renderRight?: () => React.ReactNode;
};

type SectionType = {
  title: string;
  data: SettingItemType[];
};

const Settings = () => {
  const { theme } = useTheme();
  const { onBiometricToggle, notifications, setNotifications } = useSettings();
  const { reset, biometricAuth, isDarkModeEnabled, setDarkModeEnabled } = useAuthStore();

  const onLogoutPress = async () => {
    await reset();
    router.push(Screens.Signin);
  };

  const sections: SectionType[] = useMemo(
    () => [
      {
        title: "Appearance",
        data: [
          {
            icon: "moon",
            title: "Dark Mode",
            renderRight: () => <AppSwitch value={isDarkModeEnabled} onValueChange={setDarkModeEnabled} />,
          },
        ],
      },
      {
        title: "Security",
        data: [
          {
            icon: "finger-print",
            title: "Biometric Authentication",
            renderRight: () => <AppSwitch value={biometricAuth} onValueChange={onBiometricToggle} />,
          },
          {
            icon: "key",
            title: "Change Master Password",
            onPress: () => router.push(Screens.ChangeMasterPassword),
          },
        ],
      },
      {
        title: "Notifications",
        data: [
          {
            icon: "notifications",
            title: "Push Notifications",
            renderRight: () => <AppSwitch value={notifications} onValueChange={setNotifications} />,
          },
        ],
      },
      {
        title: "Account",
        data: [
          {
            icon: "person",
            title: "Account Information",
            onPress: () => router.push(Screens.Profile),
          },
          {
            icon: "shield-checkmark",
            title: "Privacy Policy",
            onPress: () => router.push(Screens.PrivacyPolicy),
          },
        ],
      },
    ],
    [isDarkModeEnabled, biometricAuth, notifications],
  );

  return (
    <GradientWrapper>
      <AppHeader title="Settings" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.map((section) => (
          <SettingsSection key={section.title} title={section.title}>
            {section.data.map((item, index) => (
              <SettingItem
                key={`${item.title}-${index}`}
                icon={item.icon}
                title={item.title}
                onPress={item.onPress}
                rightComponent={item.renderRight ? item.renderRight() : <Ionicons name="chevron-forward" size={24} color={theme.icon} />}
              />
            ))}
          </SettingsSection>
        ))}

        <AppButton text="Logout" onPress={onLogoutPress} />
      </ScrollView>
    </GradientWrapper>
  );
};

export default Settings;
