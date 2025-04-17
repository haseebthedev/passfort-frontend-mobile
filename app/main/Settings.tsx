import React from "react";
import { StyleSheet, View, Text, Switch, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { useAuthStore } from "@/store";
import { AppButton, AppHeader, AppText, GradientWrapper } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { hp } from "@/utils";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  rightComponent: React.ReactNode;
  onPress?: () => void;
}

const Settings = () => {
  const { reset, biometricAuth, setBiometricAuth } = useAuthStore();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const onLogoutPress = async () => {
    await reset();
    router.push(Screens.Signin);
  };

  const SettingItem = ({ icon, title, rightComponent, onPress }: SettingItemProps) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={colorPalette.primaryBg.primaryWhite} />
        <AppText text={title}/>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Settings" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />
      
      <View style={styles.section}>
        <AppText type="primaryHeading" text="Appearance"/>
        <SettingItem
          icon="moon"
          title="Dark Mode"
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? colorPalette.primaryBg.primaryLightGreen : colorPalette.primaryBg.secondaryLightGreen}
              trackColor={{ false: colorPalette.primaryBg.black, true: colorPalette.primaryBg.primaryLightGreen }}
            />
          }
        />
      </View>

      <View style={styles.section}>
      <AppText type="primaryHeading" text="Security"/>

        <SettingItem
          icon="finger-print"
          title="Biometric Authentication"
          rightComponent={
            <Switch
              value={biometricAuth}
              onValueChange={setBiometricAuth}
              thumbColor={biometricAuth ? colorPalette.primaryBg.primaryLightGreen : colorPalette.primaryBg.secondaryLightGreen}
              trackColor={{ false: colorPalette.primaryBg.black, true: colorPalette.primaryBg.primaryLightGreen }}
            />
          }
        />
      </View>

      <View style={styles.section}>
      <AppText type="primaryHeading" text="Notifications"/>

        <SettingItem
          icon="notifications"
          title="Push Notifications"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              thumbColor={notifications ? colorPalette.primaryBg.primaryLightGreen : colorPalette.primaryBg.secondaryLightGreen}
              trackColor={{ false: colorPalette.primaryBg.black, true: colorPalette.primaryBg.primaryLightGreen }}
            />
          }
        />
      </View>


      <View style={styles.section}>
      <AppText type="primaryHeading" text="Account"/>
        <SettingItem
          icon="person"
          title="Account Information"
          rightComponent={<Ionicons name="chevron-forward" size={24} color="#000" />}
          onPress={() => router.push(Screens.Profile)}
        />
        <SettingItem
          icon="shield-checkmark"
          title="Privacy Policy"
          rightComponent={<Ionicons name="chevron-forward" size={24} color="#000" />}
          onPress={() => router.push(Screens.PrivacyPolicy)}
        />
      </View>

      <AppButton
        text="Logout"
        onPress={onLogoutPress}
      />
    </GradientWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.md,
    gap: Spacing.md
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: hp(2.5),
    backgroundColor: colorPalette.primaryBg.black,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
